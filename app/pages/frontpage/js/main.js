$(document).ready(function(){
    $('.btn-spotify').click(login);
});

function login() {
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

    window.location.replace(url);

    /*var width = 450,
        height = 730,
        left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

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
    }, false);*/
}