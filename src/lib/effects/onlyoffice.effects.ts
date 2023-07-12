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
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { OOEdit, OO_EDIT, OOConvert, OO_CONVERT } from '../actions/onlyoffice.actions';
import { OnlyofficeExtensionService } from '../onlyoffice-extension.service';
import { AlfrescoApiService } from '@alfresco/adf-core';
import { NodeAssociationPaging } from '@alfresco/js-api';

@Injectable()
export class OOEffects {
  constructor(
    private actions$: Actions,
    private onlyofficeExtensionService: OnlyofficeExtensionService,
    private apiService: AlfrescoApiService
  ) {}

  @Effect({ dispatch: false })
  onlyOfficeEdit$ = this.actions$.pipe(
    ofType<OOEdit>(OO_EDIT),
    map(action => {
      if (action.payload) {
        this.apiService
          .getInstance()
          .core.nodesApi.getSourceAssociations(action.payload.id, {
            where: "(assocType=cm:workingcopylink)",
          })
          .then((res: NodeAssociationPaging) => {
            if (res.list.entries.length == 1) {
              this.onlyofficeExtensionService.onEdit(res.list.entries[0].entry);
            } else {
              this.onlyofficeExtensionService.onEdit(action.payload);
            }
          });
      }
    })
  );
  @Effect({ dispatch: false })
  onlyOfficeConvert$ = this.actions$.pipe(
    ofType<OOConvert>(OO_CONVERT),
    map(action => {
      if (action.payload) {
        this.onlyofficeExtensionService.onConvert(action.payload);
      }
    })
  );
}
