import { ChatLayout } from "~/components/layout/chat-layout";
import { Drawer } from "~/components/ui/drawer";
import { Prompt } from "~/components/ui/prompt";
import { Shadow } from "~/components/ui/shadow";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-screen bg-stone-800 text-white">
        <ChatLayout />
      </main>
    </HydrateClient>
  );
}
