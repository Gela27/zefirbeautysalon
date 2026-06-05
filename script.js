// Загрузки
window.addEventListener('load', function() {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(function() {
      preloader.classList.add('hidden');
      setTimeout(function() { preloader.style.display = 'none'; }, 500);
    }, 1500);
  }
});

// Сайдбар
var sidebar = document.getElementById('sidebar');
var sidebarOverlay = document.getElementById('sidebarOverlay');
var burgerBtn = document.getElementById('burgerBtn');

function openSidebar() {
  if (sidebar) sidebar.classList.add('active');
  if (sidebarOverlay) sidebarOverlay.classList.add('active');
  if (burgerBtn) burgerBtn.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove('active');
  if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  if (burgerBtn) burgerBtn.classList.remove('active');
  document.body.style.overflow = '';
}

if (burgerBtn) {
  burgerBtn.addEventListener('click', openSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar);
}

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Анимация появления элементов
var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.animate').forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Переключение вкладок на странице прайса 
document.addEventListener('DOMContentLoaded', function() {
  var priceTabs = document.querySelectorAll('.price-tab');
  var priceCategories = document.querySelectorAll('.price-category');
  
  if (priceTabs.length > 0 && priceCategories.length > 0) {
    priceTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var categoryId = this.getAttribute('data-category');
        
        priceTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        this.classList.add('active');
        
        priceCategories.forEach(function(cat) {
          cat.classList.remove('active');
        });
        
        var activeCategory = document.getElementById(categoryId);
        if (activeCategory) {
          activeCategory.classList.add('active');
        }
      });
    });
  }
});

// 3D карусель мастеров 
var track3D = document.getElementById('track3D');
var cards3D = document.querySelectorAll('.master-card');
var totalCards = cards3D.length;
var current3D = 1;
var autoInterval3D;
var slideDuration3D = 4500;
var dotsContainer3D = document.getElementById('dots3D');

if (cards3D.length > 0 && dotsContainer3D) {
  cards3D.forEach(function(_, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-3d-dot' + (i === current3D ? ' active' : '');
    dot.onclick = function() {
      current3D = i;
      update3DCarousel();
      resetAuto3D();
    };
    dotsContainer3D.appendChild(dot);
  });
}

var dots3D = document.querySelectorAll('.carousel-3d-dot');

function update3DCarousel() {
  var isMobile = window.innerWidth <= 768;
  var isSmallMobile = window.innerWidth <= 480;
  var spacingX, depthZ, rotateDeg, scaleFactor, blurThreshold;
  
  if (isSmallMobile) {
    spacingX = 280;
    depthZ = 80;
    rotateDeg = 20;
    scaleFactor = 0.12;
    blurThreshold = 1;
  } else if (isMobile) {
    spacingX = 300;
    depthZ = 100;
    rotateDeg = 22;
    scaleFactor = 0.13;
    blurThreshold = 1;
  } else {
    spacingX = 480;
    depthZ = 140;
    rotateDeg = 18;
    scaleFactor = 0.1;
    blurThreshold = 1;
  }
  
  cards3D.forEach(function(card, i) {
    var offset = i - current3D;
    var absOffset = Math.abs(offset);
    var translateX = offset * spacingX;
    var translateZ = -absOffset * depthZ;
    var scale = Math.max(0.72, 1 - absOffset * scaleFactor);
    var rotateY = offset * -rotateDeg;
    var opacity = Math.max(0.2, 1 - absOffset * 0.38);
    var zIndex = 10 - absOffset;
    var filter = absOffset > blurThreshold ? 'blur(3px)' : 'none';
    var pointerEvents = absOffset === 0 ? 'auto' : 'none';
    
    card.style.transform = 'translateX(' + translateX + 'px) translateZ(' + translateZ + 'px) scale(' + scale + ') rotateY(' + rotateY + 'deg)';
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
    card.style.filter = filter;
    card.style.pointerEvents = pointerEvents;
  });
  
  if (dots3D.length) {
    dots3D.forEach(function(dot, i) {
      if (i === current3D) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

function next3D() {
  current3D = (current3D + 1) % totalCards;
  update3DCarousel();
  resetAuto3D();
}

function prev3D() {
  current3D = (current3D - 1 + totalCards) % totalCards;
  update3DCarousel();
  resetAuto3D();
}

function startAuto3D() {
  if (autoInterval3D) clearInterval(autoInterval3D);
  autoInterval3D = setInterval(function() {
    next3D();
  }, slideDuration3D);
}

function resetAuto3D() {
  clearInterval(autoInterval3D);
  startAuto3D();
}

var prevBtn = document.getElementById('prev3D');
var nextBtn = document.getElementById('next3D');
var carouselWrapper3D = document.getElementById('mastersCarousel3D');

if (prevBtn && nextBtn && carouselWrapper3D && cards3D.length) {
  prevBtn.addEventListener('click', prev3D);
  nextBtn.addEventListener('click', next3D);
  carouselWrapper3D.addEventListener('mouseenter', function() {
    clearInterval(autoInterval3D);
  });
  carouselWrapper3D.addEventListener('mouseleave', function() {
    startAuto3D();
  });

  var touchStartX3D = 0, touchStartY3D = 0;
  carouselWrapper3D.addEventListener('touchstart', function(e) {
    touchStartX3D = e.changedTouches[0].screenX;
    touchStartY3D = e.changedTouches[0].screenY;
  }, { passive: true });
  
  carouselWrapper3D.addEventListener('touchend', function(e) {
    var diffX = e.changedTouches[0].screenX - touchStartX3D;
    var diffY = e.changedTouches[0].screenY - touchStartY3D;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (diffX < 0) next3D();
      else prev3D();
    }
  }, { passive: true });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prev3D();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      next3D();
      e.preventDefault();
    }
  });
  
  window.addEventListener('resize', update3DCarousel);
  document.addEventListener('DOMContentLoaded', function() {
    update3DCarousel();
    startAuto3D();
  });
}

