

[![Build Status](https://travis-ci.org/inwinstack/s3-portal-ui.svg?branch=dev)](https://travis-ci.org/inwinstack/s3-portal-ui)


# S3 Portal

  Used for connect RadosGW to manager S3 portal objects. 
  A web based file manager to upload and download files from your RadosGW server.

## Usage

#### bucket control screenshot
![bucket control screenshot](https://github.com/inwinstack/s3-portal-ui/blob/dev/screenshots/bucket%20screenshot.png?raw=true)

#### userlist screenshot
![user list screenshot](https://raw.githubusercontent.com/inwinstack/s3-portal-ui/dev/screenshots/userlist%20screenshot.png)

#### storageinfo screenshot
![storageinfo screenshot](https://raw.githubusercontent.com/inwinstack/s3-portal-ui/dev/screenshots/storage%20screenshot.png)

---

## Features
 -  Upload and Download file
 -  CRUD implements of folder
 -  CRUD implements of files
 -  Check file, folder info details

---
## Requirement

- used for `Node >= 6.1.0`
- need for [S3-portal-api](https://github.com/inwinstack/s3-portal-api) with Laravel



---


## Installation

Copy the `./config.example.js` file to `./config.js` and configure the file for your environment:

```sh
$ cp config.example.js config.js
$ vim config.js
```

Install dependencies:

```sh
$ npm install
```

Open another terminal and running below command:

```sh
$ npm start
```

`http://localhost:3001` will automatically open with browser-sync.

---

## Build

Build the bundle js:

```sh
$ npm run build
```

The static file will build on `./dist`.

You can start the production server:

```sh
$ npm run prod
```
---

## Test

```sh
$ npm test
```