import { api } from "@/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
   <div>
    <h1>Hello World</h1>
   </div>
  );
}
