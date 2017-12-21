import React from "react";
import { SchemaForm } from "fx-schema-form-react";
import classNames from "classnames";

import { BaseComponent, TileGroup, Tile } from "../../../common/component";
import { DesignProps, schema, uiSchema, globalOptions, schemaKey } from "./constant";
import { schemaFormOptions } from "../../../common/schema.form/index";
import { hoc } from "./container";

export class Component extends BaseComponent<DesignProps, any> {
    public render() {
        let { theme } = this.context;

        return (
            <div className={classNames("h-100 overflow-auto")}>
                <SchemaForm schemaKey={schemaKey}
                    key={schemaKey}
                    schemaFormOptions={schemaFormOptions}
                    schema={schema}
                    getCurrentState={(state, props) => {
                        return state.getIn(["modules", "settings", "design", "schemaForm"]).toJS();
                    }}
                    RootComponent={({ children }) => children}
                    uiSchema={uiSchema}
                    globalOptions={globalOptions}>
                </SchemaForm>
            </div>
        );
    }
}

export const ComponentWithHoc = hoc(Component);
