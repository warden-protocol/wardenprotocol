export function logInfo(message: string) {
  console.log(`[INFO at <${new Date().toISOString()}>]: ${message}`);
}

export function logWarning(message: string) {
  console.warn(`[WARNING at <${new Date().toISOString()}>]: ${message}`);
}

export function logError(message: string) {
  console.error(`[ERROR at <${new Date().toISOString()}>]: ${message}`);
}
