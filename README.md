# Yummly API Example

## Introduction

This sample shows how to connect an Angular and typescript app to the Yummly API and return recipes with excluded recipe
ingredient's through user input.

##Prerequisites
To use the Yummly API sample you will need the following:
* [Node.js/npm](https://nodejs.org/en/download) Node is required to run this sample and to install dependencies, it will come installed through this link with npm(node package manager). If you already have them installed, make sure your node version is 4.x.x or greater and your npm version is 3.x.x or greater. You can do so with
```
--node version
```
and
```
--npm version
```
* [TypeScript](https://angular.io/docs/ts/latest/quickstart.html) a fantastic example of how to install and create the bare minimum for a functioning TypeScript application can be found here. If you have run a typescript application before or would like start with this code already you can clone the setup branch of this [example](https://github.com/ConlanMcNamee/yummly_example/tree/setup).
* If you want to make calls to the Yummly API on your own you will need your own account [here](https://developer.yummly.com/#the-api), otherwise the url provided in this example will allow proper responses from the Yummly API.

##Building the application
1. Download or clone the basic setup [here](https://github.com/ConlanMcNamee/yummly_example/tree/setup)
2. Using your selected IDE, open the folder containing the basic setup.
3. In the command prompt, run these commands in the root directory. The first command will install the dependencies required to run this application. The second command will open an instance of our basic application in your browser through lite-server, which is serving up our index.html file, and monitor it's changes through the TypeScript compiler watch mode.
```
npm install
npm start
```
So now there should be a virtual server running now in our command prompt, if a new page did not open in your browser youc an go to localhost:3000 to see the application.

## Adding files
Lets open another command prompt since we have one running our server and add the necessary files.
