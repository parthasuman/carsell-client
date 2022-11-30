import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51M671rJZylc1J1HpM7DGPP7HjUWNKn19r5f0FdzymAARh0C0SaPgKlbP6Wem18NGDZojt6ApXJrL3ijv9uPD33PG00P9mCpJI7"
);

const Payment = () => {
  const booking = useLoaderData();
  console.log(booking);
  return (
    <div>
      Payment For {booking.carName}
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
