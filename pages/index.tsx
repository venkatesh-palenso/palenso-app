import React from "react";
import { Layouts } from "@/layouts";
import Marketing from "@/components/marketing";

export default function Home() {
  return <Marketing />;
}

Home.getLayout = Layouts.Public;
