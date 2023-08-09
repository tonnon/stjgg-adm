"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

import logo from "@/public/logo.png";
import Login from "./components/Login";

export default function Home() {
  const [vantaEffect, setVandaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVandaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minWidth: 200.0,
          scale: 0.5,
          scaleMobile: 1.0,
          color: 0xe6ae22,
          backgroundColor: 0xe5e5e5,
          points: 13.0,
          maxDistance: 21.0,
          spacing: 13.0,
          showDots: false,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <Main ref={vantaRef}>
        <Box>
          <LogoContainer>
            <Image src={logo} alt="logotipo" width={50} />
          </LogoContainer>
          <Login />
        </Box>
      </Main>
    </>
  );
}

const Main = styled.main`
  height: 100vh;
`;

const Box = styled.div`
  max-width: 300px;
  width: 80%;
  padding: 20px 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(229, 229, 229, 0.8)
  );
  border-radius: 5px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: transparent;
  > img {
    background-color: transparent;
  }
`;
