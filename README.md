# Kivi Amarakoon - (portfolio-2)
> My Portfolio template version 2

> Below is the project guide.

## Starting a new project using react vite

- Create the application using npm

```
npm init vite@latest my-react-app -- --template react
```

- Install dependencies

```angular2html
npm install
```

- Start the application

```
npm run dev
```

- Configure Prettier

```angular2html
npm install --save-dev prettier
```
- To configure Prettier, you can create a .prettierrc file in the root of your project.
- Add following code

```
{
 "semi": true,
 "trailingComma": "all",
 "singleQuote": true,
 "printWidth": 80,
 "tabWidth": 2
}
```

- Add Prettier to Your npm Scripts
- Add below to the [package.json]
```
"scripts": {
 "format": "prettier --write .",
 "format:check": "prettier --check ."
}
```

- Run Prettier
```angular2html
npm run format
```

- To check if your files are formatted correctly, run
```
npm run format:check
```