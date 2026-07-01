"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import Link from 'next/link'

function Interview({ params }) {
  const unwrappedParams = React.use(params);
  const interviewId = unwrappedParams.interviewId;

  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCAmEnabled] = useState(false);

  useEffect(() => {
    if (interviewId && interviewId !== "undefined") {
      GetInterviewDetails();
    }
  }, [interviewId]);

  // Used to get interview details by using Mock Id
  const GetInterviewDetails = async () => {
    try {
      const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));

      if (result && result.length > 0) {
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Left Side: Job Details & Info Box */}
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rounded-lg border bg-white shadow-sm'>
            <h2 className='text-lg mb-2'><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition ? interviewData.jobPosition : "Loading..."}</h2>
            <h2 className='text-lg mb-2'><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDesc ? interviewData.jobDesc : "Loading..."}</h2>
            <h2 className='text-lg'><strong>Years Of Experience: </strong>{interviewData?.jobExperience ? interviewData.jobExperience : "Loading..."}</h2>
          </div>
          
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
            <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-sm text-yellow-700 leading-relaxed'>{process.env.NEXT_PUBLIC_INFORMATION || "Please enable webcam and mic to start your AI simulated interview."}</h2>
          </div>
        </div>

        {/* Right Side: Webcam Activation Preview */}
        <div className='flex flex-col justify-center items-center'>
          {webCamEnabled ? (
            <div className='border rounded-lg overflow-hidden bg-black flex justify-center items-center p-2'>
              <Webcam
                onUserMedia={() => setWebCAmEnabled(true)}
                onUserMediaError={() => setWebCAmEnabled(false)}
                mirrored={true}
                style={{ height: 300, width: '100%', maxWidth: 400 }}
              />
            </div>
          ) : (
            <div className='w-full max-w-md'>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary text-gray-400 rounded-lg border' />
              <Button 
                variant='outline' 
                className='w-full border-primary text-primary hover:bg-primary hover:text-white transition-all' 
                onClick={() => setWebCAmEnabled(true)}
              >
                Enable Web Cam & Microphone
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Start Button Container */}
      <div className='flex justify-end items-end mt-8'>
        <Link href={'/dashboard/interview/' + interviewId + '/start'}>
          <Button size="lg" className="px-8 font-semibold">Start Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview;

