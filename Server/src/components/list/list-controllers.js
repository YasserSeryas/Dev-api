import ListModel from "#components/list/list-model.js";
import TaskModel from "#components/task/task-model.js";
import UserModel from "#components/user/user-model.js";

import Joi from "Joi";

export async function index(ctx) {
    try {
        const lists = await ListModel.find({});
        ctx.ok(lists);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function id(ctx) {
    try {
        if (!ctx.params.id) throw new Error("No id supplied");
        const list = await ListModel.verifyUserId(
            ctx.state.user.id,
            ctx.params.id
        );
        if (!list) {
            return ctx.notFound();
        }
        ctx.ok(list);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function getAllByUser(ctx) {
    try {
        if (!ctx.params.userId) throw new Error("No id supplied");
        const users = await ListModel.findByUserId(ctx.params.userId);
        ctx.ok(users);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function getMyLists(ctx) {
    try {
        if (!ctx.state.user) throw new Error("No user supplied");
        const lists = await ListModel.findByUserId(ctx.state.user.id);
        ctx.ok(lists);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function create(ctx) {
    try {
        const listValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
        });
        const { error, value } = listValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const newList = await ListModel.create({
            ...value,
            user: ctx.state.user.id,
        });
        ctx.ok(newList);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function update(ctx) {
    try {
        const listValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            done: Joi.boolean(),
        });
        if (!ctx.params.id) throw new Error("No id supplied");
        const { error, value } = listValidationSchema.validate(
            ctx.request.body
        );
        if (error) throw new Error(error);
        const updatedList = await ListModel.findOneAndUpdate({ _id: ctx.params.id, user: ctx.state.user.id },
            value, { runValidators: true, new: true }
        );
        ctx.ok(updatedList);
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}

export async function destroy(ctx) {
    try {
        if (!ctx.params.id) throw new Error("No id supplied");
        // await TaskModel.deleteMany({ list:})
        await ListModel.deleteOne({
            _id: ctx.params.id,
            user: ctx.state.user.id,
        });
        ctx.ok("Ressource deleted");
    } catch (e) {
        ctx.badRequest({ message: e.message });
    }
}