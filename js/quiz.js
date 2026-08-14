/* ==========================================================================
   DigiLearn - Quiz System (js/quiz.js)
   Phase 4.2.1: Interactive Quiz System with 3 Separate Difficulty Question Banks
   ========================================================================== */

// --- STATE MANAGEMENT ---
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let currentLevel = '';

// ==========================================================================
// 1. BANK SOAL LEVEL MUDAH (10 Soal - Hafalan & Pengenalan Dasar)
// ==========================================================================
const bankMudah = [
  {
    id: 1,
    question: "CPU (Processor) berfungsi sebagai?",
    options: ["Perangkat input suara", "Otak pemroses data utama komputer", "Tempat menyimpan listrik", "Kipas pendingin casing"],
    answer: 1 // B
  },
  {
    id: 2,
    question: "RAM (Random Access Memory) digunakan untuk?",
    options: ["Menyimpan data secara permanen", "Menampilkan gambar di monitor", "Menyimpan data sementara saat komputer aktif", "Menghubungkan jaringan Wi-Fi"],
    answer: 2 // C
  },
  {
    id: 3,
    question: "Apa kepanjangan dari SSD?",
    options: ["Super Speed Disk", "Solid State Drive", "System Software Drive", "System Storage Device"],
    answer: 1 // B
  },
  {
    id: 4,
    question: "Perangkat yang digunakan untuk menampilkan gambar visual di layar adalah?",
    options: ["Mouse", "Keyboard", "Monitor", "Speaker"],
    answer: 2 // C
  },
  {
    id: 5,
    question: "Perangkat input yang digunakan untuk menggerakkan kursor penunjuk di layar adalah?",
    options: ["Mouse", "Monitor", "Heatsink", "PSU"],
    answer: 0 // A
  },
  {
    id: 6,
    question: "Router pada jaringan internet berfungsi untuk?",
    options: ["Memproses grafik game 3D", "Membagi dan mengarahkan koneksi jaringan", "Mengetik teks dokumen", "Menyimpan file video"],
    answer: 1 // B
  },
  {
    id: 7,
    question: "Perangkat lunak yang digunakan untuk membuka dan menjelajahi halaman situs web adalah?",
    options: ["Browser Web", "Antivirus", "Media Player", "Microsoft Excel"],
    answer: 0 // A
  },
  {
    id: 8,
    question: "Apa yang dimaksud dengan Sistem Operasi (OS)?",
    options: ["Aplikasi pengolah gambar", "Software utama pengelola hardware dan aplikasi", "Kabel penyambung monitor", "Kipas pendingin processor"],
    answer: 1 // B
  },
  {
    id: 9,
    question: "Perangkat keras yang berfungsi menyuplai daya listrik ke seluruh bagian komputer adalah?",
    options: ["CPU", "PSU (Power Supply Unit)", "RAM", "Casing"],
    answer: 1 // B
  },
  {
    id: 10,
    question: "Perangkat input yang terdiri dari susunan tombol huruf dan angka untuk mengetik adalah?",
    options: ["Mouse", "Keyboard", "Monitor", "Router"],
    answer: 1 // B
  }
];

