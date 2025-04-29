import React, { ChangeEvent, Component, ContextType, FormEvent } from "react";
import "./templeLogin.css";
import "../App.css";
import { GlobalContext } from "../AuthenticateUser/HandleCommonVariables";
import { Navigate, NavigateFunction } from "react-router-dom";
import Routing from "../Router/Routing";
import {
  ApiRequestForTuckitAdminServerGET,
  ApiRequestForTuckitAdminServerPOST,
} from "../handleApi/HandleApiRequest";
import { stringify } from "querystring";

interface TempeLoginProps {
  // for handling the props
  // navigate: (path: string, { }) => void;
  navigate: NavigateFunction;
}

interface TempeLoginState {
  // for handling the state
  username: string;
  password: string;
  isLoading: boolean;
}

class TempeLogin extends React.Component<TempeLoginProps, TempeLoginState> {
  static contextType?: React.Context<any> | undefined = GlobalContext;
  context!: ContextType<typeof GlobalContext>;

  constructor(props: TempeLoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
    };
  }

  handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      isLoading: true,
    });

    const requestObject = {
      userName: this.state.username,
      userPassword: this.state.password,
      packetType: "TMPL-SUBADMIN",
    };

    const loginResponse = await ApiRequestForTuckitAdminServerPOST(
      "FetchUserLoginDetails",
      JSON.stringify(requestObject)
    )
      .then((resp) => resp.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("some error occured : " + err);
      });

    if (loginResponse) {
      if (loginResponse.userpresent) {
        if (loginResponse.responseCode === "TEMPLE_SUBADMIN" || "usr") {
          const resp = await ApiRequestForTuckitAdminServerGET(
            "CheckConnection",
            ""
          )
            .then((res) => res.json())
            .then((data) => {
              return data;
            })
            .catch((err) => console.log("err : " + err));

          if (resp && resp.status === 200) {
            const dispatch = this.context?.dispatch;

            if (dispatch) {
              dispatch({
                type: "SET_USER",
                payload: {
                  username: this.state.username,
                  userAccessType: "TEMPLE_SUBADMIN",
                },
              });

              localStorage.setItem("tuckitAdminUser", this.state.username);
              localStorage.setItem("tuckitAdminAccessType", "SUB_ADMIN");

              sessionStorage.setItem("tuckitAdminUser", this.state.username);
              sessionStorage.setItem("tuckitAdminAccessType", "SUB_ADMIN");
            }

            this.props.navigate(`/tuckit/${this.state.username}/sub-admin`, {
              replace: true,
            });
          } else {
            alert(" Temple server is inactive at the moment ")
          }
        } else {
          alert(`${this.state.username} is not registered as subadmin`);
        }
      } else {
        alert("User Does No Exist");
      }
      this.setState({
        ...this.state,
        isLoading: false,
      });
    } else {
      alert("Server Commincation Error, Please contact The Admin");
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }

    // if (this.state.username === userAuth.uName && this.state.password === userAuth.uPwd) {

    //     const dispatch = this.context?.dispatch;

    //     if (dispatch) {
    //         dispatch({ type: "SET_USER", payload: { username: this.state.username, userAccessType: "SUB-ADMIN" } })
    //         localStorage.setItem("tuckitAdminUser", this.state.username);
    //         localStorage.setItem("tuckitAdminAccessType", "SUB_ADMIN");
    //     }
    //     this.props.navigate(`/tuckit/${this.state.username}/sub-admin`, { replace: true })

    // } else {
    //     alert("please provide valid Details")
    // }
  };

  handleonInputChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      isLoading: this.state.isLoading && false,
    });
  }

  render() {
    const clickedOnSubmit: boolean = this.state.isLoading;

    return (
      <div className="tuckit-admin-panel">
        <div className="bg-imagefor-tuckit-login">
          <div className="temple-admin-login">
            <img
              src={process.env.PUBLIC_URL + "/images/logo_blue.png"}
              alt="*logo"
              className="login-logo-container"
            />
            <h1 className="login-header"> Tuckit Admin For Temple Lockers </h1>
            {/* <h1 className='login-header2'> Login</h1> */}
            <div className="login-form-container">
              <form action="" onSubmit={(e) => this.handleLogin(e)}>
                <label
                  htmlFor="name"
                  style={{ float: "left", color: "rgb(158, 36, 36)" }}
                >
                  user name :{" "}
                </label>{" "}
                <br />
                <input
                  className="login-input-style"
                  type="text"
                  name="username"
                  onChange={(e) => this.handleonInputChange(e)}
                  value={this.state.username}
                />
                <label
                  htmlFor="name"
                  style={{ float: "left", color: "rgb(158, 36, 36)" }}
                >
                  user password :{" "}
                </label>{" "}
                <br />
                <input
                  className="login-input-style"
                  type="password"
                  name="password"
                  onChange={(e) => this.handleonInputChange(e)}
                  value={this.state.password}
                />
                <button
                  className={`${
                    clickedOnSubmit
                      ? "login-form-submit-loading"
                      : "login-form-submit"
                  }`}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TempeLogin;
