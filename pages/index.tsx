// react
import { ReactElement } from "react";

// layout
import RootLayout from "@/layouts/root";

// components
import MarketingView from "@/components/marketing";

const LandingPage = () => {
  return <MarketingView />;
};

LandingPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default LandingPage;
