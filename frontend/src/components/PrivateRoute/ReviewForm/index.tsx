import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import ButtonPersonalized from 'components/ButtonPersonalized';
import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);
    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        console.log('SUCESSO AO SALVAR', response);
      })
      .catch((error) => {
        console.log('ERRO AO SALVAR', error);
      });
  };

  return (
    <>
      <div className="base-card review-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('text', {
                required: 'Campo obrigatório',
              })}
              type="text"
              className={`form-control base-input review-input ${
                errors.text ? 'is-invalid' : ''
              }`}
              placeholder="Deixe sua avaliação aqui"
              name="text"
            />
            <div className="invalid-feedback d-block">
              {errors.text?.message}
            </div>
          </div>

          <div>{errors.text?.message}</div>
          <ButtonPersonalized text="Salvar Avaliação" cssButton='btn btn-primary review-button' cssContainer='btn-container btn-on-center'/>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
