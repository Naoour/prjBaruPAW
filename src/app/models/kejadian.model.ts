export interface Kejadian{
    eventTitle: string;            // Judul Kejadian
    eventCategory: string;         // Kategori Kejadian
    eventDate: string;             // Tanggal dan Waktu Kejadian (dalam format string)
    eventAddress: string;          // Alamat Kejadian
    eventCoordinates?: string;     // Koordinat GPS (opsional)
    eventDescription: string;      // Deskripsi Kejadian
    eventMedia?: string;   
}