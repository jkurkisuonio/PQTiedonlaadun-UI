using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PQ_TiedonLaatuService.Data;
using PQ_TiedonLaatuService.Models.Database;
using PQTiedonlaadun_UI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PQTiedonlaadun_UI.Controllers
{
 

    [Route("api/[controller]")]
    public class PrimusTypesController : Controller
    {
        private readonly PrimusAlertContext _primusAlertContext;
        public PrimusTypesController(PrimusAlertContext primusAlertContext)
        {
            this._primusAlertContext = primusAlertContext;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public List<AlertypeRest> Get(int id)
        {
            List<AlertypeRest> responses = ReturnAlertTypes();

            return responses;
        }

        private List<AlertypeRest> ReturnAlertTypes()
        {
            List<PQ_TiedonLaatuService.Models.Database.AlertType> q = (from a in _primusAlertContext.AlertTypes select a).ToList();
            var responses = new List<AlertypeRest>();
            foreach (var r in q)
            {
                responses.Add(new AlertypeRest
                {
                    AlertMsgSubject = r.AlertMsgSubject,
                    AlertMsgText = r.AlertMsgText,
                    CardNumber = r.CardNumber,
                    Description = r.Description,
                    Id = r.Id,
                    IsInUse = r.IsInUse,
                    Name = r.Name,
                    PrimusAlerts = r.PrimusAlerts,
                    QueryName = r.QueryName,
                    QueryString = r.QueryString,
                    link = "api/primustypes/" + r.Id
                });
            }

            return responses;
        }

        // POST api/<controller>
        [HttpPost]
        public int Post([FromBody]AlertypeRest v)
        {
            AlertypeRest newAlertypeRest = new AlertypeRest
            {
                AlertMsgSubject = v.AlertMsgSubject,
                AlertMsgText = v.AlertMsgText,
                CardNumber = v.CardNumber,
                Description = v.Description,
                IsInUse = v.IsInUse,
                Name = v.Name,
                QueryName = v.QueryName,
                QueryString = v.QueryString
            };
            _primusAlertContext.AlertTypes.Add(newAlertypeRest);
            int q = _primusAlertContext.SaveChanges();

            return q;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")] 
        //public void Put(int id, [FromBody]string value)
        public void Put(int id, [FromBody]AlertypeRest v)
        {       

            var q = (from b in _primusAlertContext.AlertTypes where b.Id == id select b).FirstOrDefault();
            q.Description = v.Description;
            q.AlertMsgSubject = v.AlertMsgSubject;
            q.AlertMsgText = v.AlertMsgText;
            q.CardNumber = v.CardNumber;
            q.IsInUse = v.IsInUse;
            q.QueryName = v.QueryName;
            q.QueryString = v.QueryString;
            q.Name = v.Name;
            //AlertType a = new AlertType { QueryString = v.QueryString, QueryName = v.QueryName, AlertMsgSubject = v.AlertMsgSubject,
            //    AlertMsgText = v.AlertMsgText, CardNumber = v.CardNumber, Description = v.Description, Id = v.Id, IsInUse = v.IsInUse, Name = v.Name };
            _primusAlertContext.AlertTypes.Update(q);
            _primusAlertContext.SaveChanges();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
