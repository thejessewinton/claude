"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type FormValues = { prompt: string };

export const ClaudeForm = () => {
  const [response, setResponse] = useState("");
  const { handleSubmit, register, reset } = useForm<FormValues>();

  const { mutateAsync } = api.anthropic.prompt.useMutation({
    onSuccess: async (data) => {
      reset()
      setResponse("");
      for await (const val of data) {
        setResponse((prev) => prev + val);
      }
    },
  });

  const onSubmit = async (values: FormValues) => {
    mutateAsync({ prompt: values.prompt });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-neutral-950"
          type="text"
          {...register("prompt")}
        />
        <button type="submit">Submit</button>
      </form>
      <AnimatePresence>
      {response ? <motion.div  style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              exit={{ height: 0 }}
              key={"container"}
              className="max-w-lg break-words">{response}</motion.div> : null}
      </AnimatePresence>
    </>
  );
};
