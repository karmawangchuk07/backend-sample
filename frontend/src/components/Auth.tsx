import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { signupInput } from "@karma123/review-common"


export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate()
    const [userinput,setUserinput]=useState<signupInput>({
        name:"",
        password:"",
        email:""
    });
    async function sendReq() {
        try{
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
            const response = await axios.post(
            `${BACKEND_URL}/api/user/${type === "signup" ? "signup" : "signin"}`, 
            userinput,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                // Explicitly set timeout and other configs
                timeout: 10000,
            }
        );
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/");
        } catch(e:any) {
            console.error('Request error:', e);
            if (e.response) {
                console.error('Response data:', e.response.data);
                console.error('Response status:', e.response.status);
            }
            alert("Error while signing up")
        }
    }
    
            return <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center">
                    <div>
                        <div className="px-10">
                            <div className="text-3xl font-extrabold">
                                Create an account
                            </div>
                            <div className="text-slate-500">
                                {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                                <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                    {type === "signin" ? "Sign up" : "Sign in"}
                                </Link>
                            </div>
                        </div>
                        <div className="pt-8">
                            {type === "signup" ? <LabelledInput label="Name" placeholder="karma..." onChange={(e) => {
                                setUserinput({
                                    ...userinput,
                                    name: e.target.value
                                })
                            }} /> : null}
                            <LabelledInput label="Username" placeholder="t@gmail.com" onChange={(e) => {
                                setUserinput({
                                    ...userinput,
                                    email: e.target.value
                                })
                            }} />
                            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                                setUserinput({
                                    ...userinput,
                                    password: e.target.value
                                })
                            }} />
                            <button onClick={sendReq} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-600 dark:focus:ring-green-500 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                        </div>
                    </div>
                </div>
            </div>
        }

            interface LabelledInputType {
                label: string;
                placeholder: string;
                onChange: (e: ChangeEvent<HTMLInputElement>) => void;
                type?: string;
            }

            function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
                return <div>
                    <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
                    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-green-500 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" placeholder={placeholder} required />
                </div>
            }