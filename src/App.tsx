import React, { ContextType } from 'react';
import logo from './logo.svg';
import './App.css';
import TempeLogin from './Login/TempleLogin';
import { BrowserRouter as Router, Routes, Route, NavigateFunction, Navigate } from 'react-router-dom';
import { GlobalContext, GlobalContextProviderForSubadmin } from './AuthenticateUser/HandleCommonVariables';
import AccessedAuth from './AuthenticateUser/AccessedAuth';
import SubadminAccess from './Subadmin-access/SubAdminaccess';
import Routing from './Router/Routing';
import { stat } from 'fs';
import WrongPath from './wrong-path/WrongPath';
import AuthenticationProvider from './AuthenticateUser/AuthenticationProvider';


const TempleLocinWithN = Routing(TempeLogin)
const DashBoardAccessWithN = Routing(SubadminAccess);


interface AppProps {

}

interface AppState {
  username: string
}

class App extends React.Component<AppProps, AppState> {

  static contextType?: React.Context<any> | undefined = GlobalContext;
  context!: ContextType<typeof GlobalContext>;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      username: ""
    }
  }

  componentDidMount(): void {

    // console.log("inside component did mount");

    const uName = this.context?.state.user.username;
    if (uName) {
      this.setState({ username: uName.toString() })
    } else {
      const localStarageName = sessionStorage.getItem("tuckitAdminUser")
      const localAccessType = sessionStorage.getItem("tuckitAdminAccessType")

      if (localStarageName && localAccessType) {
        const dispatch = this.context?.dispatch;

        this.setState({
          username: localStarageName
        })
        if (dispatch) {
          dispatch({ type: "SET_USER", payload: { username: localStarageName, userAccessType: localAccessType } })
        }
      }

    }
  }


  render() {

    const { username } = this.state
    // console.log("user name is is is is :::::::: " + username);

    return (
      <div className="App">
        <GlobalContextProviderForSubadmin>
          <Router>
            <Routes>
              <Route path='/' element={<Navigate to={username ? `/tuckit/${username}/sub-admin` : '/login'} replace={true} />} />
              <Route path='/login' element={<TempleLocinWithN />} />
              {/* <Route path='/tuckit/sub-admin'
                element={<AccessedAuth element={<SubadminAccess />} />} /> */}

              {/* <Route path='/tuckit/:username/sub-admin' element={<AccessedAuth path='/tuckit/:username/sub-admin' element={<SubadminAccess />} />} /> */}

              {/* <Route path='/tuckit/:username/sub-admin' element={<AccessedAuth element={<SubadminAccess />} />} /> */}
              <Route path='/*' element={<WrongPath />} />


              <Route path='/tuckit/:username/sub-admin' element={<AuthenticationProvider> <DashBoardAccessWithN /></AuthenticationProvider>} />

            </Routes>

            {/* <AccessedAuth path='/tuckit/:username/sub-admin' element={<SubadminAccess />} /> */}
          </Router>

        </GlobalContextProviderForSubadmin>
      </div>
    );
  }
}

export default App;
