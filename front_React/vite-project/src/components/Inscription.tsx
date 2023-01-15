import React, { useState } from "react";
import { FC } from "react";
import api from "../boot/axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Register: FC = () => {
    const [mail, setMail] = useState("");
    console.log(mail);
    const [pwd, setPwd] = useState("");
    console.log(pwd);
    const [terms, setTerms] = useState(false);
    console.log(terms);

    const navigate = useNavigate();

    const handleSubmit = () => {
        const data = {
            email: mail,
            password: pwd,
            terms_and_conditions: terms,
        };

        api.post("/users/register", data)
            .then((res) => {
                alert("Inscription réussie");
                navigate("/login");
            })
            .catch((err) => {
                alert("Inscription échouée");
            });
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col w-full h-full justify-center items-center px-[8.875rem] py-24">
                <div className="flex flex-col gap-9 items-center w-auto px-6 py-6 border rounded-lg shadow-2xl">
                    <h1 className="text-5xl font-bold">Inscription</h1>
                    <div className="flex flex-row gap-4">
                        <input
                            type="email"
                            onChange={(e) => setMail(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(e) => setPwd(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Mot de passe"
                        />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            Accepter les termes et conditions
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Inscription</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
