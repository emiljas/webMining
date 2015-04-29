using System;

namespace Lucene
{
	class MainClass
	{
		private static QueryParams query = new QueryParams();

		public static void Main (string[] args)
		{
			query.IsTitleSearchingEnabled = true;
			query.IsContentSearchingEnabled = true;
			query.LogicOperator = LogicOperator.Or;

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
				if (query.IsTitleSearchingEnabled && query.IsContentSearchingEnabled)
					Console.WriteLine ("l - and or or");
				Console.WriteLine ("q - quit");

				Console.WriteLine ();
				Console.Write ((query.IsTitleSearchingEnabled ? "[X]" : "[ ]") + " title");
				Console.Write ("     ");
				Console.Write ((query.IsContentSearchingEnabled ? "[X]" : "[ ]") + " content");
				if (query.IsTitleSearchingEnabled && query.IsContentSearchingEnabled) {
					Console.Write ("     ");
					Console.Write ((query.LogicOperator == LogicOperator.Or ? "[X]" : "[ ]") + " or");
					Console.Write ("     ");
					Console.Write ((query.LogicOperator == LogicOperator.And ? "[X]" : "[ ]") + " add");
				}
				Console.WriteLine ();

				Console.Write ("input: ");
				string input = Console.ReadLine ();

				if (input == "t") {
					query.IsTitleSearchingEnabled = !query.IsTitleSearchingEnabled;
				} else if (input == "c") {
					query.IsContentSearchingEnabled = !query.IsContentSearchingEnabled;
				} else if(input == "l") {
					query.LogicOperator = query.LogicOperator == LogicOperator.And ? LogicOperator.Or : LogicOperator.And;
				} else if(input == "q") {
					break;
				} else {
					query.Input = input;
					var results = searcher.Search (query);
					Console.WriteLine ("results: " + results.Count);
					for (int i = 0; i < Math.Min (5, results.Count); i++)
						Console.WriteLine (results [i].Title);
				}
				Console.WriteLine ("-----------------------------------------------");
				Console.WriteLine ("-----------------------------------------------");
				Console.WriteLine ();

			}





			Console.WriteLine ("done.");
			Console.ReadKey ();
		}
	}
}

