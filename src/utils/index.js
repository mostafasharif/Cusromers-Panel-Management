import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
// convert timestamp to date & time.
// example return: 2022-08-17, 14:43:47
export const convertTimestamp = (timestamp, mode) => {
  if (timestamp === 0) {
    return "-";
  } else {
    const date = new Date(timestamp * 1000);

    if (mode === "date") {
      return date.toLocaleString("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    } else if (mode === "time") {
      return date.toLocaleString("en-CA", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h24",
      });
    } else {
      return date.toLocaleString("en-CA", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h24",
      });
    }
  }
};

// convert timestamp to timer
// example return: {"days":0,"hours":36,"minutes":6,"seconds":40}

export const calcTime = (timestamp, mode) => {
  let days = 0;
  let hours = Math.floor(timestamp / (60 * 60));
  let minutes = Math.floor((timestamp % (60 * 60)) / 60);
  let seconds = Math.floor(timestamp % 60);

  if (mode === "day") {
    days = Math.floor(timestamp / (60 * 60 * 24));
    hours = Math.floor((timestamp % (60 * 60 * 24)) / (60 * 60));
  }

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

// copy to clipboard
export const copyToClipboard = (text) => {
  try {
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("Successfully!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  } catch {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    toast.success("Successfully Copied!", {
      duration: 1000,
      position: "bottom-left",
    });
  }
};

// form validation function
export const validation = (formObject) => {
  for (const key in formObject) {
    // get item from form object
    const item = formObject[key];

    try {
      // check item is required
      const isRequired = item.required;
      if (isRequired) {
        // check if data is list or string and check it length
        if ((typeof item.value === "object" && !item.value.length) || (typeof item.value === "string" && !item.value.length)) {
          toast(item.msgError, {
            icon: "⚠️",
          });
          return false;
        }
        // check if data is number and check it value
        else if (typeof item.value === "number" && item.value <= 0) {
          toast(item.msgError, {
            icon: "⚠️",
          });
          return false;
        }
      }
    } catch (error) {
      toast.error("Somthing wrong!");
    }
  }

  // return true if every thing is ok
  return true;
};

export const getAccessToken = () => {
  return document.cookie.split("=")[1];
};
export const getLevel = () => {
  return parseInt(window.localStorage.getItem("level")) || 3;
};

export const prepareFormObject = (formData) => {
  let formObject = {};
  Object.keys(formData).forEach((key, index) => {
    // const value = ;
    formObject[key] = formData[key].value;
  });

  return formObject;
};

export const requestHandler = async (reqFunction, data, setLoader, thenMessage, catchMessage) => {
  try {
    let result = {
      status: false,
      data: null,
    };
    if (setLoader) setLoader(true);
    await reqFunction(data)
      .then((response) => {
        if (thenMessage) toast.success(thenMessage);
        if (setLoader) setLoader(false);

        result = {
          status: true,
          data: response.data,
        };
      })
      .catch((error) => {
        if (catchMessage) toast.error(catchMessage);
        if (setLoader) setLoader(false);
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////

export const handleFilterResume = (socialSelected) => {
  let result = "";
  const list_keys = Object.keys(socialSelected);
  for (let index = 0; index < list_keys.length; index++) {
    const key = list_keys[index];
    if (key === "") {
      continue;
    }
    result += socialSelected[key].value ? socialSelected[key].value : "";
  }
  return result;
};
