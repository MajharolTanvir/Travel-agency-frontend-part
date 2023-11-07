"use client";

import Navbar from "@/components/Navbar/page";
import { Container } from "@mui/material";
import styles from "./home.module.css";
import Districts from "@/components/HomePageComponents/districts";
import Places from "@/components/HomePageComponents/places";
import Services from "@/components/HomePageComponents/services";
import Blogs from "@/components/HomePageComponents/blogs";
import Testimonials from "@/components/HomePageComponents/testimonials";
import ButtonComponent from "@/components/UI/buttonComponent";
import Link from "next/link";
import Package from "@/components/HomePageComponents/package";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section
        className={`flex justify-center items-center xl:min-h-[95vh] ${styles.backgroundImage} mb-20`}
      >
        <div className="p-5 md:p-10 lg:p-20 rounded-lg bg-black/70 opacity-90 backdrop-contrast-100 text-white absolute">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            VISIT THE CITY OF{" "}
            <span className="text-violet-400 stroke-transparent">
              {" "}
              YOUR DREAMS
            </span>
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-5">
            Explore the world with us!
          </h1>

          <div className="flex justify-center items-center mt-5">
            <Link href="/user/custom-plan">
              <ButtonComponent>Make your own plan</ButtonComponent>
            </Link>
          </div>
        </div>
      </section>

      <Container maxWidth="xl" className="mx-auto">
        <section className="mb-20">
          <Package />
        </section>
        <section className="mb-20">
          <Places />
        </section>
        <section className="mb-20">
          <Services />
        </section>
        <section className="mb-20">
          <Districts />
        </section>
        <section className="mb-20">
          <Blogs />
        </section>
        <section className="mb-20">
          <Testimonials />
        </section>
      </Container>
    </main>
  );
}
