"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface StartInterviewProps {
    params: {
        interviewId: string;
    };
}

function StartInterview({ params }: StartInterviewProps) {
    const [interviewData, setInterviewData] = useState<any>(); // Adjust type as per your schema
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any[]>(); // Adjust type as per your schema
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        getInterviewDetails();
    }, []);

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const getInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
    };

    // Ensure mockInterviewQuestion is defined before accessing its length
    const questionCount = mockInterviewQuestion?.length || 0;

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions  */}
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />

                {/* Video/ Audio Recording  */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
                {activeQuestionIndex !== questionCount - 1 &&
                    <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                {activeQuestionIndex === questionCount - 1 &&
                    <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
                        <Button >End Interview</Button>
                    </Link>}
            </div>
        </div>
    );
}

export default StartInterview;
