import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card } from "antd";
import classNames from "classnames";
import QueueAnim from "rc-queue-anim";
import TweenOne, { TweenOneGroup } from "rc-tween-one";

import { BaseComponent } from "../../../common/components";
import { mainHoc } from "../containers/main";
import { MainComponentProps } from "../constants/main";
import { CreateComponentWithHoc } from "./create";

const gridStyle = {
    width: "100%"
};

export class MainComponent extends BaseComponent<MainComponentProps, any> {
    public render(): JSX.Element {
        const { fetch, remove, removeItem } = this.props;
        const { loaded, loading, data, error } = fetch;
        const { loaded: rLoaded, loading: rLoading } = remove;

        if (loaded && error) {
            return <span>{error.message}</span>;
        }

        console.log("main djfkldajkfjlkadklfjal;ks");

        return (
            <div>
                <CreateComponentWithHoc key="CreateComponentWithHoc" />

                {data && data.size ? data.map((d: any, i: number) => {
                    return <Card.Grid key={i.toString()} style={gridStyle}>
                        {JSON.stringify(d)}
                        <Button onClick={removeItem.bind(this, d, i)} />
                    </Card.Grid>;
                }) : null}
            </div>
        );
    }
}

export const MainComponentWithHoc = mainHoc(MainComponent);
