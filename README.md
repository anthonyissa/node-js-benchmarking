# Node Benchmarking

![Alt text](image.png)

Overall v20 is the best to use for speed & compatibility, additionally it's LTS.

## Statistics

Using **v20.0.0**:

- 1 000 000 000 Operations
  Without Threads: 900ms
  2 Threads: CRASH (maps are huge)
  8 Threads: Too long
  NO RESULT RETURNED + NO MAP / ARRAY & using threads: 250ms

- 10 000 000 Operations
  Without Threads: 20ms
  8 Threads: 16000ms
  2 Threads: 24000ms

- 1 000 000 Operations
  Without Threads: 10ms
  8 Threads: 950ms

v21.0.0 doesn't make that much of a difference using threads.

v19.8.1, v18.9.0, v16.17.0 so < v20.0.0 too long, not interesting.

## Threads

Divide logic and operations. For example functions are in another file to avoid useless memory usage on each iteration.

The structure should be like so:

WorkerPool/Manager.ts -> Creates Workers / divides in threads
Worker.ts -> Worker logic
...Logic.ts -> Files that contains functions to be called

### WorkerPool / Manager

```TS
// Create the thread
const worker = new Worker("WORKER_PATH.js", {
    workerData, // Contains data needed by the worker
  });

worker.on("error", (err) => {
    console.error(err);
  });

worker.on("exit", (code) => {
    if (code !== 0)
      console.error(new Error(`Worker stopped with exit code ${code}`));
  });

worker.on("message", (result) => {
    // Handle results
  });
```

### Worker

```TS
import { parentPort, workerData } from "worker_threads";

const { whatever } = workerData; // Sent when creating the worker

// Add logic of what needs to be done by the thread

// Return the result, will be caught by worker.on("message")
parentPort.postMessage({
  result
});

```

### GPU

Not interesting, creates a lot of incompatibility issues because needs to instantiate a new kernel to execute things on GPU.
