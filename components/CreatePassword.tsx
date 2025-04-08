"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import addLinkPassword from '@/libs/addLinkPassword';
import { useRouter } from 'next/navigation';

interface FormData {
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    password?: string;
    confirmPassword?: string;
}

// type CreatePasswordProps = {
//     linkId: string;
//     modal: React.Dispatch<React.SetStateAction<boolean>>;
// };

const CreatePassword = ({ linkId }: { linkId: string }) => {
    const [formData, setFormData] = useState<FormData>({
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        const errors = validate(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length !== 0) {
            setLoading(false)
            return;
        }
        setLoading(true)
        await addLinkPassword(linkId, formData.password);
        router.push(`/chatroom/${linkId}`)
    }


    const validate = (values: FormData): FormErrors => {
        const errors: FormErrors = {};
        const digitRegex = /^\d{6}$/;
    
        if (!digitRegex.test(values.password)) {
          errors.password = 'Password must be exactly 6 digits.';
        }
        if (!digitRegex.test(values.confirmPassword)) {
          errors.confirmPassword = 'Confirm password must be exactly 6 digits.';
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match.';
        }
    
        return errors;
    }

    useEffect(() => {
        if (loading) {
            if (Object.keys(formErrors).length === 0) {
              localStorage.setItem(
                `chatroom-${linkId}-pin`,
                formData.password
              );
              router.push(`/chatroom/${linkId}`);
        } else {
              setLoading(false);
            }
        }
    },[])

  return (
    <div className='flex justify-center items-center fixed z-50 top-0 w-screen h-full left-0 bg-black bg-opacity-50'>
        <div className='w-1/3 max-md:w-4/5 bg-white rounded-lg py-12 px-8 max-md:py-6 max-md:px-6'>
            <div className='flex flex-col space-y-8 max-md:space-y-4 relative'>
                
                <div className='flex justify-between items-center'>
                    <Link href='/' className='font-bold text-[#2B59FF] text-[12px] max-md:text-[10px] flex items-center justify-start inset-y-3.5'>
                        <Image src='/logo.png' alt='logo' className='px-1 mb-[1px]' width={37} height={30} color='#2B59FF'/>
                        ANONYMOUS
                    </Link>

                    {/* <button onClick={() => {modal(false)}} className='absolute top-0 right-6 max-md:right-4'>
                        <RxCross2 className='text-[#2b59ff]' size={24}/>
                    </button> */}
                </div>
                

                <div className='flex flex-col justify-center items-start'>
                    <h1 className='font-semibold text-[#2B59FF] text-[21px] max-md:text-[16px]'>Create new 6-digit password</h1>
                    <p className='text-zinc-400 text-[12px] font-light max-md:text-[10px]'>Enter your new password to create a chatroom</p>
                </div>

                <form className='space-y-3'>
                    <div>
                        <span className='font-medium text-[14px] text-gray-700 max-md:text-[12px]'>Password</span>
                        <input
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            type='text'
                            required
                            className={`w-full flex border border-zinc-200 rounded-lg mt-1 px-3 py-1.5 text-sm text-gray-500 outline-0 ${formErrors.password && 'border-red-500 focus:ring-red-500'}`}
                        />  
                         {formErrors.password && (<p className="mt-1 text-sm text-red-600">{formErrors.password}</p>)}
                    </div>

                    <div>
                        <span className='font-medium text-[14px] text-gray-700 max-md:text-[12px]'>Confirm password</span>
                        <input
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            type='text'
                            required
                            className={`w-full flex border border-zinc-200 rounded-lg mt-1 px-3 py-1.5 text-sm text-gray-500 outline-0 ${formErrors.confirmPassword && 'border-red-500 focus:ring-red-500'}`}
                            />  
                        {formErrors.confirmPassword && (<p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>)}
                    </div>

                    <div className='pt-4 w-full flex items-center justify-center'>
                        <button 
                            onClick={(e) => handleSubmit(e)} 
                            disabled={loading}
                            className='w-2/3 max-md:w-4/5 bg-[#2B59FF] flex items-center justify-center mx-1 border text-white border-[#2B59FF] py-2 md:px-10 text-[14px] max-md:text-[12px] font-normal rounded-sm disabled:opacity-60'>
                            {loading? 'Creating' : 'Create password'}
                            {loading && (<div className="ml-4 w-4 h-4 border-2 border-white-500 border-t-transparent rounded-full animate-spin"></div>)}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePassword