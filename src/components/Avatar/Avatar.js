import React, { useState, useEffect } from "react";
import "../Home/Home.scss";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { connect } from "react-redux";
import { editUser } from "../../actions/actions";
import "./Avatar.css";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function Avatar(props) {
  const { user, editUser } = props;
  console.log("avatar",user.picture) 
  let [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    picture: "",
    user_name: ""
  });
  let [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);

  useEffect(() => {
    console.log(props);
    setUpdatedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      picture: user.picture
    });
  }, [props.user]);
  console.log(updatedUser);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenLogOut = () => {
    setOpenLogOut(true);
  };

  const handleCloseLogOut = () => {
    setOpenLogOut(false);
  };
  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
    console.log(updatedUser);
  };
  const uploadFile = (e) => {
    let formData = new FormData();
    formData.append("file", e[0]);
    formData.append("upload_preset", "zdtazmlq");
    setIsLoading(true);

    axios
      .post(`https://api.cloudinary.com/v1_1/di449masi/image/upload`, formData)
      .then((res) => {
        setIsLoading(false);

        setUpdatedUser({
          ...updatedUser,
          picture: res.data.url
        });
      });
  };
  const reset = (e) => {
    setUpdatedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      picture: user.picture
    });
    handleClose();
  };
  const submitEditUser = (e) => {
    e.preventDefault();
    editUser(updatedUser);
    handleClose();
  };
  const logOutBody = (
    <div style={modalStyle} className={classes.paper}>
      <h3>Are You sure you want to log out ?</h3>
      <div style={{"marginTop":"15px"}}>
      <button style={{"marginRight":"5px"}} onClick={() => {
        localStorage.clear()
        window.location.reload(false)
      }}>Yes</button>
      <button onClick={handleCloseLogOut}>No</button>
      </div>
    </div>
  );
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {isLoading ? (
        <div class="loader"></div>
      ) : (
        <form>
          <div style={{ display: "inline-flex" }}>
            First Name :
            <input
              onChange={(e) => handleChange(e)}
              value={updatedUser.first_name}
              name={"first_name"}
            />
          </div>
          <div style={{ display: "inline-flex" }}>
            Last Name :
            <input
              onChange={(e) => handleChange(e)}
              value={updatedUser.last_name}
              name={"last_name"}
            />
          </div>
          <div style={{ display: "inline-flex" }}>
            User name :
            <input
              onChange={(e) => handleChange(e)}
              value={updatedUser.user_name}
              name={"user_name"}
            />
          </div>
          {user.picture === updatedUser.picture ? (
            <input onChange={(e) => uploadFile(e.target.files)} type="file" />
          ) : (
            <p> Picture uploaded </p>
          )}
          <br />
          <button style={{ marginRight: "200px" }} onClick={reset}>
            Reset{" "}
          </button>
          <button onClick={(e) => submitEditUser(e)}>Submit </button>
        </form>
      )}
    </div>
  );
  return (
    <>
    <div style={{"display":"inline-flex"}}>
    <div className="icon-div">
   
      </div>
      <img
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50px",
        }}
        className="user-icon"
        
        src={user.picture ? props.user.picture : null}
      />
       <h3 className="nav-text" onClick={handleOpen}>Edit User </h3>
 <h3 className="nav-text" onClick={handleOpenLogOut}>Log Out </h3>
      </div>
     
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Modal
        open={openLogOut}
        onClose={handleCloseLogOut}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {logOutBody}
      </Modal>

    </>
  );
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (edit) => {
      dispatch(editUser(edit));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
