import { ipcRenderer } from "electron";
import { IpcRenderChannel } from "@/common";
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export enum LoggerLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error"
}

class Logger {
  private static _logger: Logger;

  public static instance(): Logger {
    if (this._logger === undefined) {
      this._logger = new Logger();
    }
    return this._logger;
  }

  public info(...args: any): void {
    this.logWarn(LoggerLevel.INFO, ...args).then(() => {}).catch(() => {});
  }

  public warn(...args: any): void {
    this.logWarn(LoggerLevel.WARN, ...args).then(() => {}).catch(() => {});
  }

  public error(...args: any): void {
    this.logWarn(LoggerLevel.ERROR, ...args).then(() => {}).catch(() => {});
  }

  private async logWarn(level: LoggerLevel, ...args: any): Promise<void> {
    await ipcRenderer.invoke(IpcRenderChannel.LOGGER_CHANEL, level, ...args);
  }
}

export const LOGGER: Logger = Logger.instance();

export type IpcLoggerFunc = (event: IpcMainInvokeEvent, level: LoggerLevel, ...args: any[]) => (Promise<void>) | (any);
