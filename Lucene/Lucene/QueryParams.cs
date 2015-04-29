using System;

namespace Lucene
{
	public class QueryParams
	{
		public bool IsTitleSearchingEnabled { get; set; }
		public bool IsContentSearchingEnabled{ get; set; }
		public LogicOperator LogicOperator{ get; set; }
		public string Input { get; set; }
	}
}

