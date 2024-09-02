"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";

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
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-neutral-950"
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
            className="max-w-lg break-words"
          >
            {response}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
