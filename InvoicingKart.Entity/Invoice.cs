namespace InvoicingKart.Entities;

public class Invoice
{
    public int Id { get; set; }
    public Customer Customer { get; set; }
    public List<Product> Products { get; set; }
    public decimal TotalAmount { get; set; }
    public string PaymentOption { get; set; }
    public decimal Discount { get; set; }

    // public decimal CalculateTotal()
    // {
    //     decimal total = Products.Sum(p => p.Price * p.Quantity);
    //     total -= Discount;
    //     // Apply tax if needed
    //     return total;
    // }
}