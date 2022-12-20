## Folksoul API

Folksoul-Api is Rest Api to create or get information about folksoul band

### Table of Contents

- [Prerequisites](#Prerequisites)
- [Tech Stack](#Tech-Stack)
- [Getting Started](#Getting-Started)
- [Project Structure](#Project-Structure)

#

### Prerequisites

- <img src="./readme/nodejs.png" width="25" style="top: 8px" /> _Node JS @16.X and up_
- <img src="./readme/Typescript_logo_2020.svg.png" width="25" style="top: 8px" /> _Typescript @4 and up_
- <img src="./readme/npm.png" width="25" style="top: 8px" /> _npm @8 and up_

#

### Tech Stack

- <img src="./readme/npm.png" width="25" style="top: 8px" /> _body-parser @ 1.20.0 - Node.js body parsing middleware_
- <img src="./readme/bCrypt.jpg" width="25" style="top: 8px" /> _bcrypt @ 5.0.1 - A library to hash passwords_
- <img src="./readme/dotenv.png" width="25" style="top: 8px" /> _dotenv @ 16.0.1 - zero-dependency module that loads environment variables from a .env file_
- <img src="./readme/express.png" width="25" style="top: 8px" /> _express @ 4.18.1 - web framework for node_
- <img src="./readme/joi-image.png" width="25" style="top: 8px" /> _joi @ 17.6.0 - schema description language and data validator for JavaScript_
- <img src="./readme/jwt.png" width="25" style="top: 8px" /> _jsonwebtoken @ 8.5.1 - An implementation of JSON Web Tokens_
- <img src="./readme/mongoDB.png" width="25" style="top: 8px" /> _mongodb @ 4.7.0 - document database_
- <img src="./readme/mongoose.png" width="25" style="top: 8px" /> _mongoose @ 6.4.4 - MongoDB object modeling tool_
- <img src="./readme/prompt.png" width="25" style="top: 8px" /> _prompt @ 1.3.0 - command-line prompt for node.js_
- <img src="./readme/Swagger-logo.png" width="25" style="top: 8px" /> _swagger @ 4.4.0 - module provides tools for designing and building Swagger-compliant APIs entirely in Node.js_
- <img src="./readme/mongoose.png" width="25" style="top: 8px" /> _yaml @ 0.3.0 - yaml is a definitive library for YAML, the human friendly data serialization standard_

#

### Getting Started

1. First of all you need to clone app repository from github:

```
git clone https://github.com/RedberryInternship/folksoul-api-nikanoza.git
```

2. Next step requires install all the dependencies.

```
npm install
```

3. Also you need to create .env file where copy information from .env.example file

```
cp .env.example .env
```

4. To create your own database, need to create new local connection, host would be localhost.
   also you need to replace variables values in .env file, or you can generate mongo atlas url with user and password

5. Also you need to generate your own jwt secret string for protect routes authentication and save it on .env file

6. To create new user need npm command in terminal

```
npm run create:user
```

#

### Project Structure

```
|--- src
|   |--- config # configuration files
|   |---|--- mongo.ts # perform mongoDb connection
|   |---|--- swagger.yaml # swagger configuration file
|   |--- controllers # functions for routes
|   |--- middlewares # extra helper middleware functions
|   |---|--- auth-middleware.js # function to protect some routes
|   |---|--- swagger-middleware.js # function to build and serve swagger
|   |--- models # mongoose models for mongoDb
|   |--- routes # project routes
|   |--- schemas # Joi validation schema files
|   |--- scripts # custom npm commands files
|   |--- server.ts # main file
- .eslintrc.json  # eslint config file
- .prettierrc.json  # prettier config file
- tsconfig.json # typescript configuration
- package.json # dependency manager configurations
```
