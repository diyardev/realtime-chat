import { useState } from "react";
import { Avatar, AvatarIcon, Code, Tooltip } from "@nextui-org/react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const Message = (msg: any) => {
  const x = useMotionValue(0);
  const myIp = msg.ip;
  const nextMsg = msg.allMessages[msg.msgIndex - 1];
  var sameUser = false;
  if (nextMsg && msg.data.ip == nextMsg?.ip) {
    sameUser = true;
  }
  const [replyID, setReplyID] = useState(0);

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
      <div
        className={`flex  ${sameUser === false && "mt-6 md:mt-3"} items-center`}
      >
        <Avatar
          icon={<AvatarIcon />}
          size="md"
          classNames={{
            base: `${sameUser && "invisible"} bg-gradient-to-br from-[#1069C8] to-[#A93EDC]`,
            icon: "text-black/80",
          }}
        />

        <div
          style={{ maxWidth: "70%" }}
          className="block ml-2 rounded-lg text-white"
        >
          {sameUser == false && (
            <p className="ml-1 font-light text-sm">{msg.data.ip_names?.name}</p>
          )}
          <div style={{ marginTop: "5px" }}>
            <motion.div className="example-container">
              <motion.div
                onDragEnd={(event, info) => {
                  if (info.point.x > 0 && info.point.x <= 750)
                    setReplyID(msg.data.id);
                }}
                className="box"
                style={{ x }}
                drag="x"
                dragElastic={{ right: 0.5, left: 0 }}
                dragConstraints={{ right: 0, left: 0 }}
              >
                <Code
                  size="sm"
                  className="max-w-[100%]"
                  style={{ whiteSpace: "normal" }}
                >
                  <Tooltip content={msgDate}>{msg.data.content}</Tooltip>
                </Code>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  function MyMsgComp() {
    return (
      <div
        style={{ width: "100%" }}
        className={`flex flex-row-reverse ${!sameUser && "mt-6 md:mt-3"} items-center`}
      >
        <Avatar
          icon={<AvatarIcon />}
          size="md"
          classNames={{
            base: `${sameUser && "invisible"} bg-gradient-to-br from-[#FFB457] to-[#FF705B]`,
            icon: "text-black/80",
          }}
        />

        <div
          style={{ maxWidth: "70%" }}
          className="block mr-2 rounded-lg text-white"
        >
          {sameUser == false && (
            <p className="text-right  font-light text-sm">
              {msg.data.ip_names?.name}
            </p>
          )}

          <div style={{ marginTop: "5px", touchAction: "none" }}>
            <motion.div className="example-container">
              <motion.div
                onDragEnd={(event, info) =>
                  console.log(info.point.x, info.point.y)
                }
                className="box"
                style={{ x }}
                drag="x"
                dragElastic={{ right: 0, left: 0.5 }}
                dragConstraints={{ right: 0, left: 0 }}
              >
                <Code
                  size="sm"
                  className="max-w-[100%]"
                  style={{ whiteSpace: "normal", float: "right" }}
                >
                  <Tooltip content={msgDate}>{msg.data.content}</Tooltip>
                </Code>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return <>{msg.data.ip == myIp ? <MyMsgComp /> : <UserMsgComp />}</>;
};
