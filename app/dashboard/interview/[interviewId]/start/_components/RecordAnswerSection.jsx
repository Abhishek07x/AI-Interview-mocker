"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { UserAnswer } from '@/utils/schema'
import { db } from '@/utils/db' 
import moment from 'moment'
import { useUser } from '@clerk/nextjs'


let useSpeechToText = () => ({
  results: [],
  interimResult: '',
  isRecording: false,
  startSpeechToText: () => { },
  stopSpeechToText: () => { }
});

if (typeof window !== 'undefined') {
  useSpeechToText = require('react-hook-speech-to-text').default || require('react-hook-speech-to-text');
}


function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results && results.length > 0) {
      let fullTranscript = results.map(result => result?.transcript).join(' ');
      fullTranscript = fullTranscript.replace(/^hello honey\s*/i, "");
      fullTranscript = fullTranscript.replace(/^hello\s*/i, "");
      setUserAnswer(fullTranscript.trim());
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }

  }, [isRecording])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

    } else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {
    console.log(userAnswer)
    setLoading(true)
    const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" + userAnswer +
      ", Depends on question and User answer for given interview question " +
      "please give us rating and answer for feedback as area of improvement if any" +
      "in just 3 to 5 lines to improve it in JSON formate with rating field and feedback field";

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (await result.response.text()).replace(/```json/g, "").replace(/```/g, "").trim();
      console.log(mockJsonResp);

      const JsonFeedbackResp = JSON.parse(mockJsonResp); 

      const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        });

      if (resp) {
        toast("User Answer recorded Successfully");
      }
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Gemini or Database Error:", error);
      toast("Something went wrong. Check console.");
    } finally {
      setResults([]);
      setLoading(false);
    }

  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative'>
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="Webcam"
          className='absolute'
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-8"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <span className='flex gap-2 items-center'><Mic size={16} /> Record Answer</span>
        )}
      </Button>


    </div>
  )
}

export default RecordAnswerSection;





