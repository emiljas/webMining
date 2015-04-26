using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using NUnit.Framework;

namespace LuceneTests
{

	public class GutenbergBooksParserTests
	{
		[Test]
		public void Test()
		{
			string dir = Directory.GetCurrentDirectory ();
			int i = dir.LastIndexOf ("bin");
			dir = dir.Substring (0, i);

			var parser = new Lucene.GutenbergBooksParser (dir + "gutenberg");
			var books = parser.Parse ();

			Assert.AreEqual (3, books.Count);
			List<string> titles = (from book in books
			                       select book.Title).ToList ();
			Assert.Contains ("Apocolocyntosis", titles);
			Assert.Contains("An Old Babylonian Version of the Gilgamesh Epic", titles);
			Assert.Contains("The English Spy", titles);
		}
	}
}
