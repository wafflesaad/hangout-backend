## Usage

url = "/get-nearby-user"
method = POST

request body = {
  "event_loc": {
    "latitude":
    "longitude"
  } 
}

Responses:
200 OK: Notifications processed successfully.
400 Bad Request: Invalid event location.
500 Internal Server Error: Error fetching users or sending notifications.


.env file:
SERVICE_ACCOUNT (service account from firebase project)
PROJECT_ID (firebase project id)
PORT (port no.)
