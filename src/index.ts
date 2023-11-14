import { getAmountIn, getAmountOut } from "./functions";

const start = performance.now();

const reserves = {
  reserve0: BigInt("1617318106716892672"),
  reserve1: BigInt("71895699157593336"),
  blockNumber: 18561987,
};

// 1,12234n*10n**18n
const amountInOut = BigInt("1122340000000000000");
let amount = 1;
for (let i = 0; i < 10000000; i++) {
  amount = amount + 1;

  const reservesCopy = {
    reserve0: reserves.reserve0,
    reserve1: reserves.reserve1,
  };

  getAmountOut(amountInOut, reservesCopy.reserve0, reservesCopy.reserve1);
  getAmountIn(amountInOut, reservesCopy.reserve0, reservesCopy.reserve1);
}

const end = performance.now();
console.log(end - start + "ms");
