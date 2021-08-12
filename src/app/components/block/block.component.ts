import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BeerI } from '../../services/beer.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockComponent implements OnInit {

  @Input()  beer!:BeerI;
  

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

}
