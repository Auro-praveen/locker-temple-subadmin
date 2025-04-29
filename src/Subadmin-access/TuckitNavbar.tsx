import React, { ContextType } from "react";
import { GlobalContext } from "../AuthenticateUser/HandleCommonVariables";
import { env } from "process";
import { Button } from "@mui/material";

interface TuckitNavbarProps {
  uName: string;
  uType: string;
  logoutHandler: () => void;
  locationIdHandler: () => void;
}

interface TuckitNavbarState {
  adminName: string;
  adminType: string;
}

class TuckitNavbar extends React.Component<
  TuckitNavbarProps,
  TuckitNavbarState
> {
  static contextType?: React.Context<any> | undefined = GlobalContext;
  context: ContextType<typeof GlobalContext>;

  constructor(props: TuckitNavbarProps) {
    super(props);
    this.state = {
      adminName: props.uName,
      adminType: props.uType,
    };
  }

  handleLogout = () => {
    this.props.logoutHandler();
  };

  render() {
    const { adminName, adminType } = this.state;

    const { locationIdHandler } = this.props;

    console.log(adminName);

    return (
      <div className="tuckit-navbar">
        <div className="tuckit-navbar-container">
          <div className="navbar-logo-container">
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/tuckit_transparent_cropped.png"
              }
              alt="logo"
              className="navbar-logo"
              onClick={() => locationIdHandler()}
            />
          </div>
          <div className="navbar-content-container">
            <h1
              style={{
                color: "#fc9744",
                margin: "5px",
                textTransform: "capitalize",
                fontSize: "20px",
              }}
            >
              {adminName}
            </h1>
            <button
              className="navbar-logout-btn"
              onClick={() => this.handleLogout()}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TuckitNavbar;
