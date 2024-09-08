
using InvoicingKart.Shared.DTO;
using InvoicingSystem.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InvoicingKart.WebAPI;

[ApiController]
[Route("api/Customer")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerController(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    [HttpGet]
    public IActionResult GetCustomers()
    {
        var customers = _customerRepository.GetCustomers();
        return Ok(customers);
    }


    [Route("Id")]
    [HttpGet]
    public IActionResult GetCustomerById(int customerId)
    {
        // Validation
        if (customerId < 1)
            return BadRequest("Invalid Customer details");
        var customer = _customerRepository.GetCustomerById(customerId);
        return Ok(customer);
    }

    [HttpPost]
    public IActionResult AddCustomer(DTOCustomer Customer)
    {
        // Validation
        if (string.IsNullOrEmpty(Customer.Name))
            return BadRequest("Invalid Customer details");

        var result = _customerRepository.Add(Customer);
        return Ok(result);
    }

    [HttpPut]
    public IActionResult UpdateCustomer(DTOCustomer Customer)
    {
        // Validation
        if (Customer.Id < 1 || string.IsNullOrEmpty(Customer.Name))
            return BadRequest("Invalid Customer details");

        var result = _customerRepository.Update(Customer);
        return Ok(result);
    }

    [HttpDelete]
    public IActionResult DeleteCustomer(int CustomerId)
    {
        // Validation
        if (CustomerId < 1)
            return BadRequest("Invalid Customer details");

        var result = _customerRepository.Delete(CustomerId);
        return Ok(result);
    }
}
