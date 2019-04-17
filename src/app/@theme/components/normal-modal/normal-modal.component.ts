import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-normal-modal',
  templateUrl: './normal-modal.component.html',
  styleUrls: ['./normal-modal.component.scss']
})
export class NormalModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  modalHeader: string = "";
  modalContent1: string = "";
  modalContent2: string = "";
  modalContent3: string = "";
  modalSmall: string = "";
  modalTitle1: string = "";
  modalTitle2: string = "";

  content_font_weight: number = 400;
  content_color: string = '#585959';

  ngOnInit() {
  }
  close() {
    this.activeModal.close()
  }
}
