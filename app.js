/* =========================================================================
   TRPL 1A HUB — app.js
   Portal kelas Politeknik Negeri Cilacap (TRPL 1A)
   Semua data tersimpan di localStorage. Struktur DB dibuat modular supaya
   gampang diganti ke Firebase/backend lain nanti — lihat komentar
   "GANTI DENGAN FIREBASE DI SINI" di bagian objek DB.
   ========================================================================= */

/* ------------------------------------------------------------------------
   1. KONFIGURASI & DATA AWAL (SEED DATA)
   ------------------------------------------------------------------------ */
const CONFIG = {
  tanggalUTS: "2026-10-12T07:00:00",
  tanggalUAS: "2026-12-14T07:00:00",
  tanggalLiburSemester: "2026-12-28T00:00:00",

  mahasiswa: [
    "Andi Saputra", "Budi Santoso", "Citra Ayu Lestari", "Dewi Anggraini",
    "Eka Prasetyo", "Fajar Ramadhan", "Gita Permatasari", "Hendra Kurniawan",
    "Indah Puspitasari", "Joko Widodo Nugraha", "Kiki Amelia", "Lutfi Hakim",
    "Maya Sari", "Nanda Pratama", "Oktavia Rahmawati", "Putra Wijaya",
    "Qonita Zahra", "Rizky Ramadhani", "Siti Nur Aisyah", "Taufik Hidayat"
  ],

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

  tugasAwal: [
    { id: "t1", judul: "Laporan Praktikum Basis Data Bab 1", matkul: "Basis Data", deadline: addDays(3), status: "Belum Dikerjakan" },
    { id: "t2", judul: "Tugas Flowchart Program Kalkulator", matkul: "Algoritma & Pemrograman Dasar", deadline: addDays(1), status: "Sedang Dikerjakan" },
    { id: "t3", judul: "Rangkuman Bab Logika Proposisi", matkul: "Matematika Diskrit", deadline: addDays(-2), status: "Belum Dikerjakan" },
    { id: "t4", judul: "Presentasi Kelompok OOP", matkul: "Pemrograman Berorientasi Objek", deadline: addDays(6), status: "Selesai" },
  ],
};

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(23, 59, 0, 0);
  return d.toISOString();
}


/* ------------------------------------------------------------------------
   2. LAPISAN "DATABASE" (localStorage)
   Semua akses baca/tulis lewat objek DB ini. Untuk pindah ke Firebase,
   cukup ubah isi method di bawah — pemanggilan DB.xxx() di kode lain
   tidak perlu diubah sama sekali.
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
    return this._read("trpl1a_poin", seedPoin());
  },
  setPoin(obj) { this._write("trpl1a_poin", obj); },

  getAnon() { return this._read("trpl1a_anon", []); },
  setAnon(list) { this._write("trpl1a_anon", list); },

  getTheme() { return this._read("trpl1a_theme", "light"); },
  setTheme(v) { this._write("trpl1a_theme", v); },
};

function seedPoin() {
  const obj = {};
  CONFIG.mahasiswa.forEach((nama) => { obj[nama] = Math.floor(Math.random() * 40) + 5; });
  return obj;
}


/* ------------------------------------------------------------------------
   3. STATE & HELPER UMUM
   ------------------------------------------------------------------------ */
const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const TABS = [
  { id: "overview", label: "Ringkasan", icon: "i-grid", title: "Ringkasan Kelas", subtitle: "Info lengkap aktivitas mingguan TRPL 1A" },
  { id: "jadwal", label: "Jadwal", icon: "i-calendar", title: "Jadwal Kuliah", subtitle: "Susunan mata kuliah TRPL 1A minggu ini" },
  { id: "tugas", label: "Tugas", icon: "i-check-square", title: "Tugas & Deadline", subtitle: "Pantau progres dan tenggat waktu tugas" },
  { id: "materi", label: "Materi", icon: "i-book", title: "Repository Materi", subtitle: "Kumpulan bahan ajar tiap mata kuliah" },
  { id: "dosen", label: "Dosen", icon: "i-users", title: "Dosen & Aslab", subtitle: "Kontak pengampu mata kuliah TRPL 1A" },
  { id: "random", label: "Acak", icon: "i-shuffle", title: "Roda Keberuntungan", subtitle: "Pengacak nama untuk sesi presentasi" },
  { id: "anon", label: "Anonim", icon: "i-message", title: "Kotak Saran Anonim", subtitle: "Sampaikan pertanyaan tanpa nama" },
  { id: "leaderboard", label: "Ranking", icon: "i-award", title: "Leaderboard Keaktifan", subtitle: "Peringkat poin partisipasi kelas" },
];
const BOTTOM_TAB_IDS = ["overview", "jadwal", "tugas", "random", "leaderboard"];

