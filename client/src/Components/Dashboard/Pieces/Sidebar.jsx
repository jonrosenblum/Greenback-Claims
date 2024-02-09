import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuthStore from "../../../zustand/authStore";

function Sidebar({isSidebarOpen, currentPath}) {
  const { logout } = useAuthStore();

  return (
    <aside className={` max-w-62.5 ease-nav-brand no-scrollbar fixed inset-y-0 z-50 my-4 ml-4 block w-full flex-wrap items-center justify-between rounded-2xl bg-white p-0 antialiased shadow-none transition-transform duration-200 lg:left-0 lg:translate-x-0 lg:bg-transparent ${isSidebarOpen?'-translate-x-0 border-2 border-secondary':'-translate-x-full border-2'}`}>
      <div className="h-19.5">
        {isSidebarOpen && <i className={`fa fa-times absolute right-0 top-0 cursor-pointer p-4 text-slate-400 opacity-50 lg:hidden`} aria-hidden="true"></i>}
        <Link
          className="m-0 block whitespace-nowrap px-8 py-6 text-2xl font-bold text-slate-700"
          to="/"
        >
          Greenback Claims
        </Link>
      </div>
      <hr className="mt-0 h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <div className="no-scrollbar h-sidenav block max-h-screen w-auto grow basis-full items-center overflow-auto py-3">
        <ul className="mb-0 flex flex-col pl-0">
          <SidebarItem isActive={currentPath == '/dashboard'} label="Dashboard" path="/dashboard" icon="dashboard" />
          <SidebarItem isActive={currentPath == '/dashboard/referrals'} label="Referrals" path="referrals" icon="share"/>
          <SidebarItem isActive={currentPath == '/dashboard/profile'} label="My Profile" path="profile" icon="user"/>
        </ul>
      </div>

      <div className="relative mx-4">
        <Link
        onClick ={()=>logout()}
          className="-bottom-[40px] shadow-soft-md bg-150 bg-x-25 leading-pro hover:shadow-soft-2xl hover:scale-102 absolute my-4 inline-block w-full select-none rounded-lg border-0 bg-gradient-to-tl from-primary to-secondary px-6 py-3 text-center align-middle text-xs font-bold uppercase text-white transition-all ease-in"
          to={'/'}
          
        >
          Logout
        </Link>
      </div>
      
    </aside>
  );
}
Sidebar.propTypes = {
  isSidebarOpen:PropTypes.bool,
  currentPath:PropTypes.string
};
export default Sidebar;
