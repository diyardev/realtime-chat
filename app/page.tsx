/* eslint-disable padding-line-between-statements */
"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  Button,
  ScrollShadow,
  Code,
} from "@nextui-org/react";
import { IconArrowForward, IconSend2, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import {
  getAllMessages,
  getIpNameRequest,
  sendMessage,
} from "@/utils/supabase/action";
import { Message } from "@/components/message";
import { supabase } from "@/utils/supabase/server";
import { kufurler } from "@/utils/kufurler";
import LoadingSkeleton from "@/components/loadingSkeleton";

export default function Home() {
  const [msgs, setMsgs] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<any>("");
  const [inputError, setInputError] = useState<any>({
    invalid: false,
    msg: "",
  });

  const [ipValues, setIpValues] = useState({ ip: "", name: "" });
  const [replyMsg, setReplyMsg] = useState({
    id: 0,
    msg: "",
  });


  useEffect(() => {
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => setIpValues({ ip: data.ip, name: data.name?.name }))
      .catch((err) => console.error(err));

    setTimeout(() => {
      const element = document.getElementById("chat-bottom");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 2500);
  }, []);

  useEffect(() => {
    async function fetchMsgs() {
      const msgs = await getAllMessages();
      setMsgs(msgs);
    }
    fetchMsgs();
    setTimeout(() => setLoading(false), 2000);

    const messagesUpdated = async (payload: any) => {
      const newMsg = payload.new;
      const oldMsg = payload.old;
      const event = payload.eventType;
      newMsg.ip_names = await getIpNameRequest(newMsg.ip);
      if (event === "INSERT") {
        if (newMsg.ip_names.ip !== ipValues.ip) {
          const audio = new Audio("/msg-arrived.mp3");
          audio.play();
        }
        setMsgs((prevMsg: any) => [...prevMsg, newMsg]);
      } else if (event === "UPDATE") {
        setMsgs((prevMsg: any) => {
          return prevMsg.map((msg: any) =>
            msg.id === oldMsg.id ? newMsg : msg
          );
        });
      } else if (event === "DELETE") {
        setMsgs((prevMsg: any[]) =>
          prevMsg.filter((msg) => msg.id !== oldMsg.id)
        );
      }
      setTimeout(() => {
        const element = document.getElementById("chat-bottom");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 500);
    };

    supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        messagesUpdated
      )
      .subscribe();
  }, []);

  function sendMsg(msg: string) {
    if (msg == "" || msg == null) {
      return setInputError({
        invalid: true,
        msg: "Mesaj içeriği boş girilemez.",
      });
    }
    if (
      kufurler.some((Word) => ` ${msg.toLowerCase()} `.includes(` ${Word} `))
    ) {
      return setInputError({
        invalid: true,
        msg: "Küfür yasak..",
      });
    }

    const audio = new Audio("/msg-send.mp3");
    audio.play();

    sendMessage(msg, ipValues.ip, ipValues.name,replyMsg);
    setMsg("");
  }

  return (
    <section className="flex justify-center">
      <Card className="lg:w-[50%]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Global Chat</p>
            <p className="text-small text-default-500">
              Buradaki sohbet&apos;e herkes katılabilir.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1">
            <ScrollShadow
              hideScrollBar
              offset={100}
              size={150}
              className="w-100 h-[400px]"
            >
              {loading ? (
                <LoadingSkeleton />
              ) : (
                msgs?.map((e: any, i: any) => {
                  return (
                    <Message
                      msgIndex={i}
                      onReplyIDChange={setReplyMsg}
                      allMessages={msgs}
                      ip={ipValues.ip}
                      key={i}
                      data={e}
                    />
                  );
                })
              )}

              <div id="chat-bottom"></div>
            </ScrollShadow>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="grid w-full grid-cols-1 gap-2">
            {replyMsg.id > 0 && (
              <div className="flex items-center">
                <IconArrowForward />{" "}
                <Code color="default"> {replyMsg.msg}</Code>
                <Button
                  onClick={() => {
                    setReplyMsg({ id: 0, msg: "" });
                  }}
                  className="ml-2"
                  color="danger"
                  size="sm"
                  isIconOnly
                  aria-label="Delete"
                >
                  <IconX />
                </Button>
              </div>
            )}
            <div>
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMsg(msg);
                  }
                }}
                type="text"
                variant="flat"
                value={msg}
                isInvalid={inputError.invalid}
                errorMessage={inputError.msg}
                classNames={{ inputWrapper: "pr-0" }}
                placeholder="Mesajınız"
                labelPlacement="outside"
                onChange={(e) => {
                  if (inputError.invalid) {
                    setInputError({
                      invalid: false,
                      msg: "",
                    });
                  }
                  setMsg(e.target.value);
                }}
                endContent={
                  <Button
                    onClick={() => {
                      sendMsg(msg);
                    }}
                    variant="flat"
                    color="success"
                    endContent={<IconSend2 size={90} />}
                  >
                    Gönder
                  </Button>
                }
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
