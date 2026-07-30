var image_slide = new Array("images/historyofskate1.jpg", "simages/AndyAndersonWhatIsSkate.jpg");
var image_length = image_slide.length;
var image_current = -1;

function slideRight() {
    if (image_current >= image_length-1){
        image_current = 0;
    } else {
        image_current++;
    }
    const image = document.querySelector("#MediumSquareImgGallery img"); 
    image.src = image_slide[image_current];
}

const RightGalleryButton = document.getElementById("RightButton");
const LeftGalleryButton = document.getElementById("LeftButton");
const parentDiv = document.getElementById('MainContentTwo');
const innerTitleDiv = document.getElementsByClassName("TitleText")

if (RightGalleryButton != null) {
        RightGalleryButton.addEventListener('click', function() {
        slideRight()
        innerTitleDiv.textContent = "The Great Skate Renaissance"
    });
}

    const canvas = document.getElementById('GameContainer');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let xprev = 0;
    let yprev = 0;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;


  window.addEventListener('resize', resizeCanvas, false);
        
  function resizeCanvas() {
    canvas.width = (window.innerWidth * 0.9);
    canvas.height = (window.innerHeight *0.5);
                
        canvas.addEventListener('mousedown', (z) => {
        drawing = true;
        xprev = z.offsetX;
        yprev = z.offsetY;
    });

    canvas.addEventListener('mousemove', (z) => {
        if (!drawing) return;
        ctx.beginPath();
        ctx.moveTo(xprev, yprev);
        ctx.lineTo(z.offsetX, z.offsetY);
        ctx.stroke();
        xprev = z.offsetX;
        yprev = z.offsetY;
    });

            canvas.addEventListener('mouseup', (z) => {
        drawing = false;
    });
  }
  
  resizeCanvas();


