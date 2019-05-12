[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://bento-starter.netlify.com/)
[![CircleCI](https://circleci.com/gh/kefranabg/bento-starter/tree/master.svg?style=svg&circle-token=f311e2320782a12321a769faa2ef1d3cdf5e1a10)](https://circleci.com/gh/kefranabg/bento-starter/tree/master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/kefranabg/bento-starter/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/vuesion/vuesion/graphs/commit-activity)
[![Dependencies](https://img.shields.io/david/kefranabg/bento-starter.svg)](https://david-dm.org/kefranabg/bento-starter)
[![DevDependencies](https://img.shields.io/david/dev/kefranabg/bento-starter.svg)](https://david-dm.org/kefranabg/bento-starter?type=dev)
<a href="https://join.slack.com/t/bento-starter/shared_invite/enQtNjE5OTI5MzQyMTE3LTVjYjM3YjMzMGQ4NjgzYzY5YWMwNDkyY2VmMzg4ODg0OTkwZDRhMzg3OWU0MGY1MGYwMmVjYThiMmU2YzBjODY" target="_blank"><img src="https://home-assistant.io/images/supported_brands/slack.png" height="20px" /></a> 

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

Install the PWA demo from Google Play Store :point_right: [bento-starter Google Play Store](https://play.google.com/store/apps/details?id=com.bentostarter.bentostarterdemo)

<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/9840435/56022522-30ba0980-5d0c-11e9-8c61-23a9f91a926f.gif" alt="demo"/>
</p>

<br />

**Lighthouse score :**

![Lighthouse score](https://raw.githubusercontent.com/kefranabg/bento-starter/master/resources/lighthouse-score-report.jpg)

**Optional CircleCI preconfigured workflow :**

![CI Workflow](https://raw.githubusercontent.com/kefranabg/bento-starter/master/resources/ci-workflow.jpg)

**The stack is made up of :**

- :metal: [Vue.js](https://vuejs.org/) : front-end framework
- :wrench: [Vue-cli](https://cli.vuejs.org/) : standard tooling for vue.js development
- :repeat: [Vuex](https://vuex.vuejs.org/) : state management
- :floppy_disk: [Firestore](https://firebase.google.com/products/firestore/) : cloud NoSQL Database
- :house: [Firebase hosting](https://firebase.google.com/products/hosting/) : fast and secure web hosting
- :bust_in_silhouette: [Firebase authentication](https://firebase.google.com/products/firestore/) : for easy authentication
- :iphone: [PWA](https://www.npmjs.com/package/@vue/cli-plugin-pwa) : progressive web app support
- :lipstick: [Prettier](https://prettier.io/) : code formatting rules
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

## Known issues

- Before IOS 12.2, OAuth redirection is not working when the PWA is running in standalone.

## Show your support

⭐️ this repo

## 💬 Chat

Want to chat with us  ? 👉 [join bento-starter slack](https://join.slack.com/t/bento-starter/shared_invite/enQtNjE5OTI5MzQyMTE3LTVjYjM3YjMzMGQ4NjgzYzY5YWMwNDkyY2VmMzg4ODg0OTkwZDRhMzg3OWU0MGY1MGYwMmVjYThiMmU2YzBjODY)

## License

[MIT](https://opensource.org/licenses/MIT)