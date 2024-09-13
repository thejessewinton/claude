import { ChatLayout } from "~/components/layout/chat-layout";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex min-h-screen w-full">
        <ChatLayout />
      </div>
    </HydrateClient>
  );
}
