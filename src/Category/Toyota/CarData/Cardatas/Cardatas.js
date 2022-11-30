import React from "react";
import { useLoaderData } from "react-router-dom";
import CarAll from "./CarAll/CarAll";

const Cardatas = () => {
  const data = useLoaderData();
  return (
    <div className="grid mt-8 gap-8 grid-cols-1 lg:grid-cols-2 ">
      {data.map((n) => (
        <CarAll key={n._id} n={n}></CarAll>
      ))}
    </div>
  );
};

export default Cardatas;
