import { Drawer } from "~/components/drawer";
import { ClaudeForm } from "~/components/claude-form";
import { Shadow } from "~/components/shadow";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="relative flex min-h-screen items-center justify-center bg-stone-800 text-white">
        <Drawer />
        <Shadow />

        <ClaudeForm />
      </main>
    </HydrateClient>
  );
}
