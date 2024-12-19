/* eslint-disable @typescript-eslint/ban-ts-comment */
import { motion } from "framer-motion";

export const BaseLoader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Loader />
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.5,
      ease: "circIn",
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      {/* @ts-ignore */}
      <motion.div variants={variants} className="h-10 w-1.5 bg-violet-700" />
      {/* @ts-ignore */}
      <motion.div variants={variants} className="h-10 w-1.5 bg-violet-700" />
      {/* @ts-ignore */}
      <motion.div variants={variants} className="h-10 w-1.5 bg-violet-700" />
      {/* @ts-ignore */}
      <motion.div variants={variants} className="h-10 w-1.5 bg-violet-700" />
      {/* @ts-ignore */}
      <motion.div variants={variants} className="h-10 w-1.5 bg-violet-700" />
    </motion.div>
  );
};

export default Loader;