import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

export const Hero = () => {
  return (
    <section >
      <div className='grid grid-cols-2 max-lg:grid-cols-1 gap-4 px-12 py-16 max-lg:px-4'>
        <div className='py-20 px-6 space-y-5 max-lg:space-y-3'>
          <h1 className='text-[50px] font-semibold text-[#452b1a] italic leading-[3.5rem] max-lg:text-[32px] max-lg:leading-10'>Express Yourself Freely, While Protecting Your Privacy</h1>
          <p className='text-[14px] font-normal text-[#452b1a] leading-6'>Experience true anonymity with every chat. Our platform ensures that you can connect, share, and express yourself freely, all without revealing your identity. No sign-ups, no personal data required.</p>
          <Link href='/'></Link>
        </div>
        <div className='max-lg:order-first'>
            <Image src='/file.svg' width={500} height={500} alt='hero section image'/>
        </div>
      </div>


      <div className='flex justify-center items-center flex-col space-y-2 py-40'>
        <h1 className='text-[#2A2827] font-bold text-[40px] max-lg:text-[27px] text-nowrap'>Express Yourself While Protecting Your Privacy</h1>
        <p className='text-sm font-normal text-[#2A2827] text-nowrap'>Experience true anonymity with every chat. connect, share, and express yourself freely, all without revealing your identity.</p>
      </div>
    </section>
  )
}