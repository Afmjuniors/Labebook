# Labook



<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Afmjuniors/Labook">
    <img src="readme-image/logo-doc.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Labook</h3>

  <p align="center">
    A social media API RESTful using SQL as database . 
    <br />
    <a href="https://github.com/Afmjuniors/Labook"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Afmjuniors/Labook">View Demo</a>
    ·
    <a href="https://github.com/Afmjuniors/Labook/issues">Report Bug</a>
    ·
    <a href="https://github.com/Afmjuniors/Labook/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#feats">Features</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



The application provides a social media API that is RESTful, where users can sign up, log in, and edit or delete their profile. By default, all users have the "NORMAL" role, and they can only edit or delete their own profile. Only an "ADMIN" can edit the roles of other users, and only an "ADMIN" can delete the profile of other users.

Users can create, edit, view, and delete their own posts. Only the creator of a post can change the content of the post. An "ADMIN" can delete any post, including their own.

All users can view all posts or filter them by a specific user. Users must be logged in to like or dislike a post.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![SQLite][SQLite]][SQLite-url]
* [![Express][Express]][Express-url]
* [![Node.js][Node.js]][Node.js-url]
* [![Postman][Postman]][Postman-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Read API at https://documenter.getpostman.com/view/24460683/2s93CNMsiJ

2. Clone the repo
   ```sh
   git clone https://github.com/Afmjuniors/Labook.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create tables in your own server
   ```js
   src/database/database.sql

   Execute CREATE TABLE users
   Execute CREATE TABLE posts
   Execute CREATE TABLE likes_dislikes

   Execute INSERT INTO users 
   Execute INSERT INTO posts
   ```
5. Run ther server
   ```js
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Possible to simulate a simple social media plataform with users reactions.
An API using CRUD methods.

For test purposes, here is an ADMIN user
```json
{
    "email":"alexandre@email.com",
    "password":"123456@Aa"
}
```



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Feats

- User endpoints
    - Signup users
    - Login
    - Edit user
    - Delet User
- Post endpoints
    - Get posts
    - Create new post
    - Edit post
    - Delete post
    - React to a post


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation

https://documenter.getpostman.com/view/24460683/2s93CNMsiJ

### Diagram
![Product Name Screen Shot][product-screenshot]

Diagram URL <br/>
https://dbdiagram.io/d/63f7e93e296d97641d835a97



<!-- CONTACT -->
## Contact

Alexandre Machado  - afmjuniors@gmail.com



<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Afmjuniors/Labook.svg?style=for-the-badge
[contributors-url]: https://github.com/Afmjuniors/Labook/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Afmjuniors/Labook.svg?style=for-the-badge
[forks-url]: https://github.com/Afmjuniors/Labook/network/members
[stars-shield]: https://img.shields.io/github/stars/Afmjuniors/Labook.svg?style=for-the-badge
[stars-url]: https://github.com/Afmjuniors/Labook/stargazers
[issues-shield]: https://img.shields.io/github/issues/Afmjuniors/Labook.svg?style=for-the-badge
[issues-url]: https://github.com/Afmjuniors/Labook/issues
[license-shield]: https://img.shields.io/github/license/Afmjuniors/Labook.svg?style=for-the-badge
[license-url]: https://github.com/Afmjuniors/Labook/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/afmjuniors
[product-screenshot]: readme-image/labook.png
[SQLite]: https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlitetutorial.net/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/pt-br/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white
[Postman-url]: https://www.postman.com/

