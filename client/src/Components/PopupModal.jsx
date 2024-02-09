import PropTypes from 'prop-types';
import closeIcon from "./../../assets/images/X.png";

function PopupModal({ onClose, title, width, children  }) {
  return (
    <>
      <div className={`padding-10 no-scrollbar fixed inset-0 z-50 flex w-full animate-fade-in items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none`}>
        <div className={`${width?width:'md:w-[40%]'} padding-10  flex w-[98%]  flex-col items-center justify-center gap-0 rounded-[20px] bg-white shadow-l`}>
          <div className="mr-10 mt-4 flex w-full justify-end">
            <img src={closeIcon} alt="" className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="mb-3 sm:mb-5">
            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-black/70">
            {title}
            </h1>
          </div>
          {children}
        </div>
      </div>
      <div className="fixed inset-0 z-40 backdrop-blur-md"></div>
    </>
  )
}



PopupModal.propTypes = {
    children:PropTypes.node,
    width:PropTypes.string,
    onClose: PropTypes.func,
    title: PropTypes.string.isRequired,
  };
export default PopupModal