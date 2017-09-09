import { widgetFactory } from "react-schema-form-antd";

// import { SelectWidget } from "./select";
import { RadiosWidget } from "./radios";
import { DatePickerWidget } from "./datepicker";
// import { AutocompleteWidget } from "./autocomplete";

widgetFactory.add("radios", RadiosWidget as any);
widgetFactory.add("datepicker", DatePickerWidget as any);

console.log(widgetFactory);
