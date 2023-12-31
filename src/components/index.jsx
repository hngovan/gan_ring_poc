import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import { FaGears, FaXmark } from "react-icons/fa6";
import MyPagination from "../components/pagination";
import Zoom from "../components/ZoomImage";
import client from "../utils/axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

// eslint-disable-next-line react/prop-types
let dataShowDetails = [
  {
    label: "分類",
    key: "classify",
    value: "--",
  },
  {
    label: "デザイン",
    key: "design",
    value: "--",
  },
  {
    label: "金種",
    key: "material",
    value: "--",
  },
  {
    label: "石名",
    key: "rock_type",
    value: "--",
  },
  {
    label: "脇石",
    key: "rock_type_secondary",
    value: "--",
  },
  {
    label: "その他",
    key: "other",
    value: "--",
  },
  {
    label: "フリーワード",
    key: "free_text",
    value: "--",
  },
];

const menuConstants = {
  ring: "リング",
  oval: "オーバル",
  square: "四角",
  pearl: "パール",
  pear: "ペア",
  round: "丸",
  gold: "K18",
  platinum: "Pt900",
  ruby: "ルビー",
  emerald: "エメラルド",
  sapphire: "サファイア",
  amethyst: "アメジスト",
  citrine: "シトリン",
  opal: "オパール",
  black: "ブラック",
};