// ==========================================================================
// 2. BANK SOAL LEVEL SEDANG (15 Soal - Pemahaman Konsep & Hubungan Komponen)
// ==========================================================================
const bankSedang = [
  {
    id: 1,
    question: "Mengapa RAM sangat penting saat Anda membuka banyak aplikasi sekaligus (multitasking)?",
    options: [
      "Karena RAM meningkatkan daya listrik komputer",
      "Karena RAM menyediakan ruang kerja sementara berkecepatan tinggi bagi CPU",
      "Karena RAM dapat menyimpan file selamanya meskipun listrik padam",
      "Karena RAM mempercepat koneksi internet Wi-Fi"
    ],
    answer: 1 // B
  },
  {
    id: 2,
    question: "Apa perbedaan utama antara SSD dan HDD tradisional?",
    options: [
      "HDD menggunakan chip flash, SSD menggunakan piringan cakram",
      "SSD menggunakan chip memori tanpa komponen bergerak sehingga jauh lebih cepat",
      "HDD tidak memerlukan listrik untuk bekerja",
      "SSD lebih lambat dibandingkan HDD"
    ],
    answer: 1 // B
  },
  {
    id: 3,
    question: "Mengapa komputer tetap membutuhkan Motherboard meskipun sudah ada CPU dan RAM?",
    options: [
      "Sebagai tempat menyimpan file sistem operasi",
      "Sebagai papan sirkuit utama yang menghubungkan dan mengoordinasikan seluruh komponen",
      "Untuk pendingin udara processor",
      "Untuk memancarkan gelombang Wi-Fi"
    ],
    answer: 1 // B
  },
  {
    id: 4,
    question: "Mengapa Web Browser membutuhkan koneksi jaringan Internet atau LAN?",
    options: [
      "Untuk memproses kartu grafis 3D",
      "Untuk mengunduh dan mengambil data halaman web dari server tujuan",
      "Agar keyboard dapat mengetik huruf",
      "Untuk mendinginkan suhu CPU"
    ],
    answer: 1 // B
  },
  {
    id: 5,
    question: "Bagaimana hubungan antara CPU dan RAM saat Anda membuka aplikasi baru?",
    options: [
      "CPU menyalin data aplikasi dari media penyimpanan ke RAM untuk diakses secara instan",
      "RAM mematikan daya listrik ke CPU",
      "CPU menghapus data dari RAM secara otomatis",
      "RAM menggantikan fungsi layar monitor"
    ],
    answer: 0 // A
  },
  {
    id: 6,
    question: "Apa fungsi utama sistem DNS (Domain Name System) dalam jaringan internet?",
    options: [
      "Menerjemahkan nama domain (seperti google.com) menjadi Alamat IP angka yang dimengerti komputer",
      "Mencegah virus masuk ke harddisk",
      "Meningkatkan daya listrik router",
      "Mengompres ukuran file video"
    ],
    answer: 0 // A
  },
  {
    id: 7,
    question: "Mengapa PSU (Power Supply Unit) berkualitas sangat penting bagi keselamatan komputer?",
    options: [
      "Agar komputer dapat terhubung ke jaringan tanpa kabel",
      "Mengubah arus AC menjadi DC yang stabil dan melindungi hardware dari lonjakan listrik",
      "Agar monitor menampilkan warna lebih tajam",
      "Untuk menambah kapasitas RAM"
    ],
    answer: 1 // B
  },
  {
    id: 8,
    question: "Apa manfaat GPU (Graphics Processing Unit) selain untuk bermain game 3D?",
    options: [
      "Mengolah rendering video 4K, desain grafis, dan pemrosesan komputasi AI",
      "Menyimpan file dokumen teks Word",
      "Menggantikan kabel power listrik",
      "Mempercepat koneksi kabel SATA"
    ],
    answer: 0 // A
  },
  {
    id: 9,
    question: "Mengapa koneksi Wi-Fi membutuhkan perangkat Router atau Access Point?",
    options: [
      "Untuk mengubah sinyal data digital menjadi gelombang radio nirkabel",
      "Untuk mencetak dokumen ke kertas",
      "Untuk mendinginkan casing komputer",
      "Untuk membersihkan virus di laptop"
    ],
    answer: 0 // A
  },
  {
    id: 10,
    question: "Apa risiko terbesar jika komputer yang sering terhubung internet tidak memiliki Antivirus?",
    options: [
      "Layar monitor otomatis meredup",
      "Rentan terkena malware, pencurian data pribadi, dan infeksi virus perusak sistem",
      "Kapasitas RAM berkurang secara fisik",
      "Tombol keyboard tidak bisa ditekan"
    ],
    answer: 1 // B
  },
  {
    id: 11,
    question: "Mengapa Microsoft Excel menggunakan format kolom dan baris (Cell)?",
    options: [
      "Memudahkan pencatatan data terstruktur dan eksekusi rumus kalkulasi otomatis",
      "Khusus untuk memutar video klip musik",
      "Untuk mengatur tata letak pencetakan buku",
      "Agar file bisa dibuka tanpa Sistem Operasi"
    ],
    answer: 0 // A
  },
  {
    id: 12,
    question: "Apa peran utama Heatsink / CPU Cooler saat komputer bekerja berat?",
    options: [
      "Menambah kecepatan RAM",
      "Menyerap dan membuang panas ekstrem agar CPU tidak mengalami overheat (suhu berlebih)",
      "Mengisi daya baterai laptop",
      "Menghubungkan harddisk ke motherboard"
    ],
    answer: 1 // B
  },
  {
    id: 13,
    question: "Mengapa aplikasi pemutar media (Media Player) membutuhkan modul Codec?",
    options: [
      "Untuk mendekompresi dan menerjemahkan format berkas video/audio digital",
      "Untuk menyambungkan kabel listrik",
      "Untuk mengganti nama domain web",
      "Untuk menyalakan kipas casing"
    ],
    answer: 0 // A
  },
  {
    id: 14,
    question: "Apa keunggulan utama SSD jenis NVMe dibanding SSD SATA biasa?",
    options: [
      "Menggunakan kabel listrik lebih panjang",
      "Menggunakan jalur bus PCIe sehingga kecepatan transfer data jauh lebih tinggi",
      "Ukurannya lebih besar dari harddisk",
      "Harganya paling murah di pasaran"
    ],
    answer: 1 // B
  },
  {
    id: 15,
    question: "Mengapa fitur Screen Sharing pada Aplikasi Komunikasi (seperti Zoom) sangat berguna?",
    options: [
      "Memungkinkan peserta lain melihat tampilan layar komputer kita secara real-time",
      "Mempercepat proses booting Windows",
      "Menghapus virus dari komputer lawan",
      "Mematikan koneksi internet pengguna lain"
    ],
    answer: 0 // A
  }
];

