import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CarData from "./Toyota/CarData/CarData";

const CategoryData = () => {
  const [categories, setCategories] = useState([]);
  console.log(categories);
  useEffect(() => {
    fetch("http://localhost:5000/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div className="grid mt-8 gap-8 grid-cols-1 lg:grid-cols-3 ">
      {categories.map((category) => (
        <Link>
          <CarData key={category._id} categories={category}>
            {" "}
          </CarData>
        </Link>
      ))}
    </div>
  );
};

export default CategoryData;
