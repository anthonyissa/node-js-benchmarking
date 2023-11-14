export function getAmountOut(
  amountIn: bigint,
  reserve0: bigint,
  reserve1: bigint
) {
  const amountInWithfees = amountIn * BigInt(997);
  return (
    (reserve1 * amountInWithfees) / (reserve0 * BigInt(1000) + amountInWithfees)
  );
}

export function getAmountIn(
  amountOut: bigint,
  reserve0: bigint,
  reserve1: bigint
) {
  return (
    (reserve0 * amountOut * BigInt(1000)) /
      ((reserve1 - amountOut) * BigInt(997)) +
    BigInt(1)
  );
}
