using InvoicingKart.Shared.DTO;

namespace InvoicingSystem.Repository;

public interface IProductRepository
{
    List<DTOProduct> GetProducts();
    DTOProduct? GetProductById(int productId);
    bool Add(DTOProduct dtoProduct);
    bool Update(DTOProduct dtoProduct);
    bool Delete(int productId);
}