// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('#login-form')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

//Show menu tabs
const tabMenu = document.querySelectorAll(".nav a");
const tabContent = document.querySelectorAll(
  ".tab-content-top .tab-pane"
);

for (var i = 0, length = tabMenu.length; i < length; i++) {
  tabMenu[i].onclick = function (e) {
    const tabContentActive = document.querySelectorAll(
      ".tab-content-top .tab-pane"
    );
    const tabActive = e.target.attributes.role.value;

    if (tabActive == 0) {
      tabContentActive[0].classList.add("show", "active");
      tabContentActive[1].classList.remove("show", "active");
      tabContentActive[2].classList.remove("show", "active");
    } else if (tabActive == 1) {
      tabContentActive[0].classList.remove("show", "active");
      tabContentActive[1].classList.add("show", "active");
      tabContentActive[2].classList.remove("show", "active");

      if(isMobileDevice()) {
        $(".upload-box").css("height", "");
      }
  
    } else if (tabActive == 2) {
      tabContentActive[0].classList.remove("show", "active");
      tabContentActive[1].classList.remove("show", "active");
      tabContentActive[2].classList.add("show", "active");
    }
  };
}

//Upload files
const fileDropArea = document.getElementById("fileDropArea");
fileDropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  fileDropArea.classList.add("is-dragover");
});

fileDropArea.addEventListener("dragleave", (event) => {
  event.preventDefault();
  fileDropArea.classList.remove("is-dragover");
});

fileDropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  fileDropArea.classList.remove("is-dragover");
  const files = event.dataTransfer.files;
  console.log(files);
  handleFiles(files);
});

const fileInput = document.getElementById("fileInput");
const fileCapturePhoto = document.getElementById("capturePhoto");

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// file normal
fileInput.addEventListener("change", (event) => {
  const files = event.target.files;
  console.log(files);
  handleFiles(files);
});

// file chose from phone
fileCapturePhoto.addEventListener("change", (event) => {
  const filesFromPhone = event.target.files;
  if (filesFromPhone[0].type.indexOf("image/") > -1) {
    let img = document.getElementById("img");
    console.log(filesFromPhone);
  }
});

function handleFiles(files) {
  const imageShow = $("#fileDropArea");
  const uploadBox = $(".upload-show");
  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    
    uploadBox.addClass("d-none")

    reader.onload = function (event) {
      const imageElement = $("<img>").attr({
        src: event.target.result,
        alt: "Uploaded Image",
        style: "object-fit: contain; object-position: center; width: 100%; height: 100%"
      });
      const imageContainer = $("<div>")
        .addClass("btn-remove")
      const deleteIcon = $("<i>")
        .addClass("fa-solid fa-xmark");

      deleteIcon.click(function () {
        imageElement.remove();
        imageContainer.remove();
        uploadBox.removeClass("d-none");
      });
      imageContainer.append(deleteIcon)
      imageShow.append(imageContainer);
      imageShow.append(imageElement);
    };

    reader.readAsDataURL(file);
  }
}

// resize img when show Row and Col
$(window).on("resize", function () {
  if (window.matchMedia("(min-width: 1400px)").matches) {
    this.autoResize(4, 4, "auto");
    this.autoResizeInfo(2);
  } else if (window.matchMedia("(min-width: 1200px)").matches) {
    this.autoResize(4, 4, "auto");
    this.autoResizeInfo(2);
  } else if (window.matchMedia("(min-width: 992px)").matches) {
    this.autoResize(4, 4, "auto");
    this.autoResizeInfo(2);
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    this.autoResize(3, 3, "auto");
    this.autoResizeInfo(1.5);
  } else if (window.matchMedia("(min-width: 576px)").matches) {
    this.autoResize(2, 2, "auto");
    this.autoResizeInfo(1);
  } else if (window.matchMedia("(max-width: 576px)").matches) {
    this.autoResize(2, 2, "auto");
    this.autoResizeInfo(1);
  } else {
    $(".container-top").css({
      "min-height": "",
      "max-height": "",
      "overflow-x": "",
    });

    $(".image-grid-item").css({
      width: "",
      height: "",
    });
  }
});

