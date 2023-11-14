import { parentPort, workerData } from "worker_threads";

function getAmountOut(amountIn: bigint, reserve0: bigint, reserve1: bigint) {
  const amountInWithfees = amountIn * BigInt(997);
  return (
    (reserve1 * amountInWithfees) / (reserve0 * BigInt(1000) + amountInWithfees)
  );
}

function getAmountIn(amountOut: bigint, reserve0: bigint, reserve1: bigint) {
  return (
    (reserve0 * amountOut * BigInt(1000)) /
      ((reserve1 - amountOut) * BigInt(997)) +
    BigInt(1)
  );
}

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
