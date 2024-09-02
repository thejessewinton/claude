import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { anthropic } from "~/server/anthropic";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const anthropicRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async function* ({ input }) {
      const params: Anthropic.MessageCreateParams = {
        max_tokens: 1024,
        messages: [{ role: "user", content: input.prompt }],
        model: "claude-3-opus-20240229",
        stream: true,
      };

      const stream = await anthropic.messages.create(params);

      for await (const messageStreamEvent of stream) {
        switch (messageStreamEvent.type) {
          case "content_block_delta":
            switch (messageStreamEvent.delta.type) {
              case "text_delta":
                const text = messageStreamEvent.delta.text;
                yield text;

                break;

              default:
                break;
            }
            break;

          default:
            break;
        }
      }
    }),
});
