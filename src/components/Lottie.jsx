import React from "react";

const Lottie = ({ src ,title}) => {
  return (
    <div className=" d-flex flex-column align-items-center justify-content-center">
        <h3 className="fw-normal mb-0 text-black">{title}</h3>
      <lottie-player
        autoplay
        loop
        mode="normal"
        src={src}
        style={{ maxWidth: "400px" }}
      ></lottie-player>
    </div>
  );
};

export default Lottie;
