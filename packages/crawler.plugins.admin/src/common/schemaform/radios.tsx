import React from "react";
import { utils, BaseWidget, IUiSchema, ICommonChildProps } from "react-schema-form-antd";
import { Radio } from "antd";

interface IProps extends ICommonChildProps {

}

interface IState {
    dataSource: any;
    value: any;
    text: any;
}

export class RadiosWidget extends BaseWidget<IProps, IState> {
    constructor(props, context) {
        super(props, context);
    }

    public setDefaultProps() {
        const { uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        const { value = undefined, text = undefined } = this.state || {};
        const defaultValue = this.getFieldValue();

        let props: any = {};

        if (defaultValue !== undefined) {
            props.defaultValue = defaultValue;
        }
        if (value !== undefined) {
            props.value = value;
        }

        props = Object.assign({}, props);

        if (props.hasOwnProperty("value")) {
            delete props.defaultValue;
        }

        return props;
    }

    public handleChange(value) {
        const { uiSchema, arrayIndex, handleTrigger, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        if (value === this.getFieldValue()) {
            return;
        }

        this.triggerEvent(["change"].concat(keys), keys, value, uiSchema);
    }

    public render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, formEvent, form, triggerProps, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { radios = {} } = options.widget || {};
        let { titleMap = [], schema = {} } = uiSchema as IUiSchema;

        return (
            <Radio.Group onChange={(e: any) => this.handleChange(e.target.value)} {...radios} {...this.setDefaultProps() } options={titleMap}>
            </Radio.Group>
        );
    }
}
