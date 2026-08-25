"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { smileGallery } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function SmileGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The two cases drift in opposite directions, which keeps the pair alive.
  const leftY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);
  const offsets = [leftY, rightY];

  return (
    <section className="section overflow-hidden">
      <div ref={ref} className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>{smileGallery.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1 mt-6">{smileGallery.headline}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead mt-5">{smileGallery.body}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8">
              <TextLink href={smileGallery.cta.href}>
                {smileGallery.cta.label}
              </TextLink>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {smileGallery.cases.map((item, i) => (
            <motion.figure
              key={item.image}
              style={{ y: offsets[i] }}
              className={i === 1 ? "mt-8" : ""}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-linen-deep shadow-[var(--shadow-sm)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 24vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="t-caption mt-3 text-center">
                Before and after
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
