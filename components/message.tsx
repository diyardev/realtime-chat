import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Avatar, AvatarIcon, Code } from "@nextui-org/react";

export const Message = (msg: any) => {
  return (
    <div className="flex items-center">
      <Avatar
        icon={<AvatarIcon />}
        size="sm"
        classNames={{
          base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
          icon: "text-black/80",
        }}
      />
      <div className="relative ml-2 max-w-80 rounded-lg text-white">
        <Code
          size="sm"
          className="max-w-[100%]"
          style={{ whiteSpace: "normal" }}
        >
         {msg.data.content}
        </Code>
      </div>
    </div>
  );
};
