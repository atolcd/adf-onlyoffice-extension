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
import { RuleContext } from "@alfresco/adf-extensions";
import { getMode } from "./utils";

export function canUseOnlyOfficeExtension(context: RuleContext): boolean {
  if (
    context.navigation &&
    context.navigation.url &&
    context.navigation.url.startsWith("/trashcan")
  ) {
    return false;
  }

  if (!context || !context.selection) {
    return false;
  }
  const { file } = context.selection;

  if (!file || !file.entry) {
    return false;
  }

  if (file.entry.isLocked) {
    return false;
  }
  return true;
}

export function canOpenWithOnlyoffice(context: RuleContext): boolean {
  if (canUseOnlyOfficeExtension(context)) {
    const { file } = context.selection
    if (!file.entry.content.mimeType || !getMode(file.entry.content.mimeType)) {
      return false;
    } else if (getMode(file.entry.content.mimeType) == "edit") {
      if (file.entry.properties) {
        if (
          file.entry.properties["cm:lockType"] === "WRITE_LOCK" ||
          file.entry.properties["cm:lockType"] === "READ_ONLY_LOCK"
        ) {
          if (file.entry.properties["onlyoffice:editing-hash"]) {
            return context.permissions.check(context.selection.file, ['update']);
          } else {
            return false;
          }
        }
      }
      return context.permissions.check(context.selection.file, ['update']);
    } else return false;
  }
}

export function canConvertWithOnlyOffice(context: RuleContext): boolean {
  if (canUseOnlyOfficeExtension(context)) {
    const { file } = context.selection;

    if (!file.entry.content.mimeType || !getMode(file.entry.content.mimeType)) {
      return false;
    } else if (getMode(file.entry.content.mimeType) == "convert") {
      return context.permissions.check(context.selection.file, ['update']);
    } else return false;
  }
}
