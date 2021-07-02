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
import { NgModule } from "@angular/core";
import { OnlyofficeExtensionComponent } from "./onlyoffice-extension.component";
import { EffectsModule } from "@ngrx/effects";
import { OOEffects } from "./effects/onlyoffice.effects";
import { RouterModule } from "@angular/router";
import { OO_ROUTES } from "./onlyoffice.routes";
import { OnlyofficeExtensionService } from "./onlyoffice-extension.service";
import { ExtensionService, provideExtensionConfig } from "@alfresco/adf-extensions";
import { canOpenWithOnlyoffice, canConvertWithOnlyOffice } from "./evaluators";
import { ModalContainerComponent } from "./modal-container.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  TRANSLATION_PROVIDER,
  TranslateLoaderService
} from "@alfresco/adf-core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

@NgModule({
  declarations: [OnlyofficeExtensionComponent, ModalContainerComponent],
  imports: [
    EffectsModule.forFeature([OOEffects]),
    RouterModule.forRoot(OO_ROUTES),
    NgbModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
    })
  ],
  entryComponents: [OnlyofficeExtensionComponent],
  exports: [OnlyofficeExtensionComponent, ModalContainerComponent],
  providers: [
    OnlyofficeExtensionService,
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: "onlyoffice-extension",
        source: "assets/onlyoffice-extension"
      }
    },
    provideExtensionConfig(['onlyoffice.plugin.json'])
  ]
})
export class OnlyofficeExtensionModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
      "onlyoffice.component": OnlyofficeExtensionComponent,
      "modal-container.component": ModalContainerComponent
    });
    extensions.setEvaluators({
      "onlyoffice.canOpenWithOnlyOffice": canOpenWithOnlyoffice,
      "onlyoffice.canConvertWithOnlyOffice": canConvertWithOnlyOffice
    });
  }
}
