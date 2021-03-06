import "bootstrap";
import "./index.scss";

const CANVAS_WIDTH = 630;
const CANVAS_HEIGHT = 630;
const TARGET_X = 106;
const TARGET_Y = 319;
const TARGET_W = 430;
const TARGET_H = 75;

window.onload = () => {
  const inputElement = document.getElementById("upload");
  inputElement.addEventListener("change", handleUpload, false);

  const outputElement = document.getElementById("download");
  outputElement.addEventListener("click", handleDownload, false);

  loadInitialImage();
};

function loadInitialImage() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const initialImage = document.getElementById("initialImage");

  ctx.drawImage(initialImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleUpload() {
  const errorBox = document.getElementById("error");
  errorBox.classList.add("d-none");

  const image = new Image();
  image.onload = drawOnTop;
  image.onerror = failed;
  image.src = URL.createObjectURL(this.files[0]);
}

function drawOnTop() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Take full width, but put it in the middle
  const shrinkRatio = TARGET_W / this.width;
  const newHeight = this.height * shrinkRatio;
  const newY = TARGET_Y + TARGET_H / 2 - newHeight / 2;

  ctx.drawImage(this, TARGET_X, newY, TARGET_W, newHeight);

  const initialImage = document.getElementById("initialImage");
  ctx.drawImage(initialImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function failed() {
  const errorBox = document.getElementById("error");
  errorBox.classList.remove("d-none");
}

function handleDownload() {
  const canvas = document.getElementById("canvas");

  var link = document.getElementById("downloadLink");
  link.setAttribute("download", "MeinBundeshaus.png");
  link.setAttribute(
    "href",
    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
  );
  link.click();
}
