import { useState } from "react"
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";

interface SignInProps{
    changeAuthModal: ( type: 'login' | 'signup' ) => void;
    handleClose: () => void
}


const SignUp: React.FC<SignInProps> = ( { changeAuthModal, handleClose } ) => {
    const [signupStep, setSignupStep] = useState<number>(1);
    const [email, setEmail] = useState<string>('');

    const handleChangeEmail = ( value : string) => {
        setEmail(value)
    }


    const nextStep = () => {
        setSignupStep((prev) => prev + 1);
    }

    const  prevStep = () => {
        setSignupStep((prev) => prev - 1)
    }

    return (
        <>
        { signupStep === 1 && <SignupStep1 
        changeAuthModal={changeAuthModal} changeEmail={handleChangeEmail} emailValue={email} nextStep={nextStep} handleClose={handleClose}/> }
        { signupStep === 2 && <SignupStep2  emailValue={email} nextStep={nextStep} prevStep={prevStep}/> }
        </>
    )
}

export default SignUp