# Pushbullet SMS Client

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of its documentation [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Introduction

This is an Electron-based client for [Pushbullet](https://pushbullet.com/).

App frontend is made with React.

## Development

We prefer using `yarn`, so the lock file submitted is its one.

### React app
To start the React app, do:
```bash
yarn start
```

We are currently using `create-react-app`, so it starts the app using default configurations of that.

### Electron app
With the react app running, to start electron:
```bash
electron .
```
as the main file of `package.json` is electron main script.

The electron app - in development - loads data from _create-react-app_ webpack webserver running on `localhost:3000`.

## Production
[WIP]