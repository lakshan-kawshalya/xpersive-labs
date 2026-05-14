import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import PageTransitionProvider from "@/components/layout/PageTransitionProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <PageTransitionProvider>{children}</PageTransitionProvider>
      <Footer />
    </>
  );
}
