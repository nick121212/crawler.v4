import React from "react";

export class BundleComponent extends React.Component<any, any> {
    public state = {
        mod: null
    };

    public componentWillMount() {
        this.load(this.props);
    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    public load(props: any) {
        this.setState({
            mod: null
        });
        props.load((mod: any) => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    public render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}

export const bundle = (Component: React.Component<any, any>) => {
    return (props: any) => (
        <BundleComponent load={Component}>
            {(BundledCompnet: new () => React.Component<any, any>) => <BundledCompnet {...props} />}
        </BundleComponent>
    );
};