// ==========================================================================
// 3. BANK SOAL LEVEL SULIT (20 Soal - Analisis, Penerapan Konsep & Studi Kasus)
// ==========================================================================
const bankSulit = [
  {
    id: 1,
    question: "[Studi Kasus] Seorang desainer membuka Photoshop, Chrome dengan 20 tab, Spotify, dan Zoom sekaligus. Komputer terasa sangat lambat (lagging) saat berpindah aplikasi. Komponen manakah yang paling berpengaruh terhadap kelancaran multitasking ini?",
    options: ["RAM", "Monitor", "Keyboard", "Casing"],
    answer: 0 // A
  },
  {
    id: 2,
    question: "[Studi Kasus] Sebuah situs dapat diakses jika mengetikkan alamat IP (142.250.190.46), tetapi gagal diakses jika mengetikkan nama domain (google.com). Layanan jaringan apakah yang kemungkinan bermasalah?",
    options: ["DNS (Domain Name System)", "GPU", "SSD", "PSU"],
    answer: 0 // A
  },
  {
    id: 3,
    question: "[Studi Kasus] Komputer mati secara mendadak saat digunakan merender video berat, lalu bisa dinyalakan kembali setelah dingin. Penyebab paling mungkin adalah?",
    options: [
      "CPU overheat akibat Heatsink/Cooler tidak bekerja optimal",
      "Kabel SATA longgar",
      "Tetikus (mouse) rusak",
      "Browser web belum diperbarui"
    ],
    answer: 0 // A
  },
  {
    id: 4,
    question: "[Studi Kasus] Sebuah game 3D berjalan dengan frame rate sangat rendah (patah-patah), padahal penggunaan CPU baru 30% dan RAM masih tersisa banyak. Komponen manakah yang menjadi kendala utama (bottleneck)?",
    options: ["GPU (Kartu Grafis)", "Router Wi-Fi", "Soundcard", "Kabel SATA"],
    answer: 0 // A
  },
  {
    id: 5,
    question: "[Studi Kasus] Komputer menyala (kipas berputar dan lampu hidup), tetapi layar monitor menampilkan pesan 'No Signal'. Langkah pengecekan kabel manakah yang tepat?",
    options: [
      "Memeriksa kabel HDMI/DisplayPort antara GPU/Motherboard ke Monitor",
      "Mengganti kabel SATA harddisk",
      "Melepas kabel keyboard USB",
      "Memeriksa kabel UTP di router"
    ],
    answer: 0 // A
  },
  {
    id: 6,
    question: "[Studi Kasus] Pengguna mengeluhkan waktu booting masuk ke Windows membutuhkan waktu lebih dari 3 menit pada HDD tua. Solusi upgrade penyimpanan yang paling efektif adalah?",
    options: ["Mengganti HDD utama menjadi SSD", "Menambah kapasitas HDD", "Membeli flashdisk baru", "Mengganti casing PC"],
    answer: 0 // A
  },
  {
    id: 7,
    question: "[Studi Kasus] Di sebuah kantor, laptop terhubung ke Wi-Fi tetapi muncul ikon 'No Internet Connection'. Perangkat jaringan manakah yang paling mungkin mengalami gangguan jalur ISP?",
    options: ["Router / Modem Jaringan", "Mouse nirkabel", "Heatsink CPU", "Kartu GPU"],
    answer: 0 // A
  },
  {
    id: 8,
    question: "[Studi Kasus] Saat membuat laporan anggaran perusahaan yang rumit dengan puluhan ribu baris data, rumus otomatis mana pada Microsoft Excel yang paling efisien untuk menjumlahkan data?",
    options: ["Rumus =SUM()", "Rumus =AVERAGE()", "Rumus =COUNT()", "Rumus =IF()"],
    answer: 0 // A
  },
  {
    id: 9,
    question: "[Studi Kasus] Sebuah file penting terinfeksi ransomware dan terkunci. Tindakan pencegahan terbaik di masa depan untuk mengamankan dokumen adalah?",
    options: [
      "Rutin melakukan backup data ke drive eksternal/cloud dan mengaktifkan Antivirus",
      "Mematikan layar monitor setiap jam",
      "Mengganti tombol keyboard",
      "Menambah kecepatan kipas PSU"
    ],
    answer: 0 // A
  },
  {
    id: 10,
    question: "[Studi Kasus] Sinyal Wi-Fi di kamar belakang terasa sangat lemah dan sering terputus dibanding di ruang tamu tempat router berada. Penyebab utamanya adalah?",
    options: [
      "Gelombang radio Wi-Fi terhalang dinding tebal dan melemah akibat jarak",
      "Kapasitas RAM laptop kurang",
      "Resolusi monitor terlalu tinggi",
      "Kabel SATA rusak"
    ],
    answer: 0 // A
  },
  {
    id: 11,
    question: "[Analisis] Mengapa memasang dua aplikasi Antivirus sekaligus dengan fitur Real-time Protection aktif dapat membuat sistem komputer menjadi sangat lambat?",
    options: [
      "Kedua antivirus bentrok memperebutkan akses pemindaian file yang sama secara bersamaan",
      "Antivirus merusak piringan harddisk secara fisik",
      "Daya listrik PSU terbagi dua",
      "Resolusi layar monitor berkurang"
    ],
    answer: 0 // A
  },
  {
    id: 12,
    question: "[Analisis] Manakah dari skenario berikut yang menunjukkan kegunaan utama fitur Mail Merge pada Microsoft Word?",
    options: [
      "Membuat 100 surat undangan dengan nama dan alamat penerima yang berbeda secara otomatis",
      "Memutar 100 lagu MP3 berturut-turut",
      "Menghitung rata-rata nilai ujian siswa",
      "Mengedit grafik video 3D"
    ],
    answer: 0 // A
  },
  {
    id: 13,
    question: "[Analisis] Apa yang akan terjadi jika nilai Watt dari Power Supply Unit (PSU) lebih kecil dari total kebutuhan daya listrik seluruh komponen PC saat beban penuh?",
    options: [
      "Komputer mati mendadak, restart sendiri, atau PSU mengalami kerusakan akibat beban berlebih",
      "Kecepatan internet Wi-Fi otomatis menurun",
      "Tampilan font Microsoft Word berubah",
      "Kapasitas SSD meningkat"
    ],
    answer: 0 // A
  },
  {
    id: 14,
    question: "[Analisis] Mengapa data pada RAM terhapus saat komputer dimatikan, sedangkan data pada SSD tetap tersimpan utuh?",
    options: [
      "RAM menggunakan teknologi memori volatile, sedangkan SSD bersifat non-volatile",
      "RAM terbuat dari piringan magnetik",
      "SSD dihubungkan langsung ke colokan listrik dinding",
      "RAM tidak memiliki sirkuit elektronik"
    ],
    answer: 0 // A
  },
  {
    id: 15,
    question: "[Analisis] Dalam arsitektur komputer, apa peran utama dari jalur PCIe (Peripheral Component Interconnect Express) pada Motherboard?",
    options: [
      "Jalur komunikasi data seri berkecepatan tinggi untuk komponen seperti GPU dan SSD NVMe",
      "Kabel daya listrik dari stopkontak PLN",
      "Saluran pendingin air untuk CPU",
      "Port untuk colokan audio headphone"
    ],
    answer: 0 // A
  },
  {
    id: 16,
    question: "[Analisis] Mengapa format dokumen presentasi (.pptx) lebih disukai daripada dokumen teks (.docx) saat melakukan pemaparan di depan umum?",
    options: [
      "Tampilan slide PowerPoint lebih terstruktur untuk poin-poin penting visual dan grafik",
      "Ukuran berkas PowerPoint selalu lebih kecil",
      "Dokumen Word tidak bisa dibuka di proyektor",
      "PowerPoint tidak memerlukan Sistem Operasi"
    ],
    answer: 0 // A
  },
  {
    id: 17,
    question: "[Studi Kasus] Seorang editor video mendapati proses ekspor video 4K memerlukan waktu sangat lama. Kombinasi dua komponen mana yang paling berpengaruh untuk mempercepat proses ekspor tersebut?",
    options: [
      "CPU berkecepatan tinggi (banyak core) dan GPU dengan VRAM besar",
      "Mouse gaming dan Keyboard mekanikal",
      "Monitor besar dan Casing transparan",
      "Router Wi-Fi dan Kabel SATA"
    ],
    answer: 0 // A
  },
  {
    id: 18,
    question: "[Analisis] Apa perbedaan mendasar antara alamat IP Publik (Public IP) dan alamat IP Lokal (Private IP)?",
    options: [
      "IP Publik digunakan di internet global, sedangkan IP Lokal digunakan di jaringan internal rumah/kantor",
      "IP Publik berupa teks, IP Lokal berupa gambar",
      "IP Lokal hanya ada di komputer Apple",
      "IP Publik tidak membutuhkan Router"
    ],
    answer: 0 // A
  },
  {
    id: 19,
    question: "[Analisis] Mengapa penting untuk memilih format file video MP4 (H.264/HEVC) saat ingin membagikan video di internet?",
    options: [
      "Memberikan kompresi ukuran berkas yang efisien dengan kualitas gambar yang tetap jernih",
      "Menghilangkan suara dalam video secara otomatis",
      "Mencegah video ditonton di ponsel",
      "Membuat video berputar tanpa menggunakan Media Player"
    ],
    answer: 0 // A
  },
  {
    id: 20,
    question: "[Studi Kasus] Pengguna mengalami kendala di mana halaman web tertentu sering menampilkan pesan 'Connection Timed Out', tetapi aplikasi Zoom dan game online tetap lancar. Langkah penanganan pertama pada peramban (Browser) adalah?",
    options: [
      "Membersihkan cache, cookies, atau mencoba mengganti DNS server",
      "Membongkar dan mengganti CPU",
      "Menghapus Sistem Operasi Windows",
      "Membeli monitor baru"
    ],
    answer: 0 // A
  }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderQuizHistory();
});

