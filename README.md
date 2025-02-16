# e-commerce-PERN
this is a task in the Uneeq internship . this is an ecommerce website whose features are browse products , make a shopping cart . and checkout (pay)

///////////////////////////////////////////////////////////////////
#This is a documentary of how I designed , implemented and verified the project as well as the decisions I made during the process

first I designed the database based on the features this app will implement which are :
browse products (most popular , and some products from each category , and all products in a category)
order some products using shopping cart ( which we will implement in the front-end )

so the database contain : (items , categories , orders , discounts)

the most important decisions I made are :
-making discounts a separate table because not all items have discounts so we spare some memory
-not making a total price column in the order table as it is a computed field 
-making a table for the many-to-many relationship

the database schema is in the prisma/schema.prisma




///////////////////////////////////////////////////////////////////

next I divided the api endpoints into two categories 
1- customer
2- manager

and started to do the api of the customer and made some validation in the post requests to avoid database bad attacks

I used the MVC design pattern to structure my project 
the views will be in the front end folder

the comments in the code explain the query parameters I used to make an end point return different type of results , check it out 
