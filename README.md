# InvoiceKart
Quick Start Guide:
Application is build using .Net 8  and Angular 18 

Prerequisites:
------------------
.NET 8 SDK. - 8.0.401
Node.js - v20.17.0
npm - 10.8.2
angular CLI - v18.2.3

**
Please follow below instructions to run the application**
-----------------------------------------------------------

Build and Run Angualr project in below folder path ( or host)
  InvoiceKart\InvoicingKart.Presentation\invoicing-kart

Run Web API project (or host)
  InvoiceKart.sln
Which has 
1 WebAPI Project - InvoiceKart\InvoicingKart.WebAPI
3 Class Library Project - InvoiceKart\InvoicingKart.Entity
                        - InvoicingKart.Repository
                        - InvoiceKart\InvoicingKart.Shared



  
Configuration Changes:
----------------------
In Angular project in environment file update web api base URL



// For now Data is stored in InMemory in list

**Application Details:**
Has 4 main Tabs
1. Products - For Manageing Products
2. Category - For Manageing Category
3. Customer - For Managing Customer
4. Purchase - Select  the Customer,
               Add Products to the cart or Remove From the Cart
               Purchase Order
               Select the Payment Method
               Generate Invoice
   
**Improveents:**
DataBase Storage
Authentication
Dockerization

Application SnapShots:
Product Lists
<img width="959" alt="image" src="https://github.com/user-attachments/assets/e2cdec7a-3179-49a8-8cae-a59bd7435da2">

Add/Edit Product
<img width="958" alt="image" src="https://github.com/user-attachments/assets/15b2fb73-68ab-488d-b53f-32a50f97fa8f">

Purchase Product for Selected Customer
<img width="958" alt="image" src="https://github.com/user-attachments/assets/51ee53fe-ba66-45b8-8c21-39edc5c29b2b">

Add/Remove Cart and Place Order
<img width="959" alt="image" src="https://github.com/user-attachments/assets/cc61f9c8-e32a-4988-99ef-4eea82df1123">

Select Payment Method
<img width="960" alt="image" src="https://github.com/user-attachments/assets/22878841-e013-44eb-8f83-efec8a3e0102">

Generated Invoice
<img width="959" alt="image" src="https://github.com/user-attachments/assets/116ce2fb-8b16-4a6b-aed0-53d2abdb4edf">





