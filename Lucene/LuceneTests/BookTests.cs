using System;
using NUnit.Framework;

namespace LuceneTests
{
	public class BookTests
	{
		[Test]
		public void Test()
		{
			string content = "";
			content += "a\n";
			content += "*** START OF THIS PROJECT GUTENBERG EBOOK THE WARRIORS ***\n";
			content += "b\n";
			content += "*** END OF THIS PROJECT GUTENBERG EBOOK THE WARRIORS ***\n";
			content += "c\n";

			var book = new Lucene.Book ("title", content);

			Assert.AreEqual ("b\n", book.Content);


			/*



***START OF THE PROJECT GUTENBERG EBOOK GUTTA-PERCHA WILLIE***
***END OF THE PROJECT GUTENBERG EBOOK GUTTA-PERCHA WILLIE***

*** START OF THIS PROJECT GUTENBERG EBOOK RENASCENCE AND OTHER POEMS ***
*** END OF THIS PROJECT GUTENBERG EBOOK RENASCENCE AND OTHER POEMS ***
*/
		}
	}
}

