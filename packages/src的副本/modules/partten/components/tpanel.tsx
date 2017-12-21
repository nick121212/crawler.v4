import React from "react";
import Immutable from "immutable";
import { Card, Row, Col, Badge, Tooltip } from "antd";
import { compose, defaultProps } from "recompose";

export interface TPanelProps {
    title?: string;
    className?: string;
    items?: Array<JSX.Element>;
}

export interface TPanelItemProps {
    data: Immutable.Map<string, any>;
    index: number;
}

const status = {
    "web": "warning",
    "tcp": "error"
};

export class TPanelItemComponent extends React.PureComponent<TPanelItemProps, any> {
    public render(): JSX.Element {
        let { data, index } = this.props;

        return <article className="dt w-100 bb b--black-05 mt2 pa1">
            <div className="dtc v-mid">
                <Badge status={data.get("model") === "consume" ? "default" : "warning"} count={index} />
            </div>
            <div className="dtc v-mid pl3">
                <h1 className="f6 f5-ns fw6 lh-title black mv0 " title={data.get("instance")}>
                    <Tooltip title={data.get("instance")}>
                        <span>{data.get("type")}://{data.get("host")}:{data.get("port")}</span>
                    </Tooltip>
                </h1>
                {/* <h2 className="f6 fw4 mt0 mb0 black-60 overflow-hidden">
                    <div className="w-80 truncate">{data.get("instance")}</div>
                </h2> */}
            </div>
            <div className="dtc v-mid pl3">
                <Badge className="nowrap" text={data.get("type")} status={status[data.get("type")]} />
            </div>
        </article>;
    }
}

@compose<TPanelProps, any>(defaultProps<TPanelProps>({ items: [], className: "" }))
export class TPanelComponent extends React.PureComponent<TPanelProps, any> {
    public render(): any {
        let { title, items, className } = this.props;

        return (
            <Card title={title} bordered={false} noHovering={true} className={"ma1 " + className}
                bodyStyle={{ padding: 0, backgroundColor: "transparent" }}>
                <Row type="flex">
                    {
                        items.map((element: JSX.Element, index: number) => {
                            return <Col span={24} key={index.toString()}>{element}</Col>;
                        })
                    }
                </Row>
            </Card>
        );
    }
}
