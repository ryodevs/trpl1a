/* =========================================================================
   TRPL 1A HUB — app.js
   Mengikuti sistem desain di DESIGN-apple.md: satu warna aksen (Action
   Blue), tipografi besar SF-Pro/Inter, tile penuh gantian terang/gelap,
   tombol pill, dan shadow hanya untuk elemen "produk" (roda keberuntungan).
   Semua data tersimpan di localStorage lewat objek DB — lihat komentar
   "GANTI DENGAN FIREBASE DI SINI" untuk titik migrasi backend.
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
   Untuk pindah ke Firebase, ubah isi method di bawah — pemanggilan
   DB.xxx() di tempat lain tidak perlu diubah.
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
  { id: "overview", label: "Ringkasan", tagline: "Ringkasan" },
  { id: "jadwal", label: "Jadwal", tagline: "Jadwal Kuliah" },
  { id: "tugas", label: "Tugas", tagline: "Tugas & Deadline" },
  { id: "materi", label: "Materi", tagline: "Repository Materi" },
  { id: "dosen", label: "Dosen", tagline: "Dosen & Aslab" },
  { id: "random", label: "Acak", tagline: "Roda Keberuntungan" },
  { id: "anon", label: "Anonim", tagline: "Kotak Saran Anonim" },
  { id: "leaderboard", label: "Ranking", tagline: "Leaderboard" },
];

let hariAktifFilter = "Senin";
let statusFilterAktif = "semua";
let jadwalIdx = 0;

function icon(name, cls = "icon") {
  return `<svg class="${cls}"><use href="#${name}"/></svg>`;
}

function toast(msg, type = "info") {
  const box = document.getElementById("toastBox");
  const el = document.createElement("div");
  const border = type === "success" ? "border-l-4 border-l-green-500" : type === "error" ? "border-l-4 border-l-red-500" : "border-l-4 border-l-primary";
  el.className = `bg-white ${border} rounded-md px-4 py-3 t-caption shadow-[0_8px_28px_rgba(0,0,0,0.14)] flex items-center gap-2`;
  const iconName = type === "success" ? "i-check-circle" : type === "error" ? "i-alert" : "i-circle";
  el.innerHTML = `${icon(iconName, "icon icon-sm text-primary shrink-0")}<span>${msg}</span>`;
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

function menitDariString(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}


/* ------------------------------------------------------------------------
   4. JAM REAL-TIME + NOTIFIKASI + STICKY BAR
   ------------------------------------------------------------------------ */
function tickClock() {
  const now = new Date();
  const el = document.getElementById("clockTime");
  if (el) el.textContent = now.toLocaleTimeString("id-ID", { hour12: false });
  renderCountdownTugas();
  renderJadwalCarousel();
}

function cekNotifikasi() {
  const list = DB.getTugas();
  const now = new Date();
  const ada = list.some((t) => t.status !== "Selesai" && new Date(t.deadline) - now < 1000 * 60 * 60 * 24);
  document.getElementById("notifDot").classList.toggle("hidden", !ada);
}

// Bar mengambang di bawah layar yang menampilkan deadline tugas terdekat —
// hanya tampil di tab Tugas, meniru komponen floating-sticky-bar.
function renderStickyBar() {
  const bar = document.getElementById("stickyBar");
  const isTugasTab = document.getElementById("tab-tugas").classList.contains("active");
  if (!isTugasTab) { bar.classList.add("hidden"); return; }

  const list = ambilTugasDenganStatusTerkini().filter((t) => t.status !== "Selesai");
  list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (list.length === 0) {
    bar.classList.add("hidden");
    return;
  }
  const terdekat = list[0];
  const sisa = new Date(terdekat.deadline) - new Date();
  const teks = sisa > 0
    ? `${terdekat.judul} — sisa ${formatSisaWaktu(sisa)}`
    : `${terdekat.judul} — sudah lewat deadline`;
  document.getElementById("stickyBarText").textContent = teks;
  bar.classList.remove("hidden");
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
    groupWrap.innerHTML = `<p class="t-caption-strong text-primary mb-3 mt-1">${hari}</p>`;

    items.forEach((item) => {
      const isToday = hari.toLowerCase() === namaHariNow.toLowerCase();
      const [mulai, selesai] = item.jam.split("-");
      const isAktif = isToday && menitDariString(mulai) <= menit && menit <= menitDariString(selesai);

      const card = document.createElement("div");
      card.className = `utility-card mb-3 ${isAktif ? "jadwal-aktif" : ""}`;
      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="t-body-strong">${item.matkul}</p>
            <p class="t-caption text-inkMuted48 mt-1.5">${item.dosen}</p>
            <p class="t-caption text-inkMuted48 mt-1 flex items-center gap-1">${icon("i-pin", "icon icon-sm")} ${item.ruang}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="t-caption-strong text-primary font-mono">${item.jam}</p>
            ${isAktif ? `<span class="inline-flex items-center gap-1 t-fine-print text-green-600 font-semibold mt-1.5"><span class="pulse-dot"></span>Berlangsung</span>` : ""}
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
    btn.textContent = hari;
    btn.className = `chip shrink-0 ${hari === hariAktifFilter ? "chip-selected" : ""}`;
    btn.onclick = () => { hariAktifFilter = hari; renderHariFilter(); renderJadwal(); };
    wrap.appendChild(btn);
  });
}