// --- CORE QUIZ LOGIC ---

/**
 * Memulai Kuis berdasarkan level terpilih
 */
function startQuiz(level) {
  currentLevel = level;
  currentQuestionIndex = 0;
  
  // Pilih Bank Soal yang Terpisah Total
  if (level === 'mudah') {
    currentQuestions = bankMudah;
  } else if (level === 'sedang') {
    currentQuestions = bankSedang;
  } else if (level === 'sulit') {
    currentQuestions = bankSulit;
  } else {
    currentQuestions = bankMudah;
  }

  // Inisialisasi array jawaban user dengan null sesuai jumlah soal bank terpilih
  userAnswers = new Array(currentQuestions.length).fill(null);

  // Tampilan UI: Sembunyikan Pilihan Level & Hasil, Munculkan Area Soal
  document.getElementById('quiz-level-section').style.display = 'none';
  document.getElementById('quiz-result-section').style.display = 'none';
  document.getElementById('quiz-area-section').style.display = 'block';

  // Badge Level
  const badge = document.getElementById('quiz-level-badge');
  badge.textContent = level.toUpperCase();
  badge.className = 'badge';
  if (level === 'mudah') badge.classList.add('bg-success');
  if (level === 'sedang') badge.classList.add('bg-primary');
  if (level === 'sulit') badge.classList.add('bg-danger');

  renderQuestion();
}

