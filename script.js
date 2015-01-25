(function() {
  "use strict";

  function init() {

    document
      .querySelector( '.board' )
      .addEventListener( 'click', handleClick );
  }

  function handleClick( event ) {

    var $target = ( event.target.tagName === 'DIV' ) ? event.target : event.target.parentNode;
    $target.classList.toggle( 'active' );
  }

  document.addEventListener( 'DOMContentLoaded', init );

})();
