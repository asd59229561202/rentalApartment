import { Component, OnInit } from '@angular/core';
import { city_sample } from '../../../../data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { RentalItemService } from '../../../services/rental-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { roomInfo } from '../../../shared/models/roomInfo';
@Component({
  selector: 'app-searchBar',
  templateUrl: './searchBar.component.html',
  styleUrl: './searchBar.component.scss',
})
export class searchBarComponent implements OnInit {
  city: TreeNode<string>[] = city_sample;
  type: string[] = [
    '整層住家',
    '獨立套房',
    '分租套房',
    '分租雅房',
    '雅房',
    '店面',
    '住辦',
    '商用',
    '廠房',
    '車位',
    '土地',
  ];
  price: TreeNode<string>[] = [
    {
      label: '5000元以下',
      data: '0_5000',
    },
    {
      label: '5000元 - 10000元',
      data: '5000_10000',
    },
    {
      label: '10000元 - 20000元',
      data: '10000_20000',
    },
    {
      label: '20000元以上',
      data: '20000_100000',
    },
  ];
  result: roomInfo[] = [];
  searchForm!: FormGroup;
  selectedNodes: any;

  constructor(
    private fb: FormBuilder,
    private rental: RentalItemService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.city);

    this.searchForm = this.fb.group({
      searchBar: [''],
      searchCity: [''],
      searchType: [''],
      searchPrice: [''],
    });
  }
  onSubmit(): void {
    const { searchCity, searchType, searchPrice } = this.searchForm.value;

    // 確保 searchCity 存在且為數組
    if (searchCity && Array.isArray(searchCity)) {
      // 獲取選中的主要城市（假設選中的節點具有 parent 屬性）

      const selectedCityNode = searchCity.find((node) => node.parent); // 找到主要城市的節點
      const selectedCity = selectedCityNode
        ? selectedCityNode.parent.label
        : ''; // 提取城市名稱
      // 取得主要城市名稱
      const selectedDistricts = searchCity
        .filter((node) => !node.children) // 過濾掉父節點，僅選擇子節點
        .map((node) => node.data); // 提取區域的 data 屬性
      // 獲取選中的區域
      const query: any = {
        city: selectedCity,
        distinct: selectedDistricts.join(','),
        searchType,
        searchPrice,
      };
      

      // 呼叫 API 或其他邏輯
      this.rental
        .getRoomResult(
          selectedCity,
          selectedDistricts.join(','),
          searchType,
          searchPrice
        )
        .subscribe((result) => {
          this.result = result;

          // 導航到結果頁面，並將結果數據通過狀態傳遞
          this.router.navigate(['/rent/result'], {
            state: { result: this.result, option: query },
          });
        });
    } else {
      console.error('searchCity or its properties are undefined.');
    }
  }
}
