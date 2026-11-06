/** On narrow screens, sticky top toggles only after 8px cumulative scroll in a direction; the top and control interactions stay visible. */
export function filterScrollState(previous,y,narrow,hold=false){
  y=Math.max(0,y);
  if(!previous||!narrow||hold||y<=8)return {y,origin:y,direction:0,free:false};
  const delta=y-previous.y;
  if(!delta)return previous;
  const direction=Math.sign(delta),origin=direction===previous.direction?previous.origin:previous.y;
  const free=Math.abs(y-origin)>=8?direction>0:previous.free;
  return {y,origin,direction,free};
}
