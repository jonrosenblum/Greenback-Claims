import { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Link } from "react-scroll";
import useStore from "../zustand/store";
import Login from "./Login";
import SignUp from "./SignUp";
import useAuthStore from "../zustand/authStore";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState("");
  const { visa, setVisaTrue } = useStore();

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    console.log("user isLogged:", isAuthenticated);
  }, [isAuthenticated]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-gray-900 py-4 px-4 sm:px-0">
        <div className="container mx-auto flex justify-between items-center">
          {/* <Link to="/"> */}
          <a href="/">
            {" "}
            <div className="text-white text-sm sm:text-2xl font-bold">
              Greenback Claims
            </div>
          </a>
          {/* </Link> */}
          <div className="flex space-x-4">
            <Link
              to="about"
              className="text-white hover:text-gray-300 cursor-pointer"
              smooth={true}
              duration={500}
            >
              About
            </Link>
            <Link
              to="fqs"
              className="text-white hover:text-gray-300 cursor-pointer"
              smooth={true}
              duration={500}
            >
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
                  isDropdownOpen ? "" : "hidden"
                }`}
              >
                <a
                  href="#about"
                  onClick={setVisaTrue}
                  className={`block px-4 py-2 rounded-t-lg text-gray-800 hover:bg-gray-200 ${
                    visa && "bg-gray-200"
                  }`}
                >
                  Visa & Mastercard Anti-Trust Lawsuit
                </a>
                <a
                  // href="#about"
                  // onClick={setVisaFalse}
                  className={`block px-4 py-2 rounded-b-lg text-gray-800 hover:bg-gray-200 ${
                    !visa && "bg-gray-200"
                  }`}
                >
                  <s>Employee Retention Credit (ERC)</s>
                </a>
              </div>
            </div>
            {isAuthenticated ? (
              <RouterLink
                to="/dashboard/referrals"
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                Referrals
              </RouterLink>
            ) : (
              <a
                onClick={() => {
                  setShowPopup("login");
                }}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                Login
              </a>
            )}
            {/* <Link to="Referrals" className="text-white hover:text-gray-300 cursor-pointer" smooth={true} duration={500}>
            Referrals
            </Link> */}
          </div>
        </div>
      </nav>
      {showPopup == "login" && (
        <Login
          onClose={() => setShowPopup("")}
          onSignUp={() => setShowPopup("sign-up")}
        />
      )}
      {showPopup == "sign-up" && (
        <SignUp
          onClose={() => setShowPopup("")}
          onSignIn={() => setShowPopup("login")}
        />
      )}
    </div>
  );
}
