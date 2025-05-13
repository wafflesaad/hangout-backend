const express = require("express");
const { getDistance } = require("geolib");
require("dotenv").config();

const {db,messaging} = require("./config/firebase");

port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

db.listCollections()
  .then((collections) => {
    console.log("Connected to Firestore. Collections:");
    collections.forEach((collection) => console.log(collection.id));
  })
  .catch((error) => {
    console.error("Error connecting to Firestore:", error);
  });

app.post("/get-nearby-user", (req, res) => {
  try{
    event_loc = req.body.event_loc;
  }
  catch(e){
    console.log(e);
    
  }
  if (!event_loc || !event_loc.latitude || !event_loc.longitude) {
    return res.status(400).send("Invalid event location");
  }

  db.collection("users") // Replace 'users' with your collection name
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      const notifications = [];

      snapshot.forEach((doc) => {
        username = doc.id;
        location = doc.data().location;

        if (location && location.latitude && location.longitude) {
          const distance = getDistance(
            { latitude: event_loc.latitude, longitude: event_loc.longitude },
            { latitude: location.latitude, longitude: location.longitude }
          );

          if (distance <= 5000) {
            console.log(`User ${username} gets a notification`);

            // const message = {
            //                 token: fcmToken,
            //                 notification: {
            //                     title: 'Event Notification',
            //                     body: `An event is happening near you!`,
            //                 },
            //             };

            //notifications.push(messaging.send(message));

          }
        } else {
          console.log(`User ${username} has no valid location`);
        }


        // return Promise.all(notifications)
        //         .then(() => {
        //             console.log('All notifications sent successfully');
        //             res.send('Notifications sent to nearby users');
        //         })
        //         .catch(error => {
        //             console.error('Error sending notifications:', error);
        //             res.status(500).send('Error sending notifications');
        //         });


      });
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });

  return res.sendStatus(200);
});

app.listen(port);
