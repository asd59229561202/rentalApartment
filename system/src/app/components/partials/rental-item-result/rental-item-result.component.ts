import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RentalItemService } from '../../../services/rental-item.service';
import { roomInfo } from '../../../shared/models/roomInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-itemm-result',
  templateUrl: './rental-item-result.component.html',
  styleUrls: ['./rental-item-result.component.scss'],
})
export class RentalItemResultComponent implements OnInit, AfterViewInit {
  @ViewChild('holder', { static: false }) holder!: ElementRef;
  
  @Input() result: roomInfo[] = [];
  constructor(private rantelItem: RentalItemService, private router: Router) {}
  navigationState = history.state.result;
  navigationOptions= history.state.option;
  
  ngOnInit(): void {
    console.log(history.state.option)
    if (this.navigationState) {
      this.result = this.navigationState;
    } else {
      this.rantelItem.getInfo().subscribe((e) => {
        this.result = e;
        console.log(e);
      });
    }
    
  }

  ngAfterViewInit(): void {
    this.holder.nativeElement.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      // 確保 target 是 .sortBtn 或者是 sortBtn 的子元素（例如 i 標籤）
      const sortButton = target.closest('.sortBtn') as HTMLElement;
      if (sortButton) {
        this.handleSortClick(sortButton);
      }
    });
  }

  handleSortClick(target: HTMLElement) {
    // 獲取當前點擊的按鈕內的圖標
    const icon = target.querySelector('.arrow-icon') as HTMLElement;

    // 切換 `down` 類別
    if (icon) {
      if (icon.classList.contains('down')) {
        icon.classList.remove('down');
      } else {
        icon.classList.add('down');
      }
    }

    const sortName = target.getAttribute('name');
    if (sortName) {
      console.log(`Sorted by ${sortName}`);
    }
  }
  detail(item: roomInfo) {
    this.router.navigate(['rental-info', item._id]);
  }
}
