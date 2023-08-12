export type UserModel = {
    id: number;
    email: string;
    fio: string;
    last_access: Date;
};

export type UserRegistrationModel = Omit<UserModel, "id"> & {
  password: string;
};
