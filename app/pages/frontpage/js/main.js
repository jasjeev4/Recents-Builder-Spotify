var APP = "http://127.0.0.1/";

$(document).ready(function(){
    $('.btn-spotify').click(login);
});

function login() {
    var CLIENT_ID = '01908de36dbe4e2ca75d79046702f362';
    var REDIRECT_URI = 'http://127.0.0.1/callback';

    function getLoginURL(scopes) {
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
          '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
          '&scope=' + encodeURIComponent(scopes.join(' ')) +
          '&response_type=code';
    }

    var url = getLoginURL([
        'user-read-email',
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private'
    ]);

    var width = 450,
        height = 730,
        left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.addEventListener("message", function(event) {
        document.write("ready");
    }, false);

    var w = window.open(url,
        'Spotify',
        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
   );

   w.addEventListener('load', function() { 
        var json = w.document.body.innerText;
        if(json) {
            var obj = JSON.parse(json);
            Cookies.set('userId', obj.userId);
            window.location.replace(APP + obj.page);
            w.close();
        }
    }, false);
}