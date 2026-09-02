# -*- coding: utf-8 -*-
"""
Porównuje dane wygenerowane przez model (oferty użyte w sesjach + tabela przeglądu
heurystycznego w 01-problem.md) z zakotwiczonym rynkowo zbiorem odniesienia.

Wynik: data/walidacja/porownanie-ai-vs-rynek.csv
"""

import csv
import os
import statistics as st

KATALOG = os.path.dirname(os.path.abspath(__file__))
DANE = os.path.dirname(KATALOG)


def wczytaj(sciezka):
    with open(sciezka, encoding="utf-8") as f:
        return list(csv.DictReader(f))


def liczby(wiersze, pole):
    out = []
    for r in wiersze:
        v = (r.get(pole) or "").strip()
        if v:
            out.append(float(v))
    return out


def p(x, q):
    x = sorted(x)
    return x[min(len(x) - 1, int(q * len(x)))]


rynek = wczytaj(os.path.join(KATALOG, "oferty-rynkowe-syntetyczne.csv"))
oferty_ai = wczytaj(os.path.join(DANE, "testy", "oferty-uzyte.csv"))
retest_ai = wczytaj(os.path.join(DANE, "retest", "retest-metryki.csv"))

# Tabela przeglądu heurystycznego z 01-problem.md (cena bazowa, czynsz administracyjny)
heurystyka = [(2800, 900), (3000, 941), (2800, 700), (2800, 810),
              (3000, 700), (2980, 1070), (2840, 1010), (2500, 1200)]

czynsz_ai = liczby(oferty_ai, "czynsz_adm") + liczby(retest_ai, "czynsz_adm") + [c for _, c in heurystyka]
cena_ai = liczby(oferty_ai, "cena_bazowa") + liczby(retest_ai, "cena_bazowa") + [c for c, _ in heurystyka]
media_ai = liczby(oferty_ai, "media_szacowane") + liczby(retest_ai, "media_szacowane")
kaucja_ai = [(float(r["kaucja"]) / float(r["cena_bazowa"])) for r in oferty_ai if r["kaucja"] and r["cena_bazowa"]]
prowizja_ai = [float(r["prowizja"]) for r in oferty_ai if r["prowizja"] != ""]
narzut_ai = [100 * (float(r["czynsz_adm"]) + float(r["media_szacowane"])) / float(r["cena_bazowa"])
             for r in oferty_ai if r["czynsz_adm"]]

czynsz_ry = liczby(rynek, "czynsz_adm")
cena_ry = liczby(rynek, "cena_bazowa")
media_ry = liczby(rynek, "media_szacowane")
kaucja_ry = liczby(rynek, "krotnosc_kaucji")
prowizja_ry = liczby(rynek, "prowizja")
narzut_ry = liczby(rynek, "narzut_ponad_cene_bazowa_proc")


def wiersz(zmienna, ai, ry, kotwica, jednostka, uwaga):
    odchylenie = (st.median(ai) - st.median(ry))
    proc = 100 * odchylenie / st.median(ry) if st.median(ry) else ""
    return {
        "zmienna": zmienna,
        "jednostka": jednostka,
        "n_ai": len(ai),
        "mediana_ai": round(st.median(ai), 1),
        "srednia_ai": round(st.mean(ai), 1),
        "odch_std_ai": round(st.pstdev(ai), 1),
        "p10_ai": round(p(ai, 0.1), 1),
        "p90_ai": round(p(ai, 0.9), 1),
        "n_rynek": len(ry),
        "mediana_rynek": round(st.median(ry), 1),
        "srednia_rynek": round(st.mean(ry), 1),
        "odch_std_rynek": round(st.pstdev(ry), 1),
        "p10_rynek": round(p(ry, 0.1), 1),
        "p90_rynek": round(p(ry, 0.9), 1),
        "odchylenie_mediany": round(odchylenie, 1),
        "odchylenie_mediany_proc": round(proc, 1) if proc != "" else "",
        "kotwica": kotwica,
        "uwaga": uwaga,
    }


