import React, { useEffect, useState, useContext } from "react";
import "../../styles/sidebar/sidebar.css";
import "../../styles/sidebar/track.css";
import "../../styles/sidebar/export.css";
import "../../styles/sidebar/tri-state-social.css";
import "../main/index";
import Advance from "./Buttons/Advance";
import SocialMediaFilter from "./Filter Category/Filters Category";
import Image from "../../assets/img/icons8-buying-96.png";
import InputText from "../form/InputText";
import InputSelect from "../form/InputSelect";
import out from "../../assets/icons/power-off.png";
import { GlobalContext } from "../../context/GlobalContext";
import { AuthContext } from "../../context/AuthContext";
import { logoutReq } from "../../context/Action";
import { getLevel, handleFilterResume, requestHandler } from "../../utils";
import { tableReq } from "../../context/Action";
import LoadingSpinner from "../../components/spinner/LoadingSpinnerresu/LoadingSpinnerresu";

const Sidebar = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { state, dispatch } = useContext(AuthContext);
  const { globalState, globalDispatch } = useContext(GlobalContext);

  const level = getLevel();

  const [isActiveAdvance, setIsActiveAdvanc] = useState(false);

  const [socialSelected, setSocialSelected] = useState({
    Hamburger: {
      title: "Hamburger",
      value: "_",
    },
    Cheeseburger: {
      title: "Cheeseburger",
      value: "_",
    },
    Sandwich: {
      title: "Sandwich",
      value: "_",
    },
    Milkshake: {
      title: "Milkshake",
      value: "_",
    },
    Muffin: {
      title: "Muffin",
      value: "_",
    },
    Pizaa: {
      title: "Pizza",
      value: "_",
    },
    Burrito: {
      title: "Burrito",
      value: "_",
    },
    Taco: {
      title: "Taco",
      value: "_",
    },
    Donuts: {
      title: "Donuts",
      value: "_",
    },
    Noodle: {
      title: "Noodle",
      value: "_",
    },
    Bacon: {
      title: "Bacon",
      value: "_",
    },
  });

  const [formData, setFormData] = useState({
    country: {
      title: "Category",
      value: "1",
      options: [
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
        { title: "Pizza", key: "Pizza" },
      ],
    },
    Hamburger: {
      title: "phone",
      value: "",
      placeholder: "Phone Number",
    },
    name: {
      title: "name",
      value: "",
      placeholder: "Name",
    },
    category: {
      title: "category",
      value: "",
      placeholder: "category",
    },
    location: {
      title: "location",
      value: "",
      placeholder: "location",
    },
    age: {
      title: "age",
      value: "",
      placeholder: "Age",
    },
    gender: {
      options: [
        { title: "Gender", key: "gender" },
        { title: "Male", key: "male" },
        { title: "Female", key: "Female" },
      ],
      title: "gender",
      value: "",
      placeholder: "Gender",
    },
  });

  const clearForm = () => {
    setSocialSelected({
      Hamburger: {
        title: "1",
        value: "_",
      },
      Cheeseburger: {
        title: "2",
        value: "_",
      },
      Fala: {
        title: "3",
        value: "_",
      },
      Sandwich: {
        title: "4",
        value: "_",
      },
      Milkshake: {
        title: "5",
        value: "_",
      },
      Donuts: {
        title: "6",
        value: "_",
      },
      Noodle: {
        title: "7",
        value: "_",
      },
      Bacon: {
        title: "8",
        value: "_",
      },
      Pizza: {
        title: "9",
        value: "_",
      },
      Taco: {
        title: "10",
        value: "_",
      },
      Burrito: {
        title: "11",
        value: "_",
      },
    });
    setFormData({
      country: {
        title: "country",
        value: "",
        options: [
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
          { title: "Pizza", key: "Pizza" },
        ],
      },
      phone: {
        title: "1",
        value: "",
        placeholder: "Phone Number",
      },
      name: {
        title: "2",
        value: "",
        placeholder: "Name",
      },
      jobTitle: {
        title: "3",
        value: "",
        placeholder: "JobTitle",
      },
      location: {
        title: "4",
        value: "",
        placeholder: "location",
      },
      age: {
        title: "5",
        value: "",
        placeholder: "Age",
      },
      gender: {
        options: [
          { title: "Gender", key: "gender" },
          { title: "Male", key: "male" },
          { title: "Female", key: "Female" },
        ],
        title: "gender",
        value: "",
        placeholder: "Gender",
      },
    });

    document
      .querySelectorAll(".icons .tri-state-toggle-buttontwo")
      .forEach((item) => {
        const isDefault = item.getAttribute("data-default");
        // console.log(isDefault);
        if (item.classList.contains("value-select") && !isDefault) {
          item.classList.remove("value-select");
        }
      });
  };

  const handleLogoutClick = () => {
    requestHandler(logoutReq, {}, setIsLoading).then(() => {
      // clear cookie
      dispatch({ type: "LOGOUT" });
    });
  };

  useEffect(() => {
    globalDispatch({
      type: "SET_FILTER",
      payload: { socialSelected: socialSelected, filter: formData },
    });
  }, [formData, socialSelected]);

  useEffect(() => {
    globalDispatch({
      type: "SET_FILTER",
      payload: { socialSelected: socialSelected, filter: formData },
    });
  }, []);

  const handleSubmit = () => {
    const formObject = {
      type: "table",
      resume_input: handleFilterResume(socialSelected),
      pagination: 10,
      page: globalState.tablePage,
      mobile: formData["phone"].value ? formData["phone"].value : "-1",
      gender: formData["gender"].value ? formData["gender"].value : "-1",
      name: formData["name"].value ? formData["name"].value : "-1",
      location: formData["location"].value ? formData["location"].value : "-1",
      job_title: formData["jobTitle"].value ? formData["jobTitle"].value : "-1",
      age: formData["age"].value ? formData["age"].value : -1,
    };
    requestHandler(tableReq, formObject, setIsLoading).then((value) => {
      setIsActiveAdvanc(true);
      globalDispatch({ type: "SET_LIST", payload: value.data });
      console.log("Started");

      globalDispatch({ type: "SET_COUNT", payload: null });
      formObject.type = "count";
      requestHandler(tableReq, formObject, setIsLoadingCount).then((value) => {
        // dispatch({type: "SET_COUNT", payload: response.data})
        // console.log(value.data.count);
        globalDispatch({ type: "SET_COUNT", payload: value.data.count });
      });
    });
  };


  return (
    <>
      <div className="whole-sidebar">
        <div className="boxx">
          <form className="sidebar">
            <InputSelect data={formData.category} setData={setFormData} />
            <InputText data={formData.phone} setData={setFormData} />
            <InputText data={formData.name} setData={setFormData} />
            <InputText data={formData.jobTitle} setData={setFormData} />
            <InputText data={formData.location} setData={setFormData} />
            <InputText data={formData.age} setData={setFormData} />
            <InputSelect data={formData.gender} setData={setFormData} />
          </form>
        </div>
        <div className="logos">
          <div className="icons" multiple={true}>
              <SocialMediaFilter
                data={socialSelected.Bacon}
                image={Image}
                setStatus={setSocialSelected}
              />
            <SocialMediaFilter
              data={socialSelected.Burrito}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Cheeseburger}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Donuts}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Hamburger}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Milkshake}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Muffin}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Noodle}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Pizaa}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Sandwich}
              image={Image}
              setStatus={setSocialSelected}
            />
            <SocialMediaFilter
              data={socialSelected.Taco}
              image={Image}
              setStatus={setSocialSelected}
            />
          </div>
        </div>
        <div className="bottom-btn">
          <div className="Clear" onClick={() => clearForm()}>
            <button className="clear" type="reset">
              Clear
            </button>
          </div>
          <div className="Result">
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button className="button" onClick={() => handleSubmit()}>
              Submit
            </button>
            {isLoading && (
              <>
                <div className="whole-spinner">
                  <LoadingSpinner />
                </div>
              </>
            )}
          </div>
        </div>
        <Advance disabled={!isActiveAdvance} />
        <div className="log-out">
          <img src={out} alt={"Log Out"} onClick={handleLogoutClick} />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
