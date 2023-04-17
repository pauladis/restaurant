# restaurant
study case using docker - Django - React - Postgres


## pre requisites

    docker
    docker-compose
    npm > 13

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

Not every endpoint is being used for the App in the moment, but I let the endpoints ready in case I wanna upgrade this project later

    GET         http://localhost:8000/item/
    GET         http://localhost:8000/item/<id>

    POST        http://localhost:8000/item/ 
    PUT, PATCH  http://localhost:8000/item/<id> 

    payload = {
        name:str,
        description: str,
        price: float
        picture: str(url),
        categorie_id: {categorie obj} or id
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


## saved data

all the saved data necessary for the app will be presented on a volume called backup_data/db
you access trought the admin page(which I recommend) or connect to the postgress image that will be running with your DB manager of choice(DBeaver, DataGrip, snowflake and so on)
all the information for that will can be found on settings.py or at the docker-compose.yml



## TODO

add tests
handle exceptions on backend server
might have some bugs, especially with the .css
add security features like removiing the secret from settings.py and so on



PS: if your adminpage doesn't load the staticfiles on launch, the app might be lacking permission to modify a few files, you can either give permission where is due or try this solution:

    open terminal
    docker exec -it checkout_order_backend_1 bash
    python manage.py collectstatic  
    exit
    docker-compose up --build


if you find any issues running this app, please contact me at raultq1@hotmail.com and I will be glad to help troubleshot