/**
 * Merender soal & pilihan jawaban yang sedang aktif
 */
function renderQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  
  // Update Teks Info Soal
  document.getElementById('quiz-question-number').textContent = `Soal ${currentQuestionIndex + 1} dari ${currentQuestions.length}`;
  document.getElementById('quiz-question-text').textContent = q.question;

  // Update Progress Bar (Soal 1 dari 20 = 5%, 10/20 = 50%, 20/20 = 100%)
  const progressPercent = Math.round(((currentQuestionIndex + 1) / currentQuestions.length) * 100);
  const progressBar = document.getElementById('quiz-progress-bar');
  progressBar.style.width = `${progressPercent}%`;
  progressBar.textContent = `${progressPercent}%`;
  progressBar.setAttribute('aria-valuenow', progressPercent);

  // Render Opsi Jawaban
  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = ''; // Reset container

  const selectedIdx = userAnswers[currentQuestionIndex];

  q.options.forEach((optText, index) => {
    const isSelected = selectedIdx === index;
    
    // Kelas styling kartu opsi
    const cardClass = isSelected
      ? 'quiz-option-card w-100 p-3 border border-3 border-success rounded-3 d-flex align-items-center bg-success text-white shadow-sm'
      : 'quiz-option-card w-100 p-3 border border-2 border-dark rounded-3 d-flex align-items-center bg-white text-dark';

    const div = document.createElement('div');
    div.className = 'mb-2';
    div.innerHTML = `
      <div class="${cardClass}" onclick="selectOption(${index})" style="cursor: pointer; transition: all 0.15s ease;">
        <input class="form-check-input me-3 mt-0" type="radio" name="answer" value="${index}" ${isSelected ? 'checked' : ''} style="transform: scale(1.4); pointer-events: none;">
        <span class="fw-bold me-2" style="font-size: 1.1rem;">${String.fromCharCode(65 + index)}.</span>
        <span class="fw-medium">${optText}</span>
      </div>
    `;
    optionsContainer.appendChild(div);
  });

  // Tombol Navigasi
  const btnPrev = document.getElementById('btn-prev-question');
  const btnNext = document.getElementById('btn-next-question');

  // Disable Tombol Sebelum pada soal 1
  btnPrev.disabled = currentQuestionIndex === 0;

  // Ubah teks tombol Selanjutnya pada soal terakhir
  if (currentQuestionIndex === currentQuestions.length - 1) {
    btnNext.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Selesai';
    btnNext.className = 'btn btn-primary px-4 fw-bold';
  } else {
    btnNext.innerHTML = 'Selanjutnya <i class="bi bi-arrow-right ms-1"></i>';
    btnNext.className = 'btn btn-pixel-green px-4 fw-bold';
  }
}

