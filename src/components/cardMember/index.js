import { deleteCustomer } from "../../store/action";
import { useDispatch } from "react-redux";
const Card = ({ user }) => {
  const dispatch = useDispatch();
  const { id, name, address, email, phoneNumber } = user;
  return (
    <div className="card-container">
      <div className="text-header id-text">{id}</div>
      <div className="text-header">{name}</div>
      <div className="text-header">{address}</div>
      <div className="text-header">{email}</div>
      <div className="text-header">{phoneNumber}</div>
      {/* <div onClick={() => dispatch(deleteCustomer(id))}>
        <i class="fas fa-trash-alt icon-delete"></i>
      </div> */}
    </div>
  );
};

export default Card;
