import react, { FC, useEffect, useState } from "react";
import api from "../boot/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";

const Tasks = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const JWT = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`,
        },
    };

    const [nameList, setNameList] = useState<string>("");
    const [tasks, setTasks] = useState<
        { _id: string; title: string; done: boolean; description: string }[]
    >([]);

    const getListsById = () => {
        api.get(`/lists/${id}`, config).then((res) => {
            const data = res.data;
            setNameList(data.title);
        });
    };

    const getTasks = () => {
        api.get(`tasks/lists/${id}`, config).then((res) => {
            const data = res.data;
            data.map(
                (task: {
                    _id: string;
                    title: string;
                    done: boolean;
                    description: string;
                }) => {
                    console.log(task);
                    setTasks((prev) => [...prev, task]);
                }
            );
        });
    };

    const handleCheck = (e: boolean, id: string, title: string) => {
        api.put(`/tasks/${id}`, { title: title, done: e }, config).then(
            (res) => {
                window.location.reload();
            }
        );
    };

    const handleDelete = (id: string) => {
        api.delete(`/tasks/${id}`, config).then((res) => {
            navigate(0);
        });
    };

    useEffect(() => {
        getListsById();
        getTasks();
    }, []);

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-full h-auto items-center px-[8.875rem] pt-24">
                <h1 className="text-4xl font-semibold">
                    Les tâches de la listes : {nameList}
                </h1>
            </div>
            <div className="flex flex-col w-full h-full items-center px-[8.875rem] pt-8 gap-6">
                <h2 className="text-3xl font-medium">Vos tâches :</h2>
                {tasks.length === 0 ? (
                    <p>Il n'y a pas de tâches dans cette liste</p>
                ) : (
                    <ul>
                        <div className="flex flex-col gap-4 w-96 border p-5 rounded-lg">
                            <div className="flex py-3">
                                <h2>Tâches en cours :</h2>
                            </div>
                            {tasks
                                .filter((task) => task.done === false)
                                .map((task) => (
                                    <div className="flex flex-col">
                                        <div
                                            className="flex flex-row gap-2 items-center justify-around"
                                            key={task._id}
                                        >
                                            <input
                                                type="checkbox"
                                                defaultChecked={task.done}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) =>
                                                    handleCheck(
                                                        e.target.checked,
                                                        task._id,
                                                        task.title
                                                    )
                                                }
                                            />
                                            <label>{task.title}</label>
                                            <p>{task.description}</p>
                                            <div className="flex flex-row  gap-2">
                                                <Link
                                                    to={`/modify/task/${task._id}`}
                                                >
                                                    <img src="../src/assets/edit.svg" />
                                                </Link>
                                                <a
                                                    onClick={() =>
                                                        handleDelete(task._id)
                                                    }
                                                >
                                                    <img
                                                        src="../src/assets/Trash.svg"
                                                        className="bg-[#f00] rounded-full"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            <div className="flex py-3">
                                <h2>Tâches terminées :</h2>
                            </div>
                            {tasks
                                .filter((task) => task.done === true)
                                .map((task) => (
                                    <div className="flex flex-col">
                                        <div
                                            className={`flex flex-row gap-2 items-center justify-around ${
                                                task.done && "line-through"
                                            }`}
                                            key={task._id}
                                        >
                                            <input
                                                type="checkbox"
                                                defaultChecked={task.done}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={(e) =>
                                                    handleCheck(
                                                        e.target.checked,
                                                        task._id,
                                                        task.title
                                                    )
                                                }
                                            />
                                            <label>{task.title}</label>
                                            <p>{task.description}</p>
                                            <div className="flex flex-row  gap-2">
                                                <Link
                                                    to={`/modify/task/${task._id}`}
                                                >
                                                    <img src="../src/assets/edit.svg" />
                                                </Link>
                                                <a
                                                    onClick={() =>
                                                        handleDelete(task._id)
                                                    }
                                                >
                                                    <img
                                                        src="../src/assets/Trash.svg"
                                                        className="bg-[#f00] rounded-full"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {/* {tasks.map((task) => (
                                <div className="flex flex-col">
                                    {task.done === false && (
                                        <>
                                            <div className="flex pb-2">
                                                <h2>Tâches en cours :</h2>
                                            </div>
                                            <div
                                                className="flex flex-row gap-2 items-center justify-around"
                                                key={task._id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={task.done}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) =>
                                                        handleCheck(
                                                            e.target.checked,
                                                            task._id,
                                                            task.title
                                                        )
                                                    }
                                                />
                                                <label>{task.title}</label>
                                                <p>{task.description}</p>
                                                <div className="flex flex-row  gap-2">
                                                    <Link
                                                        to={`/modify/task/${task._id}`}
                                                    >
                                                        <img
                                                            src="../src/assets/edit.svg"
                                                            className="invert"
                                                        />
                                                    </Link>
                                                    <a
                                                        onClick={() =>
                                                            handleDelete(
                                                                task._id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src="../src/assets/Trash.svg"
                                                            className="bg-[#f00] rounded-full"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {task.done === true && (
                                        <>
                                            <div
                                                className="flex flex-row gap-2 items-center justify-around"
                                                key={task._id}
                                            >
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={task.done}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={(e) =>
                                                        handleCheck(
                                                            e.target.checked,
                                                            task._id,
                                                            task.title
                                                        )
                                                    }
                                                />
                                                <label>{task.title}</label>
                                                <p>{task.description}</p>
                                                <div className="flex flex-row  gap-2">
                                                    <Link
                                                        to={`/modify/task/${task._id}`}
                                                    >
                                                        <img
                                                            src="../src/assets/edit.svg"
                                                            className="invert"
                                                        />
                                                    </Link>
                                                    <a
                                                        onClick={() =>
                                                            handleDelete(
                                                                task._id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src="../src/assets/Trash.svg"
                                                            className="bg-[#f00] rounded-full"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))} */}
                        </div>
                    </ul>
                )}
                <Link to={`/create/task/${id}`}>
                    <button>Créer une nouvelle tâche</button>
                </Link>
            </div>
        </div>
    );
};

export default Tasks;
