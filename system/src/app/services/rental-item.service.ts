import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { roomInfo } from '../shared/models/roomInfo';
import { ROOMINFOGET_URL, ROOMINFORESULT_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class RentalItemService {
  public roomInfos: BehaviorSubject<roomInfo[]> = new BehaviorSubject<
    roomInfo[]
  >([]);
  public roomResults: BehaviorSubject<roomInfo[]> = new BehaviorSubject<
    roomInfo[]
  >([]);

  constructor(private http: HttpClient) {}

  getInfo(): Observable<roomInfo[]> {
    return this.http.get<roomInfo[]>(ROOMINFOGET_URL).pipe(
      tap((result: roomInfo[]) => {
        this.roomInfos.next(result); // 更新 BehaviorSubject 的值
        this.setAllRoom(result); // 保存所有房屋信息到本地存儲
      })
    );
  }

  getRoomResult(
    city: string,
    district: string,
    type: string,
    rent: number
  ): Observable<roomInfo[]> {
    console.log(city,district,type,rent)
    let params = new HttpParams();
    if (city) params = params.set('city', city);
    if (district) params = params.set('district', district);
    if (type) params = params.set('type', type);
    if (rent) params = params.set('rent', rent.toString());
    return this.http.get<roomInfo[]>(ROOMINFORESULT_URL, { params }).pipe(
      tap((result: roomInfo[]) => {
        this.roomResults.next(result); // 更新搜索結果的 BehaviorSubject
        this.setSearchRoom(result); // 保存搜索結果到本地存儲
      })
    );
  }

  getRoomInfos(): Observable<roomInfo[]> {
    return this.roomInfos.asObservable(); // 返回房屋信息的 Observable
  }

  setAllRoom(roomInfos: roomInfo[]): void {
    localStorage.setItem('roomInfo', JSON.stringify(roomInfos)); // 保存所有房屋信息到 localStorage
  }

  setSearchRoom(roomResults: roomInfo[]): void {
    localStorage.setItem('roomResults', JSON.stringify(roomResults)); // 保存搜索結果到 localStorage
  }

  getRoomById(_id: string): roomInfo | undefined {
    const rooms = JSON.parse(
      localStorage.getItem('roomInfo') || '[]'
    ) as roomInfo[];
    return rooms.find((room) => room._id.toString() === _id); // 查找並返回與傳入 _id 匹配的房屋信息
  }
}
