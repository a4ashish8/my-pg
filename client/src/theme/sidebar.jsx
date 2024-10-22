import React from 'react';

const Sidebar = () => {
  return (
    <section id="content" className="flex flex-col h-full">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-white shadow-md p-4">
        <i className='bx bx-menu text-xl'></i>
        <a href="#" className="nav-link text-gray-700">Categories</a>
        <form action="#" className="flex items-center">
          <div className="form-input relative">
            <input
              type="search"
              placeholder="Search..."
              className="border rounded-lg py-1 px-2"
            />
            <button type="submit" className="absolute right-0 top-0 mt-1 mr-2">
              <i className='bx bx-search'></i>
            </button>
          </div>
        </form>
        <input type="checkbox" id="switch-mode" hidden />
        <label htmlFor="switch-mode" className="switch-mode"></label>
        <a href="#" className="notification relative">
          <i className='bx bxs-bell'></i>
          <span className="num absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">8</span>
        </a>
        <a href="#" className="profile">
          <img src="img/people.png" alt="Profile" className="w-8 h-8 rounded-full" />
        </a>
      </nav>
      {/* NAVBAR */}

      {/* MAIN */}
      <main className="flex-grow p-4">
        <div className="head-title flex justify-between items-center mb-4">
          <div className="left">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <ul className="breadcrumb flex items-center space-x-2">
              <li><a href="#" className="text-blue-500">Dashboard</a></li>
              <li><i className='bx bx-chevron-right'></i></li>
              <li><a className="active text-gray-700" href="#">Home</a></li>
            </ul>
          </div>
          <a href="#" className="btn-download bg-blue-500 text-white py-2 px-4 rounded flex items-center">
            <i className='bx bxs-cloud-download mr-1'></i>
            <span className="text">Download PDF</span>
          </a>
        </div>

        <ul className="box-info grid grid-cols-3 gap-4 mb-6">
          <li className="bg-white p-4 rounded shadow">
            <i className='bx bxs-calendar-check text-2xl'></i>
            <span className="text">
              <h3 className="text-xl font-bold">1020</h3>
              <p>New Order</p>
            </span>
          </li>
          <li className="bg-white p-4 rounded shadow">
            <i className='bx bxs-group text-2xl'></i>
            <span className="text">
              <h3 className="text-xl font-bold">2834</h3>
              <p>Visitors</p>
            </span>
          </li>
          <li className="bg-white p-4 rounded shadow">
            <i className='bx bxs-dollar-circle text-2xl'></i>
            <span className="text">
              <h3 className="text-xl font-bold">$2543</h3>
              <p>Total Sales</p>
            </span>
          </li>
        </ul>

        <div className="table-data flex">
          <div className="order flex-grow mr-4">
            <div className="head flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Recent Orders</h3>
              <div>
                <i className='bx bx-search cursor-pointer'></i>
                <i className='bx bx-filter cursor-pointer'></i>
              </div>
            </div>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Date Order</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {['Completed', 'Pending', 'Process'].map((status, index) => (
                  <tr key={index}>
                    <td className="border p-2 flex items-center">
                      <img src="img/people.png" alt="User" className="w-8 h-8 rounded-full mr-2" />
                      <p>John Doe</p>
                    </td>
                    <td className="border p-2">01-10-2021</td>
                    <td className="border p-2">
                      <span className={`status ${status.toLowerCase()}`}>{status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="todo w-1/3">
            <div className="head flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Todos</h3>
              <div>
                <i className='bx bx-plus cursor-pointer'></i>
                <i className='bx bx-filter cursor-pointer'></i>
              </div>
            </div>
            <ul className="todo-list bg-white p-4 rounded shadow">
              {['Todo List', 'Todo List', 'Todo List', 'Todo List', 'Todo List'].map((item, index) => (
                <li key={index} className={index % 2 === 0 ? "completed flex justify-between items-center" : "not-completed flex justify-between items-center"}>
                  <p>{item}</p>
                  <i className='bx bx-dots-vertical-rounded'></i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      {/* MAIN */}
    </section>
  );
};

export default Sidebar;
