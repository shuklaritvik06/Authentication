const { initializeApp } = require('firebase/app');
const firebaseConfig = require('../config/authConfig');
const app = initializeApp(firebaseConfig);
module.exports = app;