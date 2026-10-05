(function () {
  var layer = document.querySelector('.video-cookie-layer');
  if (!layer) return;
  var iframe = layer.parentElement.querySelector('iframe');
  var button = layer.querySelector('.consent-btn');
  var interval;

  button.addEventListener('click', function () {
    if (typeof OneTrust !== 'undefined') {
      OneTrust.UpdateConsent('Category', 'C0004:1');
    }
  });

  function checkVideoConsent() {
    if (typeof OnetrustActiveGroups === 'undefined') return;
    if (OnetrustActiveGroups.indexOf('C0004') !== -1) {
      layer.style.display = 'none';
      var dataSrc = iframe.getAttribute('data-src');
      if (dataSrc && iframe.getAttribute('src') !== dataSrc) {
        iframe.setAttribute('src', dataSrc);
      }
      clearInterval(interval);
    } else {
      layer.style.display = 'flex';
    }
  }

  interval = setInterval(checkVideoConsent, 1000);
  document.addEventListener('DOMContentLoaded', checkVideoConsent);
  window.addEventListener('OneTrustGroupsUpdated', checkVideoConsent);
  var prevWrapper = window.OptanonWrapper;
  window.OptanonWrapper = function () {
    if (typeof prevWrapper === 'function') prevWrapper();
    checkVideoConsent();
  };
  checkVideoConsent();
})();
