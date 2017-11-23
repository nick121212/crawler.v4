import React from "react";
import { SchemaForm } from "fx-schema-form-react";
import { ThemeType } from "react-uwp";
import XRay from "react-x-ray";

import { BaseComponent, Tile, TileGroup } from "../../../common/component";
import { LayoutProps } from "./constant";
import { hoc } from "./container";

import { CompnentsComponent } from "../components";
import { DesignComponent, DomComponent, EditWidgetComponent } from "../design";


export class Component extends BaseComponent<LayoutProps, any> {
    public render() {
        let { theme } = this.context;

        let style = {
            backgroundColor: "rgba(32,41,52,.7)"
        };

        return <TileGroup direction="column"
            classConName="center"
            className="h-100 h-100 overflow-auto"
            maxGrid={5}
            tileWidth={"fixed"}
            tileHeight={"fixed"}
            tileGutter={0}
            tiles={[
                <Tile x={1} y={4} className="h-100" >
                    <TileGroup direction="row"
                        classConName="center v-mid"
                        className="h-100 h-100 overflow-auto"
                        maxGrid={10}
                        tileWidth={"fixed"}
                        tileHeight={"fixed"}
                        tileGutter={1}
                        tiles={[
                            <Tile x={2} y={1} className="h-100" style={style}>
                                <CompnentsComponent />
                            </Tile>,
                            <Tile x={6} y={1} className="h-100" style={{
                                backgroundColor: "rgba(38,42,46,.5)"
                            }}>
                                {/* <XRay outline={false}
                                    style={{
                                        height: "100%"
                                    }}
                                    grid={0}
                                    color={"rgba(26,33,41,.5)"}
                                    backgroundColor={"transparent"}> */}
                                    <DesignComponent />
                                {/* </XRay> */}
                            </Tile>,
                            <Tile x={2} y={1} className="h-100" style={style}>
                                <DomComponent />
                            </Tile>,
                        ]}>
                    </TileGroup>
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
                            <Tile x={3} y={1} className="h-100" style={style}>
                                <EditWidgetComponent />
                            </Tile>
                        ]}>
                    </TileGroup>
                </Tile>
            ]}>
        </TileGroup>;
    }
}

export const ComponentWithHoc = hoc(Component);
