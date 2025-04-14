"use client"
import { PanelLeftClose } from "lucide-react"
import { useSidebarStore } from "@/store/sidebarStore"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { AnimatePresence} from "framer-motion"
import { useSession } from "next-auth/react";
import Image from "next/image"
import default_profile from '@/assets/images/default_profile.png'
import AuthorizationBox from "../modals/AuthorizationBox"

const Header:React.FC = () => {
    const {toggle} = useSidebarStore();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const {data: session, status} = useSession();
    


    const openLoginModal = () => {
        setIsAuthModalOpen(true);
    }

    const handleCloseAuthModal = () => {
        setIsAuthModalOpen(false);
    }

    useEffect(() => {
        if (window.location.hash === '#_=_') {
          history.replaceState(null, '', window.location.pathname);
        }
      }, []);
      

    if(status === 'loading') return <div>Loading...</div>;

    return (
        <div className="px-6 py-5 flex items-center gap-2 justify-between">
           <div className="flex gap-4">
                <button onClick={toggle}>
                        <PanelLeftClose strokeWidth={1.25} color="#fff" size={20} />
                </button>
                <div className="bg-[#32363F] flex px-2 py-2 rounded-md gap-2 w-72">
                        <button>
                        <Search size={16} strokeWidth={1.75} color="#fff"/>
                        </button>
                        <input type="text" placeholder="Search Forums..." className="flex-1 outline-0 text-sm text-white" />
                </div>
           </div>

           <div>
               { !session && <button className="bg-[#FFD369] px-3.5 py-1.5 text-white text-sm rounded-md" onClick={openLoginModal}> Log In </button> }
               { session && <Image src={session.user?.image ?? default_profile} alt="profile" width={35} height={35} className="rounded-full"/> }
              
           </div>

           <AnimatePresence>
            {
                isAuthModalOpen && 
                <AuthorizationBox handleClose={handleCloseAuthModal}/>
            }
           </AnimatePresence>
           
        </div>
    )
}

export default Header