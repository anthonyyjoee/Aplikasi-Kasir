function lod() {
  Object
    .keys(dataharga)
    .forEach(v => {
      form[v].value = dataharga[v].harga
    })
}

// function masukan data barang
function edit() {
  Object
    .keys(dataharga)
    .forEach(v => {
      dataharga[v].harga = parseInt(document.getElementById(v).value);

      // write data ke json file
      fs.writeFile('./dataHarga.json', JSON.stringify(dataharga), (e) => {
        if (e) 
          console.log(e);
        }
      );
    })
}

try {} catch (e) {}

$(document).ready(function () {
  const keys = Object.keys(dataharga);
  keys.forEach(v => {

    $("#customers").append(`<tr>
    <td>${v}</td>
    <td style="text-align:left; padding-left: 7px;">Rp. <input class="hilang" type="text" id="${v}" name="${v}"></input></td>
  </tr>`);
  });
  lod()
})
