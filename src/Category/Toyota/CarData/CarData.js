import React from "react";
import { Link } from "react-router-dom";

const CarData = ({ categories }) => {
  const { name, image, _id } = categories;
  console.log(categories);
  return (
    <div className="card w-84 h-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <div className="card-actions">
          <button className="btn btn-primary">
            {" "}
            <Link to={`/category/${_id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarData;
