import Router from "@koa/router";
import * as listControllers from "#components/list/list-controllers.js";
import {
    isAuthentificatedAndResolveUser,
    isAuthentificated,
} from "#middlewares/jwt-handler.js";

const lists = new Router();

lists.get(
    "/mylists",
    isAuthentificatedAndResolveUser,
    listControllers.getMyLists
);
lists.get("/:id", isAuthentificatedAndResolveUser, listControllers.id);
lists.get("/", isAuthentificatedAndResolveUser, listControllers.index);
lists.post("/", isAuthentificatedAndResolveUser, listControllers.create);
lists.put("/:id", isAuthentificatedAndResolveUser, listControllers.update);
lists.del("/:id", isAuthentificatedAndResolveUser, listControllers.destroy);

export default lists;