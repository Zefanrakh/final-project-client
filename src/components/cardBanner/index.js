import "./styles.scss";

const CardBanner = ({ title, subTitle, image }) => {
  return (
    <div className="card-banner-container">
      <div className="title">Hello Admin</div>
      <div className="sub-title">welcome in day care page</div>
      <img
        className="image-container"
        src="https://www.apple.com/id/macbook-air/images/overview/macos__kp74urneu7u6_large_2x.png"
      />
    </div>
  );
};

export default CardBanner;
