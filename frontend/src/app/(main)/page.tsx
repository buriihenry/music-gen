import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import CreateSong from '~/components/create'
import { auth } from '~/lib/auth'

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session){
        redirect("/auth/sign-in");
    }
  return (
    <div>
      HomePage
      <CreateSong />
    </div>
  )
}

