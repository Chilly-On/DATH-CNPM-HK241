DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
-- CREATE ROLE admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

-- Bảng độc lập
CREATE TABLE Category (
    CategoryId 	INTEGER,
    Category 	VARCHAR(100),
	PRIMARY KEY (CategoryId)
);

CREATE TABLE Staff (
    StaffId 	INTEGER,
    Name 		VARCHAR(100),
    Address 	VARCHAR(200),
    Email 		VARCHAR(100) 	UNIQUE,
    PhoneNumber VARCHAR(15),
    Salary 		FLOAT,
    Role 		VARCHAR(50),
	PRIMARY KEY (StaffId)
);

CREATE TABLE Cart (
    CartId 		INTEGER,
	PRIMARY KEY (CartId)
);

CREATE TABLE Customer (
    CustomerId 		INTEGER,
    Name 			VARCHAR(100),
    Address 		VARCHAR(200),
    Email 			VARCHAR(100) 	UNIQUE,
    PhoneNumber			VARCHAR(15),
    Membership 		VARCHAR(50),
    Point 			INTEGER,
    CartId 			INTEGER,
	PRIMARY KEY (CustomerId),
    CONSTRAINT FK_Customer_Cart FOREIGN KEY (CartId) REFERENCES Cart(CartId)
);

CREATE TABLE Product (
    ProductId 		SERIAL,
    Name 			VARCHAR(100),
    Price 			FLOAT,
    Quantity 		INTEGER,
    Warranty 		VARCHAR(50),
    Brand 			VARCHAR(50),
    Description 	VARCHAR(500),
	OtherInfor 		VARCHAR(500),
    Image 			VARCHAR(200),
    CategoryId 		INTEGER,
	PRIMARY KEY (ProductId),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);

-- Bảng phụ thuộc
CREATE TABLE Shipment (
    ShipmentId INTEGER,
    Status VARCHAR(50),
    DateShipped DATE,
    ShipperId INTEGER,
	PRIMARY KEY (ShipmentId),
    CONSTRAINT FK_Shipment_Shipper FOREIGN KEY (ShipperId) REFERENCES Staff(StaffId)
);

CREATE TABLE Payment (
    PaymentId INTEGER,
    Total FLOAT,
    CreationDate DATE,
    PayDate DATE,
    Status VARCHAR(50),
    CustomerId INTEGER,
	PRIMARY KEY (PaymentId),
    CONSTRAINT FK_Payment_Customer FOREIGN KEY (CustomerId) REFERENCES Customer(CustomerId)
);

CREATE TABLE Orders (
    OrderId INTEGER,
    CreationDate DATE,
    Status VARCHAR(50),
    UserId INTEGER,
    PaymentId INTEGER,
    ShipmentId INTEGER,
	PRIMARY KEY (OrderId),
    CONSTRAINT FK_Order_Customer FOREIGN KEY (UserId) REFERENCES Customer(CustomerId),
    CONSTRAINT FK_Order_Payment FOREIGN KEY (PaymentId) REFERENCES Payment(PaymentId),
    CONSTRAINT FK_Order_Shipment FOREIGN KEY (ShipmentId) REFERENCES Shipment(ShipmentId)
);

CREATE OR REPLACE PROCEDURE export_csv(to_path TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Export the Product table to a CSV file
    EXECUTE format(
        'COPY (SELECT 
            p.ProductId, 
            p.Name, 
            p.Price, 
            p.Quantity, 
            p.Description, 
            p.Image, 
            c.Category 
         FROM 
            Product p 
         LEFT JOIN 
            Category c 
         ON 
            p.CategoryId = c.CategoryId) 
         TO %L WITH CSV HEADER',
         to_path
    );
END;
$$;


--cart
INSERT INTO Cart (CartId) VALUES (1);
INSERT INTO Cart (CartId) VALUES (2);
INSERT INTO Cart (CartId) VALUES (3);
--staff
INSERT INTO Staff (StaffId, Name, Address, Email, PhoneNumber, Salary, Role) 
VALUES (1, 'Alice Johnson', '123 Main St, City A', 'alice.johnson@example.com', '555-1234', 5000.00, 'Manager');

INSERT INTO Staff (StaffId, Name, Address, Email, PhoneNumber, Salary, Role) 
VALUES (2, 'Bob Smith', '456 Oak St, City B', 'bob.smith@example.com', '555-5678', 3500.00, 'Sales');

