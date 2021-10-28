"use strict";

//QUERYSELECTORS

const start = document.querySelector(".start");
const schronisko = document.querySelector(".schronisko");
const zdjecia = document.querySelector(".zdjecia");
const inne = document.querySelector(".inne");
const galeria = document.querySelector(".galeria");
const cta = document.querySelector(".cta");
const nav = document.querySelectorAll(".menu__");
const stickyNav = document.body;
const sectionIntro = document.querySelector(".section-introduction");
const sectionHero = document.querySelector(".hero-section");
const counters = document.querySelectorAll(".num");

/////////////////
// TRACY AGE

let today = new Date();
let year = today.getFullYear();

const birthMonth = 6;
const birthYear = 2017;
const birthDay = 15;

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const oneDay = 1000 * 60 * 60 * 24;

  const diffInTime = date2.getTime() - date1.getTime();

  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}

const yearsAge = function (days) {
  const year = Math.round(days / 365);
  return year;
};

const humanToDogYears = function (year) {
  let dogYear = 0;
  if (year <= 2) dogYear += year * 10.5;
  //first two year equal to 10,5 rest equal 4
  else {
    dogYear += 10.5 + 10.5 + (year - 2) * 4;
  }
  return dogYear;
};

const monthAge = function (days) {
  return Math.round(days / 30);
};
//Tracy age counter
let daysTracy = year - birthYear;

/////////////////
//LOCATION API

const mymap = L.map("map").setView([50.974, 21.322], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
}).addTo(mymap);
const marker = L.marker([50.974, 21.322]).addTo(mymap);

//////////////////////
// Event Listeners
start.addEventListener("click", function () {
  nav.forEach((ele) => ele.classList.remove("active"));
  start.classList.add("active");
});

schronisko.addEventListener("click", function () {
  nav.forEach((ele) => ele.classList.remove("active"));
  schronisko.classList.add("active");
  maper.style.display = "block";
});

zdjecia.addEventListener("click", function () {
  nav.forEach((ele) => ele.classList.remove("active"));
  zdjecia.classList.add("active");
});

inne.addEventListener("click", function () {
  nav.forEach((ele) => ele.classList.remove("active"));
  inne.classList.add("active");
});

galeria.addEventListener("click", function () {
  nav.forEach((ele) => ele.classList.remove("active"));
  galeria.classList.add("active");
});

cta.addEventListener("click", function () {
  nav.forEach((ele) => ele.classList.remove("active"));
  cta.classList.add("active");
});

/////////////////////////////////////
// Counters

const speed = 10000;
const arr = [
  getNumberOfDays("6/15/2017", today),
  monthAge(getNumberOfDays("6/15/2017", today)),
  yearsAge(getNumberOfDays("6/15/2017", today)),
  humanToDogYears(yearsAge(getNumberOfDays("6/15/2017", today))),
];

// COUNTER START OBSERVER
const observer = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      counters.forEach((counter, i) => {
        if (!entry.isIntersecting) {
          return;
        }

        const updateCount = () => {
          const target = +arr[i];
          const count = +counter.innerText;

          const inc = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + inc);

            setTimeout(updateCount, 1);
          }
        };
        updateCount();
      });
    });
  },
  {
    root: null,
    rootMargin: "20px",
    threshold: 1,
  }
);
observer.observe(sectionIntro);
///////////////////////

// STICKY NAV MENU OBSERVER
const obsNav = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      counters.forEach((counter, i) => {
        if (!entry.isIntersecting) {
          stickyNav.classList.add("sticky");
          return;
        }
        stickyNav.classList.remove("sticky");
      });
    });
  },
  {
    root: null,
    threshold: 0,
  }
);

obsNav.observe(sectionHero);

// CAROUSEL //////////////////////////////

let curSlide = 0;

const slides = document.querySelectorAll(".slide");
const slide = document.querySelector(".carousel");
const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");
const dotContainter = document.querySelector(".dots");

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainter.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

activeDot(curSlide);
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
const goToSlide = function (curSlide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};

btnRight.addEventListener("click", function () {
  if (curSlide !== 3) {
    curSlide++;
    goToSlide(curSlide);
    activeDot(curSlide);
  } else {
    curSlide = 0;
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
    activeDot(curSlide);
  }
});

btnLeft.addEventListener("click", function () {
  if (curSlide !== 0) {
    curSlide--;
    goToSlide(curSlide);
    activeDot(curSlide);
  } else {
    curSlide = 3;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
    activeDot(curSlide);
  }
});

dotContainter.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});
