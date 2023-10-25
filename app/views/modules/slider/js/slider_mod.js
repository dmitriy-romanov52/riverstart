if(document.querySelector(".mySwiper")){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        initialSlide: 0,
        centeredSlides: true,
        allowTouchMove: isSmallScreen(),
        loop: false,
        loopAdditionalSlides: 2,
        loopedSlides: 3, // настройте это значение, исходя из количества отображаемых слайдов
        navigation: {
          prevEl: ".slider .prev-slide",
          nextEl: ".slider .next-slide",
        },
      });
      
      function isSmallScreen() {
        return window.innerWidth < 1200;
      }
      
      window.addEventListener("resize", function() {
        swiper.params.allowTouchMove = isSmallScreen();
        swiper.update();
      });
}