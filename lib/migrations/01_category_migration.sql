-- Up
CREATE TABLE IF NOT EXISTS Category(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO Category(id, name) values (1, 'Electronics');
INSERT INTO Category(id, name) values (2, 'Person');
INSERT INTO Category(id, name) values (3, 'Currency');
INSERT INTO Category(id, name) values (4, 'Fashion');
INSERT INTO Category(id, name) values (5, 'Book');
INSERT INTO Category(id, name) values (6, 'Vehicle');
INSERT INTO Category(id, name) values (7, 'Real Estate');
INSERT INTO Category(id, name) values (8, 'Furniture');
INSERT INTO Category(id, name) values (9, 'All');


-- Down
DROP TABLE Category;