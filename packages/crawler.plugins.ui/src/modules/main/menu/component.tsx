import React from "react";

import { BaseComponent } from "../../../common/component/base";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { TextField } from "office-ui-fabric-react/lib/TextField";

export class Component extends BaseComponent<any, any> {

    constructor(props, context) {
        super(props, context);
        this.state = { showPanel: false };
    }

    public render() {
        return (
            <FocusZone disabled={false} direction={FocusZoneDirection.bidirectional}>
                <span>Enabled FocusZone: </span>
                <DefaultButton>Button 1</DefaultButton>
                <DefaultButton>Button 2</DefaultButton>
                <TextField value="FocusZone TextField" className="ms-FocusZoneDisabledExample-textField" />
                <DefaultButton>Button 3</DefaultButton>
                <div className="ms-Row">
                    <DefaultButton>Tabbable Element 1</DefaultButton>
                </div>
            </FocusZone>
        );
    }
}

export const ComponentWithHoc = Component;
