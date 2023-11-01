import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import ReviewForm from 'components/PrivateRoute/ReviewForm';
import ReviewListing from 'components/PrivateRoute/ReviewListing';
import './styles.css';


type UrlParams = {
  movieId: string;
};

const MovieDetail = () => {
  const { movieId } = useParams<UrlParams>(); 

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  }

  return (
    <>
      <div className="container">
        <h1>Tela de detalhes do filme id: {movieId}</h1>

        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        )}

        <ReviewListing reviews={reviews} />
      </div>
    </>
  );
};

export default MovieDetail;
