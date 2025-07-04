import React from "react";
import { motion } from "framer-motion";
import { Tag } from "antd";
import { CalendarCheck, Truck, CreditCard, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const OrderHistoryUser = () => {
  const historyData = [
    {
      key: "1",
      product: "Wireless Headphones",
      date: "2024-06-15",
      amount: "$89.99",
      status: "Delivered",
      payment: "Credit Card",
      address: "123 Main Street, New York",
    },
    {
      key: "2",
      product: "Bluetooth Speaker",
      date: "2024-06-10",
      amount: "$45.50",
      status: "Shipped",
      payment: "PayPal",
      address: "456 Market Street, San Francisco",
    },
    {
      key: "3",
      product: "Smart Watch",
      date: "2024-05-28",
      amount: "$129.99",
      status: "Processing",
      payment: "Cash on Delivery",
      address: "789 Park Ave, Los Angeles",
    },
    {
      key: "3",
      product: "Smart Watch",
      date: "2024-05-28",
      amount: "$129.99",
      status: "Processing",
      payment: "Cash on Delivery",
      address: "789 Park Ave, Los Angeles",
    },
    {
      key: "3",
      product: "Smart Watch",
      date: "2024-05-28",
      amount: "$129.99",
      status: "Processing",
      payment: "Cash on Delivery",
      address: "789 Park Ave, Los Angeles",
    },
    {
      key: "3",
      product: "Smart Watch",
      date: "2024-05-28",
      amount: "$129.99",
      status: "Processing",
      payment: "Cash on Delivery",
      address: "789 Park Ave, Los Angeles",
    }
  ];

  const getStatusTag = (status) => {
    let color = "default";
    if (status === "Delivered") color = "green";
    else if (status === "Shipped") color = "blue";
    else if (status === "Processing") color = "orange";
    return (
      <Tag color={color}>
        <Truck className="inline mr-1 w-4 h-4" /> {status}
      </Tag>
    );
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 bg-gradient-to-br from-purple-300 via-white to-blue-300 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-2 sm:p-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-600 text-center flex items-center justify-center gap-2">
          <CalendarCheck className="w-8 h-8" /> Order History
        </h2>

        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} px-3 sm:px-5 py-1 border rounded bg-indigo-200 mx-2 sm:mx-3">${index + 1}</span>`;
            },
          }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: 100 }}
        >
          {historyData.map((order) => (
            <SwiperSlide key={order.key}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="border rounded-lg shadow-md p-4 sm:p-6 bg-gradient-to-r from-white to-blue-50 transition-all duration-200 h-full flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{order.product}</h3>
                  <p className="text-sm sm:text-base"><strong>Order Date:</strong> {order.date}</p>
                  <p className="text-sm sm:text-base"><strong>Amount:</strong> {order.amount}</p>
                  <p className="text-sm sm:text-base flex items-center gap-2"><CreditCard className="w-4 h-4" /> <strong>Payment:</strong> {order.payment}</p>
                  <p className="text-sm sm:text-base flex items-center gap-2"><MapPin className="w-4 h-4" /> <strong>Address:</strong> {order.address}</p>
                  <div className="mt-2">{getStatusTag(order.status)}</div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default OrderHistoryUser;
