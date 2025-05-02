import React, { useContext } from 'react'
import { AuthContext } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {


  const { logout } = useContext(AuthContext);
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
          <Link to={'/login'}>
            <div className="flex -space-x-2">
              <svg className='scale-150 fill-gray-300' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59
                 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 
                 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
              </svg>
            </div>
          </Link>

          <button className='cursor-pointer text-white bg-black p-4' onClick={
            
            () => {
              alert('delete');
              logout()
            }
          }>
            Logout
          </button>
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

      <hr className="border-gray-800 border-1 mb-6" />
    </>
  )
}

export default Navbar