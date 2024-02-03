import { useState } from 'react';
import useAuthStore from '../zustand/authStore'; // Update the path accordingly
import PopupModal from "./PopupModal";
import PropTypes from 'prop-types';
import { logInAPI } from './../Utils/ApiUtils'
import Loader from './Loader';
import FormError from './FormError';
import { useNavigate } from 'react-router-dom'

function Login({ onClose, onSignUp }) {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //error state
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (event) => {
    try {
      event.preventDefault(); // Prevent the default form submission behavior
      if(!validateForm()) return
      setLoading(true)
      const response = await fetch(logInAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(response.status == 401? ' Invalid username or password.':'Something wrong with API service');
      }

      const data = await response.json();
      console.log(data)
      const token = data.token;
      // Update the user state or perform other actions
      login(token);
      setLoading(false);
      onClose(); // close the modal
      localStorage.setItem('token',token)
      navigate('/dashboard'); // Replace '/dashboard' with the desired route


    } catch (error) {
      console.error('Login error:', error.message);
      setShowAlert(true);
      setAlertType('error');
      setAlertMessage('Login Failed!'+ error.message);
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

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  return (
    <>
      <PopupModal width={''} title="Sign in to Greenback Claims" onClose={onClose}>
        <form className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col gap-1 w-3/4 items-center justify-start">
        {showAlert && <FormError type={alertType} message={alertMessage}  onClose={()=>setShowAlert(false)}/>}
            <input
              placeholder="Username"
              name="username"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`h-[50px] w-full ${usernameError?'border-danger':'border-zinc-400'} rounded-[15px] border  bg-white px-4 shadow focus:shadow-xl`}
            />
            {usernameError && <span className="text-red-500 text-xs text-left w-full pl-2">{usernameError}</span>}
          </div>
          <div className="flex flex-col gap-1 w-3/4 items-center justify-start">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-[50px] w-full ${passwordError?'border-danger':'border-zinc-400'} rounded-[15px] border 00 bg-white px-4 shadow focus:shadow-xl`}
            />
             {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
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
            <button disabled={isLoading} onClick={handleLogin} className="h-[60px] w-full flex justify-center items-center gap-2 rounded-[15px] bg-blue-600 text-xl text-white shadow">
             {!isLoading? <span>Sign In</span> : <><span>Signing In...</span> <Loader width={'w-4'} height={'h-4'} /></>}
              
            </button>
          </div>
          <div className="flex h-[20px] w-3/4 items-center justify-between gap-6">
            <hr className="h-[0px] w-2/4 border border-zinc-400" />
            <p>OR</p>
            <hr className="h-[0px] w-2/4 border border-zinc-400" />
          </div>
          <div className="m-auto mb-10 sm:mb-20 text-center">
            {"Don't have an account?"}
            <a onClick={onSignUp} className="text-[#4560CB] cursor-pointer">
              {" "}
              Sign up
            </a>
          </div>
        </form>
      </PopupModal>
    </>
  );
}

Login.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Login;
