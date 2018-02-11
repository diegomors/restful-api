# RESTful API with TypeScript, Node, ES6 and MongoDB


**## How to start application**
1. Install [Node.js](http://nodejs.org/)
2. Set environment variable NODE_ENV = 'C:\Program Files\nodejs\'
3. npm install -g nodemon express-generator
4. cd {your-app-name} 
5. npm install
6. npm run dev
7. [http://localhost:8080/](http://localhost:8080/)


**## How to deploy application**

**### Install the Heroku CLI**

Download and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

`
$ heroku login
`

**### Create a new Git repository**
Initialize a git repository in a new or existing directory

`
$ cd {your-app-name}/
$ git init
$ heroku git:remote -a {your-app-name}
`

**### Deploy your application**
Commit your code to the repository and deploy it to Heroku using Git.

`
$ git add .
$ git commit -am "make it better"
$ git push heroku master
`

**### Existing Git repository**
For existing repositories, simply add the heroku remote

`
$ heroku git:remote -a {your-app-name}
`

**Heroku Git URL**
https://git.heroku.com/{your-app-name}.git

**Domain**
Your app can be found at https://{your-app-name}.herokuapp.com/