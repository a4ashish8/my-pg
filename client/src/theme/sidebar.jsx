import React from 'react';

const Sidebar = () => {
    return (
        <div className="vertical-menu h-full bg-gray-50 shadow">
            <div className="overflow-y-auto h-full" style={{ scrollbarWidth: 'thin' }}>
                <div id="sidebar-menu">
                    <ul className="metismenu list-none p-4">
                        <li className="menu-title text-gray-700 font-semibold mb-4" data-key="t-menu">
                            Menu
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                                <i className="feather feather-home"></i>
                                <span className="ml-2" data-key="t-dashboard">Dashboard</span>
                            </a>
                        </li>
                        {/* Add more sidebar items here */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
