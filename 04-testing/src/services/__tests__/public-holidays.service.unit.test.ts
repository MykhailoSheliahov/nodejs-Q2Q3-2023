import axios from 'axios'

import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from '../public-holidays.service'

import * as helpers from '../../helpers'
import { PUBLIC_HOLIDAYS_API_URL } from '../../config'

const axiosGetSpy = jest.spyOn(axios, 'get')
const validateInputSpy = jest.spyOn(helpers, 'validateInput')
const shortenPublicHolidaySpy = jest.spyOn(helpers, 'shortenPublicHoliday')

describe('#public-holidays.service', () => {
  const country = 'GB'
  const errorMessage = 'Error is ocurred'
  const data = [
    {
      date: '2023-05-18',
      localName: 'Good Friday',
      name: 'Good Friday',
      countryCode: 'GB',
      fixed: true,
      global: true,
      counties: ['GB'],
      launchYear: null,
      types: ['public'],
    },
  ]
  const shortenPublicHoliday = {
    name: data[0].name,
    date: data[0].date,
    localName: data[0].localName,
  }

  describe('getListOfPublicHolidays', () => {
    const year = new Date().getFullYear()

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return error on validateInput', async () => {
      validateInputSpy.mockImplementation(() => {
        throw new Error(errorMessage)
      })

      await expect(getListOfPublicHolidays(year, country)).rejects.toThrow(new Error(errorMessage))
    })

    it('should call getListOfPublicHolidays API with proper arguments and return valid data', async () => {
      validateInputSpy.mockReturnValue(true)
      axiosGetSpy.mockResolvedValue({ data })
      shortenPublicHolidaySpy.mockReturnValue(shortenPublicHoliday)

      const holidays = await getListOfPublicHolidays(year, country)

      expect(axiosGetSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`,
      )
      expect(holidays).toStrictEqual([shortenPublicHoliday])
    })

    it('should call getListOfPublicHolidays API with throwing an Error and return empty array data', async () => {
      validateInputSpy.mockReturnValue(true)
      axiosGetSpy.mockRejectedValue(new Error(errorMessage))

      const holidays = await getListOfPublicHolidays(year, country)

      expect(holidays).toStrictEqual([])
    })
  })

  describe('checkIfTodayIsPublicHoliday', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return error on validateInput', async () => {
      validateInputSpy.mockImplementation(() => {
        throw new Error(errorMessage)
      })

      await expect(checkIfTodayIsPublicHoliday(country)).rejects.toThrow(new Error(errorMessage))
    })

    it('should call checkIfTodayIsPublicHoliday API with proper arguments and return valid data', async () => {
      validateInputSpy.mockReturnValue(true)
      axiosGetSpy.mockResolvedValue({ status: 200 })

      const status = await checkIfTodayIsPublicHoliday(country)

      expect(axiosGetSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`,
      )
      expect(status).toBe(true)
    })

    it('should call checkIfTodayIsPublicHoliday API with throwing an Error and return false', async () => {
      validateInputSpy.mockReturnValue(true)
      axiosGetSpy.mockRejectedValue(new Error(errorMessage))

      const holidays = await checkIfTodayIsPublicHoliday(country)

      expect(holidays).toStrictEqual(false)
    })
  })

  describe('getNextPublicHolidays', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return error on validateInput', async () => {
      validateInputSpy.mockImplementation(() => {
        throw new Error(errorMessage)
      })

      await expect(getNextPublicHolidays(country)).rejects.toThrow(new Error(errorMessage))
    })

    it('should call getNextPublicHolidays API with proper arguments and return true', async () => {
      validateInputSpy.mockReturnValue(true)
      axiosGetSpy.mockResolvedValue({ data })
      shortenPublicHolidaySpy.mockReturnValue(shortenPublicHoliday)

      const holiday = await getNextPublicHolidays(country)

      expect(axiosGetSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`,
      )
      expect(holiday).toStrictEqual([shortenPublicHoliday])
    })

    it('should call getNextPublicHolidays API with throwing an Error and return empty array', async () => {
      validateInputSpy.mockReturnValue(true)
      axiosGetSpy.mockRejectedValue(new Error(errorMessage))

      const holidays = await getNextPublicHolidays(country)

      expect(holidays).toStrictEqual([])
    })
  })
})
