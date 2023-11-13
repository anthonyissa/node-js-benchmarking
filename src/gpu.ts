import { GPU } from "gpu.js";
const gpu = new GPU();

const benchmarkTest = gpu
  .createKernel(function () {
    function getAmountOut(
      amountIn: number,
      reserve0: number,
      reserve1: number
    ) {
      const amountInWithFees = amountIn * 997;
      return (
        (reserve1 * amountInWithFees) / (reserve0 * 1000 + amountInWithFees)
      );
    }

    function getAmountIn(
      amountOut: number,
      reserve0: number,
      reserve1: number
    ) {
      return (reserve0 * amountOut * 1000) / ((reserve1 - amountOut) * 997) + 1;
    }

    // Convert your BigInt values to appropriate GPU.js-compatible types
    const reserve0 = 1617318106716892672;
    const reserve1 = 71895699157593336;
    const amountInOut = 1122340000000000000;

    let amount = 1;
    for (let i = 0; i < 1000000; i++) {
      amount = amount + 1;
      getAmountOut(amountInOut, reserve0, reserve1);
      getAmountIn(amountInOut, reserve0, reserve1);
    }
  })
  .setOutput([1]);

benchmarkTest();
