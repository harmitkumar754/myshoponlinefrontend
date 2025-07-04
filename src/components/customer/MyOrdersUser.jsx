import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Tag, Button, Modal } from "antd";
import { FileText, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ReactToPrint from "react-to-print";

const MyOrdersUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);

  const orderData = [
    {
      key: "1",
      product: {
        name: "Wireless Headphones",
        image: "https://via.placeholder.com/150",
      },
      date: "2024-06-15",
      amount: "$89.99",
      status: "Delivered",
    },
    {
      key: "2",
      product: {
        name: "Bluetooth Speaker",
        image: "https://via.placeholder.com/150",
      },
      date: "2024-06-10",
      amount: "$45.50",
      status: "Shipped",
    },
    {
      key: "3",
      product: {
        name: "Smart Watch",
        image: "https://via.placeholder.com/150",
      },
      date: "2024-05-28",
      amount: "$129.99",
      status: "Processing",
    },
    {
      key: "4",
      product: {
        name: "Bluetooth Speaker",
        image: "https://via.placeholder.com/150",
      },
      date: "2024-06-10",
      amount: "$45.50",
      status: "Shipped",
    },
    {
      key: "5",
      product: {
        name: "Bluetooth Speaker",
        image: "https://via.placeholder.com/150",
      },
      date: "2024-06-10",
      amount: "$45.50",
      status: "Shipped",
    },
    {
      key: "6",
      product: {
        name: "Bluetooth Speaker",
        image: "https://via.placeholder.com/150",
      },
      date: "2024-06-10",
      amount: "$45.50",
      status: "Shipped",
    },
  ];

  const getStatusTag = (status) => {
    let color = "default";
    if (status === "Delivered") color = "green";
    else if (status === "Shipped") color = "blue";
    else if (status === "Processing") color = "orange";
    return <Tag color={color}>{status}</Tag>;
  };

  const openModal = (type, order) => {
    setModalType(type);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 bg-gradient-to-br from-purple-300 via-white to-blue-300 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-2 sm:p-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-600 text-center">
          My Orders
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
          {orderData.map((order) => (
            <SwiperSlide key={order.key}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="border rounded-lg shadow-md p-4 sm:p-6 bg-gradient-to-r from-white to-blue-50 transition-all duration-200 h-full flex flex-col justify-between"
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <img
                    src={order.product.image}
                    alt={order.product.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold">{order.product.name}</h3>
                    <p className="mt-2 text-sm sm:text-base">
                      <strong>Order Date:</strong> {order.date}
                    </p>
                    <p className="text-sm sm:text-base">
                      <strong>Amount:</strong> {order.amount}
                    </p>
                    <div className="mt-2">{getStatusTag(order.status)}</div>
                  </div>
                </div>

                <div className="flex justify-center mt-4 gap-2 sm:gap-4">
                  <Button
                    type="primary"
                    icon={<FileText className="w-4 h-4" />}
                    onClick={() => openModal("invoice", order)}
                    className="!rounded !px-3 !py-1"
                  >
                    Invoice
                  </Button>
                  <Button
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => openModal("view", order)}
                    className="!rounded !px-3 !py-1"
                  >
                    View
                  </Button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal */}
        <Modal
          title={modalType === "invoice" ? "Invoice" : "Order Details"}
          open={isModalOpen}
          onCancel={closeModal}
          removeAfterClose={false}
          footer={
            modalType === "invoice" ? (
              <ReactToPrint
                trigger={() => (
                  <Button type="primary" className="!rounded !px-4 !py-1">
                    Print Invoice
                  </Button>
                )}
                content={() => printRef.current}
                onBeforeGetContent={() => setIsPrinting(true)}
                onAfterPrint={() => {
                  setIsPrinting(false);
                  closeModal();
                }}
                pageStyle={`
                  @media print {
                    body { background: white !important; }
                    .print-area { max-width: 600px; margin: 0 auto; font-size: 14px; }
                    .print-area h3 { font-size: 20px; margin-bottom: 8px; }
                    .print-area p { margin: 4px 0; }
                    .ant-modal-footer, .ant-modal-close, .ant-modal-header, .ant-modal-title, .ant-modal-content > :not(.print-area) { display: none !important; }
                    .ant-modal-content { box-shadow: none !important; padding: 0 !important; }
                  }
                `}
              />
            ) : (
              <Button type="primary" onClick={closeModal} className="!rounded !px-4 !py-1">
                Close
              </Button>
            )
          }
          className="max-w-full sm:max-w-lg"
          bodyStyle={{ padding: 16 }}
        >
          {selectedOrder && (
            <div ref={printRef} className={modalType === "invoice" ? "print-area" : ""}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{selectedOrder.product.name}</h3>
              <p className="text-sm sm:text-base"><strong>Order Date:</strong> {selectedOrder.date}</p>
              <p className="text-sm sm:text-base"><strong>Amount:</strong> {selectedOrder.amount}</p>
              <p className="text-sm sm:text-base"><strong>Status:</strong> {selectedOrder.status}</p>
              {modalType === "invoice" && (
                <>
                  <hr className="my-2" />
                  <p className="text-xs text-gray-500">Thank you for your purchase!</p>
                </>
              )}
            </div>
          )}
        </Modal>
      </motion.div>
    </div>
  );
};

export default MyOrdersUser;
