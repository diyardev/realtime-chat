"use client";
import React, { useState } from "react";

import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconBrandFramerMotion,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandSupabase,
  IconBrandTypescript,
  IconLetterS,
  IconSwipeRight,
} from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const list = [
  {
    title: "Real Time Chat",
    img: "/realtime.gif",
  },
  {
    title: "Message Swipe And Reply Feature",
    img: "/reply.gif",
  },
  {
    title: "Message Send Sound",
    img: "/msg-send.gif",
  },
  {
    title: "Message Arrived Sound",
    img: "/msg-arrived.gif",
  },
  {
    title: "Swearing and Empty Message Blocking Feature",
    img: "/kufur-bos.gif",
  },
];

export const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImg, setModalImg] = useState();
  const [modalTitle, setModalTitle] = useState();

  function modalHandleOpen(title: any, img: any) {
    setModalImg(img);
    setModalTitle(title);
    onOpen();
  }
  return (
    <footer className="w-full mb-5  py-10">
      <div className="container px-10 mx-auto">
        <h4 className="text-md text-center font-light mb-5">features</h4>
        <section className="mb-20 ">
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            spaceBetween={15}
            grabCursor={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {list.map((item, index) => (
              <SwiperSlide key={index}>
                <Card className="py-4">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {item.title}
                    </p>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      onClick={() => {
                        modalHandleOpen(item.title, item.img);
                      }}
                      alt={item.title}
                      className="hover:cursor-pointer object-cover rounded-xl"
                      src={item.img}
                      width={270}
                    />
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          <Modal size="xl" backdrop="blur" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {modalTitle}
                  </ModalHeader>
                  <ModalBody>
                    <Image
                      alt={modalTitle}
                      className="object-cover rounded-xl"
                      src={modalImg}
                      width={800}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Kapat
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </section>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1">
          <div className="order-2">
            <h4 className="text-md text-center  font-light mb-5">powered by</h4>
          </div>
          <div className="order-3">
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
                  alt="Framer Motion"
                  className="object-cover"
                  height={150}
                  src="https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frjdzd6dl83cdqxmvqpvr.png"
                  width={150}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Framer Motion</p>

                  <IconBrandFramerMotion />
                </CardFooter>
              </Card>

              <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                  alt="Swiper Slider"
                  className="object-cover"
                  height={150}
                  src="https://cdn.cangokceaslan.com/swiper_cae5da2dda.png"
                  width={150}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Swiper Slider</p>

                  <IconLetterS fontWeight="light" />
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
      </div>
    </footer>
  );
};
