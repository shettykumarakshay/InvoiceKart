using InvoicingKart.Entities;
using InvoicingKart.Shared.DTO;

namespace InvoicingSystem.Repository;

public class CategoryRepository: ICategoryRepository
{
    private List<Category> _categories;

    public CategoryRepository()
    {
        _categories = new List<Category>()
        {
            new Category() { Id = 1, Name = "Category1", Description = "Description for Category 1" },
            new Category() { Id = 2, Name = "Category2", Description = "Description for Category 2" },
            new Category() { Id = 3, Name = "Category3", Description = "Description for Category 3" },
            new Category() { Id = 4, Name = "Category4", Description = "Description for Category 4" },
            new Category() { Id = 5, Name = "Category5", Description = "Description for Category 5" },
        };
    }
    public List<DTOCategory> GetCategories()
    {
        List<DTOCategory> categories = new List<DTOCategory>();

        foreach (var category in _categories)
        {
            categories.Add(CategoryEntityMapper(category));
        }

        return categories;
    }

    public DTOCategory? GetCategoryById(int productId)
    {
        try
        {
            var category = _categories.Where(e => e.Id == productId).FirstOrDefault();

            if (category != null)
            {
                return CategoryEntityMapper(category);

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

    public bool Add(DTOCategory DTOCategory)
    {
        try
        {
            Category category = CategoryDTOMapper(DTOCategory);
            category.Id = _categories.Max(e => e.Id) + 1;

            _categories.Add(category);
            return true;
        }
        catch (Exception ex)
        {
            {
                return false;
            }
        }
    }

    public bool Update(DTOCategory DTOCategory)
    {
        try
        {
            var category = _categories.Where(e => e.Id == DTOCategory.Id).FirstOrDefault();

            if (category != null)
            {
                category.Name = DTOCategory.Name;
                category.Description = DTOCategory.Description;
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

    public bool Delete(int categoryId)
    {
        try
        {
            _categories.RemoveAll(p => p.Id == categoryId);
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
    private DTOCategory CategoryEntityMapper(Category entity)
    {
        return new DTOCategory
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
        };
    }

    private Category CategoryDTOMapper(DTOCategory dto)
    {
        return new Category
        {
            Id = dto.Id,
            Name = dto.Name,
            Description = dto.Description,
        };
    }
}