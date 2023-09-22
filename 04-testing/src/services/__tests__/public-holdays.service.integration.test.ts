import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from '../public-holidays.service';
import {
  listOfPublicHolidaysForGBMock,
  listOfPublicHolidaysForFRMock,
  listOfPublicHolidaysForDEMock,
  listOfPublicHolidaysForNLMock,
  listOfNextPublicHolidaysForGBMock,
  listOfNextPublicHolidaysForFRMock,
  listOfNextPublicHolidaysForDEMock,
  listOfNextPublicHolidaysForNLMock,
} from '../__mocks__/public-holidays.service.mock';

describe('#public-holidays.service', () => {
  const country = 'GB';
  const year = new Date().getFullYear();
  const incorrectCountry = 'US';
  const incorrectYear = 2022;
  const errorYearMessage = `Year provided not the current, received: ${incorrectYear}`;
  const errorCountryMessage = `Country provided is not supported, received: ${incorrectCountry}`;

  describe('getListOfPublicHolidays', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call getListOfPublicHolidays API with incorrect year and return error on validateInput', async () => {
      await expect(getListOfPublicHolidays(incorrectYear, country)).rejects.toThrow(
        new Error(errorYearMessage),
      );
    });

    it('should call getListOfPublicHolidays API with incorrect country and return error on validateInput', async () => {
      await expect(getListOfPublicHolidays(year, incorrectCountry)).rejects.toThrow(
        new Error(errorCountryMessage),
      );
    });

    //TODO: fix test

    it.each([
      { country: 'GB', value: listOfPublicHolidaysForGBMock },
      { country: 'FR', value: listOfPublicHolidaysForFRMock },
      { country: 'DE', value: listOfPublicHolidaysForDEMock },
      // { country: 'NL', value: listOfPublicHolidaysForNLMock },
    ])('should return valid value if country and year are valid', async ({ country, value }) => {
      const data = await getListOfPublicHolidays(year, country);
      expect(data).toStrictEqual(value);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call checkIfTodayIsPublicHoliday API with incorrect country and return error on validateInput', async () => {
      await expect(checkIfTodayIsPublicHoliday(incorrectCountry)).rejects.toThrow(
        new Error(errorCountryMessage),
      );
    });

    it('should return valid value if country is valid', async () => {
      const data = await checkIfTodayIsPublicHoliday(country);
      expect(data).toStrictEqual(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call getNextPublicHolidays API with incorrect country and return error on validateInput', async () => {
      await expect(getNextPublicHolidays(incorrectCountry)).rejects.toThrow(
        new Error(errorCountryMessage),
      );
    });

    //TODO: fix test
    // it.each([
    //   { country: 'GB', value: listOfNextPublicHolidaysForGBMock },
    //   { country: 'FR', value: listOfNextPublicHolidaysForFRMock },
    //   { country: 'DE', value: listOfNextPublicHolidaysForDEMock },
    //   { country: 'NL', value: listOfNextPublicHolidaysForNLMock },
    // ])('should return valid value ii country is valid', async ({ country, value }) => {
    //   const data = await getNextPublicHolidays(country);
    //   expect(data).toStrictEqual(value);
    // });
  });
});
