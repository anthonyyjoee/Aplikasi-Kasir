// looping nama barang
$(document).ready(function() {
  const keys = Object.keys(dataharga);
  keys.forEach(v => {

    $("select").append(`<option id="${v} "name="${dataharga[v].kategori}" value="${v}">${v}</option>`);
  });
})



// rumus harga
function hooh() {
  var jikakosong = document.getElementById('jumlah').value

  if (jikakosong == 0) {
    document.getElementById('semua').value = null;

  } else {
    var harga = dataharga[document.jual.barang.value].harga
    var ju = parseFloat(document.getElementById('jumlah').value)
    var ttl = harga * ju;
    document.getElementById('semua').value = ttl;
  }
}

//print table
function tab() {
  var harga = dataharga[document.jual.barang.value].harga
  var barang = document.getElementById('namabarang').value
  var jumlah = document.getElementById('jumlah').value
  var total = document.getElementById('semua').value

  $("#huu").append(`<tr class="unit"> <td>${barang}</td> <td>${harga}</td> <td>${jumlah}</td> <td class="subtotal"><input type="text" value="${total}" id="ilg"></input></td> <td class="hapusBarang"><a style="cursor: pointer;" onclick="(this.parentElement).parentElement.remove();">❌</a></td> </tr>`);

  document.getElementById('semua').value = null;
  document.getElementById('jumlah').value = null;
}


let total = [];
const proses = () => {

  const elements = document.getElementsByClassName("subtotal");
  for (var j = 0; j < elements.length; j++) {
    total.push(parseInt(elements[j].children[0].value));
  }

  $("#huu").append(`<tr>
    <td></td>
    <td></td>
    <hr>
    <th style="text-align:center; border-top: 1px solid black;">Total:</th>
    <td id="ttl" style="text-align: center; border-top: 1px solid black;">${total.reduce((a, b) => a + b)}</td>
    <td class="hapusBarang"><a style="cursor: pointer; border-top: 1px solid black;" onclick="(this.parentElement).parentElement.remove();"></a></td>
    </tr>
    `);
}
// <tr>
// <td></td>
// <td></td>
// <td>Jumlah Uang:</td>
// <td><input id="kemb" type="text" name="" value="" width="20px"></td>
// </tr>

// function kembalian() {
//   var uang = parseInt(document.getElementById('kemb').value);
//   var tot = parseInt(document.getElementById('ttl').innerHTML);
//   var kem = uang - tot;
//
//   $("#huu").append(`<tr>
//     <td></td>
//     <td></td>
//     <td>Kembalian:</td>
//     <td id="kemak"></td>
//     `);
//
//   document.getElementById('kemak').innerHTML = kem;
// }

// function nest
const nest = (obj, keys, v) => {
  if (keys.length === 1) {
    obj[keys[0]] = v;
  } else {
    var key = keys.shift();
    obj[key] = nest(typeof obj[key] === "undefined" ? {} : obj[key], keys, v);
  }

  return obj;
};

const selesai = () => {
  // array yag aka di push
  let nama = [],
    harga = [],
    jumlah = [],
    subtotal = [];

  // select tr
  const unit = document.getElementsByClassName("unit");

  // sistem penanggalan
  const d = new Date();
  const tahun = d.getFullYear();
  const bulan = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  const tanggal = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const jam = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  const menit = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const detik = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  const fullTanggal = `${tahun}-${bulan}-${tanggal}`;
  const fullJam = `${jam}:${menit}:${detik}`;

  // amil data dari table
  for (var i = 0; i < unit.length; i++) {
    nama.push(unit[i].children[0].innerHTML);
    harga.push(parseInt(unit[i].children[1].innerHTML));
    jumlah.push(parseInt(unit[i].children[2].innerHTML));
    subtotal.push(parseInt(unit[i].children[3].children[0].value));
  }

  console.log(subtotal);
  for (var i = 0; i < nama.length; i++) {
    // write jumlah ke json
    nest(
      masukharga,
      [
        [fullTanggal],
        [fullJam],
        [nama[i]], "jumlah"
      ],
      jumlah[i]);

    // Write harga
    nest(masukharga, [
      [fullTanggal],
      [fullJam],
      [nama[i]], "harga"
    ], harga[i]);

    // write Subtotal
    nest(
      masukharga,
      [
        [fullTanggal],
        [fullJam],
        [nama[i]], "subtotal"
      ],
      subtotal[i]);
  }

  //write total
  nest(
    masukharga,
    [
      [fullTanggal],
      [fullJam], "total"
    ],
    subtotal.reduce((a, b) => a + b));

  fs.writeFile('./pennjualan.json', JSON.stringify(masukharga), (e) => {
    if (e) console.log(e);
  });

  document.getElementById('output').innerHTML = "Penjualan berhasil";
  $("#huu").find("tr:gt(0)").remove();
}