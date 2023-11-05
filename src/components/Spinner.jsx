import React from 'react'
import RingLoader from "react-spinners/RingLoader";

function Spinner() {
  return (
    <section className="spinner d-flex position-fixed align-items-center justify-content-center">
    <RingLoader size={80} color="#36d7b7" />
</section>
  )
}

export default Spinner
