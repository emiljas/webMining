using System;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;

namespace Lucene
{
	public class SearcherIndex
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
}