autoResize = (row, col) => {
  const elementWidth = $(".image-grid-item img").width();
  const elementHeight = $(".image-grid-item img").height();
  const fullWidthScreen = $(".container-top").width();

  const maxScreen = (fullWidthScreen + 26) / row;
  let currentState = {
    show: maxScreen,
    container: maxScreen * 3,
  };

  if (elementWidth && elementHeight) {
    $(".image-grid-item").css({
      width: "calc((" + fullWidthScreen + "px + 24px) /" + row + ")",
      height: "calc((" + fullWidthScreen + "px + 24px) /" + col + ")",
    });

    $(".container-top").css({
      "min-height": maxScreen * 3 + "px",
      "max-height": maxScreen * 3 + "px",
      height: maxScreen * 3 + "px",
    });

    if(!isMobileDevice()) {
      $(".upload-box").css({
        height: maxScreen * 3 + "px"
      })
    }

    localStorage.setItem("currentState", JSON.stringify(currentState));
  } else {
    $(".image-grid-item").css({
      height: maxScreen + "px",
      width: maxScreen + "px",
    });

    $(".container-top").css({
      "min-height": maxScreen * 3 + "px",
      "max-height": maxScreen * 3 + "px",
      height: maxScreen * 3 + "px",
    });

    localStorage.setItem("currentState", JSON.stringify(currentState));
  }
};

autoResizeInfo = (expand) => {
  const fullScreen = $(".container-top").width();
  const maxShow = (fullScreen + 26) / expand;
  $(".image-box .image-card").css({
    width: maxShow + "px",
    height: maxShow + "px",
  });
};

showImageLocalStorage = (state) => {
  $(".image-grid-item").css({
    width: state.show + "px",
    height: state.show + "px",
  });

  $(".container-top").css({
    "min-height": state.container + "px",
    "max-height": state.container + "px",
    height: state.container + "px",
  });

  if(!isMobileDevice()) {
    $(".upload-box").css({
      height: state.container + "px"
    })
  }
};

$(document).ready(function () {
  const currentState = JSON.parse(localStorage.getItem("currentState"));

  if (currentState) {
    showImageLocalStorage(currentState);
    // localStorage.removeItem("currentState");
  }
});

const dataImage = [
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/106/gnddddh000135-nhan-kim-cuong-vang-14k-pnj.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/115/gnrbxmy001016-nhan-vang-18k-dinh-da-ruby-pnj-1.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/103/gntpmxc000003-nhan-vang-14k-dinh-da-topaz-pnj.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/105/gnrbxmy000994-nhan-vang-18k-dinh-da-ruby-pnj-001.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/98/gnctxmy000430-nhan-vang-18k-dinh-da-citrine-pnj-01.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/97/gnptddw000100-nhan-vang-trang-14k-dinh-ngoc-trai-tahiti-pnj-01.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/128/gnctxmy000460-nhan-vang-18k-dinh-da-citrine-pnj-1.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/172/sp-gnddddw005039-nhan-kim-cuong-vang-trang-14k-pnj-1.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/106/gnddddh000135-nhan-kim-cuong-vang-14k-pnj.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/106/gnddddh000014-nhan-kim-cuong-vang-18k-pnj-01.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/125/gnddddc000185-nhan-kim-cuong-vang-18k-pnj-1.png",
  },
  {
    src: "https://cdn.pnj.io/images/thumbnails/300/300/detailed/106/gnddddx000025-nhan-kim-cuong-vang-18k-pnj.png",
  },
];

const imageContainer = $("#design-tab-content .image-grid");
const imageDefaults = 12;

