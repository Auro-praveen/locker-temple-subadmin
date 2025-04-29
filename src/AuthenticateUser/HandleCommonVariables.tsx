import React, { Component, createContext, Dispatch, ReactNode } from 'react';

interface State {
    user: { username: String, userAccessType: string },
}


type Action = | { type: "SET_USER", payload: { username: string, userAccessType: string } }


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };

        default:
            return state;
    }
}


const GlobalContext = createContext<{ state: State, dispatch: Dispatch<Action> } | undefined>(undefined);


const initialState: State = {
    user: { username: "", userAccessType: "" },
}


interface GlobalContextProviderForSubadminProps {
    children: ReactNode
}

interface GlobalContextProviderForSubadminState {
    state: State
}

class GlobalContextProviderForSubadmin extends Component<GlobalContextProviderForSubadminProps, GlobalContextProviderForSubadminState> {
    constructor(props: GlobalContextProviderForSubadminProps) {
        super(props);
        this.state = {
            state: initialState
        };
    }

    dispatch = (action: Action) => {
        this.setState((prevState) => ({ state: reducer(prevState.state, action) }))
    }

    render() {

        const { state } = this.state;
        const { children } = this.props;

        return (
            <GlobalContext.Provider value={{ state, dispatch: this.dispatch }} >
                {children}
            </GlobalContext.Provider>
        );
    }
}

// export default GlobalContextProviderForSubadmin;
export {GlobalContext, GlobalContextProviderForSubadmin}