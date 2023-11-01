import './styles.css';

const MovieCatalog = () => {
  return (
    <>
      <div className="inner-page">
        <div className="page-title">
          <h1>Tela de listagem de filmes</h1>
        </div>
        <div className="list">
          <p>
            <a href="/movies/1">Acessar /movies/1</a>
          </p>
          <p>
            <a href="/movies/2">Acessar /movies/2</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieCatalog;
