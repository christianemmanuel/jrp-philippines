document.addEventListener('DOMContentLoaded', function () {

  // Tab Menu
  const tabButtons = document.querySelectorAll('.tab-menu button');

  if(tabButtons.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        showTab(tabId);
      });
    });
  
    function showTab(tabId) {
      // Hide all tab contents
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
  
      // Remove active class from all buttons
      tabButtons.forEach(button => {
        button.classList.remove('active');
      });
  
      // Show the selected tab content
      const selectedTab = document.getElementById(tabId);
      selectedTab.classList.add('active');
  
      // Add active class to the selected button
      const selectedButton = document.querySelector(`.tab-menu button[data-tab="${tabId}"]`);
      selectedButton.classList.add('active');
    }
  
    // Show the first tab by default
    showTab('tab1');
  }
  
  const sliderList = document.getElementById('sliderList');
  if(sliderList) {
    const sliderItems = sliderList.children;
    const totalItems = sliderItems.length;
    const visibleItems = 3;
    let currentIndex = 0;
  
    setInterval(() => {
      currentIndex++;
      if (currentIndex >= totalItems / visibleItems) {
        currentIndex = 0;
      }
      sliderList.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 7000); // Change image every 5 seconds
  }
  
});

$(document).ready(function () {
  // HORIZONTAL SLIDER
  var $list = $('.client-list');
  if($list.length) {
    var $items = $list.children().clone(); // Clone the items
    $list.append($items); // Append the cloned items to the end of the list
    
    function startScrolling() {
      var scrollWidth = $list[0].scrollWidth / 2; // Scroll width of the original items
  
      function smoothScroll() {
        $list.animate({scrollLeft: scrollWidth}, 30000, 'linear', function() {
          $list.scrollLeft(0);
          smoothScroll();
        });
      }
      smoothScroll();
    }

    startScrolling();
  }

  // Initialize Masonry and LightGallery
  function initMasonryAndLightGallery() {
    var gridMasonry = $('.masonry-grid'); 
    if (gridMasonry.length) {
      $('.masonry-grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
      });
      
      $('.masonry-grid').lightGallery({
        download: false
      });
    }
  }

  // Initialize Masonry and LightGallery on page load
  initMasonryAndLightGallery();

  // Tab click event handler
  $('.workshop-menu-list a').click(function(e) {
    e.preventDefault();
    
    // Remove active classes from all tabs and contents
    $('ul li a').removeClass('active-nav');
    $('.tab-content').removeClass('active-tab');
    
    // Add active class to clicked tab
    $(this).addClass('active-nav');
    
    // Show the corresponding tab content
    var target = $(this).attr('href');
    $(target).addClass('active-tab');
    
    // Trigger Masonry layout update for the active tab
    setTimeout(function() {
      $(target).find('.masonry-grid').masonry('layout');
    }, 0);
  });

  let cardWrapper = $('.cards-wrapper');

  if(cardWrapper.length) {
    cardWrapper.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 7000, // 3 seconds
      infinite: true,      // Auto-loop
      pauseOnHover: false,
      centerMode: true,    // Center the active slide

      draggable: true,      // Enable dragging
      arrows: false,
      dots: true,
      centerPadding: '60px',
    });
  }


  let gslide = $('.glide__slides');

  if(gslide.length) {
    gslide.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000, // 3 seconds
      infinite: false,      // Auto-loop
      pauseOnHover: true,

      draggable: false,      // Enable dragging
      arrows: false,
      dots: true,
    });
  }
  
  let currentImageIndex = 0;
  const images = $('#personality-program-slider img');
  const totalImages = images.length;

  function showNextImage() {
    images.eq(currentImageIndex).fadeOut(500, function() {
      currentImageIndex = (currentImageIndex + 1) % totalImages;
      images.eq(currentImageIndex).fadeIn(500);
    });
  }

  setInterval(showNextImage, 5000);


});



