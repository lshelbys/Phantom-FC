// ── Mobile Menu Toggle ────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.querySelector('.main-nav');

if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    document.addEventListener('click', e => {
        if (!menuBtn.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('open');
        }
    });
}

// ── Secondary Nav Active Link ─────────────────────────────
const secLinks = document.querySelectorAll('.sec-link');

secLinks.forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
        }
        secLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ── Smooth Scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerEl = document.querySelector('.main-header');
                const secNavEl = document.querySelector('.secondary-nav');
                const headerHeight = (headerEl ? headerEl.offsetHeight : 0) +
                                     (secNavEl ? secNavEl.offsetHeight : 0);
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ── Scroll Reveal ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.news-card, .info-box, .match-app-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// ── Active Secondary Nav on Scroll ───────────────────────
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    secLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ── Season Tabs ───────────────────────────────────────────
document.querySelectorAll('.season-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const season = this.getAttribute('data-season');

        document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.season-panel').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const panel = document.getElementById('season-' + season);
        if (panel) panel.classList.add('active');
    });
});

// ── Match Detail Modal ────────────────────────────────────
function openMatchDetail(matchId) {
    const modal = document.getElementById('matchModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset to first tab
        document.querySelectorAll('.modal-tab').forEach((t, i) => {
            t.classList.toggle('active', i === 0);
        });
        document.querySelectorAll('.modal-tab-panel').forEach((p, i) => {
            p.classList.toggle('active', i === 0);
        });
    }
}

function closeMatchDetail() {
    const modal = document.getElementById('matchModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on backdrop click
const matchModal = document.getElementById('matchModal');
if (matchModal) {
    matchModal.addEventListener('click', function (e) {
        if (e.target === this) closeMatchDetail();
    });
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMatchDetail();
});

// ── Back to Top Button ────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
}

// ── Floating Main Menu ────────────────────────────────────
const floatMenuBtn = document.getElementById('floatMenuBtn');
const floatMenuPanel = document.getElementById('floatMenuPanel');

function closeFloatMenu() {
    if (floatMenuPanel) floatMenuPanel.classList.remove('open');
}

if (floatMenuBtn && floatMenuPanel) {
    floatMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatMenuPanel.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        const wrap = document.getElementById('floatMenuWrap');
        if (wrap && !wrap.contains(e.target)) {
            closeFloatMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFloatMenu();
    });
}

// ── Player Profile View ───────────────────────────────────
const playerData = {
    tayem: { name: 'Tayem Eyad', position: 'Left Winger', nationality: 'Palestinian', dob: 'March 5, 2012' },
    jasem: { name: 'Jasem Almail', position: 'Midfielder', nationality: 'Kuwaiti', dob: 'February 19, 2014' }
};

function showPlayerProfile(id) {
    const p = playerData[id];
    document.getElementById('player-profile-card').innerHTML =
        `<div class="profile-name">${p.name}</div>
        <div class="profile-detail-item"><span class="profile-label">Position</span><span class="profile-value">${p.position}</span></div>
        <div class="profile-detail-item"><span class="profile-label">Nationality</span><span class="profile-value">${p.nationality}</span></div>
        <div class="profile-detail-item"><span class="profile-label">Date of Birth</span><span class="profile-value">${p.dob}</span></div>`;
    document.getElementById('lineup-list-view').classList.add('hidden');
    document.getElementById('player-profile-view').classList.remove('hidden');
}

function hidePlayerProfile() {
    document.getElementById('player-profile-view').classList.add('hidden');
    document.getElementById('lineup-list-view').classList.remove('hidden');
}

// ── Modal Tab Switching ───────────────────────────────────
document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const panel = document.getElementById('tab-' + tabId);
        if (panel) panel.classList.add('active');
    });
});
