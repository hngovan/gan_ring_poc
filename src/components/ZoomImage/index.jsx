import { useRef, useState } from "react";
import PropTypes from "prop-types";

const Zoom = ({ img, zoomScale, height, width, transitionTime = 0.1 }) => {
  const [zoom, setZoom] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);

  const outerDivStyle = {
    height: `${height}px`,
    width: `${width}px`,
    overflow: "hidden",
  };

  const innerDivStyle = {
    height: `${height + 2}px`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "auto 100%",
    transition: `transform ${transitionTime}s ease-out`,
    backgroundImage: `url('${img}')`,
  };

  const imageRef = useRef();

  const handleMouseOver = () => {
    setZoom(true);
  };

  const handleMouseOut = () => {
    setZoom(false);
  };

  const handleMouseMovement = (e) => {
    const { left: offsetLeft, top: offsetTop } =
      imageRef.current.getBoundingClientRect();
    const {
      current: {
        style: { height, width },
      },
    } = imageRef;

    const x = ((e.pageX - offsetLeft) / parseInt(width, 10)) * 100;
    const y = ((e.pageY - offsetTop) / parseInt(height, 10)) * 100;
    setMouseX(x);
    setMouseY(y);
  };

  const transform = {
    transformOrigin: `${mouseX}% ${mouseY}%`,
  };

  return (
    <div
      style={outerDivStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMovement}
      ref={imageRef}
    >
      <div
        style={{
          ...transform,
          ...innerDivStyle,
          transform: zoom ? `scale(${zoomScale})` : "scale(1.0)",
          willChange: transform,
          cursor: "zoom-in",
        }}
      />
    </div>
  );
};

Zoom.propTypes = {
  /** The path to the image. It can be a url. */
  img: PropTypes.string.isRequired,
  /** The zoom scale. */
  zoomScale: PropTypes.number.isRequired,
  /** The height of the image in pixels */
  height: PropTypes.number.isRequired,
  /** The width of the image in pixels */
  width: PropTypes.number.isRequired,
  /** The time (in seconds) that will take to scale your image. */
  transitionTime: PropTypes.number,
};

export default Zoom;
