document.addEventListener('DOMContentLoaded', function () {
  
  let glideHeader = document.querySelector('.glide');
  if(glideHeader) {
    new Glide('.glide', {
      perView: 1,
      type: 'carousel',
      autoplay: 5000,
      hoverpause: false,
      dragThreshold: false,
    }).mount();
  }

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



  const $carousel = $('.carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    $carousel.on('mousedown', function (e) {
        isDown = true;
        $carousel.addClass('active');
        startX = e.pageX - $carousel.offset().left;
        scrollLeft = $carousel.scrollLeft();
    });

    $carousel.on('mouseleave mouseup', function () {
        if (!isDown) return;
        isDown = false;
        $carousel.removeClass('active');
        
        // Snap to the nearest card
        const cardWidth = $('.card').outerWidth(true);
        $carousel.animate({
            scrollLeft: Math.round($carousel.scrollLeft() / cardWidth) * cardWidth
        }, 300);
    });

    $carousel.on('mousemove', function (e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - $carousel.offset().left;
        const walk = (x - startX) * 2; // Adjust the scroll speed
        $carousel.scrollLeft(scrollLeft - walk);
    });
});
