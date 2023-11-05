import React from "react";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import cartService from "../features/cart/cartService";
function CartItem({ data, color, quantity }) {
  const dispatch = useDispatch();

  const [QTY, setQTY] = useState(data.qty);
  //////////////////////////////////////////


  //price of the product - (price of product x discount/100)
  //remove cart  Item handler
  const removeOrderItemQtyHandler = (data) => {
    dispatch(cartService.removeOrderItemQty(data));
    dispatch(cartService.getCartItemsFromLocalStorageAction());
  };

  return (
    <div className="card rounded-3 mb-4">
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              alt={data.name}
              src={data.image}
              className="img-fluid rounded-3"
            />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-normal mb-2">{data.name}</p>
            <p>
              {" "}
              <span className="text-muted">Color: </span>{" "}
              <span
                className="rounded-circle"
                style={{
                  backgroundColor: `${color}`,
                  width: "15px",
                  height: "15px",
                  display: "inline-block",
                }}
              ></span>
            </p>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center justify-content-center">
            <span
              onClick={() => {
                if (quantity > 1) {
                  dispatch(cartService.decreament({id:data._id,color:data.color}));
                  dispatch(cartService.getCartItemsFromLocalStorageAction());
                }
              }}
              className=" rounded-circle bg-secondary text-white mx-2 p-3 d-flex align-items-center justify-content-center"
              style={{
                width: "5px",
                height: "5px",
                cursor: "pointer",
              }}
            >
              -
            </span>
            <span>{QTY}</span>
            <span
              onClick={() => {
                dispatch(cartService.increament({id:data._id,color:data.color}));
                dispatch(cartService.getCartItemsFromLocalStorageAction());
              }}
              className=" rounded-circle bg-secondary text-white mx-2 p-3 d-flex align-items-center justify-content-center"
              style={{
                width: "5px",
                height: "5px",
                cursor: "pointer",
              }}
            >
              +
            </span>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0">
              ${QTY !== null ? QTY * data.price : quantity * data.price}
            </h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <BsFillTrashFill
              color="red"
              cursor={"pointer"}
              onClick={() =>
                removeOrderItemQtyHandler({ id: data?._id, color: data?.color })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
