import './styles.css';

type Props = {
  text: string;
  cssContainer?: string;
  cssButton?: string;
};
const buttonPersonalized = ({ text, cssContainer, cssButton }: Props) => {
  const containerCSS = cssContainer ? cssContainer : 'btn-container';
  const buttonCSS = cssButton ? cssButton : 'btn btn-primary';
  return (
    <div className={containerCSS}>
      <button className={buttonCSS}>
        <h6>{text}</h6>
      </button>
    </div>
  );
};

export default buttonPersonalized;
