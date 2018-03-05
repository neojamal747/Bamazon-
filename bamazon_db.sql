CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (id),
    ProductName VARCHAR(50), 
    DepartmentName VARCHAR(50),
    Price INTEGER(11),
    StockQuantity INTEGER(11)
)

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Playstation 4", "Electronics", 340, 10)

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Macbook Air", "Electronics", 999, 7);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Queer as Folk - The Complete First Season", "Video", 11.99, 10);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Dining Table", "Furniture", 311.11, 4);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Assorted Succulent Plants", "Lawn and Garden", 28.99, 9);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Mercedes-Benz GLA250", "Automotive", 32850, 2);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Dahon Espresso", "Bicycles", 655.52, 3);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Tire Gauge", "Automotive", 9.93, 5);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Steel Measuring Tape", "Tools", 10.90, 10);

INSERT INTO Products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
("Lemongrass oil", "Home", 13.99, 10);
