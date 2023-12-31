import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserModel, UserRegistrationModel } from "../../@api/models";
import { AuthService } from "../../@api/services/auth.service";
import { setIsAuth, setUser, setUserToken } from "../../state/reducers";
import { UserService } from "../../@api/services/user.service";

export const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formState, setFormState] = React.useState<UserRegistrationModel>({
        fio: "",
        email: "",
        password: "",
        description: "",
        last_access: new Date(Date.now()),
    });

    const [passwordError, setPasswordError] = React.useState("");

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }));

    const handleSignup = () => {
        if (!validatePassword()) {
            return; // Stop signup if password validation fails
        }

        AuthService.create(formState)
            .then((res) => {
                if (res?.data?.access_token) {
                    dispatch(setUserToken(res.data.access_token));
                    return UserService.getMe();
                } else {
                    throw new Error("Ошибка регистрации");
                }
            })
            .then((res) => {
                if (res?.data) {
                    const user = res.data as UserModel;
                    dispatch(setUser(user));
                    dispatch(setIsAuth());
                    navigate("/me");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(formState.password)) {
            setPasswordError("Пароль должен содержать не менее 8 символов и содержать как минимум одну заглавную букву и одну цифру.");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <input
                className="border rounded-lg px-4 py-3 bg-main-gray"
                name="fio"
                type="text"
                placeholder="Введите ФИО"
                onChange={handleChange}
            />
            <input
                className="border rounded-lg px-4 py-3 bg-main-gray"
                name="email"
                type="text"
                placeholder="Введите email"
                onChange={handleChange}
            />

            <input
                className="border rounded-lg px-4 py-3 bg-main-gray"
                name="password"
                type="password"
                placeholder="Введите пароль"
                onChange={handleChange}
            />
            {passwordError && <div>{passwordError}</div>}

            <button className="py-3 bg-accent-green" onClick={handleSignup}>
                Регистрация
            </button>
        </div>
    );
};
