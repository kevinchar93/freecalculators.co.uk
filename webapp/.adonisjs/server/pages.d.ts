import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'about-us-page': ExtractProps<(typeof import('../../inertia/pages/about-us-page.tsx'))['default']>
    'blog-page': ExtractProps<(typeof import('../../inertia/pages/blog-page.tsx'))['default']>
    'calculators-page': ExtractProps<(typeof import('../../inertia/pages/calculators-page.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'mortgage-calculator-page/assumptions': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/assumptions.tsx'))['default']>
    'mortgage-calculator-page/calculations': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/calculations.ts'))['default']>
    'mortgage-calculator-page/components/advert-card': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/advert-card.tsx'))['default']>
    'mortgage-calculator-page/components/after-deal-card': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/after-deal-card.tsx'))['default']>
    'mortgage-calculator-page/components/during-deal-card': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/during-deal-card.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/deal-fields-group': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/deal-fields-group.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/deal-term-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/deal-term-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/deal-type-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/deal-type-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/deposit-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/deposit-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/field-styles': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/field-styles.ts'))['default']>
    'mortgage-calculator-page/components/form-fields/has-deal-checkbox': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/has-deal-checkbox.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/interest-rate-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/interest-rate-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/mortgage-term-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/mortgage-term-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/mortgage-type-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/mortgage-type-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/percent-input': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/percent-input.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/property-price-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/property-price-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/start-date-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/start-date-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/svr-field': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/svr-field.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/thousands-input': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/thousands-input.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/tracker-rate-fields': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/tracker-rate-fields.tsx'))['default']>
    'mortgage-calculator-page/components/form-fields/whole-number-input': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/form-fields/whole-number-input.tsx'))['default']>
    'mortgage-calculator-page/components/mortgage-form': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/mortgage-form.tsx'))['default']>
    'mortgage-calculator-page/components/payment-breakdown-bar': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/payment-breakdown-bar.tsx'))['default']>
    'mortgage-calculator-page/components/payment-schedule-section': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/payment-schedule-section.tsx'))['default']>
    'mortgage-calculator-page/components/repayment-vehicle-notice': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/repayment-vehicle-notice.tsx'))['default']>
    'mortgage-calculator-page/components/results-panel': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/results-panel.tsx'))['default']>
    'mortgage-calculator-page/components/single-result-card': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/single-result-card.tsx'))['default']>
    'mortgage-calculator-page/components/summary-card': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/components/summary-card.tsx'))['default']>
    'mortgage-calculator-page/formatters': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/formatters.ts'))['default']>
    'mortgage-calculator-page/index': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/index.tsx'))['default']>
    'mortgage-calculator-page/store': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/store.ts'))['default']>
    'mortgage-calculator-page/styles': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/styles.ts'))['default']>
    'mortgage-calculator-page/types': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/types.ts'))['default']>
    'mortgage-calculator-page/view-model': ExtractProps<(typeof import('../../inertia/pages/mortgage-calculator-page/view-model.ts'))['default']>
    'privacy-policy-page': ExtractProps<(typeof import('../../inertia/pages/privacy-policy-page.tsx'))['default']>
    'terms-of-service-page': ExtractProps<(typeof import('../../inertia/pages/terms-of-service-page.tsx'))['default']>
  }
}