/* ------------------------------------------------------------------------
   6. RENDER: KARTU JADWAL CAROUSEL (tile gelap di tab Overview)
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
  const titleEl = document.getElementById("jadwalCarouselTitle");
  if (!wrap) return;

  if (items.length === 0) {
    titleEl.textContent = "Tidak ada kelas";
    wrap.innerHTML = `<p class="t-body text-white/60">Hari ini nggak ada jadwal kuliah — waktu yang pas buat review materi minggu ini.</p>`;
    dotsWrap.innerHTML = "";
    return;
  }

  if (jadwalIdx >= items.length) jadwalIdx = 0;

  const now = new Date();
  const menit = now.getHours() * 60 + now.getMinutes();
  const item = items[jadwalIdx];
  const [mulai, selesai] = item.jam.split("-");
  const isAktif = menitDariString(mulai) <= menit && menit <= menitDariString(selesai);

  titleEl.textContent = item.matkul;
  wrap.innerHTML = `
    ${isAktif ? `<span class="inline-flex items-center gap-1.5 t-fine-print font-semibold bg-white/10 px-3 py-1.5 rounded-full mb-4"><span class="pulse-dot"></span>Sedang berlangsung</span>` : `<p class="t-caption text-white/50 mb-4">Jadwal ${jadwalIdx + 1} dari ${items.length}</p>`}
    <p class="t-body text-white/85">${item.dosen}</p>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 t-body text-white/70">
      <span class="flex items-center gap-2">${icon("i-clock", "icon icon-sm")} ${item.jam}</span>
      <span class="flex items-center gap-2">${icon("i-pin", "icon icon-sm")} ${item.ruang}</span>
    </div>`;

  dotsWrap.innerHTML = items.map((_, i) =>
    `<span class="h-1.5 rounded-full transition-all ${i === jadwalIdx ? "bg-primaryDark w-6" : "bg-white/20 w-1.5"}"></span>`
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
    case "Sedang Dikerjakan": return "bg-blue-50 text-primary border-blue-200";
    case "Terlambat": return "bg-red-50 text-red-500 border-red-200";
    default: return "bg-yellow-50 text-yellow-700 border-yellow-200"; // Belum Dikerjakan
  }
}

function ambilTugasDenganStatusTerkini() {
  const list = DB.getTugas().map((t) => ({ ...t, status: hitungStatusOtomatis(t) }));
  DB.setTugas(list);
  return list;
}

function renderStatusFilterChips() {
  const statuses = ["semua", "Belum Dikerjakan", "Sedang Dikerjakan", "Selesai", "Terlambat"];
  const wrap = document.getElementById("statusFilterChips");
  wrap.innerHTML = "";
  statuses.forEach((s) => {
    const btn = document.createElement("button");
    btn.textContent = s === "semua" ? "Semua" : s;
    btn.className = `chip shrink-0 ${s === statusFilterAktif ? "chip-selected" : ""}`;
    btn.onclick = () => { statusFilterAktif = s; renderStatusFilterChips(); renderTugas(); };
    wrap.appendChild(btn);
  });
}

function renderTugas() {
  let list = ambilTugasDenganStatusTerkini();
  if (statusFilterAktif !== "semua") list = list.filter((t) => t.status === statusFilterAktif);
  list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const wrap = document.getElementById("tugasList");
  wrap.innerHTML = "";

  if (list.length === 0) {
    wrap.innerHTML = `<p class="t-body text-inkMuted48">Belum ada tugas dengan status ini.</p>`;
    return;
  }

  list.forEach((t) => {
    const card = document.createElement("div");
    card.className = "utility-card flex flex-col sm:flex-row sm:items-center gap-3 justify-between";
    card.innerHTML = `
      <div class="min-w-0">
        <div class="flex items-center gap-2.5 flex-wrap">
          <p class="t-body-strong">${t.judul}</p>
          <span class="t-fine-print px-2.5 py-1 rounded-full border ${badgeClassStatus(t.status)}">${t.status}</span>
        </div>
        <p class="t-caption text-inkMuted48 mt-1.5">${t.matkul} · Deadline ${new Date(t.deadline).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
        <p class="t-caption text-primary mt-1 font-mono countdown-tugas" data-deadline="${t.deadline}" data-status="${t.status}"></p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <select data-id="${t.id}" class="ubah-status t-caption bg-parchment border border-hairline rounded-md px-2.5 py-2">
          <option ${t.status === "Belum Dikerjakan" ? "selected" : ""}>Belum Dikerjakan</option>
          <option ${t.status === "Sedang Dikerjakan" ? "selected" : ""}>Sedang Dikerjakan</option>
          <option ${t.status === "Selesai" ? "selected" : ""}>Selesai</option>
          <option ${t.status === "Terlambat" ? "selected" : ""}>Terlambat</option>
        </select>
        <button data-id="${t.id}" class="hapus-tugas btn-icon-circular !w-9 !h-9 text-red-500">${icon("i-trash", "icon icon-sm")}</button>
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
      el.className = "t-caption mt-1 font-mono countdown-tugas text-green-600";
    } else if (sisa <= 0) {
      el.textContent = "Waktu habis";
      el.className = "t-caption mt-1 font-mono countdown-tugas text-red-500";
    } else {
      el.textContent = `Sisa waktu ${formatSisaWaktu(sisa)}`;
      el.className = "t-caption mt-1 font-mono countdown-tugas text-primary";
    }
  });
  renderStickyBar();
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
   8. RENDER: MATERI (dengan pencarian) & DOSEN
   ------------------------------------------------------------------------ */
