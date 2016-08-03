/*global x, java, Packages*/
"use strict";

module.exports = function (in_props) {

    function isNumeric (props) {
        props.float_num = parseFloat(props.num_str);
        props.is_numeric = !isNaN(props.float_num) && isFinite(props.num_str);
    }

    function setSign (props) {
        props.sign = props.is_numeric ? (
            props.float_num ? (props.float_num < 0 ? -1 : 1) : 
                              (props.float_num === props.float_num ? 0 : NaN)
        ) : NaN;
    }

    function absValue (props) {
        props.abs_value = Math.abs(props.float_num);
    }

    function isDecimal (props) {
        var split = props.num_str.split(".");
        props.is_decimal = (props.float_num % 1) !== 0;
        props.decimal_pos = props.num_str.indexOf('.');
        props.int_part = split[0];
        props.decimal_part = split[1];

        if (!props.is_decimal && props.decimal_pos !== -1) {
            props.int_part = split[0];
        }
        if (!props.is_decimal && props.decimal_pos === -1) {
            props.int_part = props.float_num;
        }
    }

    function init (props) {

        isNumeric(props);

        setSign(props);

        absValue(props);

        isDecimal(props);

    }

    init(in_props);

};
