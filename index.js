const carousel = document.querySelector('.carousel');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;
let items = [];

// Fetch and load banner images
async function fetchBannerData() {
  try {
    const response = await fetch('https://ecams-billboard--api.azurewebsites.net/api/banners');
    const data = await response.json();

    if (Array.isArray(data)) {
      loadSlides(data);
    } else {
      console.error('Unexpected data format:', data);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Create and insert the slides into the carousel
function loadSlides(bannerData) {
  bannerData.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-item', 'w-full', 'flex-shrink-0', 'h-full');
    
    const img = document.createElement('img');
    img.src = `https://ecams-billboard--api.azurewebsites.net/uploads/${item.image_name}`;
    img.alt = item.name || `Slide ${index + 1}`;
    
    slide.appendChild(img);
    carousel.appendChild(slide);
  });

  updateItems();
  startAutoSlide();
}

// Update the list of slides
function updateItems() {
  items = document.querySelectorAll('.carousel-item');
}

// Show the next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}

// Show the previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
}

// Adjust carousel position
function updateCarousel() {
  const translateX = -currentIndex * 100;
  carousel.style.transform = `translateX(${translateX}%)`;
}

// Auto-transition every 10 seconds
function startAutoSlide() {
  setInterval(nextSlide, 10000);
}

// Initialize the carousel
fetchBannerData();

// Event listeners for navigation buttons
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);