function renderMateri(keyword = "") {
  const wrap = document.getElementById("materiList");
  const kw = keyword.trim().toLowerCase();
  const filtered = CONFIG.materi.filter((m) =>
    m.judul.toLowerCase().includes(kw) || m.matkul.toLowerCase().includes(kw)
  );

  wrap.innerHTML = "";
  if (filtered.length === 0) {
    wrap.innerHTML = `<p class="t-body text-inkMuted48 sm:col-span-3">Tidak ada materi yang cocok dengan pencarian.</p>`;
    return;
  }

  filtered.forEach((m) => {
    const card = document.createElement("a");
    card.href = m.link;
    card.className = "utility-card flex items-center gap-3.5";
    card.innerHTML = `
      <div class="w-12 h-12 rounded-md bg-blue-50 text-primary flex items-center justify-center font-mono t-fine-print font-bold shrink-0">${m.tipe}</div>
      <div class="min-w-0">
        <p class="t-body-strong truncate">${m.judul}</p>
        <p class="t-caption text-inkMuted48 truncate">${m.matkul}</p>
      </div>`;
    wrap.appendChild(card);
  });
}

function renderDosen() {
  const wrap = document.getElementById("dosenList");
  wrap.innerHTML = "";
  CONFIG.dosenAslab.forEach((d) => {
    const card = document.createElement("div");
    card.className = "utility-card flex items-center gap-3.5";
    card.innerHTML = `
      <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center t-body-strong text-white shrink-0">${d.inisial}</div>
      <div class="min-w-0">
        <p class="t-body-strong">${d.nama}</p>
        <p class="t-caption text-inkMuted48">${d.peran}</p>
      </div>`;
    wrap.appendChild(card);
  });
}


/* ------------------------------------------------------------------------
   9. RODA KEBERUNTUNGAN (Randomizer nama mahasiswa)
   Elemen ini satu-satunya di seluruh halaman yang memakai class
   `.product-shadow` — mengikuti prinsip "satu shadow untuk produk saja".
   ------------------------------------------------------------------------ */
