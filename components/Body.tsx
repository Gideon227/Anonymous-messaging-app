import React from 'react';
import { LiaUserSecretSolid } from "react-icons/lia";
import { IoIosLogIn } from "react-icons/io";
import { GoDatabase } from "react-icons/go";
import { VscGithubAlt } from "react-icons/vsc";

const Body = () => {
  return (
    <div>
        <div className='flex justify-center items-center my-10 mx-2'>
            <div className='rounded-xl border border-[#e5e7eb] bg-white text-[#08080A] shadow overflow-hidden w-[1000px]'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='flex-1 p-6 lg:p-8'>
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <p className='text-sm font-medium text-zinc-500'>Anonymous Messaging</p>
                                <h1 className='text-2xl lg:text-3xl font-semibold tracking-tight'>
                                    Private app for anonymous, safe, and open conversations with others.
                                </h1>
                            </div>
                            <div className='space-y-4 mb-8'>
                                <div className="flex gap-3 items-start">
                                    <div className='mt-1 rounded-lg border border-black/10 p-1 flex-shrink-0'>
                                        <LiaUserSecretSolid size={18}/>
                                    </div>
                                    <div className=''>
                                        <h3 className='font-medium'>Anonymous identity</h3>
                                        <p className='text-sm text-zinc-500'>
                                        Users can engage in conversations while maintaining complete privacy and anonymity. The platform ensures secure communication without requiring any personal details, allowing individuals to connect freely without the fear of being identified or revealing their identity to others.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className='mt-1 rounded-lg border border-black/10 p-1 flex-shrink-0'>
                                        <IoIosLogIn size={18}/>
                                    </div>
                                    <div className=''>
                                        <h3 className='font-medium'>No login</h3>
                                        <p className='text-sm text-zinc-500'>
                                        Our anonymous messaging app doesn't require any form of authentication. No need to secure your chatroom, no email, or personal information is ever required.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className='mt-1 rounded-lg border border-black/10 p-1 flex-shrink-0'>
                                        <VscGithubAlt size={18}/>
                                    </div>
                                    <div className=''>
                                        <h3 className='font-medium'>Open-source code</h3>
                                        <p className='text-sm text-zinc-500'>
                                        We are fully open-source on Github. You can feel free to fork the repo and self-deploy or make some customized changes for yourself.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className='mt-1 rounded-lg border border-black/10 p-1 flex-shrink-0'>
                                        <LiaUserSecretSolid size={18}/>
                                    </div>
                                    <div className=''>
                                        <h3 className='font-medium'>Anonymous identity</h3>
                                        <p className='text-sm text-zinc-500'>
                                        Users can engage in conversations while maintaining complete privacy and anonymity. The platform ensures secure communication without requiring any personal details, allowing individuals to connect freely without the fear of being identified or revealing their identity to others.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='class="flex-1 bg-zinc-100 min-h-[300px] lg:min-h-0 hidden lg:block"'></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body