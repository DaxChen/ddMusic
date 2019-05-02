// materialize-css
import 'jquery';
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.css';
// import 'materialize-css/dist/font/material-design-icons/Material-Design-Icons.eot';
// import 'materialize-css/dist/font/material-design-icons/Material-Design-Icons.svg';
// import 'materialize-css/dist/font/material-design-icons/Material-Design-Icons.ttf';
// import 'materialize-css/dist/font/material-design-icons/Material-Design-Icons.woff';
// import 'materialize-css/dist/font/material-design-icons/Material-Design-Icons.woff2';

// font-awesome
import 'font-awesome-webpack';

// vue
import Vue from 'vue';
import VueRouter from 'vue-router';

// custom
import App from './App';

// set player as global
window.player = null;

Vue.use(VueRouter);

/* eslint-disable no-new */

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
// !! Note that the App is not a Vue instance.
// var App = Vue.extend({})

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  history: 'true',
});

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
import Hello from './components/Hello';
import Main from './components/Main';
router.map({
  '/': {
    component: Hello,
  },
  '/:id': {
    component: Main,
  },
});

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#vue-root');

