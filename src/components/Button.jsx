import PropTypes from "prop-types";

export function Button({ backgroundColor, text, onClick}) {
  return (
    <button onClick={onClick} className="btn" style={{ backgroundColor: backgroundColor }}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  backgroundColor: "steelblue",
};

Button.propTypes = {
  text: PropTypes.string,
  backgroundColor: PropTypes.string,
};
