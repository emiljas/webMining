using System;
using System.Collections.Generic;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers;
using Lucene.Net.Search;

namespace Lucene
{
	public class Searcher
	{
		private Lucene.Net.Store.Directory _index;

		public Searcher(Lucene.Net.Store.Directory index)
		{
			_index = index;
		}

		public List<Book> Search(QueryParams query)
		{
			var books = new List<Book> ();

			StandardAnalyzer analyzer = new StandardAnalyzer(Consts.LuceneVersion);

			var mainQuery = new BooleanQuery ();

			Occur occur = query.LogicOperator == LogicOperator.And ? Occur.MUST : Occur.SHOULD;

			if (query.IsTitleSearchingEnabled) {
				var titleQuery = new TermQuery (new Term ("title", query.Input));
				mainQuery.Add (titleQuery, occur);
			}

			if (query.IsContentSearchingEnabled) {
				var contentQuery = new TermQuery (new Term ("content", query.Input));
				mainQuery.Add (contentQuery, occur);
			}


//			Query q = /*new QueryParser(Consts.LuceneVersion, "title", analyzer)*/
//				new MultiFieldQueryParser (Consts.LuceneVersion, new string[]{ /*"title",*/ "content" }, analyzer).Parse(query.Input);



			int hitsPerPage = 5;

			IndexReader reader = IndexReader.Open(_index, true);
			IndexSearcher searcher = new IndexSearcher(reader);

			TopScoreDocCollector collector = TopScoreDocCollector.Create(hitsPerPage, true);

			searcher.Search(mainQuery, collector);

			ScoreDoc[] hits = collector.TopDocs().ScoreDocs;

			for(int i=0;i<hits.Length;++i)
			{
				int docId = hits[i].Doc;
				Document d = searcher.Doc(docId);

				books.Add (new Book (d.Get ("title"), d.Get ("content")));
			}

			searcher.Dispose ();

			return books;
		}
	}
}

