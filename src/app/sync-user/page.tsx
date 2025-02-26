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
    console.log('User found, syncing to DB...');
    try {
      const result = await db.user.upsert({
          where: { email : user.emailAddresses[0]?.emailAddress ?? ""}, 
          update: { firstName: user.firstName, lastName: user.lastName },
          create: { 
            id: userId,
            email : user.emailAddresses[0]?.emailAddress ?? "",
            firstName: user.firstName, 
            lastName: user.lastName
           }
      });
      console.log('DB Sync Result:', result);
  } catch (err) {
      console.error('DB Sync Error:', err);
  }
    console.log('Redirecting to dashboard...');
      
      
  return redirect('/dashboard')
}

export default SyncUser