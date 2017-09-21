import { SchedulePluginModel } from "./plugin";

export interface PageModel {
    path: string;
    title: string;
    msgFlow: SchedulePluginModel[];
}
