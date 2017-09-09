import React from "react";
import { utils, BaseWidget, IUiSchema, ICommonChildProps } from "react-schema-form-antd";
import { Radio, DatePicker, AutoComplete, Button, Input, Icon } from "antd";

interface IProps extends ICommonChildProps {

}

interface IState {
    dataSource: any;
    value: any;
    text: String;
    clearValue: boolean;
    loading: boolean;
}

export class AutocompleteWidget extends BaseWidget<IProps, IState> {
    constructor(props, context) {
        super(props, context);
    }

    public setDefaultProps() {
        const { uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        const { value = undefined, text = undefined, loading = false } = this.state || {};
        const defaultValue = this.getFieldValue();
        const changeProp = uiSchema["ui:change"] || "onChange";

        let props: any = {};

        if (defaultValue) {
            props.defaultValue = defaultValue.toString();
        }
        if (value) {
            props.value = value.toString();
        }

        props[changeProp] = this.handleChange.bind(this);

        if (props.hasOwnProperty("value")) {
            delete props.defaultValue;
        }

        console.log(this.state);

        return props;
    }

    public handleChange(value) {
        const { uiSchema, arrayIndex, handleTrigger, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });


        if ((uiSchema as IUiSchema).schema.type === "number") {
            value = value * 1;
        }

        if (value === this.getFieldValue()) {
            return;
        }

        this.triggerEvent(["change"].concat(keys), keys, value, uiSchema);
    }

    public render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, formEvent, form, triggerProps, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { autocomplete = {} } = options.widget || {};
        let { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        let { dataSource = [], text = "", loading = false } = this.state || {};

        if (dataSource.length) {
            titleMap = dataSource;
        }

        return (
            <AutoComplete
                className="global-search"
                dataSource={titleMap as any}
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                optionLabelProp="label"
                {...triggerProps as Object}
                {...this.setDefaultProps() }
                {...autocomplete}>
                <Input
                    suffix={(
                        <Button className="search-btn" size="small" ghost={true}>
                            <Icon type="search" />
                        </Button>
                    )}
                />
            </AutoComplete>
        );
    }
}
