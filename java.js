
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavbar();
  initFigmaModal();
  initScrollTop();
  initCopyrightYear();
});

/*  1. Animasi scroll */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  const progressBars = document.querySelectorAll('.progress-bar');

  // Pengamat untuk elemen munculan (reveal)
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;

        setTimeout(() => {
          el.classList.add('revealed');
        }, parseInt(delay, 10));

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Pengamat untuk pengisian bar meteran keahlian alat
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.style.getPropertyValue('--level') || '85%';
        bar.style.width = targetWidth;
        observer.unobserve(bar);
      }
    });
  }, {
    threshold: 0.25
  });

  progressBars.forEach(bar => progressObserver.observe(bar));
}

/* 2. Navigasi Sticky */ 
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Deteksi scroll untuk gaya sticky navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveSection();
  });

  // Toggle menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Tutup saat tautan navigasi diklik
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });

    // Tutup saat mengklik di luar area menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // Pelacak posisi bagian aktif (scrollspy)
  function updateActiveSection() {
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* 3. Sistem Modal Pop-up Layar Penuh Studi Kasus Figma */
const caseStudies = {
  1: {
    title: 'NeoBank: Antarmuka Perbankan Digital Generasi Baru',
    tags: ['UX', 'figma', 'Sistem Desain', 'Mikro-Interaksi', 'iOS Native'],
    overview: 'NeoBank adalah konsep aplikasi perbankan digital modern yang dirancang untuk menghilangkan beban kognitif pengguna dalam mengelola keuangan harian. Berfokus pada transfer instan antar-pengguna, tokenisasi kartu fleksibel, otentikasi biometrik aman, dan palet warna kontras tinggi (#FEFAE0, #E9EDC9, #CCD5AE).',
    challenge: 'Aplikasi perbankan konvensional kerap kali membingungkan pengguna dengan menu riwayat mutasi yang bertumpuk dan langkah transfer yang berbelit-belit. Tantangan utamanya adalah memangkas alur transfer utama menjadi kurang dari 3 ketukan sambil tetap menjamin keamanan konfirmasi perbankan.',
    highlights: [
      'Pustaka token desain Figma terpadu dengan 80+ komponen auto-layout dinamis.',
      'Alur verifikasi pembayaran satu-ketukan melalui NFC dan pemindaian kode QR.',
      'Palet kontras tinggi bersertifikasi WCAG 2.1 AA untuk keterbacaan jernih di bawah sinar matahari.',
      'Mikro-animasi haptik khusus saat konversi mata uang dan pengiriman dana berhasil.'
    ],
    figmaUrl: 'https://www.figma.com',
    image: 'aset/Figma.jpg',
    type: 'banking'
  },
  2: {
    title: 'Pulse Analytics: Dashboard Cloud Tingkat Perusahaan',
    tags: ['SaaS Web', 'Visualisasi Data', 'Multi-Tenant', 'Tema Gelap', 'B2B Enterprise'],
    overview: 'Pulse Analytics dirancang untuk membantu tim telemetri dan analis korporat dalam memantau metrik data berdimensi tinggi, tolok ukur pendapatan berulang bulanan (MRR), indikator retensi pelanggan, dan latensi infrastruktur cloud secara terpusat melalui kanvas modular.',
    challenge: 'Dashboard analitik perusahaan sering membuat pengguna jenuh karena kepadatan angka yang berlebihan. Menghadirkan antarmuka kanvas widget modular yang fleksibel dan tetap terbaca nyaman dari laptop 13 inci hingga layar monitor 4K merupakan fokus arsitektur utama studi kasus ini.',
    highlights: [
      'Arsitektur kanvas widget drag-and-drop modular dengan batasan responsif presisi.',
      'Kurva proyeksi metrik prediktif dengan tooltip telemetri interaktif yang aksesibel.',
      'Dukungan pintasan keyboard lengkap bagi operator dan analis data berpengalaman.',
      'Hierarki aksen sage green (#CCD5AE) untuk memprioritaskan peringatan anomali kritis.'
    ],
    figmaUrl: 'https://www.figma.com',
    type: 'saas'
  },
  3: {
    title: 'Aura: Toko Produk Gaya Hidup Mewah Minimalis',
    tags: ['Mobile iOS', 'E-Commerce', 'Identitas Merek', 'UX Sensori', 'Checkout Instan'],
    overview: 'Aura adalah aplikasi e-commerce kurasi barang mewah artisanal khas Skandinavia, mulai dari furnitur interior, pencahayaan arsitektural, hingga perangkat keras hunian. Aplikasi ini memperlakukan produk layaknya karya seni galeri dengan ruang bernapas visual yang luas.',
    challenge: 'Pelanggan segmen premium sering membatalkan proses pembelian saat dihadapkan pada formulir pengiriman yang rumit atau pop-up yang mengganggu. Tujuannya adalah merancang alur belanja bebas hambatan dari eksplorasi produk hingga pembayaran melalui Apple Pay.',
    highlights: [
      'Umpan visual produk bergaya editorial majalah dengan transisi halus pada 60fps.',
      'Integrasi checkout instan satu-tindakan dengan otentikasi biometrik Apple Pay.',
      'Inspektur material produk taktil 360° yang menampilkan tekstur serat kayu dan logam kuningan.',
      'Menurunkan tingkat pembatalan keranjang belanja sebesar 28% dalam uji coba prototipe keterpakaian.'
    ],
    figmaUrl: 'https://www.figma.com',
    type: 'ecommerce'
  }
};

function initFigmaModal() {
  const modal = document.getElementById('figmaModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const dismissBtn = document.getElementById('modalDismiss');
  const cards = document.querySelectorAll('.figma-showcase-box');

  if (!modal) return;

  cards.forEach(card => {
    // Pemicu klik mouse
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-card-id');
      openModal(id);
    });

    // Pemicu navigasi keyboard (Enter atau Spasi)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.getAttribute('data-card-id');
        openModal(id);
      }
    });
  });

  // Pengendali penutup modal
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Pengendali tombol Escape pada keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openModal(id) {
  const modal = document.getElementById('figmaModal');
  const lightboxImg = document.getElementById('modalLightboxImg');
  const data = caseStudies[id];
  if (!modal) return;

  if (lightboxImg && data && data.image) {
    lightboxImg.src = data.image;
    lightboxImg.alt = data.title || 'Gambar Desain';
  }

  // Aktifkan Modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Kunci scroll latar belakang
}

