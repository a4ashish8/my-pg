import React from 'react';

const RightSidebar = () => {
    return (
        <div className="right-bar fixed top-0 right-0 h-full bg-white shadow-lg">
            <div className="overflow-y-auto h-full" style={{ scrollbarWidth: 'thin' }}>
                <div className="rightbar-title flex items-center bg-gray-800 p-3">
                    <h5 className="text-white m-0 mr-2">Theme Customizer</h5>
                    <a href="javascript:void(0);" className="ml-auto text-white">
                        <i className="mdi mdi-close noti-icon"></i>
                    </a>
                </div>
                {/* Settings Content Here */}
            </div>
            <div className="rightbar-overlay fixed inset-0 bg-black opacity-50"></div>
        </div>
    );
};

export default RightSidebar;
