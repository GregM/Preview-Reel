/*
 * Movie Trailers
 * http://m.gregorymazurek.com
 *
 * @@author   Gregory Mazurek
 * @@website  http://www.gregorymazurek.com
 *
 * Thanks, Google.
 *
 */
 
var c = 0;
var rndNum = 0;
var videoArray = new Array();
var titleArray = new Array();
var playedVideos = new Array();
 

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  //loadNewVideo(videos);
}


function playVideo() {
    if (ytplayer) {
        ytplayer.playVideo();
    }
}


function onPlayerStateChange(ytState) {
    if (ytState==0) {
			c = c + 1;
			getList();
	}
}


function userWantsNextVideo() {
    if (ytplayer) {
			c = c + 1;
			getList();
	}
}

// Your HTML pages that display the chromeless player must implement a callback function named 
// onYouTubePlayerReady. The API will call this function when the player is fully loaded and 
// the API is ready to receive calls.
function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById("ytPlayer");
    ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
    ytplayer.addEventListener("onError", "onPlayerError");       
}


function getList() {
var goodNum = 1;
	if (c>0) {
	  	if (ytplayer) {
	  		rndNum = Math.floor(Math.random()*50);
	  		ytplayer.loadVideoById(videoArray[rndNum]);
			document.getElementById('preview_title').innerHTML = titleArray[rndNum];
			playedVideos[c] = videoArray[rndNum];
		}
	}
	else
	{
		var the_url = 'http://gdata.youtube.com/feeds/api/videos/-/Trailers?q=trailer+official&orderby=published&max-results=50&alt=json&format=5';
		var x = 0;
		
		$.ajax({
	    type: "GET",
	    url: the_url,
	    dataType: "jsonp",
	    success: function(responseData, textStatus, XMLHttpRequest) {
	//        if (responseData.data.items) {
	//            loadNewVideo(responseData.data.items);
			  if (responseData.feed.entry) {
			  	 for (var x=0; x<50; x++) {
					titleArray[x] = responseData.feed.entry[x].title.$t;
					videoArray[x] = responseData.feed.entry[x].id.$t.split('videos/')[1];
				}
		         loadNewVideo(responseData.feed.entry);
			  }
	     }
	    });
	}
}


function loadNewVideo(videos) {
	rndNum = Math.floor(Math.random()*50);
	id = videoArray[rndNum];

  	// The allowScriptAccess parameter in the code is needed to allow the player SWF 
    // to call functions on the containing HTML page, since the player is hosted on a 
    // different domain from the HTML page. 
    var params = { allowScriptAccess: "always" };
    // The element id of the Flash embed
    // This id is what we'll use to get a reference to the player using getElementById().
    var atts = { id: "ytPlayer" };
    // swfobject.embedSWF will load the player from YouTube and embed it onto your page.
    swfobject.embedSWF("http://www.youtube.com/v/" + id  +
                       "&enablejsapi=1&playerapiid=ytplayer&autoplay=1&version=3&color2=black",
                       "videoDiv", "720", "415", "8", null, null, params, atts);
    document.getElementById('preview_title').innerHTML = titleArray[rndNum];
    playedVideos[c] = videoArray[c];
}

google.setOnLoadCallback(getList);