using InvoicingKart.Entities;
using InvoicingKart.Shared.DTO;
using InvoicingSystem.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InvoicingKart.WebAPI;


[ApiController]
[Route("api/Product")]

public class ProductController : ControllerBase
{
    private readonly IProductRepository _productRepository;

    public ProductController(IProductRepository productRepository) {
        _productRepository = productRepository;
    }

    [HttpGet]
    public IActionResult GetProducts()
    {
        var products = _productRepository.GetProducts();
        return Ok(products);
    }


    [Route("Id")]
    [HttpGet]
    public IActionResult GetProductById(int productId)
    {
        // Validation
        if (productId < 1)
            return BadRequest("Invalid product details");
        var product = _productRepository.GetProductById(productId);
        return Ok(product);
    }

    [HttpPost]
    public IActionResult AddProduct(DTOProduct product)
    {
        // Validation
        if (string.IsNullOrEmpty(product.Name) || product.Price <= 0 || product.Quantity < 0)
            return BadRequest("Invalid product details");

        var result = _productRepository.Add(product);
        return Ok(result);
    }

    [HttpPut]
    public IActionResult UpdateProduct(DTOProduct product)
    {
        // Validation
        if (product.Id < 1 || string.IsNullOrEmpty(product.Name) || product.Price <= 0 || product.Quantity < 0)
            return BadRequest("Invalid product details");

        var result = _productRepository.Update(product);
        return Ok(result);
    }

    [HttpDelete]
    public IActionResult DeleteProduct(int productId)
    {
        // Validation
        if (productId < 1)
            return BadRequest("Invalid product details");

        var result = _productRepository.Delete(productId);
        return Ok(result);
    }

}