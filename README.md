# VoidfillClient
Main client for voidfill editor and (possibly?) player.

## Building

Below provided is two ways to create builds of the website. This is a VERY basic tutorial on how to do so, __a basic understanding of NodeJS is required__.

All of the following commands require you to be in the `src` directory and have the npm modules installed:

```bash
cd src
npm install
```

### Distributable Build
All commands must be ran inside of the `src` directory.

```bash
npm run build
```

A folder called `dist` will be created, this is the **DEVELOPMENT** distributable.

### Refreshing Build
If you would like to run an automatically updating development build, you can do the following in the `src` directory.

```bash
npm run watch
```

### Refreshing Host Build
If you would like a build that automatically updates and is hosted on your local network, you can run the following in the `src` directory. Please note that this requires port `3000` to be open.

```bash
npm run serve
```