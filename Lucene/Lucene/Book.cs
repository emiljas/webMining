using System;
using System.Text.RegularExpressions;

namespace Lucene
{
	public class Book
	{
		private static Regex startRegex = new Regex ("[*][*][*][ ]?START OF THIS PROJECT GUTENBERG.+[*][*][*]\n");
		private static Regex endRegex = new Regex ("[*][*][*][ ]?END OF THIS PROJECT GUTENBERG.+[*][*][*]");

		public Book(string title, string content)
		{
			Title = title;
			Content = ParseContent(content);
		}

		public string ParseContent(string content)
		{
			return content;
//			var startMatch = startRegex.Match (content);
//			int startIndex = startMatch.Index + startMatch.Length;
//
//			int endIndex = endRegex.Match (content).Index;
//
//			return content.Substring (startIndex, endIndex - startIndex);
		}

		public string Title { get; set; }
		public string Content { get; set; }
	}
}

