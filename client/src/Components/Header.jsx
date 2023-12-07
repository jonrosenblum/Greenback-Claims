import { useState } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-gray-900 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            Greenback Claims
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              FAQs
            </a>
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="text-white hover:text-gray-300 focus:outline-none"
                  onClick={toggleDropdown}
                >
                  Services ▾
                </button>
              </div>
              <div
                className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg ${
                  isDropdownOpen ? '' : 'hidden'
                }`}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dropdown Item 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dropdown Item 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dropdown Item 3
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
