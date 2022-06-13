const { initializeApp } = require('firebase/app');
const config = require('../config/authConfig');
const firebaseApp = initializeApp(config);
module.exports = firebaseApp;