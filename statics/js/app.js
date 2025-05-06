document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.getElementById('mainNav').classList.toggle('active');
});
// slider start
document.addEventListener('DOMContentLoaded', function () {
  class RTLSilder {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) return;

      this.track = this.container.querySelector('.rtl-slider-track');
      this.slides = this.container.querySelectorAll('.rtl-slide');
      this.dotsContainer = this.container.querySelector('.rtl-slider-dots');
      this.dots = [];

      this.currentIndex = 0;
      this.slideCount = this.slides.length;
      this.interval = null;
      this.slideInterval = 3000; // 3 seconds

      this.init();
    }

    init() {
      // Create dots
      this.createDots();

      // Set active slide
      this.goToSlide(this.currentIndex);

      // Start auto-slide
      this.startAutoSlide();

      // Event listeners for dots
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.goToSlide(index);
          this.resetAutoSlide();
        });
      });

      // Optional: Add arrow navigation if needed
      this.addArrowNavigation();
    }

    createDots() {
      this.slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('rtl-dot');
        if (index === 0) dot.classList.add('active');
        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
      });
    }

    goToSlide(index) {
      // Ensure index is within bounds
      if (index < 0) {
        index = this.slideCount - 1;
      } else if (index >= this.slideCount) {
        index = 0;
      }

      // Update slide position
      this.track.style.transform = `translateX(${index * 100}%)`;

      // Update active dot
      this.dots.forEach(dot => dot.classList.remove('active'));
      this.dots[index].classList.add('active');

      this.currentIndex = index;
    }

    nextSlide() {
      this.goToSlide(this.currentIndex + 1);
    }

    prevSlide() {
      this.goToSlide(this.currentIndex - 1);
    }

    startAutoSlide() {
      this.interval = setInterval(() => {
        this.nextSlide();
      }, this.slideInterval);
    }

    resetAutoSlide() {
      clearInterval(this.interval);
      this.startAutoSlide();
    }

    addArrowNavigation() {
      // Create arrow buttons if they don't exist
      if (!this.container.querySelector('.rtl-slider-prev')) {
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('rtl-slider-prev', 'rtl-slider-arrow');
        prevBtn.innerHTML = '&#10094;';
        prevBtn.addEventListener('click', () => {
          this.prevSlide();
          this.resetAutoSlide();
        });
        this.container.appendChild(prevBtn);
      }

      if (!this.container.querySelector('.rtl-slider-next')) {
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('rtl-slider-next', 'rtl-slider-arrow');
        nextBtn.innerHTML = '&#10095;';
        nextBtn.addEventListener('click', () => {
          this.nextSlide();
          this.resetAutoSlide();
        });
        this.container.appendChild(nextBtn);
      }
    }
  }

  // Initialize slider
  new RTLSilder('.rtl-slider-container');
});
// slider end 


document.addEventListener('DOMContentLoaded', function () {
  // Product box hover effects for touch devices
  const productBoxes = document.querySelectorAll('.product-box');

  // Add touch support for hover effects
  productBoxes.forEach(box => {
    box.addEventListener('touchstart', function () {
      this.classList.add('hover-effect');
    });

    box.addEventListener('touchend', function () {
      setTimeout(() => {
        this.classList.remove('hover-effect');
      }, 200);
    });
  });

  // Optional: Lazy loading for images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.product-image img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
});
// buttons clicked 
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    // Optional: Add click tracking or other functionality
    console.log('Button clicked:', this.textContent);

    // Uncomment to prevent default link behavior
    // e.preventDefault();
  });
});


// shamsi date -------------------------

function displayShamsiDates() {
  // Get current date
  const today = new Date();
  
  // Calculate tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Calculate date 3 days later
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 4);
  
  try {
      // Convert to Shamsi
      const pdTomorrow = new persianDate(tomorrow);
      const pdThreeDaysLater = new persianDate(threeDaysLater);
      
      // Format and display
      document.getElementById('tomorrow-date').textContent = pdTomorrow.format('YYYY/MM/DD');
      document.getElementById('three-days-later').textContent = pdThreeDaysLater.format('YYYY/MM/DD');
  } catch (e) {
      console.error("Failed to display Shamsi dates:", e);
      document.getElementById('tomorrow-date').textContent = "Error loading date";
      document.getElementById('three-days-later').textContent = "Error loading date";
  }
}

function waitForPersianDate(callback, timeout = 3000) {
  const startTime = Date.now();
  
  const checkInterval = setInterval(function() {
      if (typeof persianDate !== 'undefined') {
          clearInterval(checkInterval);
          callback();
      } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          console.error("PersianDate library failed to load after " + timeout + "ms");
          document.getElementById('tomorrow-date').textContent = "Date library not loaded";
          document.getElementById('three-days-later').textContent = "Date library not loaded";
      }
  }, 100);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  waitForPersianDate(displayShamsiDates);
});

// end shamsi date -------------------------
