// section 1
const icons = document.querySelectorAll('.icon');
const centerText = document.getElementById('centerText');
const mainImage = document.querySelector('.main-image'); // Select the image

icons.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    centerText.textContent = icon.dataset.text;
    mainImage.style.display = 'none'; // Hide image on hover
  });
  icon.addEventListener('mouseleave', () => {
    centerText.textContent = '';
    mainImage.style.display = 'block'; // Show image when not hovering
  });
});


// section 2
const slider = document.getElementById("slider");
let currentIndex = 0;

function updateSlider() {
  const slideWidth = slider.clientWidth / 3;
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
  const totalSlides = slider.children.length;
  const maxIndex = Math.ceil(totalSlides / 3) - 0;

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
}

window.addEventListener("resize", updateSlider);

//section3
const readMoreFunc = (container) => {
  let contentHidden = true
  const img = container.querySelector('.image-container img');
  const textContainer = container.querySelector('.text-content');
  const actualHeight = textContainer.clientHeight;
  const btn = container.querySelector('.read-more-btn button');
  const fade = container.querySelector('.fade');


  // Initially limit height to match image
  const matchHeight = () => {
    const imageHeight = img.clientHeight;
    textContainer.style.height = `${imageHeight}px`;
    btn.innerHTML = 'Read More';
    contentHidden = true;
    fade.style.opacity = '1';
  };

  matchHeight(); // call once initially

  // Optional: if the image loads late
  img.onload = matchHeight;

  btn.addEventListener('click', () => {
    if (contentHidden) {
      textContainer.style.height = `${actualHeight}px`;
      btn.innerHTML = 'Show Less';
      fade.style.opacity = '0';
      contentHidden = false;
    } else {
      matchHeight();

    }
  });
}


window.addEventListener('DOMContentLoaded', () => {
  const readMoreContainers = document.querySelectorAll('.left-container');
  const readMoreRightContainers = document.querySelectorAll('.right-container');

  for (let index = 0; index < readMoreContainers.length; index++) {
    const element = readMoreContainers[index];
    readMoreFunc(element)
  }

  for (let index = 0; index < readMoreRightContainers.length; index++) {
    const element = readMoreRightContainers[index];
    readMoreFunc(element)
  }
});
// section 4

function whyWorkHover() {
  const exploreServiceSection = document.getElementsByClassName('why-work-section');

  for (let index = 0; index < exploreServiceSection.length; index++) {
    const element = exploreServiceSection[index];
    const padding = 60;
    const width = document.body.clientWidth;
    const emptySpace = (width - 1440) / 2;
    const shiftSectionSpace = 0;
    const increaseWidth = padding + (emptySpace > 0 ? emptySpace : 0) - shiftSectionSpace - 6;


    element.addEventListener("mouseover", function () {

      const expandElement = element.querySelector('.why-work-section-expand');

      if (expandElement) {
        expandElement.style.width = `calc(100% + ${increaseWidth}px)`
      }
    });

    element.addEventListener("mouseout", function () {

      const expandElement = element.querySelector('.why-work-section-expand');

      if (expandElement) {
        expandElement.style.width = `100%`
      }
    });




  }
}

whyWorkHover()

// section 5

// const sections = document.querySelectorAll(".section");
// const timelineContainer = document.getElementById("timeline");

// let hoverEffectEnabled = true;
// let scrollInterval = null;
// let hasClicked = false;
// let resetOnScroll = false;

// const lineWidths = ["90%", "80%", "70%", "65%", "40%", "30%"];

// function activateSection(section, width = "115%") {
//   section.classList.add("active");
//   const line = section.querySelector(".line");
//   if (line) {
//     line.style.width = width;
//   }
// }

// function deactivateAllSections() {
//   sections.forEach((sec) => {
//     sec.classList.remove("active");
//     const line = sec.querySelector(".line");
//     if (line) {
//       line.style.width = "0";
//     }
//   });
// }

// function handleMouseEnter() {
//   if (!hoverEffectEnabled) return;

//   const scrollableWidth = timelineContainer.scrollWidth - timelineContainer.clientWidth;
//   const duration = 5000;
//   const fps = 60;
//   const frameDuration = 1000 / fps;
//   const steps = duration / frameDuration;
//   const scrollPerFrame = scrollableWidth / steps;

//   scrollInterval = setInterval(() => {
//     timelineContainer.scrollBy({ left: scrollPerFrame, behavior: "auto" });
//   }, frameDuration);

//   sections.forEach((section) => activateSection(section, "115%"));
// }

// function handleMouseLeave() {
//   if (!hoverEffectEnabled) return;
//   clearInterval(scrollInterval);
//   deactivateAllSections();
// }

