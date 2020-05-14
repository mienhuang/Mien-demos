import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Item {
    leftIcon?: string;
    label: string;
    name: string;
    rightIcon?: string;
    tag?: string;
}

@Injectable()

export class BoardService {
    private _element: HTMLElement;
    private _dragStart = new Subject();
    private _dragEnd = new Subject();


    dragStartFromOutSide$ = this._dragStart.asObservable();
    dragEndFromOutSide$ = this._dragEnd.asObservable();

    constructor() {

    }

    dragStart(dragingItem: Item) {
        this._dragStart.next(dragingItem);
        this.appendPlaceholder(dragingItem.label);
    }

    dragEnd() {
        this._dragEnd.next();
        this.removePlaceholder();
    }

    appendPlaceholder(label: string) {
        if (this._element) return;
        this._element = document.createElement(`div`);
        this._element.className = 'drag-item decision-tree-drag-item';
        const innerElement = document.createElement('div');
        innerElement.className = 'inner';
        const newContent = document.createTextNode(label);
        innerElement.appendChild(newContent);
        this._element.appendChild(innerElement);
        document.body.appendChild(this._element);
    }

    removePlaceholder() {
        if (!this._element) return;
        document.body.removeChild(this._element);
        this._element = null;
    }

    updatePleceholderPosition(left: number, top: number) {
        this._element.setAttribute('style', `left: ${left - 60}px; top: ${top - 30}px;`);
    }
}
