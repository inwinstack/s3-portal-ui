

[![Build Status](https://travis-ci.org/inwinstack/s3-portal-ui.svg?branch=dev)](https://travis-ci.org/inwinstack/s3-portal-ui)


# S3 Portal

  Used for connect RadosGW to manager S3 portal objects. 
  A web based file manager to upload and download files from your RadosGW server.

## Usage

#### bucket control screenshot
![bucket control screenshot](screenshots/bucket%20screenshot.png)

#### userlist screenshot
![user list screenshot](screenshots/userlist%20screenshot.png)

#### storageinfo screenshot
![storageinfo screenshot](screenshots/storage%20screenshot.png)

---

## Features
 -  Upload and Download file
 -  CRUD implements of folder
 -  CRUD implements of files
 -  Copy and Move files and folders
 -  Check file, folder info details
 -  Personel storage info

---
## Requirement

- Used for `Node >= 6.1.0`
- Need for [S3-portal-api](https://github.com/inwinstack/s3-portal-api) with Laravel



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

Need to modify `confg.example.js` to `config.js` and default web server port is 3000


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