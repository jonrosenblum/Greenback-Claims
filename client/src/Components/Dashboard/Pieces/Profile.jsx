import { useRef, useState  } from 'react';
import Alert from '../../Alert';
import useAuthStore from '../../../zustand/authStore';
function Profile() {

  const { user } = useAuthStore();
  const paragraphRef = useRef(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_URL;
  const handleCopyClick = () => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNode(paragraphRef.current);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  return (
    <div className="ease-soft-in-out relative h-full max-h-screen  transition-all duration-200">
  
    <div className="w-full px-6 mx-auto">
      <div className="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl">
        <span
          className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-secondary/70 to-primary/70 opacity-60">
        </span>
      </div>
      <div
        className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div
              className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center overflow-hidden rounded-full text-white transition-all duration-200">
              <img src='https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png'
                alt="profile_image" className="w-full shadow-soft-sm rounded-xl" style={{height: 'inherit'}} />
            </div>
          </div>
          <div className="flex w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="font-medium text-xl">{user.username}</h5>
              <p className="mb-0 font-semibold leading-normal text-sm">{user.email}</p>              
            </div>
          </div>
          <div className="w-auto max-w-full px-3 justify-end mx-auto mt-4 sm:my-auto sm:mr-0 md:flex-none">
            <div className="relative ">
              <div className="sm:block">
                <nav className="flex flex-wrap md:justify-end space-x-4 justify-start" aria-label="Tabs">
                 
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div className="w-full p-6 mx-auto">
      {isAlertVisible &&  <div className='my-3 px-3'>
      <Alert message='Link copied to you clipboard successfully!'/>
      </div>}
    <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                  <div className="max-w-full px-3 lg:w-3/4 lg:flex-none">
                    <div className="flex flex-col h-full">
                      {/* <p className="pt-2 mb-1 font-semibold">Auto Created</p> */}
                      <h5 className="font-bold">Your Referral Link</h5>
                      <p className="mb-12" ref={paragraphRef}>{baseUrl}?ref={user.referral_id}</p>
                      <a className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500" href="">
                        Press the button to copy your referral link and start sharing with others. 
                      </a>
                    </div>
                  </div>
                  <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-3/12 lg:flex-none hover:shadow-soft-xl">
                    <div onClick={handleCopyClick} className="h-full bg-gradient-to-tl from-primary to-secondary rounded-xl hover:from-secondary  hover:to-primary cursor-pointer">
                      {/* <img src="../assets/img/shapes/waves-white.svg" className="absolute top-0 hidden w-1/2 h-full lg:block" alt="waves" /> */}
                      <div className="relative flex items-center justify-center h-full">
                        {/* <img className="relative z-20 w-full pt-6" src="../assets/img/illustrations/rocket-white.png" alt="rocket" /> */}
                        <i className="fa fa-copy text-white text-4xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </div>
  </div>
  )
}

export default Profile

