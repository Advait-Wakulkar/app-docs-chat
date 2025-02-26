import { api } from "@/trpc/server";
import SyncUser from "./sync-user/page";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
   <div>
    <h1>Hello World</h1>
    <button onClick={SyncUser}>Sync-User</button>
   </div>
  );
}
