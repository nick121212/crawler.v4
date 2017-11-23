import React from "react";
import { message, notification } from "antd";

import { MesssageComponentProps } from "./constant";
import { hoc } from "./container";
import { messageModel } from "./reducer";

class Component extends React.PureComponent<MesssageComponentProps> {
    public componentDidUpdate() {
        let { messages } = this.props;

        message.destroy();
        if (messages.size) {
            let messageInfo: any = messages.get(0);

            if (messageInfo.status) {
                if (messageInfo.type === "message" && message[messageInfo.status]) {
                    message[messageInfo.status](messageInfo.content, messageInfo.duration, () => {
                        messageModel.actions.pop();
                    });
                } else if (notification[messageInfo.status]) {
                    notification[messageInfo.status]({
                        message: messageInfo.content,
                        duration: messageInfo.duration,
                        onClose: () => {
                            messageModel.actions.pop();
                        }
                    });
                }
            } else {
                messageModel.actions.pop();
            }
        }
    }

    public render() {
        return null;
    }
}

export const ComponentWithHoc = hoc(Component);
