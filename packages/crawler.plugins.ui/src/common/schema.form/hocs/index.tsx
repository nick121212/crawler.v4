
import { hocFactory } from "fx-schema-form-react";
import ExtraFieldHoc from "./field";
import TargetHoc from "./target";
import ExtraTempHoc from "./temp";
import OptHoc from "./opt";

export default {
    extraField: ExtraFieldHoc.bind(ExtraFieldHoc, hocFactory),
    target: TargetHoc.bind(TargetHoc, hocFactory),
    extraTemp: ExtraTempHoc.bind(ExtraTempHoc, hocFactory),
    opt: OptHoc.bind(OptHoc, hocFactory),
};

