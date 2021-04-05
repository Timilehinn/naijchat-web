import React,{ useContext, useState, useEffect } from 'react'
import styles from '../../styles/sidebar.module.css'
import { FaHome, FaSearch, FaEnvelope, FaCog, FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'


function Sidebar() {

    const {auth, setAuth, showSideBar,setShowSideBar, userDetails,setUserDetails} = useContext(AuthContext);


    return (
        <div className={styles.sidebar} style={{transform:`translateX(${showSideBar})`}}>
            {/* <img src={userDetails[0].img} style={{backgroundColor:'violet',width:'35px',height:'35px',borderRadius:'50%'}} /> */}
        </div>
    )
}

export default Sidebar;
