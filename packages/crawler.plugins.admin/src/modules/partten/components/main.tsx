import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card } from "antd";
import classNames from "classnames";
import QueueAnim from "rc-queue-anim";

import { BaseComponent } from "../../../common/components";
import { mainHoc } from "../containers/main";
import { MainComponentProps } from "../constants/main";

const gridStyle = {
    width: "100%"
};

export class MainComponent extends BaseComponent<MainComponentProps, any> {
    public render(): JSX.Element {
        const { fetch } = this.props;
        const { loaded, loading, data, error } = fetch;

        if (loaded && error) {
            return <span>{error.message}</span>;
        }

        return (
            <QueueAnim key="demo"
                type={["right", "left"]}
                ease={["easeOutQuart", "easeInOutQuart"]}
                className="queue-simple">
                {data && data.size ? data.get("list").map((d: any, i: number) => {
                    return <Card.Grid key={i.toString()} style={gridStyle}>
                        {i + 1} : {JSON.stringify(d)}
                    </Card.Grid>;
                }) : null}
            </QueueAnim>
        );
    }
}

export const MainComponentWithHoc = mainHoc(MainComponent);
