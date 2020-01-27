var number_k_done = false;
var number_r_done = false;

( function( $ ) {
  // Init Skrollr
  let s = skrollr.init({
    render: function(data) {
      let number_k = $('#killed');
      let number_r = $('#raped');
      if (number_k.hasClass('skrollable-after')) {
        if (!number_k_done) {
          number_k_done = true;
          // do stuff
          animateValue("killed", "0", "1,074,017", 3000);
        }
      }
      if (number_r.hasClass('skrollable-after')) {
        if (!number_r_done) {
          number_r_done = true;
          // do stuff
          animateValue("raped", "0", "250,000", 3000);
        }
      }
      console.log(data.curTop);
    }
  });
  window.onload = function() {
    s.refresh();
  };
} )( jQuery );

function animateValue(id, start, end, duration) {
  // check for commas
  let isComma = /[0-9]+,[0-9]+,[0-9]+/.test(end);
  const endOriginal = end;
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
    if (String(value) === end) {
      obj.innerHTML = endOriginal;
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal)
  })
});

overlay.addEventListener('click', function () {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal)
  })
});

closeModalButtons.forEach(function(button) {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal)
  })
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active')
}
