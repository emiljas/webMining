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

		public List<Book> Search(string query)
		{
			var books = new List<Book> ();

			StandardAnalyzer analyzer = new StandardAnalyzer(Consts.LuceneVersion);

			Query q = /*new QueryParser(Consts.LuceneVersion, "title", analyzer)*/
				new MultiFieldQueryParser (Consts.LuceneVersion, new string[]{ /*"title",*/ "content" }, analyzer).Parse(query);

			int hitsPerPage = 5;

			IndexReader reader = IndexReader.Open(_index, true);
			IndexSearcher searcher = new IndexSearcher(reader);

			TopScoreDocCollector collector = TopScoreDocCollector.Create(hitsPerPage, true);

			searcher.Search(q, collector);

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

