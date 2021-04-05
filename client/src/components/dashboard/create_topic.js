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


function Create_topic() {

    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);
    const [ title,setTitle ] = useState('');
    const [ post, setPost ] = useState('');
    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const [ preview_img_display, setPreview_img_display ] = useState('none')

    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setPreview_img_display('flex')
    }


    const publishPost= async ()=>{
        if(title && post ){
            // console.log(title)
            // console.log(post)
            // console.log(photoBase64)
            const res = await axios.post('http://localhost:3333/create-topic',{
                title,post,photoBase64,creator:userDetails[0].fullname,creator_img:userDetails[0].img,verified:userDetails[0].verified,
                creator_email:userDetails[0].email
            })
            console.log(res.data)
            // setIsUploaded(res.data);
                if(res.data.success){
                    toast.info(res.data.msg);
                    setPhoto(null)
                    setTitle('')
                    setPost('')
                }else{
                    toast.error(res.data.msg);
                }
            }
            
    }
 
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
            <div style={{display:preview_img_display,justifyContent:'flex-end'}}>
                <img src={photo} width="150px" height="150px" />
                <FaTimes size={30} onClick={()=>{setPreview_img_display('none'); setPhoto(''); setPhotoBase64('')}} color='grey'/>
            </div>
            <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                    <p style={{color:'grey'}}>Tap to add an image.</p>
            </ReactFileReader>
            <div className={styles.input} >
                <input onChange={e=>setTitle(e.target.value)} style={{border:'0px', outline:'none',height:'35px',backgroundColor:'transparent',width:'100%'}}  placeholder="an intresting title ..." required />
            </div>
            <div className={styles.input} >
                <TextareaAutosize onChange={e=>setPost(e.target.value)} maxLength="350" style={{marginTop:'50px', outline:'none',border:'0px', height:'auto',backgroundColor:'transparent',width:'100%'}}  placeholder="Post" required />
            </div>
            <button onClick={()=>publishPost()} className={styles.button} >Post topic</button>
        </div>
        <div className={styles.divThree}>
                <input style={{width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} />
        </div>
        
    </div>
    )
}

export default Create_topic
