
using InvoicingKart.Shared.DTO;
using InvoicingSystem.Repository;
using Microsoft.AspNetCore.Mvc;

namespace InvoicingKart.WebAPI;

[ApiController]
[Route("api/Category")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public IActionResult GetCategories()
    {
        var categories = _categoryRepository.GetCategories();
        return Ok(categories);
    }


    [Route("Id")]
    [HttpGet]
    public IActionResult GetCategoryById(int categoryId)
    {
        // Validation
        if (categoryId < 1)
            return BadRequest("Invalid Category details");
        var category = _categoryRepository.GetCategoryById(categoryId);
        return Ok(category);
    }

    [HttpPost]
    public IActionResult AddCategory(DTOCategory Category)
    {
        // Validation
        if (string.IsNullOrEmpty(Category.Name))
            return BadRequest("Invalid Category details");

        var result = _categoryRepository.Add(Category);
        return Ok(result);
    }

    [HttpPut]
    public IActionResult UpdateCategory(DTOCategory Category)
    {
        // Validation
        if (Category.Id < 1 || string.IsNullOrEmpty(Category.Name))
            return BadRequest("Invalid Category details");

        var result = _categoryRepository.Update(Category);
        return Ok(result);
    }

    [HttpDelete]
    public IActionResult DeleteCategory(int CategoryId)
    {
        // Validation
        if (CategoryId < 1)
            return BadRequest("Invalid Category details");

        var result = _categoryRepository.Delete(CategoryId);
        return Ok(result);
    }
}