import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./style.css";

import AOS from "aos";
import gsap from "gsap";
import * as THREE from "three";
import cytoscape from "cytoscape";

AOS.init({
  duration: 720,
  easing: "ease-out-cubic",
  once: true,
  offset: 40,
});

gsap.from(".hero-animate", {
  opacity: 0,
  y: 26,
  scale: 0.98,
  duration: 0.9,
  ease: "power3.out",
});

gsap.from(".chip", {
  opacity: 0,
  y: 16,
  stagger: 0.09,
  delay: 0.35,
  duration: 0.65,
  ease: "power3.out",
});

gsap.from(".hero-note", {
  opacity: 0,
  scale: 0.92,
  y: 18,
  delay: 0.55,
  duration: 0.75,
  ease: "back.out(1.7)",
});

gsap.to(".logo-mark", {
  y: -6,
  duration: 1.8,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

const targetMajors = {
  primary: "D4/S1 Teknik Informatika",
  secondary: "Sistem Informasi",
  note:
    "Pilihan utama saya adalah Teknik Informatika. Sebagai alternatif, Sistem Informasi menjadi opsi yang relevan karena masih berhubungan erat dengan teknologi, bisnis digital, dan pengembangan sistem.",
};

const campuses = [
  {
    name: "Polinema",
    type: "PTN / Vokasi",
    status: "Prioritas Realistis",
    tagClass: "tag-green",
    chance: 85,
    note: "Pilihan realistis untuk langsung membangun keterampilan praktis",
    risk: "Sedang",
    color: "#059669",
    majorFit: "Sangat sesuai untuk program D4 di bidang teknologi atau informatika.",
    whyChoose: [
      "Memiliki peluang penerimaan yang paling realistis.",
      "Pendidikan vokasi menawarkan jalur terarah untuk persiapan dunia kerja.",
      "Sangat sejalan dengan tujuan saya untuk membangun keterampilan teknis.",
    ],
    whyNotMain: [
      "Perlu peninjauan lebih lanjut terkait kesesuaian program studi dengan target spesifik.",
      "Informasi detail mengenai biaya dan beasiswa masih perlu dikaji lebih mendalam.",
    ],
    decision: "Menjadi pilihan realistis utama saya pada saat ini.",
  },
  {
    name: "Universitas Negeri Malang",
    type: "PTN",
    status: "Alternatif Kuat",
    tagClass: "tag-blue",
    chance: 60,
    note: "Pilihan stabil dengan peluang yang masih masuk akal",
    risk: "Sedang",
    color: "#2563eb",
    majorFit:
      "Menyediakan Teknik Informatika, namun belum memiliki program Sistem Informasi.",
    whyChoose: [
      "Merupakan PTN yang kuat dengan peluang penerimaan yang masih realistis.",
      "Sangat sesuai jika saya memutuskan untuk fokus penuh pada Teknik Informatika.",
      "Aspek biaya pendidikan masih berada dalam batas yang dapat dipertimbangkan.",
    ],
    whyNotMain: [
      "Pilihan jurusan kurang fleksibel karena tidak adanya program Sistem Informasi.",
      "Jika tidak diterima di Teknik Informatika, opsi alternatif menjadi terbatas.",
      "Tidak memiliki rencana cadangan untuk jurusan lain di kampus yang sama.",
    ],
    decision:
      "Masih dipertimbangkan secara serius, namun kurang fleksibel dibandingkan kampus yang memiliki jurusan Sistem Informasi.",
  },
  {
    name: "UIN Malang",
    type: "PTN Keagamaan",
    status: "Alternatif Realistis",
    tagClass: "tag-cyan",
    chance: 55,
    note: "Opsi yang baik, namun program asrama menjadi pertimbangan tersendiri",
    risk: "Sedang",
    color: "#0891b2",
    majorFit: "Perlu ditinjau lebih lanjut kesesuaian program studi teknologinya dengan target saya.",
    whyChoose: [
      "Masih termasuk dalam kategori PTN yang realistis untuk diperjuangkan.",
      "Memiliki lingkungan akademik yang terstruktur dengan baik.",
      "Dapat menjadi opsi utama jika jurusan dan biaya sesuai dengan ekspektasi.",
    ],
    whyNotMain: [
      "Terdapat kewajiban tinggal di ma'had atau asrama pada tahun pertama.",
      "Kewajiban asrama berpotensi mengurangi fleksibilitas waktu saya.",
      "Saya membutuhkan manajemen waktu yang fleksibel untuk bisnis florist dan pekerjaan sampingan.",
    ],
    decision:
      "Masih dipertimbangkan, namun bukan sebagai prioritas utama mengingat saya membutuhkan fleksibilitas waktu.",
  },
  {
    name: "Universitas Brawijaya",
    type: "PTN",
    status: "Prioritas Impian",
    tagClass: "tag-orange",
    chance: 75,
    note: "Kampus impian dengan peluang baik, namun memerlukan perhitungan finansial yang matang",
    risk: "Sedang",
    color: "#ea580c",
    majorFit:
      "Menjadi pilihan ideal jika dapat diterima di program teknologi atau informatika.",
    whyChoose: [
      "Universitas Brawijaya merupakan kampus impian saya sejak lama.",
      "Memiliki reputasi akademik yang sangat kuat serta jaringan relasi yang luas.",
      "Lingkungan yang kompetitif dapat memacu perkembangan diri saya secara signifikan.",
    ],
    whyNotMain: [
      "Tingkat persaingan jalur SNBP sangat ketat, meskipun saya memiliki portofolio prestasi.",
      "Kesiapan nilai rapor terbaru masih perlu divalidasi dengan pihak sekolah.",
      "Saat ini fokus saya terbagi pada pekerjaan, lomba, dan bisnis, sehingga perlu penyesuaian waktu.",
      "Biaya hidup dan lingkungan sosial di sekitar kampus cenderung lebih tinggi.",
      "Akan menjadi tantangan tersendiri jika hanya mengandalkan bantuan finansial dari KIP Kuliah.",
    ],
    financeNote:
      "Estimasi perhitungan kasar: Biaya transportasi ±Rp20.000/hari × 22 hari = ±Rp440.000/bulan atau ±Rp2.640.000/semester. Dari total bantuan Rp5.800.000, sisa dana sekitar Rp3.160.000 harus dikelola dengan sangat disiplin untuk kebutuhan lain.",
    decision:
      "Tetap menjadi target impian, namun bukan pilihan paling aman dari segi pembiayaan hidup.",
  },
  {
    name: "UMM",
    type: "PTS",
    status: "Cadangan",
    tagClass: "tag-orange",
    chance: 75,
    note: "Peluang penerimaan tinggi, dengan catatan biaya harus dipastikan terlebih dahulu",
    risk: "Sedang-Tinggi",
    color: "#ea580c",
    majorFit:
      "Perlu meninjau ketersediaan program TI/SI serta peluang beasiswa yang ada.",
    whyChoose: [
      "Dipersiapkan sebagai rencana cadangan jika belum diterima di PTN.",
      "Secara umum, peluang penerimaan relatif lebih terbuka dibandingkan PTN.",
      "Menjadi opsi yang sangat baik apabila mendapat dukungan beasiswa atau keringanan biaya.",
    ],
    whyNotMain: [
      "Sebagai PTS, komponen biaya pendidikan cenderung lebih tinggi jika tanpa beasiswa.",
      "Membutuhkan kepastian dukungan beasiswa sebelum memutuskan untuk mendaftar.",
      "Tidak akan diambil sebagai prioritas jika kesiapan finansial belum sepenuhnya aman.",
    ],
    decision: "Berstatus sebagai cadangan, namun sangat bergantung pada kejelasan dukungan beasiswa.",
  },
  {
    name: "ITN Malang",
    type: "PTS",
    status: "Cadangan Teknis",
    tagClass: "tag-purple",
    chance: 75,
    note: "Sesuai untuk fokus teknik, namun estimasi biaya perlu dipertimbangkan",
    risk: "Sedang-Tinggi",
    color: "#7c3aed",
    majorFit: "Sangat relevan jika ingin berfokus pada teknologi dan ilmu teknik terapan.",
    whyChoose: [
      "Fokus akademiknya sangat sejalan dengan minat saya di bidang teknologi dan teknik.",
      "Merupakan alternatif yang baik untuk kampus dengan pendekatan pembelajaran praktis.",
      "Peluang penerimaan masuk tergolong sangat realistis.",
    ],
    whyNotMain: [
      "Berstatus PTS, sehingga perhitungan finansial harus dilakukan dengan sangat cermat.",
      "Perlu memastikan ketersediaan beasiswa internal atau program keringanan biaya.",
      "Tidak menjadi prioritas utama apabila belum ada jaminan keamanan secara pembiayaan.",
    ],
    decision: "Merupakan cadangan teknis yang akan dieksekusi apabila terdapat dukungan finansial yang memadai.",
  },
];

const scholarships = [
  {
    name: "KIP Kuliah",
    badge: "Prioritas 1",
    tagClass: "tag-blue",
    accent: "#2563eb",
    subtitle: "Pilar utama dalam perencanaan pembiayaan kuliah",
    timeline: "Akun: 3 Feb – 31 Okt · Seleksi SNBP: 3–18 Feb 2026",
    docs: [
      "Kartu Tanda Penduduk (KTP)",
      "Kartu Keluarga (KK)",
      "NISN, NPSN, dan NIK yang valid",
      "Rapor / SKL / Ijazah",
      "Dokumen pendukung (SKTM / DTKS / KIP / KKS / PKH)",
      "Surat keterangan penghasilan orang tua",
      "Dokumentasi kondisi rumah sesuai persyaratan",
      "Sertifikat prestasi lomba pendukung",
    ],
    benefits: [
      "Pembebasan biaya pendidikan atau UKT secara penuh",
      "Dukungan bantuan biaya hidup setiap semester",
      "Meringankan beban finansial keluarga secara signifikan",
      "Menjadi fondasi utama pembiayaan sejak awal masa perkuliahan",
    ],
    obligations: [
      "Melengkapi seluruh data KIP Kuliah sebelum penutupan jalur SNBP",
      "Melakukan finalisasi paling lambat 17 Februari 2026 untuk sinkronisasi data",
      "Mempertahankan status sebagai mahasiswa aktif",
      "Mematuhi seluruh regulasi kampus dan pedoman program KIP Kuliah",
      "Mengelola dana bantuan secara bertanggung jawab untuk keperluan pendidikan",
      "Menjaga prestasi akademik dan integritas sebagai penerima beasiswa",
    ],
  },
  {
    name: "Beasiswa Unggulan",
    badge: "Prioritas 2",
    tagClass: "tag-green",
    accent: "#059669",
    subtitle: "Rencana alternatif jika KIP Kuliah tidak terealisasi",
    timeline: "Estimasi: 15–29 Juli 2026",
    docs: [
      "Kartu Tanda Penduduk (KTP)",
      "Kartu Keluarga (KK)",
      "Ijazah atau Surat Keterangan Lulus (SKL)",
      "Rapor atau transkrip nilai akademik",
      "Portofolio sertifikat prestasi",
      "Esai komprehensif mengenai rencana studi",
      "Surat rekomendasi dari pihak terkait",
      "Surat pernyataan tidak sedang menerima beasiswa lain",
    ],
    benefits: [
      "Mendapatkan dukungan biaya pendidikan secara penuh",
      "Sebagai pengakuan formal atas capaian prestasi akademik maupun non-akademik",
      "Memaksimalkan portofolio kompetisi sebagai nilai tambah yang signifikan",
      "Berfungsi sebagai jaring pengaman finansial di luar KIP Kuliah",
    ],
    obligations: [
      "Mempertahankan dan meningkatkan prestasi akademik secara konsisten",
      "Memenuhi kewajiban pelaporan berkala sesuai ketentuan penyelenggara",
      "Mematuhi larangan penerimaan pendanaan ganda dari sumber beasiswa lain",
      "Menjalankan rencana studi dengan komitmen dan keseriusan penuh",
    ],
  },
  {
    name: "Beasiswa Bangkit",
    badge: "Prioritas 3",
    tagClass: "tag-cyan",
    accent: "#0891b2",
    subtitle: "Opsi pendukung bila beasiswa utama tidak didapatkan",
    timeline: "Pendaftaran: 1 April – 31 Mei 2026",
    docs: [
      "Kartu Tanda Penduduk (KTP)",
      "Kartu Keluarga (KK)",
      "Dokumen rekam jejak akademik",
      "Sertifikat pencapaian prestasi",
      "Esai atau surat motivasi (jika dipersyaratkan)",
      "Surat rekomendasi (jika dipersyaratkan)",
      "Bukti resmi penerimaan atau status mahasiswa aktif",
    ],
    benefits: [
      "Berfungsi sebagai alternatif jaring pengaman pembiayaan",
      "Memberikan dukungan finansial yang membantu kelancaran pendidikan",
      "Menambah kredibilitas akademik melalui dukungan beasiswa berbasis prestasi",
    ],
    obligations: [
      "Memenuhi seluruh persyaratan program yang ditetapkan",
      "Mengikuti proses seleksi administrasi dan tahapan verifikasi",
      "Menjaga komitmen terhadap pencapaian akademik",
      "Mematuhi setiap pedoman sebagai penerima beasiswa",
    ],
  },
  {
    name: "Beasiswa PWNU Jawa Timur",
    badge: "Segera",
    tagClass: "tag-orange",
    accent: "#ea580c",
    subtitle: "Beasiswa PWNU Jawa Timur 2026",
    timeline: "Pendaftaran: 27 April – 20 Mei 2026 · Seleksi: 23 Mei 2026",
    docs: [
      "Kartu Tanda Penduduk (KTP)",
      "Kartu Keluarga (KK)",
      "Surat rekomendasi PCNU setempat",
      "Dokumen akademik (Rapor/Ijazah)",
      "Sertifikat prestasi pendukung",
      "Esai / Motivasi mengikuti program",
    ],
    benefits: [
      "Bantuan biaya pendidikan tinggi",
      "Networking dalam jaringan Nahdlatul Ulama",
      "Kesempatan pengembangan diri dan pengabdian",
    ],
    obligations: [
      "Memenuhi seluruh tahapan seleksi (administrasi & tes)",
      "Menjaga integritas dan nilai-nilai ke-NU-an",
      "Aktif dalam kegiatan yang ditentukan pengelola beasiswa",
    ],
  },
  {
    name: "Djarum Beasiswa Plus",
    badge: "Opsi Terakhir",
    tagClass: "tag-orange",
    accent: "#ea580c",
    subtitle: "Target pencapaian ketika sudah berstatus mahasiswa aktif",
    timeline: "Estimasi Target: April 2028 (Semester 4)",
    docs: [
      "Kartu Tanda Mahasiswa (KTM)",
      "Kartu Tanda Penduduk (KTP)",
      "Transkrip Nilai atau Kartu Hasil Studi (KHS)",
      "Bukti pencapaian Indeks Prestasi Kumulatif (IPK)",
      "Bukti keaktifan dalam organisasi",
      "Sertifikat prestasi tambahan di masa kuliah",
      "Surat keterangan tidak sedang menerima beasiswa lain",
    ],
    benefits: [
      "Mendapatkan dukungan dana pendidikan yang memadai",
      "Kesempatan mengikuti program pelatihan soft skill tingkat lanjut",
      "Memperluas jaringan profesional dengan sesama penerima beasiswa unggulan",
      "Mendapatkan pembinaan di bidang kepemimpinan, karakter, dan komunikasi",
    ],
    obligations: [
      "Mempertahankan standar IPK sesuai dengan ketentuan program",
      "Wajib berpartisipasi aktif dalam seluruh rangkaian kegiatan pembinaan",
      "Menjaga integritas dan nama baik program beasiswa",
      "Menunjukkan keaktifan berkelanjutan dalam organisasi atau kegiatan positif",
    ],
  },
];

const consideredScholarships = [
  {
    name: "Beasiswa Pemkab Sidoarjo",
    badge: "Pernah Dipertimbangkan",
    tagClass: "tag-purple",
    accent: "#7c3aed",
    subtitle: "Dibatalkan dari plan utama",
    timeline: "Pernah dikaji untuk tahun 2026",
    docs: [
      "Kartu Tanda Penduduk (KTP) Sidoarjo",
      "Kartu Keluarga (KK)",
      "Transkrip nilai / Bukti prestasi",
    ],
    benefits: [
      "Mendapatkan bantuan sebesar Rp5 juta per orang",
      "Status cakupan (full UKT atau biaya lain) tidak jelas, sehingga tidak dijadikan prioritas utama",
    ],
    obligations: [
      "Mempertahankan prestasi akademik sesuai standar Pemkab",
    ],
  },
];

const mandiriSchedules = [
  {
    campus: "Universitas Brawijaya",
    short: "UB",
    badge: "SMUB",
    colorClass: "mandiri-red",
    note: "Verifikasi kembali melalui selma.ub.ac.id",
    items: [
      "<strong>SMUB Jalur Rapor:</strong><br>• Buka: 7 Mei 2026<br>• Tutup: 28 Mei 2026<br>• Pengumuman: 19 Juni 2026",
      "<strong>SMUB Jalur UTBK:</strong><br>• Buka: 1 Juni 2026<br>• Tutup: 19 Juni 2026<br>• Pengumuman: 3 Juli 2026",
    ],
  },
  {
    campus: "Universitas Negeri Malang",
    short: "UM",
    badge: "Mandiri UM",
    colorClass: "mandiri-blue",
    note: "Verifikasi melalui seleksi.um.ac.id",
    items: [
      "<strong>Jalur Prestasi:</strong><br>• Buka: 1 April 2026<br>• Tutup: 20 Mei 2026<br>• Pengumuman: 3 Juni 2026",
      "<strong>Jalur Skor UTBK:</strong><br>• Buka: 1 April 2026<br>• Tutup: 29 Mei 2026<br>• Pengumuman: 5 Juni 2026",
    ],
  },
  {
    campus: "Polinema",
    short: "Polinema",
    badge: "Mandiri",
    colorClass: "mandiri-green",
    note: "Verifikasi melalui spmb.polinema.ac.id",
    items: [
      "<strong>Jalur Prestasi & UTBK:</strong><br>• Buka: 21 April 2026<br>• Tutup: 7 Juni 2026<br>• Pengumuman: 12 Juni 2026",
      "<strong>Jalur Konsorsium:</strong><br>• Buka: April 2026<br>• Tutup: 31 Mei 2026<br>• Pengumuman: Juni 2026",
    ],
  },
  {
    campus: "UIN Malang",
    short: "UIN",
    badge: "Mandiri Tes",
    colorClass: "mandiri-cyan",
    note: "Verifikasi melalui pmb.uin-malang.ac.id",
    items: [
      "<strong>Jalur Mandiri Tes:</strong><br>• Buka: 6 April 2026<br>• Tutup: 2 Juli 2026<br>• Pengumuman: 15 Juli 2026",
    ],
  },
];

const competitionSchedules = [
  {
    title: "LKS Dikmen Sidoarjo 2025",
    field: "Cyber Security",
    result: "Juara 3",
    date: "18–21 Februari 2025",
    status: "Telah Dilaksanakan",
    badgeClass: "tag-green",
    description:
      "Pencapaian kompetitif pertama yang mengonfirmasi potensi dan minat saya di bidang keamanan siber (cyber security).",
  },
  {
    title: "LKS Ma'arif Sidoarjo 2026",
    field: "Cloud Computing",
    result: "Juara 3",
    date: "16–18 Januari 2026",
    status: "Telah Dilaksanakan",
    badgeClass: "tag-green",
    description:
      "Pencapaian kedua pada bidang komputasi awan (cloud computing) yang secara signifikan memperkuat portofolio kompetensi teknologi saya.",
  },
  {
    title: "LKS Dikmen Sidoarjo 2026",
    field: "Cyber Security",
    result: "Target: Lolos seleksi provinsi",
    date: "Pembukaan: 6 Feb 2026 · Pelaksanaan: 8–11 Feb 2026",
    status: "Target Mendatang",
    badgeClass: "tag-orange",
    description:
      "Menargetkan posisi Juara 2 sebagai proyeksi realistis, mempertimbangkan dominasi institusi lain, dengan prioritas utama lolos ke tingkat provinsi.",
  },
];

function renderMandiriTimeline() {
  const wrapper = document.querySelector("#mandiriTimeline");

  if (!wrapper) return;

  wrapper.innerHTML = mandiriSchedules
    .map(
      (item) => `
      <article class="mandiri-card ${item.colorClass}" data-aos="zoom-in">
        <div class="mandiri-top">
          <div class="mandiri-avatar">${item.short}</div>
          <div>
            <h3>${item.campus}</h3>
            <span>${item.note}</span>
          </div>
        </div>

        <div class="mandiri-badge">${item.badge}</div>

        <ul class="mandiri-list">
          ${item.items.map((schedule) => `<li>${schedule}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

function renderCompetitionTimeline() {
  const wrapper = document.querySelector("#competitionTimeline");

  if (!wrapper) return;

  wrapper.innerHTML = competitionSchedules
    .map(
      (item, index) => `
      <article class="competition-card" data-aos="fade-up" data-aos-delay="${index * 80}">
        <div class="competition-number">${index + 1}</div>

        <div class="competition-content">
          <div class="d-flex justify-content-between gap-2 align-items-start mb-2">
            <div>
              <h3>${item.title}</h3>
              <p>${item.field}</p>
            </div>
            <span class="tag ${item.badgeClass}">${item.status}</span>
          </div>

          <div class="competition-meta">
            <div>
              <i class="bi bi-calendar-event-fill"></i>
              <span>${item.date}</span>
            </div>
            <div>
              <i class="bi bi-trophy-fill"></i>
              <span>${item.result}</span>
            </div>
            <div>
              <i class="bi bi-stars"></i>
              <span>${item.description}</span>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function renderCampusList() {
  const wrapper = document.querySelector("#campusList");

  const majorCard = `
    <div class="major-card cartoon-pop mb-3">
      <div class="d-flex align-items-start gap-3">
        <div class="cartoon-icon blue">
          <i class="bi bi-code-slash"></i>
        </div>
        <div>
          <div class="small text-secondary fw-bold">Tujuan Jurusan</div>
          <div class="fw-black fw-bold">${targetMajors.primary}</div>
          <div class="fw-bold text-primary">Pilihan kedua: ${targetMajors.secondary}</div>
          <p class="small text-secondary mb-0 mt-1">${targetMajors.note}</p>
        </div>
      </div>
    </div>
  `;

  const campusHTML = campuses
    .map(
      (campus, index) => `
      <article class="campus-card cartoon-card" data-aos="zoom-in" data-aos-delay="${index * 60}">
        <div class="campus-head">
          <div>
            <div class="campus-name">${campus.name}</div>
            <div class="campus-type">${campus.type}</div>
          </div>
          <span class="tag ${campus.tagClass}">${campus.status}</span>
        </div>

        <div class="campus-meta">
          <span>Peluang masuk ${campus.chance}% · ${campus.note}</span>
          <span>Risiko: ${campus.risk}</span>
        </div>

        <div class="progress-lite mt-2">
          <div class="progress-fill animated-bar" style="width:${campus.chance}%; background:${campus.color}"></div>
        </div>

        <div class="campus-detail mt-3">
          <div class="detail-mini">
            <i class="bi bi-mortarboard-fill"></i>
            <span>${campus.majorFit}</span>
          </div>

          <button class="campus-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#campus-${index}">
            <i class="bi bi-chevron-down"></i>
            Lihat pertimbangan dan analisis pilihan
          </button>

          <div class="collapse mt-3" id="campus-${index}">
            <div class="reason-box choose">
              <div class="reason-title">
                <i class="bi bi-check-circle-fill"></i>
                Alasan Dipertimbangkan
              </div>
              <ul>
                ${campus.whyChoose.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>

            <div class="reason-box not-choose">
              <div class="reason-title">
                <i class="bi bi-exclamation-circle-fill"></i>
                Kendala & Batasan
              </div>
              <ul>
                ${campus.whyNotMain.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>

            ${
              campus.financeNote
                ? `<div class="reason-box finance">
                    <div class="reason-title">
                      <i class="bi bi-wallet2"></i>
                      Catatan biaya
                    </div>
                    <p>${campus.financeNote}</p>
                  </div>`
                : ""
            }

            <div class="decision-note">
              <i class="bi bi-lightbulb-fill"></i>
              ${campus.decision}
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  wrapper.innerHTML =
    majorCard +
    campusHTML +
    `<div class="small text-secondary fw-bold mt-3">
      <i class="bi bi-info-circle me-1"></i>
      Catatan: Persentase probabilitas merupakan estimasi pribadi, bukan angka resmi dari pihak kampus.
    </div>`;
}

function renderScholarships() {
  const wrapper = document.querySelector("#scholarshipList");

  wrapper.innerHTML = scholarships
    .map(
      (item, index) => `
      <article class="scholar-card scholarship-detail-card" style="--accent:${item.accent}">
        <div class="scholar-top">
          <div>
            <div class="scholar-title">${item.name}</div>
            <div class="small text-secondary fw-bold">${item.subtitle}</div>
          </div>
          <span class="tag ${item.tagClass}">${item.badge}</span>
        </div>

        <div class="mini-meta">
          <div>
            <i class="bi bi-calendar2-week"></i>
            Timeline<br>${item.timeline}
          </div>
          <div>
            <i class="bi bi-file-earmark-text"></i>
            Dokumen<br>${item.docs.length} item
          </div>
          <div>
            <i class="bi bi-gift-fill"></i>
            Benefit<br>${item.benefits.length} poin
          </div>
        </div>

        <button
          class="scholar-toggle"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#scholar-${index}"
        >
          <i class="bi bi-chevron-down"></i>
          Lihat dokumen, manfaat, dan persyaratan lanjutan
        </button>

        <div class="collapse mt-3" id="scholar-${index}">
          <div class="scholar-detail-box docs">
            <div class="scholar-detail-title">
              <i class="bi bi-folder-check"></i>
              Dokumen yang perlu disiapkan
            </div>
            <ul>
              ${item.docs.map((doc) => `<li>${doc}</li>`).join("")}
            </ul>
          </div>

          <div class="scholar-detail-box benefits">
            <div class="scholar-detail-title">
              <i class="bi bi-gift-fill"></i>
              Manfaat yang diperoleh
            </div>
            <ul>
              ${item.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
            </ul>
          </div>

          <div class="scholar-detail-box obligations">
            <div class="scholar-detail-title">
              <i class="bi bi-check2-circle"></i>
              Kewajiban pasca penerimaan beasiswa
            </div>
            <ul>
              ${item.obligations.map((obligation) => `<li>${obligation}</li>`).join("")}
            </ul>
          </div>
        </div>
      </article>

      ${
        index < scholarships.length - 1
          ? `<div class="flow-arrow"><i class="bi bi-arrow-down-circle-fill"></i></div>`
          : ""
      }
    `
    )
    .join("");

  const consideredWrapper = document.querySelector("#consideredScholarshipList");
  if (consideredWrapper) {
    consideredWrapper.innerHTML = `
      <div class="mt-4 mb-3">
        <div class="d-flex align-items-center gap-2 mb-3">
          <div class="step-number purple" style="width: 28px; height: 28px; font-size: 10px;">?</div>
          <div class="fw-bold small text-secondary text-uppercase">Pernah Dipertimbangkan (Opsional)</div>
        </div>
        ${consideredScholarships.map(item => `
          <div class="alert alert-light border-2 rounded-4 p-3 mb-2" style="border-style: dashed !important; background: rgba(255,255,255,0.4);">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <div class="fw-bold text-dark">${item.name}</div>
                <div class="small text-secondary">${item.subtitle}</div>
              </div>
              <span class="tag tag-purple">${item.badge}</span>
            </div>
            <p class="small text-secondary mb-0 mt-2">
              <i class="bi bi-info-circle-fill me-1"></i>
              ${item.benefits[1]}
            </p>
          </div>
        `).join("")}
      </div>
    `;
  }
}

renderCampusList();
renderScholarships();
renderMandiriTimeline();
renderCompetitionTimeline();

function initThreeBackground() {
  const canvas = document.getElementById("three-bg");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 42;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = window.innerWidth < 600 ? 130 : 230;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const palette = [
    new THREE.Color("#2563eb"),
    new THREE.Color("#0891b2"),
    new THREE.Color("#f97316"),
    new THREE.Color("#0f172a"),
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 95;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 42;

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  const ringGeometry = new THREE.TorusGeometry(8, 0.055, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x2563eb,
    transparent: true,
    opacity: 0.08,
  });

  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.set(13, 16, -8);
  ring.rotation.x = 0.8;
  scene.add(ring);

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0009;
    particles.rotation.x += 0.00035;
    particles.position.x += (mouseX * 0.8 - particles.position.x) * 0.02;
    particles.position.y += (-mouseY * 0.8 - particles.position.y) * 0.02;

    ring.rotation.z += 0.0025;
    ring.rotation.x += 0.0012;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

initThreeBackground();

const nodeDetails = {
  plan: {
    title: "Plan 1 Tahun",
    content: `
      <ul>
        <li>Ini tugas plan sebelum lomba dari Pak Isa Hamdan, S.Kom.</li>
        <li>Isinya soal lomba, portofolio, kampus, dan strategi beasiswa.</li>
        <li>Tujuannya satu: gimana caranya bisa kuliah tanpa biban biaya.</li>
      </ul>
    `,
  },

  kampus: {
    title: "Peta Pilihan Kampus",
    content: `
      <ul>
        <li>Di sini saya jelaskan kenapa milih atau nggak milih tiap kampus.</li>
        <li>Persentase peluang itu perkiraan saya sendiri, bukan data resmi.</li>
        <li>Jurusan utama: D4/S1 Teknik Informatika.</li>
        <li>Kalau nggak ada, pilihan kedua: Sistem Informasi.</li>
      </ul>
    `,
  },

  beasiswa: {
    title: "Peta Strategi Beasiswa",
    content: `
      <ul>
        <li>Tiap beasiswa punya dokumen, benefit, syarat, dan alasan kenapa cocok buat saya.</li>
        <li>Urutannya: KIP Kuliah → Beasiswa Unggulan → Bangkit → PWNU → Djarum.</li>
      </ul>
    `,
  },

  prestasi: {
    title: "Peta Portofolio Prestasi",
    content: `
      <ul>
        <li>Prestasi lomba ini yang jadi senjata buat daftar beasiswa.</li>
        <li>Sertifikat jadi bukti nyata kemampuan saya di bidang teknologi.</li>
      </ul>
    `,
  },

  // =====================
  // KAMPUS
  // =====================

  polinema: {
    title: "Polinema",
    content: `
      <ul>
        <li>Status: pilihan paling realistis.</li>
        <li>Peluang masuk perkiraan saya: <strong>85%</strong>.</li>
        <li>Cocok buat arah vokasi dan langsung siap kerja.</li>
      </ul>
    `,
  },

  polinema_choose: {
    title: "Polinema - Alasan Memilih",
    content: `
      <ul>
        <li>Peluangnya paling realistis menurut hitungan saya.</li>
        <li>Vokasi + bidang teknologi terapan = pas banget.</li>
        <li>Lebih dekat ke dunia industri dan skill kerja.</li>
        <li>Masuk akal buat strategi kuliah dengan biaya aman.</li>
      </ul>
    `,
  },

  polinema_not: {
    title: "Polinema - Alasan Tidak Memilih Penuh",
    content: `
      <ul>
        <li>Masih harus pastiin prodinya beneran sesuai target saya.</li>
        <li>Detail biaya dan beasiswanya belum saya cek mendalam.</li>
      </ul>
    `,
  },

  um: {
    title: "Universitas Negeri Malang",
    content: `
      <ul>
        <li>Status: alternatif yang kuat.</li>
        <li>Peluang masuk perkiraan: <strong>60%</strong>.</li>
        <li>Masih realistis, tapi jurusannya kurang fleksibel.</li>
      </ul>
    `,
  },

  um_choose: {
    title: "UM - Alasan Memilih",
    content: `
      <ul>
        <li>PTN yang kuat dan peluangnya masih realistis.</li>
        <li>Cocok kalau saya tetap fokus ke Teknik Informatika.</li>
        <li>Soal biaya, masih bisa dipertimbangkan.</li>
      </ul>
    `,
  },

  um_not: {
    title: "UM - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Cuma ada Teknik Informatika, nggak ada SI.</li>
        <li>Kalau nggak keterima di TI, pilihan lainnya sempit.</li>
        <li>Nggak ada plan B jurusan di kampus yang sama.</li>
      </ul>
    `,
  },

  uin: {
    title: "UIN Malang",
    content: `
      <ul>
        <li>Status: alternatif yang realistis.</li>
        <li>Peluang masuk perkiraan: <strong>55%</strong>.</li>
        <li>Dipertimbangkan, tapi ada urusan ma'had/asrama yang bikin mikir.</li>
      </ul>
    `,
  },

  uin_choose: {
    title: "UIN Malang - Alasan Memilih",
    content: `
      <ul>
        <li>Masih termasuk PTN yang realistis buat dicoba.</li>
        <li>Lingkungan akademiknya terstruktur, itu bagus.</li>
        <li>Bisa jadi opsi kalau jurusan dan biayanya cocok.</li>
      </ul>
    `,
  },

  uin_not: {
    title: "UIN Malang - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Ada kewajiban tinggal di asrama sekitar 1 tahun.</li>
        <li>Asrama bikin waktu jadi kurang fleksibel.</li>
        <li>Padahal saya butuh ruang gerak buat bisnis dan pengembangan diri.</li>
      </ul>
    `,
  },

  ub: {
    title: "Universitas Brawijaya",
    content: `
      <ul>
        <li>Status: kampus impian.</li>
        <li>Peluang masuk perkiraan: <strong>75%</strong>.</li>
        <li>Kalau bisa masuk sini, dream banget.</li>
      </ul>
    `,
  },

  ub_choose: {
    title: "UB - Alasan Memilih",
    content: `
      <ul>
        <li>Jujur, UB itu kampus impian saya dari dulu.</li>
        <li>Reputasinya kuat dan relasinya luas banget.</li>
        <li>Lingkungannya kompetitif — bisa bikin saya berkembang lebih cepat.</li>
        <li>Oke banget kalau bisa masuk dengan biaya aman.</li>
      </ul>
    `,
  },

  ub_not: {
    title: "UB - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Persaingan SNBP-nya brutal, meskipun saya punya sertifikat.</li>
        <li>Nilai rapor terbaru belum sempat saya cek.</li>
        <li>Biaya sosial dan gaya hidup di lingkungan UB bisa lebih tinggi.</li>
        <li>Kalau pakai KIP, pengeluaran harus dikontrol ketat banget.</li>
      </ul>
    `,
  },

  umm: {
    title: "UMM",
    content: `
      <ul>
        <li>Status: cadangan.</li>
        <li>Peluang masuk perkiraan: <strong>75%</strong>.</li>
        <li>Bisa dipertimbangkan kalau ada beasiswa yang jelas.</li>
      </ul>
    `,
  },

  umm_choose: {
    title: "UMM - Alasan Memilih",
    content: `
      <ul>
        <li>Peluang masuknya lebih gede dibanding PTN.</li>
        <li>Jadi plan B kalau PTN nggak tembus.</li>
        <li>Masih oke kalau ada beasiswa internal.</li>
      </ul>
    `,
  },

  umm_not: {
    title: "UMM - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>PTS = biaya lebih tinggi kalau nggak dapat beasiswa.</li>
        <li>Harus ada kepastian beasiswa dulu baru berani daftar.</li>
        <li>Nggak diprioritaskan kalau biayanya belum aman.</li>
      </ul>
    `,
  },

  itn: {
    title: "ITN Malang",
    content: `
      <ul>
        <li>Status: cadangan teknis.</li>
        <li>Peluang masuk perkiraan: <strong>75%</strong>.</li>
        <li>Cocok buat bidang teknik, tapi biayanya harus diperhitungkan.</li>
      </ul>
    `,
  },

  itn_choose: {
    title: "ITN - Alasan Memilih",
    content: `
      <ul>
        <li>Bidangnya masih nyambung sama teknologi dan teknik.</li>
        <li>Cocok kalau mau kampus yang lebih ke arah praktek.</li>
        <li>Peluang masuknya lumayan realistis.</li>
      </ul>
    `,
  },

  itn_not: {
    title: "ITN - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>PTS — biayanya harus dihitung lebih hati-hati.</li>
        <li>Harus pastiin ada beasiswa internal atau keringanan.</li>
        <li>Nggak jadi prioritas kalau biayanya belum aman.</li>
      </ul>
    `,
  },

  // =====================
  // BEASISWA
  // =====================

  kipk: {
    title: "KIP Kuliah",
    content: `
      <ul>
        <li>Prioritas 1: lewat jalur SNBP 2026.</li>
        <li>Daftar akun: 3 Feb – 31 Okt 2026.</li>
        <li>Seleksi SNBP: 3–18 Feb 2026 (sinkronisasi sebelum 17 Feb!).</li>
        <li>Ini yang paling pas buat tujuan kuliah tanpa biaya.</li>
      </ul>
    `,
  },

  kipk_docs: {
    title: "KIP Kuliah - Dokumen",
    content: `
      <ul>
        <li>KTP</li>
        <li>Kartu Keluarga</li>
        <li>NISN, NIK, NPSN</li>
        <li>Rapor / SKL / Ijazah</li>
        <li>SKTM / DTKS / KIP / KKS / PKH jika ada</li>
        <li>Surat penghasilan orang tua</li>
        <li>Foto rumah jika diminta</li>
        <li>Sertifikat prestasi lomba</li>
      </ul>
    `,
  },

  kipk_benefit: {
    title: "KIP Kuliah - Benefit",
    content: `
      <ul>
        <li>Biaya kuliah / UKT ditanggung.</li>
        <li>Ada bantuan biaya hidup juga.</li>
        <li>Keluarga nggak perlu terbebani.</li>
        <li>Jadi pondasi pembiayaan dari hari pertama kuliah.</li>
      </ul>
    `,
  },

  kipk_obligation: {
    title: "KIP Kuliah - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Harus tetap aktif jadi mahasiswa.</li>
        <li>Ikuti aturan kampus dan program KIP.</li>
        <li>Uangnya dipakai buat pendidikan, bukan yang lain.</li>
        <li>Jaga prestasi dan nggak nyalahgunakan bantuan.</li>
      </ul>
    `,
  },

  kipk_fit: {
    title: "KIP Kuliah - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Tujuan utama saya emang kuliah tanpa biaya.</li>
        <li>Saya punya portofolio lomba yang bisa jadi penguat.</li>
        <li>KIP Kuliah paling pas sama strategi pembiayaan awal saya.</li>
      </ul>
    `,
  },

  unggulan: {
    title: "Beasiswa Unggulan",
    content: `
      <ul>
        <li>Prioritas 2 — plan B kalau KIP nggak lolos.</li>
        <li>Timeline: kira-kira 15–29 Juli 2026 (cuma 2 minggu!).</li>
        <li>Dibukanya singkat banget, jadi harus siap dari jauh hari.</li>
        <li>Cocok buat profil yang punya prestasi.</li>
      </ul>
    `,
  },

  unggulan_docs: {
    title: "Beasiswa Unggulan - Dokumen",
    content: `
      <ul>
        <li>KTP</li>
        <li>Kartu Keluarga</li>
        <li>Ijazah / SKL</li>
        <li>Rapor atau transkrip</li>
        <li>Sertifikat prestasi</li>
        <li>Esai rencana studi</li>
        <li>Surat rekomendasi</li>
        <li>Surat pernyataan tidak menerima beasiswa lain</li>
      </ul>
    `,
  },

  unggulan_benefit: {
    title: "Beasiswa Unggulan - Benefit",
    content: `
      <ul>
        <li>Dapat bantuan biaya pendidikan.</li>
        <li>Jadi bukti kalau saya siswa berprestasi.</li>
        <li>Portofolio lomba jadi senjata utama di sini.</li>
        <li>Jaring pengaman kalau KIP nggak tembus.</li>
      </ul>
    `,
  },

  unggulan_obligation: {
    title: "Beasiswa Unggulan - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Prestasi akademik harus dijaga.</li>
        <li>Ada laporan yang harus dipenuhi.</li>
        <li>Nggak boleh terima beasiswa lain kalau aturannya ngelarang.</li>
        <li>Jalanin rencana studi dengan serius.</li>
      </ul>
    `,
  },

  unggulan_fit: {
    title: "Beasiswa Unggulan - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Saya punya prestasi lomba di bidang teknologi.</li>
        <li>Bisa jelasin rencana studi di TI/SI dengan meyakinkan.</li>
        <li>Beasiswa ini cocok sebagai jalur prestasi kalau KIP nggak lolos.</li>
      </ul>
    `,
  },

  bangkit: {
    title: "Beasiswa Bangkit",
    content: `
      <ul>
        <li>Prioritas 3 — kalau dua sebelumnya gagal.</li>
        <li>Daftar: 1 April – 31 Mei 2026.</li>
        <li>Seleksi Admin: 1–15 Juni 2026.</li>
        <li>Pengumuman: 16 Juni 2026.</li>
        <li>Masa sanggah: 17–18 Juni 2026.</li>
      </ul>
    `,
  },

  bangkit_docs: {
    title: "Beasiswa Bangkit - Dokumen",
    content: `
      <ul>
        <li>KTP</li>
        <li>Kartu Keluarga</li>
        <li>Dokumen akademik</li>
        <li>Sertifikat prestasi</li>
        <li>Esai / motivation letter jika diminta</li>
        <li>Surat rekomendasi jika diminta</li>
        <li>Bukti diterima / aktif kuliah jika diperlukan</li>
      </ul>
    `,
  },

  bangkit_benefit: {
    title: "Beasiswa Bangkit - Benefit",
    content: `
      <ul>
        <li>Jadi jaring pengaman kalau beasiswa utama gagal.</li>
        <li>Tetap bisa bantu biayain pendidikan.</li>
        <li>Nambah kekuatan rencana kuliah lewat prestasi.</li>
      </ul>
    `,
  },

  bangkit_obligation: {
    title: "Beasiswa Bangkit - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Penuhi syarat program yang berlaku.</li>
        <li>Ikuti seleksi administrasi dan verifikasi.</li>
        <li>Tetap komitmen sama akademik.</li>
        <li>Patuhi aturan penerima beasiswa.</li>
      </ul>
    `,
  },

  bangkit_fit: {
    title: "Beasiswa Bangkit - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Prestasi teknologi saya bisa jadi penguat.</li>
        <li>Beasiswa ini cocok sebagai bagian dari strategi berlapis saya.</li>
      </ul>
    `,
  },

  djarum: {
    title: "Djarum Beasiswa Plus",
    content: `
      <ul>
        <li>Target ini buat semester 4 nanti.</li>
        <li>Perkiraan: April 2028 (kalau masuk semester 1 Agustus 2026).</li>
        <li>Lebih cocok sebagai beasiswa lanjutan pas udah jadi mahasiswa.</li>
      </ul>
    `,
  },

  djarum_docs: {
    title: "Djarum - Dokumen",
    content: `
      <ul>
        <li>KTM</li>
        <li>KTP</li>
        <li>Transkrip / KHS</li>
        <li>Bukti IPK</li>
        <li>Bukti aktif organisasi</li>
        <li>Sertifikat prestasi</li>
        <li>Surat tidak sedang menerima beasiswa lain</li>
      </ul>
    `,
  },

  djarum_benefit: {
    title: "Djarum - Benefit",
    content: `
      <ul>
        <li>Dapat dana pendidikan.</li>
        <li>Ada pelatihan soft skill yang keren.</li>
        <li>Networking sama penerima beasiswa lain.</li>
        <li>Diajarin soal leadership, karakter, dan komunikasi.</li>
      </ul>
    `,
  },

  djarum_obligation: {
    title: "Djarum - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>IPK harus dijaga sesuai standar.</li>
        <li>Wajib ikut kegiatan pembinaan.</li>
        <li>Jaga nama baik program.</li>
        <li>Tetap aktif di organisasi atau kegiatan positif.</li>
      </ul>
    `,
  },

  djarum_fit: {
    title: "Djarum - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Setelah kuliah, saya nggak cuma mau berkembang secara akademik.</li>
        <li>Saya juga mau nguatin soft skill, relasi, dan leadership.</li>
        <li>Prestasi lomba bisa jadi modal awal buat nunjukin keaktifan.</li>
      </ul>
    `,
  },

  pertamina: {
    title: "Beasiswa Pemkab Sidoarjo",
    content: `
      <ul>
        <li>Program beasiswa dari Pemerintah Kabupaten Sidoarjo tahun 2026.</li>
        <li>Pendaftaran: 1 Februari – 28 Februari 2026.</li>
        <li>Daring melalui: <strong>beasiswasidoarjokab.id</strong>.</li>
        <li>Target bagi mahasiswa berprestasi asal Sidoarjo.</li>
      </ul>
    `,
  },

  pertamina_docs: {
    title: "Beasiswa Sidoarjo - Dokumen",
    content: `
      <ul>
        <li>KTP Sidoarjo & Kartu Keluarga</li>
        <li>Dokumen pendaftaran daring (Online)</li>
        <li>Transkrip nilai / Bukti prestasi lomba</li>
        <li>Surat aktif kuliah (jika sudah menempuh)</li>
        <li>Dokumen lain sesuai juknis di web resmi</li>
      </ul>
    `,
  },

  pertamina_benefit: {
    title: "Beasiswa Sidoarjo - Benefit",
    content: `
      <ul>
        <li>Bantuan dana pendidikan Rp5 juta per orang.</li>
        <li>Membantu biaya kuliah di perguruan tinggi.</li>
        <li>Dukungan finansial dari pemerintah daerah.</li>
        <li>Kekurangan: belum dipastikan cakupan UKT penuh.</li>
      </ul>
    `,
  },

  pertamina_obligation: {
    title: "Beasiswa Sidoarjo - Syarat Diterima",
    content: `
      <ul>
        <li>Mempertahankan prestasi akademik (IPK).</li>
        <li>Mematuhi aturan dari Pemkab Sidoarjo.</li>
        <li>Menggunakan bantuan untuk biaya pendidikan.</li>
        <li>Menyelesaikan studi sesuai target waktu.</li>
      </ul>
    `,
  },

  pertamina_fit: {
    title: "Beasiswa Sidoarjo - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Saya warga Sidoarjo dan memiliki prestasi lomba.</li>
        <li>Bantuan Rp5 juta sangat membantu biaya semester.</li>
        <li>Cocok sebagai strategi pembiayaan mandiri/daerah.</li>
        <li>Sesuai dengan domisili dan profil prestasi saya.</li>
      </ul>
    `,
  },

  pwnu: {
    title: "Beasiswa PWNU Jawa Timur",
    content: `
      <ul>
        <li>Resmi dibuka: 27 April 2026.</li>
        <li>Penutupan pendaftaran: 20 Mei 2026.</li>
        <li>Rangkaian seleksi & tahapan tes: 23 Mei 2026.</li>
        <li>Kesempatan emas melalui jaringan organisasi PWNU.</li>
      </ul>
    `,
  },

  // =====================
  // PRESTASI
  // =====================

  sertif1: {
    title: "LKS Dikmen Sidoarjo 2025",
    content: `
      <ul>
        <li>Bidang: Cyber Security.</li>
        <li>Hasil: Juara 3.</li>
        <li>Waktu: 18–21 Februari 2025.</li>
        <li>Dari sini saya mulai yakin bisa di bidang ini.</li>
      </ul>
    `,
  },

  sertif2: {
    title: "LKS Ma'arif Sidoarjo 2026",
    content: `
      <ul>
        <li>Bidang: Cloud Computing.</li>
        <li>Lokasi: Blitar.</li>
        <li>Hasil: Juara 3.</li>
        <li>Waktu: 16–18 Januari 2026.</li>
      </ul>
    `,
  },

  target: {
    title: "Target LKS Dikmen Sidoarjo 2026",
    content: `
      <ul>
        <li>Bidang: Cyber Security.</li>
        <li>Realistisnya: juara 2 dan lolos provinsi.</li>
        <li>Juara 1 kemungkinan besar dari Telkom — jadi saya incar posisi 2.</li>
        <li>Pembukaan: 6 Februari 2026.</li>
        <li>Lomba: 8–11 Februari 2026.</li>
      </ul>
    `,
  },
};

const cy = cytoscape({
  container: document.getElementById("diagram"),
  wheelSensitivity: 0.18,
  minZoom: 0.25,
  maxZoom: 3,
  elements: [
    // pusat
    { data: { id: "plan", label: "PLAN\n1 TAHUN", type: "center" }, position: { x: 100, y: 520 } },

    // group
    { data: { id: "kampus", label: "KAMPUS", type: "group" }, position: { x: 350, y: 170 } },
    { data: { id: "beasiswa", label: "BEASISWA", type: "group" }, position: { x: 350, y: 620 } },
    { data: { id: "prestasi", label: "PRESTASI", type: "group" }, position: { x: 350, y: 1120 } },

    // kampus
    { data: { id: "polinema", label: "POLINEMA\n85%", type: "campus" }, position: { x: 610, y: 40 } },
    { data: { id: "polinema_choose", label: "ALASAN\nMEMILIH", type: "sub-good" }, position: { x: 850, y: 10 } },
    { data: { id: "polinema_not", label: "ALASAN\nTIDAK", type: "sub-warn" }, position: { x: 850, y: 75 } },

    { data: { id: "um", label: "UM\n60%", type: "campus" }, position: { x: 610, y: 140 } },
    { data: { id: "um_choose", label: "ALASAN\nMEMILIH", type: "sub-good" }, position: { x: 850, y: 115 } },
    { data: { id: "um_not", label: "ALASAN\nTIDAK", type: "sub-warn" }, position: { x: 850, y: 175 } },

    { data: { id: "uin", label: "UIN\n55%", type: "campus" }, position: { x: 610, y: 240 } },
    { data: { id: "uin_choose", label: "ALASAN\nMEMILIH", type: "sub-good" }, position: { x: 850, y: 215 } },
    { data: { id: "uin_not", label: "ALASAN\nTIDAK", type: "sub-warn" }, position: { x: 850, y: 275 } },

    { data: { id: "ub", label: "UB\n75%", type: "campus" }, position: { x: 610, y: 340 } },
    { data: { id: "ub_choose", label: "ALASAN\nMEMILIH", type: "sub-good" }, position: { x: 850, y: 315 } },
    { data: { id: "ub_not", label: "ALASAN\nTIDAK", type: "sub-warn" }, position: { x: 850, y: 375 } },

    { data: { id: "umm", label: "UMM\n75%", type: "campus" }, position: { x: 610, y: 440 } },
    { data: { id: "umm_choose", label: "ALASAN\nMEMILIH", type: "sub-good" }, position: { x: 850, y: 415 } },
    { data: { id: "umm_not", label: "ALASAN\nTIDAK", type: "sub-warn" }, position: { x: 850, y: 475 } },

    { data: { id: "itn", label: "ITN\n75%", type: "campus" }, position: { x: 610, y: 540 } },
    { data: { id: "itn_choose", label: "ALASAN\nMEMILIH", type: "sub-good" }, position: { x: 850, y: 515 } },
    { data: { id: "itn_not", label: "ALASAN\nTIDAK", type: "sub-warn" }, position: { x: 850, y: 575 } },

    // beasiswa
    { data: { id: "kipk", label: "KIP\nKULIAH", type: "scholar" }, position: { x: 610, y: 660 } },
    { data: { id: "kipk_docs", label: "DOKUMEN", type: "sub-doc" }, position: { x: 850, y: 630 } },
    { data: { id: "kipk_benefit", label: "BENEFIT", type: "sub-benefit" }, position: { x: 1040, y: 630 } },
    { data: { id: "kipk_obligation", label: "SYARAT\nDITERIMA", type: "sub-rule" }, position: { x: 1230, y: 630 } },
    { data: { id: "kipk_fit", label: "KENAPA\nCOCOK", type: "sub-fit" }, position: { x: 1420, y: 630 } },

    { data: { id: "unggulan", label: "BEASISWA\nUNGGULAN", type: "scholar" }, position: { x: 610, y: 760 } },
    { data: { id: "unggulan_docs", label: "DOKUMEN", type: "sub-doc" }, position: { x: 850, y: 730 } },
    { data: { id: "unggulan_benefit", label: "BENEFIT", type: "sub-benefit" }, position: { x: 1040, y: 730 } },
    { data: { id: "unggulan_obligation", label: "SYARAT\nDITERIMA", type: "sub-rule" }, position: { x: 1230, y: 730 } },
    { data: { id: "unggulan_fit", label: "KENAPA\nCOCOK", type: "sub-fit" }, position: { x: 1420, y: 730 } },

    { data: { id: "bangkit", label: "BEASISWA\nBANGKIT", type: "scholar" }, position: { x: 610, y: 860 } },
    { data: { id: "bangkit_docs", label: "DOKUMEN", type: "sub-doc" }, position: { x: 850, y: 830 } },
    { data: { id: "bangkit_benefit", label: "BENEFIT", type: "sub-benefit" }, position: { x: 1040, y: 830 } },
    { data: { id: "bangkit_obligation", label: "SYARAT\nDITERIMA", type: "sub-rule" }, position: { x: 1230, y: 830 } },
    { data: { id: "bangkit_fit", label: "KENAPA\nCOCOK", type: "sub-fit" }, position: { x: 1420, y: 830 } },

    { data: { id: "pwnu", label: "BEASISWA\nPWNU JATIM", type: "scholar" }, position: { x: 610, y: 960 } },

    { data: { id: "djarum", label: "DJARUM", type: "scholar" }, position: { x: 610, y: 1060 } },
    { data: { id: "djarum_docs", label: "DOKUMEN", type: "sub-doc" }, position: { x: 850, y: 1030 } },
    { data: { id: "djarum_benefit", label: "BENEFIT", type: "sub-benefit" }, position: { x: 1040, y: 1030 } },
    { data: { id: "djarum_obligation", label: "SYARAT\nDITERIMA", type: "sub-rule" }, position: { x: 1230, y: 1030 } },
    { data: { id: "djarum_fit", label: "KENAPA\nCOCOK", type: "sub-fit" }, position: { x: 1420, y: 1030 } },

    // prestasi
    { data: { id: "sertif1", label: "LKS 2025\nCYBER", type: "cert" }, position: { x: 610, y: 1190 } },
    { data: { id: "sertif2", label: "LKS MAARIF\nCLOUD", type: "cert" }, position: { x: 810, y: 1190 } },
    { data: { id: "target", label: "TARGET\nLKS 2026", type: "target" }, position: { x: 1010, y: 1190 } },

    // edges utama
    { data: { source: "plan", target: "kampus", label: "pilihan" } },
    { data: { source: "plan", target: "beasiswa", label: "strategi" } },
    { data: { source: "plan", target: "prestasi", label: "penguat" } },

    // edges kampus
    { data: { source: "kampus", target: "polinema", label: "opsi" } },
    { data: { source: "polinema", target: "polinema_choose", label: "memilih" } },
    { data: { source: "polinema", target: "polinema_not", label: "tidak" } },

    { data: { source: "kampus", target: "um", label: "opsi" } },
    { data: { source: "um", target: "um_choose", label: "memilih" } },
    { data: { source: "um", target: "um_not", label: "tidak" } },

    { data: { source: "kampus", target: "uin", label: "opsi" } },
    { data: { source: "uin", target: "uin_choose", label: "memilih" } },
    { data: { source: "uin", target: "uin_not", label: "tidak" } },

    { data: { source: "kampus", target: "ub", label: "impian" } },
    { data: { source: "ub", target: "ub_choose", label: "memilih" } },
    { data: { source: "ub", target: "ub_not", label: "tidak" } },

    { data: { source: "kampus", target: "umm", label: "cadangan" } },
    { data: { source: "umm", target: "umm_choose", label: "memilih" } },
    { data: { source: "umm", target: "umm_not", label: "tidak" } },

    { data: { source: "kampus", target: "itn", label: "cadangan" } },
    { data: { source: "itn", target: "itn_choose", label: "memilih" } },
    { data: { source: "itn", target: "itn_not", label: "tidak" } },

    // edges beasiswa
    { data: { source: "beasiswa", target: "kipk", label: "prioritas 1" } },
    { data: { source: "kipk", target: "kipk_docs", label: "dokumen" } },
    { data: { source: "kipk", target: "kipk_benefit", label: "benefit" } },
    { data: { source: "kipk", target: "kipk_obligation", label: "syarat" } },
    { data: { source: "kipk", target: "kipk_fit", label: "cocok" } },

    { data: { source: "beasiswa", target: "unggulan", label: "prioritas 2" } },
    { data: { source: "unggulan", target: "unggulan_docs", label: "dokumen" } },
    { data: { source: "unggulan", target: "unggulan_benefit", label: "benefit" } },
    { data: { source: "unggulan", target: "unggulan_obligation", label: "syarat" } },
    { data: { source: "unggulan", target: "unggulan_fit", label: "cocok" } },

    { data: { source: "beasiswa", target: "bangkit", label: "prioritas 3" } },
    { data: { source: "bangkit", target: "bangkit_docs", label: "dokumen" } },
    { data: { source: "bangkit", target: "bangkit_benefit", label: "benefit" } },
    { data: { source: "bangkit", target: "bangkit_obligation", label: "syarat" } },
    { data: { source: "bangkit", target: "bangkit_fit", label: "cocok" } },

    { data: { source: "beasiswa", target: "pwnu", label: "lanjutan" } },
    { data: { source: "beasiswa", target: "djarum", label: "opsi terakhir" } },
    { data: { source: "djarum", target: "djarum_docs", label: "dokumen" } },
    { data: { source: "djarum", target: "djarum_benefit", label: "benefit" } },
    { data: { source: "djarum", target: "djarum_obligation", label: "syarat" } },
    { data: { source: "djarum", target: "djarum_fit", label: "cocok" } },

    // prestasi
    { data: { source: "prestasi", target: "sertif1", label: "sertifikat 1" } },
    { data: { source: "prestasi", target: "sertif2", label: "sertifikat 2" } },
    { data: { source: "prestasi", target: "target", label: "target" } },
    { data: { source: "sertif1", target: "unggulan", label: "penguat" } },
    { data: { source: "sertif2", target: "unggulan", label: "penguat" } },
    { data: { source: "target", target: "beasiswa", label: "menambah profil" } },
  ],

  style: [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "text-valign": "center",
        "text-halign": "center",
        "font-size": 10,
        "font-weight": 900,
        color: "#0f172a",
        "text-wrap": "wrap",
        "text-max-width": 110,
        "background-color": "#ffffff",
        "border-width": 2,
        "border-color": "#cbd5e1",
        width: 125,
        height: 54,
        shape: "round-rectangle",
      },
    },
    {
      selector: "node[type='center']",
      style: {
        "background-color": "#172554",
        color: "#ffffff",
        "border-color": "#38bdf8",
        width: 155,
        height: 76,
      },
    },
    {
      selector: "node[type='group']",
      style: {
        "background-color": "#eff6ff",
        "border-color": "#2563eb",
        color: "#1e3a8a",
        width: 130,
        height: 58,
      },
    },
    {
      selector: "node[type='campus']",
      style: {
        "background-color": "#f8fafc",
        "border-color": "#64748b",
        width: 120,
        height: 50,
      },
    },
    {
      selector: "node[type='scholar']",
      style: {
        "background-color": "#ecfeff",
        "border-color": "#0891b2",
        color: "#164e63",
        width: 135,
        height: 56,
      },
    },
    {
      selector: "node[type='cert']",
      style: {
        "background-color": "#f0fdf4",
        "border-color": "#16a34a",
        color: "#14532d",
        width: 130,
        height: 54,
      },
    },
    {
      selector: "node[type='target']",
      style: {
        "background-color": "#fff7ed",
        "border-color": "#f97316",
        color: "#7c2d12",
        width: 130,
        height: 54,
      },
    },
    {
      selector: "node[type='sub-good']",
      style: {
        "background-color": "#f0fdf4",
        "border-color": "#22c55e",
        color: "#166534",
        width: 135,
        height: 48,
      },
    },
    {
      selector: "node[type='sub-warn']",
      style: {
        "background-color": "#fff7ed",
        "border-color": "#fb923c",
        color: "#9a3412",
        width: 135,
        height: 48,
      },
    },
    {
      selector: "node[type='sub-doc']",
      style: {
        "background-color": "#eff6ff",
        "border-color": "#60a5fa",
        color: "#1d4ed8",
        width: 120,
        height: 45,
      },
    },
    {
      selector: "node[type='sub-benefit']",
      style: {
        "background-color": "#f0fdf4",
        "border-color": "#4ade80",
        color: "#166534",
        width: 120,
        height: 45,
      },
    },
    {
      selector: "node[type='sub-rule']",
      style: {
        "background-color": "#fff7ed",
        "border-color": "#fb923c",
        color: "#9a3412",
        width: 140,
        height: 48,
      },
    },
    {
      selector: "node[type='sub-fit']",
      style: {
        "background-color": "#f5f3ff",
        "border-color": "#a78bfa",
        color: "#6d28d9",
        width: 120,
        height: 45,
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "#94a3b8",
        "line-color": "#94a3b8",
        width: 2,
        label: "data(label)",
        "font-size": 8,
        "font-weight": 800,
        color: "#475569",
        "text-background-color": "#ffffff",
        "text-background-opacity": 1,
        "text-background-padding": 3,
        "text-rotation": "autorotate",
      },
    },
    {
      selector: ".selected-node",
      style: {
        "border-width": 5,
        "border-color": "#2563eb",
        "shadow-blur": 18,
        "shadow-color": "#60a5fa",
        "shadow-opacity": 0.42,
      },
    },
  ],

  layout: { name: "preset" },
});

cy.on("tap", "node", (event) => {
  cy.nodes().removeClass("selected-node");
  event.target.addClass("selected-node");

  const id = event.target.id();
  const detail = nodeDetails[id];

  if (detail) {
    document.getElementById("nodeDetail").innerHTML = `
      <h3>${detail.title}</h3>
      ${detail.content}
    `;
  } else {
    document.getElementById("nodeDetail").innerHTML = `
      <h3>${event.target.data("label")}</h3>
      <p>Detail belum ditambahkan.</p>
    `;
  }
});

cy.getElementById("plan").addClass("selected-node");

setTimeout(() => {
  cy.fit(undefined, 40);
}, 300);

document.querySelector("#zoomInBtn").addEventListener("click", () => {
  cy.zoom({
    level: cy.zoom() + 0.22,
    renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
  });
});

document.querySelector("#zoomOutBtn").addEventListener("click", () => {
  cy.zoom({
    level: cy.zoom() - 0.22,
    renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 },
  });
});

document.querySelector("#fitBtn").addEventListener("click", () => {
  cy.fit(undefined, 40);
});

document.querySelector("#printBtn").addEventListener("click", () => {
  window.print();
});

document.querySelector("#downloadDiagramBtn").addEventListener("click", () => {
  const png64 = cy.png({
    output: "blob-promise",
    bg: "#ffffff",
    full: true,
    scale: 2.5,
  });

  png64.then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "diagram-relasi-plan-1-tahun.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
});

const navLinks = Array.from(document.querySelectorAll(".bottom-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

window.addEventListener("scroll", () => {
  let current = "#home";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 160) {
      current = `#${section.id}`;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === current);
  });
});

const certificateModalElement = document.getElementById("certificatePreviewModal");
const certificatePreviewImage = document.getElementById("certificatePreviewImage");
const certificatePreviewTitle = document.getElementById("certificatePreviewTitle");

if (certificateModalElement && certificatePreviewImage && certificatePreviewTitle) {
  const certificateModal = new bootstrap.Modal(certificateModalElement);

  document.querySelectorAll(".cert-preview-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const imageSrc = button.dataset.certSrc;
      const imageTitle = button.dataset.certTitle;

      certificatePreviewImage.src = imageSrc;
      certificatePreviewTitle.textContent = imageTitle || "Preview Sertifikat";

      certificateModal.show();
    });
  });

  certificateModalElement.addEventListener("hidden.bs.modal", () => {
    certificatePreviewImage.src = "";
  });
}

const fullscreenDiagramBtn = document.querySelector("#fullscreenDiagramBtn");
const diagramCard = document.querySelector("#diagram-section .glass-card");

if (fullscreenDiagramBtn && diagramCard) {
  fullscreenDiagramBtn.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await diagramCard.requestFullscreen();
      diagramCard.classList.add("diagram-fullscreen-mode");

      setTimeout(() => {
        cy.resize();
        cy.fit(undefined, 40);
      }, 300);
    } else {
      await document.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      diagramCard.classList.remove("diagram-fullscreen-mode");
      setTimeout(() => {
        cy.resize();
        cy.fit(undefined, 40);
      }, 300);
    }
  });
}