
namespace InvoicingKart.Shared.DTO;

public class Invoice
{
    public int Id { get; set; }
    public DTOCustomer Customer { get; set; }
    public List<DTOProduct> Products { get; set; }
    public decimal TotalAmount { get; set; }
    public string PaymentOption { get; set; }
    public decimal Discount { get; set; }

    public decimal CalculateTotal()
    {
        decimal total = Products.Sum(p => p.Price * p.Quantity);
        total -= Discount;
        // Apply tax if needed
        return total;
    }
}