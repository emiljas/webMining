using System;
using System.IO;
using System.Collections.Generic;
using ICSharpCode.SharpZipLib.Zip;

namespace Lucene
{
	public class GutenbergBooksParser
	{
		private static System.Text.RegularExpressions.Regex regex = new System.Text.RegularExpressions.Regex ("Title: .+");

		private string _path;
		private List<string> _bookPaths = new List<string> ();

		public GutenbergBooksParser(string path)
		{
			_path = path;
		}

		public void Parse(Action<Book> action)
		{
			RecursiveSearch (_path);

			foreach(var path in _bookPaths)
			{
				string content = ReadBookContent (path);

				if (content != "") {
					var match = regex.Match (content);

					string title = match.Value.Replace ("Title: ", "").Replace("\r", "");

					action (new Lucene.Book (title, content));
				}
			}
		}

		private string ReadBookContent(string path)
		{
			if (path.ToLower ().EndsWith (".zip")) {
				try {
					using (var fs = new FileStream (path, FileMode.Open, FileAccess.Read))
					using (var zf = new ZipFile (fs)) {

						foreach (var fileName in zf) {
							var ze = zf.GetEntry (fileName.ToString ());
							using (var s = zf.GetInputStream (ze)) {
								return (new StreamReader (s)).ReadToEnd ();
							}
						}
					}
				} catch {
					return "";
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

