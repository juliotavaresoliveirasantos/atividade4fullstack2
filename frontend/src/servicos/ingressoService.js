const urlBase = "http://localhost:4000/ingressos";

// Função para gravar um novo ingresso
export async function gravar(ingresso, token) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(ingresso),
        credentials: 'include'
    });

    if (!resposta.ok) {
        throw new Error('Erro ao gravar ingresso. Código: ' + resposta.status);
    }

    return await resposta.json();
}

// Função para consultar todos os ingressos
export async function consultarTodos(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!resposta.ok) {
        throw new Error('Erro ao consultar ingressos. Código: ' + resposta.status);
    }

    return await resposta.json();
}
