// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                // Re-trigger animation
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'fadeInScale 0.6s ease-out forwards';
                }, 10);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
let currentImageIndex = 0;
let visibleImages = [];

// Update visible images array when filter changes
function updateVisibleImages() {
    visibleImages = Array.from(galleryItems).filter(item =>
        item.style.display !== 'none'
    );
}

// Open lightbox when clicking on gallery item
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        const imgSrc = item.querySelector('img') ?
            item.querySelector('img').src :
            item.querySelector('.placeholder-img').textContent.trim();
        lightboxImage.src = imgSrc;
        lightbox.classList.add('active');
    });
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Navigate to previous image
prevImage.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    const imgSrc = visibleImages[currentImageIndex].querySelector('img') ?
        visibleImages[currentImageIndex].querySelector('img').src :
        visibleImages[currentImageIndex].querySelector('.placeholder-img').textContent.trim();
    lightboxImage.src = imgSrc;
});

// Navigate to next image
nextImage.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    const imgSrc = visibleImages[currentImageIndex].querySelector('img') ?
        visibleImages[currentImageIndex].querySelector('img').src :
        visibleImages[currentImageIndex].querySelector('.placeholder-img').textContent.trim();
    lightboxImage.src = imgSrc;
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            prevImage.click();
        } else if (e.key === 'ArrowRight') {
            nextImage.click();
        }
    }
});

// Initialize visible images
updateVisibleImages();