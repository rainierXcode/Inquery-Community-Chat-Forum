"use client"
import Image from "next/image"
import { useState } from "react"
import {  XIcon } from "lucide-react"
import { signIn } from "next-auth/react"

interface LoginProps{
    handleClose: () => void;
    changeAuthModal: ( type: 'login' | 'signup' ) => void;
}

const Login:React.FC<LoginProps> = ( {handleClose, changeAuthModal} ) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFailedEmailCredentials, setIsFailedEmailCredentials] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: "/",
          });
      
          if (res?.error) {
            setIsFailedEmailCredentials(true);
          } else if (res?.ok) {
            setIsFailedEmailCredentials(false); 
            handleClose();
          } else {
            alert("Unexpected response");
          }
        } catch (err) {
          console.error("Sign-in error:", err);
          alert("Something went wrong. Please try again.");
        }
      };
      

    return (
         <div className="flex flex-col">
           <button className="absolute right-4 top-4 text-[#323842]/50 cursor-pointer" onClick={handleClose}> 
                        <XIcon size={20}/>
           </button>
           <div className="flex-1">
              <div className="font-jost">
                    <div className="text-2xl font-medium">Welcome!</div>
                    <div className="text-xs mt-1">Log in to access all forums and join the conversation.</div>
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

              <form onSubmit={handleSubmit} className="font-geist mt-8 flex flex-col gap-4">
                  <div className="">
                      <label htmlFor="email" className="block font-medium text-xs">Email</label>
                      <input type="text" 
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="px-4 py-2.5 border border-white/10 w-full text-sm mt-1 outline-0 focus:border-white/50 rounded-sm placeholder:text-xs transition-all duration-300"/>
                  </div>

                  <div className="">
                      <div className="flex justify-between items-center">
                          <label htmlFor="password" className="block font-medium text-xs">Password</label>
                          <button type="button" className="text-[#A190F8] text-xs underline">Forgot password?</button>
                      </div>
                      <input type="text" 
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className={`px-4 py-2.5 border border-white/10 w-full text-sm mt-1 outline-0 focus:border-white/50 rounded-sm placeholder:text-xs transition-all duration-300
                      ${isFailedEmailCredentials ? 'border-red-500' : ''}`}/>
                      { isFailedEmailCredentials && <div className="mt-1 text-xs ml-4 font-geist font-light text-red-500">Incorrect email and/or password. Please retry.</div> }
                  </div>


                  <button 
                  type="submit"
                  disabled={!(email.trim().length > 2 && password.trim().length > 2)}
                  className="bg-[#222831] px-4  py-2.5 text-sm rounded-sm w-full flex justify-center items-center gap-2 border border-white/10 disabled:opacity-50">
                      Log in
                  </button>
              </form>
           </div>

            <div className="text-center font-geist text-xs mt-6">
                Don &apos;t have account? <span className="font-light text-[#A190F8] cursor-pointer" onClick={() => changeAuthModal('signup')}>Signup</span>
            </div>
          </div>
    )
}

export default Login;