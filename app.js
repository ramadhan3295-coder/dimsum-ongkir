const data = [
  { jarak: '0–3 km', ongkir: 5000, minPcs: 10, dist: 3 },
  { jarak: '3–5 km', ongkir: 8000, minPcs: 15, dist: 5 },
  { jarak: '5–8 km', ongkir: 10000, minPcs: 20, dist: 8 },
  { jarak: '8–12 km', ongkir: 13000, minPcs: 25, dist: 12 },
  { jarak: '12–15 km', ongkir: 15000, minPcs: 30, dist: 15 },
  { jarak: '15–20 km', ongkir: 19000, minPcs: 35, dist: 20 },
  { jarak: '20–25 km', ongkir: 23000, minPcs: 45, dist: 25 },
  { jarak: '25–30 km', ongkir: 30000, minPcs: 55, dist: 30 },
  { jarak: '30–35 km', ongkir: 35000, minPcs: 65, dist: 35 },
];

let fuelPrice = 15000;
let minFreePcsOver35 = 65;

function renderTable() {
  const tbody = document.querySelector('#ongkirTable tbody');
  tbody.innerHTML = '';
  const fuelCostPerKm = fuelPrice / 35; // asumsi 1 liter = 35 km
  data.forEach(row => {
    const bbm = (row.dist * 2) * fuelCostPerKm;
    const sisa = row.ongkir - bbm;
    tbody.innerHTML += `
      <tr>
        <td>${row.jarak}</td>
        <td>Rp ${row.ongkir.toLocaleString('id-ID')}</td>
        <td>${row.minPcs} pcs</td>
        <td>Rp ${Math.round(bbm).toLocaleString('id-ID')}</td>
        <td>${sisa > 0 ? 'Rp ' + Math.round(sisa).toLocaleString('id-ID') : '0'}</td>
      </tr>`;
  });
}

function updateFuel() {
  fuelPrice = parseInt(document.getElementById('fuelPrice').value) || 15000;
  minFreePcsOver35 = parseInt(document.getElementById('minFreePcs').value) || 65;
  renderTable();
}

function calcOngkir() {
  const jarak = parseFloat(document.getElementById('jarakInput').value);
  if (isNaN(jarak) || jarak <= 0) {
    document.getElementById('ongkirResult').textContent = "Masukkan jarak yang benar.";
    return;
  }
  let row = data.find(r => jarak <= r.dist);
  let tarif, pcsFree;
  if (row) {
    tarif = row.ongkir;
    pcsFree = row.minPcs;
  } else {
    tarif = 40000 + ((jarak - 35) * 1000); // nego admin (estimasi)
    pcsFree = minFreePcsOver35;
  }

  const fuelCostPerKm = fuelPrice / 35;
  const bbm = jarak * 2 * fuelCostPerKm;
  const sisa = tarif - bbm;

  document.getElementById('ongkirResult').innerHTML = `
    Jarak <b>${jarak} km</b><br>
    Ongkir: <b>Rp ${tarif.toLocaleString('id-ID')}</b><br>
    Estimasi BBM (PP): <b>Rp ${Math.round(bbm).toLocaleString('id-ID')}</b><br>
    Sisa untuk jasa penjual: <b>${sisa > 0 ? 'Rp ' + Math.round(sisa).toLocaleString('id-ID') : '0'}</b><br>
    Gratis ongkir jika beli minimal: <b>${pcsFree} pcs</b>
  `;
}

renderTable();

// 🔹 Daftarkan service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
