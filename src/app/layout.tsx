import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster, toast } from "sonner";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "Note Pal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen w-full flex-col m-4">
              <Header />
              <main className="flex flex-1 flex-col px-4 pt-20 xl:px-8 mx-auto">
                {children}
              </main>
            </div>

          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
