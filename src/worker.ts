import { parentPort, workerData } from "worker_threads";
import { getAmountIn, getAmountOut } from "./functions";

const { start, end, amountInOut, reserves } = workerData;
const totalOut: Map<number, bigint> = new Map();
const totalIn: Map<number, bigint> = new Map();
for (let i = start; i < end; i++) {
  const reservesCopy = {
    reserve0: reserves.reserve0,
    reserve1: reserves.reserve1,
  };

  totalOut.set(
    i,
    getAmountOut(amountInOut, reservesCopy.reserve0, reservesCopy.reserve1)
  );
  totalIn.set(
    i,
    getAmountIn(amountInOut, reservesCopy.reserve0, reservesCopy.reserve1)
  );
}

console.log("done");
parentPort?.postMessage({
  totalOut,
  totalIn,
});
