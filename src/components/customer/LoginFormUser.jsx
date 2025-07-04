import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { Input, Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginFormUser = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true, 
        }
      );

      // If redirect doesn't happen on backend, manually redirect here
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data || "Login failed";
      message.error(msg);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          <span className="text-blue-600">My</span>StoreOnline Login
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
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
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="flex justify-between mb-4">
            <Link to="/ForgotPasswordUser" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/RegistrationFormUser" className="text-sm text-blue-500 hover:underline">
              Register
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginFormUser;
