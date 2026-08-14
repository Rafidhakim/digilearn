/* ==========================================================================
   DigiLearn - Global Audio Manager (Standalone Singleton)
   ========================================================================== */

(function () {
  'use strict';

  console.log('[AUDIO] initialized');

  // LocalStorage Keys
  const KEY_ENABLED = 'digilearnMusicEnabled';
  const KEY_TIME = 'digilearnAudioTime';
  const KEY_VOLUME = 'digilearnAudioVolume';

  let bgAudio = null;
  let toggleBtn = null;
  let audioIcon = null;

  function getSavedState() {
    return {
      enabled: localStorage.getItem(KEY_ENABLED) === 'true',
      time: parseFloat(localStorage.getItem(KEY_TIME) || '0'),
      volume: parseFloat(localStorage.getItem(KEY_VOLUME) || '0.25')
    };
  }

  function saveState(isPlaying, currentTime) {
    localStorage.setItem(KEY_ENABLED, isPlaying ? 'true' : 'false');
    if (typeof currentTime === 'number' && !isNaN(currentTime) && currentTime > 0) {
      localStorage.setItem(KEY_TIME, currentTime.toString());
    }
  }

  function syncUI(isPlaying) {
    if (!toggleBtn) toggleBtn = document.getElementById('btn-audio-toggle');
    if (!toggleBtn) return;

    if (!audioIcon) audioIcon = toggleBtn.querySelector('i');

    if (isPlaying) {
      if (audioIcon) audioIcon.className = 'bi bi-volume-up-fill';
      toggleBtn.classList.add('is-playing');
      toggleBtn.setAttribute('title', 'Matikan Musik');
    } else {
      if (audioIcon) audioIcon.className = 'bi bi-volume-mute-fill';
      toggleBtn.classList.remove('is-playing');
      toggleBtn.setAttribute('title', 'Aktifkan Musik');
    }
    console.log('[AUDIO] state synced');
  }

  function safeSetTime(audioEl, timeSec) {
    if (!timeSec || isNaN(timeSec) || timeSec <= 0 || !isFinite(timeSec)) return;

    function applyTime() {
      try {
        if (timeSec < audioEl.duration || !audioEl.duration) {
          audioEl.currentTime = timeSec;
          console.log('[AUDIO] restored from storage (' + timeSec.toFixed(2) + 's)');
        }
      } catch (e) {
        console.warn('[AUDIO] Error restoring time:', e);
      }
    }

    if (audioEl.readyState >= 1) {
      applyTime();
    } else {
      const onMeta = function () {
        applyTime();
        audioEl.removeEventListener('loadedmetadata', onMeta);
      };
      audioEl.addEventListener('loadedmetadata', onMeta);
    }
  }

  function initGlobalAudio() {
    bgAudio = document.getElementById('bgMusic');
    toggleBtn = document.getElementById('btn-audio-toggle');

    if (!bgAudio) {
      console.warn('[AUDIO] No <audio id="bgMusic"> element found on this page.');
      return;
    }

    const state = getSavedState();
    bgAudio.volume = isNaN(state.volume) ? 0.25 : state.volume;

    // Restore posisi detik audio
    safeSetTime(bgAudio, state.time);

    // Simpan detik audio secara kontinu saat diputar
    bgAudio.addEventListener('timeupdate', function () {
      if (!bgAudio.paused && bgAudio.currentTime > 0) {
        localStorage.setItem(KEY_TIME, bgAudio.currentTime.toString());
      }
    });

    // Simpan detik audio sebelum navigasi
    window.addEventListener('beforeunload', function () {
      if (bgAudio && !bgAudio.paused) {
        localStorage.setItem(KEY_TIME, bgAudio.currentTime.toString());
      }
    });

    // Event Handler Tombol Audio
    function handleToggle(e) {
      if (e) e.stopPropagation();

      if (bgAudio.paused) {
        safeSetTime(bgAudio, parseFloat(localStorage.getItem(KEY_TIME) || '0'));
        bgAudio.play().then(function () {
          saveState(true, bgAudio.currentTime);
          syncUI(true);
          console.log('[AUDIO] playing');
        }).catch(function (err) {
          console.warn('[AUDIO] Toggle play error:', err);
        });
      } else {
        bgAudio.pause();
        saveState(false, bgAudio.currentTime);
        syncUI(false);
        console.log('[AUDIO] paused');
      }
    }

    if (toggleBtn) {
      toggleBtn.onclick = handleToggle;
    }

    // Auto-Resume jika audio sebelumnya aktif
    if (state.enabled) {
      syncUI(true);

      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(function () {
          syncUI(true);
          console.log('[AUDIO] playing');
        }).catch(function () {
          console.log('[AUDIO] Autoplay blocked by browser policy on page transition. Waiting for interaction...');
          syncUI(false);

          function playOnInteraction(evt) {
            if (evt && evt.target && toggleBtn && toggleBtn.contains(evt.target)) return;

            if (localStorage.getItem(KEY_ENABLED) === 'true' && bgAudio.paused) {
              safeSetTime(bgAudio, parseFloat(localStorage.getItem(KEY_TIME) || '0'));
              bgAudio.play().then(function () {
                syncUI(true);
                console.log('[AUDIO] playing');
                cleanupListeners();
              }).catch(function () {});
            } else {
              cleanupListeners();
            }
          }

          function cleanupListeners() {
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          }

          document.addEventListener('click', playOnInteraction);
          document.addEventListener('keydown', playOnInteraction);
          document.addEventListener('touchstart', playOnInteraction);
        });
      }
    } else {
      syncUI(false);
      console.log('[AUDIO] paused');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalAudio);
  } else {
    initGlobalAudio();
  }
})();
