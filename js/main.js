/* ==========================================================================
   DigiLearn - Main JavaScript File (js/main.js)
   Phase 4: Micro-learning Progress Tracking (20 Materi Individual) & Fondasi Kuis
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------------------------------
     1. NAVIGASI SMOOTH SCROLL
     -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link[href*="#"], .btn[href*="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href && href.includes('#')) {
        const hashIndex = href.indexOf('#');
        const targetId = href.substring(hashIndex);
        const pathPart = href.substring(0, hashIndex);
        
        const currentPath = window.location.pathname;
        const isSamePage = pathPart === '' || currentPath.endsWith(pathPart) || (pathPart === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html')));

        if (isSamePage && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }
    });
  });


  /* --------------------------------------------------------------------------
     2. DAFTAR 20 MATERI MICRO-LEARNING & SISTEM PROGRESS LOCALSTORAGE
     -------------------------------------------------------------------------- */
  const MICRO_MATERIALS = [
    // Hardware (13)
    { id: 'cpu', category: 'hardware', name: 'CPU (Processor)' },
    { id: 'ram', category: 'hardware', name: 'RAM (Memory)' },
    { id: 'motherboard', category: 'hardware', name: 'Motherboard' },
    { id: 'gpu', category: 'hardware', name: 'GPU (Kartu Grafis)' },
    { id: 'ssd', category: 'hardware', name: 'SSD (Solid State Drive)' },
    { id: 'hdd', category: 'hardware', name: 'HDD (Hard Disk Drive)' },
    { id: 'psu', category: 'hardware', name: 'PSU (Power Supply)' },
    { id: 'heatsink', category: 'hardware', name: 'Heatsink / CPU Cooler' },
    { id: 'sata', category: 'hardware', name: 'Kabel SATA' },
    { id: 'monitor', category: 'hardware', name: 'Monitor' },
    { id: 'keyboard', category: 'hardware', name: 'Keyboard' },
    { id: 'mouse', category: 'hardware', name: 'Mouse' },
    { id: 'casing', category: 'hardware', name: 'Casing Komputer' },

    // Software (3)
    { id: 'os', category: 'software', name: 'Sistem Operasi' },
    { id: 'browser', category: 'software', name: 'Browser Web' },
    { id: 'office', category: 'software', name: 'Microsoft Office' },

    // Internet (4)
    { id: 'internet', category: 'internet', name: 'Internet' },
    { id: 'router', category: 'internet', name: 'Router' },
    { id: 'wifi', category: 'internet', name: 'Wi-Fi' },
    { id: 'dns', category: 'internet', name: 'DNS (Domain Name System)' }
  ];

  // Mendapatkan Data Progress Pembelajaran Keseluruhan
  function getMicroProgressData() {
    let completedCount = 0;
    const completedMap = {};

    MICRO_MATERIALS.forEach(item => {
      const isDone = localStorage.getItem(`digilearn_micro_${item.id}`) === 'true';
      completedMap[item.id] = isDone;
      if (isDone) completedCount++;
    });

    const totalCount = MICRO_MATERIALS.length; // 20
    const percentage = Math.round((completedCount / totalCount) * 100);

    return {
      completedCount,
      totalCount,
      percentage,
      completedMap
    };
  }

  // Update Tampilan Bar & Card Progress di Halaman Utama / Belajar Komputer
  function renderProgressUI() {
    const progressData = getMicroProgressData();

    // 1. Progress Bar di Home / Belajar Komputer
    const progressContainer = document.getElementById('micro-progress-container');
    if (progressContainer) {
      progressContainer.innerHTML = `
        <div class="card pixel-box p-4 bg-white mb-4">
          <div class="row align-items-center gy-3">
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="pixel-badge fs-6">Progres Pembelajaran</span>
                <span class="badge bg-success text-white fs-6 px-3 py-1 border border-2 border-dark">
                  ${progressData.completedCount} / ${progressData.totalCount} Selesai
                </span>
              </div>
              <h3 class="h4 fw-bold mb-1">Status Belajar Kamu</h3>
              <p class="text-muted small mb-0">
                Telah membaca <strong>${progressData.completedCount} dari ${progressData.totalCount} topik materi micro-learning</strong>.
              </p>
            </div>

            <div class="col-md-6 text-md-end">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-semibold text-dark">Progres Keseluruhan</span>
                <span class="fw-bold fs-5 text-success">${progressData.percentage}%</span>
              </div>
              <div class="progress border border-2 border-dark" style="height: 24px; border-radius: 8px; background-color: var(--bg-cream);">
                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" 
                     style="width: ${progressData.percentage}%; font-weight: bold;" 
                     aria-valuenow="${progressData.percentage}" aria-valuemin="0" aria-valuemax="100">
                  ${progressData.percentage}%
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Update Badge Status pada Daftar Kartu Materi (jika ada)
    MICRO_MATERIALS.forEach(item => {
      const badgeElem = document.getElementById(`status-badge-${item.id}`);
      if (badgeElem) {
        if (progressData.completedMap[item.id]) {
          badgeElem.className = 'badge bg-success text-white border border-1 border-dark';
          badgeElem.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Selesai';
        } else {
          badgeElem.className = 'badge bg-secondary text-white border border-1 border-dark';
          badgeElem.innerHTML = 'Belum Selesai';
        }
      }
    });
  }

  // Inisialisasi Tampilan Progress
  renderProgressUI();


  /* --------------------------------------------------------------------------
     3. TOMBOL "TANDAI MATERI SELESAI" PADA HALAMAN MICRO-LEARNING
     -------------------------------------------------------------------------- */
  const completeBtn = document.getElementById('btn-mark-topic-complete');
  if (completeBtn) {
    const topicId = completeBtn.getAttribute('data-topic-id');
    const storageKey = `digilearn_micro_${topicId}`;

    function updateTopicButton() {
      const isDone = localStorage.getItem(storageKey) === 'true';
      if (isDone) {
        completeBtn.classList.replace('btn-pixel-green', 'btn-pixel-brown');
        completeBtn.innerHTML = '<i class="bi bi-check-circle-fill text-warning me-1"></i> Topik Telah Selesai ✔';
      } else {
        completeBtn.classList.replace('btn-pixel-brown', 'btn-pixel-green');
        completeBtn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Tandai Topik Ini Selesai';
      }
    }

    updateTopicButton();

    completeBtn.addEventListener('click', function () {
      const isDone = localStorage.getItem(storageKey) === 'true';
      localStorage.setItem(storageKey, (!isDone).toString());

      updateTopicButton();
      renderProgressUI();

      if (!isDone) {
        showToast('Topik berhasil ditandai selesai! Progres bertambah 🎉', 'success');
      } else {
        showToast('Status topik diperbarui.', 'info');
      }
    });
  }


  /* --------------------------------------------------------------------------
     4. UTILITY: CUSTOM TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  function showToast(message, type = 'info') {
    let toastElement = document.getElementById('digi-toast');
    
    if (!toastElement) {
      toastElement = document.createElement('div');
      toastElement.id = 'digi-toast';
      toastElement.className = 'custom-toast';
      document.body.appendChild(toastElement);
    }

    let iconHtml = '<i class="bi bi-info-circle-fill text-primary"></i>';
    if (type === 'success') iconHtml = '<i class="bi bi-check-circle-fill text-success"></i>';
    if (type === 'error') iconHtml = '<i class="bi bi-exclamation-triangle-fill text-danger"></i>';

    toastElement.innerHTML = `${iconHtml} <span>${message}</span>`;
    toastElement.style.display = 'flex';

    setTimeout(() => {
      toastElement.style.display = 'none';
    }, 3500);
  }

  /* --------------------------------------------------------------------------
     5. BACKGROUND MUSIC CONTROLLER (PHASE 4.1)
     Menggunakan elemen HTML <audio id="bgMusic">
     localStorage key: digilearnMusicEnabled
     -------------------------------------------------------------------------- */
  const bgMusic = document.getElementById('bgMusic');
  const audioBtn = document.getElementById('btn-audio-toggle');

  if (bgMusic && audioBtn) {
    // Set volume lembut agar tidak mengganggu belajar
    bgMusic.volume = 0.25;

    const audioIcon = audioBtn.querySelector('i');

    // Fungsi Update Tampilan Icon & Tooltip
    function updateAudioUI(isPlaying) {
      if (isPlaying) {
        audioIcon.className = 'bi bi-volume-up-fill';
        audioBtn.classList.add('is-playing');
        audioBtn.setAttribute('title', 'Matikan Musik');
      } else {
        audioIcon.className = 'bi bi-volume-mute-fill';
        audioBtn.classList.remove('is-playing');
        audioBtn.setAttribute('title', 'Aktifkan Musik');
      }
    }

    // Fungsi Toggle Musik ON / OFF
    function toggleMusic() {
      if (bgMusic.paused) {
        bgMusic.play().then(function () {
          localStorage.setItem('digilearnMusicEnabled', 'true');
          updateAudioUI(true);
        }).catch(function () {
          // Browser memblokir autoplay — abaikan error
        });
      } else {
        bgMusic.pause();
        localStorage.setItem('digilearnMusicEnabled', 'false');
        updateAudioUI(false);
      }
    }

    // Event Klik Tombol Audio di Navbar
    audioBtn.addEventListener('click', toggleMusic);

    // AUTO-RESUME: Jika user sebelumnya mengaktifkan musik (localStorage)
    var musicEnabled = localStorage.getItem('digilearnMusicEnabled');

    if (musicEnabled === 'true') {
      // Tampilkan icon ON segera
      updateAudioUI(true);

      // Coba autoplay (berhasil jika user sudah berinteraksi sebelumnya)
      bgMusic.play().then(function () {
        updateAudioUI(true);
      }).catch(function () {
        // Browser memblokir autoplay — tunggu interaksi user pertama
        function resumeOnInteraction() {
          if (localStorage.getItem('digilearnMusicEnabled') === 'true') {
            bgMusic.play().then(function () {
              updateAudioUI(true);
            }).catch(function () {});
          }
          document.removeEventListener('click', resumeOnInteraction);
          document.removeEventListener('keydown', resumeOnInteraction);
        }
        document.addEventListener('click', resumeOnInteraction);
        document.addEventListener('keydown', resumeOnInteraction);
      });
    } else {
      updateAudioUI(false);
    }
  }

});
