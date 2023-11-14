import { Worker } from "worker_threads";

const reserves = {
  reserve0: BigInt("1617318106716892672"),
  reserve1: BigInt("71895699157593336"),
  blockNumber: 18561987,
};

const amountInOut = BigInt("1122340000000000000");
const numThreads = 8; // Adjust based on your CPU
const opsPerThread = 1000000000 / numThreads;

interface WorkerWithIsDone extends Worker {
  isDone?: boolean;
}
const workers: WorkerWithIsDone[] = [];

const start = performance.now();
let cpt = 0;
for (let i = 0; i < numThreads; i++) {
  const workerData = {
    start: i * opsPerThread,
    end: (i + 1) * opsPerThread,
    amountInOut,
    reserves,
  };
  const worker: WorkerWithIsDone = new Worker("./dist/worker.js", {
    workerData,
  });
  console.log(`Worker ${i} started`);

  worker.on("error", (err) => {
    console.error(err);
  });

  worker.on("exit", (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });

  worker.isDone = false;
  worker.on("message", (result) => {
    console.log({ result });
    worker.isDone = true;
    cpt++;
    if (cpt === numThreads) {
      const end = performance.now();
      console.log(end - start + "ms");
    }
  });
  worker.postMessage(workerData);
  workers.push(worker);
}
