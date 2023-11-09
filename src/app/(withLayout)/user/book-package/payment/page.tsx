"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/UI/CheckoutForm";
import { Divider } from "@mui/material";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OAR7HA5j9z44Pg15pY2zLDIQfeN1HnfrxyoWAdf1zN3VVGWPT8jYp7jB0CSKPJaYlxtVKm3Bx4jL0zBJu3hyn3300wRP82HU8"
);

type IParams = {
  params: any;
  searchParams: {
    token: string;
    payment: string;
  };
};

export default function App({ params, searchParams }: IParams) {
  const appearance = {
    theme: "stripe",
  };
  const options: { clientSecret: string; appearance: any } = {
    clientSecret: searchParams.token,
    appearance,
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-5 shadow-md">
        <h4 className="text-xl font-medium text-center mt-3">Pay your ${searchParams.payment} bill</h4>
        <Divider className="my-2" />
        {searchParams.token && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
