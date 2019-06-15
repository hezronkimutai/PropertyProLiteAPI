# PropertyProLiteAPI


[![Build Status](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI.svg?branch=develop)](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI)
[![Coverage Status](https://coveralls.io/repos/github/hezronkimutai/PropertyProLiteAPI/badge.svg?branch=develop)](https://coveralls.io/github/hezronkimutai/PropertyProLiteAPI?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d0283da8d4ee903d7c3e/maintainability)](https://codeclimate.com/github/hezronkimutai/PropertyProLiteAPI/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d0283da8d4ee903d7c3e/test_coverage)](https://codeclimate.com/github/hezronkimutai/PropertyProLiteAPI/test_coverage)



docs: https://hezzie.docs.apiary.io/

heroku link: https://propertyproliteapi.herokuapp.com/



[![Build Status](https://travis-ci.org/hezronkimutai/politico-api.svg?branch=develop)](https://travis-ci.org/hezronkimutai/politico-api)
[![Coverage Status](https://coveralls.io/repos/github/hezronkimutai/politico-api/badge.svg?branch=develop)](https://coveralls.io/github/hezronkimutai/politico-api?branch=develop)
[![PEP8](https://img.shields.io/badge/code%20style-pep8-orange.svg)](https://www.python.org/dev/peps/pep-0008/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Badges](http://img.shields.io/:badges-7/7-ff6799.svg)](https://github.com/badges/badgerbadgerbadger)



# PropertyProLiteAPI

## Summary

>Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

This project is managed by pivotal tracker board. view the board [here](https://www.pivotaltracker.com/n/projects/2353827)

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
| POST/api/v1/users  | Create a user record  |
| GET/api/v1/users/<user_id>  | Fetch a specific user record  |
| PUT /api/v1/users/<user_id>  | Edit a user  |
| DELETE /api/v1/users/<users_id>  | Delete a user  |
| POST/api/v1/parties  | Create a politcal party record  |
| GET/api/v1/parties/<party-id>  | Fetch a specific politcal party record  |
| GET/api/v1/parties/<party-id>  | Fetch a all politcal party record  |
| PUT /api/v1/parties/<party_id>  | Edit a political party  |
| DELETE /api/v1/parties/<party-id>  | Delete a politcal party  |
| POST/api/v1/offices  | Create a political office  |
| GET/api/v1/offices/<office-id>  | Fetch a specific politcal office record  |
| GET /api/v1/offices  | Fetch all political offices records  |
| PUT /api/v1/offices/<office_id>  | Edit a political office  |
| DELETE /api/v1/offices/<office-id>  | Delete a politcal office  |
| POST/api/v1/candidates  | Create a a record of candidates  |
| GET/api/v1/candidates/<candidate-id>  | Fetch a specific candidates  |
| GET /api/v1/candidates  | Fetch all candidates  |
| PUT /api/v1/candidates/<candidate_id>  | Edit a candidate  |
| DELETE /api/v1/candidates/<candidate-id>  | Delete a candidate  |


## Authors
Hezron Kimutai - Github-[hezronkimutai](https://github.com/hezronkimutai)

## License

This project is licensed under the MIT license. See [LICENSE](https://github.com/hezronkimutai/politico-api/blob/develop/LICENSE) for details.

## Contribution

Fork this repository, contribute, and create a pull request to this repo's develop branch.

## Acknowledgements

  -  
