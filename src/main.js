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
    "Pilihan utama saya adalah Teknik Informatika. Jika tersedia, pilihan kedua adalah Sistem Informasi karena masih relevan dengan teknologi, bisnis digital, dan pengembangan sistem.",
};

const campuses = [
  {
    name: "Polinema",
    type: "PTN / Vokasi",
    status: "Prioritas Realistis",
    tagClass: "tag-green",
    chance: 85,
    note: "Peluang paling realistis dan cocok dengan tujuan kuliah berbasis skill",
    risk: "Sedang",
    color: "#059669",
    majorFit: "Cocok untuk D4 bidang teknologi/informatika.",
    whyChoose: [
      "Lebih realistis dari sisi peluang dan kesiapan kerja.",
      "Cocok jika ingin cepat masuk dunia industri.",
      "Potensi lebih sejalan dengan tujuan membangun skill teknis.",
    ],
    whyNotMain: [
      "Perlu memastikan prodi yang benar-benar sesuai dengan target Teknik Informatika/Sistem Informasi.",
      "Perlu cek detail biaya dan peluang beasiswa.",
    ],
    decision: "Layak menjadi pilihan realistis utama.",
  },
  {
    name: "Universitas Negeri Malang",
    type: "PTN",
    status: "Alternatif Kuat",
    tagClass: "tag-blue",
    chance: 60,
    note: "Relatif stabil dan masih realistis",
    risk: "Sedang",
    color: "#2563eb",
    majorFit:
      "Ada Teknik Informatika, tetapi tidak ada Sistem Informasi sebagai pilihan kedua.",
    whyChoose: [
      "Masih termasuk PTN yang kuat dan realistis.",
      "Cocok jika tetap ingin mengambil jalur Teknik Informatika.",
      "Risiko pembiayaan relatif masih bisa dipertimbangkan.",
    ],
    whyNotMain: [
      "Pilihan jurusan kurang fleksibel karena fokusnya hanya Teknik Informatika.",
      "Tidak ada Sistem Informasi sebagai pilihan cadangan jurusan.",
      "Jika tidak masuk Teknik Informatika, opsi prodi yang sesuai menjadi lebih terbatas.",
    ],
    decision:
      "Tetap layak, tetapi tidak sefleksibel kampus yang punya pilihan Sistem Informasi.",
  },
  {
    name: "UIN Malang",
    type: "PTN Keagamaan",
    status: "Alternatif Realistis",
    tagClass: "tag-cyan",
    chance: 55,
    note: "Fleksibel, tetapi ada pertimbangan ma'had",
    risk: "Sedang",
    color: "#0891b2",
    majorFit: "Perlu memastikan prodi teknologi yang sesuai.",
    whyChoose: [
      "Masih menjadi alternatif PTN yang realistis.",
      "Lingkungan akademik cukup terstruktur.",
      "Bisa menjadi opsi jika pembiayaan dan jurusan sesuai.",
    ],
    whyNotMain: [
      "Ada kewajiban ma'had/asrama selama sekitar 1 tahun.",
      "Kewajiban asrama bisa membatasi fleksibilitas waktu.",
      "Saya ingin tetap membantu bisnis florist dan membangun bisnis dropshipper.",
    ],
    decision:
      "Dipertimbangkan, tetapi bukan prioritas karena kebutuhan waktu dan fleksibilitas.",
  },
  {
    name: "Universitas Brawijaya",
    type: "PTN",
    status: "Impian / Sangat Kompetitif",
    tagClass: "tag-red",
    chance: 35,
    note: "Kampus impian, tetapi persaingan sangat ketat",
    risk: "Tinggi",
    color: "#dc2626",
    majorFit:
      "Sangat menarik jika bisa masuk bidang teknologi/informatika.",
    whyChoose: [
      "UB adalah kampus impian saya.",
      "Reputasi kuat dan relasi luas.",
      "Lingkungan kompetitif bisa mendorong perkembangan diri.",
    ],
    whyNotMain: [
      "Persaingan SNBP sangat ketat, meskipun saya punya sertifikat.",
      "Saya belum mengetahui nilai rapor terbaru karena belum sempat ke sekolah.",
      "Saya sedang fokus bekerja, lomba berikutnya, dan membangun bisnis.",
      "Ada risiko biaya sosial/gaya hidup yang lebih tinggi jika harus mengikuti lingkungan pergaulan kampus.",
      "Jika uang saku KIP sekitar Rp5,8 juta per semester, biaya transport dan kebutuhan harian harus dihitung sangat ketat.",
    ],
    financeNote:
      "Estimasi: jika bensin PP ±Rp20.000/hari dan kuliah 22 hari/bulan, maka transport bisa ±Rp440.000/bulan atau ±Rp2.640.000/semester. Dari Rp5,8 juta/semester, sisa sekitar Rp3,16 juta untuk kebutuhan lain.",
    decision:
      "Tetap menjadi kampus impian, tetapi bukan pilihan paling aman secara peluang dan biaya hidup.",
  },
  {
    name: "UMM",
    type: "PTS",
    status: "Cadangan",
    tagClass: "tag-orange",
    chance: 75,
    note: "Peluang masuk lebih besar, tetapi biaya perlu dipastikan",
    risk: "Sedang-Tinggi",
    color: "#ea580c",
    majorFit:
      "Perlu cek jurusan Teknik Informatika/Sistem Informasi dan skema beasiswa.",
    whyChoose: [
      "Bisa menjadi opsi cadangan jika PTN tidak memungkinkan.",
      "Peluang masuk cenderung lebih besar.",
      "Tetap bisa dipertimbangkan jika ada beasiswa atau keringanan biaya.",
    ],
    whyNotMain: [
      "Karena PTS, risiko biaya lebih tinggi jika tidak mendapatkan beasiswa.",
      "Harus memastikan skema beasiswa internal atau keringanan biaya.",
      "Tidak boleh dipilih jika pembiayaan belum aman.",
    ],
    decision: "Cadangan jika ada beasiswa yang jelas.",
  },
  {
    name: "ITN Malang",
    type: "PTS",
    status: "Cadangan Teknis",
    tagClass: "tag-purple",
    chance: 75,
    note: "Cocok untuk bidang teknik/terapan, tetapi biaya perlu dipastikan",
    risk: "Sedang-Tinggi",
    color: "#7c3aed",
    majorFit: "Cocok jika ingin fokus teknologi/teknik.",
    whyChoose: [
      "Masih relevan dengan bidang teknologi dan teknik.",
      "Bisa menjadi opsi jika ingin kampus yang lebih terapan.",
      "Peluang masuk relatif lebih realistis.",
    ],
    whyNotMain: [
      "Status PTS membuat pembiayaan harus dihitung lebih hati-hati.",
      "Perlu memastikan beasiswa internal atau keringanan biaya.",
      "Bukan pilihan utama jika biaya belum aman.",
    ],
    decision: "Cadangan teknis jika ada dukungan biaya.",
  },
];

