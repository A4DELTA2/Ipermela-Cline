/**
 * @fileoverview Test per funzioni di validazione condivise
 */

import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validatePrice,
  validateRange,
  validateLength
} from '../../js/shared/validation.js';

describe('validateEmail', () => {
  it('accetta email valide', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('name+tag@email.com')).toBe(true);
  });

  it('rifiuta email invalide', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
    expect(validateEmail('test @example.com')).toBe(false);
  });

  it('gestisce valori vuoti', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
  });
});

describe('validatePhone', () => {
  it('accetta numeri validi', () => {
    expect(validatePhone('+39 123 456 7890')).toBe(true);
    expect(validatePhone('123-456-7890')).toBe(true);
    expect(validatePhone('(123) 456-7890')).toBe(true);
    expect(validatePhone('1234567890')).toBe(true);
  });

  it('rifiuta numeri troppo corti', () => {
    expect(validatePhone('123')).toBe(false);
    expect(validatePhone('12345')).toBe(false);
  });

  it('rifiuta lettere', () => {
    expect(validatePhone('abc123')).toBe(false);
    expect(validatePhone('phone')).toBe(false);
  });

  it('gestisce valori vuoti', () => {
    expect(validatePhone('')).toBe(false);
    expect(validatePhone(null)).toBe(false);
    expect(validatePhone(undefined)).toBe(false);
  });
});

describe('validateRequired', () => {
  it('accetta valori non vuoti', () => {
    expect(validateRequired('test')).toBe(true);
    expect(validateRequired('Mario Rossi')).toBe(true);
    expect(validateRequired(' value ')).toBe(true);
  });

  it('rifiuta valori vuoti', () => {
    expect(validateRequired('')).toBe(false);
    expect(validateRequired('   ')).toBe(false);
    expect(validateRequired('\t\n')).toBe(false);
  });

  it('gestisce null e undefined', () => {
    expect(validateRequired(null)).toBe(false);
    expect(validateRequired(undefined)).toBe(false);
  });
});

describe('validatePrice', () => {
  it('accetta prezzi validi', () => {
    expect(validatePrice(99.99)).toBe(true);
    expect(validatePrice('99.99')).toBe(true);
    expect(validatePrice(0.01)).toBe(true);
    expect(validatePrice('1000')).toBe(true);
  });

  it('rifiuta prezzi invalidi', () => {
    expect(validatePrice(0)).toBe(false);
    expect(validatePrice(-10)).toBe(false);
    expect(validatePrice('abc')).toBe(false);
    expect(validatePrice(NaN)).toBe(false);
  });

  it('gestisce valori vuoti', () => {
    expect(validatePrice('')).toBe(false);
    expect(validatePrice(null)).toBe(false);
    expect(validatePrice(undefined)).toBe(false);
  });
});

describe('validateRange', () => {
  it('accetta valori nel range', () => {
    expect(validateRange(5, 1, 10)).toBe(true);
    expect(validateRange(1, 1, 10)).toBe(true);
    expect(validateRange(10, 1, 10)).toBe(true);
    expect(validateRange(0, -10, 10)).toBe(true);
  });

  it('rifiuta valori fuori range', () => {
    expect(validateRange(0, 1, 10)).toBe(false);
    expect(validateRange(11, 1, 10)).toBe(false);
    expect(validateRange(-5, 1, 10)).toBe(false);
  });

  it('gestisce stringhe numeriche', () => {
    expect(validateRange('5', 1, 10)).toBe(true);
    expect(validateRange('15', 1, 10)).toBe(false);
  });

  it('rifiuta valori non numerici', () => {
    expect(validateRange('abc', 1, 10)).toBe(false);
    expect(validateRange(NaN, 1, 10)).toBe(false);
  });
});

describe('validateLength', () => {
  it('accetta lunghezze valide', () => {
    expect(validateLength('test', 2, 10)).toBe(true);
    expect(validateLength('ab', 2, 10)).toBe(true);
    expect(validateLength('abcdefghij', 2, 10)).toBe(true);
  });

  it('rifiuta lunghezze invalide', () => {
    expect(validateLength('x', 2, 10)).toBe(false);
    expect(validateLength('abcdefghijk', 2, 10)).toBe(false);
  });

  it('gestisce solo minLength', () => {
    expect(validateLength('test', 2)).toBe(true);
    expect(validateLength('very long string here', 2)).toBe(true);
    expect(validateLength('x', 2)).toBe(false);
  });

  it('trimma gli spazi', () => {
    expect(validateLength('  test  ', 4, 10)).toBe(true);
    expect(validateLength('  x  ', 2, 10)).toBe(false);
  });

  it('gestisce valori vuoti', () => {
    expect(validateLength('', 2, 10)).toBe(false);
    expect(validateLength(null, 2, 10)).toBe(false);
    expect(validateLength(undefined, 2, 10)).toBe(false);
  });
});
