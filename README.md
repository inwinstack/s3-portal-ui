

[![Build Status](https://travis-ci.org/inwinstack/s3-portal-ui.svg?branch=dev)](https://travis-ci.org/inwinstack/s3-portal-ui)


# S3 Portal

> Constructing...

## Requirement

`Node >= 6.1.0`

---

## Usage

  Used for connect RadosGW to manager S3 portal objects. 
  A web based file manager to upload and download files from your RadosGW server.

![bucket control image](https://github.com/inwinstack/s3-portal-ui/blob/dev/screenshots/bucket%20screenshot.png)
  
 
---

## Features
![enter image description here](https://drive.google.com/open?id=0B4AYJNawWeecaXlwRDlpbEl1OGM)

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