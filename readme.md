# Nodejs-Api-Project

To Start App

1- run mongod in terminal

2- install dependencies

3- Add products to db by running: node seed/productSeeder 

4- run: npm start in terminal

5- to register new user and recieve a token make a post request to http://localhost:3000/users/register with a json body that contains three properties: { "name": "tarek", "email": "tarek@gmail.com", "password": "12345"}. a token will be sent in header property 'x-auth-token'.

6- in order for the next requests to work, you need to send the requests with a valid token in x-auth-token header property.

7- to add product make this post request: http://localhost:3000/users/cart/5ba93a6d5d907d9512e43b75 (first make sure database has been filled with products following step 3)

8- to list cart items and test 'populate' method make a get request to this link: http://localhost:3000/users/cart
