export async function register() {
  console.log("[instrumentation.node.ts] register");
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  console.log("[instrumentation.node.ts] bootstrap newrelic");
  await import("newrelic");
}