INSERT INTO Staff (StaffId, Name, Address, Email, PhoneNumber, Salary, Role) 
VALUES (3, 'Charlie Brown', '789 Pine St, City C', 'charlie.brown@example.com', '555-9101', 4000.00, 'Shipper');
--categogy
INSERT INTO Category (CategoryId, Category) VALUES (1, 'Smartphones');
INSERT INTO Category (CategoryId, Category) VALUES (2, 'Accessories');
INSERT INTO Category (CategoryId, Category) VALUES (3, 'Tablets');
--customer
INSERT INTO Customer (CustomerId, Name, Address, Email, PhoneNumber, Membership, Point, CartId) 
VALUES (1, 'John Doe', '101 Maple St, City A', 'john.doe@example.com', '123-456-1234', 'Gold', 500, 1);

INSERT INTO Customer (CustomerId, Name, Address, Email, PhoneNumber, Membership, Point, CartId) 
VALUES (2, 'Jane Smith', '202 Birch St, City B', 'jane.smith@example.com', '123-456-5678', 'Silver', 200, 2);

INSERT INTO Customer (CustomerId, Name, Address, Email, PhoneNumber, Membership, Point, CartId) 
VALUES (3, 'Samuel Green', '303 Cedar St, City C', 'samuel.green@example.com', '123-456-9101', 'Bronze', 100, 3);
--product
INSERT INTO Product (Name, Price, Quantity, Description, Image, CategoryId) 
VALUES ('iPhone 14', 999.99, 50, 'Latest Apple iPhone 14 with 5G support', 
'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/h/photo_2022-09-28_21-58-56_2.jpg', 1);

INSERT INTO Product (Name, Price, Quantity, Description, Image, CategoryId) 
VALUES ('Samsung Galaxy S22', 899.99, 30, 'High-end Samsung smartphone with AMOLED display', 
'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/m/sm-s901_galaxys22_front_phantomwhite_211122.jpg', 1);

INSERT INTO Product (Name, Price, Quantity, Description, Image, CategoryId) 
VALUES ('Apple AirPods', 199.99, 100, 'Wireless Bluetooth earbuds from Apple', 
'https://cdn2.cellphones.com.vn/x/media/catalog/product/3/_/3_10_120_1_1.jpg', 2);

INSERT INTO Product (Name, Price, Quantity, Description, Image, CategoryId) 
VALUES ('Samsung Galaxy Tab S7', 649.99, 40, 'High-performance Android tablet', 
'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-tab-s7-plus-3_5.jpg', 3);
--shipment
INSERT INTO Shipment (ShipmentId, Status, DateShipped, ShipperId) 
VALUES (1, 'Shipped', TO_DATE('2024-12-25', 'YYYY-MM-DD'), 3);

INSERT INTO Shipment (ShipmentId, Status, DateShipped, ShipperId) 
VALUES (2, 'Pending', TO_DATE('2024-12-26', 'YYYY-MM-DD'), 3);

INSERT INTO Shipment (ShipmentId, Status, DateShipped, ShipperId) 
VALUES (3, 'Shipped', TO_DATE('2024-12-27', 'YYYY-MM-DD'), 3);
--payment
INSERT INTO Payment (PaymentId, Total, CreationDate, PayDate, Status, CustomerId) 
VALUES (1, 999.99, TO_DATE('2024-12-25', 'YYYY-MM-DD'), TO_DATE('2024-12-25', 'YYYY-MM-DD'), 'Completed', 1);

INSERT INTO Payment (PaymentId, Total, CreationDate, PayDate, Status, CustomerId) 
VALUES (2, 649.99, TO_DATE('2024-12-26', 'YYYY-MM-DD'), TO_DATE('2024-12-26', 'YYYY-MM-DD'), 'Pending', 2);

INSERT INTO Payment (PaymentId, Total, CreationDate, PayDate, Status, CustomerId) 
VALUES (3, 199.99, TO_DATE('2024-12-27', 'YYYY-MM-DD'), TO_DATE('2024-12-27', 'YYYY-MM-DD'), 'Completed', 3);
--order
INSERT INTO Orders (OrderId, CreationDate, Status, UserId, PaymentId, ShipmentId) 
VALUES (1, TO_DATE('2024-12-25', 'YYYY-MM-DD'), 'Completed', 1, 1, 1);

INSERT INTO Orders (OrderId, CreationDate, Status, UserId, PaymentId, ShipmentId) 
VALUES (2, TO_DATE('2024-12-26', 'YYYY-MM-DD'), 'Pending', 2, 2, 2);

INSERT INTO Orders (OrderId, CreationDate, Status, UserId, PaymentId, ShipmentId) 
VALUES (3, TO_DATE('2024-12-27', 'YYYY-MM-DD'), 'Completed', 3, 3, 3);

SELECT ProductId, Name, Price, Warranty, Brand, Description, OtherInfor, Image 
FROM Product;

-- The iPhone 16 Pro Max is the largest iPhone Apple has ever made, and it offers the longest ever battery life on an iPhone.