class Logger {
  private areTestsRunning(): boolean {
    return process.env.NODE_ENV === "test";
  }

  public info(...args: any[]) {
    if (!this.areTestsRunning()) {
      console.info(...args);
    }
  }

  public debug(...args: any[]) {
    if (!this.areTestsRunning()) {
      console.debug(...args);
    }
  }

  public error(...args: any[]) {
    if (!this.areTestsRunning()) {
      console.debug(...args);
    }
  }
}

export default Logger;
