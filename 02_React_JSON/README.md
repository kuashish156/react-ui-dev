# npm JSON Server Setup for JSON Development

### JSON Server Setup

1. **Install JSON Server**

## npm install json-server

Create db.json

Create a data folder inside the project and create a db.json file inside it.

Example project structure:

src/
└── data/
└── db.json

Add your JSON data inside the db.json file.

# Start JSON Server

Run the following command from the project root directory:

# npx json-server src/data/db.json

JSON Server will start on:

http://localhost:3000

Access the API

If your db.json contains a products collection, you can access it using:

http://localhost:3000/products

JSON Server provides REST API endpoints for working with the JSON data.

Example
{
"products": [
{
"id": "1",
"name": "Laptop",
"price": 50000
},
{
"id": "2",
"name": "Mobile",
"price": 20000
}
]
}

API endpoint:

http://localhost:3000/products
