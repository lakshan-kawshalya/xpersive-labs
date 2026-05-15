import AmbientBackground from "@/components/layout/AmbientBackground";
import CustomCursor from "@/components/layout/CustomCursor";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import PageTransitionProvider from "@/components/layout/PageTransitionProvider";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <PageTransitionProvider>{children}</PageTransitionProvider>
        <Footer />
      </div>
    </>
  );
}
