import { Drawer } from "~/components/drawer";
import { PromptForm } from "~/components/prompt-form";
import { Shadow } from "~/components/shadow";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="relative flex min-h-screen items-center justify-center bg-stone-800 text-white">
        <Drawer />
        <Shadow />

        <PromptForm />
      </main>
    </HydrateClient>
  );
}
