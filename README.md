# JWT-Creator

<p align="center">
  <img width="400" height="400" src="https://user-images.githubusercontent.com/81478885/207215562-521da1a5-2e59-4856-a6a5-30aea0eb18f5.png">
</p>

## Description
Package used to create and verify JWT(JSON Web Token) that allows for verification of claims on resources also known as authorization. Used in the backend to create and 
verify the JWT, allowing access to required information from the database.

## Installation

``
npm i @nuclear-packages/jwt-creator
``

From: https://www.npmjs.com/package/@nuclear-packages/jwt-creator

## Usage

```js
const JWT = require('@nuclear-packages');

const jwt = JWT.createJWTSHA256({
    "name":"john",
    "role":"admin"
},"coifodnfn1");

const verify = JWT.verifyJWTSHA256(jwt,"coifodnn1");

```
    
## Documentation

``createJWTSHA256()`` function requires a payload in the form of a JSON object containing information such as the name, username, email, resource role, etc, and a
secret code that could be the hashed password (salted hashed passwords work). Returns the jwt string as header.payload.signature with added information, encoded in base64url
and hashed using SHA-256 algorithm

``verifyJWTSHA256()`` function requires a jwt token as a string, and the secret code that could be the hashed password (salted hashed passwords work), and will verify if
the token is valid or not.

## Contributing

Pull requests are welcome for any changes. For major changes, first open an issue and then contribute

## License

[MIT](https://choosealicense.com/licenses/mit/)

