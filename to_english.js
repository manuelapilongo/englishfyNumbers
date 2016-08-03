/*global arguments, Exception*/
"use strict";

var ValidatedInput = require("./validated_input");

module.exports = function (validated_input) {
    if (!(validated_input instanceof Object) || !(validated_input instanceof ValidatedInput)) {
        throw "Not ValidatedInput type";
    }
    //https://en.wikipedia.org/wiki/English_numerals
    var cardinal_number = {
         0: "zero",
         1: "one",
         2: "two",
         3: "three",
         4: "four",
         5: "five",
         6: "six",
         7: "seven",
         8: "eight",
         9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        40: "forty",
    }, names = {
        0: "",
        2: "hundred",
        3: "thousand",
        6: "million",
        9: "billion",
       12: "trillion",
    };

    function englishifyPart_minortwenty (number, validated_input, part_id) {
        if (number < 20) {
            validated_input.englishified.push(cardinal_number[number]);
        }
    }

    function englishifyPart_minorUndredMajorTenZeroEnding (number, validated_input, part_id) {
        var str;

        if (number > 10 && number < 100 && (number % 10) === 0) {

            if (cardinal_number[number]) { //20, 40
                str = cardinal_number[number];
            } else {
                str = cardinal_number[10 + (number / 10)].replace("een", "y");
            }

            validated_input.englishified.push(str);
        }
    }

    function englishifyPart_minorUndredNormalCases (number, validated_input, part_id) {
        var str = String(number);
        if (number > 20 && number < 100 && (number % 10) !== 0) {
            englishifyPart_minorUndredMajorTenZeroEnding(str[0] * 10, validated_input, part_id);
            validated_input.englishified.push("-");
            englishifyPart_minortwenty(str[1], validated_input, part_id);
        }
    }

    function englishifyPart_minorhundred (number, validated_input, part_id) {
        englishifyPart_minortwenty(number, validated_input, part_id);
        englishifyPart_minorUndredMajorTenZeroEnding(number, validated_input, part_id);
        englishifyPart_minorUndredNormalCases(number, validated_input, part_id);
    }

    function englishifyPart_majorhundred (number, validated_input, part_id) {
        var str = String(number),
            length = str.length,
            exp,
            pos,
            local_str_number;

        for (pos = 0; pos < length; pos+=1) {
            local_str_number = "";
            exp = (length - 1) - pos;

            if ((exp > 2 &&  names[exp]) || exp === 0) {
                if (str[pos - 2] > 0) {
                    local_str_number = Number(str[pos - 2]);
                    englishifyPart_minortwenty(local_str_number, validated_input, part_id);
                    validated_input.englishified.push(" " + names[2] + " ");
                }

                if (str[pos - 1] > 0) {
                    local_str_number = str[pos - 1] + str[pos];
                } else {
                    local_str_number = str[pos];
                }

                if (exp > 2 || exp === 0) {
                    if (Number(local_str_number) > 0) { //skip 0, 00
                        englishifyPart_minorhundred(Number(local_str_number), validated_input, part_id);
                    }
                    validated_input.englishified.push(" " + names[exp] + " ");
                }
            }
        }
    }

    function englishifyPart (validated_input, part_id) {
        var number = validated_input[part_id];
        englishifyPart_minorhundred(number, validated_input, part_id);
        englishifyPart_majorhundred(number, validated_input, part_id);
    }

    function toCleanString (str_arr) {
        return str_arr.join('').replace(/\s\s+/g, ' ').trim();
    }

    function englishify (validated_input) {
        validated_input.englishified = [];

        if (validated_input.is_numeric) {
            if (validated_input.sign === -1) {
                validated_input.englishified.push("negative ");
            }
            englishifyPart(validated_input, "int_part");

            if (validated_input.is_decimal) {
                validated_input.englishified.push(" point ");
                englishifyPart(validated_input, "decimal_part");
            }

            validated_input.englishified = toCleanString(validated_input.englishified);
        }

    }

    englishify(validated_input);

};
