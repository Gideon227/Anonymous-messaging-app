'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import getSingleLink from '@/libs/getSingleLink';
import addLinkParticipants from '@/libs/addLinkParticipants';

const PASSWORD_LENGTH = 6;

const Password = ({ slug, userId }: { slug: string; userId: string }) => {
  const [password, setPassword] = useState<string[]>(Array(PASSWORD_LENGTH).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;
    const newPassword = [...password];
    newPassword[idx] = val;
    setPassword(newPassword);
    if (idx < PASSWORD_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
        e.preventDefault();
        const newPassword = [...password];
        newPassword[idx] = '';
        setPassword(newPassword);
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
        }
      }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, PASSWORD_LENGTH).split('');
    const newOtp = [...password];
    paste.forEach((ch, i) => {
      if (/\d/.test(ch)) {
        newOtp[i] = ch;
        if (inputsRef.current[i]) inputsRef.current[i]!.value = ch;
      }
    });
    setPassword(newOtp);
    const nextIdx = paste.length < PASSWORD_LENGTH ? paste.length : PASSWORD_LENGTH - 1;
    inputsRef.current[nextIdx]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const code = password.join('');
      if (code.length < PASSWORD_LENGTH) {
        toast.error('Please enter the full OTP', {
          style: {
            fontSize: "14px",
          }
        })
        return;
      }
      const link = await getSingleLink(slug)
      const linkPassword = String(link?.password).trim();
      const codeStr = String(code).trim();
  
      console.log('Entered:', codeStr);
      console.log('Expected:', linkPassword);
  
      if (codeStr === linkPassword) {
        console.log('Password match');
        await addLinkParticipants(slug, userId);
        router.push(`/chatroom/${slug}`);
        window.location.reload()
        return;
      }
      setLoading(false)  
      toast.error('Invalid password, please try again.', {
        style: {
          fontSize: "14px",
        }
      }) 
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Something went wrong. Please try again.');
    } finally{
      setLoading(false)
    }
 
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className='space-y-2 flex flex-col items-center justify-center  mb-6'>
        <h1 className="text-[18px] font-semibold text-gray-800">
            Enter Chatroom Password
        </h1>
        <p className='text-[12px] text-zinc-400 '>Enter the 6 digit password for the anonymous chatroom</p> 
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex space-x-3">
          {password.map((digit, idx) => (
            <input
              key={idx}
              type="tel"              
              inputMode="numeric"     
              pattern="\d*"      
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md bg-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 max-md:w-10 max-md:h-10 max-md:text-[16px]"
            />
          ))}
        </div>
        <button
          type="submit"
          className={`${loading && ("bg-blue-400")} mt-20 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition text-[14px] w-80 flex items-center justify-center`}
        >
          {loading? 'Loading...' : 'Continue'}
          {loading && (<div className="ml-4 w-4 h-4 border-2 border-white-500 border-t-transparent rounded-full animate-spin"></div>)}              
        </button>
      </form>
    </div>
  );
}

export default Password
