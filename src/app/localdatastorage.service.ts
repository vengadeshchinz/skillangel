import { Inject, Injectable  } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class LocaldatastorageService {


  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public setdata(keypara: string, valuepara: string): void {
     this.storage.set(keypara, valuepara);
   }
  public getdata(keypara: string): string {
      return this.storage.get(keypara);
  }

}
