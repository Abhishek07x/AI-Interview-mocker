"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function AdminAnalytics() {
    const [interviewLog, setInterviewLog] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        FetchAllInterviews();
    }, [])

    const FetchAllInterviews = async () => {
        try {
       
            const result = await db.select().from(UserAnswer);
            
           
            const uniqueInterviews = {};
            result.forEach(item => {
                if (!uniqueInterviews[item.mockIdRef]) {
                    uniqueInterviews[item.mockIdRef] = {
                        mockId: item.mockIdRef,
                        userEmail: item.userEmail || "Anonymous/Guest",
                        techStack: item.jobPosition || "Not Specified",
                        date: item.createdAt || "N/A"
                    };
                }
            });

            setInterviewLog(Object.values(uniqueInterviews));
        } catch (error) {
            console.error("Error fetching admin logs:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-10 max-w-6xl mx-auto min-h-screen'>
            <div className='flex justify-between items-center mb-8 border-b pb-5'>
                <div>
                    <h1 className='text-3xl font-extrabold text-slate-900'>System Analytics Log</h1>
                    <p className='text-sm text-gray-500 mt-1'>Track active users and total interviews conducted.</p>
                </div>
                <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>

            {loading ? (
                <div className="text-center py-10 font-medium text-gray-500 animate-pulse">Loading secure database logs...</div>
            ) : interviewLog.length === 0 ? (
                <div className="text-center py-10 font-medium text-gray-500">No interview logs found in the database.</div>
            ) : (
                <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-100 bg-white">
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                        <thead className="bg-slate-50 text-left font-semibold text-slate-700">
                            <tr>
                                <th className="px-6 py-4">User Email</th>
                                <th className="px-6 py-4">Target Tech Stack</th>
                                <th className="px-6 py-4">Interview Token (ID)</th>
                                <th className="px-6 py-4 action">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {interviewLog.map((log, index) => (
                                <tr key={index} className="hover:bg-slate-50/80 transition-all">
                                    <td className="px-6 py-4 font-medium text-slate-900">{log.userEmail}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold">
                                            {log.techStack}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{log.mockId}</td>
                                    <td className="px-6 py-4">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => router.push(`/dashboard/interview/${log.mockId}/feedback`)}
                                        >
                                            View Report
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
} 