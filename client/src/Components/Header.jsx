import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Link } from 'react-scroll';
import useStore from '../zustand/store';



export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { visa, setVisaTrue, setVisaFalse, toggleVisa } = useStore();
  
  useEffect(() => {
    console.log('isLogged value changed:', visa);
  }, [visa]);

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
                  onClick={setVisaTrue}
                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${visa && 'bg-gray-200'}`}
                >
                 Master card
                </a>
                <a
                  href="#"
                  onClick={setVisaFalse}
                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${!visa && 'bg-gray-200'}`}
                >
                 ERC
                </a>

              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
