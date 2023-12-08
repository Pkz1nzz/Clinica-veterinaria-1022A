import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/cirurgia', (request, reply) => {
// Acessando dados do corpo da requisição
    const {raca, tipo_cirurgia, preco} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        raca: raca,
        tipo_cirurgia: tipo_cirurgia,
        preco: preco,
    })

    return reply.status(201).send
})

server.get('/cirurgia', (request) => {
    const search = request.query.search
    console.log(search)
    const cirurgias = database.list(search)
    console.log(cirurgias)
    return cirurgias
})

server.put('/cirurgias/:id', (request, reply) => {
    const cirurgiaId = request.params.id
    const {raca, tipo_cirurgia, preco} = request.body
    const cirurgia = database.update(cirurgiaId, {
        raca: raca,
        tipo_cirurgia: tipo_cirurgia,
        preco: preco,
    })
    return reply.status(204).send()
})

server.delete('/cirurgias/:id', (request, reply) => {
    const cirurgiaId = request.params.id

    database.delete(cirurgiaId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})