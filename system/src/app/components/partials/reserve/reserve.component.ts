import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
})
export class ReserveComponent implements OnInit,  AfterViewInit{
  constructor() {}
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    // 在視圖初始化後進行 DOM 操作
    this.updateActiveState();
    
    // 添加 change 事件處理器
    document.querySelectorAll<HTMLInputElement>('.r-radio-button__input').forEach(input => {
      input.addEventListener('change', () => {
        this.updateActiveState();
      });
    });
  }

  private updateActiveState(): void {
    // 移除所有 .r-radio-button__wrapper 的 'active' 類
    document.querySelectorAll('.r-radio-button__wrapper').forEach(wrapper => {
      wrapper.classList.remove('active');
    });

    // 為選中的 .r-radio-button__wrapper 添加 'active' 類
    document.querySelectorAll<HTMLInputElement>('.r-radio-button__input').forEach(input => {
      if ((input as HTMLInputElement).checked) {
        const wrapper = (input as HTMLInputElement).closest('.r-radio-button__wrapper');
        if (wrapper) {
          wrapper.classList.add('active');
        }
      }
    });
  }
}
