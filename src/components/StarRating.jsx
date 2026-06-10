import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";

function StarRating({ rating, size = "text-base" }) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;

  for (let i = 0; i < full; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className={`text-yellow-500 ${size}`} />,
    );
  }
  if (hasHalf) {
    stars.push(
      <FaStarHalfAlt key="half" className={`text-yellow-500 ${size}`} />,
    );
  }
  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(
      <FaRegStar key={`empty-${i}`} className={`text-yellow-500/40 ${size}`} />,
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
};

export default StarRating;
