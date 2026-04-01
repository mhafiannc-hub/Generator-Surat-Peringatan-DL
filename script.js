/**
 * Berpindah antar tab (Input Data vs Pengaturan Template)
 */
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    
    const btnInput = document.getElementById('btn-tab-input');
    const btnSettings = document.getElementById('btn-tab-settings');
    
    if(tabId === 'input') {
        btnInput.className = 'flex-1 py-2 rounded-md font-bold transition bg-white text-slate-800 shadow-sm';
        btnSettings.className = 'flex-1 py-2 rounded-md font-bold transition text-slate-600 hover:bg-slate-300';
    } else {
        btnSettings.className = 'flex-1 py-2 rounded-md font-bold transition bg-white text-slate-800 shadow-sm';
        btnInput.className = 'flex-1 py-2 rounded-md font-bold transition text-slate-600 hover:bg-slate-300';
    }
}

/**
 * Menyimpan template dan langsung mengupdate tampilan pratinjau
 */
function saveAndRefresh() {
    generateSP();
    switchTab('input');
}

/**
 * Logika utama pembuatan isi Surat Peringatan
 */
function generateSP() {
    // Ambil input karyawan
    const nama = document.getElementById('inputNama').value || '......................';
    const jabatan = document.getElementById('inputJabatan').value || '......................';
    const poin = parseInt(document.getElementById('inputPoin').value) || 0;
    const penjabaran = document.getElementById('inputPenjabaran').value || '(penjabaran belum diisi)';
    
    // Ambil template dari Dashboard
    const sanksi1 = document.getElementById('setSanksi1').value;
    const sanksi2 = document.getElementById('setSanksi2').value;
    const textMasa = document.getElementById('setMasaBerlaku').value;
    const textHarapan = document.getElementById('setHarapan').value;
    
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    
    // Elemen Pratinjau
    const viewNama = document.getElementById('viewNama');
    const viewJabatan = document.getElementById('viewJabatan');
    const viewNomor = document.getElementById('viewNomor');
    const viewJudul = document.getElementById('viewJudul');
    const viewDeskripsi = document.getElementById('viewDeskripsi');
    const viewSanksi = document.getElementById('viewSanksi');
    const viewNextStep = document.getElementById('viewNextStep');
    const viewMasaBerlaku = document.getElementById('viewMasaBerlaku');
    const viewHarapan = document.getElementById('viewHarapan');

    // Terapkan data ke pratinjau
    viewNama.innerText = nama;
    viewJabatan.innerText = jabatan;
    viewNomor.innerText = `Nomor: SP-${randomNum}/I/HRD-HQDL/04012026`;
    viewDeskripsi.innerText = `Dengan kesalahan indispliner presensi hingga mencapai ${poin} poin tata tertib dengan ${penjabaran}.`;
    viewMasaBerlaku.innerText = textMasa;
    viewHarapan.innerText = textHarapan;

    // Logika klasifikasi SP berdasarkan poin
    if (poin < 7) {
        viewJudul.innerText = "SURAT PERINGATAN KE-1";
        viewSanksi.innerText = sanksi1;
        viewNextStep.innerText = "Jika saudara mengulangi perbuatan tersebut dan mencapai akumulasi 7 poin, maka perusahaan akan otomatis mengeluarkan Surat Peringatan Ke-2 (SP-2).";
    } else {
        viewJudul.innerText = "SURAT PERINGATAN KE-2";
        viewSanksi.innerText = sanksi2;
        viewNextStep.innerText = "Jika saudara mengulangi kembali kesalahan yang sama atau mencapai akumulasi 10 poin, maka perusahaan akan otomatis melanjutkan ke Surat Peringatan Ke-3 (SP-3) dan Pemutusan Hubungan Kerja (PHK).";
    }
}