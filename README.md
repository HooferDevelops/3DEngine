# VoidfillClient
Main client for voidfill editor and (possibly?) player.

## Building

Below provided is two ways to create builds of the website. This is a VERY basic tutorial on how to do so, a basic understanding of NodeJS is required.

### Distributable Build
All commands must be ran inside of the `src` directory.

`cd src`

`npm i`

`npm run build`

A folder called `dist` will be created, this is the **DEVELOPMENT** distributable.

### Refreshing Build
If you would like to run an automatically updating development build, you have to install the webpack-cli.

`npm i -g webpack webpack-cli`

After doing so, you can run the following command inside of the `src` directory:

`webpack --watch`