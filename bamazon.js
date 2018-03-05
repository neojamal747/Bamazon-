/* Database structure & cli-table reference
Products (ProductName, DepartmentName, Price, StockQuantity)
var inventory = new Table({ head: ["ID", "Product Name", "Department", "Price", "Quantity in stock"] });
*/

var mysql = require("mysql");
var prompt = require("prompt");
var Table = require("cli-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	user: "root", 
	password: "",
	host: "localhost",
	port: 3306,
	database: "Bamazon"
})

var db;

//Displays current offerings, and saves them to a local object
function displayAll(){
	db = {};
	connection.query("SELECT * FROM Products", function(error, results){
		if(error){throw error};
		var inventory = new Table({ head: ["ID", "Product Name", "Department", "Price", "Quantity in stock"]});
		results.forEach(function(value, index, array){
			//Store each item's properties into variables
			var idNum = value.id;
			var product = value.ProductName;
			var dept = value.DepartmentName;
			var price = value.Price;
			var stock = value.StockQuantity;

			//Push these properties into a new object, then into the cli-table constructor
			var newLine = {};
			newLine[idNum] = [product, dept, price, stock];
			db[idNum] = value;
			inventory.push(newLine);
		})
		console.log(inventory.toString());
	})
}

//Changes inventory levels, either adding to or subtracting from StockQuantity for the desired id#
function changeInventory(id, currentQuantity, addOrSubtract){
	var newQuantity = currentQuantity + addOrSubtract;
	var updateText = "UPDATE Products\
		SET StockQuantity = ?\
		WHERE id = ?";
	connection.query(updateText, [newQuantity, id], function(error, results){
		if(error){throw error};
	})
}

//Function to handle purchases
function purchase(){
	setTimeout(function(){purchaseGo()}, 3000);
	function purchaseGo(){
	//Prompt the user to make a purchase
		prompt.start();
		console.log("To purchase a product, please enter the ID number of the product, and quantity you would like to purchase.")
		prompt.get(["ID", "Quantity"], function(error, results){
			if(error){throw error};

			var itemID = Number(results.ID);
			var purchaseItem = db[itemID];
			var totalPrice = purchaseItem.Price * results.Quantity;
			var changeQuantity = results.Quantity * -1;

			//If there's enough in stock, complete the purchase via changeInventory
			if (purchaseItem.StockQuantity >= results.Quantity){
				changeInventory(itemID, purchaseItem.StockQuantity, changeQuantity);

				//Print the results of the transaction
				console.log("Your purchase: " + purchaseItem.ProductName);
				console.log("Quantity: " + results.Quantity);
				console.log("Total price: $" + totalPrice);
			}
			else{console.log("Purchase error")};
			morePlease();
		});
	}
}

function morePlease(){
	var questions = [{
	  	name: "again",
	  	message: "Would you like to make another purchase?",
	  	type: "confirm"
	}]
	inquirer.prompt(questions).then(function(answers){
		if(answers.again){
			displayAll();
			purchase();
		}
		else{
			console.log("Goodbye!");
			return;
		}
	});
}

//****************
console.log("Welcome to Bamazon!  Here is our product catalog:");
displayAll();
purchase();

