"use strict";
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDay();

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

console.log();
//Tracy age counter
let daysTracy = year - birthYear;
document.getElementById("brithTracy").innerHTML = `Tracy ma ${getNumberOfDays(
  "6/15/2017",
  today
)} dni czyli około ${yearsAge(
  getNumberOfDays("6/15/2017", today)
)} lat ludzkich i ${humanToDogYears(
  yearsAge(getNumberOfDays("6/15/2017", today))
)} psich`;

let image = document.getElementById("myIMG1");

let img = document.getElementById("firIMG");
let img2 = document.getElementById("secIMG");
let img3 = document.getElementById("thrIMG");
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
img.onclick =
  img2.onclick =
  img3.onclick =
    function () {
      image.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };

let span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  image.style.display = "none";
};
