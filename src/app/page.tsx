"use client";

import Navbar from "@/components/Navbar/page";
import { Container } from "@mui/material";
import Image from "next/image";
import styles from "./home.module.css";
import Districts from "@/components/HomePageComponents/districts";
import Places from "@/components/HomePageComponents/places";
import Services from "@/components/HomePageComponents/services";
import UpcomingServices from "@/components/HomePageComponents/upcomingServices";
import Blogs from "@/components/HomePageComponents/blogs";
import Testimonials from "@/components/HomePageComponents/testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section
        className={`flex justify-center items-center min-h-[400px] md:min-h-[600px] lg:min-h-[900px] ${styles.backgroundImage} mb-20`}
      >
        <div className="p-10 rounded-lg backdrop-blur-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            VISIT THE CITY OF YOUR DREAMS
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mt-5">
            Explore the world with us!
          </h1>
        </div>
      </section>

      <Container maxWidth="xl">
        <section className="mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C690E] text-center">
            CHOSE YOUR DREAM CITY
          </h1>
          <Districts />
        </section>
        <section className="mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C690E] text-center">
            CHOSE YOUR DREAM CITY
          </h1>
          <Places />
        </section>
        <section className="mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C690E] text-center">
            What services we provide
          </h1>
          <Services />
        </section>
        <section className="mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C690E] text-center">
            Services we launch soon
          </h1>
          <UpcomingServices />
        </section>
        <section className="mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C690E] text-center">
            Our blogs
          </h1>
          <Blogs />
        </section>

        <section className="mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0C690E] text-center">
            Client reviews
          </h1>
          <Testimonials />
        </section>
      </Container>
    </main>
  );
}
