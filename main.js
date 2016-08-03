/*global arguments,*/
"use strict";

var local_args = this.arguments || [],
    ValidatedInput = require("./validated_input"),
    Validate = require("./validate"),
    ToEnglish = require("./to_english"),
    validated_input = new ValidatedInput(local_args.pop()),
    step_1 = new Validate(validated_input),
    step_2 = new ToEnglish(validated_input),
    invalid_answ = [
        "Don't be that guy, trying invalid numbers...",
        "Come on...",
        "Don't play with me!",
        "Are you kidding?",
        "Try Google before wasting my time",
        "Learn some maths!"
    ];

if (this.arguments[1] === true) {

    print(JSON.stringify(validated_input, null, 4));

} else {

    print("\nAnd the number is ...drumroll...\n\n" + validated_input.englishified + "\n");

    if (!validated_input.is_numeric) {

        print(invalid_answ[Math.floor(Math.random() * invalid_answ.length)]);

    }
}


