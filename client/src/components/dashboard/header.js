import React,{ useState, useContext } from 'react'
import styles from '../../styles/header.module.css'
import { FaHome, FaSearch, FaEnvelope, FaCog, FaBeer } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../../contexts/authContextApi'
import { useMediaQuery } from 'react-responsive'
import Cookies from 'js-cookie'

function Header(props) {
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
                <img onClick={()=>{setShowSideBar('0'); showBackModal('visible')}} src={userDetails[0].img} style={{marginLeft:'.5rem',backgroundColor:'violet',width:'35px',height:'35px',borderRadius:'50%'}} />
                <h3 style={{marginRight:'.5rem'}}>{props.title}</h3>
            </div>
            <div className={styles.sidebar} style={{zIndex:'1',overflowX:'scroll',transform:`translateX(${showSideBar}%)`}}>
                <div>
                    {userDetails.map(dets=>(
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <img src={userDetails[0].img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                            <div style={{marginLeft:'.5rem'}}>
                                <h4>@{dets.fullname}</h4>
                                <p style={{fontSize:'.9rem',color:'grey'}}>{dets.email}</p>
                            </div>
                            
                        </div>
                    ))}
                    {/* <p>{Cookies.get('n_s_id')}</p> */}
                    
                    <div style={{display:'flex',flexDirection:'row', marginLeft:'3rem'}}>
                        <h4 style={{fontWeight:'lighter'}}>followers - </h4>
                        <h4 style={{fontWeight:'lighter'}}>following - </h4>
                    </div>
                    <div style={{paddingLeft:'3rem',borderBottom:'1px solid lightgrey'}}>
                        <Link style={{textDecoration:'none',color:'black'}} to={`/d/${userDetails[0].fullname}`}><h2>Home</h2></Link>
                        <Link to="/create-topic" style={{textDecoration:'none',color:'black'}}><h2>Create Topic</h2></Link>
                        <Link style={{textDecoration:'none',color:'black'}}><h2>Your Topics</h2></Link>
                        <Link style={{textDecoration:'none',color:'black'}}><h2>Get Verified</h2></Link>
                        <Link style={{textDecoration:'none',color:'black'}} to="/settings"><h2>Settings</h2></Link>
                    </div>
                    <br/>
                    {/*  */}
                    <div className={styles.lowerSideBar} style={{paddingLeft:'3rem'}}>
                        <h3 onClick={()=>alert('fuck u')}>About</h3>
                        <h3 onClick={()=>alert('fuck u')}>Policy</h3>
                        <h3 style={{color:'orange'}} onClick={()=>{Cookies.remove('n_s_id'); history.push('/')}}>logout</h3>
                        {/* <h3 onClick={()=>alert(Cookies.get('n_s_id'))}>chaeck state</h3> */}
                    </div>
                
                </div>
            </div> 
            <div className={styles.backmodal} onClick={()=>{setShowSideBar(-100); showBackModal('hidden')}} style={{visibility:backModal}}></div>
        </>
    )
}

export default Header;
