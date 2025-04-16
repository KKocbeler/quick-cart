import { FaStar } from 'react-icons/fa';
import './Star.scss';

interface PropsType {
  size?: string;
  count: number;
  commentCount?: number
}

const Star: React.FC<PropsType> = ({ size = "", count = 2, commentCount }) => {
  const totalStars = 5;
  const filledStars = count;
  const emptyStars = totalStars - filledStars;
  
  return (
    <div className={`star ${size}`}>
      <div className="star-icons">
        {[...Array(filledStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {[...Array(emptyStars)].map((_, j) => (
          <FaStar key={j + filledStars} className="unlight" />
        ))}
      </div>
      <div className="comment-count">
        {size === "large" ? `(${commentCount} Reviews)` : `(${commentCount})`}
      </div>
    </div>
  );
};

export default Star;