/**
 * Memilih opsi jawaban (dipanggil saat card diklik)
 */
function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  console.log("Current User Answers Array:", userAnswers);

  // Update UI Kartu Jawaban secara langsung
  const container = document.getElementById('quiz-options-container');
  const cards = container.querySelectorAll('.quiz-option-card');

  cards.forEach((card, i) => {
    const radio = card.querySelector('input[type="radio"]');
    if (i === index) {
      card.className = 'quiz-option-card w-100 p-3 border border-3 border-success rounded-3 d-flex align-items-center bg-success text-white shadow-sm';
      if (radio) radio.checked = true;
    } else {
      card.className = 'quiz-option-card w-100 p-3 border border-2 border-dark rounded-3 d-flex align-items-center bg-white text-dark';
      if (radio) radio.checked = false;
    }
  });
}

/**
 * Lanjut ke Soal Berikutnya (dengan validasi wajib memilih)
 */
function nextQuestion() {
  // Validasi: Cek apakah user sudah memilih jawaban untuk soal ini
  if (userAnswers[currentQuestionIndex] === null || userAnswers[currentQuestionIndex] === undefined) {
    alert("Silakan pilih jawaban terlebih dahulu.");
    return;
  }

  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

/**
 * Kembali ke Soal Sebelumnya
 */
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

/**
 * Menyelesaikan kuis & menghitung nilai akhir
 */
function finishQuiz() {
  let correctCount = 0;
  const totalQuestions = currentQuestions.length;

  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] === currentQuestions[i].answer) {
      correctCount++;
    }
  }

  const wrongCount = totalQuestions - correctCount;
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  // Perhitungan Grade (90-100: A, 80-89: B, 70-79: C, 60-69: D, <60: E)
  let grade = 'E';
  if (finalScore >= 90) grade = 'A';
  else if (finalScore >= 80) grade = 'B';
  else if (finalScore >= 70) grade = 'C';
  else if (finalScore >= 60) grade = 'D';
  else grade = 'E';

  // Render Hasil ke UI
  document.getElementById('quiz-result-score').textContent = finalScore;
  document.getElementById('quiz-result-correct').textContent = correctCount;
  document.getElementById('quiz-result-wrong').textContent = wrongCount;

  const gradeElem = document.getElementById('quiz-result-grade');
  if (gradeElem) gradeElem.textContent = grade;

  // Status Kelulusan
  const statusEl = document.getElementById('quiz-result-status');
  if (finalScore >= 80) {
    statusEl.innerHTML = '🏆 Sangat Baik';
    statusEl.className = 'display-6 fw-bold mb-3 text-success';
  } else if (finalScore >= 60) {
    statusEl.innerHTML = '👍 Baik';
    statusEl.className = 'display-6 fw-bold mb-3 text-primary';
  } else {
    statusEl.innerHTML = '📚 Perlu Belajar Lagi';
    statusEl.className = 'display-6 fw-bold mb-3 text-danger';
  }

  // Simpan ke LocalStorage
  saveQuizHistory(currentLevel, finalScore, grade);
  
  // Render Riwayat
  renderQuizHistory();

  // Ubah Tampilan: Sembunyikan Area Soal, Tampilkan Area Hasil
  document.getElementById('quiz-area-section').style.display = 'none';
  document.getElementById('quiz-result-section').style.display = 'block';
}

