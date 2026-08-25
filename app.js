/* =========================================================================
   TRPL 1A HUB — app.js
   Portal kelas Politeknik Negeri Cilacap (TRPL 1A)
   Semua data tersimpan di localStorage. Struktur DB dibuat modular supaya
   gampang diganti ke Firebase/backend lain nanti — lihat komentar
   "GANTI DENGAN FIREBASE DI SINI" di bagian objek DB.
   ========================================================================= */

/* ------------------------------------------------------------------------
   1. KONFIGURASI & DATA AWAL (SEED DATA)
   Semua data dummy/statis dikumpulkan di sini biar gampang diedit tanpa
   perlu utak-atik logic di bawahnya.
   ------------------------------------------------------------------------ */
const CONFIG = {

  // Ganti dua tanggal ini sesuai kalender akademik PNC yang sebenarnya.
  tanggalUTS: "2026-10-12T07:00:00",
  tanggalUAS: "2026-12-14T07:00:00",

  // 20 nama mahasiswa dummy TRPL 1A (silakan ganti dengan data asli kelas)
  mahasiswa: [
    "Andi Saputra", "Budi Santoso", "Citra Ayu Lestari", "Dewi Anggraini",
    "Eka Prasetyo", "Fajar Ramadhan", "Gita Permatasari", "Hendra Kurniawan",
    "Indah Puspitasari", "Joko Widodo Nugraha", "Kiki Amelia", "Lutfi Hakim",
    "Maya Sari", "Nanda Pratama", "Oktavia Rahmawati", "Putra Wijaya",
    "Qonita Zahra", "Rizky Ramadhani", "Siti Nur Aisyah", "Taufik Hidayat"
  ],

  // Jadwal per hari. "jam" pakai format 24 jam "HH:MM" agar mudah dibandingkan.
  jadwal: {
    Senin: [
      { jam: "07:30-09:10", matkul: "Algoritma & Pemrograman Dasar", dosen: "Bpk. Ahmad Fauzi, S.Kom., M.T.", ruang: "Lab RPL 1" },
      { jam: "09:20-11:00", matkul: "Matematika Diskrit", dosen: "Ibu Ratna Dewi, S.Si., M.Kom.", ruang: "R. Teori 2.1" },
      { jam: "13:00-14:40", matkul: "Bahasa Inggris Teknik", dosen: "Ibu Sri Wahyuni, S.Pd., M.Pd.", ruang: "R. Teori 2.3" },
    ],
    Selasa: [
      { jam: "07:30-09:10", matkul: "Struktur Data", dosen: "Bpk. Dedi Kurniawan, S.Kom., M.T.", ruang: "Lab RPL 2" },
      { jam: "09:20-11:00", matkul: "Basis Data", dosen: "Bpk. Ahmad Fauzi, S.Kom., M.T.", ruang: "Lab RPL 1" },
      { jam: "13:00-15:20", matkul: "Praktikum Basis Data", dosen: "Aslab: Nabila Putri Ardana", ruang: "Lab RPL 1" },
    ],
    Rabu: [
      { jam: "07:30-09:10", matkul: "Sistem Digital", dosen: "Bpk. Yusuf Iskandar, S.T., M.Eng.", ruang: "Lab Elektro" },
      { jam: "09:20-11:00", matkul: "Pendidikan Pancasila", dosen: "Bpk. Slamet Riyadi, S.Pd., M.Pd.", ruang: "R. Teori 2.1" },
      { jam: "13:00-14:40", matkul: "Kewirausahaan", dosen: "Ibu Ratna Dewi, S.Si., M.Kom.", ruang: "R. Teori 2.2" },
    ],
    Kamis: [
      { jam: "07:30-09:50", matkul: "Praktikum Algoritma & Pemrograman", dosen: "Aslab: Muhammad Rafi Alfarizi", ruang: "Lab RPL 2" },
      { jam: "10:00-11:40", matkul: "Jaringan Komputer", dosen: "Bpk. Dedi Kurniawan, S.Kom., M.T.", ruang: "Lab Jaringan" },
      { jam: "13:00-14:40", matkul: "Agama", dosen: "Bpk. Slamet Riyadi, S.Pd., M.Pd.", ruang: "R. Teori 2.1" },
    ],
    Jumat: [
      { jam: "07:30-09:10", matkul: "Pemrograman Berorientasi Objek", dosen: "Bpk. Yusuf Iskandar, S.T., M.Eng.", ruang: "Lab RPL 1" },
      { jam: "09:20-10:20", matkul: "Bahasa Indonesia", dosen: "Ibu Sri Wahyuni, S.Pd., M.Pd.", ruang: "R. Teori 2.3" },
    ],
  },

  materi: [
    { matkul: "Algoritma & Pemrograman Dasar", judul: "Modul 1 - Pengantar Algoritma & Flowchart", link: "#", tipe: "PDF" },
    { matkul: "Algoritma & Pemrograman Dasar", judul: "Slide - Struktur Kontrol (If & Loop)", link: "#", tipe: "PPT" },
    { matkul: "Struktur Data", judul: "Modul - Array, Stack, dan Queue", link: "#", tipe: "PDF" },
    { matkul: "Basis Data", judul: "Modul - ERD & Normalisasi", link: "#", tipe: "PDF" },
    { matkul: "Basis Data", judul: "Latihan Query SQL Dasar", link: "#", tipe: "DOC" },
    { matkul: "Matematika Diskrit", judul: "Ringkasan Logika Proposisi", link: "#", tipe: "PDF" },
    { matkul: "Sistem Digital", judul: "Slide - Gerbang Logika Dasar", link: "#", tipe: "PPT" },
    { matkul: "Jaringan Komputer", judul: "Modul - Model OSI & TCP/IP", link: "#", tipe: "PDF" },
  ],

  dosenAslab: [
    { nama: "Ahmad Fauzi, S.Kom., M.T.", peran: "Dosen · Algoritma & Basis Data", inisial: "AF" },
    { nama: "Ratna Dewi, S.Si., M.Kom.", peran: "Dosen · Matematika Diskrit & KWU", inisial: "RD" },
    { nama: "Dedi Kurniawan, S.Kom., M.T.", peran: "Dosen · Struktur Data & Jaringan", inisial: "DK" },
    { nama: "Yusuf Iskandar, S.T., M.Eng.", peran: "Dosen · Sistem Digital & OOP", inisial: "YI" },
    { nama: "Sri Wahyuni, S.Pd., M.Pd.", peran: "Dosen · B. Inggris & B. Indonesia", inisial: "SW" },
    { nama: "Nabila Putri Ardana", peran: "Asisten Lab · Basis Data", inisial: "NP" },
    { nama: "Muhammad Rafi Alfarizi", peran: "Asisten Lab · Algoritma & Pemrograman", inisial: "MR" },
  ],

  // Beberapa tugas contoh untuk pengisian awal (hanya dipakai sekali saat
  // localStorage masih kosong)
  tugasAwal: [
    { id: "t1", judul: "Laporan Praktikum Basis Data Bab 1", matkul: "Basis Data", deadline: addDays(3), status: "Belum Dikerjakan" },
    { id: "t2", judul: "Tugas Flowchart Program Kalkulator", matkul: "Algoritma & Pemrograman Dasar", deadline: addDays(1), status: "Sedang Dikerjakan" },
    { id: "t3", judul: "Rangkuman Bab Logika Proposisi", matkul: "Matematika Diskrit", deadline: addDays(-2), status: "Belum Dikerjakan" },
    { id: "t4", judul: "Presentasi Kelompok OOP", matkul: "Pemrograman Berorientasi Objek", deadline: addDays(6), status: "Selesai" },
  ],
};

