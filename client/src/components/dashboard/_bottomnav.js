import React,{ useContext } from 'react'
import styles from '../../styles/_bottomnav.module.css'
import { FaHome, FaSearch, FaEnvelope, FaCog, FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'


function Bottomnav() {

    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);


    return (
        <div className={styles.bottomnav}>
            <Link style={{color:'#5cab7d'}} to={`/d/${userDetails[0].fullname}`}>
                <FaHome size={23} />
            </Link>
            <Link style={{color:'#5cab7d'}} to="/search">
                <FaSearch size={23} />
            </Link>
            <Link style={{color:'#5cab7d'}} to="">
                <FaEnvelope size={23} />
            </Link>
            <Link style={{color:'#5cab7d'}} to="/settings">
                <FaCog size={23} />
            </Link>
        </div>
    )
}

export default Bottomnav
