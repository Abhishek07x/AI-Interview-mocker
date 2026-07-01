"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Simple Header */}
      <div className="flex p-4 items-center justify-between bg-white shadow-sm px-10">
        <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
        <Button variant="outline" className="bg-secondary" onClick={() => router.push('/dashboard')}>Sign In</Button>
      </div>

      {/* Main Intro Banner Section */}
      <section className="flex-1 flex items-center justify-center bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
              Own Your Next Interview With
              <span className="sm:block text-primary mt-2"> AI-Interview Mocker </span>
            </h1> 

            <p className="mx-auto mt-6 max-w-xl sm:text-xl/relaxed text-gray-500">
              Practice mock interviews tailored to your tech stack. Get instant performance ratings, deep behavioral insights, and concrete areas of improvement powered by Gemini AI.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {/* GET STARTED BUTTON: */}
              <Button 
                className="bg-primary text-white font-bold p-6 text-lg rounded-lg shadow-md hover:scale-105 transition-all"
                onClick={() => router.push('/dashboard')}
              >
                Get Started 🚀
              </Button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

