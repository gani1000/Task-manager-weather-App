# create a basic express set up

1- using get route to handle incoming requests from the client
2- a basic server, that listens on port 3000
3- create Two spreate foldors,
_ routes: - to handle the mounted path, to when ever the req matches the route.
_ controllors: - to process the incoming requests

    *** To orgnaize the structure of our application

4- the way it works: - we are making the route handles the request and the will pass it
to the controllor to process it, and then make use of that route in our express app

# Connecting to DB

1- create an atlas account
2- manage access to DB, for security
3- manage network access
4- copy DB key and past it in your .env
5- populate your key by storing it in enviorment varaible in .env file
6- access it in your application via dotenv.config to access that global var

```

installing mongoose ODM to translate code from database to node.js.

1- in DB folder/connect.js require that module using the directive require() method
2- create a function that will take url as a prameter, we will make use of in our Exrpess Apps/ exports
3- Express require(folder) and connect that to async function to make connection between serve and DB stable
4-

```
