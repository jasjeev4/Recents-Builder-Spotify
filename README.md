# Recents-Builder-Spotify

A simple web app to create a new playlist of the most recently added songs created by a user. 

### Setup

* Create a new [Spotify App](https://developer.spotify.com/my-applications).
* While creating your app set the Redirect URI as http://127.0.0.1:8080/callback 
* Note the Client ID and Client Secret
* In app/credentials modify spotify_credentials_sample.js by putting in your newly created app's credentials and save the file as spotify_credentials.js
* In app/pages/frontpage/js/ modify credentials_sample.js by putting in your app's client id
* Run ```npm install```

### Running 

To run ```npm start```.

You should see "Live on 8080" output on the terminal.

Go to http://127.0.0.1:8080 to use the app.
