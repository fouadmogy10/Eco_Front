import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function WishlistHook() {
  const dispatch = useDispatch();
  const [favprod, setfavprod] = useState([]);
  const { Wishlist } = useSelector((state) => state.auth);
  let WishlistState = Wishlist.wishlist ? Wishlist.wishlist : [];

  useEffect(() => {
    if (window.location.pathname == "/wishlist" || WishlistState.length <= 0) {
      return
    } else {
      setfavprod(WishlistState.map((item) => item._id));
    }
  }, [WishlistState]);

  return [favprod, WishlistState];
}

export default WishlistHook;
