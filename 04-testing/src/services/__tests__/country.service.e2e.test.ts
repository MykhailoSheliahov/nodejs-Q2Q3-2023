import axios from 'axios';

import { PUBLIC_HOLIDAYS_API_URL } from '../../config';
import { countryInfoMock, countryLongWeekendsMock } from '../__mocks__/country.service.mock';

describe('#country.service', () => {
  const countryCode = 'AD';

  describe('api/v3/CountryInfo/{countryCode}', () => {
    it('should return country info for the given country', async () => {
      const res = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/CountryInfo/${countryCode}`);
      expect(res.data).toStrictEqual(countryInfoMock);
    });
  });

  describe('api/v3/LongWeekend/{year}/{countryCode}', () => {
    it.skip('should return long weekends for a given country', async () => {
      const year = new Date().getFullYear();

      const res = await axios.get(`${PUBLIC_HOLIDAYS_API_URL}/LongWeekend/${year}/${countryCode}`);
      expect(res.data).toStrictEqual(countryLongWeekendsMock);
    });
  });
});
