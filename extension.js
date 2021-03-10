/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const Mpris = imports.ui.mpris;

const BAD_URL_RX = /^https:\/\/open.spotify.com\//;
const GOOD_URL    = "https://i.scdn.co/";

class Extension {
    constructor() {
    }

    enable() {
        if (this._originalUpdate === undefined) {
            let originalUpdate = this._originalUpdate = Mpris.MediaMessage.prototype["_update"];
            Mpris.MediaMessage.prototype["_update"] = function() {
                if (this._player._trackCoverUrl) {
                    this._player._trackCoverUrl = this._player._trackCoverUrl.replace(BAD_URL_RX, GOOD_URL);
                }
                originalUpdate.call(this);
            }
        }
    }

    disable() {
        if (this._originalUpdate !== undefined) {
            Mpris.MediaMessage.prototype["_update"] = this._originalUpdate;
            this._originalUpdate = undefined;
        }
    }
}

function init() {
    return new Extension();
}
