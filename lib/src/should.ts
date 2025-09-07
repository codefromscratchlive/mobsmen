/**
 * Use this in places where the execution should never reach.
 */
export const should_never_happen = (msg?: string, ...args: any[]): never => {
  console.error(msg, ...args);
  debugger;
  throw new Error(`Should never happen: ${msg}`);
}