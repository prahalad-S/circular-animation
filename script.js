const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const topCenterText = document.querySelector(".top-center-text");
const images = Array.from(document.querySelectorAll(".image-wrapper"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeButton = document.getElementById("close");

const radius = 250;
const angleStep = 30;
let currentRotation = -90;

function normalizeRotation(rotation) {
    rotation = (rotation + 180) % 360;
    if (rotation < 0) rotation += 360;
    return rotation - 180;
}

function updateCarousel() {
    let closestAngle = 180;
    let topImage = null;

    images.forEach((img, index) => {
        let angle = index * angleStep + currentRotation;
        angle = normalizeRotation(angle);

        const visible = angle >= -90 && angle <= 90;
        img.style.visibility = visible ? "visible" : "hidden";
        img.style.transform = `rotate(${angle}deg) translate(0, -${radius}px)`;

        if (Math.abs(angle) < closestAngle) {
            closestAngle = Math.abs(angle);
            topImage = img;
        }
    });

    // Hide all spans
    images.forEach((img) => (img.querySelector("span").style.display = "none"));

    if (topImage) {
        const spanText = topImage.querySelector("span").textContent;
        topCenterText.textContent = spanText;
        //  topImage.querySelector('span').style.display = 'block';
    }
}

// Next button
nextButton.addEventListener("click", () => {
    currentRotation -= angleStep;
    images.forEach((img) => (img.style.transition = "transform 0.5s ease"));
    updateCarousel();
});

// Prev button
prevButton.addEventListener("click", () => {
    currentRotation += angleStep;
    images.forEach((img) => (img.style.transition = "transform 0.5s ease"));
    updateCarousel();
});

// Lightbox functionality
images.forEach((img) => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        topCenterText.classList.add("showTitle");
       // lightboxImg.src = img.querySelector("img").src;
       img.style.cssText = "width:250px; height:250px; z-index:2; transition:0.25s ease; left: 50%; transform: translateX(-50%);";
    });
});

closeButton.addEventListener("click", () => {
  lightbox.style.display = "none"; // hide the lightbox

  // Reset all images to their original state
  images.forEach((img) => {
    img.style.cssText = "width:100px; height:100px; z-index:1; transition:0.25s ease;";
  });
  topCenterText.classList.remove("showTitle");
  updateCarousel();
});

// Initialize
updateCarousel();
