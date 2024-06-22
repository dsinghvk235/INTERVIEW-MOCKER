"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState<string>("");
    const [jobDesc, setJobDesc] = useState<string>("");
    const [jobExperience, setJobExperience] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState<string>(""); // Assuming jsonResponse is a string based on your usage

    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and answer field on JSON`;

        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = result.response.text().replace('```json', '').replace('```', '');

        try {
            const parsedJson = JSON.parse(MockJsonResp);
            setJsonResponse(parsedJson); // Assuming jsonResponse should be set to the parsed JSON response
        } catch (error) {
            console.error("Error parsing JSON:", error);
            setJsonResponse(""); // Handle parsing error if necessary
        }

        if (MockJsonResp) {
            const createdByEmail = user?.primaryEmailAddress?.emailAddress;
            if (!createdByEmail) {
                console.error("User email is undefined.");
                setLoading(false);
                return;
            }

            try {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(), // Adding mockId here
                        jsonMockResp: MockJsonResp,
                        jobPosition: jobPosition,
                        jobDesc: jobDesc,
                        jobExperience: jobExperience,
                        createdBy: createdByEmail,
                        createdAt: moment().format('DD-MM-yyyy')
                    }).returning(); // Assuming you want to return all fields for the inserted row

                console.log("Inserted ID:", resp);
                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/interview/' + resp[0]?.mockId);
                }
            } catch (error) {
                console.error("Error inserting into database:", error);
                // Handle database insert error if necessary
            }
        } else {
            console.log("ERROR: Empty MockJsonResp");
        }

        setLoading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary
                hover:scale-105 hover:shadow-md cursor-pointer
                transition-all border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about your job position/role, Job description and years of experience</h2>

                                    <div className='mt-7 my-3'>
                                        <label>Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className=' my-3'>
                                        <label>Job Description/ Tech Stack (In Short)</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc"
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)} />
                                    </div>
                                    <div className=' my-3'>
                                        <label>Years of experience</label>
                                        <Input placeholder="Ex.5" type="number" max="100"
                                            required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' /> Generating from AI
                                            </> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
