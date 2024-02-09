import PropTypes from 'prop-types';

function Alert({message}) {
  return (
    <div className="rounded-md bg-blue-100/70 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
  )
}
Alert.propTypes = {
    message:PropTypes.string.isRequired,
  };
export default Alert