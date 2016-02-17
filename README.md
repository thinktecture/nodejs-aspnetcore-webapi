# Node.js Web API for .NET developers

This repository contains a Web API sample built with Node.js and ASP.NET Core 1.0. A Angular 2 client is used to communicate with the APIs. 

## Projects

Both Node.js and ASP.NET Core 1.0 APIs are split into two projects:

* STS: Contains a Secure Token Service, which can generate and validate access tokens
	* Node.js
		* Uses [oauth2-server](https://github.com/thomseddon/node-oauth2-server) for token generation
	* ASP.NET Core 1.0
		* Uses [IdentityServer4](https://github.com/IdentityServer/IdentityServer4)
* Web API: Contains a Web API for manipulating customers. 
	* The following methods are supported. All methods need a valid access token, otherwise it will return a `401 Unauthorized`.
		* `HTTP GET api/customer/list`: Returns a list of all customers
		* `HTTP POST api/customer`: Creates a new customer
		* `HTTP DELETE api/customer/{id}`: Removes a customer
	* Swagger support via `http://localhost:5000/swagger`
	* Both project can either use an InMemory storage or a PostgreSQL backend. Per default, they use PostgreSQL. 
		* Node.js: 
			* Switch the `service.configure(false)` to `true` [here](src/nodejs/WebAPI/server/index.js#L72)
			* Default PostgreSQL settings:
				* Host: `localhost`
				* Database name: `CustomerSampleNodejs`
				* Username: `CustomerSample`
				* Password: `CustomerSample`
				* Can be configured in [server/index.js](https://github.com/thinktecture/nodejs-vnext-webapi/blob/master/src/nodejs/WebAPI/server/index.js#L69)
		* ASP.NET Core 1.0: 
			* Switch the comments within `ConfigureDI` [here](https://github.com/thinktecture/nodejs-vnext-webapi/blob/master/src/vnext/WebAPI/Startup.cs#L108) 
			* Default PostgreSQL settings:
				* Host: `localhost`
				* Database name: `CustomerSampleVNext`
				* Username: `CustomerSample`
				* Password: `CUstomerSample`
				* Can be configured in [Startup.cs](src/vnext/WebAPI/Startup.cs#L103)

You can either start both projects as Node.js or as ASP.NET Core 1.0. They won't work together, so you can not use Node.js STS and ASP.NET Core 1.0 Web API. 

## Setup

### PostgreSQL

For a general admin UI to create users and databases, you can use [pgAdmin](http://www.pgadmin.org/), which works on all platforms.

#### OS X

The easiest way to use PostgreSQL on Mac OS X is by installing [Postgres.app](http://postgresapp.com/). Then use the pgAdmin to create the user and databases as shown above.

#### Windows

To install PostgreSQL on Windows you can use a graphical installer which can be downloaded [here](http://www.postgresql.org/download/windows/). It comes with pgAdmin, so you don't need to install it separately. After installation use pgAdmin to create the user and databases as shown above.

### Node.js

* Install [Node.js](https://nodejs.org/en/) > v5 .
* Execute `npm install` within the root of this repository to install all necessary dependencies. You will encounter some `npm err` or `npm warn`. That's okay, since this repository uses a lot beta versions. It will not break the application.


### ASP.NET Core 1.0

* [ASP.NET 5](https://docs.asp.net/en/latest/index.html).
* After installing ASP.NET 5 you need to execute `dnu restore` in `src/vnext/STS` and `src/vnext/WebAPI`.

## Starting

### Node.js

* STS: To start STS execute `node index.js` in `src/nodejs/STS`. It will then be accessible via `http://localhost:5001`.
* Web API: To start Web API execute `node index.js` in `src/nodejs/WebAPI`. It will then be accessible via `http://localhost:5000`.

### ASP.NET Core 1.0

* STS: To start STS execute `dnx web` in `src/vnext/STS`. It will then be accessible via `http://localhost:5001`.
* Web API: To start Web API execute `dnx web` in `src/vnext/WebAPI`. It will then be accessible via `http://localhost:5000`.

### Angular 2 Client

To start the Angular 2 Client, run `npm run watch` within the root of the repository. You can access the client via `http://localhost:8000`. The credentials are

* Username: `bob`
* Password: `bob`

Since both backends lack a support for user management, those credentials are the only one which are working. :-)

## Third-Party Libraries

This section contains notable third-party libraries.

### Node.js

* [restify](http://restify.com/) Used for Web API hosting.
* [restify-cors-middleware](https://github.com/TabDigital/restify-cors-middleware) An actually working middleware for handling cors in restify.
* [swagger-restify](https://github.com/yourdelivery/swagger-restify) Package for generating the swagger.json and hosting the [swagger-ui](https://github.com/swagger-api/swagger-ui).
* [express](http://expressjs.com/) Used for STS hosting.
* [SequelizeJS](http://sequelizejs.com) Used to provide an ORM accessing the PostgreSQL database. 

### ASP.NET Core 1.0

* [EntityFramework7.Npgsql](http://www.npgsql.org/doc/ef7.html) Allows using Entity Framework with PostgreSQL.
* [IdentityServer4](https://github.com/IdentityServer/IdentityServer4) Allows using a Identity Provider powered by IdentityServer4
* [IdentityServer4.AccessTokenValidation](https://github.com/IdentityServer/IdentityServer4.AccessTokenValidation) Validates access tokens from IdentityServer4
* [Swashbuckle.SwaggerGen](https://github.com/domaindrivendev/Ahoy/tree/master/src/Swashbuckle.SwaggerGen) Generates a swagger.json file
* [Swashbuckle.SwaggerUi](https://github.com/domaindrivendev/Ahoy/tree/master/src/Swashbuckle.SwaggerUi) Shows the swagger-ui for a pretty view of swagger.json

### Angular 2 Client

* [Angular 2](https://angular.io) itself. ;-)
* [Gulp](http://gulpjs.com) for building and watching 