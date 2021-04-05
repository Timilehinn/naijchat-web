import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,Redirect,useHistory } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from '../contexts/authContextApi'
import Cookies from 'js-cookie';
import naijIcon from '../images/logo1.png'


function Login(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPwrd, setIsShowPwrd] = useState('password');
    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);

    
    async function authenticateUser(e){
                e.preventDefault();
                console.log('aw far')
                var loginRes = await axios.post('http://localhost:3333/api/login',{email,password})
                const msg = <p style={{fontSize:'.85rem'}}>{loginRes.data.auth_msg}</p>
                console.log(loginRes.data.session," ha ha")
                setAuth(loginRes.data.session)
                setUserDetails(loginRes.data.details);
                toast.info(msg,{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                console.log(loginRes)
                if(loginRes.data.session){
                    //INITIATE SESSION ID
                    history.push(`/d/${loginRes.data.details[0].fullname}`)
                    async function initSessionId(){
                        function createId(){
                            var chars = 'aABbCcDdEeFFGGHhIIJjKkLlMmNnOoPpQqSsTtUuVvWwXxYyZz1234567890_!';
                            var id = ''
                            for(var i=0; i < chars.length ; i++){
                                id+= chars.charAt(Math.ceil(Math.random() * chars.length))
                            }
                            return id;
                        }
                        const session_Id = createId().substring(0,16);
                        Cookies.set('n_s_id', session_Id, { expires: 7 });
                        console.log(session_Id, ' my id')
                        const sendSession = axios.post('http://localhost:3333/create-session-id',{email:loginRes.data.details[0].email,session_Id:session_Id})
                    }
    
                    initSessionId();
                }else{
                    history.push('/signin')
                }

    }

    return (
        <div className={styles.divOne}>
            <form className={styles.form} onSubmit={(e)=>authenticateUser(e)}>
                 <img src={naijIcon} width="60px" height="70px" style={{alignSelf:'center'}} />
                <h2 style={{textAlign:'center',userSelect:'none',color:'#5cab7d'}}>Sign In</h2>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required />
                <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type={isShowPwrd} required />
                <button style={{color:'white',fontWeight:'bold'}}>Sign In</button>
                <Link to="/signup" style={{textDecoration:'none',color:'#5cab7d'}}>
                    <p style={{textAlign:'center',fontSize:'1rem'}}>No Account? Register.</p></Link>
                
            </form>
            <div style={{position:'absolute'}}><ToastContainer position="top-center"/></div>

        </div>
    )
}

export default Login
