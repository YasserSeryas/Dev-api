import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../boot/axios";

const Dashboard: FC = () => {
    const JWT = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${JWT}`,
        },
    };
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [lists, setLists] = useState<{ _id: string; title: string }[]>([]);

    api.get("/users/me", config).then((res) => {
        const user = res.data.user;
        setMail(user);
    });

    const getLists = () => {
        api.get("/lists/myLists", config).then((res) => {
            const data = res.data;
            data.map((list: { _id: string; title: string }) => {
                console.log(list);
                setLists((prev) => [...prev, list]);
            });
        });
    };

    useEffect(() => {
        getLists();
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`/lists/${id}`, config).then((res) => {
            navigate(0);
        });
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-full h-auto items-center px-[8.875rem] pt-24">
                <h1 className="text-4xl font-semibold">Welcome {mail} !</h1>
            </div>
            <div className="flex flex-col w-full h-full items-center px-[8.875rem] pt-8 gap-6">
                <h2 className="text-3xl font-medium">Vos listes :</h2>
                {lists.length === 0 ? (
                    <p className="w-96">
                        Vous n'avez pas de liste de tâches pour le moment.
                        <br />
                        <br />
                        Créez-en une en cliquant sur le bouton ci-dessous pour
                        commencer.
                    </p>
                ) : (
                    <ul>
                        <div className="flex flex-col gap-4 w-96 border p-5 rounded-lg">
                            {lists.map((list) => (
                                <div className="flex flex-row gap-2 items-center justify-between">
                                    <li key={list._id}>
                                        <Link to={`/list/${list._id}`}>
                                            {list.title}
                                        </Link>
                                    </li>
                                    <div className="flex flex-row  gap-2">
                                        <Link to={`/modify/list/${list._id}`}>
                                            <img
                                                src="src/assets/edit.svg"
                                                className=""
                                            />
                                        </Link>
                                        <a
                                            onClick={() =>
                                                handleDelete(list._id)
                                            }
                                        >
                                            <img
                                                src="src/assets/Trash.svg"
                                                className="bg-[#f00] rounded-full"
                                            />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ul>
                )}

                <Link to={`/create/lists/`}>
                    <button>Créer une liste</button>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
