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
import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { OnlyofficeExtensionService } from "./onlyoffice-extension.service";
import { AppConfigService } from "@alfresco/adf-core";
import { DOCUMENT } from "@angular/platform-browser";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
export const OO_API_SCRIPT_PATH = "/OfficeWeb/apps/api/documents/api.js";

@Component({
  selector: "lib-onlyoffice-extension",
  templateUrl: "./onlyoffice-edit.html",
  styleUrls: ["./onlyoffice.scss"]
})
export class OnlyofficeExtensionComponent implements OnInit, AfterViewInit {
  public contentId: string;
  @ViewChild("onlyoffice")
  onlyofficePlaceholder: ElementRef;
  exitText: string = "";
  constructor(
    private onlyofficeExtensionService: OnlyofficeExtensionService,
    private appConfigService: AppConfigService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    @Inject(DOCUMENT)
    private _document
  ) {
    onlyofficeExtensionService.renderer = renderer;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.onlyofficeExtensionService.onlyofficePlaceholder = this.onlyofficePlaceholder;
    const script = this.renderer.createElement("script");
    script.type = "text/javascript";
    script.src =
      this.appConfigService.get("onlyOfficeUrl") + OO_API_SCRIPT_PATH;
    script.onload = () => {
      this.onlyofficeExtensionService.getContentConfig(this.contentId);
    };
    this.renderer.appendChild(this._document.head, script);
  }

  close() {
    this.modalService.dismissAll();
  }
}
