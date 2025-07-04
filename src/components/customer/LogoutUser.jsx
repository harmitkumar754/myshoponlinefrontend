import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const LogoutUser = () => {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-white to-blue-300 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow p-8 text-center"
      >
        <h1 className="text-2xl font-semibold mb-4">Thank You for Visiting!</h1>
        <p className="text-gray-600 mb-4">
          You have been successfully logged out.
        </p>
        <p className="text-gray-600">
          You will be redirected to the homepage in{' '}
          <span className="font-bold">{secondsLeft}</span> second
          {secondsLeft !== 1 ? 's' : ''}.
        </p>
      </motion.div>
    </div>
  );
};

export default LogoutUser;
