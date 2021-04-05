import React,{ useEffect, useState, useContext } from 'react'
import styles from '../../styles/dash.module.css';
import {AuthContext} from '../../contexts/authContextApi'
import axios from 'axios';

function User_home() {
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ topics, setTopics ] = useState([]);

    useEffect(()=>{
        async function getTopics(){
            const res = await axios.get('http://localhost:3333/topics');
            console.log(res.data)
            setTopics(res.data);
        }
        getTopics();
    },[])

    return (
        <div className={styles.divTwo}>
            {topics.map(topic=>(
                   <div key={topic.id}>
                        <div style={{display:'flex',flexDirection:'row',marginLeft:'1rem'}}>
                            <img src={topic.creator_img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                            <div style={{marginLeft:'1rem'}}>
                                <p style={{fontSize:'.75rem',color:'grey'}}>@{topic.creator}</p>
                                <p>{topic.title}</p>
                            </div>
                           
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'5rem',padding:'.5rem'}}>
                            <img src={topic.img} style={{borderRadius:'1rem'}} width="95%" height="300px" />
                            <p>{topic.topic_body}</p>
                            <p>{topic.date} {topic.time}</p>
                        </div>
                   </div>
               ))}
        </div>
    )
}

export default User_home
