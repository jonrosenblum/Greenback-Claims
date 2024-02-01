import PropTypes from 'prop-types';

function Loader({ width, height }) {
    return (
        <div className="flex items-center justify-center">
            <div
                className={`${height} ${width} animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mt-1`}
                role="status">
               
            </div>
        </div>
    );
}

Loader.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  };

export default Loader;