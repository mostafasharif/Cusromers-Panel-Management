import "../../../styles/sidebar/export.css";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function Export(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  let rows_count = React.createRef();
  let format = React.createRef();
  function download_clicked() {
    console.log(props.value);
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <div className="Export">
          <button className="exportbtn ">Export</button>
        </div>
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
            <Typography id="transition-modal-title1" variant="body2">
              <div className="boxbtn">
                <Button variant="contained" color="success">
                  Success
                </Button>
                <select name="count" id="count" ref={rows_count}>
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
                <select name="format" id="format" ref={format}>
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
