import { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginReq } from "../../context/Action";
import { requestHandler } from "../../utils";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/spinner/spinner";
import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUseName] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const {
        state: { access_token },
        dispatch,
    } = useContext(AuthContext);

    useEffect(() => {
        if (access_token) {
            navigate("/");
        }
    }, [access_token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: userName,
            password: password,
        };

        try {
            setLoader(true);
            await loginReq(formData).then((response) => {
                const d = new Date();
                d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
                const cookieData = {
                    data: `access_token=${response.data.access_token}`,
                    expires: `expires=${d.toUTCString()}`,
                    path: "path=/",
                    SameSite: "SameSite=Strict",
                    Secure: "",
                    HttpOnly: "",
                };
                document.cookie = `${cookieData.data}; ${cookieData.expires}; ${cookieData.path}; ${cookieData.SameSite}; ${cookieData.Secure}; ${cookieData.HttpOnly};`;
                setLoader(false);
                dispatch({
                    type: "LOGIN",
                    payload: {
                        access_token: response.data.access_token,
                        user: userName,
                        level: response.data.level_management,
                    },
                });
                localStorage.setItem("level", response.data.level_management);
                localStorage.setItem("user", userName);
                navigate("/");
                toast.success(`Hello ${localStorage.getItem("user")} !`);
            });
        } catch (error) {
            // navigate("/");
            console.log(error);
            setLoader(false);
        }
    };

    return (
        <>
            <div className="containner">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login" onSubmit={handleSubmit}>
                            <div className="login__field">
                                <i className="login__icon fas fa-user" />
                                <input
                                    type="text"
                                    className="login__input"
                                    placeholder="User name"
                                    id="username"
                                    // ref={usernameRef}
                                    autoComplete="off"
                                    onChange={(e) => setUseName(e.target.value)}
                                    value={userName}
                                    required
                                />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock" />
                                <input
                                    type="password"
                                    id="password"
                                    className="login__input"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            <button className="login__submit login-button-down-fuck" type="submit">
                                {loader ? (
                                    <span className="button__text">
                                        <>Loading ...</>
                                    </span>
                                ) : (
                                    <span className="button__text">Log In</span>
                                )}
                                <i className="button__icon fas fa-chevron-right" />
                            </button>
                        </form>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4" />
                            <span className="screen__background__shape screen__background__shape3" />
                            <span className="screen__background__shape screen__background__shape2" />
                            <span className="screen__background__shape screen__background__shape1" />
                        </div>
                    </div>
                </div>
            </div>
            )
        </>
    );
};
export default Login;
