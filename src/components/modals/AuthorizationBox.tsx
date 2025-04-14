import { motion } from "framer-motion";
import Login from "./Login";
import SignUp from "./Signup/SignUp";
import { useState } from "react";

interface AuthorizationBoxProps {
    handleClose: () => void
  }

const AuthorizationBox: React.FC<AuthorizationBoxProps> = ( {handleClose} ) => {
    const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('login');
    
    const changeAuthModalType = ( type: 'login' | 'signup'  ) => {
        setAuthModalType(type);
    }

    return (
        <motion.div
        key="modal" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed bg-black/10 inset-0 text-white flex justify-center items-center">
        <div className="bg-[#1A1F24] px-8 py-6 rounded-md w-[400px] h-[550px] relative">
            { authModalType === 'login' && <Login handleClose={handleClose} changeAuthModal={changeAuthModalType}/> }
            { authModalType === 'signup'  && <SignUp changeAuthModal={changeAuthModalType} handleClose={handleClose}/> }
        </div>
        </motion.div>
     
    )
}   

export default AuthorizationBox;