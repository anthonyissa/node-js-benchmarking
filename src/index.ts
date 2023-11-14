const start = performance.now();

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

const reserves = {
  reserve0: BigInt("1617318106716892672"),
  reserve1: BigInt("71895699157593336"),
  blockNumber: 18561987,
};

// 1,12234n*10n**18n
const amountInOut = BigInt("1122340000000000000");
let amount = 1;
for (let i = 0; i < 1000000000; i++) {
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
