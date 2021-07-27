-- Up
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    hasAccess INTEGER DEFAULT 0,
    password TEXT
);

INSERT INTO Users (username, email, hasAccess, password) values ('admin', 'admin@email.com', 1,'$2a$10$TDas7uBpDOrMrC55R9Y9FekChA4Kjdvm4EIGhf35Ba.AByUe/pVUy');



-- Down
DROP TABLE Users;