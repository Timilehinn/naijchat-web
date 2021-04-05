import React,{ useState, createContext } from 'react'


export const AuthContext = createContext();

function AuthContextApi(props) {

    const [ auth, setAuth ] = useState(false);
    const [ userDetails, setUserDetails ] = useState([]);
    const [ showSideBar,setShowSideBar ] = useState('100%')
    const allValues = {auth, setAuth, showSideBar, setShowSideBar, userDetails, setUserDetails};

    return (
        <AuthContext.Provider value={allValues} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextApi
