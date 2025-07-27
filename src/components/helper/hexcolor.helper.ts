export function lightenHexColor(hex: string, percent = 20) {
    if(!hex) return;
    // Hapus tanda "#" jika ada
    hex = hex.replace(/^#/, '');
  
    // Jika format 3 digit, ubah ke 6 digit
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
  
    // Ubah ke RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    // Buat lebih terang
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
    // Ubah kembali ke hex
    const toHex = (c: number) => c.toString(16).padStart(2, '0');
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }