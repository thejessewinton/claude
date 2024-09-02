import { Drawer } from "~/components/sidebar/drawer";
import { ClaudeForm } from "~/components/form";
import { Shadow } from "~/components/sidebar/shadow";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
        <ClaudeForm />
        <Drawer />
        <Shadow />
      </main>
    </HydrateClient>
  );
}
