
window.fbAsyncInit = function() {

	if(location.search) {
		var a = location.search.match(/[\?&]appId=(\d+)/);
		a && a[1] && window.appId = a[1];
	}

	FB.init({
		appId      : window.appId || 211807025608686, // App ID
		channelUrl : '//'+location.host+'/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});

	FB.getLoginStatus(function(a) {
		if (a.status == 'connected') {
			// 
		} else {
			// 
		}
	});

}
