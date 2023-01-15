import React, { FC, useEffect, useState } from "react";

import api from "../boot/axios";

import { Link, useNavigate, useParams } from "react-router-dom";

const Modify: FC = () => {
    const { id, name } = useParams();
    const navigate = useNavigate();

    const JWT = localStorage.getItem("token");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [done, setDone] = useState<boolean>(false);

    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`,
        },
    };

    const getData = () => {
        if (name === "task") {
            api.get(`/tasks/${id}`, config).then((res) => {
                const data = res.data;
                setTitle(data.title);
                setDescription(data.description);
                setDone(data.done);
            });
        } else if (name === "list") {
            api.get(`/lists/${id}`, config).then((res) => {
                const data = res.data;
                setTitle(data.title);
                setDescription(data.description);
            });
        }
    };

    const handleSubmit = (name: any) => {
        if (name === "task") {
            const data = {
                title: title,
                description: description,
                done: done,
            };

            api.put(`/tasks/${id}`, data, config)
                .then((res) => {
                    const data = res.data;
                    console.log(data);
                    navigate(-1);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (name === "list") {
            const data = {
                title: title,
                description: description,
            };
            api.put(`/lists/${id}`, data, config)
                .then((res) => {
                    const data = res.data;
                    navigate(-1);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        getData();
    }, []);
    console.log(done);

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-full h-auto items-center px-[8.875rem] pt-24">
                <h1 className="text-4xl font-semibold">Modifier {title}</h1>
            </div>
            <div className="flex flex-col w-full h-full items-center px-[8.875rem] pt-8 gap-6">
                <input
                    type="text"
                    placeholder="Tâche"
                    className="border rounded-lg p-1"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="border rounded-lg p-1"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {name === "task" && (
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <input
                            type="checkbox"
                            id="done"
                            checked={done}
                            onChange={(e) => setDone(e.target.checked)}
                        />

                        <label htmlFor="done">Tâche terminée</label>
                    </div>
                )}

                <a onClick={() => handleSubmit(name)}>
                    <button>Modifier</button>
                </a>
            </div>
        </div>
    );
};

export default Modify;
