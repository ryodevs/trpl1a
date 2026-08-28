/**
 * app-shell.js
 * ---------------------------------------------------------------
 * Script kecil & mandiri (tidak menyentuh/menggantikan app.js) khusus
 * mengurus dua hal dari chrome UI ala mobile-app yang baru:
 *   1. Buka/tutup "more sheet" (Dosen, Roda, Kotak Saran, Leaderboard)
 *   2. Shortcut: tap search bar di Overview -> pindah ke tab Materi
 *      dan fokus ke kolom pencarian materi.
 *
 * Sengaja pakai elemen/ID baru (moreTabBtn, moreSheet, dst.) yang
 * tidak dipakai app.js, supaya tidak bentrok dengan logic lain yang
 * mungkin sudah mengurus id lama (hamburgerBtn, mobileMenu, dll).
 */
(function () {
  var moreBtn = document.getElementById('moreTabBtn');
  var sheet = document.getElementById('moreSheet');
  var overlay = document.getElementById('moreSheetOverlay');

  function openSheet() {
    if (sheet) sheet.classList.add('sheet-open');
    if (overlay) overlay.classList.add('sheet-open');
  }
  function closeSheet() {
    if (sheet) sheet.classList.remove('sheet-open');
    if (overlay) overlay.classList.remove('sheet-open');
  }

  if (moreBtn && sheet) {
    moreBtn.addEventListener('click', function () {
      if (sheet.classList.contains('sheet-open')) {
        closeSheet();
      } else {
        openSheet();
      }
    });
  }
  if (overlay) overlay.addEventListener('click', closeSheet);
  if (sheet) {
    sheet.querySelectorAll('[data-tab]').forEach(function (btn) {
      btn.addEventListener('click', closeSheet);
    });
  }

  var ovSearch = document.getElementById('overviewSearch');
  var materiChip = document.querySelector('.chip[data-tab="materi"]');
  if (ovSearch) {
    ovSearch.addEventListener('click', function () {
      if (materiChip) materiChip.click();
      setTimeout(function () {
        var target = document.getElementById('materiSearch');
        if (target) target.focus();
      }, 80);
    });
  }
})();
