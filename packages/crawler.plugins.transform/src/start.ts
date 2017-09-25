

import { Seneca } from "crawler.plugins.common";
import { container } from "./container";

let seneca = new Seneca<any>(container, {
    tag: "crawler.plugins.transform"
});

seneca.seneca.ready(async () => {
    console.log("crawler.plugins.transform ready!");
});
