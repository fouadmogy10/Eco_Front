import React from 'react'
import { useState } from 'react';
import { BsFillTrashFill } from "react-icons/bs"; 
import { useDispatch } from 'react-redux';
import { getcartItem, updateQTY } from '../features/auth/authSlice';
import { useEffect } from 'react';
function CartItem({data,color,quantity,removeFromcart,id}) {
    const dispatch = useDispatch();
    const [QTY, setQTY] = useState(null)

    useEffect(() => {
      updateCart(id,QTY);
    }, [QTY])
    
    const updateCart = async(id) => {
      if (QTY!== null) {
         await dispatch(
          updateQTY({id,newqty:QTY})
          );
          dispatch(getcartItem());
      }
      
    };
     
    
  return (
    <div className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src={data.images[0].url}
                  className="img-fluid rounded-3" alt="Cotton T-shirt"/>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <p className="lead fw-normal mb-2">{data.title}</p>
                <p> <span className="text-muted">Color: </span> <span className='rounded-circle' style={{backgroundColor:`${color}`,width:"15px",height:"15px",display:"inline-block"}}></span></p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                <input id="form1" min="1" name="quantity" value={QTY !==null ?QTY:quantity} type="number"
                onChange={(e)=>setQTY(e.target.value)}
                  className="form-control form-control-sm" />
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mb-0">${ QTY !==null ?QTY * data.price:quantity*data.price}</h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                  <BsFillTrashFill  color='red' cursor={"pointer"} onClick={()=>removeFromcart(id)}/>
              </div>
            </div>
          </div>
        </div>
  )
}

export default CartItem