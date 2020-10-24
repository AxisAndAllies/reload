import Link from "next/link";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Text,
  Progress,
  Flex,
  Tag,
  useColorMode,
} from "@chakra-ui/core";
import { useHotkeys, useIsHotkeyPressed } from "react-hotkeys-hook";
import useInterval from "use-interval";
import { useState, useEffect } from "react";

// import create from "zustand";

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }));

const downOnly = {
  keydown: true,
  keyup: false,
};
const upOnly = {
  keydown: false,
  keyup: true,
};
const preventDefaultWrap = (fn: () => void) => (event: KeyboardEvent) => {
  fn();
  event.preventDefault();
};

const ReloadStages = {
  PICK_NEW: "PICK_NEW",
  EJECT_OLD: "EJECT_OLD",
  TAKE_OUT_OLD: "TAKE_OUT_OLD",
  PUT_IN_NEW: "PUT_IN_NEW",
  STORE_OLD: "STORE_OLD",
  SLIDE_ACTION: "SLIDE_ACTION",
};

const BaseStageTimes = {
  PICK_NEW: 600,
  EJECT_OLD: 300,
  TAKE_OUT_OLD: 800,
  PUT_IN_NEW: 1000,
  STORE_OLD: 500,
  SLIDE_ACTION: 500,
};

/**
 *
 * tactical reload = pick new + take out old + put in new + store old = 600+800+1000+500 =2900
 * speed reload = pick new + eject old + put in new = 600+300+1000 = 1800
 * NOTE: having no round in chamber (totally empty) requires you to slide action, adding 500 ms
 *
 */

const IndexPage = () => {
  // const { colorMode, toggleColorMode } = useColorMode();

  // <Layout title="Home | Next.js + TypeScript Example">
  //   <h1>Hello Next.js 👋</h1>
  //   <p>
  //     <Link href="/about">
  //       <a>About</a>
  //     </Link>
  //   </p>
  // </Layout>
  const MAG_MAX = 9;
  const [count, setCount] = useState(0);
  const [inMag, setInMag] = useState(MAG_MAX);
  const [mags, setMags] = useState([MAG_MAX, MAG_MAX, MAG_MAX, MAG_MAX]);

  const isPressed = useIsHotkeyPressed();

  const addCount = (add: number) => {
    setCount((prev) => (prev > 0 ? prev + add : prev));
  };

  useHotkeys(
    "ctrl+e",
    preventDefaultWrap(() => setCount(1))
  );
  useInterval(() => {
    if (isPressed("r") && !isPressed("ctrl")) {
      addCount(1);
    }
  }, 20);

  // useHotkeys(
  //   "r",
  //   preventDefaultWrap(() => addCount(1)),
  //   downOnly
  // );

  // useHotkeys(
  //   "ctrl+t",
  //   preventDefaultWrap(() => setCount(0)),
  //   downOnly
  // );
  useHotkeys(
    "space",
    preventDefaultWrap(() => setInMag((prev) => Math.max(prev - 1, 0))),
    downOnly
  );

  useEffect(() => {
    if (count >= 100) {
      setCount(0);
      setInMag(MAG_MAX);
      console.log("reloaded");
    }
    console.log(count);
  }, [count]);

  useEffect(() => {
    if (inMag === 0) {
      console.log("mag empty");
    }
  }, [inMag]);

  return (
    <Box m={10}>
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button> */}
      <Text fontSize={30}>{inMag}</Text>
      <Button colorScheme="teal" variant="outline" m={2}>
        asdf
      </Button>
      <Button colorScheme="orange" variant="outline" m={2}>
        eeee
      </Button>
      <Box maxWidth={300}>
        <Progress colorScheme="green" height="32px" value={count} />
        <Text>{count}</Text>
      </Box>
      <Flex>
        {mags.map((mag) => (
          <Box m={2}>
            <Tag fontSize={20}>{mag}</Tag>
          </Box>
        ))}
      </Flex>
      <Text></Text>
    </Box>
  );
};

export default IndexPage;
