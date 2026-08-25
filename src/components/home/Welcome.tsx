"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { welcome, proofPoints, veteransNote } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Welcome() {
  const imageRef = useRef<HTMLDivElement>(null);

  // The image uncovers itself as it rises, like a curtain drawing back.
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(14% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section className="section relative overflow-hidden">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Arch topped photograph, echoing the column in the mark */}
        <div ref={imageRef} className="relative order-2 lg:order-1">
          <motion.div
            className="arch relative aspect-[4/5] w-full max-w-lg overflow-hidden bg-linen-deep lg:aspect-[5/6]"
            style={{ clipPath }}
          >
            <motion.div className="absolute inset-0" style={{ scale }}>
              <Image
                src={welcome.image}
                alt={welcome.imageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Veteran note, floated over the corner of the photo */}
          <Reveal
            preset="riseSmall"
            className="absolute -bottom-6 right-0 z-10 max-w-[19rem] lg:-right-8"
          >
            <div className="rounded-[1.1rem] bg-white p-6 shadow-[var(--shadow-md)] ring-1 ring-sand/60">
              <p className="t-eyebrow">VA Provider</p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-taupe">
                {veteransNote}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>{welcome.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="t-h1 mt-6">{welcome.headline}</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 font-[family-name:var(--font-display)] text-xl italic text-rose-deep">
              {welcome.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="t-lead mt-6">{welcome.body}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8">
              <TextLink href={welcome.cta.href}>{welcome.cta.label}</TextLink>
            </div>
          </Reveal>

          {/* Proof points */}
          <RevealGroup
            as="ul"
            gap={0.08}
            delay={0.1}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-sand pt-10"
          >
            {proofPoints.map((point) => (
              <RevealItem as="li" preset="riseSmall" key={point.label}>
                <p className="font-[family-name:var(--font-display)] text-4xl leading-none text-espresso">
                  <span className="metal-text">
                    {point.value}
                    {point.suffix}
                  </span>
                </p>
                <p className="mt-2.5 text-[0.85rem] leading-snug text-taupe">
                  {point.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
