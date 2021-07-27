-- Up
CREATE TABLE IF NOT EXISTS Feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    User_id INTEGER REFERENCES Users(id),
    Product_id INTEGER REFERENCES Products(id),
    feedback TEXT,
    Point INTEGER
);



-- Down
DROP TABLE Feedback;