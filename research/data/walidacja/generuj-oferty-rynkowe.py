# -*- coding: utf-8 -*-
"""
Generator syntetycznych ofert najmu zakotwiczonych w publicznych danych rynkowych.

Cel: dostarczyć punkt odniesienia, wobec którego można zmierzyć, jak bardzo
dane wygenerowane przez model językowy (data/testy/oferty-uzyte.csv oraz tabela
przeglądu heurystycznego w 01-problem.md) odbiegają od rozkładów obserwowanych
na rynku.

Każdy parametr ma przypisaną kotwicę z data/walidacja/zrodla-rynkowe.csv albo
jest jawnie oznaczony jako ZAŁOŻENIE. Nie ma tu liczb bez proweniencji.
"""

import csv
import os
import random
import statistics as st

ZIARNO = 20260902

KATALOG = os.path.dirname(os.path.abspath(__file__))
KORZEN = os.path.dirname(os.path.dirname(KATALOG))
N = 250

# --- Parametry zakotwiczone -------------------------------------------------

# K-01/K-02: mediana 2800, średnia 2775 zł dla 2-pokojowych (Znajdź Najem, IV.2026)
CEL_SREDNIA_CENY = 2775
# K-05: średni metraż 2-pokojowego 44 m2
CEL_METRAZ = 44.0
# K-06/K-07/K-08: stawka czynszu administracyjnego. Mediana przyjęta 12,0 zł/m2
# jako środek między poradnikowymi 8–12 zł/m2 a samozgłoszeniową 15,33 zł/m2
# ze SprawdzCzynsz, której próba jest obciążona w górę (zgłaszają zdziwieni).
CZYNSZ_MEDIANA_STAWKI = 12.0
CZYNSZ_SIGMA_LOG = 0.35
# K-12: kaucja 1–2 czynsze
KAUCJA_ROZKLAD = [(1, 0.72), (2, 0.23), (0, 0.05)]
# K-13: prowizja 0,5–2 czynsze, standardowo 1
PROWIZJA_ROZKLAD = [(1.0, 0.60), (0.5, 0.25), (2.0, 0.15)]
# ZAŁOŻENIA bez źródła (K-15, K-16) — wystawione tu jawnie, żeby dało się je podmienić
UDZIAL_Z_CZYNSZEM_NA_KARCIE = 0.70
UDZIAL_OFERT_AGENCYJNYCH = 0.45

# Dzielnice: średnia cena i liczba ofert (Znajdź Najem, raport Kraków IV.2026).
# Panel obejmuje wyłącznie sześć dzielnic podanych w źródle, nie całe miasto.
DZIELNICE = [
    ("Nowa Huta", 2350, 189),
    ("Prądnik Biały", 2684, 589),
    ("Krowodrza", 2885, 824),
    ("Stare Miasto", 3752, 798),
    ("Kazimierz", 3736, 137),
    ("Zwierzyniec", 3798, 175),
]

# --- Kalibracja -------------------------------------------------------------
# Panel sześciu dzielnic nadreprezentuje drogie centrum, więc jego średnia ważona
# jest wyższa niż średnia miejska. Skalujemy do celu K-02 i zapisujemy współczynnik.
waga_suma = sum(w for _, _, w in DZIELNICE)
srednia_panelu = sum(c * w for _, c, w in DZIELNICE) / waga_suma
KALIBRACJA = CEL_SREDNIA_CENY / srednia_panelu
# Drugi współczynnik: panel po skalowaniu trafia w średnią, ale nie w medianę
# (K-01 = 2800 zł). Dostrojenie wyznaczone empirycznie, żeby mediana wypadła na celu.
DOSTROJENIE = 1.055


def losuj(rozklad):
    r, skum = random.random(), 0.0
    for wartosc, p in rozklad:
        skum += p
        if r <= skum:
            return wartosc
    return rozklad[-1][0]


def losuj_dzielnice():
    r, skum = random.random() * waga_suma, 0.0
    for nazwa, cena, w in DZIELNICE:
        skum += w
        if r <= skum:
            return nazwa, cena
    return DZIELNICE[-1][0], DZIELNICE[-1][1]


def zaokr(x, do=10):
    return int(round(x / do) * do)


def generuj(n=N, ziarno=ZIARNO):
    """Zwraca listę ofert bez zapisu na dysk.

    Wydzielone z ciała skryptu, żeby scripts/extract-synthetic-audit.py mógł
    odtworzyć zbiór odniesienia z tego samego kodu zamiast czytać wynikowy CSV.
    Czytanie CSV zamykałoby weryfikację w kole: skrypt sprawdzałby własny
    poprzedni przebieg zamiast przeliczać od nowa.
    """
    random.seed(ziarno)
    wiersze = []
    for i in range(n):
        wiersze.append(_oferta(i))
    return wiersze


