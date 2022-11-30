import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../../../contexts/AuthProvider";

const Modal = ({ n, setBuying }) => {
  const { name: nName, location } = n;
  // console.log(n);

  const { user } = useContext(AuthContext);
  console.log(user);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const place = form.l.value;
    const name = form.name.value;
    const email = form.email.value;
    const time = form.time.value;
    const phone = form.phone.value;

    const booking = {
      time,
      carName: nName,
      buyer: name,
      place,
      email,
      phone,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setBuying(null);
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{nName}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3">
            <select name="l" className="select select-bordered w-full">
              {location.map((l, i) => (
                <option value={l} key={i}>
                  {l}
                </option>
              ))}
            </select>
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
    </>
  );
};

export default Modal;
