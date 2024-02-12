import { useState } from 'react';
import PopupModal from "./PopupModal";
import PropTypes from 'prop-types';
import { forgotPassword } from '../Utils/ApiUtils';
import FormError from './FormError';
import Loader from './Loader';

function ForgotPassword({ onClose, onSignIn }) {


  const [email, setEmail] = useState('');

   //error state
   const [emailError, setEmailError] = useState('');

   const [alertType, setAlertType] = useState('');
   const [alertMessage, setAlertMessage] = useState('');
   const [showAlert, setShowAlert] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isForgotSuccess, setForgotSuccess] = useState(false);


  const handleSignUp = async (event) => {
   try{
      event.preventDefault(); // Prevent the default form submission behavior
      if(!validateForm()) return
      setLoading(true)
      const response = await fetch(forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error? data.error:'Something wrong with API service');
      }

      setLoading(false);
      setForgotSuccess(true);

    } catch (error) {
      console.error('Forgot error:', error.message);
      setShowAlert(true);
      setAlertType('error');
      setAlertMessage('Forgot Failed! '+ error.message);
      setLoading(false);
    }
  };


  const validateForm = () => {
    let isValid = true;
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;
  };
  return (
      <PopupModal width={isForgotSuccess?'md:w-1/2 lg:w-1/4':''} title={isForgotSuccess?'Email sent':"Forgot your Password"} onClose={onClose}>
       {!isForgotSuccess? <form className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex w-3/4 items-center justify-start">
            {showAlert && <FormError type={alertType} message={alertMessage}  onClose={()=>setShowAlert(false)}/>}
          </div>
          <div className="relative flex w-3/4 items-center justify-start">
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="email" className='text-sm font-medium text-left w-full pl-2'>Email <span className='text-danger'>*</span></label>
            <input
              placeholder="Email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
              className={`h-[50px] w-full ${emailError?'border-danger':'border-zinc-400'} rounded-[15px] border bg-white px-4 shadow focus:shadow-xl`}
            />
            {emailError && <span className="text-red-500 text-xs text-end w-full pr-2">{emailError}</span>}

            </div>
          </div>
          <div className="w-3/4 flex items-center justify-center mt-6">
          <button disabled={isLoading} onClick={handleSignUp} className="h-[60px] w-full flex justify-center items-center gap-2 rounded-[15px] bg-blue-600 text-xl text-white shadow">
             {!isLoading? <span>Forgot Password</span> : <><span>Wait Please...</span> <Loader width={'w-4'} height={'h-4'} /></>}
              
            </button>
          </div>
          <div className="flex h-[20px] w-3/4 items-center justify-between gap-6">
            <hr className="h-[0px] w-2/4 border border-zinc-400" />
            <p>OR</p>
            <hr className="h-[0px] w-2/4 border border-zinc-400" />
          </div>
          <div className="m-auto mb-10 sm:mb-20 text-center">
            {"Already have an account? "}
            <button onClick={onSignIn} className="p-2 text-white rounded-md bg-blue-600 cursor-pointer">
              Log in
            </button>
          </div>
        </form>
      :<form className="w-full flex flex-col items-center justify-center gap-3">
      <div className=" w-3/4 items-center justify-start">
         <p className='font-medium text-green-700 text-center'>Reset password email sent successfully!</p>
         <p className='text-center text-black'>Check your email and follows the instructions to reset the password. </p>
      </div>
      <div className="w-3/4 flex items-center justify-center my-6">
      <button onClick={onSignIn} className="h-[60px] w-full flex justify-center items-center gap-2 rounded-[15px] bg-blue-600 text-xl text-white shadow">
          Login
        </button>
      </div>
    </form>  
      }
      </PopupModal>
  );
}

ForgotPassword.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ForgotPassword;