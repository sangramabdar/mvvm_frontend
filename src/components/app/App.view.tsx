import React from "react";

import User from "../user/User";
import AppViewModel from "./App.viewmodel";

function App(props) {
  const {
    error,
    users,
    getUsers,
    onChangeHandler,
    addUser,
    deleteUserById,
    updateUserById,
    status,
  } = AppViewModel();
  console.log("app");
  return (
    <div>
      <div>
        <input onChange={onChangeHandler} type="text" name="name" />
        <input onChange={onChangeHandler} type="text" name="age" />
        <input type="text" onChange={onChangeHandler} name="gender" />
        <input type="text" onChange={onChangeHandler} name="email" />
      </div>
      <button onClick={getUsers}>getUsers</button>
      <button onClick={addUser}>adduser</button>
      <div>{error && error}</div>
      <div>{status && status}</div>
      <div>
        {users &&
          users.map((u, i) => {
            return (
              <User
                u={u}
                key={i}
                deleteUser={e => {
                  deleteUserById(u._id);
                }}
                updateUser={e => {
                  updateUserById(u._id);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
