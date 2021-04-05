import React,{ useState, useContext } from 'react'
import styles from '../../styles/chat-header.module.css'
import { FaHome, IoIosArrowBack, IoIosInformationCircleOutline, FaSearch, FaEnvelope, FaCog, FaBeer } from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'
import { useMediaQuery } from 'react-responsive'
import Cookies from 'js-cookie'

function Chatheader(props) {
    const history = useHistory();
    const {auth, setAuth,userDetails,setUserDetails} = useContext(AuthContext);
    const [ showSideBar, setShowSideBar ] = useState(-100);
    const [ backModal, showBackModal ] = useState('hidden');
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
      })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    if(isDesktopOrLaptop ||isBigScreen ){
        // setShowSideBar('-100');
        // showBackModal('none');
    }
    return (
        <>
            <div className={styles.header}>
                <IoIosArrowBack size={35} color="#5cab7d" onClick={()=>history.push(`/d/${userDetails[0].fullname}`)} />
                <p style={{marginRight:'.5rem'}}>{props.title}</p>
                <IoIosInformationCircleOutline size={30} color="#5cab7d" onClick={()=>alert('Every naijchat user isolely responsible for his or her messages and posts.')} />
            </div>
        </>
    )
}

export default Chatheader;
