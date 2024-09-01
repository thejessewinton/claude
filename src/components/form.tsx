"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export const Form = () => {
  const [prompt, setPrompt] = useState<string>("");
  const { mutateAsync, data } = api.anthropic.prompt.useMutation();

  console.log(JSON.stringify(data, null, 4));

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await mutateAsync({ prompt });
        }}
      >
        <input
          className="text-neutral-950"
          type="text"
          name="prompt"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="mx-auto max-w-lg">{JSON.stringify(data, null, 4)}</div>
    </>
  );
};
