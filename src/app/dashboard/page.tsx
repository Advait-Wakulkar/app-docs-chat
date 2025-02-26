"use client"; // This tells Next.js that this component should run on the client

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === undefined) {
      router.refresh(); // Forces a re-fetch of authentication state
    }
  }, [isSignedIn, router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {isSignedIn ? <p>Welcome, {user?.firstName}!</p> : <p>Not signed in</p>}
    </div>
  );
}
