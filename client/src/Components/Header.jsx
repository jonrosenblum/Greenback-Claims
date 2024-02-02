import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
import useStore from "../zustand/store";
import Login from "./Login";
import SignUp from "./SignUp";
import useAuthStore from "../zustand/authStore";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [showPopup, setShowPopup] = useState("");
  const { visa, setVisaTrue } = useStore();

  const { isAuthenticated } = useAuthStore();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-gray-900">
        <div className="mx-auto  px-2 sm:px-4 lg:pl-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center px-2 lg:px-0">
              <div className="flex-shrink-0">
                <a href="/">
                  {" "}
                  <div className="text-white text-sm sm:text-2xl font-bold">
                    Greenback Claims
                  </div>
                </a>
              </div>
            </div>
            <div className="flex flex-1 justify-center px-2  sm:justify-end">
              <div className="w-full max-wLg sm:max-w-xs">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-6">
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
                    <div className="relative inline-block textLeft">
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
                        className={`z-10 absolute right-0 mt-2 w-48 bg-white border roundedLg shadowLg ${
                          isDropdownOpen ? "" : "hidden"
                        }`}
                      >
                        <a
                          href="#about"
                          onClick={setVisaTrue}
                          className={`block px-4 py-2 rounded-tLg text-gray-800 hover:bg-gray-200 ${
                            visa && "bg-gray-200"
                          }`}
                        >
                          Visa & Mastercard Anti-Trust Lawsuit
                        </a>
                        <a
                          // href="#about"
                          // onClick={setVisaFalse}
                          className={`block px-4 py-2 rounded-bLg text-gray-800 hover:bg-gray-200 ${
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
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex sm:hidden"
              onClick={() => setIsMobileNav(!isMobileNav)}
            >
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileNav && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="space-y-6 px-2 pb-3 pt-2">
              <Link
                to="about"
                className="block text-center text-white px-3 hover:text-gray-300 cursor-pointer"
                smooth={true}
                duration={500}
              >
                About
              </Link>
              <Link
                to="fqs"
                className=" block text-center text-white px-3 hover:text-gray-300 cursor-pointer"
                smooth={true}
                duration={500}
              >
                FAQs
              </Link>
              <div className="relative ml-[40%] sm:ml-[45%] inline-block textLeft">
                <div>
                  <button
                    type="button"
                    className="block text-center text-white px-3 hover:text-gray-300 focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    Services ▾
                  </button>
                </div>
                <div
                  // style={{zIndex: '1000'}}
                  className={`z-10 absolute -right-10 mt-2 w-48 bg-white px-3 border roundedLg shadowLg ${
                    isDropdownOpen ? "" : "hidden"
                  }`}
                >
                  <a
                    href="#about"
                    onClick={setVisaTrue}
                    className={`block text-center px-4 py-2 rounded-tLg text-gray-800 hover:bg-gray-200 ${
                      visa && "bg-gray-200"
                    }`}
                  >
                    Visa & Mastercard Anti-Trust Lawsuit
                  </a>
                  <a
                    // href="#about"
                    // onClick={setVisaFalse}
                    className={`block text-center px-4 py-2 rounded-bLg text-gray-800 hover:bg-gray-200 ${
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
                  className="block text-center text-white px-3 hover:text-gray-300 cursor-pointer"
                >
                  Referrals
                </RouterLink>
              ) : (
                <a
                  onClick={() => {
                    setShowPopup("login");
                  }}
                  className="block text-center text-white px-3 hover:text-gray-300 cursor-pointer"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        )}
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
