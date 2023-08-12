export type UserModel = {
    id: number;
    description:string;
    email: string;
    fio: string;
    last_access: Date;
};

export type UserRegistrationModel = Omit<UserModel, "id"> & {
  password: string;
};
