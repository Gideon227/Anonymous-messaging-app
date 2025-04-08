'use client'
import { useState } from 'react';
import { avatars } from '@/constants';
import updateUser from '@/libs/updateUser';
import { toast } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import debounce from 'lodash.debounce';
import getSingleUser from '@/libs/getSingleUser';

type ChangeUserInfoProps = {
    params: string;
    modal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangeUserInfo = ({ params, modal }: ChangeUserInfoProps) => {
    const [formData, setFormData] = useState({
        username: '',
        avatar: 0
    })
    const [loading, setLoading] = useState(false)  
    const [usernameError, setUsernameError] = useState('');
    const [checkingUsername, setCheckingUsername] = useState(false);

    const checkUsernameAvailability = debounce(async (username: string) => {
        if (!username) return;
        setCheckingUsername(true);
        try {
          const existingUser = await getSingleUser(username);
          if (existingUser) {
            setUsernameError("Username is already taken");
          } else {
            setUsernameError("");
          }
        } catch (err) {
          setUsernameError("");
        } finally {
          setCheckingUsername(false);
        }
      }, 500); 

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()

      if (!formData.username || formData.avatar === 0) {
        toast.error("Please select a username and an avatar.", {
          style: {
              fontSize: "14px",
          }
        })
        return;
      }  

      if (usernameError) {
        toast.error("Please choose a different username.");
        return;
      } 

      try {
        setLoading(true)
        const user = await updateUser(formData.username, formData.avatar, params);
        localStorage.setItem(
          "profile",
          JSON.stringify({ username: formData.username, avatar: formData.avatar, userId: user._id })
        );
        window.location.reload();
      } catch (error) {
        console.error("Failed to update profile", error);
      } finally{
        setLoading(false)
      }
  }

  return (
    <div>
        <div className='flex justify-center items-center fixed z-50 top-0 w-full h-full left-0 bg-black bg-opacity-50'>
            <div className='w-1/2 max-md:w-4/5 bg-white rounded-lg py-16 space-y-12 max-md:space-y-6 relative px-4'>
              <button onClick={() => {modal(false)}} className='absolute top-6 right-6 max-md:right-4'><RxCross2 size={24}/></button>
                <h1 className='text-[20px] font-semibold italic text-center'>Change Your Profile</h1>
                <div className='flex flex-col space-y-2 items-center justify-center'>
                    <label className='font-semibold text-[17px] text-center max-sm:text-[14px]'>Select your new display name:</label>
                    <input 
                        type='text'
                        required
                        maxLength={20}
                        placeholder='username...'
                        value={formData.username}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFormData({ ...formData, username: value });
                          setUsernameError('');
                          checkUsernameAvailability(value);
                        }}
                        className='lg:w-96 border w-full flex rounded-sm mt-2 mb-8 px-3 py-2 text-sm text-gray-800 font-medium outline-0 text-[16px] lg:placeholder:text-[14px] lg:placeholder:font-normal'
                    />
                    {usernameError && (<p className="text-red-500 text-xs -mt-1">{usernameError}</p>)}
                    {checkingUsername && (<p className="text-zinc-500 text-xs -mt-1">Checking availability...</p>)}
                </div>
                <div className='items-center justify-center flex flex-col space-y-5 max-md:space-y-3'>
                    <h1 className='font-semibold text-[17px] text-start max-sm:text-[14px]'>Select a new avatar as your profile picture</h1>
                    <div className='space-x-8 md:mt-2 max-md:space-x-2'>
                        {avatars.map((avatar) => (
                            <button 
                                key={avatar.id} 
                                onClick={() => setFormData({ ...formData, avatar: avatar.id })} 
                                className={`p-1 ${avatar.id === formData.avatar && 'border_style rounded-full'}`}>
                                  <div className={`max-md:hidden rounded-full bg-gray-300 p-3 hover:bg-gray-400 ${avatar.id === formData.avatar && ''}`}>
                                    <avatar.image size={26} /> 
                                  </div>
                                  <div className={`md:hidden rounded-full bg-gray-300 p-2 hover:bg-gray-400 ${avatar.id === formData.avatar && ''}`}>
                                    <avatar.image size={17} /> 
                                  </div>
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className='mt-2 mx-auto flex items-center justify-center'>
                  <button 
                    onClick={(e) => handleSubmit(e)} 
                    disabled={loading}
                    className='bg-[#2B59FF] flex justify-center items-center mx-1 border text-white border-[#2B59FF] py-2 px-10 text-[14px] font-normal rounded disabled:opacity-60'>
                      {loading ? 'Editing': 'Edit profile'}
                      {loading && (<div className="ml-4 w-4 h-4 border-2 border-white-500 border-t-transparent rounded-full animate-spin"></div>)}
                  </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeUserInfo