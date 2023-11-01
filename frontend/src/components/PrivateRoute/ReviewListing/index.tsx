import { Review } from 'types/review';
import './styles.css';

type Props = {
  reviews: Review[];
};

const ReviewListing = ({ reviews }: Props) => {
  return (
    <>
      <div>
        {reviews.map((review) => (
          <div key={review.id}>
            <div className='review-user'>
                {review.user.name}
            </div>
            <input className='review-text' type="text" value={review.text} readOnly disabled/>
           </div>
        ))}
      </div>
    </>
  );
};

export default ReviewListing;
