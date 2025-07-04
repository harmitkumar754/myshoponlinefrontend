import React, { useState } from "react";
import { Card, Button, Input, Form, message, Radio } from "antd";
import { motion } from "framer-motion";
import { useNavigate,Link } from "react-router-dom";

const PaymentPage = () => {
    const Navigate=useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const handleConfirm = () => {
    if (paymentMethod === "card") {
      if (!paymentInfo.cardNumber || !paymentInfo.nameOnCard || !paymentInfo.expiry || !paymentInfo.cvv) {
        message.error("Please fill all card details");
        return;
      }
    }
    if (paymentMethod === "upi") {
      if (!paymentInfo.upiId) {
        message.error("Please enter UPI ID");
        return;
      }
    }
    message.success("Order Confirmed!");
    Navigate("/ThankYouPage");
  };

  const shippingAddress = {
    name: "John Doe",
    address: "123 Main Street, New York, NY 10001",
    phone: "+1 123 456 7890",
  };

  return (
    <motion.div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <Card className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping To:</h3>
        <p><b>{shippingAddress.name}</b></p>
        <p>{shippingAddress.address}</p>
        <p>Phone: {shippingAddress.phone}</p>
      </Card>

      <Card className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Radio value="card">Credit/Debit Card</Radio>
          <Radio value="upi">UPI</Radio>
          <Radio value="cod">Cash on Delivery</Radio>
        </Radio.Group>
      </Card>

      <Form layout="vertical">
        {paymentMethod === "card" && (
          <>
            <Form.Item label="Card Number">
              <Input
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />
            </Form.Item>
            <Form.Item label="Name on Card">
              <Input
                value={paymentInfo.nameOnCard}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                placeholder="John Doe"
              />
            </Form.Item>
            <div className="flex gap-4">
              <Form.Item label="Expiry (MM/YY)" className="flex-1">
                <Input
                  value={paymentInfo.expiry}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                  placeholder="12/25"
                />
              </Form.Item>
              <Form.Item label="CVV" className="flex-1">
                <Input
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                  placeholder="123"
                />
              </Form.Item>
            </div>
          </>
        )}

        {paymentMethod === "upi" && (
          <Form.Item label="UPI ID">
            <Input
              value={paymentInfo.upiId}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, upiId: e.target.value })}
              placeholder="yourname@upi"
            />
          </Form.Item>
        )}

        {paymentMethod === "cod" && (
          <p className="text-green-600 font-semibold">
            Cash on Delivery selected. You will pay upon delivery.
          </p>
        )}
      </Form>

      <div className="flex justify-end mt-8">
        <Link to="/ThankYouPage"  type="primary" onClick={handleConfirm} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
          Confirm Order
        </Link>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
