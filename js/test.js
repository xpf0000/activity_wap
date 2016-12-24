/**
 * Created by Administrator on 2016/12/23 0023.
 */
/**
 * Created by Administrator on 2016/12/21 0021.
 */

requirejs(['main'], function (main) {

    require(['framework7','myapp'], function() {

        // Initialize app
        var myApp = new Framework7();

        // If we need to use custom DOM library, let's save it to $$ variable:
        var $$ = Dom7;

        // Add view
        var mainView = myApp.addView('.view-main', {
            // Because we want to use dynamic navbar, we need to enable it for this view:
            dynamicNavbar: true
        });


    });

});








