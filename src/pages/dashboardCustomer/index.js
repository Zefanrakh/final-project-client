import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useScroll } from "react-scroll-hooks";
import { useSelector } from "react-redux";

import SideMenu from "../../components/sideMenu";
import Slider from "../../components/slider";
import "./styles.scss";

const DashboardCustomer = () => {
  const history = useHistory();
  const [active, setActive] = useState("home");
  const aboutRef = useRef();
  const homeRef = useRef();
  const featureRef = useRef();
  const pricingRef = useRef();
  const containerRef = useRef();
  const scrollSpeed = 50;
  const { scrollToElement } = useScroll({
    scrollSpeed,
    containerRef,
  });

  const user = useSelector(({ userReducer }) => userReducer.user);

  return (
    <div className="dashboard-container customer-dashboard">
      <SideMenu />
      <div className="main-container" ref={containerRef}>
        {user && (
          <div className="user-label__container">Hi {user.username}!</div>
        )}
        <Slider />

        <div className="main-container__body-1">
          <div className="header__container">
            <div
              className={`text-nav ${active === "home" && "active"}`}
              onClick={() => {
                setActive("home");
                scrollToElement(homeRef);
              }}
            >
              Main
            </div>
            <div
              className={`text-nav ${active === "about" && "active"}`}
              onClick={() => {
                setActive("about");
                scrollToElement(aboutRef);
              }}
            >
              About
            </div>
            <div
              className={`text-nav ${active === "feature" && "active"}`}
              onClick={() => {
                setActive("feature");
                scrollToElement(featureRef);
              }}
            >
              Feature
            </div>
            <div
              className={`text-nav ${active === "pricing" && "active"}`}
              onClick={() => {
                setActive("pricing");
                scrollToElement(pricingRef);
              }}
            >
              Pricing
            </div>
          </div>
          <div className="title-container">
            <div className="title">Online</div>
            <div className="title">
              Appointment system for Child Care Services
            </div>
            <div className="title-weight">
              DayCare, Live Monitoring, Nannies, Preschool, Nursery
            </div>
            <div className="relative">
              <div
                className="button"
                onClick={() => history.push("/appointment")}
              >
                <div></div> Appointment Now
                <i className="fas fa-chevron-right icon"></i>
              </div>
            </div>
          </div>
          <div className="about-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#0099ff"
                fillOpacity="1"
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
            <div className="about-us" ref={aboutRef}>
              <div className="title-section">About</div>
              <div className="text">
                Smart Daycare is a web daycare scheduling application focused on
                improving the experience of both customer and owner. Owner can
                avoid overbooking, and have a faster payment process. Smart
                Daycare allows customer to check in on their child anytime on
                the webcams by scanning the QR code provided upon dropping them
                off.
              </div>
            </div>
          </div>
          <div className="feature-container" ref={featureRef}>
            <div className="title-section__container">
              <div className="title-section">Feature</div>
            </div>
            <div className="feature-container__1">
              <div className="feature-container__text">
                <div className="feature-container__title">Easy Booking</div>
                <div className="feature-container__info">
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen boo
                </div>
              </div>
              <div className="feature-container__img">
                <img src="http://res.cloudinary.com/dfh39qfib/image/upload/v1625006907/oppicvuqck9jgvsdvu3u.png" />
              </div>
            </div>
            <div className="feature-container__2">
              <div className="feature-container__text">
                <div className="feature-container__title">
                  QR Code Technology
                </div>
                <div className="feature-container__info">
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen boo
                </div>
              </div>
              <div className="feature-container__img">
                <img src="https://www.tap2assist.me/images/Samsung-Hand.png" />
              </div>
            </div>
            <div className="feature-container__3">
              <div className="feature-container__text">
                <div className="feature-container__title">
                  CCTV Online Technology
                </div>
                <div className="feature-container__info">
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen boo
                </div>
              </div>
              <div className="feature-container__img">
                <img src="http://res.cloudinary.com/dfh39qfib/image/upload/v1625008635/imejfdd5gl2k4ddcxu9w.png" />
              </div>
            </div>
            <div className="feature-container__4">
              <div className="feature-container__text">
                <div className="feature-container__title">Easy Payment</div>
                <div className="feature-container__info">
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen boo
                </div>
              </div>
              <div className="feature-container__img">
                <img src="http://res.cloudinary.com/dfh39qfib/image/upload/v1625008926/hedltz17u63xolnillhv.png" />
              </div>
            </div>
          </div>
          <div className="pricing-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#f15c60"
                fillOpacity="1"
                d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,202.7C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              ></path>
            </svg>
            <div className="pricing-body" ref={pricingRef}>
              <div className="title-section">Pricing</div>
              <div className="pricing-content">
                <div className="label">For Infant:</div>

                <div className="price-item__container">
                  <div className="price">$50</div>
                  <div className="price-label">/Day</div>
                </div>
                <div className="price-item__container">
                  <div className="price">$280</div>
                  <div className="price-label">/Week</div>
                </div>
                <div className="price-item__container">
                  <div className="price">$1500</div>
                  <div className="price-label">/Month</div>
                </div>
              </div>
              <div className="pricing-content">
                <div className="label">For Toddler:</div>

                <div className="price-item__container">
                  <div className="price">$60</div>
                  <div className="price-label">/Day</div>
                </div>
                <div className="price-item__container">
                  <div className="price">$290</div>
                  <div className="price-label">/Week</div>
                </div>
                <div className="price-item__container">
                  <div className="price">$1800</div>
                  <div className="price-label">/Month</div>
                </div>
              </div>
            </div>
          </div>
          <img
            className="main-image"
            src="http://res.cloudinary.com/dfh39qfib/image/upload/v1624977750/ubtzd20ddvpovygsczmn.png"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomer;
