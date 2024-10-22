import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white shadow mt-4">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm">
                        {currentYear} © Minia.
                    </div>
                    <div className="hidden sm:block text-sm">
                        Design & Develop by <a href="#!" className="text-blue-500 underline">Themesbrand</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