if (dataImage.length > 0) {
  $.each(dataImage, (index, image) => {
    const imageItem = $("<div>")
      .addClass("image-grid-item px-0")
      .attr("onclick", `expandImage(${index})`);
    const img = $("<img>").attr({
      src: image.src,
      alt: "Image " + (index + 1),
    });
    imageItem.append(img);
    imageContainer.append(imageItem);
  });
} else {
  for (let i = 0; i < imageDefaults; i++) {
    const a = $("<div>").addClass("image-grid-item px-0");
    imageContainer.append(a);
  }
}

function expandImage(index) {
  const img = $(".image-grid-item").eq(index);
  img.addClass("image-grid-col-2 image-grid-row-2");
  img.removeAttr("onclick style");
  img.attr("onclick", `showInfoDetail(${index})`);
}

function expandImage(index) {
  const indexImage = index;
  const img = $(".image-grid-item").eq(indexImage);
  img.addClass("image-grid-col-2 image-grid-row-2");
  img.removeAttr("onclick style");
  img.attr("onclick", `showInfoDetail(${indexImage})`);
}
// if (expandedImageIndex === -1) {
//   expandedImageIndex = index;

//   expandedImageSrc = $(".image-grid-item img").eq(index).attr("src");
//   expandedImageAlt = $(".image-grid-item img").eq(index).attr("alt");

//   $(".image-grid-item")
//     .eq(0)
//     .html(`<img src="${expandedImageSrc}" alt="${expandedImageAlt}">`);
//   $(".image-grid-item").eq(0).parent().removeAttr("onclick");
//   $(".image-grid-item").eq(0).removeAttr("style");
//   $(".image-grid-item")
//     .eq(0)
//     .parent()
//     .attr("onclick", `showInfoDetail()`);
//   const fullWidthScreen = $(".container-top").width();

//   if (window.matchMedia("(min-width: 1400px)").matches) {
//     this.checkShowImage(2, 4, 5);
//   } else if (window.matchMedia("(min-width: 1200px)").matches) {
//     this.checkShowImage(2, 4, 5);
//   } else if (window.matchMedia("(min-width: 992px)").matches) {
//     this.checkShowImage(2, 4, 5);
//   } else if (window.matchMedia("(min-width: 768px)").matches) {
//     this.checkShowImage(1.5, 3, 4);
//   } else if (window.matchMedia("(min-width: 576px)").matches) {
//     this.checkShowImage(1, 3, 4);
//   } else if (window.matchMedia("(max-width: 576px)").matches) {
//     this.checkShowImage(1, 3, 4);
//   } else {
//     this.checkShowImage(2, 3, 4);
//   }

//   expandedImageIndex = -1;
// }

function showInfoDetail(index) {
  const img = $(".image-grid-item").eq(index);
  const imgInfo = img.find("img").attr("src");
  const width = img.width();
  const height = img.height();
  // style="width: ${width}px"
  imageContainer.empty();
  imageContainer.removeClass("image-grid").addClass("h-100");
  imageContainer.html(`
    <div class="image-box">
      <div class="image-card" style="width: ${width}px; height: ${height}px">
        <img src="${imgInfo}" alt="" class="image-show">
      </div>
      <div class="row m-auto image-card-content">
        <div class="col-12 d-block d-lg-none">
          <div class="row image-info">
            <div class="col-12 border-0">デザインソース</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6">分類</div>
            <div class="col-8 col-md-6">リング</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6">デザイン</div>
            <div class="col-8 col-md-6">ハート</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6">金種</div>
            <div class="col-8 col-md-6">K18PG</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6">石名</div>
            <div class="col-8 col-md-6">ダイヤモンド</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6">脇石</div>
            <div class="col-8 col-md-6">あり（多め）</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6">その他</div>
            <div class="col-8 col-md-6">--</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="row image-info">
            <div class="col-4 col-md-6 border-0">フリーワード</div>
            <div class="col-8 col-md-6 border-0">--</div>
          </div>
        </div>
      </div>
    </div>
  `);
}