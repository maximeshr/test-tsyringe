import { singleton } from "tsyringe";

export interface ICache {
  get(key: string): undefined | string;
  set(key: string, value: string): void;
}

// Define this module as a singleton
// It's stored directly in the container
// Interface definition is not mandatory at all!
@singleton()
class Cache implements ICache {
  private map: Map<string, string>;

  constructor() {
    this.map = new Map<string, string>();
  }

  public get(key: string): undefined | string {
    return this.map.get(key);
  }

  public set(key: string, value: string): void {
    this.map.set(key, value);
  }
}

export default Cache;
