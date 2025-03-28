const logError = (message, details) => {
  console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, details !== undefined ? details : '');
};
const logInfo = (message, details) => {
  console.log(`[INFO] ${new Date().toISOString()}: ${message}`, details !== undefined ? details : '');
};
const logWarn = (message, details) => {
  console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, details !== undefined ? details : '');
};
const logDebug = (message, details) => {
  // Only log debug messages if needed, e.g., based on an env variable
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`, details !== undefined ? details : '');
  }
};
module.exports = { logError, logInfo, logWarn, logDebug };
