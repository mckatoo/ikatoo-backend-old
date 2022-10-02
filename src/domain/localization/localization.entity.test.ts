import { generateString } from '@infra/generate'
import { Localization, LocalizationProps } from './localization.entity'

describe('Test Localization Test', () => {
  it('constructor without id', () => {
    const localizationData: LocalizationProps = {
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }
    const localization = Localization.create(localizationData)
    expect(localization.toJson()).toStrictEqual({
      id: localization.id,
      ...localizationData
    })

    expect(localization.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const localizationData: LocalizationProps = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }
    const localization = Localization.create(localizationData)

    expect(localization.toJson()).toEqual(localizationData)
  })
})
