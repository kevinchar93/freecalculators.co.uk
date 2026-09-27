/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'health': {
    methods: ["GET","HEAD"],
    pattern: '/up',
    tokens: [{"old":"/up","type":0,"val":"up","end":""}],
    types: placeholder as Registry['health']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'calculators': {
    methods: ["GET","HEAD"],
    pattern: '/calculators',
    tokens: [{"old":"/calculators","type":0,"val":"calculators","end":""}],
    types: placeholder as Registry['calculators']['types'],
  },
  'mortgage-calculator': {
    methods: ["GET","HEAD"],
    pattern: '/calculators/mortgage',
    tokens: [{"old":"/calculators/mortgage","type":0,"val":"calculators","end":""},{"old":"/calculators/mortgage","type":0,"val":"mortgage","end":""}],
    types: placeholder as Registry['mortgage-calculator']['types'],
  },
  'mortgage-calculator.assumptions': {
    methods: ["GET","HEAD"],
    pattern: '/calculators/mortgage/assumptions',
    tokens: [{"old":"/calculators/mortgage/assumptions","type":0,"val":"calculators","end":""},{"old":"/calculators/mortgage/assumptions","type":0,"val":"mortgage","end":""},{"old":"/calculators/mortgage/assumptions","type":0,"val":"assumptions","end":""}],
    types: placeholder as Registry['mortgage-calculator.assumptions']['types'],
  },
  'blog': {
    methods: ["GET","HEAD"],
    pattern: '/blog',
    tokens: [{"old":"/blog","type":0,"val":"blog","end":""}],
    types: placeholder as Registry['blog']['types'],
  },
  'about-us': {
    methods: ["GET","HEAD"],
    pattern: '/about-us',
    tokens: [{"old":"/about-us","type":0,"val":"about-us","end":""}],
    types: placeholder as Registry['about-us']['types'],
  },
  'privacy-policy': {
    methods: ["GET","HEAD"],
    pattern: '/privacy-policy',
    tokens: [{"old":"/privacy-policy","type":0,"val":"privacy-policy","end":""}],
    types: placeholder as Registry['privacy-policy']['types'],
  },
  'terms-of-service': {
    methods: ["GET","HEAD"],
    pattern: '/terms-of-service',
    tokens: [{"old":"/terms-of-service","type":0,"val":"terms-of-service","end":""}],
    types: placeholder as Registry['terms-of-service']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
