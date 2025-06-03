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

// start create table of contents 
document.addEventListener('DOMContentLoaded', function() {
  const postText = document.querySelector('.post-text');
  if (!postText) return;

  // Select only h2 and h3 inside post-content (or post-text if that's where your content is)
  const postContent = document.querySelector('.post-content') || postText;
  const headings = postContent.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  // Create TOC container
  const toc = document.createElement('div');
  toc.className = 'toc-container';

  // Create TOC title
  const tocTitle = document.createElement('h2');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = 'لیست موضوعات این صفحه ';
  toc.appendChild(tocTitle);

  // Create UL
  const tocList = document.createElement('ul');
  tocList.className = 'toc-ul';

  // Track used IDs to prevent duplicates
  const usedIds = {};

  headings.forEach(heading => {
    // Generate unique ID
    let id = heading.textContent
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Handle duplicate IDs
    if (usedIds[id]) {
      let counter = 1;
      while (usedIds[`${id}-${counter}`]) {
        counter++;
      }
      id = `${id}-${counter}`;
    }
    usedIds[id] = true;
    heading.id = id;

    // Create TOC item
    const tocItem = document.createElement('li');
    tocItem.className = `toc-li toc-${heading.tagName.toLowerCase()}`;
    
    const tocLink = document.createElement('a');
    tocLink.href = `#${id}`;
    tocLink.textContent = ' ✅ '+ heading.textContent;
    
    // Add click handler with navbar offset
    tocLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 110, // Adjust to your navbar height
          behavior: 'smooth'
        });
        // Update URL without adding to history
        window.history.replaceState(null, null, `#${id}`);
      }
    });
    
    tocItem.appendChild(tocLink);
    tocList.appendChild(tocItem);
  });

  toc.appendChild(tocList);
  
  // Insert the TOC at the top of the post-text div
  postText.insertBefore(toc, postText.firstChild);
});
// end table of contents 

// start back to top button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  
  // Modern scroll detection
  function toggleBackToTop() {
    if (window.pageYOffset > 300 || 
        document.documentElement.scrollTop > 300 || 
        document.body.scrollTop > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
  
  // Cross-browser scroll events
  window.addEventListener('scroll', toggleBackToTop);
  window.addEventListener('touchmove', toggleBackToTop);
  
  // Enhanced scroll-to-top function
  function scrollToTop() {
    try {
      // Try modern smooth scrolling first
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      // Fallback for older browsers
      const scrollStep = -window.scrollY / 15;
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    }
  }
  
  // Click/touch handler
  backToTopButton.addEventListener('click', scrollToTop);
  backToTopButton.addEventListener('touchend', function(e) {
    e.preventDefault(); // Prevent ghost clicks on mobile
    scrollToTop();
  });
});
// end back to top button
// START price formatting
document.addEventListener('DOMContentLoaded', function() {
  // Get all elements with class 'price'
  const priceElements = document.querySelectorAll('.price');
  
  priceElements.forEach(element => {
    // Get the raw number from the element's text
    const rawText = element.textContent.trim();
    
    try {
      // Parse the number (handles both integers and decimals)
      const numberValue = parseFloat(rawText.replace(/[^\d.-]/g, ''));
      
      if (!isNaN(numberValue)) {
        // Format with commas and optional decimals
        const formattedValue = new Intl.NumberFormat(undefined, {
          minimumFractionDigits: rawText.includes('.') ? 2 : 0,
          maximumFractionDigits: 2
        }).format(numberValue);
        
        // Update the element's content
        element.textContent = formattedValue;
        
        // Add decimal class if needed
        if (formattedValue.includes('.')) {
          element.classList.add('decimal');
        }
      }
    } catch (e) {
      console.warn('Could not format price:', rawText);
    }
  });
});
// END price formatting
// start product images
 function changeMainImage(thumbnail) {
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  // Update main image
  mainImage.src = thumbnail.src;
  
  // Update active thumbnail
  thumbnails.forEach(t => t.classList.remove('active'));
  thumbnail.classList.add('active');
}

// Optional: Add zoom on hover functionality
document.querySelector('.zoomable-image')?.addEventListener('mousemove', function(e) {
  const x = e.clientX - e.target.getBoundingClientRect().left;
  const y = e.clientY - e.target.getBoundingClientRect().top;
  this.style.transformOrigin = `${x}px ${y}px`;
});
// end product images 