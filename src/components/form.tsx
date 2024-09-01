"use client";

export const Form = () => {
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/anthropic", { method: "POST" });
        }}
      >
        <input className="text-neutral-950" type="text" name="prompt" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
