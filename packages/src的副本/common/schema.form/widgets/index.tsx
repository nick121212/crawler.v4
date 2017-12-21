import { AntdInputWidget } from "./input";
import { AntdCheckboxWidget } from "./checkbox";
import { AntdSwitchWidget } from "./switch";
import { NullWidget } from "./null";
import { AntdInputNumberWidget } from "./number";

export default {
    input: AntdInputWidget,
    string: AntdInputWidget,
    checkbox: AntdCheckboxWidget,
    boolean: AntdSwitchWidget,
    switch: AntdSwitchWidget,
    null: NullWidget,
    number: AntdInputNumberWidget
};
