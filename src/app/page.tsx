import { ClaudeForm } from "~/components/form";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
        <ClaudeForm />
      </main>
    </HydrateClient>
  );
}
