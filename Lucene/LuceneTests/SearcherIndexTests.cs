using System;
using System.Collections.Generic;
using System.IO;
using Lucene;
using Lucene.Net.Store;
using NUnit.Framework;

namespace LuceneTests
{
	public class SearcherIndexTests
	{
		[Test]
		public void Test()
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
		}
	}
}
