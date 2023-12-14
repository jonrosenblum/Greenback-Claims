import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-scroll';



export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-gray-900 py-4">
        <div className="container mx-auto flex justify-between items-center">
        {/* <Link to="/"> */}
         <a href="/">     <div className="text-white text-2xl font-bold">
                Greenback Claims
              </div>
              </a>
          {/* </Link> */}
          <div className="flex space-x-4">
            
        <Link to="about" className="text-white hover:text-gray-300" smooth={true} duration={500}>
          About
        </Link>
            {/* <a href="#" className="text-white hover:text-gray-300">
              FAQs
            </a> */}
        <Link to="fqs" className="text-white hover:text-gray-300" smooth={true} duration={500}>
            FAQs
        </Link>
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
              // style={{zIndex: '1000'}}
                className={`z-10 absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg ${
                  isDropdownOpen ? '' : 'hidden'
                }`}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Visa and MasterCard
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Employee Retention Credit (ERC)
                </a>
                {/* <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Dropdown Item 3
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
