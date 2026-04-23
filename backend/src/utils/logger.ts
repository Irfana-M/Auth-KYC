const logger = {
  info: (message: string) =>
    console.log(`[INFO] ${new Date().toISOString()} ${message}`),

  error: (message: string, error?: unknown) => {
    if (error instanceof Error) {
      console.error(
        `[ERROR] ${new Date().toISOString()} ${message} - ${error.message}`
      );
    } else {
      console.error(
        `[ERROR] ${new Date().toISOString()} ${message}`,
        error ?? ''
      );
    }
  },
};

export default logger;