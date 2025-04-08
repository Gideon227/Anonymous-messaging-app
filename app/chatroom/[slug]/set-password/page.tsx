import React, { Suspense }  from 'react'
import SetPassword from '@/components/SetPassword'
import Loading from '@/app/loading'

const page = async({ params }: { params: Promise<{ slug: string }> }) => {
  
  const { slug } = await params

  return (
      <Suspense fallback={<Loading />}>
        <div>
          <SetPassword slug={slug}/>
        </div>
      </Suspense>
    )
}

export default page