import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { GlobalProvider } from "~/providers/global";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Jesse Winton - Claude",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isPinned = cookies().get("user-sidebar-pinned")?.value;

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <GlobalProvider pinned={isPinned === "true"}>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </GlobalProvider>
    </html>
  );
}
