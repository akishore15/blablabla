#include <iostream>
#include <sqlite3.h>
#include <string>

using namespace std;


static int callback(void* data, int argc, char** argv, char** azColName) {
    for (int i = 0; i < argc; i++) {
        cout << (azColName[i] ? azColName[i] : "NULL") << " = " << (argv[i] ? argv[i] : "NULL") << endl;
    }
    cout << endl;
    return 0;
}

void executeSQL(sqlite3* db, const string& sql) {
    char* errMsg = nullptr;
    int rc = sqlite3_exec(db, sql.c_str(), callback, nullptr, &errMsg);
    if (rc != SQLITE_OK) {
        cerr << "SQL error: " << errMsg << endl;
        sqlite3_free(errMsg);
    } else {
        cout << "SQL executed successfully." << endl;
    }
}

int main() {
    sqlite3* db;
    int rc = sqlite3_open("access_clone.db", &db);

    if (rc) {
        cerr << "Can't open database: " << sqlite3_errmsg(db) << endl;
        return 1;
    } else {
        cout << "Opened database successfully." << endl;
    }

    // Create tables
    string createCustomersTable = R"(
        CREATE TABLE IF NOT EXISTS customers (
            customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT
        );
    )";

    string createOrdersTable = R"(
        CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER NOT NULL,
            order_date TEXT NOT NULL,
            amount REAL,
            FOREIGN KEY(customer_id) REFERENCES customers(customer_id)
        );
    )";

    executeSQL(db, createCustomersTable);
    executeSQL(db, createOrdersTable);

    // Insert data into customers table
    string insertCustomers = R"(
        INSERT INTO customers (first_name, last_name, email, phone) VALUES
        ('John', 'Doe', 'john.doe@example.com', '555-1234'),
        ('Jane', 'Smith', 'jane.smith@example.com', '555-5678'),
        ('Alice', 'Johnson', 'alice.johnson@example.com', '555-8765');
    )";
    executeSQL(db, insertCustomers);

    // Insert data into orders table
    string insertOrders = R"(
        INSERT INTO orders (customer_id, order_date, amount) VALUES
        (1, '2024-01-10', 150.75),
        (2, '2024-01-12', 200.00),
        (1, '2024-01-15', 175.50);
    )";
    executeSQL(db, insertOrders);

    // Select and display all customers
    string selectCustomers = "SELECT * FROM customers;";
    executeSQL(db, selectCustomers);

    // Select and display all orders
    string selectOrders = "SELECT * FROM orders;";
    executeSQL(db, selectOrders);

    // Join customers and orders to display full order details
    string joinQuery = R"(
        SELECT
            customers.first_name,
            customers.last_name,
            orders.order_date,
            orders.amount
        FROM
            customers
        JOIN
            orders ON customers.customer_id = orders.customer_id;
    )";
    executeSQL(db, joinQuery);

    // Update a customer's email
    string updateEmail = "UPDATE customers SET email = 'new.email@example.com' WHERE customer_id = 1;";
    executeSQL(db, updateEmail);

    // Delete an order
    string deleteOrder = "DELETE FROM orders WHERE order_id = 3;";
    executeSQL(db, deleteOrder);

    sqlite3_close(db);
    return 0;
}
