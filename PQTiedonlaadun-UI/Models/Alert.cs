using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PQTiedonlaadun_UI.Models
{
    public class Alert
    {
       public DateTime LastDate { get; set; }
        public DateTime FirstDate { get; set; }
        public int Days { get; set; }
        public string CardNumber { get; set; }
        public string Receiver { get; set; }
        public string AlertName { get; set; }
    }
}
