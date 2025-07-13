
"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/Components/FormField";
import {useRouter} from "next/navigation"


const formSchema = z.object({
    username: z.string().min(2).max(50),
})

const authFormSchema = (type : FormType) =>{
    return z.object({
        name : type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email : z.string().email(),
        password : z.string().min(6),
    })
}

const AuthForm = ({type} : {type : FormType}) => {

    const router = useRouter();

    const formSchema = authFormSchema(type)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
       try{
           if(type === "sign-up"){
               // console.log('SIGN-UP', values)
               toast.success("Account Created successfully Please sign in!")
               router.push("/sign-in")

           }else{
               // console.log('SIGN-IN', values)
                toast.success("Signed-in successfully!")
               router.push("/")
           }
       }catch(error){
           console.log(error)
           toast.error(`There was an error: ${error.message}`)
       }
    }

    const isSignIn = type === "sign-in";
    return (
        <div className="card-border lg:min-w-[566px]">

            <div className="flex flex-col gap-6 card py-14 px-10 ">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100">PrepVerse</h2>
                </div>
                <h3>Practise Job interviews with AI</h3>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name={"name"}
                                label="Name"
                                placeholder="Enter your name"
                                />
                        )}
                        <FormField
                            control={form.control}
                            name={"email"}
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name={"password"}
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <Button className="btn" type="submit">{isSignIn ? "Sign-in" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">{isSignIn ? "No Account yet " : "Have an Account already? "}

                    <Link href = {!isSignIn ? '/sign-in' : '/sign-up'}
                    className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign-in" : "Sign-up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default AuthForm
