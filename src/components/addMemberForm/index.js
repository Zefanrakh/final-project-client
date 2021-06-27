import "./styles.scss";
import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addCustomerAction,fetchCustomerAction } from "../../store/action"

const AddMemberForm = ({ openPopUpHandler }) => {
  const [imageUrl, setImageUrl] = useState("");
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

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setNumber] = useState(0);
  const [error, setError] = useState('')
  const history = useHistory()

  const addCustomer = (event)=>{
    event.preventDefault();
    if(name === ''){
      setError('Please Input The Name')
    }else{
      dispatch(addCustomerAction({name,email,address,phoneNumber}))
      .then(response=>{response.json()})
      .then(customers=>{
          console.log(customers)
          dispatch(fetchCustomerAction())
          history.push('/customers')
      });
    }
  }


  return (
    <div className="overlay">
      <div class="add-member-container ">
        <div class="title">Add Member</div>
        <i class="fas fa-times icon-close" onClick={openPopUpHandler}></i>
        <form onSubmit={addCustomer}>
          <label>Name</label>
          <input onChange={(event)=> setName(event.target.value)} type="text" placeholder="Masukan Username" />
          <label>Email</label>
          <input onChange={(event)=> setEmail(event.target.value)}  type="email" placeholder="Masukan email" />
          <label>Address</label>
          <textarea onChange={(event)=> setAddress(event.target.value)} placeholder="Masukan address" />
          <label>Number</label>
          <input onChange={(event)=> setNumber(event.target.value)}  type="number" placeholder="Masukan No HP" />
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
