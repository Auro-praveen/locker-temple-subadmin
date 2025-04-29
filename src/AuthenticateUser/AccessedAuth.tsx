import React, { cloneElement, ContextType, ReactElement } from 'react'
import { Component } from 'react';
import { GlobalContext } from './HandleCommonVariables';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

interface AccessedAuthProps {
    element: React.ReactElement;
    path: string
}

interface AccessedAuthState {
    isAuthenticated: boolean,
    tuckitUserName: string
}

class AccessedAuth extends React.Component<AccessedAuthProps, AccessedAuthState> {

    static contextType = GlobalContext;
    context!: ContextType<typeof GlobalContext>;

    constructor(props: AccessedAuthProps) {
        super(props);
        this.state = {
            isAuthenticated: true,
            tuckitUserName: ""
        };
    }


    componentDidMount(): void {

        const uNameContext = this.context?.state;

        const uName = uNameContext?.user.username;
        const uAccessType = uNameContext?.user.userAccessType

        if (uName) {

            this.setState({ isAuthenticated: true, tuckitUserName: uName.toString() })
        } else {

            const userName = localStorage.getItem("tuckitAdminUser");
            const userAccessType = localStorage.getItem("tuckitAdminAccessType")

            if (userName && userAccessType) {

                const dispatch = this.context?.dispatch;

                if (dispatch) {
                    dispatch({ type: "SET_USER", payload: { username: userName, userAccessType: userAccessType } })
                } else {
                    console.error("dispatch is undefined")
                }

                this.setState({ isAuthenticated: true })
            } else {
                this.setState({ isAuthenticated: false })
                // console.log("user not authenticated");

            }

        }

    }


    render() {

        const { isAuthenticated } = this.state;
        const { element, ...rest } = this.props;
        const { tuckitUserName } = this.state;

        console.log("is authenticated : " + isAuthenticated);

        const { path } = this.props

        return (
            <Routes>
                <Route

                    {...rest}
                    // path={path}
                    // if no need to send the name as parameter to all the Component
                    element={isAuthenticated ? element : <Navigate to="/login" />}
                // element={isAuthenticated ? cloneElement(element, { username: tuckitUserName }) : <Navigate to="/login" />}

                />
            </Routes>
        );
    }
}

export default AccessedAuth;
