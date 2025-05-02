document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});
// slider start
document.addEventListener('DOMContentLoaded', function() {
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