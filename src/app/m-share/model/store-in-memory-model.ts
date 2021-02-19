export class StoreInMemoryModel {
  private static list = new Map<string, any>();
  private static deviceDetector = new Map<string, any>();

  get(key: string): any {
      return StoreInMemoryModel.list.get(key);
  }
  set(key: string, data: any): void {
      StoreInMemoryModel.list.set(key, data);
  }

  getDeviceInfo(key: string): any {
    return StoreInMemoryModel.deviceDetector.get(key);
  }
  setDeviceInfo(key: string, data: any): void {
      StoreInMemoryModel.deviceDetector.set(key, data);
  }


}
