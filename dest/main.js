const menuM = document.querySelector(".nav-m");
const btnM = document.querySelector(".header__right-btnmoblie");
const header = document.querySelector(".header");
// menu M
function handelBtnM() {
  btnM.addEventListener("click", function () {
    header.classList.remove("--active");
    btnM.classList.toggle("--active");
    menuM.classList.toggle("--active");
    disableScrollBody();
  });
}
handelBtnM();

// Change backgroup header
function changeBgHeader() {
  window.addEventListener("scroll", function () {
    if (this.window.scrollY > 500) {
      header.classList.add("--active");
    } else {
      header.classList.remove("--active");
    }
  });
}
changeBgHeader();

// windows not resize
function resizeMenuM() {
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      menuM.classList.remove("--active");
      btnM.classList.remove("--active");
      bodyElem.classList.remove("--disable-scroll");
    }
  });
}
resizeMenuM();

// handle scroll body

const bodyElem = document.querySelector("body");
function disableScrollBody() {
  bodyElem.classList.toggle("--disable-scroll");
}
function handleCarousel() {
  const elem1 = document.querySelector(".scuserssay__feedback");
  if (elem1) {
    const flkty = new FlickityResponsive(elem1, {
      // options
      cellAlign: "center",
      contain: true,
      draggable: true,
      pageDots: true,
      wrapAround: true,
      groupCells: 2,
      percentPosition: false,
      setGallerySize: 1,
      prevNextButtons: false,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            groupCells: 1,
            cellAlign: "center",
          },
        },
        {
          breakpoint: 768,
          settings: {
            cellAlign: "left",
          },
        },
      ],
    });
  }
}

handleCarousel();

// handle feedback
function handleFeedback() {
  const feedbackElements = document.querySelectorAll(".feedback");
  let maxHeight = 0;
  feedbackElements.forEach((feedback) => {
    const feedbackHeight = feedback.offsetHeight;
    if (feedbackHeight > maxHeight) {
      maxHeight = feedbackHeight;
    }
  });
  // Áp dụng chiều cao lớn nhất cho tất cả các phản hồi
  feedbackElements.forEach((feedback) => {
    feedback.style.height = `${maxHeight}px`;
  });
}
handleFeedback();

// PopUpvideo
function popUpVideo(elemActive) {
  const activeElement = document.querySelector(`${elemActive}`);
  if (activeElement) {
    const popupElement = document.querySelector(".popup");
    const close = document.querySelector(".popup__video-close");
    const linkELement = document.querySelector(".popup__video iframe");
    const urlbtnVideo = document
      .querySelector(".row__video")
      .getAttribute("data-src");
    activeElement.addEventListener("click", () => {
      popupElement.classList.add("--active");
      linkELement.setAttribute("src", urlbtnVideo + "?autoplay=1");
      disableScrollBody();
    });
    close.addEventListener("click", () => {
      popupElement.classList.remove("--active");
      linkELement.setAttribute("src", "");
      disableScrollBody();
    });
  }
}
popUpVideo(".row__video");

function accordion() {
  const rowFAQ = document.querySelectorAll(".scfaq__row");
  const plus = document.querySelectorAll(".scfaq__row-question span");
  const answer = document.querySelectorAll(".scfaq__row-answer");

  let activeRow = null;

  rowFAQ.forEach((item, i) => {
    item.addEventListener("click", function () {
      // Đóng tất cả các câu trả lời và bỏ lớp "--active" trên tất cả các nút "plus"
      answer.forEach((itemanswer) => {
        itemanswer.style.maxHeight = null;
      });
      plus.forEach((itemplus) => {
        itemplus.classList.remove("--active");
      });

      // Kiểm tra xem câu hỏi đang mở có phải là câu hỏi hiện tại không
      if (activeRow !== this) {
        // Mở câu trả lời và thêm lớp "--active" cho câu hỏi hiện tại
        answer[i].style.maxHeight = answer[i].scrollHeight + "px";
        plus[i].classList.add("--active");
        activeRow = this;
      } else {
        activeRow = null;
      }
    });
  });
}
accordion();

// validate

function validateForm() {
  const form = document.querySelector(".groupinfo");
  const formgroup = document.querySelectorAll(".formgroup");
  const label = document.querySelectorAll(".formgroup label");
  const error = document.querySelectorAll(".formgroup span");
  const btnForm = document.querySelector(".groupinfo .btn");
  const input = document.querySelectorAll(".formgroup input");
  // input value outline is blue
  label.forEach((item) => {
    const input = item.nextElementSibling;
    input.addEventListener("click", function () {
      input.style.outline = "1px solid blue";
    });
  });

  btnForm?.addEventListener("click", function () {
    label.forEach((item) => {
      const input = item.nextElementSibling;
      input.addEventListener("focus", function () {
        input.style.outline = "1px solid blue";
        input.nextElementSibling.innerText = "";
      });
      if (input.value === "") {
        input.style.outline = "1px solid red";
        input.nextElementSibling.innerText = "Please fill in this field";
      } else {
        input.style.outline = "none";
        input.nextElementSibling.innerText = "";
      }
    });
  });
}
validateForm?.();

// loadding
function handleLoading(percent) {
  const progress = document.querySelector(".loading__inner-progress");
  const textPercent = document.querySelector(".loading__percent");
  if (progress) {
    progress.style.width = `${percent}%`;
  }

  if (textPercent) textPercent.innerText = `${percent}%`;
}

function hideLoading() {
  const loading = document.querySelector(".loading");
  const body = document.querySelector("body");

  if (loading) loading.classList.add("--is-loaded");
  body.classList.remove("--disable-scroll");
}

function initLoading() {
  let loadedCount = 0;
  imgs = document.querySelectorAll("img").length;
  container = document.querySelector("body");
  const imgLoad = new imagesLoaded(container);

  imgLoad.on("progress", function (instance) {
    loadedCount++;
    let percent = Math.floor((loadedCount / imgs) * 100);
    handleLoading?.(percent);
  });

  imgLoad.on("always", function (instance) {});

  imgLoad.on("done", function (instance) {
    hideLoading();
    handleCarousel();
  });
  imgLoad.on("fail", function (instance) {
    console.log("fall");
  });
}

initLoading();
