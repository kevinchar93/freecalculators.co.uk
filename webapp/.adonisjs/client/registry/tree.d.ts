/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  health: typeof routes['health']
  home: typeof routes['home']
  calculators: typeof routes['calculators']
  mortgageCalculator: typeof routes['mortgage-calculator'] & {
    assumptions: typeof routes['mortgage-calculator.assumptions']
  }
  blog: typeof routes['blog']
  aboutUs: typeof routes['about-us']
  privacyPolicy: typeof routes['privacy-policy']
  termsOfService: typeof routes['terms-of-service']
}
