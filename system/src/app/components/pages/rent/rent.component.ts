import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { city_sample, type ,price, room , floor} from '../../../../data';
import { roomInfo } from '../../../shared/models/roomInfo';
import { RentalItemService } from '../../../services/rental-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss',
})
export class RentComponent implements OnInit, AfterViewInit {
  city: TreeNode<string>[] = city_sample;
  type: string[] = type;
  price: TreeNode<string>[] = price
  room: TreeNode<string>[] = room
  floor: TreeNode<string>[] = floor
  
  searchForm!: FormGroup;
  selectedNodes: any;
  ccity: string | undefined;
  ishidden = true;
  resultItem : roomInfo[] = []
  constructor(private fb: FormBuilder,private rental:RentalItemService,private router: Router) {}

  ngOnInit(): void {
    this.resultItem = history.state.result || [];
    this.searchForm = this.fb.group({
      searchBar: [''],
      searchCity: [''],
      searchType: [''],
      serachPrice: [''],
      serachRoom: [''],
      serachFloor: [''],
    });
  }

  ngAfterViewInit(): void {
    const element = document.getElementById('short_rent');
    if (element) {
      element.addEventListener('click', (e: any) => {
        if (e.target.classList.contains('btn')) {
          this.ishidden = false;
          console.log('some event content here...');
          
        }
      });
    }
  }
  onSubmit(): void {
    const { searchCity, searchType, searchPrice } = this.searchForm.value;
  
    // 確保 searchCity 存在且為數組
    if (searchCity && Array.isArray(searchCity)) {
      // 獲取選中的主要城市（假設選中的節點具有 parent 屬性）
      

      const selectedCityNode = searchCity.find(node => node.parent ); // 找到主要城市的節點
      const selectedCity = selectedCityNode ? selectedCityNode.parent.label : ''; // 提取城市名稱
       // 取得主要城市名稱
       const selectedDistricts = searchCity
       .filter(node => !node.children) // 過濾掉父節點，僅選擇子節點
       .map(node => node.data); // 提取區域的 data 屬性
      // 獲取選中的區域
     
      
      const query:any = {
        city:selectedCity,
        distinct:selectedDistricts.join(','),
        searchType,
        searchPrice
      }
      
      // 呼叫 API 或其他邏輯
      this.rental
        .getRoomResult(selectedCity, selectedDistricts.join(','), searchType, searchPrice)
        .subscribe((result) => {
          this.resultItem = result;
  
          // 導航到結果頁面，並將結果數據通過狀態傳遞
          this.router.navigate(['/rent/result'], {
            state: { result: this.resultItem , option:query},
          });
        });
    } else {
      console.error('searchCity or its properties are undefined.');
    }
  }
}
