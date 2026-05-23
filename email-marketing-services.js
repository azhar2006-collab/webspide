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

scrollWrapper.addEventListener('wheel', function (e) {
  if (timeout) {
    e.preventDefault();
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    horizontalScroll(e);
  }, 100); // Adjust the delay as needed
}, { passive: false });