const inputCep = document.querySelector(`[date-form="cep"]`)
const btn = document.querySelector(`[date-form="btn"]`)

const masks = {
     cep (value) {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
     }
}

inputCep.addEventListener('input', (e) => {
    e.target.value = masks.cep(e.target.value)
})


btn.addEventListener('click', async function buscadoCep(e) {
    e.preventDefault()

    const cep = inputCep.value
    const endereço = await buscandoEndereço(cep)

})

async function buscandoEndereço(cep){
    try{
    const busca = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((res) => {
        if (res.erro){
            inputCep.value = 'CEP Inválido!'
            inputCep.style.borderColor = "red"
        } else {
            document.querySelector('[name="endereco"]').value = res.logradouro
            document.querySelector('[name="ddd"]').value = res.ddd
            document.querySelector('[name="bairro"]').value = res.bairro
            document.querySelector('[name="complemento"]').value = res.complemento
            document.querySelector('[name="cidade"]').value = res.localidade
            document.querySelector('[name="estado"]').value = res.uf
            inputCep.style.borderColor = ""
        }
       
    })
    return busca
    } catch(error) {
        inputCep.value = 'CEP Inválido!'
        inputCep.style.borderColor = "red"
    }
}
