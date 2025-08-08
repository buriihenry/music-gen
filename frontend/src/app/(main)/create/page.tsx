import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { SOngPanel } from '~/components/create/song-panel'
import { auth } from '~/lib/auth'

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session){
        redirect("/auth/sign-in");
    }
  return (
    <div className='flex h-full flex-col lg:flex-row'>
      <SOngPanel />
   
    </div>
  )
}

