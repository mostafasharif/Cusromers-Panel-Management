import { useRef } from "react";
import { useState } from "react";
import "../../styles/main/index.css";
import TableViewRow from "./TableViewRow";
import { pink } from "@mui/material/colors";
import Send from "../sidebar/Filters/sends";
import LoadingSpinner from "../spinner/spinner";
import Count from "../sidebar/count/count";
import { Divide as Hamburger } from "hamburger-react";
import { getLevel, requestHandler } from "../../utils";
import { tableReq } from "../../context/Action";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalContext";
import ScrollToTop from "react-scroll-to-top";
import { ImPrevious2 } from "react-icons/im";
import { ImNext2 } from "react-icons/im";
import { FaFirstdraft } from "react-icons/fa";
import { useEffect } from "react";

const TableView = (data, index) => {
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mainTableRef = useRef();
  const [pageNumber, setPagenumber] = useState(1);
  const [isLoadingresu, setIsLoadingresu] = useState(false);
  const [count, setCount] = useState(0);
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const { globalState, globalDispatch } = useContext(GlobalContext);

  const [contentList, setContentList] = useState([]);

  function selectAll(status) {
    // console.log(typeof status, status);
    const tableEl = mainTableRef.current;
    const allCheckboxes = tableEl?.querySelectorAll("input[type=checkbox]");
    const allRows = document.querySelectorAll("tbody tr");
    const allPhoneNumbers = document.querySelectorAll("[data-label=phone]");
    // console.log(allPhoneNumbers);
    allCheckboxes.forEach((checkbox, index) => {
      if (status) {
        checkbox.checked = true;
        allRows[index]?.classList.add("row-select");
        setPhoneNumbers((prev) => [...prev, allPhoneNumbers[index]?.innerText]);
      } else {
        checkbox.checked = false;
        allRows[index]?.classList.remove("row-select");
        setPhoneNumbers([]);
      }
    });
  }

  function goNext() {
    setPagenumber((prev) => prev + 1);
  }

  function goPrev() {
    if (pageNumber === 1) {
      return 0;
    }
    setPagenumber((prev) => prev - 1);
  }
  function goFirst() {
    setPagenumber(1);
  }

  const getData = (params) => {
    setIsLoadingresu(true);
    requestHandler(tableReq, params, setLoader).then((value) => {
      // console.log(value.data);
      setContentList(value.data);
      setIsLoadingresu(false);
    });
  };

  function sidebar() {
    const sidebarResponsive = document.querySelector(".whole-sidebar");
    const status = sidebarResponsive.getAttribute("data-toggle");
    if (!status || status === "close") {
      sidebarResponsive.classList.add("whole-sidebar-open");
      sidebarResponsive.setAttribute("data-toggle", "open");
    } else {
      sidebarResponsive.classList.remove("whole-sidebar-open");
      sidebarResponsive.setAttribute("data-toggle", "close");
    }
  }

  useEffect(() => {
    setContentList(globalState.dataList);
  }, [globalState.dataList]);

  useEffect(() => {
    setTimeout(() => {
      if (contentList.length) {
        selectAll(false);
      }
    }, 10);
  }, [contentList]);

  const { state } = useContext(AuthContext);
  const level = getLevel();

  return (
    <>
      <div className="whole-burger" onClick={sidebar}>
        <div className="burger-menu">
          <Hamburger />
        </div>
      </div>
      <Count isLoad={isLoadingresu} />
      <div>
        <div className="npbtn">
          {level === 1 && <Send data={data} index={index} phoneNumbers={phoneNumbers} />}
          <button className={"previous-btn"} onClick={goPrev}>
            <ImPrevious2 /> Previous
          </button>
          <button className={"next-btn"} onClick={goNext}>
            Next <ImNext2 />
          </button>
          <button className={"next-btn"} onClick={goFirst}>
            <FaFirstdraft /> First Page
          </button>
          <input type={"checkbox"} className={"small-checkbox checkboxsms"} onChange={(e) => selectAll(e.currentTarget.checked)} />
        </div>
      </div>
      {loader ? (
        <LoadingSpinner />
      ) : (
        <table className={"rounded-3"} ref={mainTableRef}>
          <thead>
            <tr>
              <th scope="col">Profile</th>
              <th scope="col">Phone</th>
              <th scope="col">Name </th>
              <th scope="col">Order Title</th>
              <th scope="col">location</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              {level === 1 && <th scope="col">SMS</th>}
              {level === 1 && (
                <th scope="col">
                  <input type={"checkbox"} onChange={(e) => selectAll(e.currentTarget.checked)} sx={{ color: pink[800] }} className="checkboxsms" />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {contentList && contentList.length ? (
              contentList?.map((row, index ) => {
                return <TableViewRow phoneNumbers={phoneNumbers} setPhoneNumbers={setPhoneNumbers} data={row.data} index={index} key={index}/>;
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      )}
      <ScrollToTop
        smooth
        color="#FAFAFA"
        style={{
          right: "50%",
          left: "50%",
          bottom: "0",
          borderRadius: "50%",
          backgroundColor: "gray",
        }}
      />
    </>
  );
};
export default TableView;
