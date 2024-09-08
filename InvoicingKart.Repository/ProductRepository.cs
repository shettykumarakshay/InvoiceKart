using InvoicingKart.Entities;
using InvoicingKart.Shared.DTO;
using System.Linq;

namespace InvoicingSystem.Repository;

public class ProductRepository : IProductRepository
{
    private List<Product> _products;
    private List<DTOCategory> _categories;

    private ICategoryRepository _categoryRepository;


    public ProductRepository(ICategoryRepository categoryRepository)
    {
        _products = new List<Product>()
        {
            new Product() { Id = 1, Name = "Product1", Description = "Description for Product 1", Quantity = 1, Price = 64, CategoryId = 3 },
            new Product() { Id = 2, Name = "Product2", Description = "Description for Product 2", Quantity = 7, Price = 17, CategoryId = 4 },
            new Product() { Id = 3, Name = "Product3", Description = "Description for Product 3" , Quantity = 3, Price = 94, CategoryId = 3},
            new Product() { Id = 4, Name = "Product4", Description = "Description for Product 4", Quantity = 9, Price = 4, CategoryId = 5 },
            new Product() {Id = 5, Name = "Product5", Description = "Description for Product 5", Quantity = 5, Price = 689, CategoryId = 2},
        };
        _categoryRepository = categoryRepository;
        _categories = _categoryRepository.GetCategories();
    }

    public List<DTOProduct> GetProducts()
    {
        var products = from product in _products
                       join category in _categories
                       on product.CategoryId equals category.Id
                       select new DTOProduct
                       {
                           Name = product.Name,
                           Description = product.Description,
                           Id = product.Id,
                           Price = product.Price,
                           Quantity = product.Quantity,
                           Discount = product.Discount,
                           Category = category.Name
                       };


        return products.ToList();
    }

    public DTOProduct? GetProductById(int productId)
    {
        try
        {
            var products = from product in _products
                           join category in _categories
                           on product.CategoryId equals category.Id
                           select new DTOProduct
                           {
                               Name = product.Name,
                               Description = product.Description,
                               Id = product.Id,
                               Price = product.Price,
                               Quantity = product.Quantity,
                               Discount = product.Discount,
                               CategoryId = category.Id
                           };

            return products.Where(e => e.Id == productId).FirstOrDefault(); ;
        }
        catch (Exception ex)
        {
            {
                return null;
            }
        }
    }

    public bool Add(DTOProduct dtoProduct)
    {
        try
        {
            Product product = ProductDTOMapper(dtoProduct);
            product.Id = _products.Max(e => e.Id) + 1;

            _products.Add(product);
            return true;
        }
        catch (Exception ex) {
            {
                return false;
            }
        }
    }

    public bool Update(DTOProduct dtoProduct)
    {
        try
        {
            var product = _products.Where(e => e.Id == dtoProduct.Id).FirstOrDefault();

            if (product != null)
            {
                product.Name = dtoProduct.Name;
                product.CategoryId = dtoProduct.CategoryId;
                product.Description = dtoProduct.Description;
                product.Price = dtoProduct.Price;
                product.Quantity = dtoProduct.Quantity;
                product.Discount = dtoProduct.Discount;
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

    public bool Delete(int productId)
    {
        try
        {
            _products.RemoveAll(p => p.Id == productId);
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
    private DTOProduct ProductEntityMapper(Product entity) {
        return new DTOProduct {
            Id = entity.Id,
            CategoryId = entity.CategoryId,
            Name = entity.Name,
            Description = entity.Description,
            Price = entity.Price,
            Quantity = entity.Quantity,
            Discount = entity.Discount
        };
    }

    private Product ProductDTOMapper(DTOProduct dto)
    {
        return new Product
        {
            Id = dto.Id,
            CategoryId = dto.CategoryId,
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Quantity = dto.Quantity,
            Discount = dto.Discount
        };
    }
}
