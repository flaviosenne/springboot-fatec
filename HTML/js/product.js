function product() {
    // obtendo os dados do usuário
    var produto = new Object()
    produto.descricao = document.getElementById("descricao").value
    produto.preco = Number(document.getElementById("preco").value)
    produto.qtd = Number(document.getElementById("qtd").value)
    produto.nome = document.getElementById("nome").value

    // consome a API
    var request = new XMLHttpRequest()
        // abre a conexão
    request.open('POST', 'http://localhost:8080/api/product', true)
        // carrega da conexão
    request.onload = function() {
            if ((request.status >= 200) && (request.status < 400)) {
                console.log('Conectou com sucesso na API')
            } else {
                console.log('Problema na conexão com a API')
            }
        }
        // configura a conexão - header
    request.setRequestHeader('Content-Type', 'application/json')
        // envia os dados para inserção - transforma em JSON
    request.send(JSON.stringify(produto))
    alert('produto inserido com sucesso')
}


function consultar() {
    var req = new XMLHttpRequest()

    req.open('GET', 'http://localhost:8080/api/product', true)

    req.onload = function() {
        var produtos = JSON.parse(this.response)
        
        var tabela = document.getElementById('tabela')
        produtos.forEach(produto => {
            var linha = document.createElement('tr')
            tabela.appendChild(linha)
            var col1 = document.createElement('td')   
            var col2 = document.createElement('td')   
            var col3 = document.createElement('td')   
            var col4 = document.createElement('td')   
            var col5 = document.createElement('td')   
            var col6 = document.createElement('td')   
            
            col1.textContent = produto.descricao
            col2.textContent = produto.preco
            col3.textContent = produto.qtd
            col4.textContent = produto.nome
            var imageRemove = document.createElement('img')
            imageRemove.setAttribute('src', 'img/remover.png')
            imageRemove.setAttribute('onclick', `remover(${produto.id})`)
            
            
            var imageAtualizar = document.createElement('img')
            imageAtualizar.setAttribute('src', 'img/alterar.png')
            imageAtualizar.setAttribute('onclick', `remover(${produto.id})`)

            linha.appendChild(col1)
            linha.appendChild(col2)
            linha.appendChild(col3)
            linha.appendChild(col4)
            linha.appendChild(col5)
            linha.appendChild(col6)
            col5.appendChild(imageRemove)
            col6.appendChild(imageAtualizar)
        })
    }
    req.send()
}
function remover(id) {
    var req = new XMLHttpRequest()

    req.open('DELETE', 'http://localhost:8080/api/produto/'+id, true)

    req.onload = function() {
        if((req.status >= 200) && (req.status < 400)){
            console.log('Conenctou com sucesso')
        }else{
            console.log('Falha na conexão')
        }
    }
    req.send()
    alert('Produto removido com sucesso')
    location.reload()
}

function atualizar(produto) {

   document.getElementById("descricao").value = produto.descricao
   Number(document.getElementById("preco").value) =  produto.preco
   Number(document.getElementById("qtd").value) =   produto.qtd
   document.getElementById("nome").value =  produto.nome
   
   document.getElementById("id").value = produto.id


}