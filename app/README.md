<a href="https://weight-control.netlify.com"><p align="center">
<img height=100 src="https://raw.githubusercontent.com/marcosansoni/weight-control/main/public/logo192.png"/>
</p>

<p align="center">Weight Control</p>
</a>

<p align="center">
  <strong>Keep track of your daily weight 🏃‍♂️🏃‍♀️</strong>
</p>

---

## Structure

| Folder                |      Description          |
| :-------------------- | :-----------------------: |
| [app](app)        	|      Node.js API          |
| [api](api)  			|      React.js FE          |

## Stack

The application is based on the following tech stack:

- Front End: React
- Back End: Node
- Database: mongodb

## How to run locally

It requires to create an account on mongodb atlas in order to use its cloud database.
Once an account its created annotate:

- Username 
- Password
- Cluster
- Collection

It will be required in order to execute the node.js api.
Then, set all the proper env into .env file into root of api folder and app folder for both Front End and Back End of the application respectively.
Finally, it can be executed launching:

- Into api folder, `npm run start`
- Into app folder, `npm run start`

Application will be launched on a browser on `localhost:3000`
