"use client"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

interface SignInStepProps{
    emailValue: string;
    prevStep: () => void;
    nextStep: () => void;
}

const SignupStep2:React.FC<SignInStepProps> = ( { emailValue,  nextStep, prevStep} ) => {
    const [guessCode, setGuessCode ] = useState<string>('');

    return (
         <div className="flex flex-col h-full">
            <button className="absolute left-4 top-4 text-white/50 cursor-pointer" onClick={prevStep}> 
                <ChevronLeft size={20}/>
           </button>
           <div >
                <div className="font-jost flex items-center flex-col">
                    <Image src='logo.svg' alt="logo" width={24} height={0} className="h-full w-auto mb-2"></Image>
                    <div className="text-2xl font-medium"> Please Check Your Email </div>
                    <div className="text-xs mt-1"> <span className="opacity-50">Enter the 6-digit code we sent to </span> <span> {emailValue} </span> </div>
                </div>

              <div className="font-geist mt-8 flex flex-col gap-4">
                  <div className="">
                      <input type="text" 
                      name="code"
                      id="code"
                      autoComplete="off"
                      value={guessCode}
                      onChange={(e) =>  setGuessCode(e.target.value)}
                      placeholder="Verification code..."
                      className="px-4 py-2.5 border border-white/10 w-full text-sm mt-1 outline-0 focus:border-white/50 rounded-sm placeholder:text-xs transition-all duration-300"/>
                  </div>

                  <button 
                  onClick={() => nextStep}
                  type="submit"
                  disabled={!(emailValue.trim().length > 2)}
                  className="bg-[#222831] px-4  py-2.5 text-sm rounded-sm w-full flex justify-center items-center gap-2 border border-white/10 disabled:opacity-50">
                      Continue
                  </button>
              </div>
           </div>

           <div className="text-center font-geist text-xs mt-6">
            <span className="opacity-50">Didn &apos; t recieve an email? </span> <button className="cursor-pointer" >Resend</button>
            </div>
          </div>
    )
}

export default SignupStep2;