// Util kecil buat bikin tanggal seed relatif terhadap hari ini
function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(23, 59, 0, 0);
  return d.toISOString();
}


/* ------------------------------------------------------------------------
   2. LAPISAN "DATABASE" (localStorage)
   Semua akses baca/tulis data lewat objek DB ini. Kalau nanti mau pindah
   ke Firebase Firestore, cukup ubah isi method get()/set() di bawah —
   pemanggilan DB.getTugas(), DB.setTugas(...) dsb di kode lain TIDAK perlu
   diubah sama sekali.
   ------------------------------------------------------------------------ */
const DB = {
  _read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error("DB read error:", e);
      return fallback;
    }
  },
  _write(key, value) {
    // GANTI DENGAN FIREBASE DI SINI
    // Contoh nanti: return setDoc(doc(db, "trpl1a", key), { value });
    localStorage.setItem(key, JSON.stringify(value));
  },

  getTugas() { return this._read("trpl1a_tugas", CONFIG.tugasAwal); },
  setTugas(list) { this._write("trpl1a_tugas", list); },

  getPoin() {
    // GANTI DENGAN FIREBASE DI SINI
    // Contoh nanti: return getDocs(collection(db, "trpl1a_leaderboard"))
    return this._read("trpl1a_poin", seedPoin());
  },
  setPoin(obj) { this._write("trpl1a_poin", obj); },

  getAnon() { return this._read("trpl1a_anon", []); },
  setAnon(list) { this._write("trpl1a_anon", list); },

  getTheme() { return this._read("trpl1a_theme", "dark"); },
  setTheme(v) { this._write("trpl1a_theme", v); },
};

