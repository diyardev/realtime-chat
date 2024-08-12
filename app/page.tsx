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
} from "@nextui-org/react";
import { IconSend2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import { getAllMessages, sendMessage } from "@/utils/supabase/action";
import { Message } from "@/components/message";
import { supabase } from "@/utils/supabase/server";

export default function Home() {
  const [msgs, setMsgs] = useState<any>([]);
  const [refreshMessages, setRefreshMessages] = useState<any>();
  const [msg, setMsg] = useState<any>("");
  const [inputError, setInputError] = useState<any>({
    invalid: false,
    msg: "",
  });


  const [ip, setIp] = useState('');

  useEffect(() => {
    fetch('/api/get-ip')
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error(err));
  }, []);



  function fetchAllMessages() {
    const messagesUpdated = async (payload: any) => {
      const newMsg = payload.new;
      const oldMsg = payload.old;
      const event = payload.eventType;
      if (event === "INSERT") {
        setMsgs((prevMsg: any) => [...prevMsg, newMsg]);
      } else if (event === "UPDATE") {
        setMsgs((prevMsg: any) => {
          return prevMsg.map((msg: any) => (msg.id === oldMsg.id ? newMsg : msg));
        });
      } else if (event === "DELETE") {
        setMsgs((prevMsg: any[]) =>
          prevMsg.filter((msg) => msg.id !== oldMsg.id)
        );
      }

      setTimeout(() => {
        const element = document.getElementById("chat-bottom");
        if (element) {
          element.scrollIntoView({ behavior: "smooth",block: "nearest" });
        }
      }, 10);
    };
    supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        messagesUpdated
      )
      .subscribe();
  }
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById("chat-bottom");
      if (element) {
        element.scrollIntoView({ behavior: "auto",block: "nearest" });
      }
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchMsgs() {
      const msgs = await getAllMessages();
      setMsgs(msgs);
    }
    fetchMsgs();
    fetchAllMessages();
  }, [refreshMessages]);

  function sendMsg(msg: string) {
    if (msg == "" || msg == null) {
      return setInputError({
        invalid: true,
        msg: "Mesaj içeriği boş girilemez.",
      });
    }
    sendMessage(msg,ip);
    // setMsgs([...msgs, { content: msg }]);
    setMsg("");
  }

  return (
    <section className="flex justify-center">
      <Card className="w-[50%]">
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
                {msgs?.map((e: any, i: number) => {
                  return <Message ip={ip} key={i} data={e} />;
                })}
                <div id="chat-bottom"></div>
            </ScrollShadow>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
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
        </CardFooter>
      </Card>
    </section>
  );
}
