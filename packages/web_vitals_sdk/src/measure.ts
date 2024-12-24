import { EntryType } from "perf_hooks";

let fcp;
let tti;
let lcp;
let cls = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === "first-contentful-paint") {
      fcp = entry.startTime;
      console.log("FCP:", fcp);
    }
  }
}).observe({ type: "paint" as EntryType, buffered: true });
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === "largest-contentful-paint") {
      lcp = entry.startTime;
      console.log("LCP:", lcp);
    }
  }
}).observe({ type: "largest-contentful-paint" as EntryType, buffered: true });
const observer = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === "first-interactive") {
      tti = entry.startTime;
      console.log("TTI:", tti);
    }
  }
});
observer.observe({ type: "navigation" as EntryType, buffered: true });
const clsObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    cls += (entry as any).value;
  }
  console.log("CLS:", cls);
});
clsObserver.observe({ type: "layout-shift" as EntryType, buffered: true });

export { fcp, lcp, tti, cls };
