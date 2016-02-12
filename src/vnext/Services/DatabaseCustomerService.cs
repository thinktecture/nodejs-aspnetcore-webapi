using System;
using System.Collections.Generic;

using System.Linq;

namespace CustomerWebApi
{
    public class DatabaseCustomerService : ICustomerService
    {
        private CustomerContext _context { get; set; }

        public DatabaseCustomerService(CustomerContext context)
        {
            _context = context;
        }

        public void Create(CustomerModel model)
        {

            _context.Customers.Add(model);
            _context.SaveChanges();

        }

        public void Delete(int id)
        {
            var entity = _context.Customers.Single(e => e.Id == id);

            if (entity != null)
            {
                _context.Customers.Remove(entity);
                _context.SaveChanges();
            }
        }

        public IEnumerable<CustomerModel> List()
        {
            return _context.Customers.ToList();
        }
    }
}