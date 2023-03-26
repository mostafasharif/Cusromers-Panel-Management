import React from "react";
import { useLayoutEffect, useState } from "react";
import Addbutton from "./Add";
import { useEffect } from "react";
import { useRef } from "react";
import SocailModal from "../filtermodal/filtermodal";
import Image from "../../assets/img/icons8-buying-96.png";
import { getLevel } from "../../utils";
import { BiMale } from "react-icons/bi";
import { FaFemale } from "react-icons/fa";
import "../../styles/main/index.css";
import ShowPIMG from "../TableView/ShowPIMG";

const TableViewRow = ({ data, index, phoneNumbers, setPhoneNumbers }) => {
  const [profileAvatar, setProfileAvatar] = useState();
  const resume_checker = data["resume"];
  const genderif =
    data["test"]["Gender"] === "male" || data["test"]["Gender"] === "man";
  const rowif = data["id"] === null || data["id"] === undefined;
  const emailif =
    data["Noodle"]["Noodle"] === null || data["Bacon"]["Bacon"] === undefined;
  const Hamburger = resume_checker[0] === "0";
  const Cheeseburger = resume_checker[1] === "0";
  const Muffin = resume_checker[2] === "0";
  const Sandwich = resume_checker[3] === "0";
  const Milkshake = resume_checker[4] === "0";
  const Taco = resume_checker[5] === "0";
  const Pancake = resume_checker[6] === "0";
  const Pizza = resume_checker[7] === "0";
  const Burrito = resume_checker[8] === "0";
  const Donuts = resume_checker[9] === "0";
  const rowRef = useRef();
  const level = getLevel();
  const [openPic, setOpenPic] = useState(false);

  const { image, profileImage, title } = data;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tabValue, setTabValue] = React.useState("0");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useLayoutEffect(() => {}, [data]);

  useEffect(() => {
    if (data["image"]) {
      if (data["image"]["personal_image"] !== "not found") {
        setProfileAvatar(data["image"]["personal_image"]);
      } else if (data["image"]["personal_image"] !== "not found") {
        setProfileAvatar(data["image"]["personal_image"]);
      } else if (data["image"]["personal_image"] !== "not found") {
        setProfileAvatar(data["image"]["personal_image"]);
      } else {
        setProfileAvatar(Image);
      }
    } else {
      setProfileAvatar(Image);
    }
  }, [data["image"]]);

  function rowbackground(e) {
    const parentRow = e.target.parentElement.parentElement;
    const phoneNubmer = parentRow.querySelector("[data-label=phone]").innerText;
    if (e.target.checked) {
      parentRow.classList.add("row-select");
      setPhoneNumbers((prev) => [...prev, phoneNubmer]);
    } else {
      const res = phoneNumbers.filter((item) => item !== phoneNubmer);
      setPhoneNumbers(res);
      parentRow.classList.remove("row-select");
    }
  }

  const RowCheckBoxRef = useRef();
  useEffect(() => {}, [RowCheckBoxRef.current]);

  const CategoryFilters = {
    address: {
      title: "",
      image: Image,
      profileImage: [Image],
      allowItems: ["street", "suite", "zipcode", "city"],
      information: data["address"]
        ? Object.keys(data["address"]).map((key) => {
            const infoObject = data["address"][key];
            return infoObject;
          })
        : "",
    },
  };
  const getAge = () => {
    try {
      const date = new Date();
      let userAge = 0;
      let userBirth = data["address"]["street"];
      if (userBirth) {
        let userBirthSplit = userBirth.split("-");
        // console.log(userBirth);
        let userDate = {
          year: parseInt(userBirthSplit[0]),
          month: parseInt(userBirthSplit[1]),
          day: parseInt(userBirthSplit[2]),
        };

        userAge = date.getFullYear() - userDate.year;
        return userAge;
      } else {
        return 0;
      }

      // calc now year month and day
    } catch (error) {
      return 0;
      // console.log(error);
    }
  };

  const showimagebig = (props) => {
    setOpenPic(true);
  };

  return (
    <>
        <tr>
          <td
            data-label="Account-profile"
            className={"profile-data-image position-relative"}
          >
            <img src={profileAvatar} alt="" onClick={showimagebig} />
          </td>
          {openPic && (
            <ShowPIMG
              open={openPic}
              setOpen={setOpenPic}
              profileAvatar={profileAvatar}
            />
          )}
          <td data-label="phone" className="phone-show">
            <i className="fa-solid fa-phone-flip" style={{ margin: "3px" }} />
            {data["phone"]}
          </td>
          <td data-label="name">
            <i
              className="fa-solid fa-user-tie"
              style={{ color: "black", margin: "0 10px" }}
            />
            {data["address"]["Fullname"]}
            <section className={"social-medias"}>
              {(level === 1 || level === 2) && emailif ? (
                <SocailModal data={CategoryFilters.address} index={index} />
              ) : (
                ""
              )}
              BiMale ? ( "" ) : (
              <SocailModal data={CategoryFilters.address} index={index} />)
              {Burrito ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Cheeseburger ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Donuts ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {FaFemale ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Hamburger ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Hamburger ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Milkshake ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Muffin ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
              {Pancake ? (
                ""
              ) : (
                <SocailModal data={CategoryFilters.address} index={index} />
              )}
            </section>
          </td>
          <td data-label="job-title">
            <i
              className="fa-solid fa-briefcase"
              style={{ color: "grey", margin: "0 10px" }}
            />
            {data["address"]["street"]}
            <br />
          </td>
          <td data-label="location">
            <i
              className="fa-solid fa-location-dot"
              style={{ color: "red", margin: "0 10px" }}
            />
            {data["address"]["street"]}
          </td>
          <td data-label="age">
            <i
              className="fa-solid fa-calendar"
              style={{ color: "blueviolet", margin: "0 10px" }}
            />
            {getAge()}
          </td>
          <td data-label="gender">
            {genderif ? (
              <div>
                <BiMale className="gender-icon-men" />
                Male
              </div>
            ) : (
              <div>
                <FaFemale className="gender-icon-female" />
                Female
              </div>
            )}
          </td>

          <td data-label="Period">
            <Addbutton data={data} index={index} phoneNumbers={phoneNumbers} />
          </td>
          <td>
            <input
              ref={RowCheckBoxRef}
              type="checkbox"
              className={"checkboxsms"}
              phone={data["phone"]}
              defaultValue={data.change}
              onChange={(e) => rowbackground(e)}
            />
          </td>
        </tr>
    </>
  );
};
export default TableViewRow;
