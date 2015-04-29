using System;

namespace Lucene
{
	class MainClass
	{
		private static bool isTitleSearchingEnabled = true;
		private static bool isContentSearchingEnabled = false;

		public static void Main (string[] args)
		{
			var index = Lucene.Net.Store.FSDirectory.Open (Consts.IndexPath);





//			var searcherIndex = new SearcherIndex (index);
//			var gutenbergBooksParser = new GutenbergBooksParser (Consts.GutenbergBooksPath);
//			int i = 0;
//			gutenbergBooksParser.Parse ((book) => {
//				if(i % 1000 == 0)
//					Console.WriteLine(i);
//				i++;
//				searcherIndex.Add (book);
//			});
//			searcherIndex.Save ();






			var searcher = new Searcher (index);
			while (true) {
				Console.WriteLine ("t - toggle title searching");
				Console.WriteLine ("c - toggle content searching");
				Console.WriteLine ("q - quit");

				Console.WriteLine ();
				Console.Write ((isTitleSearchingEnabled ? "[X]" : "[ ]") + " title");
				Console.Write ("\t");
				Console.Write ((isContentSearchingEnabled ? "[X]" : "[ ]") + " content");
				Console.WriteLine ();

				Console.Write ("input: ");
				string input = Console.ReadLine ();

				if (input == "t") {
					isTitleSearchingEnabled = !isTitleSearchingEnabled;
				} else if (input == "c") {
					isContentSearchingEnabled = !isContentSearchingEnabled;
				} else {
					var results = searcher.Search ("already");
					Console.WriteLine ("results: " + results.Count);
					for (int i = 0; i < Math.Min (5, results.Count); i++)
						Console.WriteLine (results [i].Title);
				}
				Console.WriteLine ();

			}





			Console.WriteLine ("done.");
			Console.ReadKey ();
		}
	}
}

