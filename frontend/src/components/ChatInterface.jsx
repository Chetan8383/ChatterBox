import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatInterface = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenToMessages,
    stoplistenToMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    listenToMessages();
    return () => stoplistenToMessages();
  }, [selectedUser._id, getMessages, listenToMessages, stoplistenToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 max-h-[calc(70vh+5rem)] flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/*  */}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                {(
                  message.senderId === authUser?._id
                    ? authUser?.profilepic
                    : selectedUser?.profilepic
                ) ? (
                  <img
                    src={
                      message.senderId === authUser?._id
                        ? authUser?.profilepic
                        : selectedUser?.profilepic
                    }
                    alt="profile pic"
                    className="size-30 object-cover rounded-full"
                  />
                ) : (
                  <div className="size-10 flex items-center justify-center bg-gray-500 text-white font-medium rounded-full">
                    {message.senderId === authUser?._id
                      ? authUser?.fullname?.includes(" ")
                        ? authUser.fullname
                            .split(" ")
                            .map((name) => name.charAt(0))
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : authUser?.fullname?.charAt(0).toUpperCase()
                      : selectedUser?.fullname?.includes(" ")
                      ? selectedUser.fullname
                          .split(" ")
                          .map((name) => name.charAt(0))
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : selectedUser?.fullname?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {new Date(message.createdAt).toLocaleString("en-IN", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}

              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}

        {/*  */}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatInterface;
