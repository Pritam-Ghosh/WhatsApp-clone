import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquareText, Plus, SendHorizontal } from "lucide-react";
import { db } from "../../firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

function ChatWindow() {
  const [msg, setMsg] = useState("");
  const [secondUser, setSecondUser] = useState();
  const [msgList, setMsgList] = useState([]);
  const { userData } = useAuth();
  const params = useParams();
  const reciverId = params?.chatid;

  const chatId =
    userData?.id > reciverId
      ? `${userData.id}-${reciverId}`
      : `${reciverId}-${userData?.id}`;

  const handleSendMsg = async () => {
    if (msg) {
      console.log("Sending message:", msg); // Debug log
      const date = new Date();
      const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      try {
        if (msgList?.length === 0) {
          console.log("Starting a new chat");
          await setDoc(doc(db, "user-chat", chatId), {
            chatId: chatId,
            message: [
              {
                text: msg,
                time: timeStamp,
                sender: userData.id,
                receiver: reciverId,
              },
            ],
          });
        } else {
          console.log("Updating existing chat");
          await updateDoc(doc(db, "user-chat", chatId), {
            chatId: chatId,
            message: arrayUnion({
              text: msg,
              time: timeStamp,
              sender: userData.id,
              receiver: reciverId,
            }),
          });
        }
        console.log("Message sent successfully");
        setMsg(""); // Clear input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", reciverId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Second User:", docSnap.data());
        setSecondUser(docSnap.data());
      }
    };

    getUser();

    const msgUnsubscribe = onSnapshot(
      doc(db, "user-chat", chatId),
      (docSnapshot) => {
        setMsgList(docSnapshot.data()?.message || []);
      }
    );

    return () => {
      msgUnsubscribe();
    };
  }, [reciverId, chatId]);

  // Empty screen for no chat selected
  if (!reciverId) {
    return (
      <section className="w-[70vw] h-full flex flex-col gap-4 items-center justify-center">
        <MessageSquareText
          className="w-28 h-28 text-gray-400"
          strokeWidth={1.2}
        />
        <p className="text-gray-400">
          Select any contact to
          <br />
          start a chat with
        </p>
      </section>
    );
  }

  // Chat screen
  return (
    <section className="w-[70vw] h-full flex flex-col gap-4 items-center justify-center">
      <div className="h-full w-full bg-chat-bg flex flex-col">
        {/* Topbar */}
        <div className="bg-background flex items-center gap-2 shadow-sm py-2 px-2">
          <img
            src={
              secondUser?.profilePhoto ||
              "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            }
            className="w-9 h-9 rounded-full object-cover"
            alt=""
          />
          <h3>{secondUser?.name}</h3>
        </div>

        {/* Message list */}
        <div className="flex flex-grow flex-col gap-12 p-6 bg-red-100 overflow-y-auto">
          {msgList?.map((m, index) => (
            <div
              key={index}
              data-sender={m.sender === userData.id}
              className="bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light"
            >
              <p>{m?.text}</p>
              <p className="text-xs text-neutral-500 text-end">{m?.time}</p>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="flex items-center bg-background py-3 px-6 gap-6">
          <Plus />
          <input
            type="text"
            className="w-full py-2 px-4 rounded focus:outline-none"
            placeholder="Type a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMsg();
              }
            }}
          />
          <button
            className="hover:bg-gray-400 px-4 py-2 rounded-sm"
            onClick={handleSendMsg}
          >
            <SendHorizontal />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatWindow;
