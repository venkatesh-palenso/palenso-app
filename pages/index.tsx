// layout
import { Layouts } from "@/layouts";

// components
import MarketingView from "@/components/marketing";

const LandingPage = () => {
  return <MarketingView />;
};

LandingPage.getLayout = Layouts.Public;

export default LandingPage;
