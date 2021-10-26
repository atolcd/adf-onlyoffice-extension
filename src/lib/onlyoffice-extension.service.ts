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
import { Injectable, Renderer2, ElementRef } from "@angular/core";
import {
  MinimalNodeEntryEntity,
  WebscriptApi
} from "@alfresco/js-api";
import { Router, NavigationEnd } from "@angular/router";
import { AlfrescoApiService, TranslationService, NodesApiService } from "@alfresco/adf-core";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import {
  AppStore,
  ReloadDocumentListAction,
  SnackbarInfoAction,
  SnackbarErrorAction,
} from "@alfresco/aca-shared/store";
@Injectable({
  providedIn: "root"
})
export class OnlyofficeExtensionService {
  static DATA_URL =
    "/parashift/onlyoffice/prepare?nodeRef=workspace://SpacesStore/";
  private contentId: string;
  private web: WebscriptApi;
  renderer: Renderer2;
  onlyofficePlaceholder: ElementRef;

  private previousUrl: string;
  private currentUrl: string;

  constructor(
    private router: Router,
    private apiService: AlfrescoApiService,
    private titleService: Title,
    private store: Store<AppStore>,
    private translationService: TranslationService,
    private nodeService: NodesApiService
  ) {

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  onEdit(node: MinimalNodeEntryEntity): void {
    if (node.nodeType == "cm:content") {
      this.contentId = node.id;
      this.triggerEditOnlyOffice();
    }
  }

  onConvert(node: MinimalNodeEntryEntity): void {
    var successMsg;
    this.translationService
      .get("ONLYOFFICE.CONVERT.SUCCESS")
      .subscribe(translation => {
        successMsg = translation;
      });

    this.web = new WebscriptApi(this.apiService.getInstance());
    this.web.executeWebScript('POST', 'api/actionQueue', { async: false }, 'alfresco', 'service', {
      actionDefinitionName: "onlyoffice-convert",
      actionedUponNode: "workspace://SpacesStore/" + node.id,
      parameterValues: {}
    }).then((response) => {
      if (response.data.status == "success") {
        this.store.dispatch(new SnackbarInfoAction(node.name + " " + successMsg));
        this.store.dispatch(new ReloadDocumentListAction());
      }
    }).catch((error) => {
      this.store.dispatch(new SnackbarErrorAction(error));
    })
  }

  private triggerEditOnlyOffice(): void {
    this.router.navigate(["/onlyoffice", this.contentId]);
  }

  get ContentId() {
    return this.contentId;
  }

  getContentConfig(contentId) {
    this.web = new WebscriptApi(this.apiService.getInstance());
    this.web
      .executeWebScript("GET", OnlyofficeExtensionService.DATA_URL + contentId)
      .then((response: any) => {
        const script = this.renderer.createElement("script");
        script.text =
          'new DocsAPI.DocEditor("placeholder",' +
          JSON.stringify(response.config) +
          ");";
        this.renderer.appendChild(
          this.onlyofficePlaceholder.nativeElement,
          script
        );
        this.titleService.setTitle(response.config.document.title + " - ONLYOFFICE");
      });
  }

  public reloadDocumentWhenSaved() {
    let interval = setInterval(()=>{
      this.nodeService.getNode(this.contentId).subscribe(res=>{
        if (!res.properties["cm:lockType"]){
          clearInterval(interval);
          this.store.dispatch(new ReloadDocumentListAction());
        }
      })
    }, 1000);

    setTimeout(()=>{
      clearInterval(interval);
    }, 10000);
}

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
