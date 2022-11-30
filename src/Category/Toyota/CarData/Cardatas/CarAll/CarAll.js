import React, { useState } from "react";
import Modal from "./Modal/Modal";

const CarAll = ({ n }) => {
  const { name, image, brandName, orginalPrice, resalePrice, useYears } = n;
  const [buying, setBuying] = useState(null);

  // console.log(n);
  return (
    <div>
      <div className="card w-96 h-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Car Name: {name}</h2>
          <p>Brand: {brandName}</p>
          <p>Orginal Price: ${orginalPrice}</p>
          <p>Resale Price: ${resalePrice}</p>
          <p>Use {useYears} Year</p>
          <div className="card-actions">
            <label htmlFor="modal" className="btn btn-primary">
              Book Now
            </label>
          </div>
        </div>
      </div>
      <Modal n={n} buying={buying} setBuying={setBuying}></Modal>
    </div>
  );
};

export default CarAll;
