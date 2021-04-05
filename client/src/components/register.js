import React, { useState, useContext, useEffect } from 'react'
import styles from '../styles/register.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,Redirect,useHistory } from 'react-router-dom'
import axios from 'axios';
import {AuthContext} from '../contexts/authContextApi'
import Cookies from 'js-cookie';
import naijIcon from '../images/logo2.png'


function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPwrd, setIsShowPwrd] = useState('password');
    const history = useHistory();
    const {auth, setAuth, userDetails,setUserDetails} = useContext(AuthContext);

    async function authenticateUser(e){
        e.preventDefault();
        const registerRes = await axios.post('http://localhost:3333/register',{email,name,password});
        console.log(registerRes.data)
        const msg = <p style={{fontSize:'.85rem'}}>{registerRes.data.msg}</p>

        toast.info(msg,{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        if(registerRes.data.success){
                console.log('aw far')
                const loginRes = await axios.post('http://localhost:3333/api/login',{email,password})
                setAuth(loginRes.data.session)
                setUserDetails(loginRes.data.details)
                console.log(loginRes.data.auth_msg)
                console.log(auth,' this is my auth')
                console.log(loginRes.data.session,' this is my session')

                if(loginRes.data.session){
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
                        axios.post('http://localhost:3333/create-session-id',{email:loginRes.data.details[0].email,session_Id:session_Id})
                    }
                    initSessionId();
                }else{
                    history.push('/signin')
                }
                
        }
    }
    return (
        <div className={styles.divOne}>
            <form className={styles.form} onSubmit={(e)=>authenticateUser(e)}>
                <img src={naijIcon} width="80px" height="90px" style={{alignSelf:'center'}} />
                <h2 style={{textAlign:'center',userSelect:'none',color:'white'}}>Sign Up</h2>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required/>
                <input type="name" value={name} onChange={e=>setName(e.target.value)} placeholder="name (display name)" required/>
                <input minLength="6" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type={isShowPwrd} required/>
                <button  style={{color:'#5cab7d',fontWeight:'bold'}}>Sign Up</button>
                <Link to="/signin" style={{textDecoration:'none',color:'white'}}>
                    <p style={{textAlign:'center',fontSize:'1rem'}}>Already registered? Sign In</p></Link>
                
            </form>
            <div style={{position:'absolute'}}><ToastContainer position="top-center"/></div>

        </div>
    )
}

export default Register
