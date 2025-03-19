// Declaring required variables
let blue_btn = document.getElementById("blue-btn");
let yellow_btn = document.getElementById("yellow-btn");
let pink_btn = document.getElementById("pink-btn");
let umbrella_image = document.getElementById("umbrella-image");
let loader_container = document.getElementById("loader-container");
let logo_upload_button = document.getElementById("logo-upload-button");
let logo_upload_input = document.getElementById("logo-upload-input");
let logo_text = document.getElementById("logText");
let upload_logo = document.getElementById("upload-logo");
let umbrella_uploaded_logo = document.getElementById("umbrella-uploaded-logo");
let upload_loader = document.getElementById("upload-loader");
let cross_button = document.getElementById("cross-button");
let isLogoAdded = false;
let currentColor = "#2db3e5";
let currentImage = "./assets/Blue umbrella.png";
upload_logo.style.fill = "white";

// Handle the loading phase by showing the loader image and hiding the umbrella
function showLoader(color) {
  umbrella_image.style.display = "none";
  umbrella_uploaded_logo.style.display = "none";
  document.getElementById("loader").style.fill = color ? color : currentColor;
  upload_logo.style.display = "none";
  upload_loader.style.display = "block";
  upload_loader.style.backgroundColor = "transparent";
  upload_loader.style.fill = "white";
  loader_container.style.opacity = 1;
}

// Handle the preview phase by hiding the loader image and showing the umbrella
function hideLoader() {
  umbrella_image.style.display = "none";
  upload_logo.style.display = "block";
  upload_loader.style.display = "none";
  loader_container.style.opacity = 0;
  umbrella_image.style.display = "block";
  umbrella_uploaded_logo.style.display = "block";
}

// Read the file from input
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    umbrella_image.style.display = "none";
    if (file.size > 5242880) {
      alert("File Size should not be greater than 5MB");
      return;
    }
    logo_text.innerText = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      isLogoAdded = true;
      umbrella_image.style.display = "none";
      showLoader();
      setTimeout(() => {
        hideLoader();
        umbrella_uploaded_logo.src = reader.result;
        cross_button.style.display = "inline";
      }, 3000);
    };
    event.target.value = ""; // Reset the field so that user can select same file again
  }
}
logo_upload_input.addEventListener("input", handleLogoUpload);

// Handle the behavior of theme for each color
function updateScreen(selectedColor, backgroundColor, imagePath) {
  umbrella_image.style.display = "none";
  currentColor = selectedColor;
  logo_upload_button.style.backgroundColor = currentColor;
  upload_logo.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = backgroundColor;
  if (!isLogoAdded) {
    setTimeout(() => {
      umbrella_image.src = imagePath;
      umbrella_image.style.display = "block";
    }, 100);
  } else {
    showLoader();
    setTimeout(() => {
      hideLoader();
      umbrella_image.src = imagePath;
      umbrella_image.style.display = "block";
    }, 3000);
  }
}

//Blue Umbrella
blue_btn.addEventListener("click", () => {
  updateScreen("#2db3e5", "#e7f6fc", "./assets/Blue umbrella.png");
});

//Yellow Umbrella
yellow_btn.addEventListener("click", () => {
  updateScreen("#fed144", "#fdf7e5", "./assets/Yello umbrella.png");
});

//Pink Umbrella
pink_btn.addEventListener("click", () => {
  updateScreen("#da358c", "#fcefef", "./assets/Pink umbrella.png");
});

logo_upload_button.addEventListener("click", () => {
  logo_upload_input.click();
});

// Remove all traces of file when the cross button is clicked
cross_button.addEventListener("click", (e) => {
  console.log("Clicked");
  e.stopPropagation();
  logo_text.innerText = "Upload Logo";
  cross_button.style.display = "none";
  umbrella_uploaded_logo.src = "";
  isLogoAdded = false;
});
