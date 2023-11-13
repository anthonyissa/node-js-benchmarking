import { parentPort } from "worker_threads";

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

parentPort?.postMessage("done");

parentPort?.on("message", (data) => {
  const { start, end, amountInOut, reserves } = data;
  for (let i = start; i < end; i++) {
    const reservesCopy = {
      reserve0: reserves.reserve0,
      reserve1: reserves.reserve1,
    };

    getAmountOut(amountInOut, reservesCopy.reserve0, reservesCopy.reserve1);
    getAmountIn(amountInOut, reservesCopy.reserve0, reservesCopy.reserve1);
  }
  parentPort?.postMessage("done");
});

parentPort?.on("error", (err) => {
  console.error(err);
});

parentPort?.on("close", () => {
  console.log("Worker closed");
});
