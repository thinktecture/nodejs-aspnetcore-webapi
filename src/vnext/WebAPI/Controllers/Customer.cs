using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Authorization;

namespace CustomerWebApi
{
    [Route("api/[controller]")]
    [Authorize]
    [Produces("application/json")]
    public class Customer : Controller
    {
        private ICustomerService _customerService { get; set; }

        public Customer(ICustomerService customerService) {
            _customerService = customerService;
        }

        /// <summary>
        /// This method will return all currently saved customers. 
        /// </summary>
        [HttpGet("list")]
        [Produces(typeof(CustomerModel[]))]
        public IActionResult List()
        {
            return Ok(_customerService.List());
        }
        
        /// <summary>
        /// This method creates a new customer.
        /// </summary>
        [HttpPost("")]
        public IActionResult Create([FromBody] CustomerModel model) {
            _customerService.Create(model);
            return Ok();
        }
       
        /// <summary>
        /// This methods deletes a given customer. 
        /// </summary>
        /// <param name="id">The id of the user to delete</param>
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            _customerService.Delete(id);
            return Ok();
        }
    }
}