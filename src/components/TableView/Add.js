import "../../styles/AddButton/Add.css";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import add from "../../assets/icons/applesms.png";
import test from "../../assets/icons/applesms.png";
import close from "../../assets/icons/close.png";
import { toast } from "react-hot-toast";
import { sendSmsReq } from "../../context/Action";
import { requestHandler } from "../../utils/index";

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

export default function AddNumber({ data, index, phoneNumbers }) {
  const phone = data["phone"];
  const image = data["images_image"];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = React.useState("");
  const [order_id, setOrder_id] = React.useState("");

  // const token = localStorage.getItem("token");

  function sendsms() {
    var sms = {
      phone: phoneNumbers,
      text: text,
      sender_id: order_id,
    };
    requestHandler(
      sendSmsReq,
      sms,
      null,
      "has sent",
      "did not send"
    ).then((response) => {
      console.log(response);
    });
  }

  return (
    <div>
      <Button onClick={handleOpen} className="sms-row-btn">
        <img src={add} alt="ts" height="34px" />
      </Button>
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
          <div id="transition-modal-title0" variant="body2">
            <div className={"top_title-sms"}>
              <img src={test} alt="ts" height="26px" />
              <span style={{ fontWeight: "600", marginLeft: "5px" }}>
                Send SMS
              </span>
            </div>
            <div className="modalimg-row">
              <p className={"profileimg-row profileimage-modal-row"}>
                <img src={image} width="250px" alt="" />
              </p>
            </div>
            <img
              src={close}
              alt="close"
              onClick={handleClose}
              className={"close-btn"}
            />

            <div className="whole_modal-sms-row">
              <div className="phone-row">
                <p className={"phonep"}>Phone Number:</p>
                <p className={"boxphone"}>{phone}</p>
              </div>
              <p className={"senderp-row"}>order Id : </p>
              <input
                type="text"
                value={order_id}
                onInput={(s) => setOrder_id(s.target.value)}
                maxLength={12}
                minLength={3}
                required
                className={"sendercss-row sendercss"}
              />
              <p className={"textep-row"} style={{ marginTop: "1rem" }}>
                Text Message :{" "}
              </p>
              <textarea
                type="text"
                value={text}
                onInput={(t) => setText(t.target.value)}
                maxLength={160}
                minLength={3}
                required
              />
              <button onClick={sendsms} className={"send-btn-row"}>
                Send
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
