using InvoicingKart.Shared.DTO;

namespace InvoicingSystem.Repository;

public interface ICategoryRepository
{
    List<DTOCategory> GetCategories();
    DTOCategory? GetCategoryById(int categoryId);
    bool Add(DTOCategory dtoCategory);
    bool Update(DTOCategory dtoCategory);
    bool Delete(int categoryId);
}