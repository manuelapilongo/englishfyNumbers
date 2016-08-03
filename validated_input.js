/*global x, java, Packages*/
"use strict";

module.exports = function (in_num_str) {
    this.at = new Date();
    this.in_type = typeof in_num_str;
    this.num_str = in_num_str.trim();
};
