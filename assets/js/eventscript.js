$('.ui.sidebar').sidebar({
    context: $('.ui.pushable.segment'),
    transition: 'overlay'
}).sidebar('attach events', '#mobile_item');

$( document ).ready(function() {


    $( "#navhome" ).click(function() {
        $( "#navhome" ).addClass( "active" );
        $( "#navpopularevents" ).removeClass( "active" );
        $( "#navfaq" ).removeClass( "active" );

        $( "#home" ).show( "fast", function() {
            console.log( "home visible" );
          });
        $( "#popularevents" ).hide( "fast", function() {
          console.log( "popularevents hidden" );
        });
        $( "#faq" ).hide( "fast", function() {
            console.log( "faq hidden" );
          });
      });
    
      $( "#navpopularevents" ).click(function() {
        $( "#navhome" ).removeClass( "active" );
        $( "#navpopularevents" ).addClass( "active" );
        $( "#navfaq" ).removeClass( "active" );

        $( "#home" ).hide( "fast", function() {
            console.log( "home hidden" );
          });
        $( "#popularevents" ).show( "fast", function() {
          console.log( "popularevents visible" );
        });
        $( "#faq" ).hide( "fast", function() {
            console.log( "faq hidden" );
          });
      });
    
      $( "#navfaq" ).click(function() {
        $( "#navhome" ).removeClass( "active" );
        $( "#navpopularevents" ).removeClass( "active" );
        $( "#navfaq" ).addClass( "active" );

        $( "#home" ).hide( "fast", function() {
            console.log( "home hidden" );
          });
        $( "#popularevents" ).hide( "fast", function() {
          console.log( "popularevents hidden" );
        });
        $( "#faq" ).show( "fast", function() {
            console.log( "faq visible" );
          });
      });    
});


 