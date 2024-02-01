import PropTypes from 'prop-types';

const FormError = ({type,message, onClose}) => {
    return (
        <div
    className={`${type == 'error'?'border-l-danger bg-danger/5 text-danger':type == 'success'?'border-l-green-700 bg-green-700/5 text-green-700':type == 'info'?'border-l-info bg-info/5 text-info':'border-l-warning bg-warning/5 text-warning'}text-md flex w-full items-center justify-between rounded-md border border-l-4 p-3 mb-4`}
  >
    <div className={`w-full max-w-[90%] text-sm break-words ${type == 'error'?'text-danger':type == 'success'?' text-green-700':type == 'info'?'text-info':'text-warning'}`}>
      { message }
    </div>
    <div>
        <i className={`fa fa-times cursor-pointer ${type == 'error'?'text-danger':type == 'success'?' text-green-700':type == 'info'?'text-info':'text-warning'}`} aria-hidden="true" onClick={onClose} ></i>
    </div>
  </div>
    );
}

FormError.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default FormError;
