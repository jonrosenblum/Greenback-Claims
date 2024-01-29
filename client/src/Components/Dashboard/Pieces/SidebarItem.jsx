import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function SidebarItem({isActive=false,path,label,icon}) {
  return (
    <li className="mt-0.5 w-full">
    <Link to={path} className={` py-2.7 ease-nav-brand mx-4 my-0 flex items-center whitespace-nowrap rounded-lg px-4 text-sm text-tsecondary transition-colors 
    ${ isActive ? 'shadow-soft-xl bg-white font-semibold' : ''}`}>
      <div className={`shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5
      ${ isActive ? 'bg-gradient-to-tl from-primary to-secondary' : ''}`}>
        <i className={`fa fa-${icon}  ${ isActive ? 'text-white' : 'text-tsecondary'}`} aria-hidden="true"></i>
      </div>
      <span className="ease-soft pointer-events-none ml-1 opacity-100 duration-300">
        {label}
      </span>
    </Link>
  </li>
  )
}

SidebarItem.propTypes = {
    isActive:PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    icon:PropTypes.string.isRequired,
  };

export default SidebarItem