[![Netlify Status](https://api.netlify.com/api/v1/badges/4e57ab36-3c83-46b6-bf38-7b3d2c7ac986/deploy-status)](https://app.netlify.com/sites/vue-firebase-starter-kit/deploys)
[![CircleCI](https://circleci.com/gh/kefranabg/vuejs-firebase-starter-kit/tree/master.svg?style=svg&circle-token=f311e2320782a12321a769faa2ef1d3cdf5e1a10)](https://circleci.com/gh/kefranabg/vuejs-firebase-starter-kit/tree/master)


# Welcome to vue-firebase-starter-kit :wave:

Demo :point_right: [https://vue-firebase-starter-kit.netlify.com](https://vue-firebase-starter-kit.netlify.com)

vue-firebase-starter-kit is a stack that intends to provide a simple, well configured environment for vuejs applications. As this project is a template project and not a CLI, you have access to entire app configuration so you can change it according to your needs.

**The stack is made up of :**

* [Vue.js](https://vuejs.org/) : front-end framework :metal:
* [Vue-cli](https://cli.vuejs.org/) : standard tooling for vue.js development :wrench:
* [Vuex](https://vuex.vuejs.org/) : state management :repeat:
* [Firestore](https://firebase.google.com/products/firestore/) : cloud NoSQL Database :floppy_disk:
* [Firebase authentication](https://firebase.google.com/products/firestore/) : for easy authentication :bust_in_silhouette:
* [PWA](https://www.npmjs.com/package/@vue/cli-plugin-pwa) : progressive web app support :iphone:
* [Prettier](https://prettier.io/) : code formating rules :lipstick:
* [Eslint](https://eslint.org/) : control code quality :rotating_light:
* [Jest](https://jestjs.io/) : unit testing :white_check_mark:
* [Cypress](https://www.cypress.io/) : e2e testing :white_check_mark:
* [Optionnal] [Prerender SPA plugin](https://github.com/chrisvfritz/prerender-spa-plugin) : pages prerendering :page_facing_up:
* [Optionnal] [CircleCI](https://circleci.com/) : continuous integration :green_heart:
* [Optionnal] [Netlify](https://www.netlify.com/) : hosting / continuous deployment :rocket:
* [Optionnal] [Bundlesize](https://github.com/siddharthkp/bundlesize) : control your js bundles sizes :file_folder:


**App embedded features :**

* Google authentication :bust_in_silhouette:
* Offline support :mobile_phone_off:
* Client `New version available` prompt on new app deployments :new:
* `Add to home screen` prompt for ios & android :heavy_plus_sign:
* Smart redirection for auth protected routes :leftwards_arrow_with_hook:
* Dashboard page example to demonstrate app data management with firebase :sparkles:

## Pre-requisites

* node@9.3.0+
* npm@5.5.0+

## Setup 

### Step 1 - Installation

``` 
git clone https://github.com/kefranabg/vuejs-firebase-starter-kit.git
cd vuejs-firebase-starter-kit
cp .env.example .env.local
npm i
```

### Step 2 - Firebase configuration

* Create a new firebase project with the [firebase console](https://console.firebase.google.com)
* Create a cloud firestore database
* Enable Google as a sign-in provider for authentication
* In your firebase project home page, click `add an application` button then click the web icon project.
From here you can copy the config object and replace the config variable in `/src/firebase/init.js` in vuejs-firebase-starter-kit project
* Back to vuejs-firebase-starter-kit project, open a console and run :
```
npm i -g npx

# login with the with the account you used to create the firebase project
npx firebase login

# the following command will deploy firestore security rules located in `src/firebase/firestore.rules`
npx firebase deploy
```

**You're done ! You can now run `npm run serve` and start your app development !** :tada:

However we recommand you to go through optionnal steps to get a better developer experience :sunglasses:

### Step 3 (Optionnal) - CircleCI configuration for continuous integration

Documentation in progress :memo:

### Step 4 (Optionnal) - Netlify configuration for continuous deployment

Documentation in progress :memo:

### Step 5 (Optionnal) - Bundlesize configuration for bundle size control

Documentation in progress :memo:

## Commands

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
