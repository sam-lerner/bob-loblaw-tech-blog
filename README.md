

  # Model-View-Controller Tech Blog

  [![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)
  
  ## Table of Contents 
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [Tests](#test)
  - [License](#license)
  - [Questions](#questions)
  


## Description

This project is a full-stack web application. The site serves as a tech blog, where users are able to create accounts, write blog entries and comment on their own and others' posts.

The project utilizes `Express.js`, `Sequelize` and a `MySQL` database on the back end, with an `HTML5` front end dynamically generated through `Handlebars`. The application is deployed through `Heroku`.

## Installation

First, the user should use `git clone` to copy this repository. Once this is complete, running `npm init -y` followed by `npm i` will install all needed dependencies. Please note that a `.env` file will need to be created in order to protect your personal `MySQL` information. Please see the `.env.EXAMPLE` file in order to ensure you follow the proper formatting.

Optionally, to seed the datbase, run `npm run seed` in command line. 

## Usage
Here is a GIF demonstrating functionality:

![Here is a video demonstrating functionality](./assets/images/e-commerce-demo.gif)

To view a higher resolution version of this video, please navigate to my [Google Drive](https://drive.google.com/file/d/1FDbFB1umJ_SxRHJVuw6sIGJg61lzqeYk/view).

The following image demonstrates the layout and relationships between the tables:
![Table Layout](./assets/images/schema.jpg)

The site itself can be found [here](https://lerner-tech-blog.herokuapp.com/).

## Contributions

Thank you to classmates Eric Kirberger and Azime Nail, tutor Dru Sanchez, and TAs Paul Cwik and Justyn Subrai for their guidance with this project. 

## Tests

All tests were performed via `Insomnia`. A demonstration of the functionality is in the walkthrough video in the [Usage](#usage) section above.

## License
This project is licensed under the MIT license.
    

## Questions
See more of my work [here!](https://github.com/sam-lerner) 

I can be reached via e-mail at sam.a.lerner@gmail.com. Thank you for reading!

