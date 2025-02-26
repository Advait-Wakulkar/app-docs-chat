import { db } from '@/server/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

const SyncUser = async () => {
    const {userId} = await auth()
    if (!userId){ 
        throw new Error('User not found')
    }
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    if(!user.emailAddresses[0]?.emailAddress) {
        return notFound()
    }
    console.log('yes')
    db.user.upsert({
        where: { email: "wakulkaradvait@gmail.com" }, 
        update: { firstName: "Advait", lastName: "Wakulkar" },
        create: { email: "wakulkaradvait@gmail.com", firstName: "Advait", lastName: "Wakulkar" }
      }).then(result => {
        console.log(result)
      }).catch(err => {
        console.error(err)
      })
    console.log('yes')
      
      
  return redirect('/dashboard')
}

export default SyncUser