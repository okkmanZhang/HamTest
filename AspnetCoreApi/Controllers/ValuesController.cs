using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspnetCoreApi.EF;
using Microsoft.EntityFrameworkCore;

namespace AspnetCoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private SqlDBContext _SqlDBContext;
        public ValuesController(SqlDBContext dBContext){
            _SqlDBContext = dBContext;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IList<Person>> Get()
        {
           
            
            return  _SqlDBContext.Persons.Include(p => p.Grade).ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
