import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, ShieldCheck, Activity, MapPin } from "lucide-react";
import { Input, Select, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const RegistrationFormUser = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const userData = {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      contact: values.contact,
      Address: values.Address,
      picture: null, // if you add image upload, handle it here
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        userData,
        {
          withCredentials: true // IMPORTANT: this allows cookies to be set
        }
      );

      message.success(response.data.message || "Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "Something went wrong");
      if(error.response?.data?.message === "User already exists"){
        alert("User already exists");
        navigate("/LoginFormUser");
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          <span className="text-blue-600">My</span>StoreOnline Registration
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="fullname"
            label={<span><User className="inline mr-2" /> Name</span>}
            rules={[
              { required: true, message: "Please enter your name" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 50, message: "Name must be less than 50 characters" }
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span><Mail className="inline mr-2" /> Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span><Lock className="inline mr-2" /> Password</span>}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="contact"
            label={<span><Phone className="inline mr-2" /> Phone</span>}
            rules={[
              { required: false },
              { pattern: /^[\+]?[1-9][\d]{0,15}$/, message: "Enter a valid phone number" }
            ]}
          >
            <Input placeholder="Enter your phone number (optional)" />
          </Form.Item>

          <Form.Item
            name="Address"
            label={<span><MapPin className="inline mr-2" /> Address</span>}
            rules={[
              { required: false },
              { max: 500, message: "Address must be less than 500 characters" }
            ]}
          >
            <TextArea 
              placeholder="Enter your address (optional)" 
              rows={3}
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Login here
              </a>
            </p>
          </div>
        </Form>
      </motion.div>
    </div>
  );
};

export default RegistrationFormUser;
