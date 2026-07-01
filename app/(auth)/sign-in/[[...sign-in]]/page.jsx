"use client"
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <section className="bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-12"> 
        
      
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6 h-full items-end bg-slate-950 overflow-hidden border-r border-slate-900">
          
         
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-10 -translate-y-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-x-10 translate-y-10"></div>
          
          
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="relative p-16 text-white z-10 w-full">
            <div className="flex gap-2 items-center mb-8 bg-slate-900/40 backdrop-blur-md p-3 rounded-xl border border-slate-800/60 w-fit">
              <Image src="/logo.svg" width={130} height={90} alt="logo" className="brightness-0 invert" />
            </div>
            
            <h2 className="text-3xl font-extrabold sm:text-4xl md:text-5xl tracking-tight leading-none bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Elevate Your <br />
              <span className="text-primary font-black">Interview Game.</span>
            </h2>

            <p className="mt-6 leading-relaxed text-slate-400 text-lg max-w-md">
              Step into a smart developer workspace built to simulation real tech rounds.
            </p> 

            {/* Floating Feature Card */}
            <div className="mt-12 p-6 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800/80 shadow-2xl max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">AI Evaluation Node</span>
              </div>
              <p className="text-sm font-medium text-slate-300">
                "Analyzing response flow structure, tone modulation, and stack coverage metrics in real-time."
              </p>
            </div>
          </div>
        </section>

        {/*  Right Side: Clerk Sign-In Form (Centered on all screen sizes) */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:col-span-7 xl:col-span-6 bg-slate-50 min-h-screen">
          <div className="max-w-md w-full flex flex-col items-center justify-center">
            
            {/* Logo visible only on mobile screens */}
            <div className="block lg:hidden mb-6">
              <Image src="/logo.svg" width={140} height={80} alt="logo" />
            </div>

            <div className="shadow-2xl rounded-2xl overflow-hidden p-2 bg-white border border-gray-100 w-full flex justify-center">
              <SignIn />
            </div>

          </div>
        </main>
 
      </div>
    </section>
  )
}