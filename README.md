# PropertyProLiteAPI


[![Build Status](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI.svg?branch=develop)](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI)
[![Coverage Status](https://coveralls.io/repos/github/hezronkimutai/PropertyProLiteAPI/badge.svg?branch=develop)](https://coveralls.io/github/hezronkimutai/PropertyProLiteAPI?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d0283da8d4ee903d7c3e/maintainability)](https://codeclimate.com/github/hezronkimutai/PropertyProLiteAPI/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d0283da8d4ee903d7c3e/test_coverage)](https://codeclimate.com/github/hezronkimutai/PropertyProLiteAPI/test_coverage)


## Summary

>Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

This project is managed by pivotal tracker board. view the board [here](https://www.pivotaltracker.com/n/projects/2353827)

Click [here](https://hezzie.docs.apiary.io/) to view the documentation of this app

The site is hosted on [heroku](https://propertyproliteapi.herokuapp.com/)

## The following are API endpoints enabling one to:
  -  Create account and log in
  -  Create a user account
  -  Fetch all users
  -  Fetch a particular user
  -  Update user info
  -  Delete a user
  -  Fetch a specific property
  -  Fetch all properties
  -  Edit a specific property
  -  Delete a specific property
  -  Post a property


## Pre-requisites
  -  Postman
  -  Git
  -  Node.JS

## Testing

  -  Clone this repository to your computer:

>git clone: https://github.com/hezronkimutai/PropertyProLiteAPI.git

  -  cd into this folder:

>PropertyProLiteAPI

  -  Switch to 'develop' branch

>git checkout develop

  -  Install requirements

>npm install

  -  Run app

>npm start

  - Run tests

>npm test

## Use Postman to test following working Endpoinsts


| Endpoint  | Functionality |
| -------------------- | -------------------- |
| POST/api/v1/users  | Retrieve all users  |
| GET/api/v1/users/<user_id>  | Fetch a specific user record  |
| PUT /api/v1/users/<user_id>  | Edit a user  |
| DELETE /api/v1/users/<users_id>  | Delete a user  |
| POST/api/v1/properties/post-property  | Create a property  |
| GET/api/v1/properties/<id>  | Fetch a specific property  |
| GET/api/v1/properties/  | Fetch a all properties  |
| PUT /api/v1/properties/<id>  | Edit a properties  |
| DELETE /api/v1/properties/<id>  | Delete a property  |


## Authors
Hezron Kimutai - Github-[hezronkimutai](https://github.com/hezronkimutai)

## License

This project is licensed under the MIT license. See [LICENSE](https://github.com/hezronkimutai/politico-api/blob/develop/LICENSE) for details.

## Contribution

Fork this repository, contribute, and create a pull request to this repo's develop branch.

## Acknowledgements

  -  
