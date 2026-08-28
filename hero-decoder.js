/**
 * hero-decoder.js
 * ---------------------------------------------------------------
 * Efek "decoder": teks tampil sebagai karakter acak, lalu terurai
 * (decode) jadi teks asli, diam sebentar, lalu ter-enkripsi lagi,
 * dan berulang. Timing fase meniru animasi keyframe 4 detik aslinya:
 *   0%   - 40%  : scramble -> decode (karakter terpecahkan dari kiri ke kanan)
 *   40%  - 82%  : diam, teks penuh, warna "terpecahkan" (--ink)
 *   82%  - 100% : decode -> scramble lagi (warna kembali --ink-3)
 *
 * Berbeda dari contoh asli (yang hardcode 7 frame untuk kata "DECODER"),
 * di sini karakter diacak secara terprogram supaya bisa dipakai untuk
 * teks apa pun panjangnya, termasuk kalimat hero yang panjang.
 */
(function () {
  var el = document.getElementById('heroDecoder');
  if (!el) return;

  var finalText = el.textContent;

  // Hormati preferensi pengguna yang tidak ingin animasi berlebih.
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = finalText;
    el.style.color = 'var(--ink)';
    return;
  }

  var GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#▓▒░☰€£&%@0123456789';
  var CYCLE_MS = 4000;
  var REVEAL_END = 0.40; // akhir fase scramble -> decode
  var HOLD_END = 0.82;   // akhir fase diam (teks penuh)
  var FRAME_INTERVAL = 70; // ms — jeda antar update karakter acak, biar terasa "digital"

  var start = performance.now();
  var lastFrame = 0;

  function randChar(original) {
    if (original === ' ') return ' ';
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  function buildOutput(solvedCount) {
    var out = '';
    for (var i = 0; i < finalText.length; i++) {
      out += i < solvedCount ? finalText[i] : randChar(finalText[i]);
    }
    return out;
  }

  function tick(now) {
    var elapsed = (now - start) % CYCLE_MS;
    var t = elapsed / CYCLE_MS;

    var shouldUpdate = now - lastFrame >= FRAME_INTERVAL;

    if (t < REVEAL_END) {
      if (shouldUpdate) {
        var progressIn = t / REVEAL_END;
        var solvedIn = Math.floor(progressIn * finalText.length);
        el.textContent = buildOutput(solvedIn);
        el.style.color = 'var(--ink-3)';
        lastFrame = now;
      }
    } else if (t < HOLD_END) {
      el.textContent = finalText;
      el.style.color = 'var(--ink)';
    } else {
      if (shouldUpdate) {
        var progressOut = (t - HOLD_END) / (1 - HOLD_END);
        var solvedOut = Math.floor((1 - progressOut) * finalText.length);
        el.textContent = buildOutput(solvedOut);
        el.style.color = 'var(--ink-3)';
        lastFrame = now;
      }
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();