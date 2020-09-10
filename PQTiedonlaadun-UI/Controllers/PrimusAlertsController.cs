using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PQ_TiedonLaatuService.Data;
using PQTiedonlaadun_UI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PQTiedonlaadun_UI.Controllers
{
    //[Microsoft.AspNetCore.Authorization.Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PrimusAlertsController : Controller
    {
        private readonly PrimusAlertContext _primusAlertContext;

        public PrimusAlertsController(PrimusAlertContext primusAlertContext)
        {
            _primusAlertContext = primusAlertContext ?? throw new ArgumentNullException(nameof(primusAlertContext));
        }

        // GET: api/<controller>
        [HttpGet]
        public List<Alert> Get()
        {
            List<IGrouping<string, PQ_TiedonLaatuService.Models.Database.PrimusAlert>> q = (from a in _primusAlertContext.PrimusAlerts select a).ToList().OrderBy(x => x.CardNumber).GroupBy(y => y.CardNumber).ToList();
            var responses = new List<Alert>();
            foreach(var z in q)
            {
                DateTime firstDate = DateTime.MaxValue; DateTime lastDate = DateTime.MinValue;
                var CardNumber = z.Key; String name = String.Empty; String receiver = String.Empty;
                foreach (var a in z)
                {
                    firstDate = firstDate > a.SentDate ? a.SentDate : firstDate;
                    lastDate  = lastDate  < a.SentDate ? a.SentDate : lastDate;
                    name = _primusAlertContext.AlertTypes.Where(x => x.Id == a.AlertTypeId).FirstOrDefault().Name;
                    receiver = _primusAlertContext.AlertReceivers.Where(x => x.Id ==  a.AlertReceiverId).FirstOrDefault().Email;
                }
                double days = (lastDate.Date - firstDate.Date).TotalDays;
                int daysInt = (int)days;
                responses.Add(new Alert { Days = daysInt, FirstDate = firstDate, LastDate = lastDate, CardNumber = CardNumber, AlertName = name, Receiver = receiver });
            }

            return responses;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
