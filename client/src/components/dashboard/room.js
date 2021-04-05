import React,{ useEffect, useState, useContext } from 'react'
import {AuthContext} from '../../contexts/authContextApi'
import {SocketContext} from '../../contexts/socketContextApi'
import Cookies from 'js-cookie';
import { useHistory, Link, Switch } from 'react-router-dom';
import styles from '../../styles/room.module.css';
import axios from 'axios';
import User_home from './user_home'
import Create_topic from './create_topic';
import Settings from './settings';
import Bottomnav from './_bottomnav'
import Chatheader from './chat-header'
import Sidebar from './sidebar'
import { FaImage, FaCheckCircle, FaPaperPlane, FaTimes } from 'react-icons/fa';
import TextareaAutosize from 'react-autosize-textarea';
import ReactFileReader from 'react-file-reader';
import userImg from '../../images/user-circle.svg'


function Room(props) {

    const [ messages,setMesages ] = useState([]);
    const {socket} = useContext(SocketContext);
    const [ userMsg,setUserMsg ] = useState('');
    const [chat,setChat] = useState([]);
    const [ textABorder,setTextABorder ] = useState('0px');
    const [ preview_img_display, setPreview_img_display ] = useState('none')
    const {auth, setAuth, width, setWidth, userDetails,setUserDetails} = useContext(AuthContext);
    const [ photo, setPhoto ] = useState('');
    const [ photoBase64, setPhotoBase64 ] = useState('');
    const topic = props.history.location.topic_info;
    const room = props.match.params.room;

   
    function handleFiles(e){
        var pre_removed = e.base64.substring(e.base64.indexOf(",") + 1)
        setPhoto(e.base64)
        setPhotoBase64(pre_removed)
        setPreview_img_display('block')
    }
    useEffect(()=>{
        async function getMessages(){
            console.log(socket.id,' here')
            const res = await axios.get(`http://localhost:3333/messages?slug=${props.match.params.room}`);
            setMesages(res.data);
        }
        getMessages()

        socket.emit("usr-joined", (room));
        
        socket.on("app-msg", msgFromServer => {
            // console.log(socket.id)
            setChat((prevChat)=>{
              return [
                msgFromServer,...prevChat
              ]
            })
          });

    return () => {
        socket.emit("usr-disconn",`${userDetails[0].fullname}, left`);
        // setAllMessages([])
        socket.off('app-msg')
    }
    },[])


    const submitMsg=()=>{
        if(userMsg || photo){
          socket.emit('the-msg',{
            msg:userMsg,
            user_name:userDetails[0].fullname,
            img:userDetails[0].img,
            room:room,
            verified:userDetails[0].verified,
            email:userDetails[0].email,
            photoBase64
          })
          setUserMsg('')
          setPhoto(null)
          setPhotoBase64('')
          setPreview_img_display('none')
        }else{
          console.log('nope')
        }
      }



    return (
        <div className={styles.divBody}>
            <Chatheader title={topic.title} />
            <div className={styles.divOne}></div>
            <div className={styles.divTwo} style={{paddingTop:'1.6rem',}}>
                <div className={styles.topicWrapper} style={{borderBottom:'.5px solid #5cab7d'}}>
                    <div style={{display:'flex',flexDirection:'row',paddingLeft:'1rem',paddingRight:'1rem',}}>
                        <img src={topic.creator_img} style={{width:'70px',height:'70px',borderRadius:'50%'}} />
                        <div>
                            <p>{topic.creator} {topic.is_poster_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p>{topic.title}</p>
                        </div>
                    </div>
                    {/* <img src={topic.img} style={{width:'100%',borderRadius:'2rem'}} /> */}
                    {
                        topic.img === 'data:image/png;base64,' ? <></> 
                        : 
                        <img src ={topic.img} 
                            style={{width:'100%',borderRadius:'2rem'}}
                        />
                    }
                    <p>{topic.topic_body}</p>
                </div>
                {chat.map(msg=>(
                    <div key={msg.id} style={{display:'flex',flexDirection:'row',alignItems:'flex-start',paddingTop:'1rem',borderBottom:'.5px solid #5cab7d',paddingLeft:'1rem'}}>
                        {/* this shows the default profile image if the user has not set a profile image yet (default is 'user-img') */}
                        {
                            msg.img === 'user-img' ? <img src={userImg} style={{width:'50px',height:"50px",borderRadius:'50%' }} />
                            :
                            <img src={msg.img} style={{width:'50px',height:"50px",borderRadius:'50%' }}/>
                        }
                        <div>
                            <p style={{fontSize:'.75rem',color:'grey'}}>@{msg.username} {msg.verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p>{msg.text}</p>
                            {
                                msg.msg_w_img === 'data:image/png;base64,' ? <></> 
                                : 
                                <img src ={msg.msg_w_img} 
                                    style={{width:'90%',maxWidth:600,marginLeft:15,marginTop:5,marginBottom:5,height:150}}
                                />
                            }
                            <p style={{fontSize:'.75rem',color:'grey'}}>{msg.date} - {msg.time}</p>
                        </div>
                    </div>
                ))}
                {messages.map(msg=>(
                    <div key={msg.id} style={{display:'flex',flexDirection:'row',alignItems:'flex-start',paddingTop:'1rem',borderBottom:'.5px solid #5cab7d',paddingLeft:'1rem'}}>
                        <img src={msg.img} style={{width:'45px',height:'45px',borderRadius:'50%',marginRight:'.5rem'}} />
                        <div>
                            <p style={{fontSize:'.75rem',color:'grey'}}>@{msg.name} {msg.is_msg_sender_verified == 'true' ? <FaCheckCircle size={15} color='#5cab7d'/> : <></>}</p>
                            <p>{msg.messages}</p>
                            {
                                msg.messages_with_img === 'data:image/png;base64,' ? <></> 
                                : 
                                <img src ={msg.messages_with_img} 
                                    style={{width:'90%',maxWidth:600,marginLeft:15,marginTop:5,marginBottom:5,height:150}}
                                />
                            }
                            <p style={{fontSize:'.75rem',color:'grey'}}>{msg.date} - {msg.time}</p>
                        </div>
                    </div>
                ))}
                <div style={{ position:'fixed', bottom:'50px', display:preview_img_display}}>
                    <img src={photo} width="150px" height="150px" style={{borderRadius:'1.5rem',border:'.5px solid #5cab7d'}} />
                    <FaTimes size={30} onClick={()=>{setPreview_img_display('none'); setPhotoBase64(''); setPhoto('')}} color='grey' />
                </div>
                <div className={styles.chatInput} >
                    <ReactFileReader handleFiles={e=>handleFiles(e)} base64={true}>
                        <span style={{marginLeft:'5px'}}><FaImage color="#5cab7d" size={35} /></span>
                    </ReactFileReader>
                    <TextareaAutosize onChange={e=>setUserMsg(e.target.value)} style={{width:'80%',maxHeight:100,border:'0',outline:'none'}} rows="2" value={userMsg} maxLength={250} placeholder="start typing..." />
                    <FaPaperPlane onClick={()=>submitMsg()} color="#5cab7d" size={30} style={{marginBottom:'5px',marginRight:'5px'}}/>
                </div>
            </div>
            <div className={styles.divThree}></div>
            {/* <p>room page</p>
            {props.match.params.room }
            {JSON.stringify()} */}
            {/* <Bottomnav /> */}
        </div>
    )
}

export default Room
