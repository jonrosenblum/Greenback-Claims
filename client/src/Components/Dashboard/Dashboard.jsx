import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';
import Referrals from "./Pieces/Referrals";
import Sidebar from "./Pieces/Sidebar";
import Home from "./Pieces/Home";
import Profile from "./Pieces/Profile";
import useAuthStore from "../../zustand/authStore";
function Dashboard() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const { user } = useAuthStore();
  
    useEffect(() => {
        // Do something when the location changes
        setCurrentPath(location.pathname);
    }, [location]);
    
  return (
    <div className="m-0 font-sans text-base antialiased h-[100vh] font-normal leading-default bg-gray-100 text-slate-500">
    <Sidebar isSidebarOpen={isSidebarOpen} currentPath={currentPath}/>
    <main className="ease-soft-in-out lg:ml-[18rem] ml-0 relative max-h-screen  rounded-xl transition-all duration-200">
      <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl xl:flex-nowrap xl:justify-start" >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto ">
          <nav className="w-1/2">
            <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
          </nav>
  
  
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none">
              <li className="flex items-center relative">
                <Link className="hidden sm:inline-block px-8 py-1 mb-0 mr-4 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro border-secondary ease-soft-in hover:scale-102 active:shadow-soft-xs text-secondary hover:border-primary active:bg-primary active:hover:text-secondary hover:text-primary tracking-tight-soft hover:bg-transparent hover:opacity-75 hover:shadow-none active:text-white active:hover:bg-transparent" to="/">Go back to website</Link>
              </li>
              <li className="flex items-center">
                <span className="flex items-center gap-2 px-0 py-2 text-sm font-semibold transition-all ease-nav-brand text-slate-500">
                  <h6 className="hidden sm:inline font-bold capitalize">{user.username}</h6>
                </span>
              </li>
              
              <li className="flex items-center pl-4 lg:hidden">
                <a onClick={()=>setIsSidebarOpen(!isSidebarOpen)} className="block p-0 text-sm transition-all ease-nav-brand text-slate-500">
                  <div className="w-4.5 overflow-hidden">
                    <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                    <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                    <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  </div>
                </a>
              </li>
            </ul>
        </div>
      </nav>
      <section className="max-h-[91vh] overflow-y-scroll no-scrollbar">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/referrals" element={<Referrals />} />
        </Routes>
      </section>
       
    </main>
  
  </div>
  )
}

export default Dashboard