const scholarships = [
  {
    name: "KIP Kuliah",
    badge: "Prioritas 1",
    tagClass: "tag-blue",
    accent: "#2563eb",
    subtitle: "Pembiayaan awal kuliah",
    timeline: "Feb–Okt 2026",
    docs: [
      "KTP",
      "Kartu Keluarga",
      "NISN, NPSN, dan NIK",
      "Rapor / SKL / Ijazah",
      "SKTM / DTKS / KIP / KKS / PKH jika ada",
      "Surat penghasilan orang tua",
      "Foto rumah jika diminta",
      "Sertifikat prestasi lomba",
    ],
    benefits: [
      "Bantuan biaya pendidikan / UKT",
      "Bantuan biaya hidup sesuai ketentuan wilayah",
      "Membantu kuliah tanpa membebani keluarga",
      "Menjadi jalur pembiayaan utama sejak awal kuliah",
    ],
    obligations: [
      "Menjaga status akademik sebagai mahasiswa aktif",
      "Mengikuti ketentuan kampus dan program KIP Kuliah",
      "Menggunakan bantuan sesuai kebutuhan pendidikan",
      "Menjaga prestasi dan tidak menyalahgunakan bantuan",
    ],
  },
  {
    name: "Beasiswa Unggulan",
    badge: "Prioritas 2",
    tagClass: "tag-green",
    accent: "#059669",
    subtitle: "Alternatif berbasis prestasi",
    timeline: "Update resmi",
    docs: [
      "KTP",
      "Kartu Keluarga",
      "Ijazah / SKL",
      "Rapor atau transkrip",
      "Sertifikat prestasi",
      "Esai rencana studi",
      "Surat rekomendasi",
      "Surat pernyataan tidak menerima beasiswa lain",
    ],
    benefits: [
      "Bantuan biaya pendidikan",
      "Bisa memperkuat posisi sebagai siswa berprestasi",
      "Mendukung rencana kuliah dengan portofolio lomba",
      "Menjadi alternatif jika KIP Kuliah tidak lolos",
    ],
    obligations: [
      "Menjaga prestasi akademik",
      "Memenuhi laporan atau ketentuan penerima beasiswa",
      "Tidak menerima beasiswa lain jika aturannya melarang",
      "Menjalankan rencana studi dengan bertanggung jawab",
    ],
  },
  {
    name: "Beasiswa Bangkit",
    badge: "Prioritas 3",
    tagClass: "tag-cyan",
    accent: "#0891b2",
    subtitle: "Jika syarat sesuai",
    timeline: "Cek jadwal resmi",
    docs: [
      "KTP",
      "KK",
      "Dokumen akademik",
      "Sertifikat prestasi",
      "Esai atau motivation letter jika diminta",
      "Surat rekomendasi jika diminta",
      "Bukti diterima / aktif kuliah jika diperlukan",
    ],
    benefits: [
      "Menjadi opsi lanjutan jika beasiswa utama gagal",
      "Mendukung pembiayaan pendidikan",
      "Bisa memperkuat rencana kuliah berbasis prestasi",
    ],
    obligations: [
      "Memenuhi syarat program yang berlaku",
      "Mengikuti seleksi administrasi dan verifikasi",
      "Menjaga komitmen akademik",
      "Mematuhi aturan penerima beasiswa",
    ],
  },
  {
    name: "Djarum Beasiswa Plus",
    badge: "Saat Kuliah",
    tagClass: "tag-orange",
    accent: "#ea580c",
    subtitle: "Target setelah menjadi mahasiswa",
    timeline: "Target semester 4+",
    docs: [
      "KTM",
      "KTP",
      "Transkrip / KHS",
      "Bukti IPK",
      "Bukti aktif organisasi",
      "Sertifikat prestasi",
      "Surat tidak sedang menerima beasiswa lain",
    ],
    benefits: [
      "Bantuan dana pendidikan",
      "Pelatihan soft skill",
      "Networking dengan penerima beasiswa lain",
      "Pengembangan karakter, leadership, dan komunikasi",
    ],
    obligations: [
      "Menjaga IPK sesuai ketentuan",
      "Aktif mengikuti kegiatan pembinaan",
      "Menjaga nama baik program",
      "Tetap aktif dalam organisasi atau kegiatan positif",
    ],
  },
  {
    name: "Pertamina Sobat Bumi",
    badge: "Lanjutan",
    tagClass: "tag-purple",
    accent: "#7c3aed",
    subtitle: "Target prestasi dan kontribusi",
    timeline: "Update resmi",
    docs: [
      "KTP",
      "KTM",
      "Transkrip nilai",
      "Sertifikat prestasi",
      "Esai / motivation letter",
      "Proposal atau bukti kontribusi sosial/lingkungan jika diminta",
      "Dokumen pendukung kampus",
    ],
    benefits: [
      "Bantuan biaya pendidikan",
      "Pengembangan diri dan kontribusi sosial",
      "Meningkatkan portofolio sebagai mahasiswa aktif",
      "Cocok untuk target setelah mulai kuliah",
    ],
    obligations: [
      "Menjaga prestasi akademik",
      "Aktif dalam kegiatan sosial atau lingkungan",
      "Mengikuti program pembinaan jika ada",
      "Memenuhi laporan atau kewajiban penerima beasiswa",
    ],
  },
];

