import React from "react";
import {toast} from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const RequestHandler = (OriginalComponent, reqFunction) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loader: false,
        result: null,
      };
    }

    // request
    request = async (params) => {
      try {
        this.setState({
          loader: true,
        });

        await reqFunction(params)
          .then((response) => {
            this.setState({
              loader: false,
              result: response.data,
            });
            toast.success("Success", {
              duration: 1000000,
              position: "top-left",
            });
          })
          .catch((error) => {
            console.log(error.response);
            toast.error("Failed");
          });
      } catch (error) {
        console.log(error);
        toast.error("Failed");
      }
      this.setState({
        loader: false,
      });
    };
    render() {
      return <OriginalComponent request={this.request} loader={this.state.loader} data={this.state.result} />;
    }
  };
};


export default RequestHandler;
