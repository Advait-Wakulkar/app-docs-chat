import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Get user's information
  const user = await currentUser();
  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  try {
    // Check if user exists in the database
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      // Create user if they don't exist
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          name: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.emailAddresses[0].emailAddress ?? '',
        },
      });
      console.log('User created in database:', dbUser.id);
    } else {
      // Update user if their Clerk info has changed
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          name: user.firstName ?? dbUser.name,
          lastName: user.lastName ?? dbUser.lastName,
          email: user.emailAddresses[0].emailAddress ?? dbUser.email,
        },
      });
      console.log('User updated in database:', dbUser.id);
    }

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: 'https://go.bradi.tech/dashboard',
      },
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return new NextResponse('Error syncing user', { status: 500 });
  }
}