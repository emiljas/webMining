using System;

namespace Lucene
{
	public class Book
	{
		public Book(string title, string content)
		{
			Title = title;
			Content = content;
		}

		public string Title { get; set; }
		public string Content { get; set; }
	}
}

