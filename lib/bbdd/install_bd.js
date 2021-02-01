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
        "picture": "./images/iphone.jpeg",
        "tags": [ "lifestyle", "mobile"]
        })        
db.tags.insert({"name": "work"})
db.tags.insert({"name": "lifestyle"})
db.tags.insert({"name": "motor"})
db.tags.insert({"name": "mobile"})


         
// const products = [
//         {
//         "name": "Bicicleta",
//         "sale": true,
//         "price": 230.15,
//         "picture": "bici.jpg",
//         "tags": [ "lifestyle", "motor"]
//         },
//         {
//         "name": "iPhone 3GS",
//         "sale": false,
//         "price": 50.00,
//         "picture": "iphone.png",
//         "tags": [ "lifestyle", "mobile"]
//         }
//    ];





//  for( var i in products){
//      print(products[i]);
//        db.products.insertOne(products[i]);


     
//  }




