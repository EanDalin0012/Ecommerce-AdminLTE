export class StoreInMemoryModel {
  private static map = new Map<string, any>();
  public get(key: string): any {
      return StoreInMemoryModel.map.get(key);
  }
  public set(key: string, data: any): void {
      StoreInMemoryModel.map.set(key, data);
  }

}
