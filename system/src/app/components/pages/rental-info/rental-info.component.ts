import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalItemService } from '../../../services/rental-item.service';
import { roomInfo } from '../../../shared/models/roomInfo';
import $ from 'jquery';
import 'slick-carousel';

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
  styleUrls: ['./rental-info.component.scss'],
})
export class RentalInfoComponent implements OnInit, AfterViewInit {
  roomItem: roomInfo | undefined;

  constructor(
    private route: ActivatedRoute,
    private rtService: RentalItemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.roomItem = this.rtService.getRoomById(id);
    } else {
      console.error(`房間資訊未找到，ID: ${id}`);
    }
  }

  ngAfterViewInit(): void {
    this.initializeSlick();
  }

  private initializeSlick(): void {
    $('.slider-for').each(function () {
      var slider = $(this);

      slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        variableWidth: false,
        fade: true,
        centerMode: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 650,
            settings: {
              initialSlide: 2,
              slidesToShow: 1,
            },
          },
        ],
        asNavFor: '.slider-nav',
        prevArrow:
          '<i class="arrow-icon-left" style="position: absolute; top: 50%;   color: white; margin-left: 41vw; display: inline-block; width: 10px; height: 10px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(135deg); transition: transform 0.2s ease-in-out; cursor: pointer;"></i>',
        nextArrow:
          '<i class="arrow-icon-right" style="position: absolute; top: 50%;  color: white; margin-left: 41vw; display: inline-block; width: 10px; height: 10px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(305deg); transition: transform 0.2s ease-in-out; cursor: pointer;"></i>',
      });
    });

    $('.slider-nav').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      infinite: true,
      dots: true,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
    });
  }
}
