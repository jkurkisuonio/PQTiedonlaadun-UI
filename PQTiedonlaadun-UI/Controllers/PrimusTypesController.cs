using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PQ_TiedonLaatuService.Data;

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
        public List<PQ_TiedonLaatuService.Models.Database.AlertType> Get(int id)
        {
            List<PQ_TiedonLaatuService.Models.Database.AlertType> q = (from a in _primusAlertContext.AlertTypes select a).ToList();
            return q;
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
