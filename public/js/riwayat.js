// function INPUT db to table
const updateTabel = () => {

  $("table").find("tr:gt(0)").remove();
  const selectedTanggal = $("#selecttgl").val();
  const tgl = Object.keys(masukharga[selectedTanggal]);
  tgl.forEach(jam => {
    const jamBeli = Object.keys(masukharga[selectedTanggal][jam]).slice(0, -1);

    jamBeli.forEach(barang => {
      const total = masukharga[selectedTanggal][jam].total;
      const {
        harga,
        jumlah,
        subtotal
      } = masukharga[selectedTanggal][jam][barang];
      $("table ").append(`<tr>
        <td>${jam}</td>
        <td>${barang}</td>
        <td>${harga}</td>
        <td>${jumlah}</td>
        <td>${subtotal}</td>
        <td>${total}</td>
        </tr>`);
    });
  });
}