import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { useLayoutEffect } from "react";
import close from "../../assets/icons/close.png";
import "../../styles/SocialMedias/filtersp/filtersp.css";
import "../../styles/Responsive/MainResponsive.css";

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

export default function SocailModal({ data, index }) {
  const { image, profileImage, title } = data;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tabValue, setTabValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useLayoutEffect(() => {}, [data]);

  return (
    <div>
      <Button onClick={handleOpen}>
        <img src={image} alt="social media" height="26px" />
      </Button>
      <Modal
        aria-labelledby="transition-whole-modale"
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
          <Box sx={{ width: "100%", typography: "body1", style }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "balck" }}>
                <Typography id="transition-whole-modal" variant="subtitle">
                  <div className={`top-whole-title top-title-${title}`}>
                    <img src={image} alt="social`s" height="26px" />
                    <span style={{ fontWeight: "600", marginLeft: "5px" }}> {title} </span>
                  </div>
                  <img src={close} alt="close" onClick={handleClose} className={"close-btn"} />
                  <div className="Tab-Lables">
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      {typeof data.information["0"] === "object" &&
                        data.information === "object" &&
                        Object.keys(data.information).map((tab, index) => {
                          return <Tab key={index} label={`${tab}`} value={tab} />;
                        })}
                    </TabList>
                  </div>
                  <div className="modalimg">
                    <p className={"profileimg profile-image-modal"}>
                      <img src={profileImage} width="250px" alt={"Profile_Image"} />
                    </p>
                  </div>
                  <div className="whole-modal">
                    {Object.keys(data.information).map((key, index) => {
                      const currentObject = data.information[key];
                      return (
                        <TabPanel key={index} value={key} className="Data-show">
                          {currentObject &&
                            Object.keys(currentObject).map(
                              (info, i) =>
                                data["allowItems"].indexOf(info) !== -1 &&
                                currentObject[info] !== "None" &&
                                currentObject[info] !== "NULL" &&
                                currentObject[info] !== null && (
                                  <p key={i}>
                                    {" "}
                                    {`${info}`} : <span className="data-show-titile"> {currentObject[info]}</span>{" "}
                                  </p>
                                )
                            )}
                        </TabPanel>
                      );
                    })}
                  </div>
                </Typography>
              </Box>
            </TabContext>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
