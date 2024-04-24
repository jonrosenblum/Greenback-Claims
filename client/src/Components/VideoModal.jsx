import PropTypes from 'prop-types';
import video from "./../../assets/videos/visa payment intro.mp4";
import closeIcon from "./../../assets/images/X.png";

function VideoModal({ onClose }) {


  return (
    <>
    <div className={`padding-10 no-scrollbar fixed inset-0 z-50 flex w-full animate-fade-in items-center justify-center overflow-y-auto overflow-x-hidden outline-none backdrop-blur-sm focus:outline-none`}>
        <div className={`md:w-auto relative padding-10  flex w-[98%]  flex-col items-center justify-center gap-0 rounded-[20px] bg-white shadow-l`}>
          <div className="p-2 shadow-md rounded-full absolute  -top-8 -right-0 md:-top-6 md:-right-6 bg-white">
            <img src={closeIcon} alt="" className="cursor-pointer" onClick={onClose} />
          </div>
          {/* <div className="mb-3 sm:mb-5">
            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-black/70">
            {title}
            </h1>
          </div> */}
          <video src={video} controls></video>
        </div>
      </div>
      <div className="fixed inset-0 z-40 backdrop-blur-md"></div>
 
    </>
  );
}

VideoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default VideoModal;
