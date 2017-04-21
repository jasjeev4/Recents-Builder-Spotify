var async = require('async');
var moment = require('moment');

//spotifyApi comes in prepared
module.exports = function(userId, spotifyApi) {
	//Get playlists
	spotifyApi.getUserPlaylists(userId)
		.then(function(data) {
			if(data.error) {
				console.log(data.error);
			}
			else {
				processPlaylists(data.body.items, userId, spotifyApi); // TO-DO also  update db
			}
		},function(err) {
			console.log('Something went wrong!', err);
	});
}

function processPlaylists(playlists, userId, spotifyApi) {
	var l = playlists.length;
	var plistArr = [];
	var c = 0;
	for(var i=0; i<l; i++) {
		var playlist = playlists[i];
		if(playlist.owner.id == userId) { //consider this playlist since the user created it
			plistArr[c++] = playlist.id;
		}
	}	
	//build async array
	if(c>0) {
		 var asyncArr = [];

		for(var j=1; j<=c; j++){
			asyncArr[j-1] = processPlaylist.bind(null, spotifyApi, userId, plistArr[j-1]); 
		}

		async.parallel(asyncArr, function(error, results) {
			if(error) {
				console.log("Error: " + error);
			}
			else { 
				sortTracks(results, spotifyApi, userId);
			}
		});
	}
	
}

var processPlaylist = function(spotifyApi, userId, plId, callback) {
	spotifyApi.getPlaylistTracks(userId, plId)
		.then(function(data) {
			var tracks = [];
			var trackList = data.body.items;
			for(var i=0; i<trackList.length; i++){
				var obj = {};
				obj.trackId = trackList[i].track.id;
				obj.addedDate = trackList[i].added_at;
				tracks[i] = obj;
			}
			callback(null, tracks);
		}, function(err) {
			console.log('Something went wrong!', err);
			callback(err);
	});
}

function sortTracks(tracks2D, spotifyApi, userId) {
	//Bring it all into a single dimensional array
	var tracks = [];
	var index = 0;
	for(var i=0; i<tracks2D.length; i++) {
		for(var j=0; j<tracks2D[i].length; j++) {
			tracks[index] = tracks2D[i][j];
			index += 1;
		}
	}

	//Now sort
	tracks.sort(function(a, b){
		return moment(a.addedDate).isBefore(moment(b.addedDate))?1:-1;
	});

	//Create 'Recently Added' playlist. Should check with db to see if it already exists
	spotifyApi.createPlaylist(userId, 'Recently Added', { 'public' : true })
	  .then(function(data) {

	    var recentsId = data.body.id;

	    //build top 25 spotify array
	    var trackArr = [];
	    for(var i=0; i<25 && i<tracks.length; i++){
	    	var trackId = tracks[i].trackId;
	    	trackArr[i] = "spotify:track:" + trackId;
	    }

	    //add to Playlist
	    spotifyApi.addTracksToPlaylist(userId, recentsId, trackArr)
		  .then(function(data) {
		    console.log('Added tracks to playlist!');
		  }, function(err) {
		    console.log('Something went wrong!', err);
		  });
	  }, function(err) {
	    console.log('Something went wrong!', err);
	  });
}