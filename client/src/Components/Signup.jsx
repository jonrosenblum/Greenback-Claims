import PopupModal from "./PopupModal";
import PropTypes from 'prop-types';


function SignUp({onClose,onSignIn}) {
  return (
    <>
    <PopupModal title="Register Account" onClose={onClose}> 
    <form className="w-full flex flex-col items-center justify-center gap-6">
            <div className="relative flex w-3/4 items-center justify-start">
              <input
                placeholder="Username"
                name="username"
                id="username"
                required
                className="relative h-[50px] w-full rounded-[15px] border border-zinc-400 bg-white pl-14 shadow focus:shadow-xl"
              />
              <img
                src="../../../assets/images/login/Envelope.png"
                alt=""
                className="absolute ml-6"
              />
            </div>
            <div className="relative flex w-3/4 items-center justify-start">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="h-[50px] w-full rounded-[15px] border border-zinc-400 bg-white pl-14 shadow focus:shadow-xl"
              />
              <img
                src="../../../assets/images/login/Lock.png"
                alt=""
                className="absolute ml-6"
              />
            </div>
          
            <div className="w-3/4 flex items-center justify-center">
              <button className="h-[60px] w-full rounded-[15px] bg-blue-600 text-xl text-white shadow">
                Sign Up
                {/* <app-loading-spinner *ngIf="loading"></app-loading-spinner> */}
              </button>
            </div>
            <div className="flex sm:h-[50px] h-[20px] w-3/4 items-center justify-between gap-6">
              <hr className="h-[0px] w-2/4 border border-zinc-400" />
              <p>OR</p>
              <hr className="h-[0px] w-2/4 border border-zinc-400" />
            </div>
            <div className="m-auto mb-10 sm:mb-20 text-center">
              {"If you already have account? "}
              <a onClick={onSignIn} className="text-[#4560CB] cursor-pointer">
                Login
              </a>
            </div>
          </form>
    </PopupModal>

    </>
  );
}

SignUp.propTypes = {
  onSignIn:PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SignUp;
