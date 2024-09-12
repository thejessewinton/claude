"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { useGlobalStore } from "~/state/global";
import { TextArea } from "~/components/shared/text-area";
import { Spinner } from "@phosphor-icons/react";
import { Button } from "~/components/shared/button";

type FormValues = { prompt: string };

export const Prompt = () => {
  const { responseIsLoading, setResponseIsLoading } = useGlobalStore((s) => s);
  const [response, setResponse] = useState("");
  const { handleSubmit, register, reset } = useForm<FormValues>();

  const { mutateAsync } = api.anthropic.prompt.useMutation({
    onMutate: () => {
      setResponseIsLoading(true);
    },
    onSuccess: async (data) => {
      reset();
      setResponse("");
      for await (const val of data) {
        setResponse((prev) => prev + val);
      }
    },
    onSettled: () => {
      setResponseIsLoading(false);
    },
  });

  const onSubmit = async (values: FormValues) => {
    await mutateAsync({ prompt: values.prompt });
  };

  return (
    <div className="flex w-96 flex-col gap-8">
      <h1 className="text-2xl">Interact with Claude</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <TextArea
          className="w-full text-neutral-950"
          type="text"
          {...register("prompt")}
        />
        <Button type="submit">
          {responseIsLoading ? <Spinner /> : "Submit"}
        </Button>
      </form>

      <div className="w-full overflow-hidden break-words">{response}</div>
    </div>
  );
};
