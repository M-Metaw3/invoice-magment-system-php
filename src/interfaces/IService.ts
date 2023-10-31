// IService.ts
export interface IService {
    // define the methods signatures
    create(data: any): Promise<any>;
    read(query: any): Promise<any>;
    update(id: any, data: any): Promise<any>;
    delete(id: any): Promise<any>;
  }
  