// eslint-disable-next-line react/prop-types
function DesignTabContent({ dataImage = [], dataDetail, contentScreen, loading = false}) {
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [showDetails, setShowDetails] = useState({
    image: null,
    state: false,
    width: null,
    height: null,
  });
  const [updatedDetails, setUpdatedDetails] = useState(dataShowDetails);

  const expandImage = (image, index, event) => {
    setExpandedImageIndex(index);
    const width = event.currentTarget.clientWidth;
    const height = event.currentTarget.clientHeight;
    if (expandedImageIndex == index) {
      setShowDetails((prevState) => ({
        ...prevState,
        image: image,
        state: true,
        width: width,
        height: height,
      }));
    }
  };

  const handleImageClose = () => {
    setExpandedImageIndex(null);
    setShowDetails((prevState) => ({
      ...prevState,
      state: false,
    }));
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const pagination = document.querySelector(".pagination-custom");
    if (pagination && showDetails.state) {
      pagination.classList.add("d-none");
    } else {
      if (pagination !== null) {
        pagination.classList.remove("d-none");
      }
    }
  }, [showDetails.state]);

  useEffect(() => {
    if (dataDetail) {
      const updatedDataShowDetails = dataShowDetails.map((item) => {
        const updatedValue = dataDetail[item.key]
          ? menuConstants[dataDetail[item.key]]
          : "--";
        return {
          ...item,
          value: updatedValue,
        };
      });
      setExpandedImageIndex(null);
      setShowDetails((prevState) => ({
        ...prevState,
        state: false,
      }));
      setUpdatedDetails(updatedDataShowDetails);
    }
  }, [dataDetail]);

  return (
    <>
      {loading && (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <Spinner animation="border" />
          <div className="mt-4">データをロードしています。お待ちください。</div>
        </div>
      )}
      <div
        className={`row h-100 ${showDetails.state ? "d-block" : "d-none"}`}
        onClick={handleImageClose}
      >
        <div className="image-box">
          <div
            className="image-card"
            // style={{ width: showDetails.width, height: showDetails.height }}
          >
            <img
              src={showDetails.image}
              alt=""
              className="image-show"
              onClick={handleImageClick}
            />
          </div>
          <div className="row m-auto image-card-content">
            <div className="col-12 d-block d-lg-none">
              <div className="row image-info">
                <div className="col-12 border-0">デザインソース</div>
              </div>
            </div>
            {updatedDetails.length > 0 ? (
              updatedDetails.map((item, index) => (
                <div className="col-md-6 col-lg-6" key={index}>
                  <div className="row image-info">
                    <div
                      className={
                        "col-4 col-md-6" +
                        (index === updatedDetails.length - 1 ? " border-0" : "")
                      }
                    >
                      {item.label}
                    </div>
                    <div
                      className={
                        "col-8 col-md-6" +
                        (index === updatedDetails.length - 1 ? " border-0" : "")
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
      <div
        className={`image-grid ${
          !showDetails.state && !loading ? "visible" : "d-none"
        }`}
      >
        {/* Image grid items */}
        {dataImage.length > 0 && !loading ? (
          dataImage.map((image, index) => (
            <div
              key={index}
              className={`image-grid-item ${
                expandedImageIndex === index
                  ? index === dataImage.length - 1 ||
                    index === dataImage.length - 2
                    ? "image-grid-last"
                    : "image-grid-col-2 image-grid-row-2"
                  : ""
              }`}
              onClick={(event) => expandImage(image, index, event)}
            >
              {expandedImageIndex === index ? (
                <>
                  <Zoom
                    img={image}
                    zoomScale={2.5}
                    height={contentScreen * 2}
                    width={contentScreen * 2}
                  />
                </>
              ) : (
                <img src={image} alt={"Image " + (index + 1)} />
              )}
            </div>
          ))
        ) : (
          <>
            {[...Array(4)].map((_, index) => (
              <div key={index} className="image-grid-item bg-transparent"></div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

function UploadTabContent() {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInput = useRef(null);
  const capturePhoto = useRef(null);

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
    handleFiles(newFiles);
  };

  const handleInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
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
    if (fileInput.current && capturePhoto.current) {
      fileInput.current.value = null;
      capturePhoto.current.value = null;
    }
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
                ref={fileInput}
                id="fileInput"
                type="file"
                accept="image/*"
                className="d-none"
                onChange={(e) => handleInputChange(e)}
              />
              <input
                ref={capturePhoto}
                id="capturePhoto"
                type="file"
                accept="image/*"
                capture
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

const designOption = [
  {
    label: "分類",
    htmlFor: "classify",
    require: true,
    option: [
      {
        value: "ring",
        name: "リング",
        disabled: false,
      },
      // {
      //   value: "ネックレス",
      //   name: "ネックレス",
      //   disabled: false,
      // },
    ],
  },
  {
    label: "形状",
    htmlFor: "design",
    require: true,
    option: [
      {
        value: "oval",
        name: "オーバル",
        disabled: false,
      },
      {
        value: "square",
        name: "スクエア",
        disabled: false,
      },
      {
        value: "pearl",
        name: "パール",
        disabled: false,
      },
      {
        value: "pear",
        name: "ペアシェイプ",
        disabled: false,
      },
      {
        value: "round",
        name: "ラウンド",
        disabled: false,
      },
    ],
  },
  {
    label: "金種",
    htmlFor: "material",
    require: true,
    option: [
      {
        value: "gold",
        name: "K18",
        disabled: false,
      },
      {
        value: "platinum",
        name: "Pt900",
        disabled: false,
      },
    ],
  },
  {
    label: "石名",
    htmlFor: "rock_type",
    require: true,
    option: [
      {
        value: "ruby",
        name: "ダイヤモンド",
        disabled: false,
      },
      {
        value: "emerald",
        name: "エメラルド",
        disabled: false,
      },
      {
        value: "sapphire",
        name: "ルビー",
        disabled: false,
      },
      {
        value: "amethyst",
        name: "サファイヤ",
        disabled: false,
      },
      {
        value: "citrine",
        name: "パール",
        disabled: false,
      },
      {
        value: "opal",
        name: "オパール",
        disabled: false,
      },
    ],
  },
  {
    label: "脇石",
    htmlFor: "rock_type_secondary",
    require: false,
    option: [
      {
        value: "なし",
        name: "なし",
        disabled: true,
      },
      {
        value: "あり（少なめ）",
        name: "あり（少なめ）",
        disabled: true,
      },
      {
        value: "あり（多め）",
        name: "あり（多め）",
        disabled: true,
      },
    ],
  },
  {
    label: "その他",
    htmlFor: "other",
    require: false,
    option: [],
  },
];

function Home() {
  const [key, setKey] = useState("0");
  const [screenSize, setScreenSize] = useState("");
  const [page, setPage] = useState(1);
  const [screenContent, setScreenContent] = useState(null);
  const [dataImageGenerate, setDataImageGenerate] = useState([]);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const contentRef = useRef(null);

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

      containerTop.style.minHeight = `${maxScreen * 2}px`;
      containerTop.style.maxHeight = `${maxScreen * 2}px`;
      containerTop.style.height = `${maxScreen * 2}px`;
      // if (!isMobileDevice()) {
      const uploadBox = document.querySelector(".upload-box");
      uploadBox.style.height = `${maxScreen * 2}px`;
      // }
    } else {
      imageGridItems.forEach((item) => {
        item.style.height = `${maxScreen}px`;
        item.style.width = `${maxScreen}px`;
      });

      containerTop.style.minHeight = `${maxScreen * 2}px`;
      containerTop.style.maxHeight = `${maxScreen * 2}px`;
      containerTop.style.height = `${maxScreen * 2}px`;

      const uploadBox = document.querySelector(".upload-box");
      uploadBox.style.height = `${maxScreen * 2}px`;
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

  const handleGenerateImage = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoading(true);
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      setDataDetail(payload);
      try {
        const response = await client.post("/generate-image", payload);
        const { success, images } = response;
        if (success) {
          setDataImageGenerate(images);
          setLoading(false);
          toast.success("画像が正常に生成されました");
        } else {
          setLoading(false);
          toast.error("Sever Errors");
        }
      } catch (error) {
        toast.error(error.message);
        console.error("Submit error", error);
      }
    }

    setValidated(true);
  };

  useEffect(() => {
    document.title = "Gan Ring Poc - Home";
  }, []);

  useEffect(() => {
    const idKey = ["0", "1", "2"];
    const pagination = document.querySelector(".pagination-custom");
    const imageGrid = document.querySelector(".image-grid");
    setKey(idKey[key]);
    if ((pagination && key != 0) || imageGrid.className.includes("d-none")) {
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
        span = 2;
        info = 2;
      } else if (width >= 1200) {
        span = 2;
        info = 2;
      } else if (width >= 992) {
        span = 2;
        info = 2;
      } else if (width >= 768) {
        span = 2;
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
      setScreenContent(fullWidth / screenSize.span);
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

  const handleOnchangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      {/* Top section - DESIGN or UPLOAD or MENU */}
      <Container
        fluid="lg"
        className="container-top container-resize"
        ref={contentRef}
      >
        <Tabs id="controlled-tab-example" activeKey={key} className="d-none">
          <Tab eventKey="0" title="Home">
            <DesignTabContent
              dataImage={dataImageGenerate}
              dataDetail={dataDetail}
              contentScreen={screenContent}
              loading={loading}
            />
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
        {!loading && (
          <MyPagination
            total={dataImageGenerate.length}
            currentPage={page}
            itemsPerPage={12}
            onPageChange={handleOnchangePage}
          />
        )}
        <Container fluid="lg" className="container-resize">
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
                  <Form
                    id="generate-form"
                    className="needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleGenerateImage}
                  >
                    <Row>
                      {designOption.length ? (
                        designOption.map((item, index) => (
                          <Col md={4} lg={4} className="py-2" key={index}>
                            <Row>
                              <Col
                                xs={2}
                                md={3}
                                lg={3}
                                className="my-auto text-base text-nowrap"
                              >
                                <Form.Label
                                  className="mb-0"
                                  htmlFor={item.htmlFor}
                                >
                                  {item.label}
                                </Form.Label>
                              </Col>
                              <Col xs={10} md={9} lg={9}>
                                <Form.Control
                                  id={item.htmlFor}
                                  name={item.htmlFor}
                                  as="select"
                                  type="select"
                                  className="custom-input"
                                  required={item.require}
                                >
                                  <option value="">--</option>
                                  {item.option.map((data) => (
                                    <option
                                      value={data.value}
                                      key={data.value}
                                      disabled={data.disabled}
                                    >
                                      {data.name}
                                    </option>
                                  ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                  このフィールドは必須です。
                                </Form.Control.Feedback>
                              </Col>
                            </Row>
                          </Col>
                        ))
                      ) : (
                        <>Not Found</>
                      )}
                    </Row>
                    <Row className="mt-4">
                      <Col lg={12}>
                        <Form.Group className="input-group input-group-lg">
                          <Form.Control
                            id="free_text"
                            name="free_text"
                            type="text"
                            className="form-control rounded-2 border-0 custom-input-search"
                            placeholder="Free Word"
                          />
                          <Button
                            type="submit"
                            className="btn gradient-button ms-2 ms-lg-3 rounded-2 px-lg-5 fs-5 d-flex justify-content-center align-items-center"
                            disabled={loading}
                          >
                            <FaGears className="icon-gear" />
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
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
                      <Row className="mt-3 ms-0">
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
