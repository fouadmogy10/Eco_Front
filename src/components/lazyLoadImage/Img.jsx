import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className ,alt}) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt={alt}
            effect="blur"
            src={src}
            style={{
                objectFit: "contain",
                aspectRatio: 1,
              }}
        />
    );
};

export default Img;