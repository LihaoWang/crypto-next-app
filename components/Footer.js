import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

function Footer() {
  return (
    <div className="text-white flex flex-col justify-center items-center pt-16">
      <h1 className="text-2xl font-bold text-neutral-400">Xchange 2.0</h1>
      <div className="flex flex-row gap-5 mt-5 text-neutral-400">
        <a href="#">FAQ</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div className="text-2xl flex flex-row gap-5 text-neutral-400 mt-5">
        <a
          className="  bg-neutral-800 p-2 rounded-full"
          href="https://github.com/LihaoWang"
        >
          <AiFillGithub />
        </a>
        <a
          className=" bg-neutral-800 p-2 rounded-full "
          href="https://www.linkedin.com/in/lihaowang98"
        >
          <AiFillLinkedin />
        </a>
        <a
          className=" bg-neutral-800 p-2 rounded-full "
          href="https://www.instagram.com/llleowang/"
        >
          <AiFillInstagram />
        </a>
      </div>
    </div>
  );
}

export default Footer;
