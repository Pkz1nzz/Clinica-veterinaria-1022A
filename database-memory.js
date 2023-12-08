import { randomUUID } from "crypto"

export class DatabaseMemory{
#cirurgias = new Map()

list(search){
    return Array.from(this.#cirurgias.entries()).map((cirurgiasArray) =>{
    // acessando primeira posição
        const id = cirurgiasArray[0]
        const data = cirurgiasArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(cirurgia => {
        if (search){
            return cirurgia.raca.includes(search)
        }
        return true
    })
}
create(cirurgia){
    const cirurgiaId = randomUUID()
    this.#cirurgias.set(cirurgiaId, cirurgia)
}
update(id, cirurgia){
    this.#cirurgias.set(id, cirurgia)
}
delete(id, cirurgia){
    this.#cirurgias.delete(id, cirurgia)
}
}