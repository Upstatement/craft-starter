# Craft Starter

An Upstatement-flavored starter project for [Craft 3](https://craftcms.com/)

## 🎁 What's in the box

- Craft 3 install
- [Schematic](https://github.com/nerds-and-company/schematic) plugin to synchronize your Craft setup over multiple environments
- [ups-dock](https://github.com/upstatement/ups-dock) configuration
- Webpack bundling & optimization of CSS and JavaScript
- Browsersync
- Upstatement linting configuration for ESLint & Prettier
- Stylelint and PHP linting

## 🚀 Getting Started

### 🧰 Prerequisites

1. Install [Docker for Mac](https://www.docker.com/docker-mac)
2. Install [Ups Dock](https://github.com/upstatement/ups-dock)
3. Ensure [NVM](https://github.com/creationix/nvm) is installed globally (see [Ups Dev Env Setup](https://github.com/Upstatement/Upstatement/wiki/2017-Development-Environment-Setup))

### 🏠 Make it your own

1. Download this repository as a ZIP file (unless you want to manually remove the `.git` folder)
2. Do a **case-sensitive** find and replace for

   - `Craft Starter`
   - `craftstarter`

     and replace those with your desired project name

   > **NOTE:** Whatever you replace `craftstarter` with should be all lowercase, as it will be part of your Ups Dock URL

### 💻 Installation

1. Make sure you're using the correct version of Node

   ```bash
   nvm install
   ```

2. Run the install script:

   ```bash
   ./bin/install
   ```

At this point you should have a fully functioning Craft install available at https://your-project-name.ups.dock.

> **NOTE: To access the CMS you need to use the Ups Dock URL (https://your-project-name.ups.dock/admin) and not localhost:3000/admin**.

## 🐳 Ups Dock Environment

- **URL**: https://your-project-name.ups.dock
- **Craft Admin**: https://your-project-name.ups.dock/admin (`un`: `admin`, `pw: password`)

> **NOTE:** `your-project-name` should be the same name you replaced `craftstarter` with in the "Making it your own" section above

## 🛠 Development Workflow

1. Run `nvm use` to ensure you're using the correct version of Node
2. Run `./bin/start` to start the Craft backend / static build server
3. Open the `Local` URL that appears below `[Browsersync] Access URLs:` in your browser (https://localhost:3000/)

To modify front-end stuff, you should be working out of the `static` directory for styles & JavaScript and the `templates` directory for Twig markup. Read more about [using Twig with Craft](https://docs.craftcms.com/v3/dev/twig-primer.html#three-types-of-twig-tags).

When you're ready to stop, type `Control-C` to kill the server and export the schema

### Pro Tips

- If your schema file gets into a weird state, while the container is up and running you can always manually import the schema

  ```bash
  ./bin/import-schema
  ```

- If you ever need to backup your database, while the container is up and running you can run

  ```bash
  ./bin/backup
  ```

  and a gzipped SQL file will be dumped into the `backups` directory

- If you try to run a script in the `bin` directory and get an error message such as `permission denied: ./bin/<name-of-file>`, all you have to do is run `chmod +x bin/<name-of-file>` to give it the right permissions

- On `./bin/install`, if you encounter an error such as

  ```bash
  ERROR: Bind for 0.0.0.0:3306 failed: port is already allocated
  ```

  this is happening because you already have something else (most likely a container from a different project) running that is using port 3306. To see your running docker containers, type `docker-ps -a`. Shut down any containers using port 3306.

## 💣 Uninstalling

To completely destroy the local Docker environment run:

```bash
./bin/uninstall
```

## 🖼 Static Assets

This project uses [Webpack](https://webpack.js.org/) to compile and process static assets. For the most part you shouldn't have to think about it but here are some highlights:

- JavaScript is transpiled with [Babel](https://babeljs.io/) to support modern ES features.
- Stylesheets are compiled with [Node Sass](https://github.com/sass/node-sass) and run through [Autoprefixer](https://github.com/postcss/autoprefixer) configured to add prefixes for all supported browsers.
- Fonts and images referenced in your scripts and stylesheets will be processed by Webpack and converted to data URIs or copied to the build directory depending on their file size.

## 📦 Third Party Libraries

There are two Webpack configurations -- one for project files ([`webpack/config.js`](webpack/config.js)), and one for third party vendor libraries ([`webpack/config.vendor.js`](webpack/config.vendor.js)). To cut down on build time these bundles are compiled separately.

**If you need to add a third-party library:**

1. Add the vendor library as a node dependency with npm (e.g. `npm install --save jquery`)
2. Add the package name to the vendor entrypoint in [`webpack/config.vendor.js`](webpack/config.vendor.js).
3. Run `npm run build:vendor` to re-build the vendor bundle.

## ‍🙅‍ Code Quality

Don't commit messy code!

Here's a list of things already configured to keep you in line:

- [EditorConfig](https://editorconfig.org/)
- [Stylelint](https://github.com/stylelint/stylelint)
- [Upstatement's ESLint Config](https://github.com/Upstatement/eslint-config)
- [Upstatement's Prettier Config](https://github.com/Upstatement/prettier-config)
- [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer)

All of these tools will be run with the pre-commit hook (configured with [Husky](https://github.com/typicode/husky)) to make sure you're not committing inconsistent code. We highly recommend configuring your editor to use these tools so that you can see (and fix) style violations as you write code.

You can also run the linters from your terminal at any time:

```bash
npm run lint:styles
npm run lint:scripts
npm run lint:php
```

## 📚 Resources

### Official Resources

- [Craft 3 Documentation](https://docs.craftcms.com/v3/)
- [Craft 3 Class Reference](https://docs.craftcms.com/api/v3/)
- [Craft 3 Plugins](https://plugins.craftcms.com)

### Community Resources

- [Mijingo](https://mijingo.com/craft) – Video courses and other learning resources
- [Envato Tuts+](https://webdesign.tutsplus.com/categories/craft-cms/courses) – Video courses
- [Straight Up Craft](http://straightupcraft.com/) – Articles, tutorials, and more