// Poin awal acak biar leaderboard tidak kosong saat pertama dibuka
function seedPoin() {
  const obj = {};
  CONFIG.mahasiswa.forEach((nama) => {
    obj[nama] = Math.floor(Math.random() * 40) + 5;
  });
  return obj;
}


/* ------------------------------------------------------------------------
   3. STATE & HELPER UMUM
   ------------------------------------------------------------------------ */
const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const TABS = [
  { id: "jadwal", label: "Jadwal", icon: "📅" },
  { id: "tugas", label: "Tugas", icon: "📝" },
  { id: "materi", label: "Materi", icon: "📚" },
  { id: "dosen", label: "Dosen", icon: "👨‍🏫" },
  { id: "random", label: "Acak", icon: "🎡" },
  { id: "anon", label: "Anonim", icon: "🕵️" },
  { id: "leaderboard", label: "Ranking", icon: "🏆" },
];

let hariAktifFilter = "Senin"; // default filter jadwal mobile
let tugasEditId = null;

function toast(msg, type = "info") {
  const box = document.getElementById("toastBox");
  const el = document.createElement("div");
  const color = type === "success" ? "border-green-400" : type === "error" ? "border-red-400" : "border-pnc-gold";
  el.className = `surface bg-canvas-panel border ${color} rounded-xl px-4 py-3 text-sm shadow-card animate-[fadeUp_.3s_ease]`;
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .4s ease, transform .4s ease";
    el.style.opacity = "0";
    el.style.transform = "translateX(20px)";
    setTimeout(() => el.remove(), 400);
  }, 2600);
}

function formatSisaWaktu(ms) {
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  const hari = Math.floor(s / 86400);
  const jam = Math.floor((s % 86400) / 3600);
  const menit = Math.floor((s % 3600) / 60);
  const detik = s % 60;
  if (hari > 0) return `${hari}h ${jam}j ${menit}m`;
  return `${String(jam).padStart(2, "0")}:${String(menit).padStart(2, "0")}:${String(detik).padStart(2, "0")}`;
}


/* ------------------------------------------------------------------------
   4. JAM & TANGGAL REAL-TIME + COUNTDOWN UTS/UAS
   ------------------------------------------------------------------------ */
function tickClock() {
  const now = new Date();
  document.getElementById("clockTime").textContent = now.toLocaleTimeString("id-ID", { hour12: false });
  document.getElementById("clockDate").textContent = now.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const uts = formatSisaWaktu(new Date(CONFIG.tanggalUTS) - now);
  const uas = formatSisaWaktu(new Date(CONFIG.tanggalUAS) - now);
  document.getElementById("cdUTS").textContent = uts || "Sudah berlangsung";
  document.getElementById("cdUAS").textContent = uas || "Sudah berlangsung";

  renderStatusKelasSekarang(now);
  renderCountdownTugas(); // refresh countdown tiap kartu tugas tiap detik
}

// Menentukan & menampilkan mata kuliah yang SEDANG berlangsung sekarang
function renderStatusKelasSekarang(now) {
  const namaHari = now.toLocaleDateString("id-ID", { weekday: "long" });
  const hariKey = HARI_LIST.find((h) => h.toLowerCase() === namaHari.toLowerCase());
  const el = document.getElementById("statusKelasSekarang");
  if (!hariKey) {
    el.innerHTML = `<span class="text-gray-400">Akhir pekan — waktunya istirahat & review materi ✨</span>`;
    return;
  }
  const jadwalHariIni = CONFIG.jadwal[hariKey] || [];
  const menit = now.getHours() * 60 + now.getMinutes();
  const sedang = jadwalHariIni.find((item) => {
    const [mulai, selesai] = item.jam.split("-");
    return menitDariString(mulai) <= menit && menit <= menitDariString(selesai);
  });

  if (sedang) {
    el.innerHTML = `<span class="pulse-dot"></span>
      <span>Sedang berlangsung: <strong class="text-pnc-gold">${sedang.matkul}</strong> · ${sedang.ruang}</span>`;
  } else {
    const berikutnya = jadwalHariIni.find((item) => menitDariString(item.jam.split("-")[0]) > menit);
    el.innerHTML = berikutnya
      ? `<span class="text-gray-400">Tidak ada kelas saat ini. Berikutnya: <strong class="text-white">${berikutnya.matkul}</strong> (${berikutnya.jam})</span>`
      : `<span class="text-gray-400">Kelas hari ini sudah selesai. Sampai jumpa besok! 👋</span>`;
  }
}

