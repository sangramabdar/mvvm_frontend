import { Repository, RepositoryImpl } from "./Respository";

export type User = {
  _id?: string;
  name: string;
  age: number;
};

class UserRespository extends RepositoryImpl<User> {
  private static USER_URL = "http://localhost:5050/users";

  constructor() {
    super(UserRespository.USER_URL);
  }
}

export { UserRespository };
