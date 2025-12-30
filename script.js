var CEP_API = "https://brasilapi.com.br/api/cep/v1/";
document
  .getElementById("buscarCepDestinatario")
  .addEventListener("click", ObterEnderecoDestinatario);
document
  .getElementById("buscarCepRemetente")
  .addEventListener("click", ObterEnderecoRemetente);
document
  .getElementById("btnGerarEtiqueta")
  .addEventListener("click", GerarEtiqueta);
document
  .getElementById("btnImprimirEtiqueta")
  .addEventListener("click", ImprimirEtiqueta);

async function ObterEnderecoRemetente() {
  let cep = document.getElementById("cepRemetente").value;
  if (cep == null || cep == "") {
    alert("Digite um CEP válido");
    return;
  }

  let dadosEndereco = await BuscarCep(cep);
  document.getElementById("enderecoRemetente").value = dadosEndereco.street;
  document.getElementById("bairroRemetente").value = dadosEndereco.neighborhood;
  document.getElementById("cidadeRemetente").value = dadosEndereco.city;
  document.getElementById("ufRemetente").value = dadosEndereco.state;
}

async function ObterEnderecoDestinatario() {
  let cep = document.getElementById("cepDestinatario").value;
  if (cep == null || cep == "") {
    alert("Digite um CEP válido");
    return;
  }
  let dadosEndereco = await BuscarCep(cep);
  console.log(dadosEndereco);
  document.getElementById("enderecoDestinatario").value = dadosEndereco.street;
  document.getElementById("bairroDestinatario").value =
    dadosEndereco.neighborhood;
  document.getElementById("cidadeDestinatario").value = dadosEndereco.city;
  document.getElementById("ufDestinatario").value = dadosEndereco.state;

}

async function BuscarCep(cep) {
  const response = await fetch(CEP_API + cep);
  if (!response.ok) {
    alert("CEP inválido!");
    return;
  }
  const dados = await response.json();
  return dados;
}

function GerarEtiqueta() {
  const destinatario = {
    nome: document.getElementById("nomeDestinatario").value,
    cep: document.getElementById("cepDestinatario").value,
    numero: document.getElementById("numeroEnderecoDestinatario").value,
    complemento: document.getElementById("complementoEnderecoDestinatario").value,
    endereco: document.getElementById("enderecoDestinatario").value,
    bairro: document.getElementById("bairroDestinatario").value,
    cidade: document.getElementById("cidadeDestinatario").value,
    uf: document.getElementById("ufDestinatario").value
  };
  const remetente = {
    nome: document.getElementById("nomeRemetente").value,
    cep: document.getElementById("cepRemetente").value,
    numero: document.getElementById("numeroEnderecoRemetente").value,
    complemento: document.getElementById("complementoEnderecoRemetente").value,
    endereco: document.getElementById("enderecoRemetente").value,
    bairro: document.getElementById("bairroRemetente").value,
    cidade: document.getElementById("cidadeRemetente").value,
    uf: document.getElementById("ufRemetente").value
  };

  let html = `
<div>
<p><strong>Destinatário:</strong></p>
<p>${destinatario.nome}</p>
<p>${destinatario.endereco}, ${destinatario.numero}${destinatario.complemento ? ', ' + destinatario.complemento : ''}</p>
<p>${destinatario.bairro} - ${destinatario.cidade} - ${destinatario.uf}</p>
<p>${destinatario.cep}</p>
<hr>
<p><strong>Remetente:</strong></p>
<p>${remetente.nome}</p>
<p>${remetente.endereco}, ${remetente.numero}${remetente.complemento ? ', ' + remetente.complemento : ''}</p>
<p>${remetente.bairro} - ${remetente.cidade} - ${remetente.uf}</p>
<p>${remetente.cep}</p>
</div>
`;

  document.getElementById("etiquetaHTML").innerHTML = html;
}

function ImprimirEtiqueta() {
  window.print();
}