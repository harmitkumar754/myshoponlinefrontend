import React from 'react';
import { motion } from 'framer-motion';
import { Input, Button, Form, Select, message } from 'antd';
import { Mail, User, MessageSquare, Info } from 'lucide-react';

const { TextArea } = Input;
const { Option } = Select;

const ContactPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Contact form submitted:', values);
    message.success('Thank you for your message! We’ll get back soon.');
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-white to-blue-300 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Contact Us</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ type: 'general' }}
        >
          <Form.Item
            name="name"
            label={<><User className="inline mr-2" />Name</>}
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<><Mail className="inline mr-2" />Email</>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="type"
            label={<><Info className="inline mr-2" />Enquiry Type</>}
          >
            <Select>
              <Option value="general">General Inquiry</Option>
              <Option value="support">Support</Option>
              <Option value="sales">Sales</Option>
              <Option value="feedback">Feedback</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="subject"
            label={<><MessageSquare className="inline mr-2" />Subject</>}
            rules={[{ required: true, message: 'Please add a subject' }]}
          >
            <Input placeholder="Subject of your message" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <TextArea rows={4} placeholder="How can we help you?" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
