import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/create-topic.module.css';
import axios from 'axios';
import User_home from './user_home'
import { FaPen, FaCheckCircle, FaTimes } from 'react-icons/fa';
import TextareaAutosize from 'react-autosize-textarea';
import Header from './header'
import { ToastContainer, toast } from 'react-toastify';
import ReactFileReader from 'react-file-reader';


function Search() {

    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);
    const [ title,setTitle ] = useState('');
    const [ post, setPost ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ preview_img_display, setPreview_img_display ] = useState('none')

   
 
    return (
        <div className={styles.divBody}>
        <Header title="Create topic" />                             
        <ToastContainer />
        <div className={styles.divOne}>
            {userDetails.map(dets=>(
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <img src={dets.img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                    <div style={{marginLeft:'.5rem'}}>
                        <h4>@{dets.fullname} {dets.verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</h4>
                        <p style={{fontSize:'.9rem',color:'grey'}}>{dets.email}</p>
                    </div>
                    
                </div>
            ))}
            {/* <p>{Cookies.get('n_s_id')}</p> */}
            <div style={{display:'flex',flexDirection:'row', marginLeft:'3rem'}}>
                <h4 style={{fontWeight:'lighter'}}>followers - </h4>
                <h4 style={{fontWeight:'lighter'}}>following - </h4>
            </div>
            <div style={{paddingLeft:'3rem',borderBottom:'1px solid grey'}}>
                <Link style={{textDecoration:'none',color:'black'}} to={`/d/${userDetails[0].fullname}`}><h2>Home</h2></Link>
                <Link style={{textDecoration:'none',color:'black'}}><h2>Create Topic</h2></Link>
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

        <div className={styles.divTwo}>
           Search
        </div>
        <div className={styles.divThree}>
                <input style={{width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} />
        </div>
        
    </div>
    )
}

export default Search
