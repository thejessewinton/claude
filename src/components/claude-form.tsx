"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { TextArea } from "./ui/textarea";

type FormValues = { prompt: string };

export const ClaudeForm = () => {
  const [response, setResponse] = useState("");
  const { handleSubmit, register, reset } = useForm<FormValues>();

  const { mutateAsync } = api.anthropic.prompt.useMutation({
    onSuccess: async (data) => {
      reset();
      setResponse("");
      for await (const val of data) {
        setResponse((prev) => prev + val);
      }
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
        <Button type="submit">Submit</Button>
      </form>
      <AnimatePresence>
        {response ? (
          <motion.div
            style={{ overflow: "hidden" }}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ height: 0 }}
            key={"container"}
            className="w-full break-words"
          >
            {response}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
