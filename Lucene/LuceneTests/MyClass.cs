using System;
using System.Collections.Generic;
using System.IO;
using NUnit.Framework;

using Lucene;
using Lucene.Net;
using Lucene.Net.Analysis;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Messages;
using Lucene.Net.QueryParsers;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Support;
using Lucene.Net.Util;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Analysis.Tokenattributes;
using Lucene.Net.Search.Function;
using Lucene.Net.Search.Payloads;
using Lucene.Net.Search.Spans;
using Lucene.Net.Support.Compatibility;
using Lucene.Net.Util.Cache;

namespace LuceneTests
{
	static class Consts
	{
		public static Lucene.Net.Util.Version LuceneVersion = Lucene.Net.Util.Version.LUCENE_30;
	}

	class Book
	{
		public Book(string title, string content)
		{
			Title = title;
			Content = content;
		}

		public string Title { get; set; }
		public string Content { get; set; }
	}

	class SearcherIndex
	{
		private Lucene.Net.Store.Directory _index;
		private IndexWriter _indexWriter;

		public SearcherIndex(Lucene.Net.Store.Directory index)
		{
			_index = index;
			StandardAnalyzer analyzer = new StandardAnalyzer(Consts.LuceneVersion);
			_indexWriter = new IndexWriter(_index, analyzer, IndexWriter.MaxFieldLength.UNLIMITED);
		}

		public void Add(Book book)
		{
			Document doc = new Document ();
			doc.Add (new Field ("title", book.Title, Field.Store.YES, Field.Index.ANALYZED));
			doc.Add (new Field ("content", book.Content, Field.Store.YES, Field.Index.NO));
			_indexWriter.AddDocument(doc);
		}

		public void Save()
		{
			_indexWriter.Dispose();
		}
	}

	class Searcher
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

			Query q = new QueryParser(Consts.LuceneVersion, "title", analyzer).Parse(query);

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




















	public class MyClass
	{
		[Test]
		public void A()
		{
			var index = new RAMDirectory();

			var searcherIndex = new SearcherIndex (index);
			searcherIndex.Add (new Book ("Romeo And Julia", "Romeo And Julia's content"));
			searcherIndex.Add (new Book ("How to cook", "How to cook's content"));
			searcherIndex.Save ();

			var searcher = new Searcher (index);
			var books = searcher.Search ("cook");

			Assert.AreEqual (1, books.Count);
			Assert.AreEqual ("How to cook", books [0].Title);
			Assert.AreEqual ("How to cook's content", books [0].Content);
		}
	}
}





/*
	public class LuceneTutorial
	{
		public static readonly Lucene.Net.Util.Version version = Lucene.Net.Util.Version.LUCENE_30;
		public static readonly string indexDirectory = "z:\\Projects\\UserFiles\\LuceneTut";

		public static void main(String[] args)
		{
			//create index in memors:
			//Directory index = new RAMDirectory();

			// Create index on disk
			Lucene.Net.Store.Directory index = FSDirectory.Open(indexDirectory);

			String query = "Molly";

			LuceneTutorial lucene = new LuceneTutorial();
			//lucene.buildIndex(index); // building should be performed only once when storing index on disk. 
			lucene.useIndex(index, query);
		}

		private void useIndex(Lucene.Net.Store.Directory index, String query)
		{
			StandardAnalyzer analyzer = new StandardAnalyzer(version);

			// go to: http://www.lucenetutorial.com/lucene-query-syntax.html
			// look at: http://www.lucenetutorial.com/lucene-query-builder.html
			Query q = new QueryParser(version, "title", analyzer).Parse(query);

			// Perform search
			int hitsPerPage = 5;

			IndexReader reader = IndexReader.Open(index, true);
			IndexSearcher searcher = new IndexSearcher(reader);

			TopScoreDocCollector collector = TopScoreDocCollector.Create(hitsPerPage, true);

			searcher.Search(q, collector);

			ScoreDoc[] hits = collector.TopDocs().ScoreDocs;

			// display results
			Console.WriteLine("Found " + hits.Length + " hits.");
			for(int i=0;i<hits.Length;++i)
			{
				int docId = hits[i].Doc;
				Document d = searcher.Doc(docId);
				Console.WriteLine((i + 1) + ". " + d.Get("title"));
			}

			// searcher can only be closed when there
			// is no need to access the documents any more.
			searcher.Dispose ();
		}

		private void buildIndex(Lucene.Net.Store.Directory index)
		{
			StandardAnalyzer analyzer = new StandardAnalyzer(version);

			// Add some titles
			IndexWriter indexWriter = new IndexWriter(index, analyzer, IndexWriter.MaxFieldLength.UNLIMITED);

			indexWriter.AddDocument(makeDocTitle("Hello World"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly 2"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly 3"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly 4"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly 5"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly 6"));
			indexWriter.AddDocument(makeDocTitle("Hello Molly 7"));

			indexWriter.Dispose();
		}

		private static Document makeDocTitle(String title)
		{
			Document doc = new Document();
			doc.Add(new Field("title", title, Field.Store.YES, Field.Index.ANALYZED));
			return doc;
		}
	}
*/