import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'health': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'calculators': { paramsTuple?: []; params?: {} }
    'mortgage-calculator': { paramsTuple?: []; params?: {} }
    'mortgage-calculator.assumptions': { paramsTuple?: []; params?: {} }
    'blog': { paramsTuple?: []; params?: {} }
    'about-us': { paramsTuple?: []; params?: {} }
    'privacy-policy': { paramsTuple?: []; params?: {} }
    'terms-of-service': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'health': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'calculators': { paramsTuple?: []; params?: {} }
    'mortgage-calculator': { paramsTuple?: []; params?: {} }
    'mortgage-calculator.assumptions': { paramsTuple?: []; params?: {} }
    'blog': { paramsTuple?: []; params?: {} }
    'about-us': { paramsTuple?: []; params?: {} }
    'privacy-policy': { paramsTuple?: []; params?: {} }
    'terms-of-service': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'health': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'calculators': { paramsTuple?: []; params?: {} }
    'mortgage-calculator': { paramsTuple?: []; params?: {} }
    'mortgage-calculator.assumptions': { paramsTuple?: []; params?: {} }
    'blog': { paramsTuple?: []; params?: {} }
    'about-us': { paramsTuple?: []; params?: {} }
    'privacy-policy': { paramsTuple?: []; params?: {} }
    'terms-of-service': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}