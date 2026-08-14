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
     2. DAFTAR 25 MATERI MICRO-LEARNING & SISTEM PROGRESS LOCALSTORAGE
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

    // Software (8)
    { id: 'os', category: 'software', name: 'Sistem Operasi' },
    { id: 'browser', category: 'software', name: 'Browser Web' },
    { id: 'word', category: 'software', name: 'Microsoft Word' },
    { id: 'excel', category: 'software', name: 'Microsoft Excel' },
    { id: 'powerpoint', category: 'software', name: 'Microsoft PowerPoint' },
    { id: 'antivirus', category: 'software', name: 'Antivirus' },
    { id: 'mediaplayer', category: 'software', name: 'Media Player' },
    { id: 'komunikasi', category: 'software', name: 'Aplikasi Komunikasi' },

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
     5. BACKGROUND MUSIC CONTROLLER
     Dikelola secara terpusat oleh js/audio-manager.js (Global Audio Manager)
     -------------------------------------------------------------------------- */


  /* --------------------------------------------------------------------------
     6. FEEDBACK FORM MANAGER (PHASE 4.5)
     Floating Button & Interactive Popup Form System
     -------------------------------------------------------------------------- */
  (function initFeedbackForm() {
    if (!document.getElementById('digi-feedback-modal')) {
      const wrapper = document.createElement('div');
      wrapper.id = 'digi-feedback-wrapper';
      wrapper.innerHTML = `
        <div id="btn-floating-feedback" class="btn-floating-feedback" title="Beri Saran & Masukan">
          <span>📝</span> <span>Saran</span>
        </div>

        <div id="digi-feedback-modal" class="digi-modal-overlay" aria-hidden="true">
          <div class="digi-modal-content">
            <div class="digi-modal-header">
              <h3 class="digi-modal-title">
                <i class="bi bi-chat-square-heart-fill text-success"></i> Form Saran DigiLearn
              </h3>
              <button type="button" id="btn-close-modal-x" class="digi-modal-close-icon" aria-label="Tutup">&times;</button>
            </div>

            <p class="text-muted small mb-3">Berikan masukan atau pertanyaan mengenai platform DigiLearn.</p>

            <form id="digi-feedback-form" novalidate>
              <div class="digi-form-group">
                <label for="feedback-name" class="digi-form-label">Nama <span class="text-danger">*</span></label>
                <input type="text" id="feedback-name" class="digi-form-control" placeholder="Masukkan nama Anda" required>
                <div id="error-name" class="digi-form-error">Nama wajib diisi</div>
              </div>

              <div class="digi-form-group">
                <label for="feedback-email" class="digi-form-label">Email <span class="text-danger">*</span></label>
                <input type="email" id="feedback-email" class="digi-form-control" placeholder="nama@email.com" required>
                <div id="error-email" class="digi-form-error">Email wajib diisi dengan format valid</div>
              </div>

              <div class="digi-form-group">
                <label for="feedback-category" class="digi-form-label">Kategori <span class="text-danger">*</span></label>
                <select id="feedback-category" class="digi-form-control" required>
                  <option value="">-- Pilih Kategori --</option>
                  <option value="Materi Hardware">Materi Hardware</option>
                  <option value="Materi Software">Materi Software</option>
                  <option value="Materi Jaringan">Materi Jaringan</option>
                  <option value="Video Pembelajaran">Video Pembelajaran</option>
                  <option value="Tampilan Website">Tampilan Website</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
                <div id="error-category" class="digi-form-error">Kategori wajib dipilih</div>
              </div>

              <div class="digi-form-group">
                <label class="digi-form-label">Tingkat Kepuasan</label>
                <div class="digi-rating-options">
                  <label class="digi-rating-item">
                    <input type="radio" name="feedback_rating" value="Sangat Puas" checked> 😁 Sangat Puas
                  </label>
                  <label class="digi-rating-item">
                    <input type="radio" name="feedback_rating" value="Puas"> 🙂 Puas
                  </label>
                  <label class="digi-rating-item">
                    <input type="radio" name="feedback_rating" value="Cukup"> 😐 Cukup
                  </label>
                  <label class="digi-rating-item">
                    <input type="radio" name="feedback_rating" value="Kurang"> 🙁 Kurang
                  </label>
                </div>
              </div>

              <div class="digi-form-group">
                <label for="feedback-message" class="digi-form-label">Pesan / Saran <span class="text-danger">*</span></label>
                <textarea id="feedback-message" class="digi-form-control" rows="3" placeholder="Tuliskan saran atau masukan Anda..." required></textarea>
                <div id="error-message" class="digi-form-error">Pesan wajib diisi</div>
              </div>

              <div class="digi-modal-actions">
                <button type="button" id="btn-close-modal" class="btn btn-pixel-brown btn-sm px-3">Tutup</button>
                <button type="submit" id="btn-submit-feedback" class="btn btn-pixel-green btn-sm px-4">Kirim</button>
              </div>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(wrapper);
    }

    const floatingBtn = document.getElementById('btn-floating-feedback');
    const modalOverlay = document.getElementById('digi-feedback-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const closeXBtn = document.getElementById('btn-close-modal-x');
    const feedbackForm = document.getElementById('digi-feedback-form');

    function openModal() {
      if (modalOverlay) {
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
      }
    }

    function closeModal() {
      if (modalOverlay) {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        hideErrors();
      }
    }

    function hideErrors() {
      const errorElems = document.querySelectorAll('.digi-form-error');
      errorElems.forEach(el => el.style.display = 'none');
    }

    if (floatingBtn) floatingBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeXBtn) closeXBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
      });
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();
        hideErrors();

        const nameInput = document.getElementById('feedback-name');
        const emailInput = document.getElementById('feedback-email');
        const catInput = document.getElementById('feedback-category');
        const msgInput = document.getElementById('feedback-message');
        const ratingInput = document.querySelector('input[name="feedback_rating"]:checked');

        let isValid = true;

        if (!nameInput.value.trim()) {
          document.getElementById('error-name').style.display = 'block';
          isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
          document.getElementById('error-email').style.display = 'block';
          isValid = false;
        }

        if (!catInput.value) {
          document.getElementById('error-category').style.display = 'block';
          isValid = false;
        }

        if (!msgInput.value.trim()) {
          document.getElementById('error-message').style.display = 'block';
          isValid = false;
        }

        if (!isValid) return;

        const feedbackData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          category: catInput.value,
          rating: ratingInput ? ratingInput.value : 'Puas',
          message: msgInput.value.trim(),
          timestamp: new Date().toISOString()
        };

        try {
          const existingList = JSON.parse(localStorage.getItem('digilearnFeedbackList') || '[]');
          existingList.push(feedbackData);
          localStorage.setItem('digilearnFeedbackList', JSON.stringify(existingList));
        } catch (err) {
          console.warn('LocalStorage save feedback error:', err);
        }

        feedbackForm.reset();
        closeModal();
        showToast('Terima kasih atas masukan Anda. Form berhasil dikirim. 🎉', 'success');
      });
    }
  })();
});
