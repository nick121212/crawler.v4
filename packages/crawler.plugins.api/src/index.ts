import "reflect-metadata";
import * as Express from "express";
import { useExpressServer, useContainer, Action } from "routing-controllers";
import * as session from "express-session";
import * as MySQLStoreOrigin from "express-mysql-session";
import { TypeormStore } from "connect-typeorm";
import { Container } from "typedi";

// import { Container, MySqlService, MysqlToken, UserModel, UserAuthModel, PostModel, TagModel, CategoryModel } from "./models";

// import initData from "./data";
// import passportInit, { passport } from "./auth";
// import { SessionModel } from "./models/entities/session";

useContainer(Container);

const MySQLStore = MySQLStoreOrigin(session);


Container.get(MysqlToken).connection.then(async (con) => {
    const app = Express();

    // app.use(session({
    //     secret: "crawler.v4",
    //     store: new TypeormStore({ ttl: 86400 }).connect(con.getRepository(SessionModel)),
    //     cookie: { maxAge: 3600000 },
    //     resave: false,
    //     saveUninitialized: false
    // }));
    // app.use(passport.initialize());
    // app.use(passport.session());

    useExpressServer(app, {
        controllers: [__dirname + "/modules/**/*.con.js"],
        middlewares: [__dirname + "/modules/**/*.mid.js"],
        interceptors: [__dirname + "/modules/**/*.cept.js"],
        authorizationChecker: async (action: Action, roles: string[]) => {
            // if (!action.request.user || action.request.user.id) {
            //     return false;
            // }

            return true;
        }
    });

    app.listen(3001);
});
