import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import "./styles.scss";

const Payment = ({ query }) => {
  const [paymentMethod, setPaymentMethod] = useState("virtual account");
  const [bankType, setBankType] = useState("bri");
  const [payloadFromQuery, setPayloadFromQuery] = useState({});


  useEffect(() => {
    setPayloadFromQuery(jwt.verify(query.payment, "privateKey"));
  }, []);

  return (
    <div className="payment-container">
      <div className="payment-container__left">
        <div className="payment-method__container">
          <div className="text-title">Payment Method</div>
          <div className="choose-payment__container">
            <div
              className={`payment-method ${
                paymentMethod === "virtual account" && "active"
              }`}
              onClick={() => setPaymentMethod("virtual account")}
            >
              <i class="fas fa-credit-card icon"></i>
              Virtual Account
            </div>
            <div
              className={`payment-method ${
                paymentMethod === "cash" && "active"
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <i class="fas fa-money-bill icon"></i>
              Cash
            </div>
          </div>
        </div>
        {paymentMethod === "virtual account" && (
          <div className="payment-bank__container">
            <div className="text-title">Bank Payment - Virtual Account</div>
            <div className="bank-container">
              <div
                className="image-container"
                onClick={() => setBankType("bri")}
              >
                <div className={`${bankType === "bri" && "active"}`}></div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThs_6D8FMXlsGic93p9afuorvQpzJnW43Nk0r_tDIX3OSz9nXOPU91wK3j3H6JV2ilXtU&usqp=CAU" />
              </div>
              <div
                className="image-container"
                onClick={() => setBankType("mandiri")}
              >
                <div className={`${bankType === "mandiri" && "active"}`}></div>

                <img src="https://disk.mediaindonesia.com/thumbs/1800x1200/news/2019/07/e52dc4279bf7444577d65e9948473685.jpg" />
              </div>
              <div
                className="image-container"
                onClick={() => setBankType("bni")}
              >
                <div className={`${bankType === "bni" && "active"}`}></div>

                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDkEXt0Ek02m9Ja0hiN4GLx135MgC5J4P6bOR68N0cWi2Xu0wDSeAenDwRF1G9Bn7i-8&usqp=CAU" />
              </div>
              <div
                className="image-container"
                onClick={() => setBankType("permata")}
              >
                <div className={`${bankType === "permata" && "active"}`}></div>

                <img src="https://1.bp.blogspot.com/-tZkp5O70Rqo/XAJ7BwL9_lI/AAAAAAAAAZw/DGusJ0Y5XL84uKmWpnPJ0kQPOjabtqMTwCPcBGAYYCw/s1600/Lowongan%2BKerja%2BTerbaru%2BBank%2BPermata.png" />
              </div>
              <div
                className="image-container"
                onClick={() => setBankType("bca")}
              >
                <div className={`${bankType === "bca" && "active"}`}></div>

                <img src="https://kompaskerja.com/wp-content/uploads/2019/05/logo-bank-bca.jpg" />
              </div>
              <div
                className="image-container"
                onClick={() => setBankType("sampoerna")}
              >
                <div
                  className={`${bankType === "sampoerna" && "active"}`}
                ></div>

                <img src="https://kabarsumatera.com/wp-content/uploads/2013/05/bank-sampoerna.jpg" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="payment-container__right">
        <div className="checkout-container">
          <div className="text-title">Payment Information</div>

          <div className="text-container">
            <div className="text-subtitle">Created :</div>
            <div className="text">{new Date().toDateString()}</div>
          </div>
          {paymentMethod === "virtual account" ? (
            <div className="text-container">
              <div className="text-subtitle">Payment Method :</div>
              <div className="text">
                {paymentMethod} | {bankType}
              </div>
            </div>
          ) : (
            <div className="text-container">
              <div className="text-subtitle">Payment Method :</div>
              <div className="text">Cash</div>
            </div>
          )}

          <div className="strip-container">
            -----------------------------------------------
          </div>
          <div className="text-container">
            <div className="text-subtitle">Child Name :</div>
            <div className="text">{payloadFromQuery.childName}</div>
          </div>

          <div className="text-container">
            <div className="text-subtitle">Start Date :</div>
            <div className="text">{payloadFromQuery.startDate}</div>
          </div>
          <div className="text-container">
            <div className="text-subtitle">End Date :</div>
            <div className="text">{payloadFromQuery.endDate}</div>
          </div>
          <div className="text-container">
            <div className="text-subtitle">Package :</div>
            <div className="text">{payloadFromQuery.type}</div>
          </div>
          <div className="text-container">
            <div className="text-subtitle">Notes :</div>
            <div className="text">{payloadFromQuery.notes}</div>
          </div>
          <div className="strip-container">
            -----------------------------------------------
          </div>
          <div className="text-container">
            <div className="text-subtitle">Price :</div>
            <div className="text">Rp 500.000,00</div>
          </div>
          <div className="text-container">
            <div className="text-subtitle-bold">Total </div>
            <div className="text">Rp 500.000,00</div>
          </div>
          <button>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
