import { useState, useEffect, useMemo, useRef } from "react";
import { UserRespository, User } from "../../respository/UserRespository";

let a;

function AppViewModel() {
  const [state, setState] = useState(0);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>(null);
  const [status, setstatus] = useState("");
  const [info, setInfo] =
    useState<{ name: string; age: number; gender: "male" | "female" }>();

  const userRepository = useMemo(() => new UserRespository(), []);

  useEffect(() => {
    getUsers();
    return () => {};
  }, []);

  const increment = () => {
    setState(state + 1);
  };

  const decrement = () => {
    setState(state - 1);
  };

  const getUsers = async () => {
    const result = await userRepository.getAll();

    if (result.error) {
      setError(result.error);
      return;
    }
    setUsers(result.value);
  };

  const onChangeHandler = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "age") {
      value = Number.parseInt(value);
    }
    let newInfo = {
      ...info,
      [name]: value,
    };

    setInfo(newInfo);
  };

  const addUser = async () => {
    const result = await userRepository.add(info);
    if (result.error) {
      setError(result.error);
      return;
    }
    setError("");
    getUsers();
  };

  const deleteUserById = async (id: string) => {
    const result = await userRepository.deleteById(id);
    if (result.error) {
      setError(result.error);
      return;
    }

    if (users.length > 1) {
      getUsers();
    } else {
      setUsers([]);
    }
  };

  const updateUserById = async (id: string) => {
    const user = { ...info };
    const result = await userRepository.updateById(id, user);
    if (result.error) {
      setError(result.error);
      return;
    }
    getUsers();
  };

  return {
    state,
    increment,
    decrement,
    error,
    users,
    getUsers,
    onChangeHandler,
    addUser,
    deleteUserById,
    updateUserById,
    status,
  };
}

export default AppViewModel;
