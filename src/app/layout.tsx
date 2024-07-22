import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ColorModeScript initialColorMode="dark" />
        <ChakraProvider>
          <StoreProvider>
            <Box
              width={"100%"}
              display={"flex"}
              flexDir={"column"}
              gap={10}
              alignItems={"center"}
              padding={2}
            >
              <Navbar />
              {children}
            </Box>
          </StoreProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
