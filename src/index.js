import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import './index.scss'

document.addEventListener('DOMContentLoaded', (event) => {
  const inputElement = document.getElementById("upload");
  inputElement.addEventListener("change", handleUpload, false);

})

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
  ctx.drawImage(this, 0,0);
}

function failed() {
  console.error("The provided file couldn't be loaded as an Image media");
}