function closeModal() {
  const modal = document.getElementById('figmaModal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Buka kembali scroll latar belakang
}

function renderVectorMockup(type) {
  if (type === 'banking') {
    return `
      <div style="width:100%; max-width:320px; background:#FEFAE0; border:1.5px solid #CCD5AE; border-radius:24px; padding:22px; box-shadow:0 15px 45px rgba(40,54,24,0.15);">
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#586644; margin-bottom:14px;">
          <span>09.41 WIB</span>
          <div style="display:flex; gap:6px;"><i class="fa-solid fa-wifi"></i><i class="fa-solid fa-battery-full"></i></div>
        </div>
        <div style="margin-bottom:18px;">
          <span style="font-size:0.72rem; color:#586644; text-transform:uppercase; letter-spacing:1px; font-weight:700;">Total Saldo Rekening</span>
          <div style="font-family:'Outfit',sans-serif; font-size:1.85rem; font-weight:800; color:#283618;">Rp 385.500.000</div>
        </div>
        <div style="background:linear-gradient(135deg, #E9EDC9, #CCD5AE); border:1px solid #CCD5AE; border-radius:14px; padding:16px; margin-bottom:18px;">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#283618;">
            <span style="font-weight:700;">Brankas Platinum Elite</span>
            <i class="fa-brands fa-cc-mastercard" style="font-size:1.25rem;"></i>
          </div>
          <div style="margin:16px 0 10px; font-family:'JetBrains Mono',monospace; letter-spacing:2px; font-size:0.95rem; color:#283618; font-weight:600;">5424 •••• •••• 4288</div>
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#586644;">
            <span>FIRDAUSI NUZULA</span>
            <span>BERLAKU 08/29</span>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; text-align:center; font-size:0.7rem; color:#283618;">
          <div style="background:#E9EDC9; padding:10px 4px; border-radius:10px;"><i class="fa-solid fa-paper-plane" style="color:#586644; font-size:1rem; margin-bottom:4px; display:block;"></i>Kirim</div>
          <div style="background:#E9EDC9; padding:10px 4px; border-radius:10px;"><i class="fa-solid fa-wallet" style="color:#586644; font-size:1rem; margin-bottom:4px; display:block;"></i>Top Up</div>
          <div style="background:#E9EDC9; padding:10px 4px; border-radius:10px;"><i class="fa-solid fa-qrcode" style="color:#586644; font-size:1rem; margin-bottom:4px; display:block;"></i>Pindai</div>
          <div style="background:#E9EDC9; padding:10px 4px; border-radius:10px;"><i class="fa-solid fa-chart-pie" style="color:#586644; font-size:1rem; margin-bottom:4px; display:block;"></i>Statistik</div>
        </div>
      </div>
    `;
  }

  if (type === 'saas') {
    return `
      <div style="width:100%; max-width:440px; background:#FEFAE0; border:1.5px solid #CCD5AE; border-radius:14px; padding:18px; box-shadow:0 15px 45px rgba(40,54,24,0.15);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #CCD5AE; padding-bottom:10px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <div style="width:9px; height:9px; border-radius:50%; background:#ef4444;"></div>
            <div style="width:9px; height:9px; border-radius:50%; background:#f59e0b;"></div>
            <div style="width:9px; height:9px; border-radius:50%; background:#10b981;"></div>
            <span style="font-size:0.75rem; color:#283618; font-weight:700; margin-left:6px; font-family:'JetBrains Mono',monospace;">Telemetri Analitik v4.2</span>
          </div>
          <span style="font-size:0.68rem; background:#CCD5AE; color:#283618; padding:2px 8px; border-radius:999px; font-weight:700;">SESI AKTIF</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:14px;">
          <div style="background:#E9EDC9; padding:10px; border-radius:8px; border-left:3px solid #CCD5AE;">
            <div style="font-size:0.65rem; color:#586644;">Total MRR</div>
            <div style="font-size:1.15rem; font-weight:800; color:#283618;">Rp 2,8 M</div>
            <div style="font-size:0.65rem; color:#2b7a42;">▲ +14.2%</div>
          </div>
          <div style="background:#E9EDC9; padding:10px; border-radius:8px; border-left:3px solid #CCD5AE;">
            <div style="font-size:0.65rem; color:#586644;">Pengguna Aktif</div>
            <div style="font-size:1.15rem; font-weight:800; color:#283618;">142.8k</div>
            <div style="font-size:0.65rem; color:#2b7a42;">▲ +28.5%</div>
          </div>
          <div style="background:#E9EDC9; padding:10px; border-radius:8px; border-left:3px solid #CCD5AE;">
            <div style="font-size:0.65rem; color:#586644;">Kondisi Sistem</div>
            <div style="font-size:1.15rem; font-weight:800; color:#283618;">99.8%</div>
            <div style="font-size:0.65rem; color:#2b7a42;">Optimal</div>
          </div>
        </div>
        <div style="height:110px; background:#E9EDC9; border-radius:8px; display:flex; align-items:flex-end; justify-content:space-around; padding:12px 10px 6px;">
          <div style="width:14px; height:40%; background:rgba(204,213,174,0.6); border-radius:3px;"></div>
          <div style="width:14px; height:60%; background:rgba(204,213,174,0.6); border-radius:3px;"></div>
          <div style="width:14px; height:75%; background:rgba(204,213,174,0.7); border-radius:3px;"></div>
          <div style="width:14px; height:50%; background:rgba(204,213,174,0.6); border-radius:3px;"></div>
          <div style="width:14px; height:90%; background:#CCD5AE; border-radius:3px; box-shadow:0 0 12px rgba(204,213,174,0.6);"></div>
          <div style="width:14px; height:80%; background:rgba(204,213,174,0.8); border-radius:3px;"></div>
          <div style="width:14px; height:95%; background:#CCD5AE; border-radius:3px; box-shadow:0 0 12px rgba(204,213,174,0.6);"></div>
        </div>
      </div>
    `;
  }

  return `
    <div style="width:100%; max-width:320px; background:#FEFAE0; border:1.5px solid #CCD5AE; border-radius:24px; padding:22px; box-shadow:0 15px 45px rgba(40,54,24,0.15);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; font-size:0.8rem; color:#283618;">
        <i class="fa-solid fa-arrow-left"></i>
        <span style="font-weight:700; color:#283618; font-size:0.85rem; letter-spacing:1px;">AURA STORE</span>
        <i class="fa-regular fa-heart"></i>
      </div>
      <div style="background:#E9EDC9; border-radius:14px; padding:24px; text-align:center; margin-bottom:16px;">
        <i class="fa-solid fa-couch" style="font-size:3.5rem; color:#586644; margin-bottom:12px; display:inline-block;"></i>
        <div style="font-family:'Outfit',sans-serif; font-size:1.15rem; font-weight:700; color:#283618;">Kursi Arsitektural Nordic</div>
        <div style="color:#283618; font-weight:800; font-size:1.35rem; margin-top:6px;">Rp 12.850.000</div>
      </div>
      <div style="display:flex; gap:10px; margin-bottom:16px;">
        <div style="flex:1; background:#E9EDC9; padding:8px; border-radius:8px; text-align:center; font-size:0.75rem; color:#586644;"><i class="fa-solid fa-truck" style="color:#586644;"></i> Kirim Cepat</div>
        <div style="flex:1; background:#E9EDC9; padding:8px; border-radius:8px; text-align:center; font-size:0.75rem; color:#586644;"><i class="fa-solid fa-certificate" style="color:#586644;"></i> Garansi 5 Thn</div>
      </div>
      <div style="background:#CCD5AE; color:#283618; font-weight:700; text-align:center; padding:12px; border-radius:10px; font-size:0.85rem; display:flex; align-items:center; justify-content:center; gap:8px; border:1px solid #b8c497;">
        <i class="fa-brands fa-apple"></i> Satu-Ketukan Apple Pay
      </div>
    </div>
  `;
}

/* 4. Fitur 1-Klik Salin ke Papan Klip & Notifikasi Toast */
window.copyContact = function(text, label) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      displayToast(`Berhasil menyalin ${label} ke papan klip!`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    displayToast(`Berhasil menyalin ${label} ke papan klip!`);
  } catch (err) {
    displayToast(`Gagal menyalin: ${text}`);
  }
  document.body.removeChild(textArea);
}

/* 5. Penanganan Pengiriman Formulir Kontak Langsung */
window.handleFormDispatch = function() {
  const nameInput = document.getElementById('inputName');
  const emailInput = document.getElementById('inputEmail');
  const subjectInput = document.getElementById('inputSubject');
  const messageInput = document.getElementById('inputMessage');

  const sender = nameInput ? nameInput.value.trim() : 'Anda';

  displayToast(`Terima kasih, ${sender}! Pesan Anda telah terkirim. Firdausi akan membalas dalam waktu 24 jam.`);

  if (nameInput) nameInput.value = '';
  if (emailInput) emailInput.value = '';
  if (subjectInput) subjectInput.value = '';
  if (messageInput) messageInput.value = '';
};

function displayToast(message) {
  const toast = document.getElementById('toastPopup');
  const toastTxt = document.getElementById('toastTxt');
  if (!toast || !toastTxt) return;

  toastTxt.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 4500);
}

/* 6. Tombol Melayang Kembali ke Atas Halaman */
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 7. Tahun Hak Cipta Dinamis */
function initCopyrightYear() {
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}