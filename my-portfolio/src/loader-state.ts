/** Session flag so the first-visit loader only plays once per tab. */
export const SEEN_KEY = 'mt-loader-seen';

export function loaderAlreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}
