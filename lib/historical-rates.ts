/**
 * U.S. average residential electricity price per kWh (nominal dollars)
 * Source: U.S. Bureau of Labor Statistics / EIA
 * These are approximate annual averages used to back-calculate historical bills.
 */
export const HISTORICAL_RATES: Record<number, number> = {
  1985: 0.078,
  1986: 0.077,
  1987: 0.078,
  1988: 0.079,
  1989: 0.08,
  1990: 0.083,
  1991: 0.085,
  1992: 0.084,
  1993: 0.084,
  1994: 0.084,
  1995: 0.085,
  1996: 0.085,
  1997: 0.085,
  1998: 0.084,
  1999: 0.084,
  2000: 0.084,
  2001: 0.089,
  2002: 0.087,
  2003: 0.088,
  2004: 0.09,
  2005: 0.095,
  2006: 0.106,
  2007: 0.106,
  2008: 0.112,
  2009: 0.117,
  2010: 0.116,
  2011: 0.118,
  2012: 0.119,
  2013: 0.124,
  2014: 0.125,
  2015: 0.127,
  2016: 0.126,
  2017: 0.131,
  2018: 0.129,
  2019: 0.132,
  2020: 0.134,
  2021: 0.139,
  2022: 0.155,
  2023: 0.165,
  2024: 0.172,
  2025: 0.183,
  2026: 0.19,
};

export const EARLIEST_YEAR = 1985;
export const CURRENT_YEAR = 2026;

/**
 * Get all available move-in years (descending for dropdown)
 */
export function getMoveInYears(): number[] {
  const years: number[] = [];
  for (let y = CURRENT_YEAR - 1; y >= EARLIEST_YEAR; y--) {
    years.push(y);
  }
  return years;
}
