import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, Save, ImagePlus, ArrowLeft } from "lucide-react";
import { Input, Button, Form, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { TextArea } = Input;

const ProfileEditFormUser = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  // Fetch user profile on component mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    } else {
      navigate('/LoginFormUser');
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Set form values when user data is loaded
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user, form]);

  // Handle success/error messages
  useEffect(() => {
    if (authMessage && !loading) {
      message.success(authMessage);
      dispatch(clearMessage());
    }
  }, [authMessage, loading, dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleImageChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'uploading') {
      const file = info.file.originFileObj;
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values) => {
    try {
      console.log("Updated Profile:", values);
      console.log("Uploaded Image URL:", imageUrl);
      
      // Prepare update data
      const updateData = {
        name: values.name,
        phone: values.phone || null,
        address: values.address || null
      };

      // Dispatch update profile action
      await dispatch(updateProfile(updateData)).unwrap();
      
    } catch (error) {
      console.error('Profile update error:', error);
      // Error is already handled by the Redux slice
    }
  };

  // Generate user avatar based on name
  const getUserAvatar = (name) => {
    if (!name) return null;
    
    // Create initials from name
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    // Generate a consistent color based on name
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
    ];
    const colorIndex = name.length % colors.length;
    
    return (
      <div className={`w-24 h-24 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white text-2xl font-bold`}>
        {initials}
      </div>
    );
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-white to-blue-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-center text-indigo-600">
            Edit Profile
          </h2>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Current Profile Display */}
        {user && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              {getUserAvatar(user.name)}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}

        <Form 
          form={form}
          layout="vertical" 
          onFinish={onFinish}
          disabled={loading}
        >
          <Form.Item
            name="name"
            label={<span><User className="inline mr-2" /> Full Name</span>}
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
            label={<span><Mail className="inline mr-2" /> Email Address</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter your email address" disabled />
            <small className="text-gray-500">Email cannot be changed</small>
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span><Phone className="inline mr-2" /> Phone Number</span>}
            rules={[
              { required: false },
              { pattern: /^[\+]?[1-9][\d]{0,15}$/, message: "Enter a valid phone number" }
            ]}
          >
            <Input placeholder="Enter your phone number (optional)" />
          </Form.Item>

          <Form.Item
            name="address"
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

          {/* Image Upload */}
          <Form.Item
            name="profileImage"
            label={<span><ImagePlus className="inline mr-2" /> Profile Image</span>}
          >
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false} // prevent auto upload
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />} disabled={loading}>
                Click to Upload
              </Button>
            </Upload>
            {imageUrl && (
              <div className="mt-4">
                <img src={imageUrl} alt="Preview" className="rounded-full w-32 h-32 object-cover mx-auto border" />
              </div>
            )}
            <small className="text-gray-500">Upload a new profile image (optional)</small>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Form.Item>
        </Form>

        {/* Additional Links */}
        <div className="mt-6 text-center space-y-2">
          <Link 
            to="/ForgotPasswordUser" 
            className="block text-blue-600 hover:text-blue-800 transition-colors"
          >
            Change Password
          </Link>
          <Link 
            to="/AddressManager" 
            className="block text-gray-600 hover:text-gray-800 transition-colors"
          >
            Manage Addresses
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileEditFormUser;