// function handleClick(index) {
//   if (hoverEffectEnabled) return;

//   hasClicked = true;
//   resetOnScroll = true;

//   deactivateAllSections();

//   sections.forEach((section, i) => {
//     if (i < index) {
//       activateSection(section, "115%");
//     } else if (i === index) {
//       const width = lineWidths[i] || "40%";
//       activateSection(section, width);
//     }
//   });
// }

// sections.forEach((section, index) => {
//   section.addEventListener("mouseenter", handleMouseEnter);
//   section.addEventListener("mouseleave", handleMouseLeave);
//   section.addEventListener("click", () => handleClick(index));
// });

// // Disable hover after 5 seconds
// setTimeout(() => {
//   hoverEffectEnabled = false;
//   clearInterval(scrollInterval);

//   timelineContainer.scrollTo({ left: 0, behavior: "smooth" });

//   deactivateAllSections();
//   activateSection(sections[0], lineWidths[0]);

//   sections.forEach((section) => {
//     section.removeEventListener("mouseenter", handleMouseEnter);
//     section.removeEventListener("mouseleave", handleMouseLeave);
//   });
// }, 5000);

// // Detect scroll after click and reset to section 1
// let scrollTimeout;
// timelineContainer.addEventListener("scroll", () => {
//   if (!hoverEffectEnabled && hasClicked && resetOnScroll) {
//     clearTimeout(scrollTimeout);

//     scrollTimeout = setTimeout(() => {
//       resetOnScroll = false; // prevent repeat reset
//       timelineContainer.scrollTo({ left: 0, behavior: "smooth" });

//       deactivateAllSections();
//       activateSection(sections[0], lineWidths[0]);
//     }, 150); // debounce scroll
//   }
// });



const scrollWrapper = document.querySelector('.horizontal-scroll-wrapper');
const sections = document.querySelectorAll(".section");
const timelineContainer = document.getElementById("timeline");
const line = document.querySelector('.line')
line.style.width = timelineContainer.clientWidth * 0.75 + 'px';


const horizontalSection = document.querySelector('.timeline-container');
function adjustLine() {

  const lineWidth = Number(line.style.width.replace("px", ""));
  const sectionsCovered = lineWidth / sections[0].clientWidth;

  for (let index = 0; index < sections.length; index++) {
    const section = sections[index];

    if (index < (sectionsCovered)) {
      section.classList.add("active")
    } else {
      section.classList.remove("active")

    }
  }
}

adjustLine()

function horizontalScroll(e) {

  const delta = (e.deltaY > 0 ? (e.deltaY < 50 ? 120 : e.deltaY) : (e.deltaY > -50 ? -120 : e.deltaY));
  const currentScrollLeft = horizontalSection.scrollLeft;

  const isScrollingRight = delta > 0;
  const isScrollingLeft = delta < 0;

  const atStart = currentScrollLeft <= 0;
  const atEnd = currentScrollLeft >= maxScrollLeft;

  const shouldScrollHorizontally =
    (isScrollingRight && !atEnd) || (isScrollingLeft && !atStart);
  console.log('mouseenter', e.deltaY, delta, { atStart, atEnd, currentScrollLeft, maxScrollLeft });



  if (shouldScrollHorizontally) {
    e.preventDefault();
    horizontalSection.scrollBy({ left: (delta * 3), behavior: "smooth" })
    let lineWidth = line.clientWidth + (delta * 3);
    if (delta > 0) {
      if (lineWidth >= (horizontalSection.scrollWidth * 0.9)) lineWidth = (horizontalSection.scrollWidth * 0.9);
    } else if (delta < 0) {
      if (lineWidth <= (timelineContainer.clientWidth * 0.75)) lineWidth = (timelineContainer.clientWidth * 0.75);
    }
    line.style.width = ((horizontalSection.scrollWidth > lineWidth) ? lineWidth : (horizontalSection.scrollWidth * 0.9)) + "px";

    adjustLine()

  } else {
    if (atStart) {
      line.style.width = timelineContainer.clientWidth * 0.75 + 'px';
      adjustLine()
    } else if (atEnd) {
      line.style.width = horizontalSection.scrollWidth * 0.90 + 'px';
      adjustLine()
    }

    window.scrollBy({
      top: (delta * 3),
      behavior: 'smooth',
    });

    return true
  }

}

const maxScrollLeft = horizontalSection.scrollWidth - scrollWrapper.clientWidth;

let timeout = null;

scrollWrapper.addEventListener('wheel', function(e){
  if (timeout) {
    e.preventDefault();
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    horizontalScroll(e);
  }, 100); // Adjust the delay as needed
}, { passive: false });