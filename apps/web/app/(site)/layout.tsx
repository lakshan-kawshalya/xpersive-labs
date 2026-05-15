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
      {/* Fixed ambient background — z-index 0, behind everything */}
      <AmbientBackground />

      {/* Page content — z-index 1, above background */}
      <div className="relative" style={{ zIndex: 1 }}>
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <PageTransitionProvider>
          <main>{children}</main>
        </PageTransitionProvider>
        <Footer />
      </div>
    </>
  );
}
