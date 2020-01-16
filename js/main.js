let number_k_done = false;
( function( $ ) {
  // Init Skrollr
  let s = skrollr.init({
    render: function(data) {
      let number_k = $('#killed');
      if ( number_k.hasClass('skrollable-after') ) {
        if ( ! number_k_done ) {
          number_k_done = true;
          // do stuff
          animateValue("killed", "0", "1,074,017", 1500);
          animateValue("raped", "0", "500,000", 1500);
        }
      } else {
        number_k_done = false;
      }
      //Debugging - Log the current scroll position.
      //console.log(data.curTop);
    }
  });
} )( jQuery );

function animateValue(id, start, end, duration) {

  // check for commas
  let isComma = /[0-9]+,[0-9]+,[0-9]+/.test(end);
  end = end.replace(/,/g, '');

  // assumes integer values for start and end

  var obj = document.getElementById(id);
  let range = end - start;
  // no timer shorter than 50ms (not really visible any way)
  let minTimer = 50;
  // calc step time to show all interediate values
  let stepTime = Math.abs(Math.floor(duration / range));

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer);

  // get current time and calculate desired end time
  let startTime = new Date().getTime();
  let endTime = startTime + duration;
  var timer;

  function run() {
    let now = new Date().getTime();
    let remaining = Math.max((endTime - now) / duration, 0);
    let value = Math.round(end - (remaining * range));
    obj.innerHTML = String(value);
    if (value === end) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}
