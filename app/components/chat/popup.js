"use client";
import React from "react";
import Popup from "reactjs-popup";
import Chat from "./chat";
import css from "./popup.module.css";
import { motion } from "framer-motion";
import { fadeIn, staggerChildren } from "../../lib/motion";

export default function Popupp() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      style={{
        height: "100vh",
        position: "relative",
      }}
    >
      <Popup
        Width="300px"
        trigger={
          <motion.div
          variants={fadeIn("up", "tween", 0.5, 1)}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              width: "400px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <i
              className="ri ri-chat-3-line"
              style={{ width: "150px" }}
              src="ri ri-chat-3-line"
              alt="Description of image"
            />
          </motion.div>
        }
        position="top left"
      >
        <Chat />
      </Popup>
    </motion.div>
  );
}
