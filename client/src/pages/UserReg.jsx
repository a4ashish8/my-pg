import React from 'react';
import Header from '../theme/header'; 
import Footer from '../theme/footer'; 
import Sidebar from '../theme/sidebar'; 
import RegisterForm from './RegisterForm'; 

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
