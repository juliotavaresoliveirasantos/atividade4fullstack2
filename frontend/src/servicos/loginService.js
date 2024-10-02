const urlBase = "http://localhost:4000/autenticacao";

export async function login(usuario, senha) {
    const resposta = await fetch(`${urlBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
    });

    if (!resposta.ok) {
        throw new Error('Erro ao realizar login.');
    }

    return await resposta.json();  // Retorna o token de autenticação
}
