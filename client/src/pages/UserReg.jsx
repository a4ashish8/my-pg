import React from 'react';
import Header from '../theme/header'; // Adjust the import path as necessary
import Footer from '../theme/footer'; // Adjust the import path as necessary
import Sidebar from '../theme/sidebar'; // Adjust the import path as necessary
import RegisterForm from './RegisterForm'; // Adjust the import path as necessary

const RegisterPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-4">
          <div className="max-w-2xl mx-auto">
            <RegisterForm />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
