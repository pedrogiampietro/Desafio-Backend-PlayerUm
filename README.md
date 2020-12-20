# Senhor dos Aneis API
Senhor dos Aneis web application built with Node.js, Express, and MySQL(Sequelize ORM) for you to readily record, view, and manage your Place with an account


### Trial in this project 🤠
+ [Multer](https://www.npmjs.com/package/multer) is used to handle upload images

## Restful
Routes mapped from Insomnia exported file: [Insomnia.json](https://github.com/pedrogiampietro/Desafio-Backend-PlayerUm/blob/master/API-Restful-Playerum.json)
___

## Features
the middleware for the authentication routes is /auth
and for location routes it is /place

| Functions              | Detail                                            | URL                         |
| :--------------------: | ------------------------------------------------- | --------------------------- |
| Sign up | User can sign up an account by inputting, email, password | /auth/sign-up |
| Log in | User can log in using registered email | /auth/sign-in |
| View all places | | / |
| Create a place | | /place |
| View a place  | | /place/:id |
| Edit a place  | | /place/:id/edit |
| Delete a place | | /place/:id |

___

## Installation
The following instructions will get you a copy of the project and all the setting needed to run it on your local machine.


### Prerequisites

- [npm](https://www.npmjs.com/get-npm)
- [Node.js v10.16.0](https://nodejs.org/en/download/)
- [MySQL v8.0.16](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench v8.0.16](https://dev.mysql.com/downloads/workbench/)


### Clone

Clone this repository to your local machine

```
$ git clone https://github.com/pedrogiampietro/Desafio-Backend-PlayerUm.git
```

### Setup Datebase

**Create and use playerum database via MySQL Workbench**

> Run the following code
```
drop database if exists playerum;
create database playerum;
use playerum;
```

### Setup App

**1. Enter the project folder**

```
$ cd Desafio-Backend-PlayerUm
```

**2. Install packages via npm**

```
$ npm install
```

**3. Create .env file**

```
$ touch .env
```

**6. Configure in .env file and save**

> .env
```
LOCAL_USERNAME=root
LOCAL_PASSWORD=
LOCAL_DATABASE=
LOCAL_HOST=localhost

SERVER_USERNAME=youruser
SERVER_PASSWORD=yourpassword
SERVER_DATABASE=yourdbname
SERVER_HOST=serverHosting
PORT=8080

JWT_TOKEN_PRIVATE_KEY=YOUR JWT TOKEN
JWT_REFRESH_TOKEN_PRIVATE_KEY=YOUR JWT REFRESH TOKEN

```

**8. Create Auth and Places models**
$ after starting the server, the sequel creates all the tables automatically.


**10. Activate the server**

```
$ npm start(running with nodemon)
```

**11. Find the message for successful activation**

```
> App is running on port 3001!
```
You may visit the application on browser with the URL: http://localhost:3001

___

## FAQ
- **Can I try this app online?**
    - Yes, kindly visit [https://rest-api-playerum.herokuapp.com/](https://rest-api-playerum.herokuapp.com/)
    
- **Can I use use testing account to log in?**
    - you can create a record normally, or enter with credentials:
      - email: root@example.com
      - password: 12345678
___


## Authors
[Pedro Giampietro](https://github.com/pedrogiampietro)
