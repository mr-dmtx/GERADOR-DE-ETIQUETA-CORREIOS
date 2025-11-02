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

  const canvas = document.getElementById("canvasEtiqueta");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "24px Arial";
  ctx.fillText("Destinatário:", 10, 80);
  ctx.fillText(destinatario.nome, 10, 110);
  ctx.fillText(
    `${document.getElementById("enderecoDestinatario").value}, ${document.getElementById("numeroEnderecoDestinatario").value}, ${document.getElementById("complementoEnderecoDestinatario").value}`,
    10,
    140,
  );
  ctx.fillText(
    `${document.getElementById("bairroDestinatario").value} - ${document.getElementById("cidadeDestinatario").value} - ${document.getElementById("ufDestinatario").value}`,
    10,
    170,
  );
  ctx.beginPath();
  ctx.moveTo(20, 210);
  ctx.lineTo(980, 210);
  ctx.stroke();
  ctx.fillText("Remetente:", 10, 250);
  ctx.fillText(document.getElementById("nomeRemetente").value, 10, 280);
  ctx.fillText(
    `${document.getElementById("enderecoRemetente").value}, ${document.getElementById("numeroEnderecoRemetente").value}, ${document.getElementById("complementoEnderecoRemetente").value}`,
    10,
    310,
  );
  ctx.fillText(
    `${document.getElementById("bairroRemetente").value} - ${document.getElementById("cidadeRemetente").value} - ${document.getElementById("ufRemetente").value}`,
    10,
    340,
  );
}

function ImprimirEtiqueta() {
  window.print();
}