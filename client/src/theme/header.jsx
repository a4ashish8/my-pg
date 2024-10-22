import React from 'react';

const Header = () => {
    return (
        <header id="page-topbar" className="bg-white shadow-md">
            <div className="flex justify-between items-center p-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <a href="#" className="flex items-center">
                        <img src="assets/images/logo-sm.svg" alt="Logo" className="h-6 mr-2" />
                        <span className="text-lg font-bold text-gray-800">Minia</span>
                    </a>
                </div>

                {/* Menu Toggle Button */}
                <button className="btn btn-sm px-3 text-lg" id="vertical-menu-btn">
                    <i className="fa fa-fw fa-bars"></i>
                </button>

                {/* Search Bar */}
                <form className="hidden lg:flex items-center">
                    <input
                        type="text"
                        className="form-control border rounded-lg p-2"
                        placeholder="Search..."
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" type="button">
                        <i className="bx bx-search-alt align-middle"></i>
                    </button>
                </form>

                {/* User Dropdown and Settings */}
                <div className="flex items-center">
                    <button className="text-gray-500 hover:text-gray-700 mr-4">
                        <i className="icon-lg" data-feather="settings"></i>
                    </button>

                    <button
                        className="flex items-center bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
                        aria-haspopup="true"
                    >
                        <img
                            className="rounded-full h-8 w-8"
                            src="assets/images/users/avatar-1.jpg"
                            alt="Header Avatar"
                        />
                        <span className="hidden xl:inline-block ml-2 font-medium text-gray-700">Shawn L.</span>
                        <i className="mdi mdi-chevron-down hidden xl:inline-block ml-2"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
