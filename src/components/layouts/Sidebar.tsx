"use client"
import Image from "next/image";
import { House,  Newspaper, LogOut} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {   motion } from "framer-motion";
import { useSidebarStore } from "@/store/sidebarStore";
import { useSession, signOut } from "next-auth/react";

const Sidebar = () => {
    const {isOpen} = useSidebarStore();
    const pathname = usePathname();
    const { data: session } = useSession();
    
    const menu = [
        {name: "Home", path: '/', icons: House},
        {name: "Forums", path: '/forums', icons: Newspaper}
    ]

    
    return (
    <motion.aside
    animate = {{
        width: isOpen ? '256px': '75px'
    }}
    transition={{
        duration: 0.3, 
        ease: 'easeOut', 
      }}
     className="h-screen top-0 left-0 bottom-0 border-r border-r-white/10 py-6 px-4 relative">
        <header className="flex gap-3 text-lg items-center text-white font-jost font-semibold relative mb-12 px-2">
            <Image src='logo.svg' alt="logo" width={24} height={0} className="h-full w-auto"></Image>
           { isOpen && <span> InQuery <span className="text-[10px] text-[#FFD369] absolute top-0 ml-1"> * </span> </span> }
        </header>

        <div className="font-geist flex flex-col gap-2">
            {
                menu.map((item) => (
                    <Link key={item.path} href={item.path}>
                        <motion.div
                        key={pathname}
                         animate={{
                            backgroundColor: pathname === item.path ? '#32363F' : 'transparent',
                            opacity: pathname === item.path ? 1 : 0.7, 
                            
                          }}
                        initial={false}
                        transition={{ ease: [0.4, 0, 0.2, 1] }}
                        className={`flex gap-2 text-white opacity-70 px-2 py-2 text-sm relative ${
                            pathname === item.path && 'rounded-sm'
                        }
                        ${
                            !isOpen ? 'justify-center' : 'justify-start'
                        }
                        `
                        }>
                            <item.icons strokeWidth={1.25} size={20} />
                            { isOpen && item.name }

                           {
                            pathname === item.path &&  
                            <motion.div 
                            animate={{height: '100%'}}
                            className="absolute w-[2px] bg-[#FFD369] top-0 -right-4 -mr-[1px] rounded-2xl"></motion.div>
                           }
                        </motion.div>
                    </Link>
                ))
            }
        </div>

        <div className="border-t-[1px] border-t-white/10 mt-8 py-2">
            {
                session && 
                <button 
                onClick={() => signOut()}
                className={`flex gap-2 text-white hover:bg-[#32363F]/50 px-2 py-2 rounded-sm text-sm relative w-full ${
                            !isOpen ? 'justify-center' : 'justify-start'
                        }`}>
                    <LogOut strokeWidth={1.25} size={20} />
                   { isOpen && 'Log Out' }
                </button>
            }
        </div>

    </motion.aside>
    )
}

export default Sidebar;

{/* <section className="flex gap-2 text-white bg-[#32363F] px-2 py-2 rounded-sm text-sm relative">
<Newspaper strokeWidth={1.25} size={20} />
Forum

<div className=" text-[10px] flex items-center justify-center w-5  h-4 rounded-2xl bg-red-400 absolute top-1/2 right-2 -translate-y-1/2"> 12 </div>
<div className="absolute w-[2px] h-full bg-[#FFD369] top-0 -right-4 -mr-[1px] rounded-2xl"></div>
</section> */}