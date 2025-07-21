import { PropsWithChildren } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
