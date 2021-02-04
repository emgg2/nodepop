db.getSiblingDB("nodepop").dropDatabase()
use nodepop

db.products.insert(        {
            "name": "Bicicleta",
            "sale": true,
            "price": 230.15,
            "picture": "./images/bicicleta.jpeg",
            "tags": [ "lifestyle", "motor"]
            })

db.products.insertOne({
        "name": "iPhone 3GS",
        "sale": false,
        "price": 550.00,
        "picture": "./images/iphone.jpeg",
        "tags": [ "lifestyle", "mobile"]
        })
    
db.products.insertOne({
        "name": "Xiaomi Redmi",
        "sale": false,
        "price": 130.00,
        "picture": "./images/xiaomi.jpeg",
        "tags": [ "lifestyle", "mobile"]
        })        

db.products.insertOne({
        "name": "Rain Boots",
        "sale": false,
        "price": 25.55,
        "picture": "./images/rain-boots.jpeg",
        "tags": [ "lifestyle"]
        })   

db.products.insertOne({
        "name": "Panama Boots",
        "sale": false,
        "price": 105.00,
        "picture": "./images/panama_boots.jpeg",
        "tags": [ "lifestyle"]
        })        
        
db.tags.insert({"name": "work"})
db.tags.insert({"name": "lifestyle"})
db.tags.insert({"name": "motor"})
db.tags.insert({"name": "mobile"})
      




