const urlBase = "http://localhost:4000/eventos";

// Função para gravar um novo evento
export async function gravar(evento, token) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // Token de autenticação
        },
        body: JSON.stringify(evento),  // Converte o objeto evento para JSON
        credentials: 'include'  // Inclui cookies/sessões, se necessário
    });

    if (!resposta.ok) {
        throw new Error('Erro ao gravar evento. Código: ' + resposta.status);
    }

    return await resposta.json();  // Retorna a resposta em formato JSON
}

// Função para alterar um evento existente
export async function alterar(evento, token) {
    const resposta = await fetch(`${urlBase}/${evento.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`  // Token de autenticação
        },
        body: JSON.stringify(evento),  // Converte o objeto evento para JSON
        credentials: 'include'  // Inclui cookies/sessões, se necessário
    });

    if (!resposta.ok) {
        throw new Error('Erro ao alterar evento. Código: ' + resposta.status);
    }

    return await resposta.json();  // Retorna a resposta em formato JSON
}

// Função para consultar todos os eventos
export async function consultarTodos(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!resposta.ok) {
        throw new Error('Erro ao consultar eventos. Código: ' + resposta.status);
    }

    return await resposta.json();
}
