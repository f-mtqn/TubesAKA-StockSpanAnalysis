# Analisis Perbandingan Algoritma Stock Span Problem: Iteratif vs Rekursif

![Tech Stack](https://img.shields.io/badge/Language-HTML%20%7C%20JS%20%7C%20CSS-blue)
![Algorithm](https://img.shields.io/badge/Algorithm-Stack%20vs%20Recursion-orange)

Proyek ini adalah Tugas Besar mata kuliah Analisis Kompleksitas Algoritma (AKA) Universitas Telkom. Kami menganalisis efisiensi dua pendekatan algoritma untuk menyelesaikan **Stock Span Problem**, sebuah kasus nyata dalam menentukan momentum tren pasar saham.

## 👥 Anggota Tim
* **Farabi Arafat Muttaqien** - 103012430003
* **Naufal Yuava Rasyadan** - 103012400210
* **Muhammad Rafif A** - 103012430065

## 🔍 Deskripsi Masalah
Stock Span Problem menghitung jumlah hari berturut-turut sebelum hari ini di mana harga saham lebih kecil atau sama dengan harga hari ini. Kami membandingkan dua solusi:
1.  **Rekursif (Naive):** Pendekatan Brute Force dengan kompleksitas waktu **O(N²)**.
2.  **Iteratif (Stack):** Pendekatan Teroptimasi menggunakan struktur data Stack dengan kompleksitas waktu **O(N)**.

## 🚀 Fitur Aplikasi
Aplikasi berbasis web ini memungkinkan pengguna untuk:
* Memilih skenario data: **Random Case** (Acak) atau **Ascending Case** (Worst Case).
* Menjalankan pengujian otomatis untuk input N = 10 hingga 10.000.
* Melihat visualisasi grafik perbandingan Running Time (ms).
* Mendeteksi batas kemampuan memori (**Stack Overflow**).

## 📊 Hasil Analisis Singkat
Berdasarkan pengujian empiris:
| Algoritma | Time Complexity | Space Complexity | Status N=10.000 |
|-----------|-----------------|------------------|-----------------|
| **Iteratif (Stack)** | **O(N)** - Linear | O(N) - Heap | ✅ Berhasil (Stabil) |
| **Rekursif (Naive)** | **O(N²)** - Kuadratik | O(N) - Call Stack | ❌ **Stack Overflow** |

**Kesimpulan:** Algoritma Iteratif jauh lebih efisien dan stabil untuk data saham berskala besar dan real-time.

## 🛠️ Teknologi yang Digunakan
* HTML5, CSS3, JavaScript (ES6)
* **Chart.js** untuk visualisasi grafik data.

## 📂 Dokumen Lengkap
Untuk analisis mendalam, silakan baca laporan lengkap kami di folder `documents/`.

---
© 2025 Telkom University