let hariAktifFilter = "Senin";
let jadwalIdx = 0;

function icon(name, cls = "icon") {
  return `<svg class="${cls}"><use href="#${name}"/></svg>`;
}

function toast(msg, type = "info") {
  const box = document.getElementById("toastBox");
  const el = document.createElement("div");
  const color = type === "success" ? "border-green-300" : type === "error" ? "border-red-300" : "border-line";
  el.className = `bg-white border ${color} rounded-xl px-4 py-3 text-sm text-ink shadow-card flex items-center gap-2`;
  const iconName = type === "success" ? "i-check-circle" : type === "error" ? "i-alert" : "i-circle";
  el.innerHTML = `${icon(iconName, "icon icon-sm text-pnc-blueLight shrink-0")}<span>${msg}</span>`;
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

function inisial(nama) {
  return nama.split(" ").slice(0, 2).map((s) => s[0]).join("").toUpperCase();
}

function menitDariString(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}


/* ------------------------------------------------------------------------
   4. JAM REAL-TIME + STATUS NOTIFIKASI
   ------------------------------------------------------------------------ */
function tickClock() {
  const now = new Date();
  document.getElementById("clockTime").textContent = now.toLocaleTimeString("id-ID", { hour12: false });
  document.getElementById("clockDate").textContent = now.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  renderCountdownTugas();
  renderJadwalCarousel(); // ringan, cukup dipanggil tiap detik agar badge "berlangsung" akurat
}

function cekNotifikasi() {
  const list = DB.getTugas();
  const now = new Date();
  const ada = list.some((t) => t.status !== "Selesai" && new Date(t.deadline) - now < 1000 * 60 * 60 * 24);
  document.getElementById("notifDot").classList.toggle("hidden", !ada);
}


/* ------------------------------------------------------------------------
   5. RENDER: JADWAL (halaman penuh)
   ------------------------------------------------------------------------ */
function renderJadwal() {
  const now = new Date();
  const namaHariNow = now.toLocaleDateString("id-ID", { weekday: "long" });
  const menit = now.getHours() * 60 + now.getMinutes();

  const list = document.getElementById("jadwalList");
  list.innerHTML = "";

  const isMobile = window.innerWidth < 1024;
  const hariUntukDitampilkan = isMobile ? [hariAktifFilter] : HARI_LIST;

  hariUntukDitampilkan.forEach((hari) => {
    const items = CONFIG.jadwal[hari] || [];
    const groupWrap = document.createElement("div");
    groupWrap.className = "sm:col-span-2 lg:col-span-1";
    groupWrap.innerHTML = `<p class="text-xs uppercase tracking-widest text-pnc-blueLight font-semibold mb-2 mt-1">${hari}</p>`;

    items.forEach((item) => {
      const isToday = hari.toLowerCase() === namaHariNow.toLowerCase();
      const [mulai, selesai] = item.jam.split("-");
      const isAktif = isToday && menitDariString(mulai) <= menit && menit <= menitDariString(selesai);

      const card = document.createElement("div");
      card.className = `card-hover bg-white border border-line rounded-2xl p-4 mb-2 ${isAktif ? "jadwal-aktif" : ""}`;
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="font-semibold text-sm sm:text-base text-ink">${item.matkul}</p>
            <p class="text-xs text-muted mt-1">${item.dosen}</p>
            <p class="text-xs text-muted mt-1 flex items-center gap-1">${icon("i-pin", "icon icon-sm")} ${item.ruang}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="font-mono text-xs sm:text-sm text-pnc-blueLight">${item.jam}</p>
            ${isAktif ? `<span class="inline-flex items-center gap-1 text-[10px] text-green-600 font-semibold mt-1"><span class="pulse-dot"></span>Berlangsung</span>` : ""}
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
  HARI_LIST.forEach((hari) => {
    const btn = document.createElement("button");
    btn.textContent = hari.slice(0, 3);
    btn.className = `px-2.5 py-1 rounded-full border ${hari === hariAktifFilter ? "bg-pnc-blueLight text-white border-pnc-blueLight font-semibold" : "border-line text-muted"}`;
    btn.onclick = () => { hariAktifFilter = hari; renderHariFilter(); renderJadwal(); };
    wrap.appendChild(btn);
  });
}


/* ------------------------------------------------------------------------
   6. RENDER: KARTU JADWAL CAROUSEL (di tab Overview)
   ------------------------------------------------------------------------ */
function jadwalHariIniList() {
  const now = new Date();
  const namaHari = now.toLocaleDateString("id-ID", { weekday: "long" });
  const hariKey = HARI_LIST.find((h) => h.toLowerCase() === namaHari.toLowerCase());
  return hariKey ? CONFIG.jadwal[hariKey] || [] : [];
}

function renderJadwalCarousel() {
  const items = jadwalHariIniList();
  const wrap = document.getElementById("jadwalCarousel");
  const dotsWrap = document.getElementById("jadwalDots");
  if (!wrap) return;

  if (items.length === 0) {
    wrap.innerHTML = `<div class="relative z-10">
      <p class="text-xs uppercase tracking-wide text-white/70">Hari ini</p>
      <p class="font-display text-lg font-bold mt-2">Tidak ada jadwal kuliah</p>
      <p class="text-sm text-white/80 mt-1">Waktu yang pas buat review materi minggu ini.</p>
    </div>`;
    dotsWrap.innerHTML = "";
    return;
  }

  if (jadwalIdx >= items.length) jadwalIdx = 0;

  const now = new Date();
  const menit = now.getHours() * 60 + now.getMinutes();

  const item = items[jadwalIdx];
  const [mulai, selesai] = item.jam.split("-");
  const isAktif = menitDariString(mulai) <= menit && menit <= menitDariString(selesai);

  wrap.innerHTML = `
    <div class="relative z-10">
      <div class="flex items-center justify-between">
        <p class="text-xs uppercase tracking-wide text-white/70">Jadwal ${jadwalIdx + 1} dari ${items.length}</p>
        ${isAktif ? `<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/15 px-2.5 py-1 rounded-full"><span class="pulse-dot"></span>Berlangsung</span>` : ""}
      </div>
      <p class="font-display text-xl sm:text-2xl font-bold mt-3 leading-snug">${item.matkul}</p>
      <p class="text-sm text-white/85 mt-1.5">${item.dosen}</p>
      <div class="flex items-center gap-4 mt-4 text-sm text-white/90">
        <span class="flex items-center gap-1.5">${icon("i-clock", "icon icon-sm")} ${item.jam}</span>
        <span class="flex items-center gap-1.5">${icon("i-pin", "icon icon-sm")} ${item.ruang}</span>
      </div>
    </div>`;

  dotsWrap.innerHTML = items.map((_, i) =>
    `<span class="w-1.5 h-1.5 rounded-full ${i === jadwalIdx ? "bg-pnc-blueLight w-4" : "bg-line"} transition-all"></span>`
  ).join("");
}


/* ------------------------------------------------------------------------
   7. RENDER: TUGAS & DEADLINE
   ------------------------------------------------------------------------ */
function hitungStatusOtomatis(t) {
  if (t.status !== "Selesai" && new Date(t.deadline) < new Date()) return "Terlambat";
  return t.status;
}

function badgeClassStatus(status) {
  switch (status) {
    case "Selesai": return "bg-green-50 text-green-600 border-green-200";
    case "Sedang Dikerjakan": return "bg-blue-50 text-pnc-blueLight border-blue-200";
    case "Terlambat": return "bg-red-50 text-red-500 border-red-200";
    default: return "bg-yellow-50 text-yellow-700 border-yellow-200"; // Belum Dikerjakan
  }
}

function ambilTugasDenganStatusTerkini() {
  const list = DB.getTugas().map((t) => ({ ...t, status: hitungStatusOtomatis(t) }));
  DB.setTugas(list);
  return list;
}

function renderTugas() {
  let list = ambilTugasDenganStatusTerkini();

  const filter = document.getElementById("filterStatus").value;
  if (filter !== "semua") list = list.filter((t) => t.status === filter);
  list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const wrap = document.getElementById("tugasList");
  wrap.innerHTML = "";

  if (list.length === 0) {
    wrap.innerHTML = `<p class="text-muted text-sm">Belum ada tugas dengan status ini.</p>`;
    return;
  }

  list.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card-hover bg-white border border-line rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between";
    card.innerHTML = `
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <p class="font-semibold text-sm sm:text-base text-ink">${t.judul}</p>
          <span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeClassStatus(t.status)}">${t.status}</span>
        </div>
        <p class="text-xs text-muted mt-1">${t.matkul} · Deadline: ${new Date(t.deadline).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
        <p class="font-mono text-xs mt-1 countdown-tugas" data-deadline="${t.deadline}" data-status="${t.status}"></p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <select data-id="${t.id}" class="ubah-status text-xs bg-page border border-line rounded-lg px-2 py-1.5 text-ink">
          <option ${t.status === "Belum Dikerjakan" ? "selected" : ""}>Belum Dikerjakan</option>
          <option ${t.status === "Sedang Dikerjakan" ? "selected" : ""}>Sedang Dikerjakan</option>
          <option ${t.status === "Selesai" ? "selected" : ""}>Selesai</option>
          <option ${t.status === "Terlambat" ? "selected" : ""}>Terlambat</option>
        </select>
        <button data-id="${t.id}" class="hapus-tugas w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50">${icon("i-trash", "icon icon-sm")}</button>
      </div>`;
    wrap.appendChild(card);
  });

  wrap.querySelectorAll(".ubah-status").forEach((sel) => {
    sel.addEventListener("change", (e) => ubahStatusTugas(e.target.dataset.id, e.target.value));
  });
  wrap.querySelectorAll(".hapus-tugas").forEach((btn) => {
    btn.addEventListener("click", (e) => hapusTugas(e.currentTarget.dataset.id));
  });

  renderCountdownTugas();
}

function renderCountdownTugas() {
  document.querySelectorAll(".countdown-tugas").forEach((el) => {
    const deadline = new Date(el.dataset.deadline);
    const sisa = deadline - new Date();
    if (el.dataset.status === "Selesai") {
      el.textContent = "Sudah dikumpulkan";
      el.className = "font-mono text-xs mt-1 countdown-tugas text-green-600";
    } else if (sisa <= 0) {
      el.textContent = "Waktu habis";
      el.className = "font-mono text-xs mt-1 countdown-tugas text-red-500";
    } else {
      el.textContent = `Sisa waktu ${formatSisaWaktu(sisa)}`;
      el.className = "font-mono text-xs mt-1 countdown-tugas text-pnc-blueLight";
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

  if (statusBaru === "Selesai" && statusLama !== "Selesai") {
    tambahPoin(pilihMahasiswaAcakUntukDemo(), 10);
    toast("Tugas ditandai selesai — poin keaktifan bertambah 10", "success");
  }
  renderAll();
}

function hapusTugas(id) {
  const list = DB.getTugas().filter((t) => t.id !== id);
  DB.setTugas(list);
  toast("Tugas dihapus", "info");
  renderAll();
}

// Belum ada sistem login, jadi penerima poin disimulasikan acak.
// Ganti dengan nama mahasiswa yang sedang login setelah backend/auth siap.
function pilihMahasiswaAcakUntukDemo() {
  return CONFIG.mahasiswa[Math.floor(Math.random() * CONFIG.mahasiswa.length)];
}


/* ------------------------------------------------------------------------
   8. RENDER: MATERI & DOSEN
   ------------------------------------------------------------------------ */
function renderMateri() {
  const wrap = document.getElementById("materiList");
  wrap.innerHTML = "";
  CONFIG.materi.forEach((m) => {
    const card = document.createElement("a");
    card.href = m.link;
    card.className = "card-hover bg-white border border-line rounded-2xl p-4 flex items-center gap-3";
    card.innerHTML = `
      <div class="w-11 h-11 rounded-xl bg-blue-50 text-pnc-blueLight flex items-center justify-center font-mono text-[11px] font-bold shrink-0">${m.tipe}</div>
      <div class="min-w-0">
        <p class="font-medium text-sm text-ink truncate">${m.judul}</p>
        <p class="text-xs text-muted truncate">${m.matkul}</p>
      </div>`;
    wrap.appendChild(card);
  });
}

function renderDosen() {
  const wrap = document.getElementById("dosenList");
  wrap.innerHTML = "";
  CONFIG.dosenAslab.forEach((d) => {
    const card = document.createElement("div");
    card.className = "card-hover bg-white border border-line rounded-2xl p-4 flex items-center gap-3";
    card.innerHTML = `
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-pnc-gold to-pnc-blue flex items-center justify-center font-display font-bold text-sm text-white shrink-0">${d.inisial}</div>
      <div class="min-w-0">
        <p class="font-medium text-sm text-ink">${d.nama}</p>
        <p class="text-xs text-muted">${d.peran}</p>
      </div>`;
    wrap.appendChild(card);
  });
}


/* ------------------------------------------------------------------------
   9. RODA KEBERUNTUNGAN (Randomizer nama mahasiswa)
   ------------------------------------------------------------------------ */
let wheelRotation = 0;
let isSpinning = false;
const WHEEL_COLORS = ["#0A2463", "#2F63E8", "#F9C80E", "#12203D", "#4C7CF0", "#FBDD5E"];

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
    html += `<path d="${path}" fill="${color}" stroke="#ffffff" stroke-width="0.6"></path>`;

    const midAngle = startAngle + anglePer / 2;
    const labelPos = polarToCartesian(cx, cy, r * 0.62, midAngle);
    html += `<text x="${labelPos.x}" y="${labelPos.y}" font-size="4.6" fill="#fff" font-family="Inter, sans-serif"
                text-anchor="middle" dominant-baseline="middle"
                transform="rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})">${nama.split(" ")[0]}</text>`;
  });

  svg.innerHTML = html;
}

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

  const putaranPenuh = 6 + Math.floor(Math.random() * 4);
  const sudutTarget = 360 - (idxTerpilih * anglePer + anglePer / 2);
  wheelRotation += putaranPenuh * 360 + (sudutTarget - (wheelRotation % 360));

  const svg = document.getElementById("wheel");
  svg.style.transform = `rotate(${wheelRotation}deg)`;

  document.getElementById("spinResult").innerHTML = `<p class="text-muted text-sm animate-pulse">Roda sedang berputar...</p>`;
  const btn = document.getElementById("btnSpin");
  btn.disabled = true;
  btn.classList.add("opacity-60", "cursor-not-allowed");

  setTimeout(() => {
    const nama = CONFIG.mahasiswa[idxTerpilih];
    document.getElementById("spinResult").innerHTML = `
      <p class="text-xs text-muted">Terpilih</p>
      <p class="font-display text-2xl font-extrabold text-pnc-blueLight">${nama}</p>`;
    tambahPoin(nama, 3);
    renderLeaderboard();
    letupkanConfetti();
    isSpinning = false;
    btn.disabled = false;
    btn.classList.remove("opacity-60", "cursor-not-allowed");
  }, 5000);
}

function letupkanConfetti() {
  const warna = ["#F9C80E", "#0A2463", "#2F63E8", "#FBDD5E"];
  for (let i = 0; i < 36; i++) {
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
  const list = DB.getAnon().slice().reverse();
  const wrap = document.getElementById("anonBoard");
  wrap.innerHTML = "";

  if (list.length === 0) {
    wrap.innerHTML = `<p class="text-muted text-sm col-span-2">Belum ada pesan. Jadilah yang pertama kirim.</p>`;
    return;
  }

  list.forEach((m) => {
    const card = document.createElement("div");
    card.className = "bg-white border border-line rounded-2xl p-4";
    card.innerHTML = `
      <p class="text-sm text-ink">${escapeHTML(m.pesan)}</p>
      <p class="text-[11px] text-muted mt-2 flex items-center gap-1.5">${icon("i-user", "icon icon-sm")} Anonim · ${new Date(m.waktu).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>`;
    wrap.appendChild(card);
  });
}

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

  const fullWrap = document.getElementById("leaderboardFull");
  fullWrap.innerHTML = "";
  sorted.forEach(([nama, p], i) => {
    fullWrap.innerHTML += `
      <div class="card-hover bg-white border border-line rounded-2xl px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="font-mono text-sm w-6 text-muted">#${i + 1}</span>
          <span class="text-sm text-ink">${nama}</span>
        </div>
        <span class="font-mono text-pnc-blueLight text-sm">${p} pts</span>
      </div>`;
  });
}


/* ------------------------------------------------------------------------
   12. RENDER: OVERVIEW (goals, statistik, tabel tugas, avatar stack)
   ------------------------------------------------------------------------ */
function renderGoals() {
  const now = new Date();
  const goals = [
    { label: "UTS", target: CONFIG.tanggalUTS, icon: "i-flag", bg: "bg-blue-50", fg: "text-pnc-blueLight" },
    { label: "UAS", target: CONFIG.tanggalUAS, icon: "i-cap", bg: "bg-yellow-50", fg: "text-yellow-600" },
    { label: "Libur Semester", target: CONFIG.tanggalLiburSemester, icon: "i-clock", bg: "bg-green-50", fg: "text-green-600" },
  ];

  const wrap = document.getElementById("goalsList");
  wrap.innerHTML = goals.map((g) => {
    const diffMs = new Date(g.target) - now;
    const hari = Math.max(0, Math.ceil(diffMs / 86400000));
    return `
      <div class="card-hover bg-white border border-line rounded-2xl p-3.5 flex flex-col items-start">
        <div class="w-9 h-9 rounded-full ${g.bg} ${g.fg} flex items-center justify-center mb-3">${icon(g.icon, "icon icon-sm")}</div>
        <p class="font-display font-bold text-lg text-ink leading-none">${hari}</p>
        <p class="text-[11px] text-muted mt-1">hari lagi</p>
        <p class="text-[11px] font-medium text-ink mt-2">${g.label}</p>
      </div>`;
  }).join("");
}

function renderOutcomeStats() {
  const list = ambilTugasDenganStatusTerkini();
  const total = list.length || 1;
  const statuses = [
    { label: "Selesai", color: "#22c55e" },
    { label: "Sedang Dikerjakan", color: "#2F63E8" },
    { label: "Belum Dikerjakan", color: "#F9C80E" },
    { label: "Terlambat", color: "#ef4444" },
  ];

  const wrap = document.getElementById("outcomeStats");
  wrap.innerHTML = statuses.map((s) => {
    const count = list.filter((t) => t.status === s.label).length;
    const pct = Math.round((count / total) * 100);
    return `
      <div>
        <div class="flex items-center justify-between text-xs mb-1.5">
          <span class="text-ink font-medium">${s.label}</span>
          <span class="text-muted">${pct}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${s.color}"></div></div>
      </div>`;
  }).join("");
}

function renderOverviewTugasTable() {
  const list = ambilTugasDenganStatusTerkini()
    .filter((t) => t.status !== "Selesai")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  const body = document.getElementById("overviewTugasBody");
  if (list.length === 0) {
    body.innerHTML = `<tr><td colspan="4" class="py-4 text-muted text-sm">Semua tugas sudah beres. Mantap.</td></tr>`;
    return;
  }

  body.innerHTML = list.map((t) => `
    <tr class="border-b border-line last:border-0">
      <td class="py-3 text-sm text-ink font-medium max-w-[160px] truncate">${t.judul}</td>
      <td class="py-3 text-sm text-muted max-w-[140px] truncate">${t.matkul}</td>
      <td class="py-3 text-sm text-muted whitespace-nowrap">${new Date(t.deadline).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}</td>
      <td class="py-3 text-right"><span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeClassStatus(t.status)}">${t.status}</span></td>
    </tr>`).join("");
}

function renderAvatarStack() {
  const wrap = document.getElementById("avatarStack");
  const subset = CONFIG.mahasiswa.slice(0, 5);
  const colors = ["#0A2463", "#2F63E8", "#F9C80E", "#12203D", "#4C7CF0"];
  wrap.innerHTML = subset.map((nama, i) => `
    <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-semibold" style="background:${colors[i % colors.length]}">${inisial(nama)}</div>
  `).join("") + `<div class="w-9 h-9 rounded-full bg-page border-2 border-white flex items-center justify-center text-[10px] font-semibold text-muted">+${CONFIG.mahasiswa.length - subset.length}</div>`;
}

function renderOverview() {
  renderJadwalCarousel();
  renderGoals();
  renderOutcomeStats();
  renderOverviewTugasTable();
  renderAvatarStack();
}

function renderAll() {
  renderJadwal();
  renderTugas();
  renderOverview();
  renderLeaderboard();
  cekNotifikasi();
}


/* ------------------------------------------------------------------------
   13. NAVIGASI (sidebar desktop + bottom nav mobile)
   ------------------------------------------------------------------------ */
function bindNavButton(btn, tabId) {
  btn.dataset.tab = tabId;
  btn.addEventListener("click", () => gotoTab(tabId));
}

function buildNavigasi() {
  const sidebar = document.getElementById("sidebarNav");
  const bottomNav = document.getElementById("bottomNavInner");
  sidebar.innerHTML = "";
  bottomNav.innerHTML = "";

  TABS.forEach((t) => {
    const sBtn = document.createElement("button");
    sBtn.className = "sidebar-link nav-btn flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted transition-colors";
    sBtn.innerHTML = `${icon(t.icon)}<span>${t.label}</span>`;
    bindNavButton(sBtn, t.id);
    sidebar.appendChild(sBtn);

    if (BOTTOM_TAB_IDS.includes(t.id)) {
      const bBtn = document.createElement("button");
      bBtn.className = "bottom-link nav-btn flex flex-col items-center justify-center gap-1 py-2.5 text-muted";
      bBtn.innerHTML = `${icon(t.icon, "icon icon-sm")}<span>${t.label}</span>`;
      bindNavButton(bBtn, t.id);
      bottomNav.appendChild(bBtn);
    }
  });
}

function gotoTab(tabId) {
  const tab = TABS.find((t) => t.id === tabId);
  if (!tab) return;

  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
  document.getElementById(`tab-${tabId}`).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));

  document.getElementById("pageTitle").textContent = tab.title;
  document.getElementById("pageSubtitle").textContent = tab.subtitle;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab].nav-btn-inline");
  if (t) gotoTab(t.dataset.tab);
});


/* ------------------------------------------------------------------------
   14. MODAL TAMBAH TUGAS
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
   15. DARK / LIGHT MODE
   Tema terang adalah default sesuai referensi desain baru; mode gelap
   opsional lewat tombol di sidebar.
   ------------------------------------------------------------------------ */
function terapkanTema(mode) {
  document.documentElement.classList.toggle("dark-mode", mode === "dark");
  document.body.style.background = mode === "dark" ? "#0F1424" : "#F3F5FB";
  document.body.style.color = mode === "dark" ? "#F3F5FB" : "#101B36";
  const iconUse = document.querySelector("#themeIconDesktop use");
  if (iconUse) iconUse.setAttribute("href", mode === "dark" ? "#i-sun" : "#i-moon");
  const label = document.getElementById("themeLabelDesktop");
  if (label) label.textContent = mode === "dark" ? "Mode Terang" : "Mode Gelap";
  DB.setTheme(mode);
}


/* ------------------------------------------------------------------------
   16. INISIALISASI
   ------------------------------------------------------------------------ */
function init() {
  buildNavigasi();
  gotoTab("overview");
  renderHariFilter();
  buildWheelSVG();
  renderMateri();
  renderDosen();
  renderAnon();
  renderAll();

  terapkanTema(DB.getTheme());
  tickClock();
  setInterval(tickClock, 1000);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderJadwal, 200);
  });

  document.getElementById("themeToggleDesktop").addEventListener("click", () => {
    const mode = DB.getTheme() === "light" ? "dark" : "light";
    terapkanTema(mode);
  });

  document.getElementById("jadwalPrev").addEventListener("click", () => {
    const n = jadwalHariIniList().length || 1;
    jadwalIdx = (jadwalIdx - 1 + n) % n;
    renderJadwalCarousel();
  });
  document.getElementById("jadwalNext").addEventListener("click", () => {
    const n = jadwalHariIniList().length || 1;
    jadwalIdx = (jadwalIdx + 1) % n;
    renderJadwalCarousel();
  });

  document.getElementById("btnSpin").addEventListener("click", spinWheel);
  document.getElementById("filterStatus").addEventListener("change", renderTugas);

  document.getElementById("btnTambahTugas").addEventListener("click", bukaModalTugas);
  document.getElementById("btnBatalTugas").addEventListener("click", tutupModalTugas);
  document.getElementById("btnCloseModal").addEventListener("click", tutupModalTugas);
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
    toast("Tugas baru ditambahkan", "success");
    renderAll();
  });

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
    toast("Pesan terkirim secara anonim", "success");
  });

  document.getElementById("notifBtn").addEventListener("click", () => {
    const overdue = DB.getTugas().filter((t) => hitungStatusOtomatis(t) === "Terlambat").length;
    toast(overdue > 0 ? `${overdue} tugas melewati deadline` : "Tidak ada tugas mendesak", overdue > 0 ? "error" : "info");
  });
}

document.addEventListener("DOMContentLoaded", init);
