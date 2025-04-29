import { Button, FormControl, TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import '../App.css'
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const UserInputFormToAdmin = (props: any) => {

    const locationIds = props.locationIdsArr;
    const terminalIds = props.terminalIdsArr;


    const [userFormEvent, setUserFormEvent] = useState({
        lockerNo: "",
        mobileNo: "",
        terminalID: "",
        locationId: (locationIds && locationIds.length) > 0 ? locationIds[0] : "",
        passcode: ""
    })

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setUserFormEvent({
            ...userFormEvent,
            terminalID: "",
            lockerNo: "",
            mobileNo: "",
            passcode: ""
        })

        if (loading) {
            setLoading(false)
        }
    }, [props.terminalIdsArr])

    useEffect(() => {
        setUserFormEvent({
            ...userFormEvent,
            terminalID: "",
            lockerNo: "",
            mobileNo: "",
            passcode: "",
            locationId: ""
        })

        if (loading) {
            setLoading(false)
        }
    }, [])






    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {

        setLoading(true);

        // setLoading(true);
        e.preventDefault();
        // console.log("clicked here");

        const result = await props.handleClickEvent({ ...userFormEvent, packetType: "ACTIVE_TEMPLE" });

        console.log(result);

        if (result) {
            setLoading(false);
        } else {
            setLoading(false);
        }

    }

    const handlechangeFormEvent = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent) => {

        console.log(e.target.value);




        if (e.target.name === "locationId") {
            props.getTerminalIdsFun(e.target.value)
            setUserFormEvent({
                ...userFormEvent,
                [e.target.name]: e.target.value
            })
        } else if (e.target.name === "mobileNo") {


            if (e.target.value.length <= 10 || e.target.value === '') {
                setUserFormEvent({
                    ...userFormEvent,
                    [e.target.name]: e.target.value
                })
            }

        } else if (e.target.name === "passcode") {
            if (e.target.value.length <= 4 || e.target.value === '') {
                setUserFormEvent({
                    ...userFormEvent,
                    [e.target.name]: e.target.value
                })
            }

        } else {
            setUserFormEvent({
                ...userFormEvent,
                [e.target.name]: e.target.value
            })
        }

    }



    return (
        <div className="userinput-form-container">
            <h2 className="tuckitadmin-form-header">Please Provide Valid Details</h2>
            <form action="" onSubmit={(e) => handleFormSubmit(e)}>


                <FormControl fullWidth focused sx={{ mb: 1 }} color="success">
                    <InputLabel id="demo-simple-select-helper-label">Location Id</InputLabel>
                    <Select
                        label="Location Id"
                        variant="outlined"
                        fullWidth
                        className="mui-form-styled"
                        color="success"
                        name="locationId"
                        required
                        value={userFormEvent.locationId}

                        onChange={(e) => handlechangeFormEvent(e)}
                    >
                        {locationIds &&
                            locationIds.map((locationId: string, index: number) => {
                                return <MenuItem key={index + 1} value={locationId}>{locationId}</MenuItem>
                            })
                        }

                    </Select>
                    <FormHelperText> Select Any Location Ids </FormHelperText>
                </FormControl>


                <FormControl fullWidth focused sx={{ mb: 1 }} color="success">
                    <InputLabel id="demo-simple-select-helper-label">Terminal Id</InputLabel>

                    <Select
                        label="Terminal Id"
                        variant="outlined"
                        fullWidth
                        className="mui-form-styled"
                        color="success"
                        name="terminalID"
                        required
                        value={userFormEvent.terminalID}
                        onChange={(e) => handlechangeFormEvent(e)}
                    >

                        {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem> */}

                        {terminalIds &&
                            terminalIds.map((terminalid: string, index: number) => {
                                return <MenuItem key={index + 1} value={terminalid} >{terminalid}</MenuItem>
                            })
                        }

                    </Select>
                    <FormHelperText> Select Any Terminal Ids </FormHelperText>
                </FormControl>

                <TextField
                    label="Mobile No"
                    variant="outlined"
                    focused
                    fullWidth
                    className="mui-form-styled"
                    color="warning"
                    type="number"
                    name="mobileNo"
                    disabled={(userFormEvent.terminalID === "" && !userFormEvent.terminalID) ? true : false}
                    value={userFormEvent.mobileNo}
                    onChange={(e) => handlechangeFormEvent(e)}
                    required
                    sx={{
                        mb: 3
                    }}
                />

                <TextField
                    label="Locker No"
                    variant="outlined"
                    focused
                    fullWidth
                    className="mui-form-styled"
                    color="warning"
                    name="lockerNo"
                    disabled={(userFormEvent.terminalID === "" && !userFormEvent.terminalID) ? true : false}
                    value={userFormEvent.lockerNo}
                    onChange={(e) => handlechangeFormEvent(e)}
                    required
                    sx={{
                        mb: 3
                    }}
                />

                <TextField
                    label="Passcode"
                    variant="outlined"
                    type="number"
                    focused
                    fullWidth
                    className="mui-form-styled"
                    color="warning"
                    name="passcode"
                    disabled={(userFormEvent.terminalID === "" && !userFormEvent.terminalID) ? true : false}
                    value={userFormEvent.passcode}
                    required
                    sx={{
                        mb: 3,
                        '& input[type=number]': {
                            '-moz-appearance': 'textfield',
                            '-webkit-appearance': 'none'
                        }
                    }
                    }


                    onChange={(e) => handlechangeFormEvent(e)}

                />

                {/* <TextField
                    label="terminalID"
                    variant="outlined"
                    focused
                    fullWidth
                    className="mui-form-styled"
                    color="warning"
                    name="terminalID"
                    required
                    value={userFormEvent.terminalID}
                    onChange={(e) => handlechangeFormEvent(e)}
                    sx={{
                        mb: 3
                    }}
                /> */}

                {/* <TextField
                    label="locationID"
                    variant="outlined"
                    focused
                    fullWidth
                    className="mui-form-styled"
                    color="warning"
                    name="locationId"
                    required
                    value={userFormEvent.locationId}
                    onChange={(e) => handlechangeFormEvent(e)}
                    sx={{
                        mb: 3
                    }}
                /> */}


                <LoadingButton
                    variant="contained"
                    type="submit"
                    fullWidth
                    className={loading ? "" : "style-form-subitBtn"}
                    loading={loading}
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                >
                    <span style={{ color: "#fff" }}>Submit</span>
                </LoadingButton>


            </form>
        </div>
    )
}

export default UserInputFormToAdmin;