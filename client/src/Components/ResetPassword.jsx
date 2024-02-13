import { useState } from "react";
import PopupModal from "./PopupModal";
import PropTypes from "prop-types";
import { resetPassword } from "../Utils/ApiUtils";
import Loader from "./Loader";
import FormError from "./FormError";
import { useNavigate } from 'react-router-dom'

function ResetPassword({ token, onClose }) {
  const [isResetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleCPassword, setToggleCPassword] = useState(false);
  const [newPassword, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  //error state
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleResetPassword = async (event) => {
    try {
      event.preventDefault(); // Prevent the default form submission behavior
      if (!validateForm()) return;
      setLoading(true);
      const response = await fetch(resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error(data.error? data.error:'Something wrong with API service');
      }

      // Update the user state or perform other actions
      setResetPasswordSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("Reset password error:", error.message);
      setShowAlert(true);
      setAlertType("error");
      setAlertMessage("Reset password Failed!" + error.message);
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!newPassword.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!cPassword.trim()) {
      setCPasswordError("Confirm Password is required");
      isValid = false;
    } 

    if(cPassword.trim() != newPassword.trim()){
      isValid = false;
      setCPasswordError("Confirm Password not matched");
    } 

    return isValid;
  };

  return (
    <>
      <PopupModal
        width={""}
        title={
          isResetPasswordSuccess
            ? "Password Reset Successfully"
            : "Reset Password"
        }
        onClose={onClose}
      >
        {!isResetPasswordSuccess ? (
          <form className="w-full flex flex-col items-center justify-center gap-3 mb-14">
            <div className="flex flex-col gap-1 w-3/4 items-center justify-end relative">
              {showAlert && (
                <FormError
                  type={alertType}
                  message={alertMessage}
                  onClose={() => setShowAlert(false)}
                />
              )}
              <label
                htmlFor="password"
                className="text-sm font-medium text-left text-black w-full pl-2"
              >
                New Password <span className="text-danger">*</span>
              </label>

              <input
                type={togglePassword?"text":"password"}
                name="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {setPassword(e.target.value);setPasswordError('')}}
                className={`h-[50px] w-full ${
                  passwordError ? "border-danger" : "border-zinc-400"
                }  rounded-[15px] border 00 text-black bg-white px-4 shadow focus:shadow-sm`}
              />
              <i className={`fa fa-eye hover:text-black text-gray-600 absolute right-3 top-10 cursor-pointer hover:scale-[1.2]`} aria-hidden="true" onClick={()=>{setTogglePassword(!togglePassword)}}></i>
              {passwordError && (
                <span className="text-red-500 text-sm w-full text-end">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-3/4 items-center justify-end relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-left text-black w-full pl-2"
              >
                Confirm Password <span className="text-danger">*</span>
              </label>

              <input
                type={toggleCPassword?"text":"password"}
                name="confirm password"
                placeholder="Confirm Password"
                value={cPassword}
                onChange={(e) => {setCPassword(e.target.value); setCPasswordError('')}}
                className={`h-[50px] w-full ${
                  cPasswordError ? "border-danger" : "border-zinc-400"
                } rounded-[15px] border 00 text-black bg-white px-4 shadow focus:shadow-sm`}
              />
              <i className={`fa fa-eye hover:text-black text-gray-600 absolute right-3 top-10 cursor-pointer hover:scale-[1.2]`}  aria-hidden="true" onClick={()=>{setToggleCPassword(!toggleCPassword)}}></i>

              {cPasswordError && (
                <span className="text-red-500 text-sm w-full text-end">
                  {cPasswordError}
                </span>
              )}
            </div>
            <div className="w-3/4 flex items-center justify-center mt-5">
              <button
                disabled={isLoading}
                onClick={handleResetPassword}
                className="h-[60px] w-full flex justify-center items-center gap-2 rounded-[15px] bg-blue-600 text-xl text-white shadow"
              >
                {!isLoading ? (
                  <span>Reset Password</span>
                ) : (
                  <>
                    <span>Resetting...</span>{" "}
                    <Loader width={"w-4"} height={"h-4"} />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form className="w-full flex flex-col items-center justify-center gap-3">
            <div className=" w-3/4 items-center justify-start">
              <p className="font-medium text-green-700 text-center">
                Password Changed Successfully!
              </p>
              <p className="text-center text-black">
                Your password changed successfully. Now you can login using new password. {" "}
              </p>
            </div>
            <div className="w-3/4 flex items-center justify-center my-6">
              <button
                onClick={()=>{navigate('/')}}
                className="h-[60px] w-full flex justify-center items-center gap-2 rounded-[15px] bg-blue-600 text-xl text-white shadow"
              >
                Okay
              </button>
            </div>
          </form>
        )}
      </PopupModal>
    </>
  );
}

ResetPassword.propTypes = {
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default ResetPassword;
