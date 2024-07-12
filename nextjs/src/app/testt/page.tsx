// pages/index.js
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white py-4 shadow-md flex justify-between items-center px-8">
        <div className="flex items-center">
          <img src="/shark-logo.png" alt="Shark Wow group" className="h-10" />
          <span className="ml-4 font-bold text-xl">Shark Wow group</span>
        </div>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Service</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">About Us</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
        </nav>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-4xl font-bold mb-4">Shark Wow</h1>
          <p className="text-lg mb-8">
            โครงการพัฒนาระบบแพลตฟอร์มสำหรับหาทุนเพื่อธุรกิจ
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Explore Now
          </button>
        </div>
      </main>
      <footer className="w-full py-4 text-center text-gray-600">
        &copy; 2024 Shark Wow group. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;