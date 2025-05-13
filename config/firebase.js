const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');

const serviceAccount = require("../ssss-95b5f-firebase-adminsdk-fbsvc-4229d39e3b.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ssss-95b5f.firebaseio.com' // Replace with your Firebase database URL
});

const db = getFirestore();
const messaging = getMessaging();

module.exports = {db,messaging}