/**
 * Mengulang Kuis (Kembali ke Pilihan Level)
 */
function resetQuiz() {
  document.getElementById('quiz-result-section').style.display = 'none';
  document.getElementById('quiz-level-section').style.display = 'block';
}

// --- LOCAL STORAGE (RIWAYAT KUIS) ---

function saveQuizHistory(level, score, grade) {
  let history = JSON.parse(localStorage.getItem('digilearnQuizHistory')) || [];
  
  const record = {
    level: level.charAt(0).toUpperCase() + level.slice(1),
    score: score,
    grade: grade,
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })
  };

  history.unshift(record); // Tambahkan ke paling atas
  
  if (history.length > 5) {
    history = history.slice(0, 5); // Maksimal 5 riwayat terakhir
  }

  localStorage.setItem('digilearnQuizHistory', JSON.stringify(history));
}

function renderQuizHistory() {
  const historyList = document.getElementById('quiz-history-list');
  if (!historyList) return;

  const history = JSON.parse(localStorage.getItem('digilearnQuizHistory')) || [];
  
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.innerHTML = '<li class="list-group-item text-muted text-center py-3">Belum ada riwayat kuis.</li>';
    return;
  }

  history.forEach(item => {
    let badgeColor = 'bg-secondary';
    if (item.score >= 80) badgeColor = 'bg-success';
    else if (item.score >= 60) badgeColor = 'bg-primary';
    else badgeColor = 'bg-danger';

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center py-3';
    li.innerHTML = `
      <div>
        <strong class="d-block text-dark">${item.level} (Grade ${item.grade || '-'})</strong>
        <small class="text-muted">${item.date}</small>
      </div>
      <span class="badge ${badgeColor} rounded-pill fs-6 px-3">Skor: ${item.score}</span>
    `;
    historyList.appendChild(li);
  });
}
