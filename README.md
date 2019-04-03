![Bento-starter](https://raw.githubusercontent.com/kefranabg/bento-starter/master/resources/bento-starter.svg?sanitize=true)
<br />
<br />

[![CircleCI](https://circleci.com/gh/kefranabg/bento-starter/tree/master.svg?style=svg&circle-token=f311e2320782a12321a769faa2ef1d3cdf5e1a10)](https://circleci.com/gh/kefranabg/bento-starter/tree/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Welcome to bento-starter :wave:

Demo :point_right: [https://bento-starter.firebaseapp.com](https://bento-starter.firebaseapp.com)

:bento: bento-starter is a stack that provides a full environment to quickly build applications with your team. As this project is a template project and not a CLI, you have access to entire app configuration so you can change it according to your needs.

**The stack is made up of :**

* :metal: [Vue.js](https://vuejs.org/) : front-end framework 
* :wrench: [Vue-cli](https://cli.vuejs.org/) : standard tooling for vue.js development 
* :repeat: [Vuex](https://vuex.vuejs.org/) : state management 
* :floppy_disk: [Firestore](https://firebase.google.com/products/firestore/) : cloud NoSQL Database 
* :bust_in_silhouette: [Firebase authentication](https://firebase.google.com/products/firestore/) : for easy authentication 
* :iphone: [PWA](https://www.npmjs.com/package/@vue/cli-plugin-pwa) : progressive web app support 
* :lipstick: [Prettier](https://prettier.io/) : code formating rules 
* :rotating_light: [Eslint](https://eslint.org/) : control code quality 
* :white_check_mark: [Jest](https://jestjs.io/) : unit testing 
* :white_check_mark: [Cypress](https://www.cypress.io/) : e2e testing 
* :mag: [Vue head](https://github.com/ktquez/vue-head) : meta description per page 
* :page_facing_up: [Optionnal] [Prerender SPA plugin](https://github.com/chrisvfritz/prerender-spa-plugin) : pages prerendering 
* :green_heart: [Optionnal] [CircleCI](https://circleci.com/) : continuous integration/deployment 
* :file_folder: [Optionnal] [Bundlesize](https://github.com/siddharthkp/bundlesize) : control your js bundles sizes 


**App embedded features :**

* :bust_in_silhouette: Google authentication 
* :mobile_phone_off: Offline support 
* :new: `New version available` prompt on new app deployments 
* :heavy_plus_sign: `Add to home screen` prompt for ios & android 
* :leftwards_arrow_with_hook: Smart redirection for auth protected routes 
* :sparkles: Products page example to demonstrate app data management with firestore and vuex 

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

We've built a CircleCI configuration that will trigger the following actions when you're pushing to your github repository.
In order :

* Check that all project files matches the prettier format : `npm run prettier:check`
* Run the linter : `npm run lint`
* Run unit tests : `npm run test:unit`
* Run e2e tests : `npm run test:e2e:headless`
* Build the project : `npm run build`
* Check your js bundles sizes : `npm run bundlesize`
* **Eventually** deploy the built project to firebase hosting if the targeted branch is **master** `npm run firebase:deploy`

**For this step, it is asumed that you already have a github repository for your bento-starter project.**

Steps :

* Go to [https://circleci.com](https://circleci.com)
* Login with your github account
* Authorize CircleCI to look into your github projects
* Add a new project
* Select your github repository you are using to host bento-starter project
* Choose `Linux` for operating system and `Node` for the language
* You can directly start your first CircleCI build by clicking `Start building` button.


Now your build will fail and this is normal :sweat_smile: It's because of the deployment step (`npm run firebase:deploy`). We need to authorize circle ci to deploy on our firebase hosting project. For this we just need to add a firebase token to circle ci :

* Back to a terminal run the following command :

```
npx firebase login:ci
```

* Login with you google account and authorize firebase-cli. The command will print out a token that looks like this :

``` 
1/PXcLCJ5BXAZ7ciFwkrrpikUbnMAMX8xRFmt16pLYudg9
```

* Copy this token and in your CircleCI project interface, go to => Settings => Environment Variables => Click `Add Variable` button. Fot the env variable name, use `FIREBASE_TOKEN` and for the value, use the token you got from the `firebase login:ci` command.

Now if you manually trigger a build, the workflow should execute without error :tada:

### Step 4 (Optionnal) - Enable bundle size status for github pull requests 

To enable bundle size status, follow [these steps](https://github.com/siddharthkp/bundlesize#2-build-status)

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

### Run prettier check format

``` 
npm run prettier:check
```

### Format all files with prettier

```
npm run prettier:format-all
```

## Known issues

* **IOS:** When app is launched in standalone mode (add to home screen workflow), Google auth redirection is not working on IOS. This is a PWA issue on IOS that will probably be fixed with IOS [12.2](https://twitter.com/mhartington/status/1089293403089784832). Referenced issue : [#47](https://github.com/kefranabg/bento-starter/issues/47)