const mandiriSchedules = [
  {
    campus: "Universitas Brawijaya",
    short: "UB",
    badge: "SMUB",
    colorClass: "mandiri-red",
    note: "Perkiraan pribadi · cek ulang di selma.ub.ac.id",
    items: [
      "SMUB Rapor: 7–28 Mei 2026",
      "SMUB Nilai UTBK: 1–17 Juni 2026",
      "Fokus seleksi: nilai rapor dan nilai UTBK",
    ],
  },
  {
    campus: "UIN Malang",
    short: "UIN",
    badge: "Mandiri Tes",
    colorClass: "mandiri-cyan",
    note: "Perkiraan pribadi · cek ulang laman PMB UIN Malang",
    items: [
      "Pendaftaran: 6 April – 2 Juli 2026",
      "Seleksi Mandiri Tes: 7–9 Juli 2026",
      "Pengumuman: 15 Juli 2026",
    ],
  },
  {
    campus: "Universitas Negeri Malang",
    short: "UM",
    badge: "Mandiri UM",
    colorClass: "mandiri-blue",
    note: "Perkiraan pribadi · cek ulang di seleksi.um.ac.id",
    items: [
      "Mandiri Prestasi: 1 April – 20 Mei 2026",
      "Mandiri Leadership: 1 April – 29 Mei 2026",
      "Mandiri Skor UTBK-SNBT: 1 April – 29 Mei 2026",
      "Mandiri TMBK: 1 April – 3 Juni 2026",
      "Mandiri Kemitraan: 1 April – 29 Mei 2026",
      "Kelas Internasional Gel. 2: 7 April – 15 Juni 2026",
    ],
  },
  {
    campus: "Polinema",
    short: "Polinema",
    badge: "Mandiri",
    colorClass: "mandiri-green",
    note: "Perkiraan pribadi · cek ulang laman PMB Polinema",
    items: [
      "Mandiri Konsorsium: 23 April – 31 Mei 2026",
      "Tes CBT Konsorsium: 5–8 Juni 2026",
      "Pengumuman Konsorsium: 14 Juni 2026",
      "Daftar Ulang Konsorsium: 15–29 Juni 2026",
      "Mandiri Prestasi & Nilai UTBK: 21 April – 7 Juni 2026",
      "Seleksi Berkas: 8–10 Juni 2026",
      "Pengumuman: 12 Juni 2026",
      "Daftar Ulang: 15–20 Juni 2026",
    ],
  },
];

