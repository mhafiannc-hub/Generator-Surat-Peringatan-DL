/**
 * Navigasi antar tab di sidebar
 */
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    
    const btnInput = document.getElementById('btn-tab-input');
    const btnSettings = document.getElementById('btn-tab-settings');
    
    if(tabId === 'input') {
        btnInput.className = 'flex-1 py-2 text-sm rounded-md font-bold transition bg-white text-slate-800 shadow-sm';
        btnSettings.className = 'flex-1 py-2 text-sm rounded-md font-bold transition text-slate-600 hover:bg-slate-300';
    } else {
        btnSettings.className = 'flex-1 py-2 text-sm rounded-md font-bold transition bg-white text-slate-800 shadow-sm';
        btnInput.className = 'flex-1 py-2 text-sm rounded-md font-bold transition text-slate-600 hover:bg-slate-300';
    }
}

/**
 * Menyimpan template dan kembali ke tab input
 */
function saveAndRefresh() {
    generateSP();
    switchTab('input');
}

/**
 * Logika utama Generator Surat Peringatan
 */
function generateSP() {
    const nama = document.getElementById('inputNama').value || '......................';
    const jabatan = document.getElementById('inputJabatan').value || '......................';
    const poin = parseInt(document.getElementById('inputPoin').value) || 0;
    const penjabaran = document.getElementById('inputPenjabaran').value || '(penjabaran belum diisi)';
    
    // Templates dari Dashboard Settings
    const sanksi1 = document.getElementById('setSanksi1').value;
    const sanksi2 = document.getElementById('setSanksi2').value;
    const sanksi3 = document.getElementById('setSanksi3').value;
    const textMasa = document.getElementById('setMasaBerlaku').value;
    const textHarapan = document.getElementById('setHarapan').value;
    
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    
    // Element Pratinjau
    const viewNama = document.getElementById('viewNama');
    const viewJabatan = document.getElementById('viewJabatan');
    const viewNomor = document.getElementById('viewNomor');
    const viewJudul = document.getElementById('viewJudul');
    const viewDeskripsi = document.getElementById('viewDeskripsi');
    const viewSanksi = document.getElementById('viewSanksi');
    const viewNextStep = document.getElementById('viewNextStep');
    const viewMasaBerlaku = document.getElementById('viewMasaBerlaku');
    const viewHarapan = document.getElementById('viewHarapan');

    // Set Data Dasar
    viewNama.innerText = nama;
    viewJabatan.innerText = jabatan;
    viewNomor.innerText = `Nomor: SP-${randomNum}/I/HRD-HQDL/04012026`;
    viewDeskripsi.innerText = `Dengan kesalahan indispliner presensi hingga mencapai ${poin} poin tata tertib dengan ${penjabaran}.`;
    viewMasaBerlaku.innerText = textMasa;
    viewHarapan.innerText = textHarapan;

    // Logika Berdasarkan Poin Pelanggaran
    if (poin < 7) {
        // SP-1
        viewJudul.innerText = "SURAT PERINGATAN KE-1";
        viewSanksi.innerText = sanksi1;
        viewSanksi.classList.remove('text-red-700');
        viewNextStep.innerHTML = "Jika saudara mengulangi perbuatan tersebut dan mencapai akumulasi <span class='text-blue-700 font-bold'>7 poin</span>, maka perusahaan akan otomatis mengeluarkan Surat Peringatan Ke-2 (SP-2).";
    } else if (poin >= 7 && poin < 10) {
        // SP-2
        viewJudul.innerText = "SURAT PERINGATAN KE-2";
        viewSanksi.innerText = sanksi2;
        viewSanksi.classList.remove('text-red-700');
        viewNextStep.innerHTML = "Jika saudara mengulangi kembali kesalahan yang sama atau mencapai akumulasi <span class='text-red-700 font-bold'>10 poin</span>, maka perusahaan akan otomatis melanjutkan ke Surat Peringatan Ke-3 (SP-3) dan Pemutusan Hubungan Kerja (PHK).";
    } else {
        // SP-3 (PHK)
        viewJudul.innerText = "SURAT PERINGATAN KE-3 (PHK)";
        viewSanksi.innerText = sanksi3;
        viewSanksi.classList.add('text-red-700');
        viewNextStep.innerHTML = "<span class='text-red-700 font-bold uppercase'>Surat ini merupakan peringatan terakhir dan berakibat pada pemutusan hubungan kerja.</span>";
    }
}

// Jalankan fungsi saat halaman dimuat pertama kali
window.onload = generateSP;
