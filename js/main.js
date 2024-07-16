document.addEventListener('DOMContentLoaded', function () {
  new Glide('.glide', {
    perView: 1,
    type: 'carousel',
    autoplay: 5000,
    hoverpause: false,
    dragThreshold: false,
  }).mount();

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