// Слайдер о салоне 
var currentAboutSlide = 0;
var aboutSlides = document.querySelectorAll('.about-slide');
var totalAboutSlides = aboutSlides.length;
var aboutDotsContainer = document.getElementById('aboutDots');
var aboutProgressBar = document.getElementById('aboutProgress');
var aboutAutoInterval, aboutProgressInt;
var aboutSlideDuration = 4000;

if (aboutSlides.length > 0 && aboutDotsContainer) {
  aboutSlides.forEach(function(_, index) {
    var dot = document.createElement('button');
    dot.className = 'about-dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Слайд ' + (index + 1));
    dot.onclick = function() {
      goToAboutSlide(index);
    };
    aboutDotsContainer.appendChild(dot);
  });

  var aboutDots = document.querySelectorAll('.about-dot');

  function goToAboutSlide(index) {
    aboutSlides[currentAboutSlide].classList.remove('active');
    aboutDots[currentAboutSlide].classList.remove('active');
    currentAboutSlide = index;
    aboutSlides[currentAboutSlide].classList.add('active');
    aboutDots[currentAboutSlide].classList.add('active');
    resetAboutAuto();
  }

  function nextAboutSlide() {
    goToAboutSlide((currentAboutSlide + 1) % totalAboutSlides);
  }

  function startAboutAuto() {
    var progress = 0;
    aboutAutoInterval = setInterval(function() {
      nextAboutSlide();
    }, aboutSlideDuration);
    aboutProgressInt = setInterval(function() {
      progress += (50 / aboutSlideDuration) * 100;
      if (progress > 100) progress = 0;
      if (aboutProgressBar) aboutProgressBar.style.width = progress + '%';
    }, 50);
  }

  function resetAboutAuto() {
    clearInterval(aboutAutoInterval);
    clearInterval(aboutProgressInt);
    if (aboutProgressBar) aboutProgressBar.style.width = '0%';
    startAboutAuto();
  }

  document.addEventListener('DOMContentLoaded', function() {
    startAboutAuto();
  });
}
// Переключать на прайс определенной услуги
document.addEventListener('DOMContentLoaded', function() { 
  var urlParams = new URLSearchParams(window.location.search); 
  var tab = urlParams.get('tab'); if (tab) { 
    var targetTab = document.querySelector('.price-tab[data-category="' + tab + '"]'); 
    if (targetTab) { targetTab.click(); 
    } 
  } 
});
