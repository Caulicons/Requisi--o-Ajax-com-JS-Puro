const inputCep = document.querySelector(`[date-form="cep"]`);
const btn = document.querySelector(`[date-form="btn"]`);

/* Mask */
const masks = {
  cep(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  },
};

/* handle inputs */
inputCep.addEventListener("input", (e) => {
  e.target.value = masks.cep(e.target.value);
});

/* Handle inputs */
btn.addEventListener("click", function buscadoCep(e) {
  e.preventDefault();

  const cep = inputCep.value;
  buscandoEndereço(cep);
});

async function buscandoEndereço(cep) {
  try {
    await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((res) => {
        if (res.erro) throw new Error();

        document.querySelector('[name="endereco"]').value = res.logradouro;
        document.querySelector('[name="ddd"]').value = res.ddd;
        document.querySelector('[name="bairro"]').value = res.bairro;
        document.querySelector('[name="complemento"]').value = res.complemento;
        document.querySelector('[name="cidade"]').value = res.localidade;
        document.querySelector('[name="estado"]').value = res.uf;
        inputCep.style.borderColor = "";
      });
  } catch {
    console.log("passou aqui");
    inputCep.value = "CEP Inválido!";
    inputCep.style.borderColor = "red";
  }
}
