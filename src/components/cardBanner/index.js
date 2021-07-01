import "./styles.scss";

const CardBanner = ({ title, subTitle, image }) => {
  return (
    <div className="card-banner-container">
      <div className="title">{title}</div>
      <div className="sub-title">{subTitle}</div>
      <img
        className="image-container"
        src={
          image ||
          "https://www.apple.com/id/macbook-air/images/overview/macos__kp74urneu7u6_large_2x.png"
        }
      />
    </div>
  );
};

export default CardBanner;
