import "./styles.scss";
const FloatingButton = ({ children, onClick }) => {
  return (
    <div className="button-container" onClick={onClick}>
      {children}
    </div>
  );
};

export default FloatingButton;
