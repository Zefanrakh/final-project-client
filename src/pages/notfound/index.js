import { useParams } from "react-router-dom";
import "./styles.scss";

const NotFound = () => {
  console.log(useParams());
  return (
    <div className="not-found-container">
      <img src="http://res.cloudinary.com/dfh39qfib/image/upload/v1624929267/vsgfmtgdachh3olzromk.jpg" />
    </div>
  );
};

export default NotFound;
