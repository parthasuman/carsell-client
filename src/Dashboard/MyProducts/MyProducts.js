import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyProducts = () => {
  const { data: cars, refetch } = useQuery({
    querykey: ["cars"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/cars", {
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });
  const handalAdvartise = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/ads/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
      });
  };

  return (
    <div>
      <h2 className="text-3xl">all product is here </h2>
      <div>
        {cars?.map((car) => (
          <div key={car._id} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={car.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Car Name: {car.name}</h2>
              <p>Brand Name: {car.brand}</p>
              <p>Orginal price:{car.orginalPrice}</p>
              <p>Resell Price:{car.ResellPrice}</p>
              <p>Location: {car.location}</p>
              <p>Phone Number:{car.phone}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Slod</button>
                <button
                  onClick={() => handalAdvartise(car._id)}
                  className="btn btn-primary"
                >
                  {car.advertised ? "Ad Running" : "Ads"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
