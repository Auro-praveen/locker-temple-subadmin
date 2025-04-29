import React from 'react'
import './wrongpath.css'
import { Link } from 'react-router-dom';


class WrongPath extends React.Component {

    render() {
        return (

            <div className='subadmin-wrongpath'>
                <div className='wrong-path-url'>
                    The Path You Have Entered is Wrong, please Go To dashboard or Re-Login To Access Dashboard
                    <br />
                    <br />
                    <Link to={"/login"} className='relogin-link'> Login-Again </Link>
                </div>
            </div>

        );
    }
}

export default WrongPath;