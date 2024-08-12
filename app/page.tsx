"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Avatar,
  AvatarIcon,
  Input,
  Button,
} from "@nextui-org/react";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { IconSend2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getAllMessages, sendMessage } from "@/utils/supabase/action";
import { Message } from "@/components/message";

export default function Home() {
  const [msgs, setMsgs] = useState<any>([]);
  const [msg, setMsg] = useState<any>("");
  const [inputError, setInputError] = useState<any>({
    invalid: false,
    msg: "",
  });

  useEffect(() => {
    async function fetchMsgs() {
      const msgs = await getAllMessages();
      setMsgs(msgs);
    }
    fetchMsgs();
  }, [setMsgs]);

  function sendMsg(msg: string) {
    if (msg == "" || msg == null) {
      return setInputError({
        invalid: true,
        msg: "Mesaj içeriği boş girilemez.",
      });
    }
    sendMessage(msg);
    setMsgs([...msgs, { content: msg }]);
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
              Buradaki sohbet'e herkes katılabilir.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1">
            <div>
              {msgs.map((e: any, i: number) => {
                return <Message key={i} data={e} />;
              })}
            </div>
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
