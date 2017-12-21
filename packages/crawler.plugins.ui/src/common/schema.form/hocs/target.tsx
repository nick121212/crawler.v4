
import React from "react";
import { compose, shouldUpdate, pure } from "recompose";
import { connect } from "react-redux";
import classNames from "classnames";
import isEqual from "lodash.isequal";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from "react-dnd";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";

export interface DndTargetHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, UtilsHocOutProps {
    connectDropTarget?: (c: any) => any;
    connect?: ConnectDropTarget;
    monitor?: DropTargetMonitor;

    isOver?: boolean;
    isOverCurrent?: boolean;
    canDrop?: boolean;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<DndTargetHocOutProps, any> => {
        const boxTarget = {
            drop(props, monitor, component) {
                const hasDroppedOnChild = monitor.didDrop();

                if (hasDroppedOnChild) {
                    return;
                }

                const { mergeSchema, actions } = props;
                const { keys } = mergeSchema;
                return {
                    cb: (config) => {
                        actions.addItem({
                            keys: keys.concat(["children"]), data: Object.assign({}, config, {
                                field: config.field,
                                title: config.label,
                                expanded: true
                            })
                        });
                    }
                };
            }
        };

        const target = (Component1) => {
            class TargetCompnent extends React.PureComponent<DndTargetHocOutProps, any> {
                public render() {
                    let { connectDropTarget, connect: connect1,
                        monitor, isOver, canDrop, isOverCurrent,
                        ...extra } = this.props;
                    let { field = "" } = extra.formItemData || {};
                    let options = extra.getHocOptions("target");
                    let data = extra.getFieldOptions(field);
                    let { keys } = extra.mergeSchema;

                    if (field) {
                        data = Object.assign({}, data || {}, extra.formItemData);
                    }

                    return connectDropTarget(<div
                        style={{
                            minHeight: 100,
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }}
                        key={keys.join("-") + "-dnd-target" + isOver + canDrop}
                        className={classNames("dnd-target absolute h-100 w-100 dn", data.targetClassName, data.label,
                            [{ "ba b--dashed b--white db": canDrop, "bg-gray": isOver && canDrop }])}>
                        {canDrop ? <div style={{ zIndex: 9999 }} className="absolute white">{data.label}</div> : null}
                    </div >);
                }
            }

            return TargetCompnent;
        };


        /**
         * 包装一层拖拽层
         */
        class ComponentHoc extends React.PureComponent<DndTargetHocOutProps, any> {
            /**
             * render
             */
            public render(): JSX.Element {
                const { mergeSchema, currentTheme, formItemData, getFieldOptions, children } = this.props;
                const { field = "" } = formItemData || {};
                let TargetComponentWithHoc: any = pure, ComponentWithHoc: any = pure, data;
                let { keys } = mergeSchema;

                data = getFieldOptions(field);

                if (field) {
                    data = Object.assign({}, data || {}, formItemData);
                }

                if (data && data.target) {
                    TargetComponentWithHoc = compose(
                        connect(mapFormItemDataProps),
                        DropTarget(data.target,
                            Object.assign({}, data.targetConfig || {}, boxTarget), (connect1, monitor) => ({
                                connectDropTarget: connect1.dropTarget(),
                                connect,
                                monitor,
                                isOver: monitor.isOver(),
                                isOverCurrent: monitor.isOver({ shallow: true }),
                                canDrop: monitor.canDrop()
                            })),
                        target,
                        shouldUpdate((current: DndTargetHocOutProps, next: DndTargetHocOutProps) => {
                            let { children: child2 = [], data: data1 } = current.formItemData;
                            let { children: child1 = [], data: data2 } = next.formItemData;

                            if (!isEqual(data1, data2)) {
                                return true;
                            }

                            if (child2.length === child1.length) {
                                return false;
                            }

                            return true;
                        })
                    );
                }

                if (data && data.temp) {
                    ComponentWithHoc = compose(hocFactory.get("extraTemp")({
                        temp: data.temp
                    }));
                }

                TargetComponentWithHoc = TargetComponentWithHoc(() => {
                    return <span></span>;
                });
                ComponentWithHoc = ComponentWithHoc(Component);

                return <ComponentWithHoc {...this.props} children={
                    <TargetComponentWithHoc key={keys.join("-")} {...this.props} />
                } />;
            }
        }

        return ComponentHoc as any;
    };
};
