import { Worker } from "worker_threads";
const start = performance.now();

const reserves = {
  reserve0: BigInt("1617318106716892672"),
  reserve1: BigInt("71895699157593336"),
  blockNumber: 18561987,
};

const amountInOut = BigInt("1122340000000000000");
const numThreads = 2; // Adjust based on your CPU
const opsPerThread = 10000000000000 / numThreads;

interface WorkerWithIsDone extends Worker {
  isDone?: boolean;
}
const workers: WorkerWithIsDone[] = [];

for (let i = 0; i < numThreads; i++) {
  const worker: WorkerWithIsDone = new Worker("./dist/worker.js", {
    workerData: {
      start: i * opsPerThread,
      end: (i + 1) * opsPerThread,
      amountInOut,
      reserves,
    },
  });

  console.log(`Worker ${i} started`);

  worker.on("message", (msg) => {
    console.log(`Worker ${i} finished: ${msg}`);
    (worker as WorkerWithIsDone).isDone = true;
    if (workers.every((w: WorkerWithIsDone) => w.isDone)) {
      const end = performance.now();
      console.log(end - start + "ms");
    }
  });

  worker.on("error", (err) => {
    console.error(err);
  });

  worker.on("exit", (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });

  worker.isDone = false;
  worker.on("message", (msg) => {
    if (msg === "done") {
      worker.isDone = true;
    }
  });
  worker.postMessage("start");
  workers.push(worker);
}
