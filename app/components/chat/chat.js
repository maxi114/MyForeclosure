"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import LanguageDropdown from "../language";
import { ThreeDot } from "react-loading-indicators";
import css from "./chat.module.css"

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Tina. MyForeClosure's support assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; // Don't send empty messages
    setIsLoading(true);

    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <section
        className="gradient-custom"
        style={{
          background:
            "linear-gradient(to bottom,#f1efe7, #f8eab3)",
          borderRadius: "10px",
          minWidth: '350px',
          margin: 'auto'
        }}
      >
        <div className="container py-5">
          <div className="row" style={{display: 'flex', flexDirection:'column', maxWidth:'400px'}}>
            {/* Member List */}
            <div className="">
             {/* <h5 className="font-weight-bold mb-3 text-center text-white">
                You are speaking to Tina our AI assisant
              </h5>*/}
              <div className="card mask-custom">
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    <li
                      className="p-2 border-bottom"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,.3)",
                        position: "relative",
                      }}
                    >
                      <div className="d-flex justify-content-between link-light">
                        <div className="d-flex flex-row">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                          />
                          <div className="pt-1">
                            <p className="fw-bold mb-0 text-black">Tina</p>

                            <p className="small text-black">Representative</p>
                          </div>
                        </div>
                        <div className="pt-1">
                          {/*<p className="small text-black mb-1">Just now</p>*/}
                          {/*<LanguageDropdown />*/}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <br/>
            {/* Chat Messages */}

            <div className="">
              <ul
                className={`list-unstyled text-white ${css.ul}`}
                style={{
                  border: "solid 1px whitesmoke",
                  borderRadius: "10px",
                  padding: "20px",
                  maxHeight: "400px",
                  overflow: "auto",
                }}
              >
                {messages.map((message, index) =>
                  (message.role === "assistant") & (message.content === "") ? (
                    <div key={index}>
                      <ThreeDot
                        color="white"
                        size="small"
                        text=""
                        textColor=""
                      />
                      <br />
                    </div>
                  ) : (
                    <li
                      key={index}
                      className={`d-flex justify-content-left mb-4 w-75 ${
                        message.role === "assistant"
                          ? "ms-auto"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className="card mask-custom"
                        style={{ border: "none ", minWidth:'100px' }}
                      >
                        <div
                          className="card-header d-flex justify-content-between p-3"
                          style={{
                            border: "1px solid black",
                            backgroundColor: "black",
                          }}
                        >
                          <p className="fw-bold text-white mb-0">
                            {message.role === "assistant" ? "Tina" : "You"}
                          </p>
                         {/*} <p className="text-white small mb-0">
                            <i
                              className="far fa-clock text-white"
                              style={{ paddingLeft: "10px" }}
                            ></i>{" "}
                            12 mins ago
                          </p>*/}
                        </div>
                        <div className="card-body">
                          <p className="mb-0">{message.content}</p>
                        </div>
                      </div>
                    </li>
                  )
                )}
                 <div ref={messagesEndRef} />
              </ul>

              <div className="mb-3">
                <div className="form-outline form-white">
                  <textarea
                    className="form-control"
                    id="textAreaExample3"
                    rows="4"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // Prevents a new line from being added
                        sendMessage();
                      }
                    }}
                  ></textarea>
                  <br />
                  <label
                    className="form-label text-black"
                    htmlFor="textAreaExample3"
                  ></label>
                  <button
                    type="button"
                    className="btn btn-light btn-lg btn-rounded float-end"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/*-----------------------end of chat messages-------*/}
          </div>
        </div>
      </section>
      {/*
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
      */}
    </div>
  );
}
