import "./styles.scss";

const CardSlider = ({ data: { title, subTitle, image, style } }) => {
  return (
    <div className={`card-slider-container card-${style}`}>
      <div className="title">{title}</div>
      <div className="sub-title">{subTitle}</div>
      <img src={image}></img>
    </div>
  );
};

export default CardSlider;
