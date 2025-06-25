import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import { BentoGridTemplate } from "@/components/BentoGrid";
import Link from "next/link";

export default function Home() {
  return (
    <Bounded className={"min-h-screen"}>
      <section className={"flex min-h-[50vh] items-center justify-center"}>
        <div className={"text-center"}>
          <h1 className={"text-3xl font-bold uppercase lg:text-5xl"}>
            your podcast, summarized by ai
          </h1>
          <p className={"my-4 text-xl uppercase lg:text-3xl"}>
            upload | summarize | repurpose
          </p>
          <Link href={"/create-summary"}>
            <Button className={"cursor-pointer"} size={"lg"}>
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      <BentoGridTemplate />
    </Bounded>
  );
}
