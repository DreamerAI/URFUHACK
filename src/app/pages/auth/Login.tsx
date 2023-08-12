import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);

    const handleLoginFormClick = () => {
        setIsLoginForm(true);
    };

    const handleSignupFormClick = () => {
        setIsLoginForm(false);
    };

    return (
        <div className="p-5 bg-main-white rounded-lg flex flex-col gap-6">
            <div className="flex justify-around">
                <button
                    className={`hover:border-b-2 hover:border-green-500 active:border-b-2 active:border-green-500 ${isLoginForm ? "border-b-2 border-green-500" : ""
                        }`}
                    onClick={handleLoginFormClick}
                >
                    Вход
                </button>
                <button
                    className={`hover:border-b-2 hover:border-green-500 active:border-b-2 active:border-green-500 ${!isLoginForm ? "border-b-2 border-green-500" : ""
                        }`}
                    onClick={handleSignupFormClick}
                >
                    Регистрация
                </button>
            </div>
            {isLoginForm ? <LoginForm /> : <SignupForm />}
        </div>
    );
};
