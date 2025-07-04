import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone } from "@ant-design/icons";

const ThankYouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/MyOrdersUser");
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
        className="mb-6"
      >
        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 100 }} />
      </motion.div>

      <h2 className="text-3xl font-bold mb-2">Thank You for Your Order!</h2>
      <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>
      <p className="text-sm text-gray-500">Redirecting to My Orders...</p>
    </motion.div>
  );
};

export default ThankYouPage;
