"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"
import {  XIcon } from "lucide-react"


interface SignInStepProps{
    changeAuthModal: ( type: 'login' | 'signup' ) => void;
    changeEmail: ( value: string ) => void;
    emailValue: string;
    nextStep: () => void;
    handleClose: () => void
}

const SignupStep1:React.FC<SignInStepProps> = ( {changeAuthModal, emailValue, changeEmail, nextStep, handleClose} ) => {

    return (
         <div className="flex flex-col h-full">
           <button className="absolute right-4 top-4 text-[#323842]/50 cursor-pointer" onClick={handleClose}> 
                <XIcon size={20}/>
           </button>
           <div className="flex-1">
              <div className="font-jost">
                    <div className="text-2xl font-medium">Sign up</div>
                    <div className="text-xs mt-1">Sign up to access all forums and become part of the conversation.</div>
                </div>

              <div className="mt-8 font-geist flex flex-col gap-4">
                  <button 
                  onClick={() => signIn('google')}
                  className="bg-[#222831] px-4 py-2.5 text-xs rounded-sm w-full flex justify-center items-center gap-2 border border-white/10">
                      <Image src="google.svg" alt="google_logo" width={20} height={20}></Image>
                      Continue with Google
                  </button>

                  <button 
                      onClick={() => signIn('facebook') }
                  className="bg-[#222831] px-4 py-2.5 text-xs rounded-sm w-full flex justify-center items-center gap-2 border border-white/10">
                      <Image src="facebook.svg" alt="google_logo" width={20} height={20}></Image>
                      Continue with Facebook
                  </button>
              </div>

              <div className="flex items-center mt-8">
                  <div className="flex-1 h-[1px] bg-white/10"></div>
                  <div className="px-2 text-[10px] text-white/50 font-geist font-semibold">OR</div>
                  <div className="flex-1 h-[1px] bg-white/10"></div>
              </div>

              <div className="font-geist mt-8 flex flex-col gap-4">
                  <div className="">
                      <label htmlFor="email" className="block font-medium text-xs">Email</label>
                      <input type="text" 
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={emailValue}
                      onChange={(e) =>  changeEmail(e.target.value)}
                      placeholder="Your email address"
                      className="px-4 py-2.5 border border-white/10 w-full text-sm mt-1 outline-0 focus:border-white/50 rounded-sm placeholder:text-xs transition-all duration-300"/>
                  </div>

                  <button 
                  onClick={nextStep}
                  type="submit"

                  disabled={!(emailValue.trim().length > 2)}
                  className="bg-[#222831] px-4  py-2.5 cursor-pointer text-sm rounded-sm w-full flex justify-center items-center gap-2 border border-white/10 disabled:opacity-50">
                      Continue
                  </button>
              </div>
           </div>

            <div className="text-center font-geist text-xs mt-6">
            Already have an account ? <span className="font-light text-[#A190F8] cursor-pointer" onClick={() => changeAuthModal('login')}>Log in</span>
            </div>
          </div>
    )
}

export default SignupStep1;