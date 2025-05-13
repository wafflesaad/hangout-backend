const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');
require("dotenv").config();

const serviceAccount = require(`../${process.env.SERVICE_ACCOUNT}`)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com` // Replace with your Firebase database URL
});

const db = getFirestore();
const messaging = getMessaging();

module.exports = {db,messaging}