let wheelRotation = 0;
let isSpinning = false;
const WHEEL_COLORS = ["#001e4d", "#0066cc", "#0071e3", "#12325c", "#2997ff", "#003c8f"];

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
    html += `<path d="${path}" fill="${color}" stroke="#1d1d1f" stroke-width="0.5"></path>`;

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

  document.getElementById("spinResult").innerHTML = `<p class="t-body text-white/50">Roda sedang berputar...</p>`;
  const btn = document.getElementById("btnSpin");
  btn.disabled = true;
  btn.style.opacity = "0.6";

  setTimeout(() => {
    const nama = CONFIG.mahasiswa[idxTerpilih];
    document.getElementById("spinResult").innerHTML = `
      <p class="t-caption text-white/50">Terpilih</p>
      <p class="t-display-lg text-primaryDark mt-1">${nama}</p>`;
    tambahPoin(nama, 3);
    renderLeaderboard();
    letupkanConfetti();
    isSpinning = false;
    btn.disabled = false;
    btn.style.opacity = "1";
  }, 5000);
}

function letupkanConfetti() {
  const warna = ["#0066cc", "#2997ff", "#0071e3", "#ffffff"];
  for (let i = 0; i < 32; i++) {
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
    wrap.innerHTML = `<p class="t-body text-inkMuted48 sm:col-span-2">Belum ada pesan. Jadilah yang pertama kirim.</p>`;
    return;
  }

  list.forEach((m) => {
    const card = document.createElement("div");
    card.className = "utility-card !bg-white";
    card.innerHTML = `
      <p class="t-body">${escapeHTML(m.pesan)}</p>
      <p class="t-fine-print text-inkMuted48 mt-3 flex items-center gap-1.5">${icon("i-user", "icon icon-sm")} Anonim · ${new Date(m.waktu).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>`;
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

  const top3Wrap = document.getElementById("leaderboardTop3");
  if (top3Wrap) {
    top3Wrap.innerHTML = sorted.slice(0, 3).map(([nama, p], i) => `
      <div class="flex items-center justify-between utility-card !py-3.5">
        <span class="flex items-center gap-3 min-w-0">
          <span class="t-body-strong text-primary w-5">${i + 1}</span>
          <span class="t-body truncate">${nama}</span>
        </span>
        <span class="t-caption-strong text-primary shrink-0">${p} pts</span>
      </div>`).join("");
  }

  const fullWrap = document.getElementById("leaderboardFull");
  if (fullWrap) {
    fullWrap.innerHTML = sorted.map(([nama, p], i) => `
      <div class="utility-card flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="t-body-strong text-inkMuted48 w-6">${i + 1}</span>
          <span class="t-body">${nama}</span>
        </div>
        <span class="t-body-strong text-primary">${p} pts</span>
      </div>`).join("");
  }
}


/* ------------------------------------------------------------------------
   12. RENDER: OVERVIEW (statistik, grid tugas, countdown)
   ------------------------------------------------------------------------ */
function renderCountdownAngka() {
  const now = new Date();
  const hitung = (target) => Math.max(0, Math.ceil((new Date(target) - now) / 86400000));
  document.getElementById("cdUTS").textContent = hitung(CONFIG.tanggalUTS);
  document.getElementById("cdUAS").textContent = hitung(CONFIG.tanggalUAS);
  document.getElementById("cdLibur").textContent = hitung(CONFIG.tanggalLiburSemester);
}

function renderOutcomeStats() {
  const list = ambilTugasDenganStatusTerkini();
  const total = list.length || 1;
  const statuses = [
    { label: "Selesai", color: "#22c55e" },
    { label: "Sedang Dikerjakan", color: "#0066cc" },
    { label: "Belum Dikerjakan", color: "#eab308" },
    { label: "Terlambat", color: "#ef4444" },
  ];

  const wrap = document.getElementById("outcomeStats");
  wrap.innerHTML = statuses.map((s) => {
    const count = list.filter((t) => t.status === s.label).length;
    const pct = Math.round((count / total) * 100);
    return `
      <div>
        <div class="flex items-center justify-between t-caption mb-2">
          <span class="font-medium">${s.label}</span>
          <span class="text-inkMuted48">${pct}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${s.color}"></div></div>
      </div>`;
  }).join("");
}

function renderOverviewTugasGrid() {
  const list = ambilTugasDenganStatusTerkini()
    .filter((t) => t.status !== "Selesai")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const wrap = document.getElementById("overviewTugasGrid");
  if (list.length === 0) {
    wrap.innerHTML = `<p class="t-body text-inkMuted48 sm:col-span-3">Semua tugas sudah beres. Mantap.</p>`;
    return;
  }

  wrap.innerHTML = list.map((t) => `
    <div class="utility-card">
      <span class="t-fine-print px-2.5 py-1 rounded-full border ${badgeClassStatus(t.status)}">${t.status}</span>
      <p class="t-body-strong mt-3.5">${t.judul}</p>
      <p class="t-caption text-inkMuted48 mt-1.5">${t.matkul}</p>
      <p class="t-caption text-primary mt-3 font-mono">${new Date(t.deadline).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</p>
    </div>`).join("");
}

function renderOverview() {
  renderJadwalCarousel();
  renderCountdownAngka();
  renderOutcomeStats();
  renderOverviewTugasGrid();
}

function renderAll() {
  renderJadwal();
  renderTugas();
  renderOverview();
  renderLeaderboard();
  cekNotifikasi();
  renderStickyBar();
}


/* ------------------------------------------------------------------------
   13. NAVIGASI (global nav hitam + menu mobile + sub-nav frosted)
   ------------------------------------------------------------------------ */
function bindNavButton(btn, tabId) {
  btn.dataset.tab = tabId;
  btn.addEventListener("click", () => gotoTab(tabId));
}

function buildNavigasi() {
  const desktopNav = document.getElementById("globalNavLinks");
  const mobileNav = document.getElementById("mobileNavLinks");
  desktopNav.innerHTML = "";
  mobileNav.innerHTML = "";

  TABS.forEach((t) => {
    const dBtn = document.createElement("button");
    dBtn.className = "nav-btn nav-link-item text-white/70 hover:text-white transition-colors";
    dBtn.textContent = t.label;
    bindNavButton(dBtn, t.id);
    desktopNav.appendChild(dBtn);

    const mBtn = document.createElement("button");
    mBtn.className = "nav-btn nav-link-item text-left text-white/70 py-3 border-b border-white/10";
    mBtn.textContent = t.label;
    bindNavButton(mBtn, t.id);
    mobileNav.appendChild(mBtn);
  });
}

function gotoTab(tabId) {
  const tab = TABS.find((t) => t.id === tabId);
  if (!tab) return;

  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
  document.getElementById(`tab-${tabId}`).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));
  document.getElementById("pageTagline").textContent = tab.tagline;

  // Tombol aksi di sub-nav ("+ Tugas") cuma relevan di tab Tugas & Overview
  const action = document.getElementById("subNavAction");
  action.classList.toggle("hidden", !(tabId === "tugas" || tabId === "overview"));

  closeMobileMenu();
  renderStickyBar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-tab].nav-btn-inline");
  if (t) gotoTab(t.dataset.tab);
});

function openMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.maxHeight = menu.scrollHeight + "px";
  menu.style.opacity = "1";
}
function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.maxHeight = "0";
  menu.style.opacity = "0";
}


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
   15. INISIALISASI
   ------------------------------------------------------------------------ */
function init() {
  buildNavigasi();
  gotoTab("overview");
  renderHariFilter();
  renderStatusFilterChips();
  buildWheelSVG();
  renderMateri();
  renderDosen();
  renderAnon();
  renderAll();

  tickClock();
  setInterval(tickClock, 1000);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderJadwal, 200);
  });

  // --- Menu mobile (hamburger) ---
  let mobileMenuOpen = false;
  document.getElementById("hamburgerBtn").addEventListener("click", () => {
    mobileMenuOpen = !mobileMenuOpen;
    mobileMenuOpen ? openMobileMenu() : closeMobileMenu();
  });

  // --- Carousel jadwal ---
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

  // --- Roda keberuntungan ---
  document.getElementById("btnSpin").addEventListener("click", spinWheel);

  // --- Pencarian materi ---
  document.getElementById("materiSearch").addEventListener("input", (e) => renderMateri(e.target.value));

  // --- Tombol aksi sub-nav & modal tugas ---
  document.getElementById("subNavAction").addEventListener("click", bukaModalTugas);
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

  // --- Form kotak saran anonim ---
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

  // --- Notifikasi ---
  document.getElementById("notifBtn").addEventListener("click", () => {
    const overdue = DB.getTugas().filter((t) => hitungStatusOtomatis(t) === "Terlambat").length;
    toast(overdue > 0 ? `${overdue} tugas melewati deadline` : "Tidak ada tugas mendesak", overdue > 0 ? "error" : "info");
  });
}

document.addEventListener("DOMContentLoaded", init);
