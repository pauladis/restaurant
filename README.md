# restaurant
study case using docker - Django - React - Postgres


## How to use

clone the repo
docker-compose build
docker-compose up


## entrypoint for access

    http://localhost <- front
    http://localhost:8000 <- back


## How it works

the frontend and backend are 2 distinct apps, with nothing in common, they communicate beetween themselfs trought APIs call only


## SWAGGER

    GET         http://localhost:8000/item/
    GET         http://localhost:8000/item/<id>

    POST        http://localhost:8000/item/ 
    PUT, PATCH  http://localhost:8000/item/<id> 

    payload = {
        name:str,
        description: str,
        price: float
        picture: str(url),
        categorie_id: int
        }
    

    GET             http://localhost:8000/orders/
    GET             http://localhost:8000/orders/<id>

    POST            http://localhost:8000/orders/ 
    PUT, PATCH      http://localhost:8000/orders/<id>

    payload = {
        total: totalPrice,
        payment: {<any json object>}
    }


    GET         http://localhost:8000/itemdetails/
    GET         http://localhost:8000/itemdetails/<id>

    POST        http://localhost:8000/itemdetails/ 
    PUT, PATCH  http://localhost:8000/itemdetails/<id> 
    
    payload = {
        item_id: int,
        order_id: int,
        quantity: int
    }


## How I Would recommend to test this app:

once the container is running, open a terminal e follow this steps:

    docker exec -it checkout_order_backend_1 bash
    python manage.py createsuperuser
    -- fill the form

    go into http://localhost:8000/admin
    insert a few items and categories trough the admin page/API, only then, go to localhost and enjoy the app




## TODO

add tests
handle exceptions on backend server
might have some bugs, especially with the .css



PS: if your adminpage doesn't load the staticfiles on launch, you might need to give permission or try this solution:

    open terminal
    docker exec -it checkout_order_1 bash
    python manage.py collectstatic  
    exit
    docker-compose up --build


if you find any issues running this app, please contact me at raultq1@hotmail.com and I will be glad to help troubleshot