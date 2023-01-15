import React, { FC, useState } from "react";

import api from "../boot/axios";

import { Link, useNavigate, useParams } from "react-router-dom";

const Create: FC = () => {
    const { id, name } = useParams();
    const navigate = useNavigate();

    const JWT = localStorage.getItem("token");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`,
        },
    };

    const handleSubmit = (name: any) => {
        if (name === "task") {
            const data = {
                title: title,
                description: description,
                list: id,
            };

            api.post(`/tasks/`, data, config)
                .then((res) => {
                    const data = res.data;
                    navigate(-1);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (name === "lists") {
            const data = {
                title: title,
                description: description,
            };
            api.post("/lists/", data, config)
                .then((res) => {
                    const data = res.data;
                    navigate(-1);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="flex flex-col w-full ">
            <div className="flex flex-col w-full h-auto items-center px-[8.875rem] pt-24">
                <h1 className="text-4xl font-semibold">
                    Création d'une {name === "task" ? "tâche" : "liste"}
                </h1>
            </div>
            <div className="flex flex-col w-full items-center px-[8.875rem] pt-8 gap-6">
                {name === "task" ? (
                    <>
                        <input
                            type="text"
                            placeholder="Nom de la tâche"
                            className="border rounded-lg p-1"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border rounded-lg p-1"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Nom de la liste"
                            className="border rounded-lg p-1"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className="border rounded-lg p-1"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                )}
                <a onClick={() => handleSubmit(name)}>
                    <button>Créer</button>
                </a>
            </div>
        </div>
    );
};

export default Create;
