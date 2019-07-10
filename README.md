
[![Build Status](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI.svg?branch=develop)](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI)
[![Coverage Status](https://coveralls.io/repos/github/hezronkimutai/PropertyProLiteAPI/badge.svg?branch=develop)](https://coveralls.io/github/hezronkimutai/PropertyProLiteAPI?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d0283da8d4ee903d7c3e/maintainability)](https://codeclimate.com/github/hezronkimutai/PropertyProLiteAPI/maintainability)



# PropertyProLiteAPI

## Summary

>Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

This project is managed by pivotal tracker board. view the board [here](https://www.pivotaltracker.com/n/projects/2353827)

The site is hosted on [heroku](https://propertyproliteapi.herokuapp.com/)

## The following are API endpoints enabling one to:
  -  Create account and log in
  -  Create a property
  -  Fetch a specific property
  -  Fetch all political properties
  -  Edit a specific property
  -  Delete a specific property

## Pre-requisites
  -  Postman
  -  Git

## Testing

  -  Clone this repository to your computer:

>git clone: https://github.com/hezronkimutai/PropertyProLiteAPI.git

  -  cd into PropertyProLiteAPI:

>cd PropertyProLiteAPI

  -  Switch to 'develop' branch

>git checkout develop

  -  Install dependencies

> npm install

  -  Run app

>npm start

  - Run tests

>npm run testv1

## Use Postman to test following working Endpoinsts


| Endpoint  | Functionality |
| -------------------- | -------------------- |
| POST/api/v1/users/signup  | Create a user record  |
| POST/api/v1/users/login  | Login user |
| GET/api/v1/users/<user_id>  | Fetch a specific user record  |
| PUT /api/v1/users/<user_id>  | Edit a user  |
| DELETE /api/v1/users/<users_id>  | Delete a user  |
| POST/api/v1/properties/post-property  | Create a property record  |
| GET/api/v1/properties/<party-id>  | Fetch a specific property record  |
| GET/api/v1/properties/<party-id>  | Fetch a all property record  |
| PUT /api/v1/properties/<party_id>  | Edit a property  |
| DELETE /api/v1/properties/<party-id>  | Delete a property  |


## Authors
Hezron Kimutai - Github-[hezronkimutai](https://github.com/hezronkimutai)

## License

This project is licensed under the MIT license. See [LICENSE](https://github.com/hezronkimutai/PropertyProLiteAPI/blob/develop/LICENSE) for details.

## Contribution

Fork this repository, contribute, and create a pull request to this repo's develop branch.

## Acknowledgements

  -  Andela Kigali cycle 8 Bootcamp members
