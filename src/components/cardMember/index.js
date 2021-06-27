const Card = ({ customer }) => {
  const { id, name, address, email, phoneNumber } = customer;
  return (
    <div className="card-container">
      <div className="text-header id-text">{id}</div>
      <div className="text-header">{name}</div>
      <div className="text-header">{address}</div>
      <div className="text-header">{email}</div>
      <div className="text-header">{phoneNumber}</div>
    </div>
  );
};

export default Card;
