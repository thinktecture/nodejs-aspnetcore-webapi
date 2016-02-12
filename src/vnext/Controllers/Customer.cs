using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerWebApi
{
    [Route("api/[controller]")]
    public class Customer : Controller
    {
        private ICustomerService _customerService { get; set; }

        public Customer(ICustomerService customerService) {
            _customerService = customerService;
        }

        [HttpGet("list")]
        public IActionResult List()
        {
            return Ok(_customerService.List());
        }
        
        [HttpPost("")]
        public IActionResult Create(CustomerModel model) {
            _customerService.Create(model);
            return Ok();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id) {
            _customerService.Delete(id);
            return Ok();
        }
    }
}