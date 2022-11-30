import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider";

const HomeMoadl = ({ setHomeBooking }) => {
  const { user } = useContext(AuthContext);
  const { data: ausers, isLoading } = useQuery({
    queryKey: ["ausers"],
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
  console.log(ausers);
  const handelHomeBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const time = form.time.value;

    const allbooking = {
      name,
      email,
      phone,
      time,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allbooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setHomeBooking(null);
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      {ausers?.map((auser) => (
        <div key={auser._id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="homemodal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="homemodal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">{auser.name}</h3>
                <form
                  onSubmit={handelHomeBooking}
                  className="grid grid-cols-1 gap-3"
                >
                  <input
                    name="name"
                    type="text"
                    defaultValue={user?.displayName}
                    disabled
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                  />
                  <input
                    name="email"
                    type="Email"
                    defaultValue={user?.email}
                    disabled
                    placeholder="Email Address"
                    className="input input-bordered w-full"
                  />
                  <input
                    name="time"
                    type="text"
                    placeholder="Your Time"
                    className="input input-bordered w-full"
                  />
                  <input
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    className="input input-bordered w-full"
                  />
                  <br></br>
                  <input
                    className="btn btn-accent w-full"
                    type="submit"
                    value="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeMoadl;
