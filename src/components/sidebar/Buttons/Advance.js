import React from "react";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "../../../styles/sidebar/send.css";
import close from "../../../assets/icons/close.png";
import { GlobalContext } from "../../../context/GlobalContext";
import { downloadData } from "../../../context/Action";
import { sendSmsReq } from "../../../context/Action";
import { handleFilterResume, requestHandler } from "../../../utils/index";

import fileDownload from "js-file-download";

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

const Advance = ({ disabled , phoneNumbers}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [count, setCount] = useState(0);
  const handleClose = () => setOpen(false);
  const [text, setText] = React.useState("");
  const [sender_id, setSender_id] = React.useState("");
  let rows_count = React.createRef();
  let format = React.createRef();
  const [loader, setLoader] = useState(false);
  const { globalState } = useContext(GlobalContext);

  const [dataCount, setDataCount] = useState("100");
  const [dataType, setDataType] = useState("json");

  function sendmultiplesms() {
    var sms = {
      phone: phoneNumbers,
      text: text,
      sender_id: sender_id,
    };
    requestHandler(sendSmsReq, sms, null, "", "").then((response) => {
      console.log(response);
    });
  }

  function download_clicked() {
    const filter = globalState.filterData?.filter;
    const socialSelected = globalState.filterData?.socialSelected;
    const formObject = {
      type: "download",
      test: handleFilterResume(socialSelected),
      test: socialSelected["test"].value,
      test: filter["test"].value ? filter["test"].value : "-1",
      test: filter["test"].value ? filter["test"].value : "-1",
      test: filter["test"].value ? filter["test"].value : "-1",
      test: filter["test"].value ? filter["test"].value : "-1",
      test: filter["test"].value ? filter["test"].value : "-1",
      test: filter["test"].value ? filter["test"].value : "-1",
      test: dataCount,
      test: dataType,
    };
    const result = requestHandler(downloadData, formObject, setLoader).then((value) => {
      // console.log(value);
      if (!value.status) return false;
      fileDownload(value.data, "data.json");
    });
  }

  return (
    <div>
      <div>
        <Button disabled={disabled} onClick={handleOpen} className={`exportbtn ${disabled ? "disabled" : ""} `}>
          <div>Advance</div>
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
            <Box sx={style}>
              <img src={close} alt="close" onClick={handleClose} className={"close-btn"} />
              <hr />
              <br />
              <Typography variant="subtitle1">
                <>
                  <div>
                    <p className={"result-btn-advance"}>Result : {globalState.count}</p>
                  </div>
                </>
              </Typography>
              <br />
              <br />
              <hr />
              <Typography variant="subtitle1">
                <div className="box-button">
                  <select className={"formatbtn"} name="format" id="format" ref={format} onChange={(e) => setDataType(e.target.value)}>
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                  </select>
                  <select className={"boxbtn"} name="count" id="count" ref={rows_count} onChange={(e) => setDataCount(e.target.value)}>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="2000">2000</option>
                    <option value="3000">3000</option>
                    <option value="4000">4000</option>
                    <option value="5000">5000</option>
                  </select>
                  <button className={"downloadbtn"} onClick={() => download_clicked()}>
                    <p>Download</p>
                  </button>
                </div>
              </Typography>
              <hr />
              <p style={{ color: "gray" }}>Send To All</p>
              <br />
              <br />
              <div className="whole_modal-sms-advance">
                <p className={"senderpall"}>sms: </p>
                <input
                  type="text"
                  value={sender_id}
                  onInput={(s) => setSender_id(s.target.value)}
                  maxLength={12}
                  minLength={3}
                  required
                  className={"sendercssall"}
                />
                <p className={"textepall"}>Text Message : </p>
                <textarea
                  type="text"
                  className="text-area-style"
                  value={text}
                  onInput={(t) => setText(t.target.value)}
                  maxLength={160}
                  minLength={3}
                  required
                />
                <br />
                <button className={"send-btn"} onClick={sendmultiplesms}>
                  Send
                </button>
                <p id="message"></p>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Advance;
