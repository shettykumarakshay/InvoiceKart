using InvoicingKart.Entities;
using InvoicingKart.Shared.DTO;

namespace InvoicingSystem.Repository;

public class CustomerRepository: ICustomerRepository
{
    private List<Customer> _customers;

    public CustomerRepository()
    {
        _customers =
        [
            new() { Id = 1, Name = "Customer1", Email = "abc@gmail.com", Address = "ABC", ContactNumber = "1323124124124" },
            new() { Id = 2, Name = "Customer2", Email = "asd@gmail.com", Address = "AsffBC", ContactNumber = "623124124124" },
            new() { Id = 3, Name = "Customer3", Email = "add@gmail.com", Address = "asdsa", ContactNumber = "23124124124" },
            new () { Id = 4, Name = "Customer4", Email = "ghf@gmail.com", Address = "AsfsfBC", ContactNumber = "231124124" },
            new () { Id = 5, Name = "Customer5", Email = "fgfg@gmail.com", Address = "AsfsBC", ContactNumber = "224124124" },
        ];
    }
    public List<DTOCustomer> GetCustomers()
    {
        List<DTOCustomer> customers = new List<DTOCustomer>();

        foreach (var customer in _customers)
        {
            customers.Add(CustomerEntityMapper(customer));
        }

        return customers;
    }

    public DTOCustomer? GetCustomerById(int productId)
    {
        try
        {
            var customer = _customers.Where(e => e.Id == productId).FirstOrDefault();

            if (customer != null)
            {
                return CustomerEntityMapper(customer);

            }
            return null;
        }
        catch (Exception ex)
        {
            {
                return null;
            }
        }
    }

    public bool Add(DTOCustomer DTOCustomer)
    {
        try
        {
            Customer customer = CustomerDTOMapper(DTOCustomer);
            customer.Id = _customers.Max(e => e.Id) + 1;

            _customers.Add(customer);
            return true;
        }
        catch (Exception ex)
        {
            {
                return false;
            }
        }
    }

    public bool Update(DTOCustomer DTOCustomer)
    {
        try
        {
            var customer = _customers.Where(e => e.Id == DTOCustomer.Id).FirstOrDefault();

            if (customer != null)
            {
                customer.Name = DTOCustomer.Name;
                customer.Email = DTOCustomer.Email;
                customer.ContactNumber = DTOCustomer.ContactNumber;
                customer.Address = DTOCustomer.Address;
            }
            return true;
        }
        catch (Exception ex)
        {
            {
                return false;
            }
        }
    }

    public bool Delete(int customerId)
    {
        try
        {
            _customers.RemoveAll(p => p.Id == customerId);
            return true;
        }
        catch (Exception ex)
        {
            {
                return false;
            }
        }
    }

    // We can use AutoMapper feature Instead of below Code
    private DTOCustomer CustomerEntityMapper(Customer entity)
    {
        return new DTOCustomer
        {
            Id = entity.Id,
            Name = entity.Name,
            ContactNumber = entity.ContactNumber,
            Email = entity.Email,
            Address = entity.Address,
        };
    }

    private Customer CustomerDTOMapper(DTOCustomer dto)
    {
        return new Customer
        {
            Id = dto.Id,
            Name = dto.Name,
            ContactNumber = dto.ContactNumber,
            Email = dto.Email,
            Address = dto.Address,
        };
    }
}