# Financial forecast
The financial forecast applications pretends to help people managing their money.

# Features

- Displays **transaction history**.
- **Imports** transactions from **csv file**.
  - Map headers fields to application transaction structure.
- Calculate **balance** of transactions history on a line chart and a table.


# Folder Structure

- assets
- components - contains components used in more than one scene and components that don't fit in any scene like App and Header.
- locale - constants that identify strings and locale strings files.
- localstorage - constains constants that identify properties that can be saved in localstorage.
- scenes - contains pages and their own components
- services - constains all services. Most of them are used as the layer that connects with server.
- store - contains all logic related with Redux state.
  - /*/actions - contains action creators
  - /*/types - contains types used in action creators and reducer
  - /*/thunks - contains operations related with asyncronous chages of state like getting data from server
  - /*/reducer - contains reducer, the function that changes state. The rootReducer uses reducers of other modules like authentication, localize, etc.

# Configuration

Configuration properties are defined in root files .env.{environment}, where environment can be `production` or `development`.

Variables of `development` are used on `npm start`.<br />
Variables of `production` are used on `npm run-script build`.

All variables must start with `REACT_APP_`, so `create-react-app` can inject them in project.

# Getting started

Install dependencies and run server.

```
> npm install
> npm start
```

Or use docker

```
> docker-compose up
```

# Deploy

Generate bundle of application minified and run static server with bundle generated.

```
> npm run-script build
> npm install -g serve
> serve -s build
```

`Warning: Verify before deploying if build application has the last updates. If not, clean directory before running build script.`

# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You will find information on how to perform common tasks on this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
