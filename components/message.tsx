import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Avatar, AvatarIcon, Code, Tooltip } from "@nextui-org/react";

export const Message = (msg: any) => {
  const myIp = msg.ip;

  const msgDate = new Date(msg.data.created_at).toLocaleTimeString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  

  function UserMsgComp() {
    return (
      <div className="flex my-3 items-center">
        <Avatar
          icon={<AvatarIcon />}
          size="sm"
          classNames={{
            base: "bg-gradient-to-br from-[#1069C8] to-[#A93EDC]",
            icon: "text-black/80",
          }}
        />
        <div className="block ml-2 max-w-80 rounded-lg text-white">
          <div className="my-1">
            <Code
              size="sm"
              className="max-w-[100%]"
              style={{ whiteSpace: "normal" }}
            >
              <Tooltip content={msgDate}>{msg.data.content}</Tooltip>
            </Code>
          </div>
        </div>
      </div>
    );
  }

  function MyMsgComp() {
    return (
      <div
        style={{ width: "100%" }}
        className="flex flex-row-reverse my-3 items-center"
      >
        <Avatar
          icon={<AvatarIcon />}
          size="sm"
          classNames={{
            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
            icon: "text-black/80",
          }}
        />
        <div className="block mr-2 max-w-80 rounded-lg text-white">
          <div className="my-1">
            <Code
              size="sm"
              className="max-w-[100%]"
              style={{ whiteSpace: "normal" }}
            >
              <Tooltip content={msgDate}>{msg.data.content}</Tooltip>
            </Code>
          </div>
        </div>
      </div>
    );
  }

  return <>{msg.data.ip == myIp ? <MyMsgComp /> : <UserMsgComp />}</>;
};
