import { describe, expect } from '@jest/globals';

import { validateInput, shortenPublicHoliday } from '../helpers';

describe('#helpers', () => {
  describe('validateInput', () => {
    const year = new Date().getFullYear();

    it('should return true if params is empty', () => {
      expect(validateInput({})).toStrictEqual(true);
    });

    it.each([
      { country: 'GB', value: true },
      { country: 'FR', value: true },
      { country: 'DE', value: true },
      { country: 'NL', value: true },
    ])('should return true if country is valid', ({ country, value }) => {
      expect(validateInput({ country })).toStrictEqual(value);
    });

    // it('should return true if year is valid', () => {
    //   expect(validateInput({ year })).toStrictEqual(true);
    // });

    it.each([
      { country: 'GB', value: true },
      { country: 'FR', value: true },
      { country: 'DE', value: true },
      { country: 'NL', value: true },
    ])('should return true if country and year is valid', ({ country, value }) => {
      expect(validateInput({ country, year })).toStrictEqual(value);
    });

    it('should return error if country is not valid', () => {
      expect(() => validateInput({ country: 'UK' })).toThrow(Error);
      expect(() => validateInput({ country: 'UK' })).toThrow(
        'Country provided is not supported, received: UK',
      );
    });

    it('should return error if year is not valid', () => {
      expect(() => validateInput({ year: 2022 })).toThrow(Error);
      expect(() => validateInput({ year: 2022 })).toThrow(
        'Year provided not the current, received: 2022',
      );
    });

    it('should return error if country is not valid and year is valid', () => {
      expect(() => validateInput({ country: 'UK', year })).toThrow(Error);
      expect(() => validateInput({ country: 'UK', year })).toThrow(
        'Country provided is not supported, received: UK',
      );
    });

    it.each([{ country: 'GB' }, { country: 'FR' }, { country: 'DE' }, { country: 'NL' }])(
      'should return error if country is valid and year is not valid',
      ({ country }) => {
        expect(() => validateInput({ country, year: 2022 })).toThrow(Error);
        expect(() => validateInput({ country, year: 2022 })).toThrow(
          'Year provided not the current, received: 2022',
        );
      },
    );
  });

  describe('shortenPublicHoliday', () => {
    const publicHoliday = {
      date: '2023-04-07',
      localName: 'Good Friday',
      name: 'Good Friday',
      countryCode: 'GB',
      fixed: true,
      global: true,
      counties: ['GB'],
      launchYear: null,
      types: ['public'],
    };

    const publicHolidayShortMock = {
      name: 'Good Friday',
      localName: 'Good Friday',
      date: '2023-04-07',
    };

    it('should return correct shortenPublicHoliday data ', () => {
      expect(shortenPublicHoliday(publicHoliday)).toStrictEqual(publicHolidayShortMock);
    });
  });
});
