import Router from "@koa/router";
import * as TaskControllers from "#components/task/task-controllers.js";
import { isAuthentificated } from "#middlewares/jwt-handler.js";
import { isAuthentificatedAndResolveUser } from "#middlewares/jwt-handler.js";

const tasks = new Router();

tasks.get("/", TaskControllers.index);
tasks.get("/protected", isAuthentificatedAndResolveUser, (ctx) => {
    ctx.ok({ message: "You are protected", user: ctx.state.user });
});
tasks.get("/:id", isAuthentificatedAndResolveUser, TaskControllers.id);
tasks.get("/lists/:listId", TaskControllers.getAllByList);
tasks.post("/", isAuthentificatedAndResolveUser, TaskControllers.create);
tasks.put("/:id", isAuthentificatedAndResolveUser, TaskControllers.update);
tasks.del("/:id", isAuthentificatedAndResolveUser, TaskControllers.destroy);

export default tasks;