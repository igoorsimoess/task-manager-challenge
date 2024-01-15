import TaskManager from "./TaskManager";
import Login from "./Login/Login";
import SignUp from "./Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <div className="text-slate-950 bg-white -m-2">
          <h1 className="text-3xl my-2 bg-cyan-950 font-bold text-center text-white">
            Gerenciador de Tarefas
          </h1>
            <>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Login
                      onSubmit={(username, password) => {
                        console.log(username, password);
                      }}
                    />
                  }
                />
                <Route
                  path="/sign_up"
                  element={
                    <SignUp
                      onSubmit={(username, password) => {
                        console.log(username, password);
                      }}
                    />
                  }
                />
                <Route path="/task_manager" element={<TaskManager />} />
              </Routes>
            </BrowserRouter>
            
            </>
      </div>
    
    </>
  );
};

export default App;
