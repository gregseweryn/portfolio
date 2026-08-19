/**
 * Builds the comprehension-test form from research/07-comprehension-test.md.
 *
 * Randomised between-subjects design. Google Forms cannot randomise, so the
 * assignment rides on the parity of the respondent's birthday, which is
 * unrelated to the ability to read a listing and is not identifying.
 *
 * HOW TO RUN
 *   1. Upload the four PNGs from otodom-cost-mockup/stimuli/ to your Google
 *      Drive. Anywhere in My Drive; the script finds them by filename.
 *   2. Go to script.google.com, New project, paste this whole file.
 *   3. Run buildForm(). Approve the permission prompt on first run.
 *   4. The log prints the edit URL, the public URL and the responses sheet.
 *
 * If a filename does not match, the script stops with a clear error instead of
 * building a form with missing stimuli.
 */

var STIMULI = {
  a1_current:  'stim-a1-current.png',
  a1_redesign: 'stim-a1-redesign.png',
  a2_current:  'stim-a2-current.png',
  a2_redesign: 'stim-a2-redesign.png'
};

var IMAGE_WIDTH = 600;

function blobByName(name) {
  var it = DriveApp.getFilesByName(name);
  if (!it.hasNext()) {
    throw new Error(
      'Nie znaleziono pliku "' + name + '" na Dysku. Wgraj cztery pliki ' +
      'z otodom-cost-mockup/stimuli/ i uruchom ponownie.');
  }
  return it.next().getBlob();
}

function buildForm() {
  // Fail before creating anything if a stimulus is missing, so a failed run
  // does not leave a half-built form behind.
  var img = {};
  Object.keys(STIMULI).forEach(function (k) { img[k] = blobByName(STIMULI[k]); });

  var form = FormApp.create('Ogłoszenia mieszkaniowe: dwa krótkie pytania');
  form.setDescription(
    'Dwie minuty, dwa pytania.\n\n' +
    'Pokażę Ci zrzuty ogłoszeń wynajmu i zapytam o kwoty. Nie sprawdzam Twojej wiedzy, ' +
    'tylko to, czy ogłoszenia da się zrozumieć. Nie ma tu podchwytliwych pytań.\n\n' +
    'Ankieta jest anonimowa. Wyniki wykorzystam w projekcie do portfolio zawodowego.');
  form.setProgressBar(true);
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);

  // Pages are created first so the branching choices have something to point at.
  var pageA = form.addPageBreakItem().setTitle('Ogłoszenie');
  var itemsA = buildArm(form, img.a1_current, img.a2_current);

  var pageB = form.addPageBreakItem().setTitle('Ogłoszenie');
  var itemsB = buildArm(form, img.a1_redesign, img.a2_redesign);

  var pageC = form.addPageBreakItem().setTitle('Na koniec');
  buildCommon(form);

  // Arm A must jump over arm B.
  pageA.setGoToPage(pageC);
  pageB.setGoToPage(pageC);

  // The randomiser has to be moved to the top: it was added after the pages.
  var r1 = form.addMultipleChoiceItem();
  r1.setTitle('Dzień Twoich urodzin to liczba parzysta czy nieparzysta?')
    .setHelpText('Pytanie służy tylko do losowego podziału na dwie wersje ankiety.')
    .setChoices([
      r1.createChoice('Parzysta', pageA),
      r1.createChoice('Nieparzysta', pageB)
    ])
    .setRequired(true);
  form.moveItem(form.getItems().length - 1, 0);

  form.setConfirmationMessage(
    'Dzięki.\n\n' +
    'Jedno z ogłoszeń, które widziałeś, było w wersji obecnej, drugie w mojej ' +
    'przeprojektowanej. Sprawdzam, czy da się z nich odczytać realny koszt.\n\n' +
    'Kwota, która pojawia się na karcie jako pierwsza, to zwykle sam czynsz dla ' +
    'właściciela. Do tego dochodzi czynsz administracyjny, który w krakowskich ' +
    'ogłoszeniach wynosi zwykle około 22% tej kwoty, a bywa dużo wyższy.');

  var ss = SpreadsheetApp.create('Ogłoszenia mieszkaniowe — odpowiedzi');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('Edycja:     ' + form.getEditUrl());
  Logger.log('Do wysyłki: ' + form.getPublishedUrl());
  Logger.log('Odpowiedzi: ' + ss.getUrl());
  return form.getPublishedUrl();
}

/** One experimental arm: the same two tasks, differing only in the stimulus. */
function buildArm(form, imgSingle, imgPair) {
  form.addImageItem().setImage(imgSingle).setWidth(IMAGE_WIDTH)
      .setTitle('Ogłoszenie mieszkania na wynajem');

  var z1 = form.addTextItem()
    .setTitle('Ile zapłacisz za to mieszkanie co miesiąc?')
    .setHelpText('Podaj samą kwotę w złotych, na przykład 3200.')
    .setRequired(true);
  z1.setValidation(FormApp.createTextValidation()
    .setHelpText('Wpisz samą liczbę, bez słowa "zł".')
    .requireNumber().build());

  form.addScaleItem()
    .setTitle('Na ile jesteś pewien tej kwoty?')
    .setBounds(1, 5)
    .setLabels('Zupełnie niepewny', 'Całkowicie pewny')
    .setRequired(true);

  form.addImageItem().setImage(imgPair).setWidth(IMAGE_WIDTH)
      .setTitle('Dwa ogłoszenia');

  var z2 = form.addMultipleChoiceItem();
  z2.setTitle('Które z tych dwóch mieszkań będzie Cię kosztować mniej miesięcznie?')
    .setChoiceValues(['Ogłoszenie 1', 'Ogłoszenie 2', 'Nie da się tego ustalić z tych ogłoszeń'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Skąd to wiesz?')
    .setHelpText('Nieobowiązkowe, ale bardzo pomocne.')
    .setRequired(false);
}

/** Description of the sample. Not used to slice the results after the fact. */
function buildCommon(form) {
  form.addMultipleChoiceItem()
    .setTitle('Czy w ciągu ostatnich 24 miesięcy szukałeś mieszkania na wynajem?')
    .setChoiceValues(['Tak, w Krakowie', 'Tak, w innym mieście', 'Nie'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Ile razy w życiu wynajmowałeś mieszkanie?')
    .setChoiceValues(['Nigdy', 'Raz', 'Dwa razy', 'Trzy lub więcej'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Ile masz lat?')
    .setChoiceValues(['Do 24', '25-34', '35-44', '45 i więcej', 'Wolę nie podawać'])
    .setRequired(true);
}
