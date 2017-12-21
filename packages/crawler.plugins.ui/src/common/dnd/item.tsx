import React from "react";
import { DragSource } from "react-dnd";

import { DndBaseComponent, DndBaseComponentProps } from "./base";

export default (config: any) => {
    return (Component: any) => {
        @(DragSource(config.sourceType, config.sourceConfig, (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            connect,
            monitor
        })) as any)
        class Hoc extends React.Component<DndBaseComponentProps<any>, any> {
            public render(): any {
                let { connectDragSource } = this.props;

                return (connectDragSource as any)(
                    <div className="h-100 w-100">
                        <Component {...this.props} />
                    </div>
                );
            }
        }

        return Hoc;
    };
};

