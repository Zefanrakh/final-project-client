const Card = ({ user }) => {
  const { id, name, address, email, phone } = user;
  return (
    <div className="card-container">
      <div className="text-header id-text">{id}</div>
      <div className="text-header">{name}</div>
      <div className="text-header">{address}</div>
      <div className="text-header">{email}</div>
      <div className="text-header">{phone}</div>
    </div>
  );
};

export default Card;
