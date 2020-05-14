import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { BoardService } from './board.service';
import { tap, throttleTime } from 'rxjs/operators';

interface Item {
  leftIcon?: string;
  label: string;
  name: string;
  rightIcon?: string;
  tag?: string;
}
@Component({
  selector: 'mien-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {

  luList = [
    { label: '大黑蛋(老大)', name: 'dhd' },
    { label: '小美妞(老二)', name: 'xmn' },
    { label: '小二黑(老三)', name: 'xeh' },
    { label: '小老虎(老四)', name: 'xlh' }
  ];

  originalList = [
    { label: '大黑蛋(老大)', name: 'dhd' },
    { label: '小美妞(老二)', name: 'xmn' },
    { label: '小二黑(老三)', name: 'xeh' },
    { label: '小老虎(老四)', name: 'xlh' }
  ];

  // luList: Array<Item> = [
  //   { label: 'Drift Run', name: 'drift-run' },
  //   { label: 'Plug', name: 'plug' },
  //   { label: 'Plug1', name: 'plug1' },
  //   { label: 'Plug2', name: 'Plug2' },
  //   { label: 'Perforation', name: 'Perforation' },
  // ];
  // originalList: Array<Item> = [
  //   { label: 'Drift Run', name: 'drift-run' },
  //   { label: 'Plug', name: 'plug' },
  //   { label: 'Plug1', name: 'plug1' },
  //   { label: 'Plug2', name: 'Plug2' },
  //   { label: 'Perforation', name: 'Perforation' },
  // ];

  dropItemIndex = -1;
  dragingItemName = '';


  draging = false;
  private _currentDragingItem: Item = null;
  private _fromOutSide = false;
  private _dragingItemIndex = -1;


  private dragover$ = new Subject();
  private _sub = new Subscription();

  // tslint:disable-next-line:variable-name
  constructor(private _bs: BoardService, private _cdr: ChangeDetectorRef) {

    const dragStartSub = this._bs.dragStartFromOutSide$
      .pipe(
        tap((item: Item) => {
          this._currentDragingItem = item;
          this._fromOutSide = true;
          this.draging = true;
        }),
        tap(() => {
          this._cdr.markForCheck();
        })
      )
      .subscribe();

    const dragEndSub = this._bs.dragEndFromOutSide$
      .pipe(
        tap(() => {
          console.error('drag end');
          this.draging = false;
          this.luList = this.originalList;
          this._currentDragingItem = null;
          this._fromOutSide = false;
          this.dropItemIndex = -1;
        }),
        tap(() => {
          this._cdr.markForCheck();
        })
      )
      .subscribe();

    const dragoverSub = this.dragover$.pipe(
      throttleTime(50),
      tap((e: any) => {
        const { clientX, clientY, pageX, pageY, x, y } = e;
        this.checkElement();
        this._bs.updatePleceholderPosition(clientX || pageX || x, clientY || pageY || y);
      })
    ).subscribe();

    this._sub.add(dragStartSub);
    this._sub.add(dragEndSub);
    this._sub.add(dragoverSub);
  }

  ngOnInit(): void {
  }

  ondragstart(e) {
    console.log(e, 'drag start event');
    this.draging = true;
    this._dragingItemIndex = Number(e.target.attributes.index.value);
    this.dropItemIndex = this._dragingItemIndex;
    this.dragingItemName = e.target.attributes.name.value;
    this._currentDragingItem = this.luList[this._dragingItemIndex];

    const img = new Image();
    img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E`;
    e.dataTransfer.setDragImage(img, 0, 0);

    this._bs.appendPlaceholder(this._currentDragingItem.label);
  }


  ondragenter(e) {
    console.log(e, 'drag enter event');
    this.checkElement();
    if (e.target.className === 'items') return;

    const index = Number(e.target.attributes.index.value);
    const copy = [...this.originalList];

    if (this._fromOutSide) {
      copy.splice(index, 0, this._currentDragingItem);
      this.luList = copy;
      this.dropItemIndex = index;
      return;
    }

    if (!e.target.attributes.name) return;
    const name = e.target.attributes.name.value;
    if (name === this.dragingItemName) return;

    const tartgetItem = this.originalList[this._dragingItemIndex];
    copy.splice(this._dragingItemIndex, 1);
    copy.splice(index, 0, tartgetItem);
    this.luList = copy;
    this.dropItemIndex = index;
  }

  ondragover(e) {
    console.log(e, 'drag over event');
    e.preventDefault();
    if (this._fromOutSide) return;
    this.dragover$.next(e);
  }


  ondragleave(e) {
    console.log(e, 'drag leave event');
  }

  ondragexit(e) {
    console.log(e, 'drag exit event');
  }

  ondrop(e) {
    console.log(e, 'drop event');
    this._bs.removePlaceholder();

    this.originalList = this.luList;
    this.dropItemIndex = -1;

    this.draging = false;
    this._fromOutSide = false;
  }

  ondragend(e) {
    console.log(e, 'drag end event');
    this._bs.removePlaceholder();

    this.dropItemIndex = -1;
    this.draging = false;
    this._fromOutSide = false;
  }



  private checkElement() {
    if (!this._fromOutSide) return;
    this._bs.appendPlaceholder(this._currentDragingItem.label);
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
