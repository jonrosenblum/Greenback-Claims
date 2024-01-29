import PopupModal from "./PopupModal";
import PropTypes from 'prop-types';

function Login({onClose,onSignUp}) {
  return (
    <>
    <PopupModal title="Login to Account" onClose={onClose}> 
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
            <div className="flex h-[50px] w-3/4 items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="savepin"
                  className="rounded-[15px] bg-white"
                />
                <span> Remember Me</span>
              </div>
              <a href="#" className="text-[#4560CB]">
                Forgot Password
              </a>
            </div>
            <div className="w-3/4 flex items-center justify-center">
              <button className="h-[60px] w-full rounded-[15px] bg-blue-600 text-xl text-white shadow">
                Sign In
                {/* <app-loading-spinner *ngIf="loading"></app-loading-spinner> */}
              </button>
            </div>
            <div className="flex sm:h-[50px] h-[20px] w-3/4 items-center justify-between gap-6">
              <hr className="h-[0px] w-2/4 border border-zinc-400" />
              <p>OR</p>
              <hr className="h-[0px] w-2/4 border border-zinc-400" />
            </div>
            <div className="m-auto mb-10 sm:mb-20 text-center">
              {"If you don't have account?"}
              <a onClick={onSignUp} className="text-[#4560CB] cursor-pointer">
                {" "}
                Signup
              </a>
            </div>
          </form>
    </PopupModal>

    </>
  );
}
Login.propTypes = {
    onSignUp:PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };
export default Login;