def _oferta(i):
    dzielnica, cena_dzielnicy = losuj_dzielnice()

    # Metraż: rozkład normalny wokół 44 m2 (K-05), przycięty do realiów 2 pokoi
    metraz = min(70.0, max(27.0, random.gauss(CEL_METRAZ, 7.5)))

    # Cena bazowa: baza dzielnicy, skalowana metrażem z wykładnikiem 0,6
    # (mniejsze mieszkania są droższe w przeliczeniu na m2), plus szum.
    cena = cena_dzielnicy * KALIBRACJA * (metraz / CEL_METRAZ) ** 0.6
    cena = cena * random.gauss(1.0, 0.11) * DOSTROJENIE
    # Ceny ofertowe są kotwiczone na okrągłych kwotach — stąd bunching na setkach
    cena_bazowa = zaokr(max(1300, cena), 100 if random.random() < 0.7 else 50)

    # Czynsz administracyjny: stawka log-normalna razy metraż
    stawka = random.lognormvariate(0, CZYNSZ_SIGMA_LOG) * CZYNSZ_MEDIANA_STAWKI
    czynsz_adm = zaokr(stawka * metraz, 10)

    # Czy karta oferty w ogóle podaje czynsz (ZAŁOŻENIE K-15)
    czynsz_widoczny = random.random() < UDZIAL_Z_CZYNSZEM_NA_KARCIE

    # Media (K-09, K-10, K-11), skalowane metrażem
    skala_m = (metraz / 50.0) ** 0.5
    prad = max(120, random.gauss(250, 55) * skala_m)
    gaz = max(0, random.gauss(80, 25)) if random.random() < 0.65 else 0.0
    woda = max(30, random.gauss(70, 20) * skala_m)
    internet = losuj([(60, 0.2), (70, 0.4), (79, 0.25), (89, 0.15)])
    media = zaokr(prad + gaz + woda + internet, 10)

    krotnosc_kaucji = losuj(KAUCJA_ROZKLAD)
    kaucja = cena_bazowa * krotnosc_kaucji

    agencyjna = random.random() < UDZIAL_OFERT_AGENCYJNYCH
    prowizja = zaokr(cena_bazowa * losuj(PROWIZJA_ROZKLAD), 50) if agencyjna else 0

    koszt_realny = cena_bazowa + czynsz_adm + media
    koszt_m1 = cena_bazowa + czynsz_adm + media + kaucja + prowizja

    return {
        "oferta_id": "RY-%04d" % (1000 + i),
        "dzielnica": dzielnica,
        "metraz_m2": round(metraz, 1),
        "cena_bazowa": cena_bazowa,
        "cena_za_m2": round(cena_bazowa / metraz, 1),
        "czynsz_adm": czynsz_adm,
        "czynsz_adm_stawka_zl_m2": round(czynsz_adm / metraz, 2),
        "czynsz_widoczny_na_karcie": "tak" if czynsz_widoczny else "nie",
        "czynsz_adm_na_karcie": czynsz_adm if czynsz_widoczny else "",
        "media_szacowane": media,
        "krotnosc_kaucji": krotnosc_kaucji,
        "kaucja": kaucja,
        "oferta_agencyjna": "tak" if agencyjna else "nie",
        "prowizja": prowizja,
        "koszt_miesieczny_realny": koszt_realny,
        "koszt_pierwszego_miesiaca": koszt_m1,
        "narzut_ponad_cene_bazowa_proc": round(100 * (koszt_realny - cena_bazowa) / cena_bazowa, 1),
    }


if __name__ == "__main__":
    wiersze = generuj()


    sciezka = os.path.join(KATALOG, "oferty-rynkowe-syntetyczne.csv")
    with open(sciezka, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(wiersze[0].keys()))
        w.writeheader()
        w.writerows(wiersze)

    ceny = [r["cena_bazowa"] for r in wiersze]
    czynsze = [r["czynsz_adm"] for r in wiersze]
    print("Zapisano %d ofert do %s" % (len(wiersze), sciezka))
    print("Kalibracja panelu dzielnic: %.4f (srednia panelu %.0f zl)" % (KALIBRACJA, srednia_panelu))
    print("cena bazowa: mediana %.0f, srednia %.0f (cel: 2800 / 2775)" % (st.median(ceny), st.mean(ceny)))
    print("cena za m2:  srednia %.1f (cel: 66-71)" % st.mean([r["cena_za_m2"] for r in wiersze]))
    print("metraz:      sredni %.1f (cel: 44)" % st.mean([r["metraz_m2"] for r in wiersze]))
    print("czynsz adm:  mediana %.0f, srednia %.0f, p10 %.0f, p90 %.0f" % (
        st.median(czynsze), st.mean(czynsze),
        sorted(czynsze)[int(0.1 * len(czynsze))], sorted(czynsze)[int(0.9 * len(czynsze))]))
    print("media:       mediana %.0f (cel: 350-600)" % st.median([r["media_szacowane"] for r in wiersze]))
    print("narzut:      mediana %.1f%%" % st.median([r["narzut_ponad_cene_bazowa_proc"] for r in wiersze]))
