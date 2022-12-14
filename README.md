To start "Public Library" project you need following steps: 

### clone git repo or download zip folder 

After this you have to run command "npm install"

### create .env file in the backend folder

In the .env file must be:

PORT= port number (spaces do not allowed)
MONGO_URI= mongoDB URI (spaces do not allowed)
SECRET= secret code(you can type or generate some code. spaces do not allowed)
PASSWORD= here must be password for nodemailer to send reset links. This password is generated in gmail account for applications

### `backend/controllers/resetController.js`

In resetController.js file you have to add email address in two places instead of "your email here".

hints:

  user: "your email here", // email must be inside " "
  pass: process.env.PASSWORD, // ethereal password
  
  from: '"Public Library 👻" <your email here>' // email must be inside < >

Links will be sent from this email.

          
### `npm start`

First you need to cd into frontend folder and then run command "npm start".
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm run dev`

First you need to cd into backend folder and then run command "npm run dev".
This command runs the server.
