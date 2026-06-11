import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";

function StarRating({ rating, size = "text-base" }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
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
