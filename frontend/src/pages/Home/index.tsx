import { AuthContext } from 'AuthContext';
import { ReactComponent as MainImage } from 'assets/images/home-image.svg';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { getTokenData } from 'util/auth';
import history from 'util/history';
import { requestBackendLogin } from 'util/requests';
import { saveAuthData } from 'util/storage';
import ButtonPersonalized from 'components/ButtonPersonalized';
import './styles.css';

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const Home = () => {
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO', error);
      });
  };

  const { setAuthContextData } = useContext(AuthContext);

  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/movies' } };

  return (
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-image-container">
          <h1>Avalie Filmes</h1>
          <p>Diga o que você achou do seu filme favorito</p>
          <MainImage />
        </div>
        <div className="home-content-container">
          <h1>LOGIN</h1>
          {hasError && (
            <div className="alert alert-danger error-message">
              Erro ao tentar efetuar o login
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                {...register('username', {
                  required: 'Campo obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                type="text"
                className={`form-control base-input login-input ${
                  errors.username ? 'is-invalid' : ''
                }`}
                placeholder="Email"
                name="username"
              />
              <div className="invalid-feedback d-block">
                {errors.username?.message}
              </div>
            </div>
            <div className="mb-2">
              <input
                {...register('password', {
                  required: 'Campo obrigatório',
                })}
                type="password"
                className={`form-control base-input login-input ${
                  errors.password ? 'is-invalid' : ''
                }`}
                placeholder="Senha"
                name="password"
              />
              <div className="invalid-feedback d-block">
                {errors.password?.message}
              </div>
            </div>
            <div className="login-submit">
              <ButtonPersonalized text="Fazer login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
