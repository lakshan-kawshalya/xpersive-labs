import Link from "next/link";
import RegisterLink from "@/components/partners/RegisterLink";
import Reveal from "@/components/partners/Reveal";

const TEXT_LINK = "font-semibold text-primary underline-offset-4 hover:underline";

export default function PartnerCta({ otherLabel, otherHref }: { otherLabel: string; otherHref: string }) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <Reveal>
          <div
            className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-primary/10 p-12 text-center sm:p-20"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F1F0FF 55%, #E8E6FF 100%)",
              boxShadow: "0 8px 40px rgba(109,113,249,0.12)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full blur-[90px]"
              style={{ background: "rgba(84,193,251,0.22)" }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full blur-[90px]"
              style={{ background: "rgba(109,113,249,0.18)" }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <h2
                className="mb-4 font-display font-extrabold leading-[1.05] text-text-primary"
                style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
              >
                Ready to talk?
              </h2>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-text-secondary">
                Tell us a little about you and which option you are interested in.
              </p>
              <RegisterLink />
              <ul className="mt-8 flex flex-col items-center gap-2 text-sm">
                <li>
                  <Link href={otherHref} className={TEXT_LINK}>
                    Read how {otherLabel} works
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className={TEXT_LINK}>
                    Back to the Partner Program
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={TEXT_LINK}>
                    Our services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
