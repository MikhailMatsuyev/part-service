import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AppConfig {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public apiUrl: string = null;
  public socketUrl: string = null;

  public getData(): any {
    return JSON.parse(JSON.stringify(Object.assign({}, this, { http: '' })));
  }

  public async init(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    const configFile = await this.http.get('assets/config.json').toPromise();
    Object.assign(this, configFile);
  }
}
