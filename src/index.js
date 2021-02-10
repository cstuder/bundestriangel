import 'bootstrap'
import './index.scss'

const CANVAS_WIDTH = 730;
const CANVAS_HEIGHT = 383;

document.addEventListener('DOMContentLoaded', (event) => {
    const inputElement = document.getElementById("upload");
    inputElement.addEventListener("change", handleUpload, false);

    loadInitialImage();
});

function loadInitialImage() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(document.getElementById('initialImage'), 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function handleUpload() {
    const image = new Image();
    image.onload = draw;
    image.onerror = failed;
    image.src = URL.createObjectURL(this.files[0]);
}

function draw() {
  var canvas = document.getElementById('canvas');
  canvas.width = this.width;
  canvas.height = this.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(this, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function failed() {
    console.log(this);
    console.error("The provided file couldn't be loaded as an Image media");
}
