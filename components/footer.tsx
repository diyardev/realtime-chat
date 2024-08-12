"use client";
import React from "react";

import { Button } from "@nextui-org/button";
import { Card, CardFooter, Image } from "@nextui-org/react";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTypescript,
} from "@tabler/icons-react";
export const Footer = () => {
  return (
    <footer className="w-full mb-5 flex items-center justify-center py-10">
      <div className="grid grid-cols-1">
        <div>
          <h4 className="text-md font-light mb-5">powered by</h4>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            <Card isFooterBlurred radius="lg" className="border-none">
              <Image
                alt="Supabase Database"
                className="object-cover"
                height={150}
                src="https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-preview.50e72501.jpg&w=3840&q=75"
                width={150}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Supabase</p>

                <IconBrandSupabase />
              </CardFooter>
            </Card>

            <Card isFooterBlurred radius="lg" className="border-none">
              <Image
                alt="NextJS Framework"
                className="object-cover"
                height={150}
                src="https://media.licdn.com/dms/image/D5612AQHcVOJUkwEkAg/article-cover_image-shrink_600_2000/0/1717017852330?e=2147483647&v=beta&t=RX0aP63vygO9_dWShxUvSqklixcpxHJCckUNlMSj82M"
                width={150}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Nextjs</p>

                <IconBrandNextjs />
              </CardFooter>
            </Card>
            <Card isFooterBlurred radius="lg" className="border-none">
              <Image
                alt="Next UI Library"
                className="object-cover"
                height={150}
                src="https://nextui.org/nextui-banner.png"
                width={150}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Next UI</p>

                <IconBrandNextjs />
              </CardFooter>
            </Card>
            <Card isFooterBlurred radius="lg" className="border-none">
              <Image
                alt="React JS"
                className="object-cover"
                height={150}
                src="https://www.rentallscript.com/resources/content/images/2021/09/React--1-.gif"
                width={150}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Reactjs</p>

                <IconBrandReact />
              </CardFooter>
            </Card>
            <Card isFooterBlurred radius="lg" className="border-none">
              <Image
                alt="Typescript"
                className="object-cover"
                height={150}
                src="https://blog.teamtreehouse.com/wp-content/uploads/2015/05/typescript.png"
                width={150}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Typescript</p>

                <IconBrandTypescript />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </footer>
  );
};
