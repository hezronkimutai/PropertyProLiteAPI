
[![Build Status](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI.svg?branch=develop)](https://travis-ci.org/hezronkimutai/PropertyProLiteAPI)
[![Coverage Status](https://coveralls.io/repos/github/hezronkimutai/PropertyProLiteAPI/badge.svg?branch=develop)](https://coveralls.io/github/hezronkimutai/PropertyProLiteAPI?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d0283da8d4ee903d7c3e/maintainability)](https://codeclimate.com/github/hezronkimutai/PropertyProLiteAPI/maintainability)



# PropertyProLiteAPI

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

This Project is documented [here](https://hezzie.docs.apiary.io/)

This project is managed by pivotal tracker board. view the board [here](https://www.pivotaltracker.com/n/projects/2353827)

The site is hosted on [heroku](https://propertyproliteapi.herokuapp.com/)


## Getting Started

To get your project up and running on your local machine, please follow the below instruction.

### Prerequisites

Make sure you have node -v 10 installed in your machine or follow the bellow instructions to install it.

Node installation on OS-X

>$ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/go/install)"

Node installation on linux

>sudo apt-getinstall python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

Node installation on Windows

Download the installer from the [oficcial node website](https://nodejs.org/)

## Clone the project from Github

$ git clone https://github.com/hezronkimutai/PropertyProLiteAPI.git

## Install the required dependencies found in package.json

> $ npm install

## Start the server

>$ npm Start

## Running the tests

Testing and getting the code coverage report with nyc

> npm tests

Testing with eslint

> ./node_modules/.bin/eslint server

## Work break down structure

### - user
 >- Home page
 >- Specific Property page
 >- Agents page
 >- Sign and sign up pages
#### - Agent
  >- Own properties page
  >- Create AD page
  >- Edit property page
  >- Trade page
  >- Profile page





## User Endpoints : /api/v2/users


| Method  | End point  | Public |  Functionality  |
| ------- | ---------- | ------ | --------------- |
| POST  |  /signup  |  True  |Create a user  |
| POST  |  /login  |  True  |  Login user |
| GET  |  /<user_id>  |  True  |Fetch a specific user  |
| GET  |  / |  True  |  Fetch a specific user  |
| PATCH  |  /<user_id>  |  True  |  Edit a user  |
| DELETE  |  /<users_id>  |  True  |  Delete a user  |

## User Endpoints : /api/v2/properties

| Method  | End point  | Public |  Functionality  |
| ------- | ---------- | ------ | --------------- |
| POST  |  /post-property  |  True  |Create a property  |
| GET  |  /<property_id>  |  True  |Fetch a specific property  |
| GET  |  / |  True  |  Fetch properties  |
| PATCH  |  /<property_id>  |  True  |  Edit a property  |
| PUT  |  sold/<property_id>  |  True  |  Mark property as sold  |
| DELETE  |  /<property_id>  |  True  |  Delete a property  |


## Authors
Hezron Kimutai - Github-[hezronkimutai](https://github.com/hezronkimutai)

## License

This project is licensed under the MIT license. See [LICENSE](https://github.com/hezronkimutai/PropertyProLiteAPI/blob/develop/LICENSE) for details.

## Contribution

Fork this repository, contribute, and create a pull request to this repo's develop branch.

## Acknowledgements

  -  Andela Kigali cycle 8 Bootcamp members
