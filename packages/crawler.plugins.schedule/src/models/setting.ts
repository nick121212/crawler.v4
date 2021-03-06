import { SchedulePluginModel } from "./plugin";
import { PageModel } from "./page";

export interface SettingModel {
    key: string;
    title: string;
    prefech: number;
    delay: number;
    startPartten: string;
    initFlow: SchedulePluginModel[];
    pages: PageModel[];
}
