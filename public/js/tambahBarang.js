function tambah() {

  const barang = tambahbarang.nama.value
  const harga = parseInt(tambahbarang.harga.value)
  dataharga[barang] = {
    harga
  }
  fs.writeFile('./dataHarga.json', JSON.stringify(dataharga), (e) => {
    if (e) console.log(e);
  });
  document.getElementById('alert').innerHTML = "Berhasil menambahkan " + barang + " Harga: " + harga;
  document.getElementById('namatambah').value = null;
  return document.getElementById('hargatambah').value = null;
}