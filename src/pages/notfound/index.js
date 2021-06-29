import { useLocation, useHistory } from "react-router-dom";
import "./styles.scss";
import { useEffect } from "react";
import queryString from "query-string";
import Swal from "sweetalert2";

const NotFound = () => {
  const { search } = useLocation();
  const history = useHistory();
  useEffect(() => {
    try {
      const parsed = queryString.parse(search);
      if (parsed.status) {
        Swal.fire({
          icon: "error",
          title: "Oops Forbidden!",
          showConfirmButton: true,
          confirmButtonAriaLabel: "Thumbs up, great!",
        }).then(() => {
          history.push("/");
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="not-found-container">
      <img src="http://res.cloudinary.com/dfh39qfib/image/upload/v1624929267/vsgfmtgdachh3olzromk.jpg" />
    </div>
  );
};

export default NotFound;
