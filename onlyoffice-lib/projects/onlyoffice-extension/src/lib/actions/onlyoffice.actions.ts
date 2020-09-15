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
import { Action } from '@ngrx/store';
import { MinimalNodeEntryEntity } from '@alfresco/js-api';

export const OO_EDIT = "OO_EDIT";
export const OO_CONVERT = "OO_CONVERT";

export class OOEdit implements Action {
  readonly type = OO_EDIT;
  constructor(public payload: MinimalNodeEntryEntity) {}
}

export class OOConvert implements Action {
  readonly type = OO_CONVERT;
  constructor(public payload: MinimalNodeEntryEntity) {}
}
