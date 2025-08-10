import React from 'react'
import {Button} from "@/Components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/Components/InterviewCard";
import {getCurrentUser} from "@/lib/actions/auth.action";
import { getInterviewByUserId, getLatestInterviews} from "@/lib/actions/general.action";


const Page = async () => {

    const user = await getCurrentUser()

    const [userInterviews, latestInterviews ] = await Promise.all([
        getInterviewByUserId(user?.id!),
        getLatestInterviews({ userId : user?.id! })
    ]);
    // const userInterviews = await getInterviewByUserId(user?.id!);


    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = getLatestInterviews?.length > 0;

    return (
        <>
            <section className={"card-cta"}>
                <div className={"flex flex-col gap-6 max-w-lg"}>
                    <h2>
                        Get Interview ready with AI powered Practice & Feedback
                    </h2>
                    <p className={"text-lg"}>
                        Practice on real interview questions & get instant feedback
                    </p>
                    <Button asChild className={"btn-primary max-sm:w-full"}>
                        <Link href={"/interview"}>
                            Start an Interview
                        </Link>
                    </Button>

                </div>
                <Image src={"/robot.png"} alt={"Robot logo"} width={400} height={400} style={{ width: 'auto', height: 'auto' }} className={"max-sm:hidden"}/>
            </section>

            <section className={"flex flex-col gap-6 mt-8"}>
                <h2>
                    Your Interviews
                </h2>
                <div className={"interviews-section"}>
                    { hasPastInterviews ? (
                        userInterviews?.map((userInterview) => (
                            <InterviewCard { ...userInterview} key = {userInterview.id} />

                        ))) :   ( <p>You haven&apos;t taken any interviews</p>
                    )}
                </div>
            </section>

            <section className={"flex flex-col gap-6 mt-8"}>
                <h2>
                    Take an Interview
                </h2>
                <div className={"interviews-section"}>
                    { hasUpcomingInterviews ? (
                        latestInterviews?.map((latestInterview) => (
                            <InterviewCard { ...latestInterview} key = {latestInterview.id} />

                        ))) :   ( <p>There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    )
}
export default Page

