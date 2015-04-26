using System;
using System.IO;
using System.Collections.Generic;
using ICSharpCode.SharpZipLib.Zip;

namespace Lucene
{
	public class GutenbergBooksParser
	{
		private string _path;
		private List<string> _bookPaths = new List<string> ();

		public GutenbergBooksParser(string path)
		{
			_path = path;
		}

		public List<Lucene.Book> Parse()
		{
			var books = new List<Lucene.Book> ();
			RecursiveSearch (_path);

			foreach(var path in _bookPaths)
			{
				string content = ReadBookContent (path);

				var regex = new System.Text.RegularExpressions.Regex ("Title: .+");
				var match = regex.Match (content);

				string title = match.Value.Replace ("Title: ", "").Replace("\r", "");

				books.Add (new Lucene.Book (title, content));
			}

			return books;
		}

		private string ReadBookContent(string path)
		{
			using (var fs = new FileStream (path, FileMode.Open, FileAccess.Read))
			using (var zf = new ZipFile (fs)) {

				foreach (var fileName in zf) {
					var ze = zf.GetEntry (fileName.ToString ());
					using (var s = zf.GetInputStream (ze)) {
						return (new StreamReader (s)).ReadToEnd ();
					}
				}
			}
			return "";
		}

		private void RecursiveSearch(string dir)
		{
			foreach (string d in Directory.GetDirectories(dir))
			{
				foreach (string f in Directory.GetFiles(d))
				{
					_bookPaths.Add (f);
				}
				RecursiveSearch(d);
			}
		}
	}
}

