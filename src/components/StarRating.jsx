import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";

function StarRating({ rating, size = "text-base" }) {
  // Determine number of full stars by rounding down the rating value (e.g., 4.5 -> 4)
  const full = Math.floor(rating);
  // Show a half-star if the decimal remainder is 0.3 or higher
  const hasHalf = rating - full >= 0.3;
  // Compute remaining stars to fill the maximum scale of 5 stars
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Filled stars */}
      {Array.from({ length: full }, (_, i) => (
        <FaStar key={`full-${i}`} className={`text-yellow-500 ${size}`} />
      ))}

      {/* Half star (if applicable) */}
      {hasHalf && (
        <FaStarHalfAlt key="half" className={`text-yellow-500 ${size}`} />
      )}

      {/* Empty stars */}
      {Array.from({ length: empty }, (_, i) => (
        <FaRegStar
          key={`empty-${i}`}
          className={`text-yellow-500/40 ${size}`}
        />
      ))}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
};

export default StarRating;