function menitDariString(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}


/* ------------------------------------------------------------------------
   5. RENDER: JADWAL KULIAH
   ------------------------------------------------------------------------ */
function renderJadwal() {
  const now = new Date();
  const namaHariNow = now.toLocaleDateString("id-ID", { weekday: "long" });
  const menit = now.getHours() * 60 + now.getMinutes();

  const list = document.getElementById("jadwalList");
  list.innerHTML = "";

  // Di mobile, tampilkan hanya hari yang difilter. Di desktop, tampilkan semua.
  const isMobile = window.innerWidth < 768;
  const hariUntukDitampilkan = isMobile ? [hariAktifFilter] : HARI_LIST;

  hariUntukDitampilkan.forEach((hari) => {
    const items = CONFIG.jadwal[hari] || [];
    const groupWrap = document.createElement("div");
    groupWrap.className = "sm:col-span-2 md:col-span-1";
    groupWrap.innerHTML = `<p class="text-xs uppercase tracking-widest text-pnc-gold font-semibold mb-2 mt-1">${hari}</p>`;

    items.forEach((item) => {
      const isToday = hari.toLowerCase() === namaHariNow.toLowerCase();
      const [mulai, selesai] = item.jam.split("-");
      const isAktif = isToday && menitDariString(mulai) <= menit && menit <= menitDariString(selesai);

      const card = document.createElement("div");
      card.className = `card-hover surface bg-canvas-panel border border-white/10 rounded-xl p-4 mb-2 ${isAktif ? "jadwal-aktif" : ""}`;
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div>
            <p class="font-semibold text-sm sm:text-base">${item.matkul}</p>
            <p class="text-xs text-gray-400 mt-1">${item.dosen}</p>
            <p class="text-xs text-gray-500 mt-0.5">📍 ${item.ruang}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="font-mono text-xs sm:text-sm text-pnc-gold">${item.jam}</p>
            ${isAktif ? '<span class="text-[10px] text-green-400 font-semibold">● Berlangsung</span>' : ""}
          </div>
        </div>`;
      groupWrap.appendChild(card);
    });

    list.appendChild(groupWrap);
  });
}

function renderHariFilter() {
  const wrap = document.getElementById("hariFilter");
  wrap.innerHTML = "";
  wrap.classList.add("md:hidden"); // filter hari cuma perlu di mobile
  HARI_LIST.forEach((hari) => {
    const btn = document.createElement("button");
    btn.textContent = hari.slice(0, 3);
    btn.className = `px-2.5 py-1 rounded-full border ${hari === hariAktifFilter ? "bg-pnc-gold text-pnc-blue border-pnc-gold font-semibold" : "border-white/15 text-gray-300"}`;
    btn.onclick = () => { hariAktifFilter = hari; renderHariFilter(); renderJadwal(); };
    wrap.appendChild(btn);
  });
}


/* ------------------------------------------------------------------------
   6. RENDER: TUGAS & DEADLINE (+ countdown per kartu)
   ------------------------------------------------------------------------ */
function hitungStatusOtomatis(t) {
  // Kalau lewat deadline dan belum "Selesai", ubah status jadi "Terlambat"
  if (t.status !== "Selesai" && new Date(t.deadline) < new Date()) {
    return "Terlambat";
  }
  return t.status;
}

function badgeClassStatus(status) {
  switch (status) {
    case "Selesai": return "bg-green-500/15 text-green-400 border-green-500/30";
    case "Sedang Dikerjakan": return "bg-blue-500/15 text-blue-300 border-blue-400/30";
    case "Terlambat": return "bg-red-500/15 text-red-400 border-red-500/30";
    default: return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30"; // Belum Dikerjakan
  }
}

function renderTugas() {
  let list = DB.getTugas().map((t) => ({ ...t, status: hitungStatusOtomatis(t) }));
  DB.setTugas(list); // simpan balik status otomatis (mis. jadi "Terlambat")

  const filter = document.getElementById("filterStatus").value;
  if (filter !== "semua") list = list.filter((t) => t.status === filter);

  // Urutkan berdasarkan deadline terdekat
  list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const wrap = document.getElementById("tugasList");
  wrap.innerHTML = "";

  if (list.length === 0) {
    wrap.innerHTML = `<p class="text-gray-400 text-sm">Belum ada tugas dengan status ini. 🎉</p>`;
    return;
  }

  list.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card-hover surface bg-canvas-panel border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between";
    card.innerHTML = `
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <p class="font-semibold text-sm sm:text-base">${t.judul}</p>
          <span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeClassStatus(t.status)}">${t.status}</span>
        </div>
        <p class="text-xs text-gray-400 mt-1">${t.matkul} · Deadline: ${new Date(t.deadline).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
        <p class="font-mono text-xs mt-1 countdown-tugas" data-deadline="${t.deadline}" data-status="${t.status}"></p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <select data-id="${t.id}" class="ubah-status text-xs surface-2 bg-black/20 border border-white/10 rounded-lg px-2 py-1.5">
          <option ${t.status === "Belum Dikerjakan" ? "selected" : ""}>Belum Dikerjakan</option>
          <option ${t.status === "Sedang Dikerjakan" ? "selected" : ""}>Sedang Dikerjakan</option>
          <option ${t.status === "Selesai" ? "selected" : ""}>Selesai</option>
          <option ${t.status === "Terlambat" ? "selected" : ""}>Terlambat</option>
        </select>
        <button data-id="${t.id}" class="hapus-tugas text-red-400 hover:text-red-300 text-xs px-2">Hapus</button>
      </div>`;
    wrap.appendChild(card);
  });

  // Pasang event listener setelah elemen dirender (event delegation sederhana)
  wrap.querySelectorAll(".ubah-status").forEach((sel) => {
    sel.addEventListener("change", (e) => ubahStatusTugas(e.target.dataset.id, e.target.value));
  });
  wrap.querySelectorAll(".hapus-tugas").forEach((btn) => {
    btn.addEventListener("click", (e) => hapusTugas(e.target.dataset.id));
  });

  renderCountdownTugas();
}

// Update teks countdown tiap kartu tugas tanpa render ulang seluruh list
// (dipanggil tiap detik oleh tickClock supaya ringan & tidak "flicker")
function renderCountdownTugas() {
  document.querySelectorAll(".countdown-tugas").forEach((el) => {
    const deadline = new Date(el.dataset.deadline);
    const sisa = deadline - new Date();
    if (el.dataset.status === "Selesai") {
      el.textContent = "✅ Sudah dikumpulkan";
      el.className = "font-mono text-xs mt-1 countdown-tugas text-green-400";
    } else if (sisa <= 0) {
      el.textContent = "⏰ Waktu habis!";
      el.className = "font-mono text-xs mt-1 countdown-tugas text-red-400";
    } else {
      el.textContent = `⏳ Sisa waktu: ${formatSisaWaktu(sisa)}`;
      el.className = "font-mono text-xs mt-1 countdown-tugas text-pnc-gold";
    }
  });
}

function ubahStatusTugas(id, statusBaru) {
  const list = DB.getTugas();
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return;

  const statusLama = list[idx].status;
  list[idx].status = statusBaru;
  DB.setTugas(list);

  // Kasih poin gamifikasi kalau baru saja ditandai "Selesai"
  if (statusBaru === "Selesai" && statusLama !== "Selesai") {
    tambahPoin(pilihMahasiswaAcakUntukDemo(), 10);
    toast("Mantap! +10 poin keaktifan 🎉", "success");
  }
  renderTugas();
  renderLeaderboard();
}

function hapusTugas(id) {
  const list = DB.getTugas().filter((t) => t.id !== id);
  DB.setTugas(list);
  renderTugas();
  toast("Tugas dihapus", "info");
}

// NOTE: Karena versi ini belum ada sistem login, poin "siapa yang dapat"
// disimulasikan dengan memilih nama secara acak. Setelah backend/auth siap,
// ganti fungsi ini agar mengambil nama mahasiswa yang sedang login.
function pilihMahasiswaAcakUntukDemo() {
  return CONFIG.mahasiswa[Math.floor(Math.random() * CONFIG.mahasiswa.length)];
}


/* ------------------------------------------------------------------------
   7. RENDER: MATERI
   ------------------------------------------------------------------------ */
function renderMateri() {
  const wrap = document.getElementById("materiList");
  wrap.innerHTML = "";
  CONFIG.materi.forEach((m) => {
    const card = document.createElement("a");
    card.href = m.link;
    card.className = "card-hover surface bg-canvas-panel border border-white/10 rounded-xl p-4 flex items-center gap-3";
    card.innerHTML = `
      <div class="w-11 h-11 rounded-lg bg-pnc-gold/15 text-pnc-gold flex items-center justify-center font-mono text-[11px] font-bold shrink-0">${m.tipe}</div>
      <div class="min-w-0">
        <p class="font-medium text-sm truncate">${m.judul}</p>
        <p class="text-xs text-gray-400 truncate">${m.matkul}</p>
      </div>`;
    wrap.appendChild(card);
  });
}


/* ------------------------------------------------------------------------
   8. RENDER: DOSEN & ASLAB
   ------------------------------------------------------------------------ */
function renderDosen() {
  const wrap = document.getElementById("dosenList");
  wrap.innerHTML = "";
  CONFIG.dosenAslab.forEach((d) => {
    const card = document.createElement("div");
    card.className = "card-hover surface bg-canvas-panel border border-white/10 rounded-xl p-4 flex items-center gap-3";
    card.innerHTML = `
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-pnc-gold to-pnc-blue flex items-center justify-center font-display font-bold text-sm shrink-0">${d.inisial}</div>
      <div class="min-w-0">
        <p class="font-medium text-sm">${d.nama}</p>
        <p class="text-xs text-gray-400">${d.peran}</p>
      </div>`;
    wrap.appendChild(card);
  });
}


/* ------------------------------------------------------------------------
   9. RODA KEBERUNTUNGAN (Randomizer nama mahasiswa) — signature feature
   Dibuat pakai SVG <path> sebagai segmen roda, diputar dengan CSS
   transform + transition. Sudut kemenangan dihitung mundur dari sudut akhir
   putaran supaya penunjuk (segitiga di atas) selalu jatuh tepat di nama
   yang terpilih.
   ------------------------------------------------------------------------ */
let wheelRotation = 0;
let isSpinning = false;

const WHEEL_COLORS = ["#0A2463", "#F9C80E", "#142850", "#FDE68A", "#061638", "#F9C80E"];

function buildWheelSVG() {
  const svg = document.getElementById("wheel");
  const n = CONFIG.mahasiswa.length;
  const anglePer = 360 / n;
  const r = 95, cx = 100, cy = 100;
  let html = "";

  CONFIG.mahasiswa.forEach((nama, i) => {
    const startAngle = i * anglePer;
    const endAngle = startAngle + anglePer;
    const path = describeArc(cx, cy, r, startAngle, endAngle);
    const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
    html += `<path d="${path}" fill="${color}" stroke="#080B1A" stroke-width="0.5"></path>`;

    // Label nama, diposisikan & dirotasi mengikuti arah segmen
    const midAngle = startAngle + anglePer / 2;
    const labelPos = polarToCartesian(cx, cy, r * 0.62, midAngle);
    html += `<text x="${labelPos.x}" y="${labelPos.y}" font-size="4.6" fill="#fff" font-family="Inter, sans-serif"
                text-anchor="middle" dominant-baseline="middle"
                transform="rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})">${nama.split(" ")[0]}</text>`;
  });

  svg.innerHTML = html;
}

// Helper trigonometri untuk menggambar potongan lingkaran (arc) SVG
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  const n = CONFIG.mahasiswa.length;
  const anglePer = 360 / n;
  const idxTerpilih = Math.floor(Math.random() * n);

  // Supaya hasil terasa adil & tidak bisa ditebak, roda diputar penuh
  // 6-9 kali dulu, baru berhenti pas di tengah segmen nama terpilih.
  const putaranPenuh = 6 + Math.floor(Math.random() * 4);
  const sudutTarget = 360 - (idxTerpilih * anglePer + anglePer / 2);
  wheelRotation += putaranPenuh * 360 + (sudutTarget - (wheelRotation % 360));

  const svg = document.getElementById("wheel");
  svg.style.transform = `rotate(${wheelRotation}deg)`;

  document.getElementById("spinResult").innerHTML = `<p class="text-gray-400 text-sm animate-pulse">Roda sedang berputar...</p>`;
  document.getElementById("btnSpin").disabled = true;
  document.getElementById("btnSpin").classList.add("opacity-60", "cursor-not-allowed");

  // Durasi harus sama dengan transition di CSS (#wheel { transition: ... 5s })
  setTimeout(() => {
    const nama = CONFIG.mahasiswa[idxTerpilih];
    document.getElementById("spinResult").innerHTML = `
      <p class="text-xs text-gray-400">Terpilih:</p>
      <p class="font-display text-2xl font-extrabold text-pnc-gold">${nama}</p>`;
    tambahPoin(nama, 3);
    renderLeaderboard();
    letupkanConfetti();
    isSpinning = false;
    document.getElementById("btnSpin").disabled = false;
    document.getElementById("btnSpin").classList.remove("opacity-60", "cursor-not-allowed");
  }, 5000);
}

// Efek confetti ringan pakai div-div kecil, tanpa library eksternal
function letupkanConfetti() {
  const warna = ["#F9C80E", "#0A2463", "#FDE68A", "#FFFFFF"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = warna[Math.floor(Math.random() * warna.length)];
    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3600);
  }
}


/* ------------------------------------------------------------------------
   10. KOTAK SARAN & PERTANYAAN ANONIM
   ------------------------------------------------------------------------ */
function renderAnon() {
  const list = DB.getAnon().slice().reverse(); // terbaru di atas
  const wrap = document.getElementById("anonBoard");
  wrap.innerHTML = "";

  if (list.length === 0) {
    wrap.innerHTML = `<p class="text-gray-400 text-sm col-span-2">Belum ada pesan. Jadilah yang pertama kirim! 🙌</p>`;
    return;
  }

  list.forEach((m) => {
    const card = document.createElement("div");
    card.className = "surface bg-canvas-panel border border-white/10 rounded-xl p-4";
    card.innerHTML = `
      <p class="text-sm">${escapeHTML(m.pesan)}</p>
      <p class="text-[11px] text-gray-500 mt-2">🕶️ Anonim · ${new Date(m.waktu).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>`;
    wrap.appendChild(card);
  });
}

// Mencegah HTML injection sederhana dari input pengguna
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}


/* ------------------------------------------------------------------------
   11. LEADERBOARD KEAKTIFAN
   ------------------------------------------------------------------------ */
function tambahPoin(nama, jumlah) {
  const poin = DB.getPoin();
  poin[nama] = (poin[nama] || 0) + jumlah;
  DB.setPoin(poin);
}

function renderLeaderboard() {
  const poin = DB.getPoin();
  const sorted = Object.entries(poin).sort((a, b) => b[1] - a[1]);

  // Top 3 ringkas (di hero section)
  const top3Wrap = document.getElementById("leaderboardTop3");
  top3Wrap.innerHTML = "";
  const medali = ["🥇", "🥈", "🥉"];
  sorted.slice(0, 3).forEach(([nama, p], i) => {
    top3Wrap.innerHTML += `
      <div class="flex items-center justify-between text-sm surface-2 bg-black/20 rounded-lg px-3 py-2">
        <span class="flex items-center gap-2 truncate"><span>${medali[i]}</span><span class="truncate">${nama}</span></span>
        <span class="font-mono text-pnc-gold shrink-0">${p} pts</span>
      </div>`;
  });

  // Leaderboard lengkap
  const fullWrap = document.getElementById("leaderboardFull");
  fullWrap.innerHTML = "";
  sorted.forEach(([nama, p], i) => {
    fullWrap.innerHTML += `
      <div class="card-hover surface bg-canvas-panel border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="font-mono text-sm w-6 text-gray-400">#${i + 1}</span>
          <span class="text-sm">${nama}</span>
        </div>
        <span class="font-mono text-pnc-gold text-sm">${p} pts</span>
      </div>`;
  });
}


/* ------------------------------------------------------------------------
   12. NAVIGASI TAB (navbar desktop, chip mobile, bottom nav)
   Dibangun sekali dari array TABS supaya ketiga jenis navigasi selalu
   sinkron tanpa perlu menulis HTML manual tiga kali.
   ------------------------------------------------------------------------ */
function bindNavButton(btn, tabId) {
  btn.dataset.tab = tabId;
  btn.addEventListener("click", () => gotoTab(tabId));
}

function buildNavigasi() {
  const desktopNav = document.getElementById("desktopNav");
  const chips = document.getElementById("mobileTabChips");
  const bottomNav = document.getElementById("bottomNavInner");

  desktopNav.innerHTML = "";
  chips.innerHTML = "";
  bottomNav.innerHTML = "";

  TABS.forEach((t) => {
    // Navbar desktop
    const dBtn = document.createElement("button");
    dBtn.className = "nav-btn relative px-3 py-2 text-gray-300 hover:text-white transition-colors";
    dBtn.innerHTML = `${t.icon} ${t.label}<span class="nav-underline absolute left-0 -bottom-0.5 block"></span>`;
    bindNavButton(dBtn, t.id);
    desktopNav.appendChild(dBtn);

    // Chip mobile (di bawah hero)
    const cBtn = document.createElement("button");
    cBtn.className = "nav-btn shrink-0 px-3 py-1.5 rounded-full border border-white/15 text-gray-300 whitespace-nowrap";
    cBtn.textContent = `${t.icon} ${t.label}`;
    bindNavButton(cBtn, t.id);
    chips.appendChild(cBtn);

    // Bottom nav mobile (hanya 5 item utama biar tidak sesak)
    if (["jadwal", "tugas", "random", "anon", "leaderboard"].includes(t.id)) {
      const bBtn = document.createElement("button");
      bBtn.className = "nav-btn flex flex-col items-center justify-center gap-0.5 py-2.5 text-gray-400";
      bBtn.innerHTML = `<span class="text-base">${t.icon}</span><span>${t.label}</span>`;
      bindNavButton(bBtn, t.id);
      bottomNav.appendChild(bBtn);
    }
  });
}

function gotoTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
  document.getElementById(`tab-${tabId}`).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tabId);
  });

  document.getElementById(`tab-${tabId}`).scrollIntoView({ behavior: "smooth", block: "start" });
}

// Tombol kecil "Lihat semua" di kartu leaderboard hero
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-tab].nav-btn-inline")) gotoTab(e.target.dataset.tab);
});


/* ------------------------------------------------------------------------
   13. MODAL TAMBAH TUGAS
   ------------------------------------------------------------------------ */
function bukaModalTugas() {
  document.getElementById("modalTugas").classList.remove("hidden");
  document.getElementById("modalTugas").classList.add("flex");
}
function tutupModalTugas() {
  document.getElementById("modalTugas").classList.add("hidden");
  document.getElementById("modalTugas").classList.remove("flex");
  document.getElementById("formTugas").reset();
}


/* ------------------------------------------------------------------------
   14. DARK / LIGHT MODE
   ------------------------------------------------------------------------ */
function terapkanTema(mode) {
  document.body.classList.toggle("light", mode === "light");
  document.getElementById("themeKnob").textContent = mode === "light" ? "☀️" : "🌙";
  document.getElementById("themeKnob").style.transform = mode === "light" ? "translateX(20px)" : "translateX(0)";
  DB.setTheme(mode);
}


/* ------------------------------------------------------------------------
   15. INISIALISASI / EVENT BINDING UTAMA
   ------------------------------------------------------------------------ */
function init() {
  buildNavigasi();
  gotoTab("jadwal");

  renderHariFilter();
  renderJadwal();
  renderTugas();
  renderMateri();
  renderDosen();
  renderAnon();
  renderLeaderboard();
  buildWheelSVG();

  terapkanTema(DB.getTheme());
  tickClock();
  setInterval(tickClock, 1000);

  // Render ulang jadwal saat resize (supaya beralih mode filter mobile<->desktop)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderJadwal, 200);
  });

  // --- Event: toggle tema ---
  document.getElementById("themeToggle").addEventListener("click", () => {
    const mode = document.body.classList.contains("light") ? "dark" : "light";
    terapkanTema(mode);
  });

  // --- Event: spin wheel ---
  document.getElementById("btnSpin").addEventListener("click", spinWheel);

  // --- Event: filter status tugas ---
  document.getElementById("filterStatus").addEventListener("change", renderTugas);

  // --- Event: modal tambah tugas ---
  document.getElementById("btnTambahTugas").addEventListener("click", bukaModalTugas);
  document.getElementById("btnBatalTugas").addEventListener("click", tutupModalTugas);
  document.getElementById("formTugas").addEventListener("submit", (e) => {
    e.preventDefault();
    const baru = {
      id: "t" + Date.now(),
      judul: document.getElementById("inpJudul").value.trim(),
      matkul: document.getElementById("inpMatkul").value.trim(),
      deadline: new Date(document.getElementById("inpDeadline").value).toISOString(),
      status: "Belum Dikerjakan",
    };
    const list = DB.getTugas();
    list.push(baru);
    DB.setTugas(list);
    tutupModalTugas();
    renderTugas();
    toast("Tugas baru ditambahkan ✅", "success");
  });

  // --- Event: form kotak saran anonim ---
  document.getElementById("anonForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("anonInput");
    const pesan = input.value.trim();
    if (!pesan) return;
    const list = DB.getAnon();
    list.push({ pesan, waktu: new Date().toISOString() });
    DB.setAnon(list);
    input.value = "";
    renderAnon();
    toast("Pesan terkirim secara anonim 🕶️", "success");
  });
}

document.addEventListener("DOMContentLoaded", init);
