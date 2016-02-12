using System.Collections.Generic;

namespace CustomerWebApi
{
    public interface ICustomerService
    {
        IEnumerable<CustomerModel> List();
        void Create(CustomerModel model);
        void Delete(int id);
    }
}