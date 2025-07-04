import React, { useState } from 'react';
import { Input, Select, Form, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit, Trash2, Home, Building, Map } from 'lucide-react';

const { Option } = Select;

const AddressManager = () => {
  // Static user and addresses data
  const user = { name: 'John Doe' };
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      mobileno: '1234567890',
      pincode: '123456',
      locality: 'Downtown',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'State',
      landmark: 'Near Park',
      type: 'Home',
    },
  ]);
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (values) => {
    if (editId) {
      setAddresses(addresses.map(addr => addr.id === editId ? { ...values, id: editId } : addr));
      setEditId(null);
    } else {
      setAddresses([...addresses, { ...values, id: Date.now() }]);
    }
    form.resetFields();
    setShowForm(false);
    message.success('Address saved successfully!');
  };

  const handleEdit = (address) => {
    form.setFieldsValue(address);
    setEditId(address.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    message.success('Address deleted successfully!');
  };

  const handleAddNew = () => {
    form.resetFields();
    setEditId(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditId(null);
    setShowForm(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'Office':
        return <Building className="w-4 h-4" />;
      default:
        return <Map className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-300 via-white to-blue-300 -z-10" 
        aria-hidden="true"
      ></div>

      {/* Content */}
      <div className="relative z-0 p-4 sm:p-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Address Manager</h2>
            <p className="text-gray-600">Manage your delivery addresses</p>
            {user && (
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, <span className="font-semibold">{user.name}</span>
              </p>
            )}
          </div>

          {/* Add New Address Button */}
          {!showForm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleAddNew}
              className="w-full sm:w-auto mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Address
            </motion.button>
          )}

          {/* Address Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        { required: true, message: 'Please enter full name' },
                        { min: 2, message: 'Name must be at least 2 characters' }
                      ]}
                    >
                      <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                      label="Mobile Number"
                      name="mobileno"
                      rules={[
                        { required: true, message: 'Please enter mobile number' },
                        { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits' }
                      ]}
                    >
                      <Input placeholder="Enter 10-digit mobile number" />
                    </Form.Item>

                    <Form.Item
                      label="Pincode"
                      name="pincode"
                      rules={[
                        { required: true, message: 'Please enter pincode' },
                        { pattern: /^[0-9]{6}$/, message: 'Pincode must be 6 digits' }
                      ]}
                    >
                      <Input placeholder="Enter 6-digit pincode" />
                    </Form.Item>

                    <Form.Item
                      label="Locality"
                      name="locality"
                      rules={[{ required: true, message: 'Please enter locality' }]}
                    >
                      <Input placeholder="Enter locality" />
                    </Form.Item>

                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: 'Please enter address' }]}
                      className="md:col-span-2"
                    >
                      <Input.TextArea rows={3} placeholder="Enter complete address" />
                    </Form.Item>

                    <Form.Item
                      label="City"
                      name="city"
                      rules={[{ required: true, message: 'Please enter city' }]}
                    >
                      <Input placeholder="Enter city" />
                    </Form.Item>

                    <Form.Item
                      label="State"
                      name="state"
                      rules={[{ required: true, message: 'Please enter state' }]}
                    >
                      <Input placeholder="Enter state" />
                    </Form.Item>

                    <Form.Item
                      label="Landmark"
                      name="landmark"
                      className="md:col-span-2"
                    >
                      <Input placeholder="Enter landmark (optional)" />
                    </Form.Item>

                    <Form.Item
                      label="Address Type"
                      name="type"
                      rules={[{ required: true, message: 'Please select address type' }]}
                    >
                      <Select placeholder="Select address type">
                        <Option value="Home">Home</Option>
                        <Option value="Office">Office</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div className="flex gap-3 justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      {editId ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Addresses List */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Saved Addresses ({addresses.length})
            </h3>

            {addresses.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No addresses found</p>
                <button
                  onClick={handleAddNew}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Add Your First Address
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {addresses.map((address) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(address.type)}
                            <span className="font-semibold text-lg">{address.name}</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-1">
                            {address.address}, {address.locality}
                          </p>
                          <p className="text-gray-600 mb-1">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          {address.landmark && (
                            <p className="text-gray-500 text-sm mb-1">
                              Landmark: {address.landmark}
                            </p>
                          )}
                          <p className="text-gray-600 font-medium">
                            📞 {address.mobileno}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(address)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Address"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(address.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Address"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddressManager; 