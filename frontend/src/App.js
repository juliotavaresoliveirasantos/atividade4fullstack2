import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TelaCadastroEvento from "./componentes/Telas/TelaCadastroEvento";
import TelaCadastroIngresso from "./componentes/Telas/TelaCadastroIngresso";  // Página de ingressos
import TelaLogin from "./componentes/Telas/TelaLogin";
import Menu from "./componentes/Templates/Menu";  // Menu de navegação

// Criação do contexto
export const ContextoUsuarioLogado = createContext(null);

function App() {
    const [usuarioLogado, setUsuarioLogado] = useState({
        nome: "",
        logado: false,
        token: ""
    });

    // Componente de proteção de rota para impedir acesso sem login
    const ProtectedRoute = ({ children }) => {
        return usuarioLogado.logado ? children : <Navigate to="/login" />;
    };

    return (
        <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
            <Router>
                {usuarioLogado.logado && <Menu />} {/* Exibe o menu apenas quando logado */}
                <Routes>
                    {/* Página de login */}
                    <Route path="/login" element={<TelaLogin />} />

                    {/* Página de cadastro de eventos, protegida por login */}
                    <Route
                        path="/eventos"
                        element={
                            <ProtectedRoute>
                                <TelaCadastroEvento />
                            </ProtectedRoute>
                        }
                    />

                    {/* Página de cadastro de ingressos, protegida por login */}
                    <Route
                        path="/ingressos"
                        element={
                            <ProtectedRoute>
                                <TelaCadastroIngresso />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redireciona para login se não estiver logado */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </ContextoUsuarioLogado.Provider>
    );
}

export default App;
