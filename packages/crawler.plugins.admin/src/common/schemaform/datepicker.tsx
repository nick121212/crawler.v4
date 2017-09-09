import React from "react";
import { utils, BaseWidget, IUiSchema, ICommonChildProps } from "react-schema-form-antd";
import { Radio, DatePicker } from "antd";
import moment, { Moment, Duration } from "moment";

interface IProps extends ICommonChildProps {

}

interface IState {
    dataSource: any;
    value: any;
    text: any;
}

export class DatePickerWidget extends BaseWidget<IProps, IState> {
    constructor(props, context) {
        super(props, context);
    }

    public setDefaultProps() {
        const { uiSchema } = this.props;
        const { titleMap = [], schema = {} } = uiSchema as IUiSchema;
        const { value = undefined, text = undefined } = this.state || {};
        const defaultValue = this.getFieldValue();

        let props: any = {};

        if (defaultValue) {
            props.defaultValue = moment(defaultValue);
        }
        if (value) {
            props.value = moment(value);
        }

        props = Object.assign({}, props);

        if (props.hasOwnProperty("value")) {
            delete props.defaultValue;
        }

        return props;
    }

    public handleChange(value: Duration) {
        const { uiSchema, arrayIndex, handleTrigger, ...extra } = this.props;
        const keys = utils.mergeKeys({ uiSchema, arrayIndex });

        if (value === this.getFieldValue() || !moment.isMoment(value) || !value.isValid()) {
            return;
        }
        this.triggerEvent(["change"].concat(keys), keys, value.toString(), uiSchema);
    }

    public render() {
        const { uiSchema, children, globalOptions, arrayIndex, schemaForm, onChange, formEvent, form, triggerProps, ...extra } = this.props;
        const options = uiSchema["ui:options"] || {}, { datepicker = {} } = options.widget || {};
        let { titleMap = [], schema = {} } = uiSchema as IUiSchema;

        return (
            <DatePicker
                showTime={true}
                disabled={(uiSchema as IUiSchema).readonly}
                placeholder={(uiSchema as tv4.JsonSchema).title}
                format="YYYY-MM-DD"
                onChange={this.handleChange.bind(this)}
                {...triggerProps as Object}
                {...datepicker}
                {...this.setDefaultProps() }
            />
        );
    }
}