tabela = [
    wiersz("czynsz administracyjny", czynsz_ai, czynsz_ry, "K-06;K-07;K-08", "zł/mies",
           "Główne odchylenie zbioru. Model zawyża czynsz i rozciąga jego rozrzut."),
    wiersz("cena bazowa", cena_ai, cena_ry, "K-01;K-02", "zł/mies",
           "Zgodność dobra — to liczba, którą model najczęściej widział w treningu."),
    wiersz("media (szacowane)", media_ai, media_ry, "K-09;K-10;K-11", "zł/mies",
           "Model użył stałej 300 zł we wszystkich 24 ofertach: zaniżenie i zerowa wariancja."),
    wiersz("kaucja (krotność czynszu)", kaucja_ai, kaucja_ry, "K-12", "x czynsz",
           "Model przyjął dokładnie 1x wszędzie; rynek zna 2x i brak kaucji."),
    wiersz("prowizja pośrednika", prowizja_ai, prowizja_ry, "K-13;K-16", "zł",
           "Model dał prowizję 1 ofercie na 24 (4%); przy założeniu 45% ofert agencyjnych to zaniżenie."),
    wiersz("narzut ponad cenę bazową", narzut_ai, narzut_ry, "wyliczenie", "%",
           "Skutek złożenia trzech powyższych: model dramatyzuje różnicę, ale z niewłaściwych składników."),
]

sciezka = os.path.join(KATALOG, "porownanie-ai-vs-rynek.csv")
with open(sciezka, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(tabela[0].keys()))
    w.writeheader()
    w.writerows(tabela)

print("Zapisano %s\n" % sciezka)
naglowek = "%-28s %10s %10s %10s %9s" % ("zmienna", "med. AI", "med. rynek", "odchyl.", "odchyl.%")
print(naglowek)
print("-" * len(naglowek))
for t in tabela:
    print("%-28s %10s %10s %10s %8s%%" % (
        t["zmienna"], t["mediana_ai"], t["mediana_rynek"],
        t["odchylenie_mediany"], t["odchylenie_mediany_proc"]))

print("\nRozrzut (odchylenie standardowe):")
for t in tabela:
    print("  %-28s AI %8s   rynek %8s" % (t["zmienna"], t["odch_std_ai"], t["odch_std_rynek"]))

print("\nUdział ofert z czynszem powyżej 900 zł:")
print("  AI    %2d/%2d = %.0f%%" % (sum(1 for c in czynsz_ai if c > 900), len(czynsz_ai),
                                    100 * sum(1 for c in czynsz_ai if c > 900) / len(czynsz_ai)))
print("  rynek %2d/%2d = %.0f%%" % (sum(1 for c in czynsz_ry if c > 900), len(czynsz_ry),
                                    100 * sum(1 for c in czynsz_ry if c > 900) / len(czynsz_ry)))

print("\nLiczba różnych wartości mediów:")
print("  AI    %d  (%s)" % (len(set(media_ai)), sorted(set(media_ai))[:6]))
print("  rynek %d" % len(set(media_ry)))


# --- Walidacja wlasciwosci systemu W1 i W2 z 01-problem.md ------------------
import random

random.seed(1)

pas = [x for x in rynek if 2500 <= float(x["cena_bazowa"]) <= 3000]
przekracza = [x for x in pas if float(x["cena_bazowa"]) + float(x["czynsz_adm"]) > 3000]
nadwyzka = [100 * (float(x["cena_bazowa"]) + float(x["czynsz_adm"]) - 3000) / 3000 for x in przekracza]
print("\nW1 — filtr 'do 3000 zl', pas 2500–3000 zl (n=%d):" % len(pas))
print("  przekracza prog po doliczeniu czynszu: %d = %.0f%%" % (
    len(przekracza), 100 * len(przekracza) / len(pas)))
print("  przekroczenie: mediana %.0f%%, p10 %.0f%%, p90 %.0f%%" % (
    st.median(nadwyzka), p(nadwyzka, 0.1), p(nadwyzka, 0.9)))
print("  deklaracja w 01-problem.md: 8/8 = 100%, przekroczenie 17–35%")

odwrocone = par = 0
for _ in range(20000):
    a, b = random.sample(rynek, 2)
    ca, cb = float(a["cena_bazowa"]), float(b["cena_bazowa"])
    ra, rb = float(a["koszt_miesieczny_realny"]), float(b["koszt_miesieczny_realny"])
    if ca == cb:
        continue
    par += 1
    if (ca < cb) != (ra < rb):
        odwrocone += 1
print("\nW2 — odwrocenie porzadku kosztu w losowej parze ofert: %.1f%% (n=%d par)" % (
    100 * odwrocone / par, par))
