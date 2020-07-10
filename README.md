<h1 align="center">The Informed Artist</h1>

<p align="center">
    <img src="https://img.shields.io/badge/Javascript-brightgreen"/>
    <img src="https://img.shields.io/badge/Mysql-red"/>
    <img src="https://img.shields.io/badge/Node.js-success"/>
    <img src="https://img.shields.io/badge/Sequelize-blue"/>  
    <img src="https://img.shields.io/badge/Handlebars-orange"/>
    <img src="https://img.shields.io/badge/Session-9cf"/>
</p>

## Table of contents
--------------------
* [General info](#general-info)
* [Developed by](#developed-by)
* [Technologies](#technologies)
* [Setup](#setup)
* [Testing](#testing)
* [Features](#features)

## General info
--------------------
This project was created as an exercise practicing creating a site using the Model-View-Controller (MVC) directory organization
and its respective npm packages.

## Developed by: 
* [Roxanna Vaught-Mijares](https://github.com/roxyvaught)
* [Nicholas Kosik](https://github.com/Thor40) 
* [Michael Silva](https://github.com/Silvam2017)
* [Andrea Ballew](https://github.com/andytheelf)

	
## Technologies
--------------------
Project is created with:
* bcrypt: ^5.0.0
* connect-session-sequelize: ^7.0.0
* dotenv: ^8.2.0
* express: ^4.17.1
* express-handlebars: ^4.0.4
* express-session: ^1.17.1
* mysql2: ^2.1.0
* path: ^0.12.7
* sequelize: ^5.21.13
* serve-static: ^1.14.1
	
## Setup
--------------------
### To run this project, make sure to install [MySQL](https://www.mysql.com/downloads/)

install the following locally using npm:

```
$ cd ../dir
$ npm init
$ npm install --save mysql2
$ npm install --save sequelize
$ npm install dotenv
$ npm install bcrypt
$ npm install express
$ npm install --save path
$ npm install express-handlebars
$ npm install express-session
$ npm install connect-session-sequelize
$ npm install serve-static
```

## Testing
--------------------
### To test this project, run the following in the terminal:
```
Log into mysql
```
Database art_db;
```
Source db/schema.sql
```
Quit out
```
$ npm start
```
The server should run on PORT 3001
--------------------
Alternatively, visit the deployed Heroku site [Heroku](https://the-informed-artist.herokuapp.com/)

## Features
--------------------
### Features include:
* Allows Login or Register new User
* Shows Dashboard that allows creation of new Post
* User can Upvote, Comment, Edit, and Delete Posts
* User can Log out