-- Up

CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    sellerId INTEGER REFERENCES Users(id),
    price TEXT,
    image TEXT,
    category_id INTEGER REFERENCES Category(id)
);

INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (1, 1, 'PS5', 'veritatis aut possimus', '$500', 'https://productimages.hepsiburada.net/s/56/1500/11270703579186.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (1, 1, 'Iphone 11', 'qui tenetur dicta', '$250', 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/apple/thumb/108883-anaaa_large.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (1, 1, 'XBOX', '', '$750', 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/microsoft/thumb/108453-gorsel-1_large.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (3, 1, 'Bitcoin', 'is a type of money that is completely virtual.', '$60000', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7LGrnyclTQVP1cKvGxnc_Am94bSAQxu1tyQ&usqp=CAU');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (3, 1, 'DogeCoin', '..', '$60000', 'https://imgrosetta.mynet.com.tr/file/13277444/13277444-728xauto.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (6, 1, 'F-16', '..', '$8500000', 'https://upload.wikimedia.org/wikipedia/commons/c/c9/F-16_June_2008.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (6, 1, 'Ferrai SF90', '..', '$600000', 'https://media.autoexpress.co.uk/image/private/s--xLU6xl8a--/v1594991800/autoexpress/2020/07/Ferrari%20SF90-8.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (2, 1, 'Mesut Özil', '..', '$40000000', 'https://www.yalinhaberler.com/files/uploads/news/default/fenerbahcede-yeni-ka-71af275fc2bc99af27b3.jpg');
INSERT INTO Products (category_id, sellerId ,name, description, price, image) values (6, 1, 'Tesla Model x', '..', '$250000', 'https://cdn.euroncap.com/media/56148/tesla-model-x.png?mode=crop&width=359&height=235');




-- Down
DROP TABLE Products;