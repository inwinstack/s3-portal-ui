# S3 Portal

> Constructing...

### Requirement

`Node >= 4.2.0`

### Usage

Install dependencies:
```sh
$ npm install
```

Open another terminal and running below command:
```sh
$ npm start
```

`http://localhost:3001` will automatic open in your browser with browser-sync.

### Build

Build the bundle js:
```sh
$ npm run build
```

### Test

```sh
$ npm test
```

### Lint

```sh
$ npm run lint
```

### Scaffold

```sh
$ gulp make --name={name} --path={path} [--route]
```

- `name`: component name.
- `path`: component path.
- `route`: if you set `--route` option that will stubing route config for your module.

For example, if you execute `gulp make --name=create --path=posts --route`, it will generate following files and include route config:

```
src/
└── components
    └── posts
        └── create
            ├── create.controller.js
            ├── create.css
            ├── create.html
            ├── create.js
            └── create.spec.js
```
