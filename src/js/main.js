console.log('it works!');

var desktopOnly = window.matchMedia( "(min-width: 1200px)" );

$(document).ready(function() {

    // Toggle open sidebarWrapper
    $('#brandLogo p').click(function() {
      if ($(this).text() == $(this).data("text-swap")) {
        $(this).text($(this).data("text-original"));
      } else {
        $(this).data("text-original", $(this).text());
        $(this).text($(this).data("text-swap"));
      }
      $('#sidebarWrapper').toggleClass('open');
      return true;
    });

    window.checkHasClass = function() {
      if($('#sidebarWrapper').hasClass('open')) {
        console.log('Kyllä');
      } else {
        console.log('Ei');
      }
    }

    // Toggle open nav link on mobile size
    $('#mobileNav').click(function() {
      $('#sidebarContent').toggleClass('open');
    });

    /* JavaScript Media Queries */
    /*
    if (matchMedia) {
    	var mq = window.matchMedia("(min-width: 1200px)");
    	mq.addListener(WidthChange);
    	WidthChange(mq);
    }
    */
    // media query change
    /*
    function WidthChange(mq) {
      if (mq.matches) {
        console.log('window width is at least 1200px');
        $('#postLinkWrapper').jScrollPane({
          autoReinitialise: true,
          mouseWheelSpeed: 50
        });
      } else {
        console.log('window width is less than 1200px');
        window.onresize = function(){ location.reload(); }
      }
    }
    */



    $(function()
{
	var settings = {
		showArrows: true
	};
	var pane = $('#videoLinks')
	pane.jScrollPane(settings);
	var api = pane.data('jsp');
	var i = 1;

});


    // Decoline effect
    /*
    (function() {
			var lineMaker = new LineMaker({
				parent: {element: document.querySelector(".header"), position: 'prepend'},
        position: 'absolute',
        lines: [
          {top: '92%', left: 50, width: 54, height: 10, color: '#fff', hidden: true, content: 'hello', animation: { duration: 500, easing: 'easeInOutSine', delay: 400, direction: 'LeftRight' }},
          {top: '92%', left: 100, width: 108, height: 10, color: '#05477c', hidden: true, content: 'hello', animation: { duration: 500, easing: 'easeInOutSine', delay: 550, direction: 'LeftRight' }},
          {top: '92%', left: 150, width: 170, height: 10, color: '#065b9f', hidden: true, content: 'hello', animation: { duration: 500, easing: 'easeInOutSine', delay: 550, direction: 'LeftRight' }},
        ]
			});
      setTimeout(function() {
        lineMaker.animateLinesIn();
    	}, 250);
		})();
    */

    // Instafeed
    /*
    var feed = new Instafeed({
       get: 'user',
       userId: '3711207612',
       accessToken: '3711207612.2ad622d.e9c5bfe01e1445e4b9b8ac26768c2ea2',
       clientId: '2ad622df35ab43b2b25e911c31868e44',
       limit: 2,
       template: '<div class="instafeedItem"><a href="{{link}}"><img src="{{image}}" /></a> <p>{{caption}}</p></div>'
   });
   feed.run();
   */
   jQuery(function($) {
    var options = {
      $menu: $('.snapScrollMenu')
    };
    $('.fullHeightSnapScrollWrapper').panelSnap(options);
   });

   /*
   function dateFormatter(date) {
      var monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      return "Twiitattu: " + monthNames[date.getMonth()] + "." + date.getDate() + "." + date.getFullYear();
    }

   var configProfile = {
    "profile": {"screenName": 'digikokki'},
    "domId": 'tweets',
    "maxTweets": 2,
    "enableLinks": true,
    "showUser": false,
    "showTime": true,
    "dateFunction": dateFormatter,
    "showRetweet": false,
    "showInteraction": false
  };
  twitterFetcher.fetch(configProfile);
  */
});