const competitionSchedules = [
  {
    title: "LKS Dikmen Sidoarjo 2025",
    field: "Cyber Security",
    result: "Juara 3",
    date: "18–21 Februari 2025",
    status: "Sudah Dilaksanakan",
    badgeClass: "tag-green",
    description:
      "Prestasi pertama yang menjadi bukti kemampuan di bidang cyber security.",
  },
  {
    title: "LKS Ma'arif Sidoarjo 2026",
    field: "Cloud Computing",
    result: "Juara 3",
    date: "16–18 Januari 2026",
    status: "Sudah Dilaksanakan",
    badgeClass: "tag-green",
    description:
      "Prestasi kedua di bidang cloud computing dan menjadi penguat portofolio teknologi.",
  },
  {
    title: "LKS Dikmen Sidoarjo 2026",
    field: "Cyber Security",
    result: "Target: lolos provinsi",
    date: "Pembukaan 6 Februari 2026 · Lomba 8–11 Februari 2026",
    status: "Target Berikutnya",
    badgeClass: "tag-orange",
    description:
      "Target realistis adalah juara 2 agar bisa lolos provinsi, karena juara 1 kemungkinan besar dari Telkom.",
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
            Lihat alasan memilih / tidak memilih
          </button>

          <div class="collapse mt-3" id="campus-${index}">
            <div class="reason-box choose">
              <div class="reason-title">
                <i class="bi bi-check-circle-fill"></i>
                Alasan dipertimbangkan
              </div>
              <ul>
                ${campus.whyChoose.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>

            <div class="reason-box not-choose">
              <div class="reason-title">
                <i class="bi bi-exclamation-circle-fill"></i>
                Alasan tidak menjadi prioritas utama
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
      Persentase = Estimasi Personal, bukan angka resmi kampus.
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
          Lihat dokumen, benefit, dan syarat setelah diterima
        </button>

        <div class="collapse mt-3" id="scholar-${index}">
          <div class="scholar-detail-box docs">
            <div class="scholar-detail-title">
              <i class="bi bi-folder-check"></i>
              Dokumen yang harus disiapkan
            </div>
            <ul>
              ${item.docs.map((doc) => `<li>${doc}</li>`).join("")}
            </ul>
          </div>

          <div class="scholar-detail-box benefits">
            <div class="scholar-detail-title">
              <i class="bi bi-gift-fill"></i>
              Benefit beasiswa
            </div>
            <ul>
              ${item.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
            </ul>
          </div>

          <div class="scholar-detail-box obligations">
            <div class="scholar-detail-title">
              <i class="bi bi-check2-circle"></i>
              Syarat yang dilakukan jika sudah diterima
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
        <li>Ini adalah tugas plan sebelum lomba dari Pak Isa Hamdan, S.Kom.</li>
        <li>Fokus utama: lomba, portofolio, pilihan kampus, dan strategi beasiswa.</li>
        <li>Tujuan utama: kuliah tanpa biaya atau dengan biaya seminimal mungkin.</li>
      </ul>
    `,
  },

  kampus: {
    title: "Peta Pilihan Kampus",
    content: `
      <ul>
        <li>Bagian ini menjelaskan alasan memilih dan tidak memilih setiap kampus.</li>
        <li>Persentase peluang adalah estimasi pribadi, bukan data resmi kampus.</li>
        <li>Jurusan utama: D4/S1 Teknik Informatika.</li>
        <li>Jurusan kedua: Sistem Informasi.</li>
      </ul>
    `,
  },

  beasiswa: {
    title: "Peta Strategi Beasiswa",
    content: `
      <ul>
        <li>Setiap beasiswa punya dokumen, benefit, syarat setelah diterima, dan alasan kecocokan.</li>
        <li>Urutan prioritas: KIP Kuliah → Beasiswa Unggulan → Beasiswa Bangkit → Djarum → Pertamina Sobat Bumi.</li>
      </ul>
    `,
  },

  prestasi: {
    title: "Peta Portofolio Prestasi",
    content: `
      <ul>
        <li>Prestasi digunakan untuk memperkuat peluang beasiswa.</li>
        <li>Sertifikat lomba menjadi bukti kemampuan di bidang teknologi.</li>
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
        <li>Status: prioritas realistis.</li>
        <li>Peluang masuk estimasi: <strong>85%</strong>.</li>
        <li>Cocok dengan arah vokasi, skill teknis, dan kesiapan kerja.</li>
      </ul>
    `,
  },

  polinema_choose: {
    title: "Polinema - Alasan Memilih",
    content: `
      <ul>
        <li>Peluang paling realistis menurut estimasi pribadi.</li>
        <li>Cocok untuk jalur vokasi dan bidang teknologi terapan.</li>
        <li>Lebih dekat dengan dunia industri dan skill kerja.</li>
        <li>Lebih masuk akal untuk strategi kuliah dengan pembiayaan aman.</li>
      </ul>
    `,
  },

  polinema_not: {
    title: "Polinema - Alasan Tidak Memilih Penuh",
    content: `
      <ul>
        <li>Masih perlu memastikan jurusan yang paling sesuai dengan target Teknik Informatika/Sistem Informasi.</li>
        <li>Masih perlu mengecek detail biaya, beasiswa, dan jalur mandiri.</li>
      </ul>
    `,
  },

  um: {
    title: "Universitas Negeri Malang",
    content: `
      <ul>
        <li>Status: alternatif kuat.</li>
        <li>Peluang masuk estimasi: <strong>60%</strong>.</li>
        <li>Masih realistis, tetapi pilihan jurusan kurang fleksibel.</li>
      </ul>
    `,
  },

  um_choose: {
    title: "UM - Alasan Memilih",
    content: `
      <ul>
        <li>Termasuk PTN yang kuat and masih realistis.</li>
        <li>Cocok jika tetap fokus ke Teknik Informatika.</li>
        <li>Risiko pembiayaan relatif masih bisa dipertimbangkan.</li>
      </ul>
    `,
  },

  um_not: {
    title: "UM - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Jurusan yang sesuai hanya Teknik Informatika.</li>
        <li>Tidak ada Sistem Informasi sebagai pilihan kedua.</li>
        <li>Jika tidak masuk Teknik Informatika, pilihan jurusan cadangan menjadi terbatas.</li>
      </ul>
    `,
  },

  uin: {
    title: "UIN Malang",
    content: `
      <ul>
        <li>Status: alternatif realistis.</li>
        <li>Peluang masuk estimasi: <strong>55%</strong>.</li>
        <li>Dipertimbangkan, tetapi ada pertimbangan ma'had/asrama.</li>
      </ul>
    `,
  },

  uin_choose: {
    title: "UIN Malang - Alasan Memilih",
    content: `
      <ul>
        <li>Masih termasuk alternatif PTN yang realistis.</li>
        <li>Lingkungan akademik cukup terstruktur.</li>
        <li>Bisa menjadi opsi jika jurusan and pembiayaan sesuai.</li>
      </ul>
    `,
  },

  uin_not: {
    title: "UIN Malang - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Ada kewajiban ma'had/asrama sekitar 1 tahun.</li>
        <li>Kewajiban asrama mengurangi fleksibilitas waktu dan ruang gerak.</li>
        <li>Saya ingin ruang yang lebih fleksibel untuk pengembangan diri dan rencana pribadi.</li>
      </ul>
    `,
  },

  ub: {
    title: "Universitas Brawijaya",
    content: `
      <ul>
        <li>Status: kampus impian.</li>
        <li>Peluang masuk estimasi: <strong>35%</strong>.</li>
        <li>Sangat menarik, tetapi persaingan sangat ketat.</li>
      </ul>
    `,
  },

  ub_choose: {
    title: "UB - Alasan Memilih",
    content: `
      <ul>
        <li>UB adalah kampus impian saya.</li>
        <li>Reputasi kuat and relasi luas.</li>
        <li>Lingkungan kompetitif bisa mendorong perkembangan diri.</li>
        <li>Cocok jika saya bisa masuk dengan pembiayaan yang aman.</li>
      </ul>
    `,
  },

  ub_not: {
    title: "UB - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Persaingan SNBP sangat ketat, meskipun saya memiliki sertifikat lomba.</li>
        <li>Saya belum mengetahui nilai rapor terbaru secara pasti.</li>
        <li>Perlu mempertimbangkan biaya sosial dan gaya hidup lingkungan kampus.</li>
        <li>Jika mengandalkan KIP Kuliah, pengeluaran harus dikontrol sangat ketat.</li>
      </ul>
    `,
  },

  umm: {
    title: "UMM",
    content: `
      <ul>
        <li>Status: cadangan.</li>
        <li>Peluang masuk estimasi: <strong>75%</strong>.</li>
        <li>Dipertimbangkan jika ada beasiswa atau keringanan biaya yang jelas.</li>
      </ul>
    `,
  },

  umm_choose: {
    title: "UMM - Alasan Memilih",
    content: `
      <ul>
        <li>Peluang masuk cenderung lebih besar.</li>
        <li>Bisa menjadi opsi cadangan jika PTN belum memungkinkan.</li>
        <li>Masih layak dipertimbangkan jika ada beasiswa internal.</li>
      </ul>
    `,
  },

  umm_not: {
    title: "UMM - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Karena PTS, risiko biaya lebih tinggi jika tanpa beasiswa.</li>
        <li>Harus ada kepastian beasiswa atau keringanan biaya.</li>
        <li>Tidak diprioritaskan jika pembiayaan belum aman.</li>
      </ul>
    `,
  },

  itn: {
    title: "ITN Malang",
    content: `
      <ul>
        <li>Status: cadangan teknis.</li>
        <li>Peluang masuk estimasi: <strong>75%</strong>.</li>
        <li>Cocok untuk bidang teknik/terapan, tetapi biaya tetap harus dihitung.</li>
      </ul>
    `,
  },

  itn_choose: {
    title: "ITN - Alasan Memilih",
    content: `
      <ul>
        <li>Masih relevan dengan bidang teknologi and teknik.</li>
        <li>Cocok sebagai opsi kampus yang lebih terapan.</li>
        <li>Peluang masuk relatif lebih realistis.</li>
      </ul>
    `,
  },

  itn_not: {
    title: "ITN - Alasan Tidak Memilih",
    content: `
      <ul>
        <li>Status PTS membuat pembiayaan harus diperhatikan lebih detail.</li>
        <li>Harus memastikan beasiswa internal atau keringanan biaya.</li>
        <li>Bukan prioritas jika biaya belum aman.</li>
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
        <li>Prioritas 1.</li>
        <li>Target utama untuk pembiayaan awal kuliah.</li>
        <li>Paling sesuai dengan tujuan kuliah tanpa biaya.</li>
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
        <li>Bantuan biaya pendidikan / UKT.</li>
        <li>Bantuan biaya hidup sesuai ketentuan.</li>
        <li>Membantu kuliah tanpa membebani keluarga.</li>
        <li>Menjadi jalur pembiayaan utama sejak awal kuliah.</li>
      </ul>
    `,
  },

  kipk_obligation: {
    title: "KIP Kuliah - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Menjadi mahasiswa aktif.</li>
        <li>Mematuhi aturan kampus and program KIP Kuliah.</li>
        <li>Menggunakan bantuan sesuai kebutuhan pendidikan.</li>
        <li>Menjaga prestasi and tidak menyalahgunakan bantuan.</li>
      </ul>
    `,
  },

  kipk_fit: {
    title: "KIP Kuliah - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Fokus utama saya adalah kuliah tanpa biaya.</li>
        <li>Saya punya portofolio lomba untuk memperkuat profil.</li>
        <li>KIP Kuliah paling sesuai dengan strategi pembiayaan awal saya.</li>
      </ul>
    `,
  },

  unggulan: {
    title: "Beasiswa Unggulan",
    content: `
      <ul>
        <li>Prioritas 2.</li>
        <li>Alternatif jika KIP Kuliah tidak lolos.</li>
        <li>Cocok untuk profil berbasis prestasi.</li>
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
        <li>Bantuan biaya pendidikan.</li>
        <li>Memperkuat posisi sebagai siswa berprestasi.</li>
        <li>Mendukung rencana kuliah melalui portofolio lomba.</li>
        <li>Menjadi alternatif jika KIP Kuliah tidak lolos.</li>
      </ul>
    `,
  },

  unggulan_obligation: {
    title: "Beasiswa Unggulan - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Menjaga prestasi akademik.</li>
        <li>Memenuhi laporan atau ketentuan penerima beasiswa.</li>
        <li>Tidak menerima beasiswa lain jika aturannya melarang.</li>
        <li>Menjalankan rencana studi dengan bertanggung jawab.</li>
      </ul>
    `,
  },

  unggulan_fit: {
    title: "Beasiswa Unggulan - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Saya memiliki prestasi lomba di bidang teknologi.</li>
        <li>Saya bisa menjelaskan rencana studi di bidang Teknik Informatika/Sistem Informasi.</li>
        <li>Beasiswa ini cocok sebagai jalur prestasi jika KIP tidak lolos.</li>
      </ul>
    `,
  },

  bangkit: {
    title: "Beasiswa Bangkit",
    content: `
      <ul>
        <li>Prioritas 3.</li>
        <li>Opsi lanjutan jika syarat sesuai.</li>
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
        <li>Menjadi opsi lanjutan jika beasiswa utama gagal.</li>
        <li>Mendukung pembiayaan pendidikan.</li>
        <li>Bisa memperkuat rencana kuliah berbasis prestasi.</li>
      </ul>
    `,
  },

  bangkit_obligation: {
    title: "Beasiswa Bangkit - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Memenuhi syarat program yang berlaku.</li>
        <li>Mengikuti seleksi administrasi and verifikasi.</li>
        <li>Menjaga komitmen akademik.</li>
        <li>Mematuhi aturan penerima beasiswa.</li>
      </ul>
    `,
  },

  bangkit_fit: {
    title: "Beasiswa Bangkit - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Saya memiliki prestasi teknologi yang bisa menjadi penguat.</li>
        <li>Beasiswa ini cocok sebagai bagian dari strategi cadangan berlapis.</li>
      </ul>
    `,
  },

  djarum: {
    title: "Djarum Beasiswa Plus",
    content: `
      <ul>
        <li>Target setelah menjadi mahasiswa.</li>
        <li>Lebih cocok sebagai beasiswa lanjutan saat sudah kuliah.</li>
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
        <li>Bantuan dana pendidikan.</li>
        <li>Pelatihan soft skill.</li>
        <li>Networking dengan penerima beasiswa lain.</li>
        <li>Pengembangan karakter, leadership, and komunikasi.</li>
      </ul>
    `,
  },

  djarum_obligation: {
    title: "Djarum - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Menjaga IPK sesuai ketentuan.</li>
        <li>Aktif mengikuti kegiatan pembinaan.</li>
        <li>Menjaga nama baik program.</li>
        <li>Aktif dalam organisasi atau kegiatan positif.</li>
      </ul>
    `,
  },

  djarum_fit: {
    title: "Djarum - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Setelah kuliah, saya ingin berkembang bukan hanya secara akademik.</li>
        <li>Saya ingin memperkuat soft skill, relasi, and leadership.</li>
        <li>Prestasi lomba bisa menjadi modal awal untuk menunjukkan keaktifan.</li>
      </ul>
    `,
  },

  pertamina: {
    title: "Pertamina Sobat Bumi",
    content: `
      <ul>
        <li>Target lanjutan setelah menjadi mahasiswa.</li>
        <li>Cocok jika sudah memiliki kontribusi sosial/lingkungan and prestasi.</li>
      </ul>
    `,
  },

  pertamina_docs: {
    title: "Pertamina Sobat Bumi - Dokumen",
    content: `
      <ul>
        <li>KTP</li>
        <li>KTM</li>
        <li>Transkrip nilai</li>
        <li>Sertifikat prestasi</li>
        <li>Esai / motivation letter</li>
        <li>Proposal atau bukti kontribusi sosial/lingkungan jika diminta</li>
        <li>Dokumen pendukung kampus</li>
      </ul>
    `,
  },

  pertamina_benefit: {
    title: "Pertamina Sobat Bumi - Benefit",
    content: `
      <ul>
        <li>Bantuan biaya pendidikan.</li>
        <li>Pengembangan diri and kontribusi sosial.</li>
        <li>Meningkatkan portofolio sebagai mahasiswa aktif.</li>
        <li>Cocok untuk target setelah mulai kuliah.</li>
      </ul>
    `,
  },

  pertamina_obligation: {
    title: "Pertamina Sobat Bumi - Syarat Setelah Diterima",
    content: `
      <ul>
        <li>Menjaga prestasi akademik.</li>
        <li>Aktif dalam kegiatan sosial atau lingkungan.</li>
        <li>Mengikuti program pembinaan jika ada.</li>
        <li>Memenuhi laporan atau kewajiban penerima beasiswa.</li>
      </ul>
    `,
  },

  pertamina_fit: {
    title: "Pertamina Sobat Bumi - Kenapa Saya Cocok",
    content: `
      <ul>
        <li>Beasiswa ini cocok sebagai target lanjutan ketika sudah menjadi mahasiswa aktif.</li>
        <li>Bisa memperkuat portofolio akademik, sosial, and kontribusi.</li>
        <li>Relevan jika saya ingin berkembang lebih luas setelah kuliah.</li>
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
        <li>Bidang lomba: Cyber Security.</li>
        <li>Hasil: Juara 3.</li>
        <li>Timeline: 18–21 Februari 2025.</li>
        <li>Digunakan untuk memperkuat portofolio beasiswa.</li>
      </ul>
    `,
  },

  sertif2: {
    title: "LKS Ma'arif Sidoarjo 2026",
    content: `
      <ul>
        <li>Bidang lomba: Cloud Computing.</li>
        <li>Lokasi: Blitar.</li>
        <li>Hasil: Juara 3.</li>
        <li>Timeline: 16–18 Januari 2026.</li>
      </ul>
    `,
  },

  target: {
    title: "Target LKS Dikmen Sidoarjo 2026",
    content: `
      <ul>
        <li>Bidang lomba: Cyber Security.</li>
        <li>Target realistis: Juara 2 and lolos provinsi.</li>
        <li>Catatan: juara 1 kemungkinan besar dari Telkom.</li>
        <li>Pembukaan: 6 Februari 2026.</li>
        <li>Perlombaan: 8–11 Februari 2026.</li>
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

    { data: { id: "ub", label: "UB\n35%", type: "campus" }, position: { x: 610, y: 340 } },
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

    { data: { id: "djarum", label: "DJARUM", type: "scholar" }, position: { x: 610, y: 960 } },
    { data: { id: "djarum_docs", label: "DOKUMEN", type: "sub-doc" }, position: { x: 850, y: 930 } },
    { data: { id: "djarum_benefit", label: "BENEFIT", type: "sub-benefit" }, position: { x: 1040, y: 930 } },
    { data: { id: "djarum_obligation", label: "SYARAT\nDITERIMA", type: "sub-rule" }, position: { x: 1230, y: 930 } },
    { data: { id: "djarum_fit", label: "KENAPA\nCOCOK", type: "sub-fit" }, position: { x: 1420, y: 930 } },

    { data: { id: "pertamina", label: "PERTAMINA\nSOBAT BUMI", type: "scholar" }, position: { x: 610, y: 1060 } },
    { data: { id: "pertamina_docs", label: "DOKUMEN", type: "sub-doc" }, position: { x: 850, y: 1030 } },
    { data: { id: "pertamina_benefit", label: "BENEFIT", type: "sub-benefit" }, position: { x: 1040, y: 1030 } },
    { data: { id: "pertamina_obligation", label: "SYARAT\nDITERIMA", type: "sub-rule" }, position: { x: 1230, y: 1030 } },
    { data: { id: "pertamina_fit", label: "KENAPA\nCOCOK", type: "sub-fit" }, position: { x: 1420, y: 1030 } },

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

    { data: { source: "beasiswa", target: "djarum", label: "lanjutan" } },
    { data: { source: "djarum", target: "djarum_docs", label: "dokumen" } },
    { data: { source: "djarum", target: "djarum_benefit", label: "benefit" } },
    { data: { source: "djarum", target: "djarum_obligation", label: "syarat" } },
    { data: { source: "djarum", target: "djarum_fit", label: "cocok" } },

    { data: { source: "beasiswa", target: "pertamina", label: "lanjutan" } },
    { data: { source: "pertamina", target: "pertamina_docs", label: "dokumen" } },
    { data: { source: "pertamina", target: "pertamina_benefit", label: "benefit" } },
    { data: { source: "pertamina", target: "pertamina_obligation", label: "syarat" } },
    { data: { source: "pertamina", target: "pertamina_fit", label: "cocok" } },

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