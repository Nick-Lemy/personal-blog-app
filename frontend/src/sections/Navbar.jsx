import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {


  const tabs = document.querySelectorAll('.navbar *');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      tabs.forEach(t => {
        t.classList.remove('text-white', 'bg-blue-900');
        t.classList.add('text-gray-400');
      });

      // Add active class to clicked tab
      this.classList.remove('text-gray-400');

      if (!this.classList.contains('bg-blue-900')) {
        this.classList.add('text-white', 'bg-blue-900');
      }
    });
  });
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-500">Nick's Blog</h1>

        <div className="flex space-x-2 items-center">

          {/* <!-- User Avatars --> */}
          <div className="flex -space-x-2">
            <div className="p-5 rounded-full bg-blue-600 border-2 border-gray-500 z-30"></div>
          </div>
        </div>
      </div>

      {/* <!-- Tabs --> */}
      <div className="navbar flex mb-2 *:text-sm **:md:text-base **:cursor-pointer *:transform *:duration-200 *:rounded-md *:ease-in">
        <Link to='/' className="px-4 py-2 text-white bg-blue-900">
          Home
        </Link>
        <Link to='/favorites' className="px-4 py-2 text-gray-400">
          Favorites
        </Link>

        <Link to='/history' className="px-4 py-2 text-gray-400">
          History
        </Link>

        <Link to='/about' className="px-4 py-2 text-gray-400">
          About
        </Link>
      </div>

      <hr className="border-gray-800 border-1 mb-6" /></>
  )
}

export default Navbar