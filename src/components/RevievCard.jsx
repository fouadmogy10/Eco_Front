import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
function RevievCard({ data }) {
  return (
    <div className="card  mb-3">
      <div className="card-body">
        <div className="d-flex flex-start">
          <div className="w-100">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
              <h6 className="text-danger fw-bold mb-0">
                {data?.postedby?.firstname} {data?.postedby?.lastname} :
                <span className="text-dark ms-2">{data?.comment}</span>
              </h6>
              <span>
                {new Date(data?.postedby?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <div className="small mb-0" style={{ color: "#aaa" }}>
                {/* <ReactStars
                  count={5}
                  value={data.star}
                  size={24}
                  isHalf={true}
                  edit={false}
                  emptyIcon={<AiOutlineStar />}
                  halfIcon={<FaStarHalfAlt />}
                  fullIcon={<FaStar />}
                  activeColor="#ffd700"
                /> */}

                {[0, 1, 2, 3, 4].map((rating) => (
                  <AiFillStar
                    key={rating}
                    color={
                      +data?.star > rating? "rgb(255, 215, 0)":"#666"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RevievCard;
