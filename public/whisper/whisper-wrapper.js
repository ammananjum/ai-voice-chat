export default async function initWasm() {
  console.log('🧪 Fake initWasm called — no real WASM loaded.');
  // Simulate a brief delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {};
}
