import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} AdminHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
