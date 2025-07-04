import React, { useState } from "react";
import { Card, Button, Input, Form, message, Radio } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [promoCode, setPromoCode] = useState("");

  // STATIC data for hardcoded frontend testing
  const addresses = [
    {
      id: 1,
      name: "John Doe",
      address: "123 Main Street, New York, NY 10001",
      phone: "+1 123 456 7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Park Avenue, Los Angeles, CA 90001",
      phone: "+1 987 654 3210",
    },
  ];

  const applyPromo = () => {
    if (promoCode === "SAVE10") {
      message.success("Promo code applied: 10% off");
    } else {
      message.error("Invalid promo code");
    }
  };

  return (
    <>
      <motion.div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Checkout Page</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr, index) => (
            <div key={addr.id} className="relative">
              <Card
                className={`transition-all duration-300 ${
                  selectedAddress === index
                    ? "border-blue-500 border-2 shadow-lg"
                    : "hover:shadow-md"
                } cursor-pointer`}
                onClick={() => setSelectedAddress(index)}
              >
                <p><b>Name:</b> {addr.name}</p>
                <p><b>Address:</b> {addr.address}</p>
                <p><b>Phone:</b> {addr.phone}</p>
              </Card>

              <div className="absolute top-2 right-2">
                <Radio
                  checked={selectedAddress === index}
                  onChange={() => setSelectedAddress(index)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="link"
          onClick={() => alert("Add Address Modal Opened")}
          className="mt-4"
        >
          + Add New Address
        </Button>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Promo Code</h3>
          <Form layout="inline">
            <Form.Item>
              <Input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={applyPromo}>
                Apply
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="flex justify-end mt-8">
          <Link
            to={selectedAddress !== null ? "/PaymentPage" : "#"}
            className={`px-6 py-2 rounded text-white font-medium transition duration-300 ${
              selectedAddress !== null
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (selectedAddress === null) {
                e.preventDefault();
                message.warning("Please select an address first");
              }
            }}
          >
            Next: Payment
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default CheckoutPage;
