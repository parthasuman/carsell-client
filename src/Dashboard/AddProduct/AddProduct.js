import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const navigate = useNavigate();

  const handleAddCar = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const car = {
            name: data.name,
            orginalPrice: data.oprice,
            ResellPrice: data.rprice,
            location: data.location,
            brand: data.brand,
            phone: data.phone,
            image: imgData.data.url,
          };
          fetch("http://localhost:5000/cars", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(car),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added successfully`);
              navigate("/dashboard/myproducts");
            });
        }
      });
  };

  return (
    <div className="w-96 p-7">
      <h3 className="text-3xl">Add A Product</h3>

      <form onSubmit={handleSubmit(handleAddCar)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text"> Car Name</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            {...register("phone")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Orginal price</span>
          </label>
          <input
            type="text"
            {...register("oprice")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Resell Price</span>
          </label>
          <input
            type="text"
            {...register("rprice")}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <select {...register("location")} className="w-full mt-4 ">
            <option value="">Location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="khulna">Khulna</option>
            <option value="chottagong">Chittagong</option>
            <option value="sylhet">Sylhet</option>
            <option value="rangpur">Rangpur</option>
          </select>
        </div>

        <select {...register("brand")} className="w-full mt-4 ">
          <option value="">Brand</option>
          <option value="toyota">Toyota</option>
          <option value="bmw">BMW</option>
          <option value="tata">TATA</option>
        </select>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text"> Photo</span>
          </label>
          <input type="file" {...register("image")} className="input " />
        </div>

        <input
          className="btn btn-accent w-full mt-4"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProduct;
