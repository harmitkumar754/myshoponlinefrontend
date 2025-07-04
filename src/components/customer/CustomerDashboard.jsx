import React from 'react';

const CustomerDashboard = () => {
  const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 600 },
  ];

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid md:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{product.name}</h3>
            <p className="mb-4">${product.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
