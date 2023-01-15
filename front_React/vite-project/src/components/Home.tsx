import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import NavBar from "./NavBar";

const Home: FC = () => {
    return (
        <div className="flex flex-col w-full h-screen">
            <NavBar />
            <div className="flex flex-col w-full h-full justify-center items-center px-[8.875rem] py-24">
                <div className="flex flex-col gap-16">
                    <h1 className="text-5xl font-bold text-white">
                        Bienvenue sur Y'Task Manager
                    </h1>
                    <div className="flex flex-row justify-center gap-3">
                        <Link to={"/login"}>
                            <button>Connexion</button>
                        </Link>
                        <Link to={"/register"}>
                            <button>Inscription</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
{
    /* <div className="flex flex-row gap-3 text-2xl ">
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
        </div> */
}

export default Home;
