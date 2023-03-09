# RaftLabs

<p align="center">
  <h2 align="center">RaftLabs - Task 2 - Chat Application - Socket.io</h3>
</p>

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#framework-used">Framework Used</a></li>
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
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is required to build in **`node js`** with **`mongodb`** as backend. It provides following capability through API interface:

1. CSV File Upload from Multipart Form
2. Scan the uploaded CSv and push its content in MongoDB collection
3. API to perform CRUD operations on above collection

The above API are using passport package for basic authentication to manage access

### Framework Used

Here are the major framwords which were used in the project

- [Nodejs](https://nodejs.org/en/)
- [NPM package Manager](https://www.npmjs.com/)
- [Mongo DB](https://www.mongodb.com/)
- [Postman](https://www.postman.com/)

<!-- GETTING STARTED -->

## Getting Started

The following sections helps in installing the project and the prerequisties required for the same.
The prerequisites and the installation guide are as follow:-

### Prerequisites

The local machine should have **Node js**, **Postman** and **MongoDB** installed

- npm
  ```sh
  npm install npm@latest -g
  ```
- postman
- mongodb

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ArnavMahajan01/Kaplas.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Make a `.env` file and inside the file enter your` </br><p>``</p> `
   Mongoose cluster path `DB_CONNECT = "YOUR PATH"`. `</br>`
   Port number for your localhost `PORT = "Port Number"`

<!-- USAGE -->

## Usage

In this section, the structure and the project flow is described.

1. The project is divided into various section. There is a _**`middleware`**_ Folder alond with _**`controller`**_, _**`routes`**_ and _**`config`**_. In the* **`others`*** folder there is a dummy CSV file for upload. Upon using the routes and uploading it, the csv file is uploaded in _**`uploads`**_ folder

![Project Flow](/images/Project%20structure.png)

2. Various API's are called which help in acheiving various function. Like `http://localhost:3000/fileUpload` helps in uploading the CSV file and pushing the data into Mongoose. Similarly `http://localhost:3000/CRUDcreate`, `http://localhost:3000/CRUDread`, `http://localhost:3000/CRUDupdate`, `http://localhost:3000/CRUDdelete` helps in other CRUD operations CREATE, READ, UPDATE, DELETE respectively.

2.1 API for CSV File upload
This API will help upload a CSV file`</br></br>`
![File Upload Insert](/images/File%20Upload%20insert.png)
![File Upload Output](/images/File%20Upload%20outputpng.png)

2.2 API for CRUD operations
Following are the API for the crud operations
`</br>`

2.2.1 For CRUD-Create `</br></br>`
![CRUD Create](/images/CRUD%20create.png)
2.2.2 For CRUD-Read`</br></br>`
![CRUD Read](/images/CRUD%20read.png)
2.2.3 For CRUD-Update`</br></br>`
![CRUD Update](/images/CRUD%20update.png)
2.2.4 For CRUD-Delete`</br></br>`
![CRUD Delete](/images/CRUD%20delete.png)

3. Also there are two more API's register and login which help in the authentication and authorization with the help of passport

![Register](/images/register.png)
![Login](/images/login.png)
