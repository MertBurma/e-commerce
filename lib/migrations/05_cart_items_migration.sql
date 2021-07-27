-- Up

CREATE TABLE IF NOT EXISTS CartItems(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER REFERENCES Products(id),
    cart_id INTEGER REFERENCES Carts(id)

);



-- Down
DROP TABLE CartItems;