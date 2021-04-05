import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/dash.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Settings from './settings';
import Bottomnav from './_bottomnav'
import Header from './header'
import Sidebar from './sidebar'
import { FaCheckCircle } from 'react-icons/fa';
import userImg from '../../images/user-circle.svg'

function Dashboard(props) {

  
    const history = useHistory();
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);
    const [ switchPage, setSwitchPage ] = useState('home')
    
    useEffect(()=>{
        async function getTopics(){
            const res = await axios.get('http://localhost:3333/topics');
            console.log(res.data)
            setTopics(res.data);
        }
        getTopics();
    },[])

    return (
        <div className={styles.divBody}>
        <Header title="Recent topics" />
        {/* <Sidebar /> */}
            <div className={styles.divOne}>
                {userDetails.map(dets=>(
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        {/* <img src={userDetails[0].img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/> */}
                        {
                            userDetails[0].img === 'user-img' ? <img src={userImg} style={{width:'50px',height:"50px",borderRadius:'50%' }} />
                            :
                            <img src={userDetails[0].img} style={{width:'50px',height:"50px",borderRadius:'50%' }} />
                        }
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
                <div style={{paddingLeft:'3rem',borderBottom:'1px solid lightgrey'}}>
                    <Link style={{textDecoration:'none',color:'black'}} to=""><h2>Home</h2></Link>
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

            <div className={styles.divTwo}>
               {topics.map(topic=>(
                   <Link to={{
                            pathname:`/topic/${topic.slug}`,
                            topic_info:topic
                        }} 
                         style={{color:'black',textDecoration:'none'}}>
                        <div className={styles.topicDiv} key={topic.id} style={{transition:'.3s',borderBottom:'.5px solid green', paddingTop:'1.6rem'}} key={topic.id}>
                            <div style={{display:'flex',flexDirection:'row',marginLeft:'1rem'}}>
                                <img src={topic.creator_img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                                <div style={{marginLeft:'1rem'}}>
                                    <p style={{fontSize:'.75rem',color:'grey'}}>@{topic.creator} {topic.is_poster_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                                    <p style={{fontWeight:'bold'}}>{topic.title}</p>
                                </div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',marginLeft:'0rem',padding:'.5rem'}}>
                            {topic.img === 'data:image/png;base64,' ? <div style={{height:'0px'}}></div> 
                                : 
                                <img src={topic.img} style={{borderRadius:'1rem'}} width="auto" height="300px" />
                            }
                                <p>{topic.topic_body}</p>
                                <p style={{fontSize:'.8rem',color:'grey'}}>{topic.date} {topic.time}</p>
                            </div>
                        </div>
                   </Link>
               ))}
            </div>
            <div className={styles.divThree}>
                <input placeholder="Search topics" style={{paddingLeft:'20px',width:'80%', height:'30px',borderRadius:'5rem',border:'.5px solid green'}} />
            </div>
            {/* BOTTOM NAV */}
            <Bottomnav />
            
        </div>
    )
}

export default Dashboard
