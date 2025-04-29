import React, { Component, ContextType } from "react";
import { GlobalContext } from "../AuthenticateUser/HandleCommonVariables";
import "./subadminStyle.css";
import TuckitNavbar from "./TuckitNavbar";
import UserInputFormToAdmin from "./UserInputFormToAdmin";
import {
  Navigate,
  NavigateFunction,
  replace,
  useParams,
} from "react-router-dom";
import VerifyInputData from "./VerifyInputData";
import {
  ApiRequestForHandlingLogs,
  ApiRequestForTuckitAdminServerGET,
  ApiRequestForTuckitAdminServerPOST,
  HandleApiRequestForServerPost,
} from "../handleApi/HandleApiRequest";

interface SubadminAccessProps {
  // paramPassedName: string
  navigate: NavigateFunction;
  urlPathName?: string;
}

interface SubadminAccessState {
  adminName: string;
  adminType: string;
  isFormSubmitted: boolean;
  inputObjectFromForm: any;
  lockerUserAuthDataFromServer: any;
  terminalIDs: any;
  locationIDS: any;
}

class SubadminAccess extends React.Component<
  SubadminAccessProps,
  SubadminAccessState
> {
  static contextType?: React.Context<any> | undefined = GlobalContext;
  context: ContextType<typeof GlobalContext>;

  constructor(props: SubadminAccessProps) {
    super(props);
    this.state = {
      adminName: "",
      adminType: "",
      isFormSubmitted: false,
      inputObjectFromForm: {},
      lockerUserAuthDataFromServer: {},
      terminalIDs: [],
      locationIDS: [],
    };
  }

  componentDidMount(): void {
    const uName = this.context?.state.user.username;
    const uAccessType = this.context?.state.user.userAccessType;

    console.log(
      "called here again again again inside subadmin access " + uName
    );

    console.log("props : " + this.props.urlPathName);

    if (uName && uAccessType && uName === this.props.urlPathName) {
      // console.log("called here again again again " + uName);

      this.setState({
        ...this.state,
        adminName: uName.toString(),
        adminType: uAccessType.toString(),
      });

      this.getLocationIds();
      // this.handleUserInputEntry({packetType : "ACTIVE_TEMPLE"});
    } else {
      const localStarageName = sessionStorage.getItem("tuckitAdminUser");
      const localAccessType = sessionStorage.getItem("tuckitAdminAccessType");

      console.log(
        "called here again again again asdfasdf asdf  in else else" +
          localStarageName
      );

      if (
        localStarageName &&
        localAccessType &&
        localStarageName === this.props.urlPathName
      ) {
        const dispatch = this.context?.dispatch;

        this.setState({
          ...this.state,
          adminName: localStarageName.toString(),
          adminType: localAccessType.toString(),
        });
        if (dispatch) {
          dispatch({
            type: "SET_USER",
            payload: {
              username: localStarageName,
              userAccessType: localAccessType,
            },
          });
        }

        this.getLocationIds();
        // this.handleUserInputEntry({packetType : "ACTIVE_TEMPLE"});
      } else {
        console.log("re-login handler here");

        this.reLoginRender();
      }
    }
  }

  getLocationIds = async () => {
    const reqType = "locId";
    const serverResponse = await ApiRequestForTuckitAdminServerGET(
      "TransactionDetailsOperations",
      `type=${reqType}`
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log("some error occured : " + err);
      });

    if (serverResponse) {
      if (serverResponse.responsecode === "status-200") {
        this.setState({
          ...this.state,
          locationIDS: serverResponse.lockId,
          terminalIDs: [],
        });

        if (serverResponse.lockId.length > 0) {
          this.getTerminalIds(serverResponse.lockId[0]);
        }
      } else if (serverResponse.responsecode === "status-500") {
        this.setState({
          ...this.state,
          locationIDS: [],
          terminalIDs: [],
        });
      } else if (serverResponse.responsecode === "status-404") {
        this.setState({
          ...this.state,
          locationIDS: [],
          terminalIDs: [],
        });
      } else {
        alert("Something went wrong");
        this.setState({
          ...this.state,
          locationIDS: [],
          terminalIDs: [],
        });
      }
    } else {
      alert("Server Communication Error");
      this.setState({
        ...this.state,
        locationIDS: [],
        terminalIDs: [],
      });
    }
  };

  getTerminalIds = async (termIdType: string) => {
    const reqType = "termId";

    const serverResponse = await ApiRequestForTuckitAdminServerGET(
      "TransactionDetailsOperations",
      `type=${reqType}&&locationID=${termIdType}`
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log("some error occured : " + err);
      });

    if (serverResponse) {
      if (serverResponse.responsecode === "status-200") {
        this.setState({
          ...this.state,
          terminalIDs: serverResponse.lockId,
        });
      } else if (serverResponse.responsecode === "status-500") {
        this.setState({
          ...this.state,
          terminalIDs: [],
        });
      } else if (serverResponse.responsecode === "status-404") {
        this.setState({
          ...this.state,
          terminalIDs: [],
        });
      } else {
        alert("Something went wrong");
        this.setState({
          ...this.state,
          terminalIDs: [],
        });
      }
    } else {
      alert("server Response Error");
      this.setState({
        ...this.state,
        terminalIDs: [],
      });
    }
  };

  reLoginRender = (): void => {
    const dispatch = this.context?.dispatch;
    // console.log("user removed");

    if (dispatch) {
      dispatch({
        type: "SET_USER",
        payload: { username: "", userAccessType: "" },
      });
    }

    sessionStorage.removeItem("tuckitAdminUser");
    sessionStorage.removeItem("tuckitAdminAccessType");

    console.log(this.state.adminName);

    if (
      this.state.adminName !== "" &&
      this.state.adminName !== this.props.urlPathName
    ) {
      this.props.navigate("/wrong-url-name", { replace: true });
    } else {
      this.props.navigate("/login", { replace: true });
    }
  };

  handleUserInputEntry = async (inputData: any) => {
    // console.log("===========");
    console.log(inputData);

    const serverResponse = await ApiRequestForTuckitAdminServerPOST(
      "FetchFetmpleDataToSubAdmin",
      JSON.stringify(inputData)
    )
      .then((resp) => resp.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("some error occured : " + err);
      });

    if (serverResponse) {
      if (serverResponse.responseCode === "status-200") {
        this.setState({
          ...this.state,
          isFormSubmitted: true,
          inputObjectFromForm: { ...inputData },
          lockerUserAuthDataFromServer: {
            MobileNo: serverResponse.MobileNo,
            LOCKNO: serverResponse.LOCKNO,
            terminalID: serverResponse.terminalID,
            DOB: serverResponse.DOB,
            img: serverResponse.img,
          },
        });

        return true;
      } else if (serverResponse.responseCode === "status-404") {
        alert("No Data Present For This mobileNo");

        return false;
      } else if (serverResponse.responseCode === "status-500") {
        alert("Server Communication Error");
        return false;
      }
    } else {
      alert("server commincation occured, Please Contact The Admin");
      return false;
    }
  };

  // for handlling manual override
  handlingManualOverrideLockOpen = async (
    manualOverrideObject: any
  ): Promise<any> => {
    delete manualOverrideObject.img;

    const resp = await HandleApiRequestForServerPost(
      JSON.stringify({
        ...manualOverrideObject,
        reason: "Temple Subadmin Release",
        remarks: "Lock Open",
        ReqType: "Retrieve", //Store
        TransType: "Internet",
        PacketType: "manovrlocopen",
      })
    )
      .then((data) => data.json())
      .catch((err) => {
        console.log("manual overrride error : " + err);
      });

    if (resp) {
      if (resp.responseCode === "REQAC-200") {
        const logObject = {
          eventType: "SUBADMIN-TEMPLE-MAN_OPEN",
          username: this.state.adminName,
          remarks: `Locker No : ${this.state.lockerUserAuthDataFromServer.LOCKNO} From TerminalID : ${this.state.lockerUserAuthDataFromServer.terminalID} For MobileNO : ${this.state.lockerUserAuthDataFromServer.MobileNo} Has Been Successfully Opened`,
        };
        this.storeLogsToTheServer(logObject);
        return true;
      } else if (resp.resposeCode === "REQF-201") {
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // for Locker Open Request To The Server
  // handleOpenLockerFromDevice = async (verifyData: Object): Promise<string> => {
  //     const lockOpenObjectResp = await HandleApiRequestForServerPost(verifyData.toString())
  //         .then((resp) => {
  //             return resp.json()
  //         })
  //         .catch((err) => {
  //             console.log("Error : " + err);

  //         })

  //     if (lockOpenObjectResp) {
  //         if (lockOpenObjectResp.status === "status-200") {
  //             // store the log here

  //             const logObject = {
  //                 eventType: "SUBADMIN-TEMPLE-LOCKOPEN",
  //                 username: this.state.adminName,
  //                 remarks: `Locker No : ${this.state.lockerUserAuthDataFromServer.lockerNo}
  //                         From TerminalID : ${this.state.lockerUserAuthDataFromServer.terminalId} For MobileNO : ${this.state.lockerUserAuthDataFromServer.mobileNo}
  //                         Has Been Successfully Opened`
  //             }
  //             this.storeLogsToTheServer(logObject)
  //             return "status-200"
  //         } else {
  //             return "status-404";
  //         }
  //     } else {
  //         return "status-404";
  //     }
  // }

  // for storing the logs of the user
  storeLogsToTheServer = async (logObject: Object) => {
    ApiRequestForHandlingLogs({
      ...logObject,
      timeInMil: new Date().getTime(),
    });
  };

  handleCloseOpeLockerWindow = (): void => {
    this.setState({
      ...this.state,
      isFormSubmitted: false,
    });
  };

  render() {
    const { adminName, adminType, isFormSubmitted } = this.state;
    const { urlPathName } = this.props;
    const { lockerUserAuthDataFromServer } = this.state;

    // console.log(lockerUserAuthDataFromServer);

    if (urlPathName !== adminName) {
      // return <Navigate to={"/login"} replace={true} />;
      return null;
    }

    // console.log("subadmin rendering called first first ::");

    return (
      <div className="tuckit-admin-panel">
        {adminName && (
          <TuckitNavbar
            uName={adminName}
            uType={adminType}
            logoutHandler={this.reLoginRender}
            locationIdHandler={this.getLocationIds}
          />
        )}
        <div className="subadmin-panel">
          <h1 className="page-title">Admin Access For Temple Lockers</h1>
          {isFormSubmitted ? (
            <VerifyInputData
              userAuthDataFromAdminEnteredForm={this.state.inputObjectFromForm}
              userAuthDataFromServer={lockerUserAuthDataFromServer}
              closeOpenLockerwindow={this.handleCloseOpeLockerWindow}
              handleManualOverrideEvent={this.handlingManualOverrideLockOpen.bind(
                this
              )}
            />
          ) : (
            <UserInputFormToAdmin
              handleClickEvent={this.handleUserInputEntry.bind(this)}
              locationIdsArr={this.state.locationIDS}
              terminalIdsArr={this.state.terminalIDs}
              getTerminalIdsFun={this.getTerminalIds.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

// HOC to inject URL parameters into the class component

// to collect the url parameter name passed by the user
const withParams = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const params = useParams<{ username: string }>(); // Assuming `name` is the param key

    console.log(params.username);

    return <WrappedComponent {...props} urlPathName={params.username} />;
  };
};

export default withParams(SubadminAccess);
