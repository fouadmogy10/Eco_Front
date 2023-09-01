import React, { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import Title from "../components/Title";
import { Button, Form, Spinner } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addReview, getSingleProduct } from "../features/product/productSlice";
import RevievCard from "./RevievCard";
function Review({ data, id, loading }) {
  const dispatch = useDispatch();
  const [star, setstar] = useState(0);
  const [Comment, setComment] = useState("");
  const ratingChanged = (newRating) => {
    setstar(newRating);
  };
  const addingRating = async(e) => {
    e.preventDefault();
   if (!localStorage.getItem('user')) {
    toast.warn("please Login")
   }else{
    if (star == 0) {
      toast.warn("Please add star rating");
      return false;
    } else if (Comment == "") {
      toast.warn("Please add Comment about the Product");
      return false;
    } else {
      await dispatch(
        addReview({
          star,
          prodId: id,
          comment: Comment,
        })
      );
      
      setComment("")
      setstar(null)
    }
   }
  };

  return (
    <div
      className="review-wrapper p-5 my-3"
      style={{ background: "#fff", borderRadius: "10px" }}
    >
      <Title title={"Users Reviews "} />

      <div className="py-3">
        <Form onSubmit={addingRating}>
          <div className="d-flex justify-content-between flex-wrap">
            <Form.Label>Leave your comment </Form.Label>
            <ReactStars
              count={5}
              classNames={"fs-3"}
              onChange={ratingChanged}
              size={24}
              isHalf={false}
              emptyIcon={<AiOutlineStar />}
              halfIcon={<FaStarHalfAlt />}
              fullIcon={<FaStar />}
              activeColor="#ffd700"
              value={star}
            />
          </div>
          <Form.Control
            type="text"
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="transparent" className="btn-def my-3">
            {loading ? (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
      </div>
      {data.length > 0 ? (
        data.map((item, idx) => {
          return <RevievCard  data={item} key={item._id}/>;
        })
      ) : (
        <div className="text-start">
          <h2>No comment on this Product</h2>
        </div>
      )}
    </div>
  );
}

export default Review;
