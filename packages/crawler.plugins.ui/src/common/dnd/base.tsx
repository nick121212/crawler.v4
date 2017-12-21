import React from "react";
import { DragSourceSpec, DragSourceMonitor, DragSourceConnector } from "react-dnd";

import { BaseComponent } from "../component";

export interface DndBaseComponentProps<P> {
    connectDragSource?: (Component: new () => JSX.Element) => any;
    monitor: DragSourceMonitor;
    connect: DragSourceConnector;
}

export class DndBaseComponent<P extends DndBaseComponentProps<P>, S> extends BaseComponent<P, S> {

}
