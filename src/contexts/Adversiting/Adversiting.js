import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HomeMoadl from "./HomeModal/HomeMoadl";

const Adversiting = () => {
  const [homeBooking, setHomeBooking] = useState(null);
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/cars`, {
        headers: {
          "content-type": "application/json",
        },
      });
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <progress className="progress w-56"></progress>;
  }
  console.log(users);
  return (
    <div className="-mt-24">
      <h2 className="text-2xl  text-center ">Advertising </h2>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {users?.map((user) => (
          <div key={user._id} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={user.image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Car Name: {user.name}</h2>
              <p>Brand Name: {user.brand}</p>
              <p>Orginal price:${user.orginalPrice}</p>
              <p>Resell Price:${user.ResellPrice}</p>
              <p>Location: {user.location}</p>
              <p>Phone Number: {user.phone}</p>
            </div>
            <div className="card-actions ">
              <label htmlFor="homemodal" className="btn btn-primary w-full">
                Book Now
              </label>
            </div>
          </div>
        ))}
      </div>
      <HomeMoadl
        homeBooking={homeBooking}
        setHomeBooking={setHomeBooking}
      ></HomeMoadl>
    </div>
  );
};

export default Adversiting;
