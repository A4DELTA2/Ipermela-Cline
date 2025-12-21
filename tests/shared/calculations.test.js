/**
 * @fileoverview Test per funzioni di calcolo condivise
 */

import { describe, it, expect } from 'vitest';
import {
  calculateTotals,
  calculateSubtotal,
  calculateTax,
  formatPrice
} from '../../js/shared/calculations.js';

describe('calculateTotals', () => {
  it('calcola totali corretti per singolo item', () => {
    const items = [{ price: 122, quantity: 1 }];
    const result = calculateTotals(items);

    expect(result.total).toBe(122);
    expect(result.subtotal).toBe(100);
    expect(result.tax).toBe(22);
  });

  it('calcola totali corretti per multiple quantità', () => {
    const items = [{ price: 122, quantity: 2 }];
    const result = calculateTotals(items);

    expect(result.total).toBe(244);
    expect(result.subtotal).toBe(200);
    expect(result.tax).toBe(44);
  });

  it('calcola totali corretti per items multipli', () => {
    const items = [
      { price: 122, quantity: 2 }, // 244
      { price: 61, quantity: 1 }   // 61
    ];
    const result = calculateTotals(items);

    expect(result.total).toBe(305);
    expect(result.subtotal).toBe(250);
    expect(result.tax).toBe(55);
  });

  it('gestisce carrello vuoto', () => {
    const result = calculateTotals([]);

    expect(result.total).toBe(0);
    expect(result.subtotal).toBe(0);
    expect(result.tax).toBe(0);
  });

  it('gestisce null o undefined', () => {
    const result = calculateTotals(null);

    expect(result.total).toBe(0);
    expect(result.subtotal).toBe(0);
    expect(result.tax).toBe(0);
  });

  it('gestisce items senza price o quantity', () => {
    const items = [
      { price: 122 }, // quantity default = 1
      { quantity: 2 } // price default = 0
    ];
    const result = calculateTotals(items);

    expect(result.total).toBe(122);
    expect(result.subtotal).toBe(100);
    expect(result.tax).toBe(22);
  });

  it('arrotonda correttamente a 2 decimali', () => {
    const items = [{ price: 10, quantity: 3 }]; // 30 total
    const result = calculateTotals(items);

    expect(result.subtotal).toBe(24.59); // 30 / 1.22 = 24.59016...
    expect(result.tax).toBe(5.41); // 30 - 24.59
    expect(result.total).toBe(30);
  });
});

describe('calculateSubtotal', () => {
  it('calcola subtotal da totale IVA inclusa', () => {
    expect(calculateSubtotal(122)).toBe(100);
    expect(calculateSubtotal(244)).toBe(200);
    expect(calculateSubtotal(61)).toBe(50);
  });

  it('gestisce zero', () => {
    expect(calculateSubtotal(0)).toBe(0);
  });

  it('arrotonda a 2 decimali', () => {
    expect(calculateSubtotal(10)).toBe(8.20); // 10 / 1.22 = 8.196...
  });
});

describe('calculateTax', () => {
  it('calcola IVA da totale IVA inclusa', () => {
    expect(calculateTax(122)).toBe(22);
    expect(calculateTax(244)).toBe(44);
  });

  it('gestisce zero', () => {
    expect(calculateTax(0)).toBe(0);
  });

  it('arrotonda a 2 decimali', () => {
    expect(calculateTax(10)).toBe(1.80); // 10 - 8.20
  });
});

describe('formatPrice', () => {
  it('formatta prezzi in Euro', () => {
    expect(formatPrice(122)).toBe('122,00\u00a0€');
    expect(formatPrice(99.99)).toBe('99,99\u00a0€');
  });

  it('gestisce zero', () => {
    expect(formatPrice(0)).toBe('0,00\u00a0€');
  });

  it('gestisce null o undefined', () => {
    expect(formatPrice(null)).toBe('0,00\u00a0€');
    expect(formatPrice(undefined)).toBe('0,00\u00a0€');
  });

  it('formatta con migliaia', () => {
    expect(formatPrice(1234.56)).toBe('1.234,56\u00a0€');
  });
});
