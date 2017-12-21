import React from "react";
import { SchemaForm } from "fx-schema-form-react";
import classNames from "classnames";

import { BaseComponent, TileGroup, Tile } from "../../../common/component";
import { DesignProps, globalOptions1 as globalOptions, schemaKey } from "./constant";
import { schemaFormOptions } from "../../../common/schema.form/index";
import { hoc } from "./container";
import { Flex, Box } from "grid-styled";

export class Component extends BaseComponent<DesignProps, any> {
    public render() {
        const { theme } = this.context;
        const { $edit } = this.props;
        const edit = $edit.toJS();

        if (!edit.schema) {
            return null;
        }

        return (
            <TileGroup direction="row"
                classConName="center"
                className="h-100 h-100 overflow-auto"
                maxGrid={5}
                tileWidth={"fixed"}
                tileHeight={"fixed"}
                tileGutter={1}
                tiles={[
                    <Tile x={4} y={1} className="h-100" >
                        <Flex wrap={true}>
                            <SchemaForm schemaKey={schemaKey}
                                schemaFormOptions={schemaFormOptions}
                                schema={edit.schema}
                                getCurrentState={(state, props) => {
                                    return state.getIn(["modules", "settings", "design", "schemaForm"]).toJS();
                                }}
                                RootComponent={({ children }) => {
                                    return children;
                                }}
                                arrayLevel={edit.arrayLevel || []}
                                parentKeys={edit.parentKeys.concat(["data"])}
                                uiSchema={edit.uiSchema || ["*"]}
                                globalOptions={globalOptions}>
                            </SchemaForm>
                        </Flex>
                    </Tile>,
                    <Tile x={1} y={1} className="h-100">
                        <TileGroup direction="row"
                            classConName="center v-mid"
                            className="h-100 h-100 overflow-auto"
                            maxGrid={3}
                            tileWidth={"fixed"}
                            tileHeight={"fixed"}
                            tileGutter={1}
                            tiles={[
                                <Tile x={3} y={1} className="h-100">
                                </Tile>
                            ]}>
                        </TileGroup>
                    </Tile>
                ]}>
            </TileGroup>

        );
    }
}

export const ComponentWithHoc = hoc(Component);
