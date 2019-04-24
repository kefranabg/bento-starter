[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://bento-starter.netlify.com/)
[![CircleCI](https://circleci.com/gh/kefranabg/bento-starter/tree/master.svg?style=svg&circle-token=f311e2320782a12321a769faa2ef1d3cdf5e1a10)](https://circleci.com/gh/kefranabg/bento-starter/tree/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/kefranabg/bento-starter/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/vuesion/vuesion/graphs/commit-activity)
[![Dependencies](https://img.shields.io/david/kefranabg/bento-starter.svg)](https://david-dm.org/kefranabg/bento-starter)
[![DevDependencies](https://img.shields.io/david/dev/kefranabg/bento-starter.svg)](https://david-dm.org/kefranabg/bento-starter?type=dev)

<h1 align="center">Welcome to bento-starter :wave:</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/kefranabg/bento-starter/master/src/assets/img/bento-starter.svg?sanitize=true" alt="Bento-starter"/>
</p>

<br />

:bento: **bento-starter** is an Open-Source Full-Stack solution that helps you to build fast and maintainable web applications using tools like Vue.js, Firebase, Progressive Web Apps support, dynamic offline support... The goal of this project is to provide a powerful and well configured stack (with CI/CD, hosting...) so you can focus on writing your web application very quickly.

As this project is a template project and not a CLI, you have access to the entire app configuration so you can change it according to your needs.

## :book: Documentation

Want to setup this stack ?

:point_right: The full documentation is available [here](https://bento-starter.netlify.com/)

## Demo

:point_right: [https://bento-starter.firebaseapp.com](https://bento-starter.firebaseapp.com)

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/9840435/56022522-30ba0980-5d0c-11e9-8c61-23a9f91a926f.gif" alt="demo"/>
</p>

<br />

**Lighthouse score :**

![Lighthouse score](https://raw.githubusercontent.com/kefranabg/bento-starter/master/resources/lighthouse-score-report.jpg)

**Optional CircleCI preconfigured workflow :**

![CI Worflow](https://raw.githubusercontent.com/kefranabg/bento-starter/master/resources/ci-workflow.jpg)

**The stack is made up of :**

- :metal: [Vue.js](https://vuejs.org/) : front-end framework
- :wrench: [Vue-cli](https://cli.vuejs.org/) : standard tooling for vue.js development
- :repeat: [Vuex](https://vuex.vuejs.org/) : state management
- :floppy_disk: [Firestore](https://firebase.google.com/products/firestore/) : cloud NoSQL Database
- :house: [Firebase hosting](https://firebase.google.com/products/hosting/) : fast and secure web hosting
- :bust_in_silhouette: [Firebase authentication](https://firebase.google.com/products/firestore/) : for easy authentication
- :iphone: [PWA](https://www.npmjs.com/package/@vue/cli-plugin-pwa) : progressive web app support
- :lipstick: [Prettier](https://prettier.io/) : code formating rules
- :rotating_light: [Eslint](https://eslint.org/) : control code quality
- :white_check_mark: [Jest](https://jestjs.io/) : unit testing
- :white_check_mark: [Cypress](https://www.cypress.io/) : e2e testing
- :mag: [Vue head](https://github.com/ktquez/vue-head) : meta description per page
- :page_facing_up: [Optional][prerender spa plugin](https://github.com/chrisvfritz/prerender-spa-plugin) : pages prerendering
- :green_heart: [Optional][circleci](https://circleci.com/) : continuous integration/deployment
- :package: [Optional][bundlesize](https://github.com/siddharthkp/bundlesize) : control your js bundles sizes

**App embedded features :**

- :bust_in_silhouette: Google authentication
- :mobile_phone_off: Offline support (dynamic & static caching)
- :new: `New version available` prompt on new app deployments
- :heavy_plus_sign: `Add to home screen` prompt for ios & android
- :leftwards_arrow_with_hook: Smart redirection for auth protected routes
- :sparkles: Products page example to demonstrate app data management with firestore and vuex
- :muscle: Better PWA support for all browsers with [PWACompat](https://github.com/GoogleChromeLabs/pwacompat)

## Setup

### Pre-requisites

- node@9.3.0+
- npm@5.5.0+

### Tips

We highly recommand to use [VSCode](https://code.visualstudio.com/) with the following plugins to get a better development experience :

- Prettier
- Eslint
- Vetur

### Step 1 - Installation

🕙 Estimated time → **20 seconds**
<br />

```
git clone https://github.com/kefranabg/bento-starter.git
cd bento-starter
cp .env.example .env.local
npm i
```

### Step 2 - Firebase configuration

🕙 Estimated time → **3 minutes**
<br />

- Create a new firebase project with the [firebase console](https://console.firebase.google.com)
- Once your firebase project is created, add an application by clicking the web button 👉 ![Firebase web app button](/resources/firebase-web-btn.jpg) and copy the config object and replace the config variable in `/src/firebase/init.js` in bento-starter project.
- Go to `Side menu → Database → Create database` and select `Start in test mode`. Now your firestore database is up.
- Go to `Side menu → Authentication` click `Set up sign-in method`.
- Click on Google provider, enable it by clicking the switch button, select a project support email and click `save` button. **You will be able to change or add new auth providers later if you need to.**
- Back to your bento-starter project, open a console and run :

```
npm i -g npx

# login with the with the account you used to create the firebase project
npx firebase login

# select the project you've just created and use "default" as alias
npx firebase use --add

# Build the app and deploy
npm run build
npx firebase deploy
```

**You're done ! :tada:**<br />
**Your project is now available on firebase hosting**.<br />
**You can also run `npm run serve` and start your app development !**

However we recommand you to go through Optional steps to get a better developer experience :sunglasses:

### Step 3 (Optional) - Continuous integration/deployment

🕙 Estimated time → **5 minutes**
<br />

We've built a CircleCI configuration that will trigger the following actions when you're pushing to your github repository.
The process is the following :

- Check that all project files matches the prettier format : `npm run prettier:check`
- Run the linter : `npm run lint`
- Run unit tests : `npm run test:unit`
- Run e2e tests : `npm run test:e2e:headless`
- Build the project : `npm run build`
- Check your js bundles sizes : `npm run bundlesize`
- **Eventually** deploy the built project to firebase hosting if the targeted branch is **master** : `npm run firebase:deploy:ci`

⚠️ **For this step, we assume that you already have a github repository that hosts your bento-starter project with your source code pushed on the master branch** ⚠️

Steps :

- Go to [https://circleci.com](https://circleci.com)
- Login with your github account
- Authorize CircleCI to look into your github projects
- Go to `Side menu → Add projects` and click the `Set Up Project` button corresponding to your **bento-starter** project
- Choose `Linux` for operating system and `Node` for the language
- You can directly start your first CircleCI build by clicking `Start building` button.
- Go to `Side menu → Jobs` and you should see your first CircleCI job running
- Now wait for all the jobs to finish

The last job (`deploy`) will fail and this is normal :sweat_smile: It's because of the deployment step (`npm run firebase:deploy:ci`). We need to authorize circle ci to deploy on our firebase hosting project. For this we just need to add a firebase token to circle ci :

- Back to a terminal run the following command :

```
npx firebase login:ci
```

- Login with you google account and authorize firebase-cli. The command will print out a token that looks like this :

```
1/PXcLCJ5BXAZ7ciFwkrrpikUbnMAMX8xRFmt16pLYudg9
```

- Copy this token and in your CircleCI project interface, go to `Your CircleCI project settings → Environment Variables` and click `Add Variable` button.
- For the env variable name, use `FIREBASE_TOKEN` and for the value, use the token you got from the `firebase login:ci` command.
- Go to `Side menu → Jobs` click the job that fails and click the `Rerun workflow` button.
- Wait again for all the jobs to finish.
- Now the deploy step has completed with success and your project has automatically been deployed to firebase hosting :tada:

## Known issues

- Before IOS 12.2, OAuth redirection is not working when the PWA is running in standalone.

## Show your support

⭐️ this repo

## License

[MIT](https://opensource.org/licenses/MIT)
