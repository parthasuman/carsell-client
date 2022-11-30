import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        // authorization: `bearer ${localStorage.getItem("accessToken")}`,
      });
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <h3 className="text-3xl mb-5"> My Orders</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>Carname</th>
              <th>Time</th>
              <th>Location</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <tr key={booking._id}>
                <th>{i + 1}</th>
                <td>{booking.buyer}</td>
                <td>{booking.carName}</td>
                <td>{booking.time}</td>
                <td>{booking.place}</td>
                <td>
                  <Link to={`/dashboard/payment/${booking._id}`}>
                    <button className="btn btn-primary"> Pay</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
