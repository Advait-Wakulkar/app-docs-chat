"use-client"

import { api } from "@/trpc/server";
import SyncUser from "./sync-user/page";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
   <div>
    <h1>Hello World</h1>
   </div>
  );
}
