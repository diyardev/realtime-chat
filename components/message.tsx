import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Avatar, AvatarIcon, Code, Tooltip } from "@nextui-org/react";
import { IconLetterD, IconSpy } from "@tabler/icons-react";

export const Message = (msg: any) => {
  const myIp = msg.ip;
  const nextMsg = msg.allMessages[msg.msgIndex - 1];
  var sameUser = false;
  if (nextMsg?.ip && myIp == nextMsg.ip) {
    sameUser = true;
  }

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
      <div className={`flex  ${sameUser && "mt-3"} items-center`}>
        <Avatar
          icon={<IconSpy />}
          size="sm"
          classNames={{
            base: `${sameUser ? "" : "invisible"} bg-gradient-to-br from-[#1069C8] to-[#A93EDC]`,
            icon: "text-black/80",
          }}
        />

        <div className="block ml-2 max-w-80 rounded-lg text-white">
        {sameUser && (
          <p className="font-light text-sm">{msg.data.ip_names?.name}</p>
          )}
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
        className={`flex flex-row-reverse ${!sameUser && "mt-3"} items-center`}
      >
        <Avatar
          icon={<AvatarIcon />}
          size="md"
          classNames={{
            base: `${sameUser && "invisible"} bg-gradient-to-br from-[#FFB457] to-[#FF705B]`,
            icon: "text-black/80",
          }}
        />

        <div className="block mr-2 max-w-80 rounded-lg text-white">
          {sameUser == false && (
            <p className="text-right mt-[-15px] font-light text-sm">
              {msg.data.ip_names?.name}
            </p>
          )}

          <div className="my-1">
            <Code
              size="sm"
              className="max-w-[100%]"
              style={{ whiteSpace: "normal", float: "right" }}
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
