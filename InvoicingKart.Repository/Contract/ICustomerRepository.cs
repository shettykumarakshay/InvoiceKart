using InvoicingKart.Shared.DTO;

namespace InvoicingSystem.Repository;

public interface ICustomerRepository
{
    List<DTOCustomer> GetCustomers();
    DTOCustomer? GetCustomerById(int customerId);
    bool Add(DTOCustomer dtoCustomer);
    bool Update(DTOCustomer dtoCustomer);
    bool Delete(int customerId);
}