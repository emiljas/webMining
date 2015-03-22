var ComparableDocument = require("./ComparableDocument");

var wikipediaArticles = [

  new ComparableDocument(
     "https://pl.wikipedia.org/wiki/Gastrolity",
     "zoologia"
  ),
  new ComparableDocument(
     "https://pl.wikipedia.org/wiki/Zamro%C5%BCone_zoo",
     "zoologia"
  ),
  new ComparableDocument(
     "https://pl.wikipedia.org/wiki/Fauna",
     "zoologia"
  ),
  new ComparableDocument(
     "https://pl.wikipedia.org/wiki/Anamorfoza_(biologia)",
     "zoologia"
  ),
  new ComparableDocument(
     "https://pl.wikipedia.org/wiki/Ichnologia",
     "zoologia"
  ),

   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Artur_Schnabel",
      "muzyka poważna"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Koncert_(forma_muzyczna)",
      "muzyka poważna"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Symfonia",
      "muzyka poważna"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Fuga_(muzyka)",
      "muzyka poważna"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Metal_neoklasyczny",
      "muzyka poważna"
   ),

   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Czas_dost%C4%99pu",
      "informatyka"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Stack_trace",
      "informatyka"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Zawieszenie_komputera",
      "informatyka"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Pe%C5%82ne_szyfrowanie_dysku",
      "informatyka"
   ),
   new ComparableDocument(
      "https://pl.wikipedia.org/wiki/Mapowanie",
      "informatyka"
   )

];

module.exports = wikipediaArticles;
