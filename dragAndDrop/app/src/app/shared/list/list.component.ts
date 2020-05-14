import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mien-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list = [
    { label: '大黑蛋(老大)', name: 'dhd', id: 1 },
    { label: '小美妞(老二)', name: 'xmn', id: 2 },
    { label: '小二黑(老三)', name: 'xeh', id: 3 },
    { label: '小老虎(老四)', name: 'xlh', id: 4 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
