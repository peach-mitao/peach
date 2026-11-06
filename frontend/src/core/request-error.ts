/** A failed request uses the unified Chinese reason and does not initialize UI or route state. */
export function requestErrorMessage(cause:any,status=0):string{
  const text=String(cause?.message??cause??'');
  const code=Number(status||cause?.status||text.match(/\b(400|401|403|404|408|409|413|429|500|502|503|504)\b/)?.[1]);
  const messages:Record<number,string>={400:'The submission was invalid; check the input and retry.',401:'The session expired; refresh the page and sign in again.',403:'This device does not have permission for this action. Do it on the computer running Peach.',404:'The requested content no longer exists; refresh the list.',408:'The request timed out; try again shortly.',409:'The current state does not allow this action; refresh and try again.',413:'The submission was too large; reduce the amount and retry.',429:'Too many requests, please try again later.',500:'The Peach service failed to handle the request. Try again; if it keeps failing, check the tray logs.',502:'The Peach service returned no results. Try again later; if it keeps failing, check the tray log.',503:'The Peach service is temporarily unavailable; please retry later.',504:'Waiting for the service response timed out; try again shortly.'};
  if(/Failed to fetch|fetch failed|NetworkError|Load failed|network request failed|ERR_CONNECTION/i.test(text))return 'Could not connect to the Peach service. Check the network connection and make sure the tray service is running.';
  /* A "timeout" in the body only counts as a timeout when there is no status code: a 500's stack often carries some library's timeout parameter name. */
  if(cause?.name==='TimeoutError'||(!code&&/timed? ?out|timeout/i.test(text)))return 'Waiting for the service response timed out; check the connection and retry.';
  if(/[㐀-鿿]/.test(text)&&!/^请求失败[（(]/.test(text))return text;
  /* A reason handed over by the caller with a status (the server's `message`/`detail`/`error`, riding on `ApiError`) is shown as-is;
     only our own "Request failed (N)" fallback falls through to the unified copy. */
  if((status||cause?.status)&&text&&!/^Request failed \(/.test(text)&&!/^请求失败[（(]/.test(text))return text;
  /* A bare string is display copy handed over by the caller (noteHtml's error variant re-enters here with an
     already-worded reason): show it as-is instead of burying it under the generic fallback. Error objects keep the
     unified copy, so raw JS exception text never reaches the screen. */
  if(typeof cause==='string'&&text&&!/^Request failed \(/.test(text)&&!/^请求失败[（(]/.test(text))return text;
  if(messages[code])return messages[code];
  return 'The operation did not finish; please retry. If it keeps failing, check the tray log.';
}
