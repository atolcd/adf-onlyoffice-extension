/*
 * Copyright (C) 2020 Atol Conseils et Développements.
 * http://www.atolcd.com/
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { OnlyofficeExtensionComponent } from "./onlyoffice-extension.component";
import { OnlyofficeExtensionService } from "./onlyoffice-extension.service";
import { Store } from "@ngrx/store";
import { AppStore, ReloadDocumentListAction, SnackbarInfoAction } from "@alfresco/aca-shared/store";
import { AlfrescoApiService, TranslationService } from "@alfresco/adf-core";

@Component({
  selector: "lib-modal-container",
  template: "",
  styleUrls: ["./modal-container.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalContainerComponent implements OnDestroy {
  destroy$ = new Subject<any>();
  currentDialog: NgbModalRef = null;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private service: OnlyofficeExtensionService,
    private store: Store<AppStore>,
    private apiService: AlfrescoApiService,
    private translationService: TranslationService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.currentDialog.dismiss();
      }
    });

    var successMsg;
    this.translationService.get("ONLYOFFICE.EDIT.SUCCESS").subscribe((translation) => {
      successMsg = translation;
    });

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      let options: NgbModalOptions = {
        size: "lg",
        windowClass: "onlyoffice-modal"
      };

      this.currentDialog = this.modalService.open(OnlyofficeExtensionComponent, options);
      let id = params.contentId;
      this.currentDialog.componentInstance.contentId = id;

      this.currentDialog.result.then(
        (result) => {
          this.router.navigateByUrl(this.service.getPreviousUrl());
          this.store.dispatch(new SnackbarInfoAction(successMsg));
          this.unlockNode(id);
        },
        (reason) => {
          this.router.navigateByUrl(this.service.getPreviousUrl());
          this.store.dispatch(new SnackbarInfoAction(successMsg));
          this.unlockNode(id);
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  unlockNode(id) {
    this.apiService
      .getInstance()
      .ecmClient.callApi("nodes/" + id + "/unlock", "POST", {}, {}, {}, {}, {}, ["application/json"], ["application/json"])
      .then((response) => {
        this.store.dispatch(new ReloadDocumentListAction());
      })
      .catch((error) => {
        this.store.dispatch(new ReloadDocumentListAction());
      });
  }
}
