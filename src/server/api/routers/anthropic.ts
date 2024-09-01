import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { anthropic } from "~/server/anthropic";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const anthropicRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const params: Anthropic.MessageCreateParams = {
        max_tokens: 1024,
        messages: [{ role: "user", content: input.prompt }],
        model: "claude-3-opus-20240229",
        stream: true,
      };

      const msg = anthropic.messages.stream(params);

      for await (const message of msg) {
        return message.type === "message_stop" ? message : message;
      }
      return await msg.finalMessage();
    }),
});
