import type Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "~/server/anthropic";

export const POST = async () => {
  try {
    const params: Anthropic.MessageCreateParams = {
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hi Claude, how are you?" }],
      model: "claude-3-opus-20240229",
      stream: true,
    };

    const msg = anthropic.messages.stream(params);

    return new Response(msg.toReadableStream(), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response("error.message", { status: 500 });
  }
};
