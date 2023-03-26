import "../../../styles/sidebar/send.css";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import test from "../../../assets/icons/applesms.png";
import close from "../../../assets/icons/close.png";
import { sendSmsReq } from "../../../context/Action";
import { requestHandler } from "../../../utils/index";
import { RiMailSendFill } from "react-icons/ri";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SendsSms({ data, index, phoneNumbers, setPhoneNumbers }) {
  // const phone = data["" + index + "_phone"]
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [loader, setLoader] = useState(false);

  const [text, setText] = React.useState("");
  const [sender_id, setSender_id] = React.useState("");

  // const token = localStorage.getItem("token");

  function sendsmsforall() {
    var sms = {
      phone: phoneNumbers,
      text: text,
      sender_id: sender_id,
    };
    requestHandler(sendSmsReq, sms, null, "", "").then((response) => {
      console.log(response);
    });
  }

  return (
    <div>
      <button onClick={handleOpen} className="send-button-top">
        <div className="send-button-top-icon">
          <RiMailSendFill />
        </div>
        Send (Selected)
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* <Box sx={style}> */}
          <Typography id="transition-modal-title-selected" variant="subtitle">
            <div className={"top_title-selected"}>
              <img src={test} alt="ts" height="26px" />
              <div style={{ fontWeight: "600" }}>Send To Selected</div>
            </div>
            <img src={close} alt="close" onClick={handleClose} className={"close-btn"} />
            {/* <div className="modalimg">
              <p className={"profileimg"}></p>
            </div> */}
            <br />
            <div className="selected-sms-send">
              Selected Numbers :
              {phoneNumbers?.map((number, index) => (
                <p className="number-list" key={index}>
                  {number}
                </p>
              ))}
            </div>
            <div className="whole_modal-sms">
              <p className={"textep"}>Text Message : </p>
              <textarea type="text" className="textarea" value={text} onInput={(t) => setText(t.target.value)} maxLength={160} minLength={3} required />
              <p className={"senderp"}>id : </p>
              <input
                type="text"
                value={sender_id}
                onInput={(s) => setSender_id(s.target.value)}
                maxLength={12}
                minLength={3}
                required
                className={"sendercss"}
              />
              <div onClick={sendsmsforall} className={"send-btn"}>
                Send
              </div>
            </div>
            <div className="free-spaces"></div>
          </Typography>
          {/* </Box> */}
        </Fade>
      </Modal>
    </div>
  );
}
