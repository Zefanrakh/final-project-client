import Slider from "react-slick";
import CardSlider from "../cardSlider";
const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 2,
  speed: 500,
  // autoplay: true,
  // autoplaySpeed: 3000,
  // cssEase: "linear",
};

const cardData = [
  {
    title: "Smart Day Care",
    subTitle: "where learninng begins",
    image:
      "https://www.transparentpng.com/thumb/kids/Dc1143-kids-boys-and-girls-hd-image.png",
    style: 1,
  },
  {
    title: "QR Code Technology",
    style: 2,
    subTitle: "Just Scan and Watch Your Kids",
    image: "https://www.tap2assist.me/images/Samsung-Hand.png",
  },
  {
    title: "Online Appointment",
    style: 3,
    subTitle: "fast to create an appointment",
    image:
      "http://res.cloudinary.com/dfh39qfib/image/upload/v1624977239/treljlrt2qn6f8f2yrtx.png",
  },
  {
    title: "Experienced Nannies",
    style: 4,
    subTitle: "Our nannies experienced more than 9 years",
    image:
      "http://res.cloudinary.com/dfh39qfib/image/upload/v1625012905/b403mizdxymahmk6rupz.png",
  },
  {
    title: "Easy Payment",
    style: 5,
    subTitle: "pay using virtual account ",
    image:
      "http://res.cloudinary.com/dfh39qfib/image/upload/v1625008926/hedltz17u63xolnillhv.png",
  },
];

const BannerSlider = () => {
  return (
    <Slider {...settings}>
      {cardData.map((data, idx) => {
        return <CardSlider data={data} key={idx} />;
      })}
    </Slider>
  );
};

export default BannerSlider;
