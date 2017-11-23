import React from "react";
import { SchemaForm } from "fx-schema-form-react";
import Icon from "react-uwp/Icon";

import { BaseComponent, TileGroup, Tile } from "../../../common/component";
import ItemHoc from "../../../common/dnd/item";
import components from "../../../common/dnd";

export class Component extends BaseComponent<any, any> {
    public render() {
        let { theme } = this.context;

        return (
            <div className="h-100 ">
                <TileGroup
                    maxGrid={3}
                    tileGutter={1}
                    tileWidth={80}
                    tileHeight={80}
                    direction={"row"}
                    tiles={
                        components.map((c: any, idx: number) => {
                            let ComponentDndWithHoc: any = ItemHoc(c)((props: any) => {
                                return <div className="flex flex-wrap flex-row items-end h-100">
                                    <div className="w-100 tc">
                                        <Icon style={{
                                            color: theme.accent
                                        }} className="f2" children={c.icon}></Icon>
                                    </div>
                                    <div className="self-end mb2 f7 center">
                                        <span style={{
                                            color: theme.accent
                                        }}>{c.label}</span>
                                    </div>
                                </div>;
                            });

                            return <Tile
                                key={idx.toString()}
                                className="ba h-100" >
                                <ComponentDndWithHoc />
                            </Tile>;
                        })
                    }
                    className="overflow-auto flex-auto h-100 pa1">
                </TileGroup>
            </div>
        );
    }
}

export const ComponentWithHoc = (Component);
