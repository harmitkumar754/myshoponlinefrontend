import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Target, Heart, Star, CheckCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const AboutPage = () => {



const MotionLink = motion(Link, { forwardMotionProps: true });
  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Award, value: '500+', label: 'Products' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: CheckCircle, value: '99%', label: 'Satisfaction Rate' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Passionate about creating exceptional shopping experiences.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Leading our technology innovation and digital transformation.'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      bio: 'Creating beautiful and intuitive user experiences.'
    },
    {
      name: 'David Wilson',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: 'Ensuring smooth operations and customer satisfaction.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do.'
    },
    {
      icon: Target,
      title: 'Quality Assured',
      description: 'Every product meets our high quality standards.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Constantly innovating to improve your shopping experience.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a community of satisfied customers.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-white to-blue-300 overflow-hidden">
      
      
      <main>
        {/* Hero Section */}
        <section className="relative  py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-dark mb-6">
                About MyStore
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                We're passionate about bringing you the best products and exceptional shopping experiences. 
                Our journey started with a simple mission: to make quality products accessible to everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-gradient-to-br from-purple-300 via-white to-blue-300 p-10 rounded-2xl">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-300 via-white to-blue-300 shadow rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary-600 " />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 ">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  At MyStore, we believe that everyone deserves access to high-quality products at fair prices. 
                  Our mission is to create a seamless shopping experience that connects customers with the best 
                  products from around the world.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We're committed to sustainability, ethical sourcing, and providing exceptional customer service. 
                  Every product in our store is carefully selected to meet our high standards for quality and value.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Quality Guaranteed</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-300 via-white to-blue-300 shadow rounded-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                      <div className="text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                      <div className="text-gray-600">Brands</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                      <div className="text-gray-600">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                      <div className="text-gray-600">Secure</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white bg-gradient-to-br from-purple-300 via-white to-blue-300">
          <div className="container mx-auto px-4 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 "
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 ">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape our relationship with customers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center p-6 shadow rounded-2xl bg-gradient-to-br from-purple-300 via-white to-blue-300 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-br from-purple-300 via-white to-blue-300 ">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The passionate people behind MyStore who work tirelessly to bring you the best experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary-600/20 to-transparent"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Ready to Shop with Us?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover amazing products at unbeatable prices.
              </p>
              
              <MotionLink
  to="/products"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="bg-gradient-to-br from-purple-300 via-white to-blue-300 text-dark font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-decoration-none"
>
  Start Shopping
</MotionLink>
            </motion.div>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default AboutPage; 