import "./styles.scss";
import { useState } from "react";

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

  return (
    <div className="overlay">
      <div class="add-member-container ">
        <div class="title">Add Member</div>
        <i class="fas fa-times icon-close" onClick={openPopUpHandler}></i>
        <form>
          <label>Name</label>
          <input type="text" placeholder="Masukan Username" />
          <label>Email</label>
          <input type="email" placeholder="Masukan email" />
          <label>Address</label>
          <textarea placeholder="Masukan address" />
          <label>Number</label>
          <input type="number" placeholder="Masukan No HP" />
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
