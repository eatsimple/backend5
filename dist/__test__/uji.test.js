"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//? implementasi dari MOCK UP / OBJEK PALSU , menggunakan jest.fn();
describe('try test', () => {
    //? ini contoh bagus
    //   const mockFn = jest.fn();
    //   mockFn();
    //   expect(mockFn).toHaveBeenCalled();
    //! ONE
    const mockFunc = jest.fn(() => {
        return 'hello testing';
    });
    mockFunc.mockReturnValueOnce('goodbye');
    test('check return value of mock function when called once', () => {
        expect(mockFunc()).toBe('goodbye'); // otomatis instance menjadi function
    });
    test('check return value of mock function after called once', () => {
        expect(mockFunc()).toBe('hello testing');
    });
    //! TWO ##
    // Fungsi yang akan diuji
    function tambah(a, b) {
        return a + b;
    }
    test('memastikan fungsi tambah dipanggil dengan argumen yang benar', () => {
        const mockTambah = jest.fn(tambah); // function masuk sini, dan otomatis instance menjadi function
        const hasil = mockTambah(2, 3); // panggil fungsi dengan variable
        expect(mockTambah).toHaveBeenCalledWith(2, 3);
        expect(hasil).toBe(5);
    });
    //! THREE ##
    // Fungsi yang akan diuji
    function panggilFungsi(callback) {
        callback();
    }
    // Pengujian
    test('memastikan fungsi dipanggil', () => {
        const mockCallback = jest.fn();
        panggilFungsi(mockCallback);
        expect(mockCallback).toHaveBeenCalled();
    });
    //! FOUR ##
    // Fungsi yang akan diuji
    function hitungPanggilan() {
        console.log('Fungsi dipanggil');
    }
    // Pengujian
    test('memastikan fungsi dipanggil sebanyak 3 kali', () => {
        const mockFungsi = jest.fn(hitungPanggilan);
        mockFungsi();
        mockFungsi();
        mockFungsi();
        expect(mockFungsi).toHaveBeenCalledTimes(3);
    });
    //! FIVE ##
    // Fungsi yang akan diuji
    function kali(a, b) {
        return a * b;
    }
    // Pengujian
    test('memastikan fungsi kali mengembalikan hasil perkalian yang benar', () => {
        const mockKali = jest.fn(kali);
        mockKali.mockReturnValue(8);
        const hasil = mockKali(2, 4);
        expect(mockKali).toHaveBeenCalledWith(2, 4);
        expect(hasil).toBe(8);
    });
    //! SIX ##
    // Fungsi yang akan diuji
    function fungsiBerkepanjangan() {
        console.log('Fungsi yang berkepanjangan');
    }
    // Pengujian
    test('memastikan fungsi dilepas setelah pengujian', () => {
        const mockFungsi = jest.fn(fungsiBerkepanjangan);
        mockFungsi();
        expect(mockFungsi).toHaveBeenCalled();
        mockFungsi.mockRestore();
        expect(mockFungsi).toHaveBeenCalledTimes(0);
    });
    //! ANDI ##
    describe('first', () => {
        it('should pass', async () => {
            let name = 'andi';
            expect(name).toBe('andi');
        });
    });
});
