import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/settings.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
// import Settings from './settings';
import Bottomnav from './_bottomnav'
import Header from './header'
import ReactFileReader from 'react-file-reader';
import { FaPen, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';



function Settings(props) {

    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ profileImg, setProfileImg ] = useState(userDetails[0].img)
    const [ topics, setTopics ] = useState([]);
    const [ switchPage, setSwitchPage ] = useState('home')
    const [name,setName] = useState(userDetails[0].fullname);
    const [email,setEmail] = useState(userDetails[0].email);
    const [password,setPassword] = useState(userDetails[0].password);

    useEffect(()=>{
        async function getTopics(){
            const res = await axios.get('http://localhost:3333/topics');
            console.log(res.data)
            setTopics(res.data);
        }
        getTopics();
    },[])


    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setProfileImg(e.base64)
        // setPreview_img_display('block')
    }

    const updateProfileImage = async ()=>{
        const res = await axios.post('http://localhost:3333/update-profile-image',
        {photoBase64,id:userDetails[0].id,creator_email:userDetails[0].email})
        
        console.log(res.data)
        const resForReload = await axios.get(`http://localhost:3333/api/login?email=${userDetails[0].email}`)
        setUserDetails(resForReload.data.details)
        if(res.data.success){
            toast.info(res.data.msg)
        }else{
            toast.error(res.data.msg)
        }
    }

    const updateProfile = async ()=>{
        const res = await axios.post('http://localhost:3333/update-profile-web',{id:userDetails[0].id,email,password,name})
        console.log(name)
        // console.log(res.data)
        const resForReload = await axios.get(`http://localhost:3333/api/login?email=${userDetails[0].email}`)
        setUserDetails(resForReload.data.details)
        if(res.data.success){
            toast.info(res.data.msg)
        }else{
            toast.error(res.data.msg)
        }
    }


    console.log(props)
    return (
        <div className={styles.divBody}>
        <Header title="Settings" />                             
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
                    <Link style={{textDecoration:'none',color:'black'}} to="/create-topic"><h2>Create Topic</h2></Link>
                    <Link style={{textDecoration:'none',color:'black'}}><h2>Your Topics</h2></Link>
                    <Link style={{textDecoration:'none',color:'black'}}><h2>Get Verified</h2></Link>
                    <Link style={{textDecoration:'none',color:'black'}} to=""><h2>Settings</h2></Link>
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
                <h4>Change Picture</h4>
                <div style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                    <img src={profileImg} width="100px" height="100px" style={{borderRadius:'50%'}} />
                    <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                        <span style={{marginLeft:'',cursor:'pointer'}}><FaPen color="#5cab7d" size={15} /></span>
                    </ReactFileReader>
                </div>
                <button onClick={()=>updateProfileImage()} style={{marginTop:'1.7rem',border:'5px solid green',fontWeight:'bold',borderRadius:'3rem',padding:'.6rem',backgroundColor:'#5cab7d'}}>Update Image</button>
                 <p>Edit Details</p>
                 <div className={styles.detaislForm}>
                     <input 
                        style={{width:'auto',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}}
                        name="name"
                        value={name} 
                        onChange={e=>setName(e.target.value)}
                    />
                     <input 
                        style={{width:'auto',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}} 
                        name="email"
                        value={email} 
                        onChange={e=>setEmail(e.target.value)}
                    />
                     <input 
                        style={{width:'auto',paddingLeft:'15px',height:'40px',border:'.5px solid #5cab7d',borderRadius:'30px',marginBottom:'10px'}} 
                        name="password"
                        type="password"
                        value={password} 
                        onChange={e=>setPassword(e.target.value)}
                    />
                     <button onClick={()=>updateProfile()} style={{width:'auto',borderRadius:'30px',fontWeight:'bold',height:'45px',backgroundColor:'#5cab7d',border:'.5px solid #5cab7d',border:'5px solid green',marginBottom:'10px'}}>Update Details</button>
                 </div>
            </div>
            <div className={styles.divThree}>
                    <input style={{width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} />
            </div>
            {/* <Bottomnav /> */}
        </div>
    )
}

export default Settings
