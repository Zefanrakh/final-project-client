import "./styles.scss";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { addCustomer, fetchCustomer } from "../../store/action"

const AddMemberForm = ({ openPopUpHandler }) => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState("");
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  function openUploadModal() {
    window.cloudinary
      .openUploadWidget(
        {
          cloud_name: "dfh39qfib",
          upload_preset: "rwfxz7rj",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setImageUrl(result.info.url);
          }
        }
      )
      .open();
  }

  const saveDataCustomer = (e) => {
    e.preventDefault()
    console.log(inputForm);
    dispatch(addCustomer(inputForm))
    .then( ({data}) => {
      dispatch(fetchCustomer())
      openPopUpHandler()
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <div className="overlay">
      <div class="add-member-container ">
        <div class="title">Add Member</div>
        <i class="fas fa-times icon-close" onClick={openPopUpHandler}></i>
        <form onSubmit={saveDataCustomer}>
          <label>Name</label>
          <input type="text" placeholder="Masukan Nama" onChange={(e) => setInputForm({...inputForm, name: e.target.value})} />
          <label>Email</label>
          <input type="email" placeholder="Masukan email" onChange={(e) => setInputForm({...inputForm, email: e.target.value})}/>
          <label>Address</label>
          <textarea placeholder="Masukan address" onChange={(e) => setInputForm({...inputForm, address: e.target.value})}/>
          <label>Number</label>
          <input type="number" placeholder="Masukan No HP" onChange={(e) => setInputForm({...inputForm, phoneNumber: e.target.value})}/>
          {/* <label>Image</label> */}
          {/* <div className="image-container">
            {imageUrl && (
              <img alt="profile" src={imageUrl} className="image-profile" />
            )}
            <button
              type="button"
              class="button-upload"
              onClick={openUploadModal}
            >
              {imageUrl ? <i class="fas fa-redo icon-redo"></i> : "+"}
            </button>
          </div> */}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
