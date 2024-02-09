import { useState } from 'react';
import PopupModal from "./PopupModal";
import PropTypes from 'prop-types';
import { signUpAPI } from '../Utils/ApiUtils';
import FormError from './FormError';
import Loader from './Loader';

function SignUp({ onClose, onSignIn }) {


  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

   //error state
   const [emailError, setEmailError] = useState('');
   const [usernameError, setUsernameError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   const [alertType, setAlertType] = useState('');
   const [alertMessage, setAlertMessage] = useState('');
   const [showAlert, setShowAlert] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isSignUpSuccess, setSignUpSuccess] = useState(false);


  const handleSignUp = async (event) => {
   try{
      event.preventDefault(); // Prevent the default form submission behavior
      if(!validateForm()) return
      setLoading(true)
      //generate referral ID with username and random string
      const referral_ID = username+'_'+ Math.random().toString(16).substring(2)
      const response = await fetch(signUpAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password,referral_ID }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error? data.error:'Something wrong with API service');
      }

      const data = await response.json();
      console.log(data)
      setLoading(false);
      setSignUpSuccess(true);

    } catch (error) {
      console.error('Signup error:', error.message);
      setShowAlert(true);
      setAlertType('error');
      setAlertMessage('SignUp Failed! '+ error.message);
      setLoading(false);
    }
  };


  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };
  return (
      <PopupModal width={isSignUpSuccess?'md:w-1/2 lg:w-1/4':''} title={isSignUpSuccess?'Sign up successful':"Create an account"} onClose={onClose}>
       {!isSignUpSuccess? <form className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex w-3/4 items-center justify-start">
            {showAlert && <FormError type={alertType} message={alertMessage}  onClose={()=>setShowAlert(false)}/>}
          </div>
          <div className="flex w-3/4 items-center justify-start">

            <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="username" className='text-sm font-medium text-left w-full pl-2'>Username <span className='text-danger'>*</span></label>
            <input
              placeholder="Username"
              name="username"
              id="username"
              required
              value={username}
              onChange={(e) => {setUsername(e.target.value); setUsernameError('')}}
              className={`h-[50px] w-full ${usernameError?'border-danger':'border-zinc-400'} rounded-[15px] border bg-white px-4 shadow focus:shadow-xl`}
            />
            {usernameError && <span className="text-red-500 text-xs text-end w-full pr-2">{usernameError}</span>}

            </div>
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
          <div className="flex w-3/4 items-center justify-start">
          <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="password" className='text-sm font-medium text-left w-full pl-2'>Password <span className='text-danger'>*</span></label>
            <input
              type="Password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {setPassword(e.target.value);setPasswordError('')}}
              className={`h-[50px] w-full ${passwordError?'border-danger':'border-zinc-400'} rounded-[15px] border bg-white px-4 shadow focus:shadow-xl`}
            />
             {passwordError && <span className="text-red-500 text-xs text-end w-full pr-2">{passwordError}</span>}

            </div>
          </div>
          <div className="w-3/4 flex items-center justify-center mt-6">
          <button disabled={isLoading} onClick={handleSignUp} className="h-[60px] w-full flex justify-center items-center gap-2 rounded-[15px] bg-blue-600 text-xl text-white shadow">
             {!isLoading? <span>Sign up</span> : <><span>Signing Up...</span> <Loader width={'w-4'} height={'h-4'} /></>}
              
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
         <p className='font-medium text-green-700 text-center'>Your account was created successfully!</p>
         <p className='text-center'>You can now login to your referral dashboard with <b>Username</b> and <b>Password</b>. </p>
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

SignUp.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignUp;