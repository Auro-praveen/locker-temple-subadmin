import { LoadingButton } from '@mui/lab'
import { Button, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const VerifyInputData = (props: any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState<boolean>(false);
    const [openFailAlert, setOpenFailAlert] = useState<boolean>(false);

    // const userDetails = { ...props.userAuthDataFromServer };

    const [userDetails, setUserDetails] = useState<any>({})

    useEffect(() => {
        setUserDetails({ ...props.userAuthDataFromServer })
        console.log(props.userAuthDataFromServer);

    }, [props])


    const submitOpenHandleLockEvent = async () => {
        setLoading(true)
        const resp = await props.handleManualOverrideEvent(userDetails);

        if (resp) {
            initiateLockerOpenPage();
            setLoading(false)
        } else {
            initiateLockerFailedToOpenPage();
            setLoading(false)
        }
    }

    const initiateLockerOpenPage = () => {
        setOpenSuccessAlert(true)

        if (openFailAlert) {
            setOpenFailAlert(false)
        }
    }

    const initiateLockerFailedToOpenPage = () => {

        setOpenFailAlert(true);
        if (openSuccessAlert) {
            setOpenSuccessAlert(false)
        }
    }

    const closeAlertDialogue = () => {
        if (openFailAlert) {
            setOpenFailAlert(false)
        }

        if (openSuccessAlert) {
            setOpenSuccessAlert(false)
        }
    }

    return (
        <div className="verify-container-outerlayer">
            <div className='verify-user-datacontainer'>
                <IconButton className='close-btn-style' size='small' onClick={() => props.closeOpenLockerwindow()} > <CloseIcon fontSize='medium' /> </IconButton>
                <h2 className="tuckitadmin-form-header">Verify User Before Opening The Locker</h2>
                {
                    userDetails &&
                    <div className="photo-verification-container">


                        {/* <img
                            className='locker-user-img'
                            // src={process.env.PUBLIC_URL + "/images/tuckpod_locks.png"}
                            src={userDetails.img}
                            alt="user-img" /> */}

                        <TextField
                            id="standard-read-only-input"
                            label="Mobile No"
                            variant="outlined"
                            focused
                            fullWidth
                            className="mui-form-styled"
                            color="warning"
                            type="tel"
                            name="mobileNo"
                            value={userDetails.MobileNo}
                            // onChange={(e) => handlechangeFormEvent(e)}
                            required
                            sx={{
                                mb: 3,
                            }}
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            id="standard-read-only-input"
                            label="Locker No"
                            variant="outlined"
                            focused
                            fullWidth
                            className="mui-form-styled"
                            color="warning"
                            type="tel"
                            name="mobileNo"
                            value={userDetails.LOCKNO}
                            // onChange={(e) => handlechangeFormEvent(e)}
                            required
                            sx={{
                                mb: 3,
                            }}
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            label="Terminal ID"
                            id="standard-read-only-input"
                            variant="outlined"
                            focused
                            fullWidth
                            className="mui-form-styled"
                            color="warning"
                            type="tel"
                            name="mobileNo"
                            value={userDetails.terminalID}
                            // onChange={(e) => handlechangeFormEvent(e)}
                            required
                            sx={{
                                mb: 3,
                            }}
                            InputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            id="standard-read-only-input"
                            label="DOB"
                            variant="outlined"
                            focused
                            fullWidth
                            className="mui-form-styled"
                            color="warning"
                            type="tel"
                            name="mobileNo"
                            value={userDetails.DOB}
                            // onChange={(e) => handlechangeFormEvent(e)}
                            required
                            sx={{
                                mb: 3,
                            }}
                            InputProps={{
                                readOnly: true
                            }}

                        />

                        <LoadingButton
                            variant="contained"
                            type="submit"
                            fullWidth
                            className={loading ? "" : "style-form-subitBtn"}
                            loading={loading}
                            endIcon={<LockOpenIcon />}
                            loadingPosition="end"
                            onClick={() => submitOpenHandleLockEvent()}
                        >
                            <span style={{ color: "#fff" }}>Open Locker</span>
                        </LoadingButton>


                    </div>
                }
            </div>

            <Dialog
                open={openSuccessAlert}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="dailogue-headers">

                    {"Locker Is Open"}

                </DialogTitle>
                <DialogContent className="dailogue-description">
                    <img src={process.env.PUBLIC_URL + "/other_images/locker-open1.png"} alt="lock-img" className='lockerDialogu-open-success-img' />
                    <p>Locker Has Been Open , To Open Another Locker Please Click on proceed, if locker is not open please click on close and try again</p>
                </DialogContent>
                <DialogActions className='action-btn-container'>
                    <Button
                        onClick={closeAlertDialogue}
                        fullWidth
                        variant='contained'
                        className='dailogue-btns' >Close</Button>
                    <Button
                        onClick={() => props.closeOpenLockerwindow()}
                        autoFocus
                        fullWidth
                        variant='contained'
                        className='dailogue-btns'>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openFailAlert}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="dailogue-headers-fail">

                    {"Locker Failed To Open"}

                </DialogTitle>
                <DialogContent className="dailogue-description-failer">
                    <img src={process.env.PUBLIC_URL + "/other_images/warning1.png"} alt="lock-img" className='lockerDialogu-open-success-img' />
                    <p>Something Went Wrong And Locker Failed To Open, Please Try Again OR Contact The Support Staff For More Details</p>
                </DialogContent>
                <DialogActions className='action-btn-container-fail'>
                    <Button
                        onClick={closeAlertDialogue}
                        fullWidth
                        variant='contained'
                        className='dailogue-btns-fail' >Close</Button>
                    <Button
                        // onClick={submitOpenHandleLockEvent}
                        onClick={closeAlertDialogue}
                        autoFocus
                        fullWidth
                        variant='contained'
                        className='dailogue-btns-fail'>
                        Re-Try
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default VerifyInputData