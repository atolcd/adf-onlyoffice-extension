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
export const mode = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "edit",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "edit",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "edit",
  "text/plain": "edit",
  "text/csv": "edit",
  "application/vnd.ms-excel": "convert",
  "application/vnd.ms-powerpoint": "convert",
  "application/msword": "convert",
  "application/vnd.oasis.opendocument.spreadsheet": "convert",
  "application/vnd.oasis.opendocument.presentation": "convert",
  "application/vnd.oasis.opendocument.text": "convert"
};

export function getMode(key: string): string {
  return mode[key];
}