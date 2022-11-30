gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true
});

locoScroll.on('scroll', (position) => {
if ((position.scroll.y) > 20) {
    document.querySelector('nav').classList.add('scroll-down');
} else {
    $("nav").css("top", "inherit");
    document.querySelector('nav').classList.remove('scroll-down');
}
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});


ScrollTrigger.matchMedia({

  "(min-width: 960px)": function() {

    gsap.from(".s-1", {
      scrollTrigger: {
        trigger: ".s-1",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "200px bottom",
        end: "top center",
      },
      scale: 0.87,
      transformOrigin: "center center",
      ease: "none"
    });

    gsap.from(".s-2", {
      scrollTrigger: {
        trigger: ".s-2",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "top bottom",
        end: "top center",
      },
      scale: 0.87,
      transformOrigin: "center center",
      ease: "none"
    });

    /*Cards funtionaly*/
    ScrollTrigger.create({
      trigger: ".card-1",
      start: "=+30px bottom",
      scroller: ".smooth-scroll",
      end: "bottom top",
      toggleActions: "play none none none",
      toggleClass: "view",
    });

    ScrollTrigger.create({
      trigger: ".card-2",
      start: "=+40px bottom",
      scroller: ".smooth-scroll",
      end: "bottom top",
      toggleClass: "view",
    });

    ScrollTrigger.create({
      trigger: ".card-3",
      start: "=+50px bottom",
      scroller: ".smooth-scroll",
      end: "bottom top",
      toggleClass: "view",
    });

    /*CTA*/
    gsap.from(".s-3", {
      scrollTrigger: {
        trigger: ".s-3",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "top bottom",
        end: "top center",
      },
      scale: 0.87,
      transformOrigin: "center center",
      ease: "none"
    });


    ScrollTrigger.create({
      trigger: ".s-bg-cta-con",
      start: "=+20px bottom",
      scroller: ".smooth-scroll",
      end: "bottom top",
      toggleClass: "view",
    });


    gsap.from(".s-4", {
      scrollTrigger: {
        trigger: ".s-4",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "top bottom",
        end: "top center",
      },
      scale: 0.87,
      transformOrigin: "center center",
      ease: "none"
    });

    gsap.from(".s-5", {
      scrollTrigger: {
        trigger: ".s-5",
        scroller: ".smooth-scroll",
        scrub: true,
        start: "top bottom",
        end: "top center",
      },
      scale: 0.87,
      transformOrigin: "center center",
      ease: "none"
    });


    gsap.timeline({
     scrollTrigger: {
       trigger: '.s-cards',
       scroller: ".smooth-scroll",
       start: '=-40 center',
       end: 'bottom bottom', //+=300
       toggleActions: "play none reverse reset",
       defaults:{
         ease: 'power1.inOut',
         duration:1,
         transformOrigin:'0 0'
       },
     },
   })

   /*numero 1*/
   .from('.card-img ', { y: 20, x: 20, opacity: 0})
   .to('.card-img ', { immediateRender: false, duration:1.5 })
   .to('.card-img ', { y: 0})

  }

});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var swiper = new Swiper(".prodSwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

var animation = bodymovin.loadAnimation({
  // animationData: { /* ... */ },
  container: document.getElementById('icon-container'), // required
  path: '../data.json', // required
  renderer: 'svg', // required
  loop: true, // optional
  autoplay: true, // optional
  name: "Logo", // optional
});

$(window).bind("load", function() {
 // code here
 $('.overlay-l').delay(500).fadeOut();
});
