import PropTypes from "prop-types";

function Card({ children }) {
  return (
    <div className="bg-white shadow-blur rounded-2xl py-5 sm:py-8">
      <div className="mx-auto px-6 lg:px-4">{children}</div>
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
