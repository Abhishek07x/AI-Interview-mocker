"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/utils/GeminiAIModal"
import { LoaderCircle } from "lucide-react"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { v4 as uuidv4 } from 'uuid'
import { useUser } from "@clerk/nextjs"
import moment from "moment"
import { useRouter } from "next/navigation"

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = "Job position: " + jobPosition +
      ", Job Description: " + jobDesc +
      ", Years of Experience: " + jobExperience +
      ". Depends on Job Position, Job Description & Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      " Interview question along with Answer in JSON Format, Give us question and answer field in JSON array";

    try {
      // 1. Gemini API Call
      const result = await chatSession.sendMessage(InputPrompt);
      let rawText = result.response.text();

      // 2. Robust JSON Cleaning
      rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      const cleanJsonString = rawText.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

      // 3. Safe Parsing & Universal Array Extraction
      let MockJsonResp;
      try {
        const parsedObject = JSON.parse(cleanJsonString);
        
        if (Array.isArray(parsedObject)) {
          MockJsonResp = parsedObject;
        } else if (typeof parsedObject === 'object' && parsedObject !== null) {
          // Dynamic Key Check 
          const dynamicKey = Object.keys(parsedObject).find(key => Array.isArray(parsedObject[key]));
          if (dynamicKey) {
            MockJsonResp = parsedObject[dynamicKey]; 
          } else {
            MockJsonResp = parsedObject;
          }
        } else {
          MockJsonResp = parsedObject;
        }

        console.log("Final AI Result (Parsed Array):", MockJsonResp);
      } catch (parseError) {
        console.error("JSON Parsing failed, fallback to raw text.");
        MockJsonResp = rawText; 
      }

      // 4. Database Insertion & Scope Handling
      if (MockJsonResp) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: typeof MockJsonResp === "string" ? MockJsonResp : JSON.stringify(MockJsonResp),
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY")
        }).returning(); 


        console.log("insertedData (With Full Rows):", resp);
        

        setJsonResponse(MockJsonResp);

        if (resp && resp[0]?.mockId) {
          setOpenDailog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR: MockJsonResp is empty");
      }

    } catch (error) {
      console.error("Gemini API call error:", error);
      alert("Server is currently busy. Please try again in a few seconds.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='p-10 border rounded-lg bg bg-secondary hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDailog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      
      <Dialog open={openDailog}>
        <DialogContent className={"w-full sm:max-w-lg"}>
          <DialogHeader>
            <DialogTitle className={"text-2xl"}>Tell us more about your Job Interviewing</DialogTitle>
            <DialogDescription>
              Add details about your Job position/role, Job description and years of experience
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="mt-7 my-3">
              <label>Job Role/Job Position</label>
              <Input placeholder="Ex. Full Stack Developer" required onChange={(event) => setJobPosition(event.target.value)} />
            </div>
            <div className="my-2">
              <label>Job Description/Tech Stack (In Short)</label>
              <Textarea placeholder="Ex. React, Angular, Nodejs, SQL etc" required onChange={(event) => setJobDesc(event.target.value)} />
            </div>
            <div className="my-3">
              <label>Years Of Experience</label>
              <Input placeholder="Ex. 3" type="number" max="50" required onChange={(event) => setJobExperience(event.target.value)} />
            </div>

            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className='animate-spin mr-2' /> Generating From AI
                  </>
                ) : (
                  'Start Interview'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview;














