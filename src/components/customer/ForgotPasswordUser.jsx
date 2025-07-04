import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Shield, Lock, Send } from "lucide-react";
import { Input, Button, Form, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPasswordUser = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleSendOtp = () => {
    message.success("OTP sent to your email");
    setOtpSent(true);
  };

  const onFinish = (values) => {
    if (!captchaVerified) {
      message.error("Please verify captcha");
      return;
    }
    console.log("Reset Form Values:", values);
    message.success("Password reset successful");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-white to-blue-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Forgot Password
        </h2>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<span><Mail className="inline mr-2" /> Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter valid email" },
            ]}
          >
            <Input placeholder="Enter your email" disabled={otpSent} />
          </Form.Item>

          {!otpSent && (
            <Form.Item>
              <Button
                type="primary"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex justify-center items-center gap-2"
                onClick={handleSendOtp}
              >
                <Send className="w-4 h-4" />
                Send OTP
              </Button>
            </Form.Item>
          )}

          {otpSent && (
            <>
              <Form.Item
                name="otp"
                label={<span><Shield className="inline mr-2" /> OTP</span>}
                rules={[{ required: true, message: "Enter OTP sent to your email" }]}
              >
                <Input placeholder="Enter OTP" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={<span><Lock className="inline mr-2" /> New Password</span>}
                rules={[{ required: true, message: "Enter new password" }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>

              <div className="mb-4">
                <ReCAPTCHA
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={() => setCaptchaVerified(true)}
                  onExpired={() => setCaptchaVerified(false)}
                />
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordUser;
