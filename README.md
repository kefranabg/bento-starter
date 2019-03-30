[![CircleCI](https://circleci.com/gh/kefranabg/bento-starter/tree/master.svg?style=svg&circle-token=f311e2320782a12321a769faa2ef1d3cdf5e1a10)](https://circleci.com/gh/kefranabg/bento-starter/tree/master)


# Welcome to bento-starter :wave:

Demo :point_right: [https://bento-starter.firebaseapp.com](https://bento-starter.firebaseapp.com)

:bento: bento-starter is a stack that intends to provide a well configured environment for vuejs applications. As this project is a template project and not a CLI, you have access to entire app configuration so you can change it according to your needs.

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
* [Vue head](https://github.com/ktquez/vue-head) : meta description per page :mag:
* [Optionnal] [Prerender SPA plugin](https://github.com/chrisvfritz/prerender-spa-plugin) : pages prerendering :page_facing_up:
* [Optionnal] [CircleCI](https://circleci.com/) : continuous integration/deployment :green_heart:
* [Optionnal] [Bundlesize](https://github.com/siddharthkp/bundlesize) : control your js bundles sizes :file_folder:


**App embedded features :**

* Google authentication :bust_in_silhouette:
* Offline support :mobile_phone_off:
* `New version available` prompt on new app deployments :new:
* `Add to home screen` prompt for ios & android :heavy_plus_sign:
* Smart redirection for auth protected routes :leftwards_arrow_with_hook:
* Products page example to demonstrate app data management with firestore :sparkles:

**Lighthouse score:**

![Lighthouse score](https://raw.githubusercontent.com/kefranabg/bento-starter/master/resources/ligthouse-score.jpg)

## Pre-requisites

* node@9.3.0+
* npm@5.5.0+

## Setup 

### Step 1 - Installation

``` 
git clone https://github.com/kefranabg/bento-starter.git
cd bento-starter
cp .env.example .env.local
npm i
```

### Step 2 - Firebase configuration

* Create a new firebase project with the [firebase console](https://console.firebase.google.com)
* Create a cloud firestore database
* Enable Google as a sign-in provider for authentication
* In your firebase project home page, click `add an application` button then click the web icon project.
From here you can copy the config object and replace the config variable in `/src/firebase/init.js` in bento-starter project
* Back to bento-starter project, open a console and run :
```
npm i -g npx

# login with the with the account you used to create the firebase project
npx firebase login

# login with the account you used to create the firebase project,
# select the project you've just created and use "default" as alias 
npx firebase use --add

# Build the app and deploy
npm run build
npx firebase deploy
```

**You're done ! :tada:**

**Your project is now available on firebase hosting**

**You can now run `npm run serve` and start your app development !** 

However we recommand you to go through optionnal steps to get a better developer experience :sunglasses:

### Step 3 (Optionnal) - CircleCI configuration for continuous integration/deployment

Documentation in progress :memo:

### Step 4 (Optionnal) - Bundlesize configuration for bundle size control

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

## Known issues

* **IOS:** When app is launched in standalone mode (add to home screen workflow), Google auth redirection is not working on IOS. This will probably be fixed with IOS [12.2](https://twitter.com/mhartington/status/1089293403089784832). Referenced issue : [#47](https://github.com/kefranabg/bento-starter/issues/47)
