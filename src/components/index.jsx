import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import { FaGears, FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import MyPagination from "../components/pagination";

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

function DesignTabContent() {
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [showDetails, setShowDetails] = useState({
    image: null,
    state: false,
    width: null,
    height: null,
  });

  const expandImage = (image, index, event) => {
    setExpandedImageIndex(index);
    if (expandedImageIndex == index) {
      const width = event.currentTarget.clientWidth;
      const height = event.currentTarget.clientHeight;

      setShowDetails((prevState) => ({
        ...prevState,
        image: image,
        state: true,
        width: width,
        height: height,
      }));
    }
  };

  const dataShowDetails = [
    {
      label: "分類",
      value: "リング",
    },
    {
      label: "デザイン",
      value: "ハート",
    },
    {
      label: "金種",
      value: "K18PG",
    },
    {
      label: "石名",
      value: "ダイヤモンド",
    },
    {
      label: "脇石",
      value: "あり（多め）",
    },
    {
      label: "その他",
      value: "--",
    },
    {
      label: "フリーワード",
      value: "--",
    },
  ];

  useEffect(() => {
    const pagination = document.querySelector(".pagination-custom");
    if (pagination && showDetails.state) {
      pagination.classList.add("d-none");
    }
  }, [showDetails.state]);

  return (
    <>
      {showDetails.state ? (
        <div className="row h-100">
          <div className="image-box">
            <div
              className="image-card"
              style={{ width: showDetails.width, height: showDetails.height }}
            >
              <img src={showDetails.image} alt="" className="image-show" />
            </div>
            <div className="row m-auto image-card-content">
              <div className="col-12 d-block d-lg-none">
                <div className="row image-info">
                  <div className="col-12 border-0">デザインソース</div>
                </div>
              </div>
              {dataShowDetails.length > 0 ? (
                dataShowDetails.map((item, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="row image-info">
                      <div
                        className={
                          "col-4 col-md-6" +
                          (index === dataShowDetails.length - 1
                            ? " border-0"
                            : "")
                        }
                      >
                        {item.label}
                      </div>
                      <div
                        className={
                          "col-8 col-md-6" +
                          (index === dataShowDetails.length - 1
                            ? " border-0"
                            : "")
                        }
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>Not found</>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="image-grid">
          {/* Image grid items */}
          {dataImage.length > 0 ? (
            dataImage.map((image, index) => (
              <div
                key={index}
                className={`image-grid-item ${
                  expandedImageIndex === index
                    ? "image-grid-col-2 image-grid-row-2"
                    : ""
                }`}
                onClick={(event) => expandImage(image.src, index, event)}
              >
                <div
                  className={`icon-search fs-1 ${
                    expandedImageIndex === index
                      ? "d-none d-lg-block"
                      : "d-none"
                  }`}
                >
                  <FaSearch />
                </div>
                <img src={image.src} alt={"Image " + (index + 1)} />
              </div>
            ))
          ) : (
            <React.Fragment>
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="image-grid-item bg-transparent"
                ></div>
              ))}
            </React.Fragment>
          )}
        </div>
      )}
    </>
  );
}

function UploadTabContent() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleFiles(newFiles);
  };

  const handleInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleFiles(newFiles);
  };

  const handleCapturePhotoChange = (event) => {
    const filesFromPhone = Array.from(event.target.files);
    if (filesFromPhone[0].type.indexOf("image/") > -1) {
      handleFiles(filesFromPhone);
    }
  };

  const handleBtnRemove = () => {
    const imageElement = document.querySelector(".img-show");
    const imageContainer = document.querySelector(".btn-remove");
    const uploadBox = document.querySelector(".upload-show");
    imageElement.remove();
    imageContainer.classList.add("d-none");
    uploadBox.classList.remove("d-none");
  };

  // Handle uploaded files
  const handleFiles = (files) => {
    const file = files[0];
    const reader = new FileReader();
    const imageShow = document.getElementById("fileDropArea");
    const imageContainer = document.querySelector(".btn-remove");
    const uploadBox = document.querySelector(".upload-show");
    if (files.length > 0) {
      uploadBox.classList.add("d-none");
      imageContainer.classList.remove("d-none");
      reader.onload = function (event) {
        const imageElement = document.createElement("img");
        imageElement.setAttribute("class", "img-show");
        imageElement.setAttribute("src", event.target.result);
        imageElement.setAttribute("alt", "Uploaded Image");
        imageElement.setAttribute(
          "style",
          "object-fit: contain; object-position: center; width: 100%; height: 100%"
        );

        imageShow.appendChild(imageElement);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-100">
      <div className="px-0 upload-box-bg w-100">
        <div className="upload-box">
          <div
            id="fileDropArea"
            className={`upload-box-dashed d-flex flex-column justify-content-center align-items-center position-relative fs-3 
            ${isDragOver ? "is-dragover" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-show">
              <p className="mb-0 d-none d-lg-block">ファイルをドロップして</p>
              <p className="d-none d-lg-block">アップロード</p>
              <p className="fs-4 d-none d-lg-block">または</p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                multiple
                className="d-none"
                onChange={(e) => handleInputChange(e)}
              />
              <input
                id="capturePhoto"
                type="file"
                accept="image/*"
                capture
                multiple
                className="d-none"
                onChange={(e) => handleCapturePhotoChange(e)}
              />
              <label
                htmlFor="capturePhoto"
                className="btn gradient-button btn-upload d-block d-lg-none text-base mb-4"
              >
                写真を撮る
              </label>
              <label
                htmlFor="fileInput"
                className="btn gradient-button btn-upload text-base"
              >
                <div className="d-none d-lg-block">ファイルを選択</div>
                <div className="d-block d-lg-none">
                  アルバムからファイルを選択
                </div>
              </label>
            </div>
            <div
              className="btn-remove d-none"
              onClick={() => handleBtnRemove()}
            >
              <FaXmark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuTabContent() {
  return (
    <div className="h-100">
      <Row className="h-100">
        <Col lg={12} className="px-0">
          <div className="menu-box h-100 text-base">
            <React.Fragment>
              {[...Array(12)].map((_, index) => (
                <React.Fragment key={index}>
                  <div
                    id={`sticky-note-${index + 1}`}
                    className="sticky sticky-header fs-5"
                  >
                    利用規約 {index}
                  </div>
                  <div className="sticky-content">
                    この利用規約（以下，「本規約」といいます。）は，＿＿＿＿（以下，「当社」といいます。）
                    がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。
                    登録のユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本規約をご利用いただきます。
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function Home() {
  const [key, setKey] = useState("0");
  const [screenSize, setScreenSize] = useState("");
  const [page, setPage] = useState(1);

  const contentRef = useRef(null);

  useEffect(() => {
    document.title = "Gan Ring Poc - Home";
  }, []);

  const pagination = document.querySelector(".pagination-custom");
  useEffect(() => {
    const idKey = ["0", "1", "2"];
    setKey(idKey[key]);
    if (pagination && key != 0) {
      pagination.classList.add("d-none");
    } else if (pagination) {
      pagination.classList.remove("d-none");
    }
  }, [key]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let span, info;
      if (width >= 1400) {
        span = 4;
        info = 2;
      } else if (width >= 1200) {
        span = 4;
        info = 2;
      } else if (width >= 992) {
        span = 4;
        info = 2;
      } else if (width >= 768) {
        span = 3;
        info = 1.5;
      } else if (width >= 576) {
        span = 2;
        info = 1;
      } else {
        span = 2;
        info = 1;
      }

      setScreenSize({ span, info });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize) {
      const fullWidth = contentRef.current.clientWidth;
      autoResize(fullWidth, screenSize.span);
      autoResizeInfo(fullWidth, screenSize.info);
      const containerTop = document.querySelector(".container-top");
      if (isMobileDevice()) {
        containerTop.style.boxSizing = "border-box";
      } else {
        containerTop.style.boxSizing = "content-box";
      }
    }
  }, [screenSize]);

  const autoResize = (fullWidth, span) => {
    const elementWidth = document.querySelector(".image-grid-item img");
    const elementHeight = document.querySelector(".image-grid-item img");
    const imageGridItems = document.querySelectorAll(".image-grid-item");
    const containerTop = document.querySelector(".container-top");

    const maxScreen = fullWidth / span;

    if (elementWidth && elementHeight) {
      imageGridItems.forEach((item) => {
        item.style.width = maxScreen + "px";
        item.style.height = maxScreen + "px";
      });

      containerTop.style.minHeight = `${maxScreen * 3}px`;
      containerTop.style.maxHeight = `${maxScreen * 3}px`;
      containerTop.style.height = `${maxScreen * 3}px`;
      // if (!isMobileDevice()) {
      const uploadBox = document.querySelector(".upload-box");
      uploadBox.style.height = `${maxScreen * 3}px`;
      // }
    } else {
      imageGridItems.forEach((item) => {
        item.style.height = `${maxScreen}px`;
        item.style.width = `${maxScreen}px`;
      });

      containerTop.style.minHeight = `${maxScreen * 3}px`;
      containerTop.style.maxHeight = `${maxScreen * 3}px`;
      containerTop.style.height = `${maxScreen * 3}px`;

      const uploadBox = document.querySelector(".upload-box");
      uploadBox.style.height = `${maxScreen * 3}px`;
    }
  };

  const autoResizeInfo = (fullScreen, expand) => {
    const maxShow = fullScreen / expand;
    const boxUpload = document.querySelector(".image-box .image-card");
    if (boxUpload) {
      boxUpload.style.height = maxShow + "px";
      boxUpload.style.width = maxShow + "px";
    }
  };

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const handleOnchangePage = useCallback((page) => {
    setPage(page);
  }, []);

  return (
    <>
      {/* Top section - DESIGN or UPLOAD or MENU */}
      <Container fluid="xxl" className="container-top" ref={contentRef}>
        <Tabs id="controlled-tab-example" activeKey={key} className="d-none">
          <Tab eventKey="0" title="Home">
            <DesignTabContent />
          </Tab>
          <Tab eventKey="1" title="Profile">
            <UploadTabContent />
          </Tab>
          <Tab eventKey="2" title="Contact">
            <MenuTabContent />
          </Tab>
        </Tabs>
      </Container>
      {/* Bottom section - TAB MENU */}
      <div className="bg-bottom">
        <MyPagination
          total={dataImage.length}
          currentPage={page}
          itemsPerPage={10}
          onPageChange={handleOnchangePage}
        />
        <Container fluid="xxl">
          <Row>
            <Col lg={12} className="px-0">
              <Tabs
                defaultActiveKey="0"
                id="fill-tab-example"
                className="fs-lg-5"
                fill
                onSelect={(k) => setKey(k)}
              >
                {/* DESIGN tab content */}
                <Tab eventKey="0" title="DESIGN" className="custom-nav">
                  {/* Inputs for selected options */}
                  <Row>
                    <Col md={4} lg={3} className="py-2">
                      <Row>
                        <Col
                          xs={2}
                          md={3}
                          lg={3}
                          className="my-auto text-base text-nowrap"
                        >
                          <Form.Label className="mb-0" htmlFor="select1">
                            分類
                          </Form.Label>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                          <Form.Select className="custom-input">
                            <option value="">分類</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4} lg={3} className="py-2">
                      <Row>
                        <Col
                          xs={2}
                          md={3}
                          lg={3}
                          className="my-auto text-base text-nowrap"
                        >
                          <Form.Label className="mb-0" htmlFor="select2">
                            デザイン
                          </Form.Label>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                          <Form.Select className="custom-input">
                            <option value="">デザイン</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4} lg={3} className="py-2">
                      <Row>
                        <Col
                          xs={2}
                          md={3}
                          lg={3}
                          className="my-auto text-base text-nowrap"
                        >
                          <Form.Label className="mb-0" htmlFor="select2">
                            金種
                          </Form.Label>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                          <Form.Select className="custom-input">
                            <option value="">金種</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4} lg={3} className="py-2">
                      <Row>
                        <Col
                          xs={2}
                          md={3}
                          lg={3}
                          className="my-auto text-base text-nowrap"
                        >
                          <Form.Label className="mb-0" htmlFor="select2">
                            石名
                          </Form.Label>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                          <Form.Select className="custom-input">
                            <option value="">石名</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4} lg={3} className="py-2">
                      <Row>
                        <Col
                          xs={2}
                          md={3}
                          lg={3}
                          className="my-auto text-base text-nowrap"
                        >
                          <Form.Label className="mb-0" htmlFor="select2">
                            脇石
                          </Form.Label>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                          <Form.Select className="custom-input">
                            <option value="">脇石</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4} lg={3} className="py-2">
                      <Row>
                        <Col
                          xs={2}
                          md={3}
                          lg={3}
                          className="my-auto text-base text-nowrap"
                        >
                          <Form.Label className="mb-0" htmlFor="select2">
                            その他
                          </Form.Label>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                          <Form.Select className="custom-input">
                            <option value="">その他</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col lg={12}>
                      <Form.Group className="input-group input-group-lg">
                        <Form.Control
                          type="text"
                          className="form-control rounded-2 border-0 custom-input-search"
                          placeholder="Free Word"
                        />
                        <Button
                          type="button"
                          className="btn gradient-button ms-2 ms-lg-3 rounded-2 px-lg-5 fs-5 d-flex justify-content-center align-items-center"
                        >
                          <FaGears className="icon-gear" />
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3 color-base text-base">
                    <Col lg={6}>
                      キーワードは、カンマ区切りで複数キーワードを入力できます
                    </Col>
                    <Col lg={6} className="text-lg-end mt-3 mt-lg-0">
                      著作権など他者の権利を尊重する責任があります
                    </Col>
                  </Row>
                </Tab>
                {/* UPLOAD tab content */}
                <Tab eventKey="1" title="UPLOAD" className="custom-nav">
                  <Row className="px-3">
                    <Col lg={12}>
                      <div className="text-left fs-sm-5">
                        デザイン画像アップロードの注意事項
                      </div>
                      <Row className="mt-3">
                        <Col lg={12} className="px-0">
                          <ul id="file-list">
                            <li className="text-base">
                              注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項
                            </li>
                            <li className="text-base">
                              注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項
                            </li>
                            <li className="text-base">
                              注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項
                            </li>
                            <li className="text-base">
                              注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項、注意事項
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Tab>
                {/* MENU tab content */}
                <Tab eventKey="2" title="MENU" className="custom-nav">
                  <Row>
                    <Col lg={12}>
                      {/* Menu links */}
                      <Row>
                        <Col className="col-6 col-md-4 px-3 px-lg-5">
                          <ul className="list-unstyled list-link text-base">
                            <li>メニュー</li>
                            <li>
                              <a href="#">利用規約</a>
                            </li>
                            <li>
                              <a href="#">プライバシーポリシー</a>
                            </li>
                            <li>
                              <a href="#">ヘルプ</a>
                            </li>
                          </ul>
                        </Col>
                        <Col className="col-6 col-md-4 px-3 px-lg-5">
                          <ul className="list-unstyled list-link text-base">
                            <li>ユーザーページ</li>
                            <li>
                              <a href="#">ユーザー情報編集</a>
                            </li>
                            <li>
                              <a href="#">パスワード変更</a>
                            </li>
                            <li>
                              <a href="#">保存デザインリスト</a>
                            </li>
                          </ul>
                        </Col>
                        <Col className="col-6 col-md-4 px-3 px-lg-5">
                          <ul className="list-unstyled list-link text-base">
                            <li>管理者ページ</li>
                            <li>
                              <a href="#">新規ユーザー登録</a>
                            </li>
                            <li>
                              <a href="#">ユーザー編集・削除</a>
                            </li>
                            <li>
                              <a href="#">ユーザーリスト</a>
                            </li>
                            <li>
                              <a href="#">会社情報登録・編集</a>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
