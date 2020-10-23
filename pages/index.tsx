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
import { useHotkeys } from "react-hotkeys-hook";
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

const IndexPage = () => {
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

  const { colorMode, toggleColorMode } = useColorMode();

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

  const addCount = (add: number) => {
    setCount((prev) => prev + add);
  };

  useHotkeys(
    "r",
    preventDefaultWrap(() => addCount(10)),
    upOnly
  );
  useHotkeys(
    "ctrl+r",
    preventDefaultWrap(() => addCount(1)),
    downOnly
  );

  useHotkeys(
    "ctrl+e",
    preventDefaultWrap(() => setCount(0)),
    downOnly
  );
  useHotkeys(
    "space",
    preventDefaultWrap(() => setInMag((prev) => Math.max(prev - 1, 0))),
    downOnly
  );
  return (
    <Box m={10}>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <Text fontSize={30}>{inMag}</Text>
      <Button colorScheme="teal" variant="outline" m={2}>
        asdf
      </Button>
      <Button colorScheme="orange" variant="outline" m={2}>
        eeee
      </Button>
      <Box maxWidth={300}>
        <Progress colorScheme="green" height="32px" value={count} />
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
