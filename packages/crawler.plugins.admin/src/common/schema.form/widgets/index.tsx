import { AntdInputWidget } from "./input";
import { AntdCheckboxWidget } from "./checkbox";
import { AntdSwitchWidget } from "./switch";
import { NullWidget } from "./null";
import { AntdInputNumberWidget } from "./number";
import { WallInfoWidget } from "./wall.info";
import { WallDetailInfoWidget } from "./wall.detail.info";

export default {
    input: AntdInputWidget,
    string: AntdInputWidget,
    checkbox: AntdCheckboxWidget,
    boolean: AntdSwitchWidget,
    switch: AntdSwitchWidget,
    null: NullWidget,
    number: AntdInputNumberWidget,
    wallInfo: WallInfoWidget,
    wallDetailInfo: WallDetailInfoWidget
};
