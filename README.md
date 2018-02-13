# RESTful API with TypeScript, Node, Express and MongoDB


## How to start application
1. Install [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.com/)
2. Add {nodeBinPath} and {mongoBinPath} to environment variables
3. npm install -g typescript nodemon
4. git clone [restful-api](https://github.com/diegomors/restful-api.git)
5. mv restful-api {your-app-name}
6. cd {your-app-name} 
7. npm install
8. md data
9. mongod --dbpath ./data
10. npm start (dev by default) OR npm run [dev, qa, hom, prod]

Avaliable by default in https://localhost:3000/
Enjoy!

### To set a different HOST and PORT
1. Include in package.json scripts [dev, qa, hom, prod] before npm command
`
"set HOST=127.0.0.1 && set PORT=8080 && [...]"
`