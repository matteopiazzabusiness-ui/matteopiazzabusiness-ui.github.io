import { WipeOverlay } from "@/components/WipeOverlay";

/**
 * Template — rimonta a ogni navigazione. Il contenuto NON è avvolto in un
 * wrapper con transform (romperebbe i pin ScrollTrigger): la transizione è
 * demandata a WipeOverlay, un sipario giallo fixed e autonomo.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WipeOverlay />
    </>
  );
}
