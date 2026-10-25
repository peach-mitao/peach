(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "1d145860-18b0-4d5f-a44a-69dd60a675da", e._sentryDebugIdIdentifier = "sentry-dbid-1d145860-18b0-4d5f-a44a-69dd60a675da");
	} catch {}
})();
import { MotionConfigContext as e, WithPromise as t, __commonJSMin as n, __exportAll as r, __toESM as i, asNumber as a, calcGeneratorVelocity as o, cancelFrame as s, cardClass as c, clsx as l, collectMotionValues as u, cx as d, f1 as f, frame as p, interpolate as m, isMotionValue as h, max as g, min as _, motion as v, motionValue as y, require_jsx_runtime as b, require_react as x, require_react_dom as S, require_with_selector as C, resolveStartTime as w, spring as T, time as E, useConstant as D, useIsomorphicLayoutEffect as O, useReducedMotion as k } from "./peach-app.js";
//#region node_modules/motion-dom/dist/es/utils/transform.mjs
function A(...e) {
	let t = !Array.isArray(e[0]), n = t ? 0 : -1, r = e[0 + n], i = e[1 + n], a = e[2 + n], o = e[3 + n], s = m(i, a, o);
	return t ? s(r) : s;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/FollowAnimation.mjs
var j = /* @__PURE__ */ new Set(), M = ({ timestamp: e }) => {
	j.forEach((t) => t.tick(e));
}, N = class extends t {
	constructor(e) {
		super(), this.state = "idle", this.startTime = 0, this.currentTime = 0, this.started = !1, this.hasNextTarget = !1, this.nextTarget = 0, this.stop = () => {
			this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.factory = e.type, this.generator = this.factory(e);
		let { driver: t } = e;
		t && (this.driver = t((e) => this.tick(e))), this.startTime = this.now(), this.state = "running", this.driver ? this.driver.start() : (j.size || p.update(M, !0), j.add(this));
	}
	setTarget(e, t) {
		this.nextTarget = e, this.nextVelocity = t, this.hasNextTarget = !0;
	}
	retarget(e, t) {
		let { options: n, generator: r } = this;
		n.keyframes = e, n.velocity = t, this.startTime = this.now(), this.currentTime = 0, r.retarget ? r.retarget(e, t) : this.generator = this.factory(n);
	}
	tick(e) {
		let { options: t, hasNextTarget: n } = this, { delay: r = 0, onUpdate: i, onPlay: a } = t;
		this.started || (this.startTime = w(this.startTime, e));
		let o = Math.round(e - this.startTime) - r, s = this.currentTime = Math.max(0, o), c = this.generator.next(s), l = o < 0 ? t.keyframes[0] : c.value;
		if (n) {
			this.hasNextTarget = !1;
			let { keyframes: e } = t;
			e[0] = l, e[1] = this.nextTarget, this.retarget(e, this.nextVelocity ?? this.getGeneratorVelocity());
		}
		(n || !this.started) && (this.started = !0, a?.()), this.state === "running" && (i?.(l), c.done && o >= 0 && !n && !this.hasNextTarget && this.state === "running" && (this.notifyFinished(), this.teardown(), this.state = "finished", t.onComplete?.()));
	}
	getGeneratorVelocity() {
		return o(this.generator, this.currentTime, this.options.velocity);
	}
	now() {
		return this.driver ? this.driver.now() : E.now();
	}
	teardown() {
		this.state = "idle", this.driver ? this.driver.stop() : (j.delete(this), j.size || s(M));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/follow.mjs
function ee(e, t, n) {
	let r = e.get(), i = null, o, s = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, c = (e) => o(s ? e + s : e), l = () => e.events.animationStart?.notify(), u = () => {
		i &&= (i.stop(), null), e.animation = void 0;
	};
	if (e.attach((t, r) => {
		o = r;
		let s = a(t);
		if (i?.state === "running") {
			i.setTarget(s, n.velocity);
			return;
		}
		let d = a(e.get()), f = i ? i.getGeneratorVelocity() : e.getVelocity();
		if (u(), d === s) return;
		let p = i = new N({
			keyframes: [d, s],
			velocity: f,
			restDelta: .001,
			restSpeed: .01,
			...n,
			onUpdate: c,
			onPlay: l
		});
		e.animation = p, p.then(() => {
			i === p && (i = null, e.animation = void 0, e.events.animationComplete?.notify());
		});
	}, u), h(t)) {
		let r = n.skipInitialAnimation === !0, i = (t) => {
			r ? (r = !1, e.jump(te(t, s), !1)) : e.set(te(t, s));
		}, o = t.on("change", i), c = t.get();
		a(c) - a(e.get()) && i(c);
		let l = e.on("destroy", o);
		return () => {
			o(), l(), u();
		};
	}
	return u;
}
function te(e, t) {
	return t ? e + t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/spring-value.mjs
function ne(e, t, n) {
	return ee(e, t, {
		...n,
		type: T
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs
var P = /* @__PURE__ */ i(x(), 1);
function re(e, t, n) {
	(0, P.useInsertionEffect)(() => e.on(t, n), [
		e,
		t,
		n
	]);
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-motion-value.mjs
function ie(t) {
	let n = D(() => y(t)), { isStatic: r } = (0, P.useContext)(e);
	if (r) {
		let [, e] = (0, P.useState)(t);
		(0, P.useEffect)(() => n.on("change", e), []);
	}
	return n;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function ae(e, t) {
	let n = ie(t()), r = () => n.set(t());
	return r(), O(() => {
		let t = () => p.preRender(r, !1, !0), n = e.map((e) => e.on("change", t));
		return r(), () => {
			n.forEach((e) => e()), s(r);
		};
	}), n;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-computed.mjs
function oe(e) {
	u.current = [], e();
	let t = ae(u.current, e);
	return u.current = void 0, t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-transform.mjs
function se(e, t, n, r) {
	if (typeof e == "function") return oe(e);
	if (n !== void 0 && !Array.isArray(n) && typeof t != "function") return le(e, t, n, r);
	let i = typeof t == "function" ? t : A(t, n, r), a = Array.isArray(e) ? ce(e, i) : ce([e], ([e]) => i(e)), o = Array.isArray(e) ? void 0 : e.accelerate;
	if (o && !o.isTransformed && typeof t != "function" && Array.isArray(n) && r?.clamp !== !1) {
		let e = r?.ease;
		a.accelerate = {
			...o,
			times: [
				0,
				...t,
				1
			],
			keyframes: [
				n[0],
				...n,
				n[n.length - 1]
			],
			isTransformed: !0,
			...e ? { ease: Array.isArray(e) ? [e[0], ...e] : e } : {}
		};
	}
	return a;
}
function ce(e, t) {
	let n = D(() => []);
	return ae(e, () => {
		n.length = 0;
		let r = e.length;
		for (let t = 0; t < r; t++) n[t] = e[t].get();
		return t(n);
	});
}
function le(e, t, n, r) {
	let i = D(() => Object.keys(n)), a = D(() => ({}));
	for (let o of i) a[o] = se(e, t, n[o], r);
	return a;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-follow-value.mjs
function ue(t, n, r) {
	let { isStatic: i } = (0, P.useContext)(e), a = () => h(t) ? t.get() : t;
	if (i) return se(a);
	let o = ie(a());
	return (0, P.useInsertionEffect)(() => r(o, t, n), [o, JSON.stringify(n)]), o;
}
//#endregion
//#region node_modules/framer-motion/dist/es/value/use-spring.mjs
function de(e, t = {}) {
	return ue(e, t, ne);
}
//#endregion
//#region node_modules/d3-array/src/ascending.js
function fe(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
//#endregion
//#region node_modules/d3-array/src/bisector.js
function pe(e) {
	let t = e, n = e;
	e.length === 1 && (t = (t, n) => e(t) - n, n = me(e));
	function r(e, t, r, i) {
		for (r ??= 0, i ??= e.length; r < i;) {
			let a = r + i >>> 1;
			n(e[a], t) < 0 ? r = a + 1 : i = a;
		}
		return r;
	}
	function i(e, t, r, i) {
		for (r ??= 0, i ??= e.length; r < i;) {
			let a = r + i >>> 1;
			n(e[a], t) > 0 ? i = a : r = a + 1;
		}
		return r;
	}
	function a(e, n, i, a) {
		i ??= 0, a ??= e.length;
		let o = r(e, n, i, a - 1);
		return o > i && t(e[o - 1], n) > -t(e[o], n) ? o - 1 : o;
	}
	return {
		left: r,
		center: a,
		right: i
	};
}
function me(e) {
	return (t, n) => fe(e(t), n);
}
//#endregion
//#region node_modules/d3-array/src/number.js
function he(e) {
	return e === null ? NaN : +e;
}
function* ge(e, t) {
	if (t === void 0) for (let t of e) t != null && (t = +t) >= t && (yield t);
	else {
		let n = -1;
		for (let r of e) (r = t(r, ++n, e)) != null && (r = +r) >= r && (yield r);
	}
}
//#endregion
//#region node_modules/d3-array/src/bisect.js
var _e = pe(fe), ve = _e.right;
_e.left, pe(he).center;
//#endregion
//#region node_modules/internmap/src/index.js
var ye = class extends Map {
	constructor(e, t = Ce) {
		if (super(), Object.defineProperties(this, {
			_intern: { value: /* @__PURE__ */ new Map() },
			_key: { value: t }
		}), e != null) for (let [t, n] of e) this.set(t, n);
	}
	get(e) {
		return super.get(be(this, e));
	}
	has(e) {
		return super.has(be(this, e));
	}
	set(e, t) {
		return super.set(xe(this, e), t);
	}
	delete(e) {
		return super.delete(Se(this, e));
	}
};
function be({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : n;
}
function xe({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) ? e.get(r) : (e.set(r, n), n);
}
function Se({ _intern: e, _key: t }, n) {
	let r = t(n);
	return e.has(r) && (n = e.get(n), e.delete(r)), n;
}
function Ce(e) {
	return typeof e == "object" && e ? e.valueOf() : e;
}
//#endregion
//#region node_modules/d3-array/src/ticks.js
var we = Math.sqrt(50), Te = Math.sqrt(10), Ee = Math.sqrt(2);
function De(e, t, n) {
	var r, i = -1, a, o, s;
	if (t = +t, e = +e, n = +n, e === t && n > 0) return [e];
	if ((r = t < e) && (a = e, e = t, t = a), (s = Oe(e, t, n)) === 0 || !isFinite(s)) return [];
	if (s > 0) {
		let n = Math.round(e / s), r = Math.round(t / s);
		for (n * s < e && ++n, r * s > t && --r, o = Array(a = r - n + 1); ++i < a;) o[i] = (n + i) * s;
	} else {
		s = -s;
		let n = Math.round(e * s), r = Math.round(t * s);
		for (n / s < e && ++n, r / s > t && --r, o = Array(a = r - n + 1); ++i < a;) o[i] = (n + i) / s;
	}
	return r && o.reverse(), o;
}
function Oe(e, t, n) {
	var r = (t - e) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), a = r / 10 ** i;
	return i >= 0 ? (a >= we ? 10 : a >= Te ? 5 : a >= Ee ? 2 : 1) * 10 ** i : -(10 ** -i) / (a >= we ? 10 : a >= Te ? 5 : a >= Ee ? 2 : 1);
}
function ke(e, t, n) {
	var r = Math.abs(t - e) / Math.max(0, n), i = 10 ** Math.floor(Math.log(r) / Math.LN10), a = r / i;
	return a >= we ? i *= 10 : a >= Te ? i *= 5 : a >= Ee && (i *= 2), t < e ? -i : i;
}
//#endregion
//#region node_modules/d3-array/src/quickselect.js
function Ae(e, t, n = 0, r = e.length - 1, i = fe) {
	for (; r > n;) {
		if (r - n > 600) {
			let a = r - n + 1, o = t - n + 1, s = Math.log(a), c = .5 * Math.exp(2 * s / 3), l = .5 * Math.sqrt(s * c * (a - c) / a) * (o - a / 2 < 0 ? -1 : 1);
			Ae(e, t, Math.max(n, Math.floor(t - o * c / a + l)), Math.min(r, Math.floor(t + (a - o) * c / a + l)), i);
		}
		let a = e[t], o = n, s = r;
		for (je(e, n, t), i(e[r], a) > 0 && je(e, n, r); o < s;) {
			for (je(e, o, s), ++o, --s; i(e[o], a) < 0;) ++o;
			for (; i(e[s], a) > 0;) --s;
		}
		i(e[n], a) === 0 ? je(e, n, s) : (++s, je(e, s, r)), s <= t && (n = s + 1), t <= s && (r = s - 1);
	}
	return e;
}
function je(e, t, n) {
	let r = e[t];
	e[t] = e[n], e[n] = r;
}
//#endregion
//#region node_modules/d3-array/src/quantile.js
function Me(e, t, n) {
	if (e = Float64Array.from(ge(e, n)), r = e.length) {
		if ((t = +t) <= 0 || r < 2) return _(e);
		if (t >= 1) return g(e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = g(Ae(e, a).subarray(0, a + 1));
		return o + (_(e.subarray(a + 1)) - o) * (i - a);
	}
}
function Ne(e, t, n = he) {
	if (r = e.length) {
		if ((t = +t) <= 0 || r < 2) return +n(e[0], 0, e);
		if (t >= 1) return +n(e[r - 1], r - 1, e);
		var r, i = (r - 1) * t, a = Math.floor(i), o = +n(e[a], a, e);
		return o + (+n(e[a + 1], a + 1, e) - o) * (i - a);
	}
}
//#endregion
//#region node_modules/d3-array/src/range.js
function Pe(e, t, n) {
	e = +e, t = +t, n = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +n;
	for (var r = -1, i = Math.max(0, Math.ceil((t - e) / n)) | 0, a = Array(i); ++r < i;) a[r] = e + r * n;
	return a;
}
//#endregion
//#region node_modules/recharts/es6/util/excludeEventProps.js
var Fe = /* @__PURE__ */ i(S()), Ie = /* @__PURE__ */ "dangerouslySetInnerHTML.onCopy.onCopyCapture.onCut.onCutCapture.onPaste.onPasteCapture.onCompositionEnd.onCompositionEndCapture.onCompositionStart.onCompositionStartCapture.onCompositionUpdate.onCompositionUpdateCapture.onFocus.onFocusCapture.onBlur.onBlurCapture.onChange.onChangeCapture.onBeforeInput.onBeforeInputCapture.onInput.onInputCapture.onReset.onResetCapture.onSubmit.onSubmitCapture.onInvalid.onInvalidCapture.onLoad.onLoadCapture.onError.onErrorCapture.onKeyDown.onKeyDownCapture.onKeyPress.onKeyPressCapture.onKeyUp.onKeyUpCapture.onAbort.onAbortCapture.onCanPlay.onCanPlayCapture.onCanPlayThrough.onCanPlayThroughCapture.onDurationChange.onDurationChangeCapture.onEmptied.onEmptiedCapture.onEncrypted.onEncryptedCapture.onEnded.onEndedCapture.onLoadedData.onLoadedDataCapture.onLoadedMetadata.onLoadedMetadataCapture.onLoadStart.onLoadStartCapture.onPause.onPauseCapture.onPlay.onPlayCapture.onPlaying.onPlayingCapture.onProgress.onProgressCapture.onRateChange.onRateChangeCapture.onSeeked.onSeekedCapture.onSeeking.onSeekingCapture.onStalled.onStalledCapture.onSuspend.onSuspendCapture.onTimeUpdate.onTimeUpdateCapture.onVolumeChange.onVolumeChangeCapture.onWaiting.onWaitingCapture.onAuxClick.onAuxClickCapture.onClick.onClickCapture.onContextMenu.onContextMenuCapture.onDoubleClick.onDoubleClickCapture.onDrag.onDragCapture.onDragEnd.onDragEndCapture.onDragEnter.onDragEnterCapture.onDragExit.onDragExitCapture.onDragLeave.onDragLeaveCapture.onDragOver.onDragOverCapture.onDragStart.onDragStartCapture.onDrop.onDropCapture.onMouseDown.onMouseDownCapture.onMouseEnter.onMouseLeave.onMouseMove.onMouseMoveCapture.onMouseOut.onMouseOutCapture.onMouseOver.onMouseOverCapture.onMouseUp.onMouseUpCapture.onSelect.onSelectCapture.onTouchCancel.onTouchCancelCapture.onTouchEnd.onTouchEndCapture.onTouchMove.onTouchMoveCapture.onTouchStart.onTouchStartCapture.onPointerDown.onPointerDownCapture.onPointerMove.onPointerMoveCapture.onPointerUp.onPointerUpCapture.onPointerCancel.onPointerCancelCapture.onPointerEnter.onPointerEnterCapture.onPointerLeave.onPointerLeaveCapture.onPointerOver.onPointerOverCapture.onPointerOut.onPointerOutCapture.onGotPointerCapture.onGotPointerCaptureCapture.onLostPointerCapture.onLostPointerCaptureCapture.onScroll.onScrollCapture.onWheel.onWheelCapture.onAnimationStart.onAnimationStartCapture.onAnimationEnd.onAnimationEndCapture.onAnimationIteration.onAnimationIterationCapture.onTransitionEnd.onTransitionEndCapture".split(".");
function Le(e) {
	return typeof e == "string" && Ie.includes(e);
}
//#endregion
//#region node_modules/recharts/es6/util/svgPropertiesNoEvents.js
var Re = /* @__PURE__ */ new Set(/* @__PURE__ */ "aria-activedescendant.aria-atomic.aria-autocomplete.aria-busy.aria-checked.aria-colcount.aria-colindex.aria-colspan.aria-controls.aria-current.aria-describedby.aria-details.aria-disabled.aria-errormessage.aria-expanded.aria-flowto.aria-haspopup.aria-hidden.aria-invalid.aria-keyshortcuts.aria-label.aria-labelledby.aria-level.aria-live.aria-modal.aria-multiline.aria-multiselectable.aria-orientation.aria-owns.aria-placeholder.aria-posinset.aria-pressed.aria-readonly.aria-relevant.aria-required.aria-roledescription.aria-rowcount.aria-rowindex.aria-rowspan.aria-selected.aria-setsize.aria-sort.aria-valuemax.aria-valuemin.aria-valuenow.aria-valuetext.className.color.height.id.lang.max.media.method.min.name.style.target.width.role.tabIndex.accentHeight.accumulate.additive.alignmentBaseline.allowReorder.alphabetic.amplitude.arabicForm.ascent.attributeName.attributeType.autoReverse.azimuth.baseFrequency.baselineShift.baseProfile.bbox.begin.bias.by.calcMode.capHeight.clip.clipPath.clipPathUnits.clipRule.colorInterpolation.colorInterpolationFilters.colorProfile.colorRendering.contentScriptType.contentStyleType.cursor.cx.cy.d.decelerate.descent.diffuseConstant.direction.display.divisor.dominantBaseline.dur.dx.dy.edgeMode.elevation.enableBackground.end.exponent.externalResourcesRequired.fill.fillOpacity.fillRule.filter.filterRes.filterUnits.floodColor.floodOpacity.focusable.fontFamily.fontSize.fontSizeAdjust.fontStretch.fontStyle.fontVariant.fontWeight.format.from.fx.fy.g1.g2.glyphName.glyphOrientationHorizontal.glyphOrientationVertical.glyphRef.gradientTransform.gradientUnits.hanging.horizAdvX.horizOriginX.href.ideographic.imageRendering.in2.in.intercept.k1.k2.k3.k4.k.kernelMatrix.kernelUnitLength.kerning.keyPoints.keySplines.keyTimes.lengthAdjust.letterSpacing.lightingColor.limitingConeAngle.local.markerEnd.markerHeight.markerMid.markerStart.markerUnits.markerWidth.mask.maskContentUnits.maskUnits.mathematical.mode.numOctaves.offset.opacity.operator.order.orient.orientation.origin.overflow.overlinePosition.overlineThickness.paintOrder.panose1.pathLength.patternContentUnits.patternTransform.patternUnits.pointerEvents.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.r.radius.refX.refY.renderingIntent.repeatCount.repeatDur.requiredExtensions.requiredFeatures.restart.result.rotate.rx.ry.seed.shapeRendering.slope.spacing.specularConstant.specularExponent.speed.spreadMethod.startOffset.stdDeviation.stemh.stemv.stitchTiles.stopColor.stopOpacity.strikethroughPosition.strikethroughThickness.string.stroke.strokeDasharray.strokeDashoffset.strokeLinecap.strokeLinejoin.strokeMiterlimit.strokeOpacity.strokeWidth.surfaceScale.systemLanguage.tableValues.targetX.targetY.textAnchor.textDecoration.textLength.textRendering.to.transform.u1.u2.underlinePosition.underlineThickness.unicode.unicodeBidi.unicodeRange.unitsPerEm.vAlphabetic.values.vectorEffect.version.vertAdvY.vertOriginX.vertOriginY.vHanging.vIdeographic.viewTarget.visibility.vMathematical.widths.wordSpacing.writingMode.x1.x2.x.xChannelSelector.xHeight.xlinkActuate.xlinkArcrole.xlinkHref.xlinkRole.xlinkShow.xlinkTitle.xlinkType.xmlBase.xmlLang.xmlns.xmlnsXlink.xmlSpace.y1.y2.y.yChannelSelector.z.zoomAndPan.ref.key.angle".split("."));
function ze(e) {
	return typeof e == "string" && Re.has(e);
}
function Be(e) {
	return typeof e == "string" && e.startsWith("data-");
}
function Ve(e) {
	if (typeof e != "object" || !e) return {};
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (ze(n) || Be(n)) && (t[n] = e[n]);
	return t;
}
function He(e) {
	if (e == null) return null;
	if (/*#__PURE__*/ (0, P.isValidElement)(e) && typeof e.props == "object" && e.props !== null) {
		var t = e.props;
		return Ve(t);
	}
	return typeof e == "object" && !Array.isArray(e) ? Ve(e) : null;
}
//#endregion
//#region node_modules/recharts/es6/util/svgPropertiesAndEvents.js
function Ue(e) {
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (ze(n) || Be(n) || Le(n)) && (t[n] = e[n]);
	return t;
}
function We(e) {
	return e == null ? null : /*#__PURE__*/ (0, P.isValidElement)(e) ? Ue(e.props) : typeof e == "object" && !Array.isArray(e) ? Ue(e) : null;
}
//#endregion
//#region node_modules/recharts/es6/container/Surface.js
var Ge = [
	"children",
	"width",
	"height",
	"viewBox",
	"className",
	"style",
	"title",
	"desc"
];
function Ke() {
	return Ke = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Ke.apply(null, arguments);
}
function qe(e, t) {
	if (e == null) return {};
	var n, r, i = Je(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Je(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Ye = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = e.width, i = e.height, a = e.viewBox, o = e.className, s = e.style, c = e.title, u = e.desc, d = qe(e, Ge), f = a || {
		width: r,
		height: i,
		x: 0,
		y: 0
	}, p = l("recharts-surface", o);
	return /*#__PURE__*/ P.createElement("svg", Ke({}, Ue(d), {
		className: p,
		width: r,
		height: i,
		style: s,
		viewBox: `${f.x} ${f.y} ${f.width} ${f.height}`,
		ref: t
	}), /*#__PURE__*/ P.createElement("title", null, c), /*#__PURE__*/ P.createElement("desc", null, u), n);
}), Xe = C(), Ze = ["children", "className"];
function Qe() {
	return Qe = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Qe.apply(null, arguments);
}
function $e(e, t) {
	if (e == null) return {};
	var n, r, i = et(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function et(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var F = /*#__PURE__*/ P.forwardRef((e, t) => {
	var n = e.children, r = e.className, i = $e(e, Ze), a = l("recharts-layer", r);
	return /*#__PURE__*/ P.createElement("g", Qe({ className: a }, Ue(i), { ref: t }), n);
});
//#endregion
//#region node_modules/es-toolkit/dist/_internal/isUnsafeProperty.mjs
function tt(e) {
	return e === "__proto__";
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isDeepKey.mjs
var nt = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function rt(e) {
	switch (typeof e) {
		case "number":
		case "symbol": return !1;
		case "string": return e === "" || e.startsWith(".") || e.endsWith(".") ? !1 : nt.test(e);
		default: return !1;
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/toKey.mjs
function it(e) {
	return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isSymbol.mjs
function at(e) {
	return typeof e == "symbol" || e instanceof Symbol;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toString.mjs
function ot(e) {
	return e == null ? "" : st(e);
}
function st(e) {
	if (typeof e == "string") return e;
	if (Array.isArray(e)) return e.map(st).join(",");
	if (at(e)) return e.toString();
	let t = e + "";
	return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toPath.mjs
function ct(e) {
	if (Array.isArray(e)) return e.map(it);
	if (typeof e == "symbol") return [e];
	e = ot(e);
	let t = [], n = e.length;
	if (n === 0) return t;
	let r = 0, i = "", a = "", o = !1, s = !1, c = /^-?\d+(?:\.\d+)?$/;
	for (e.charCodeAt(0) === 46 && t.push(""); r < n;) {
		let l = e[r];
		if (a) l === "\\" && r + 1 < n ? (r++, i += e[r]) : l === a ? a = "" : i += l;
		else if (o) {
			if (l === "\"" || l === "'") a = l, s = !0;
			else if (l === "]") {
				if (o = !1, !s && i.includes(".") && !c.test(i)) {
					let e = i.split(".");
					for (let n = 0; n < e.length; n++) e[n] !== "" && t.push(e[n]);
				} else t.push(i);
				i = "";
			} else i += l;
		} else if (l === "[") o = !0, s = !1, i &&= (t.push(i), "");
		else if (l === ".") {
			i &&= (t.push(i), "");
			let n = e[r + 1];
			(n === void 0 || n === ".") && t.push("");
		} else i += l;
		r++;
	}
	return i && t.push(i), t;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/get.mjs
function lt(e, t, n) {
	if (e == null) return n;
	switch (typeof t) {
		case "string": {
			if (tt(t)) return n;
			let r = e[t];
			return r === void 0 ? rt(t) && !Object.hasOwn(e, t) ? lt(e, ct(t), n) : n : r;
		}
		case "number":
		case "symbol": {
			typeof t == "number" && (t = it(t));
			let r = e[t];
			return r === void 0 ? n : r;
		}
		default: {
			if (Array.isArray(t)) return ut(e, t, n);
			if (t = Object.is(t?.valueOf(), -0) ? "-0" : String(t), tt(t)) return n;
			let r = e[t];
			return r === void 0 ? n : r;
		}
	}
}
function ut(e, t, n) {
	if (t.length === 0) return n;
	let r = e;
	for (let e = 0; e < t.length; e++) {
		if (r == null || tt(t[e])) return n;
		r = r[t[e]];
	}
	return r === void 0 ? n : r;
}
//#endregion
//#region node_modules/recharts/es6/util/round.js
var dt = 4;
function ft(e) {
	var t = 10 ** (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : dt), n = Math.round(e * t) / t;
	return Object.is(n, -0) ? 0 : n;
}
function pt(e) {
	var t = [...arguments].slice(1);
	return e.reduce((e, n, r) => {
		var i = t[r - 1];
		return typeof i == "string" ? e + i + n : i === void 0 ? e + n : e + ft(i) + n;
	}, "");
}
//#endregion
//#region node_modules/recharts/es6/util/DataUtils.js
var mt = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, ht = (e) => typeof e == "number" && e != +e, gt = (e) => typeof e == "string" && e.length > 1 && e.indexOf("%") === e.length - 1, I = (e) => (typeof e == "number" || e instanceof Number) && !ht(e), _t = (e) => I(e) || typeof e == "string", vt = 0, yt = (e) => {
	var t = ++vt;
	return `${e || ""}${t}`;
}, bt = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 && arguments[3] !== void 0 && arguments[3];
	if (!I(e) && typeof e != "string") return n;
	var i;
	if (gt(e)) {
		if (t == null) return n;
		var a = e.indexOf("%");
		i = t * parseFloat(e.slice(0, a)) / 100;
	} else i = +e;
	return ht(i) && (i = n), r && t != null && i > t && (i = t), i;
}, xt = (e) => {
	if (!Array.isArray(e)) return !1;
	for (var t = e.length, n = {}, r = 0; r < t; r++) if (!n[String(e[r])]) n[String(e[r])] = !0;
	else return !0;
	return !1;
};
function L(e, t, n) {
	return I(e) && I(t) ? ft(e + n * (t - e)) : t;
}
function St(e, t, n) {
	if (e && e.length) return e.find((e) => e && (typeof t == "function" ? t(e) : lt(e, t)) === n);
}
var R = (e) => e == null, Ct = (e) => R(e) ? e : `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
function wt(e) {
	return e != null;
}
function Tt() {}
//#endregion
//#region node_modules/recharts/es6/cartesian/cartesianViewBoxToTrapezoid.js
function Et(e) {
	if (e) return {
		x: e.x,
		y: e.y,
		upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
		lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
		width: e.width,
		height: e.height
	};
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getCartesianPosition.js
function Dt(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Ot(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Dt(Object(n), !0).forEach(function(t) {
			kt(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Dt(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kt(e, t, n) {
	return (t = At(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function At(e) {
	var t = jt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Mt = (e) => {
	var t = e.viewBox, n = e.position, r = e.offset, i = r === void 0 ? 0 : r, a = e.parentViewBox, o = e.clamp, s = Et(t), c = s.x, l = s.y, u = s.height, d = s.upperWidth, f = s.lowerWidth, p = c, m = c + (d - f) / 2, h = (p + m) / 2, g = (d + f) / 2, _ = p + d / 2, v = u >= 0 ? 1 : -1, y = v * i, b = v > 0 ? "end" : "start", x = v > 0 ? "start" : "end", S = d >= 0 ? 1 : -1, C = S * i, w = S > 0 ? "end" : "start", T = S > 0 ? "start" : "end", E = a;
	if (n === "top") {
		var D = {
			x: p + d / 2,
			y: l - y,
			horizontalAnchor: "middle",
			verticalAnchor: b
		};
		return o && E && (D.height = Math.max(l - E.y, 0), D.width = d), D;
	}
	if (n === "bottom") {
		var O = {
			x: m + f / 2,
			y: l + u + y,
			horizontalAnchor: "middle",
			verticalAnchor: x
		};
		return o && E && (O.height = Math.max(E.y + E.height - (l + u), 0), O.width = f), O;
	}
	if (n === "left") {
		var k = {
			x: h - C,
			y: l + u / 2,
			horizontalAnchor: w,
			verticalAnchor: "middle"
		};
		return o && E && (k.width = Math.max(k.x - E.x, 0), k.height = u), k;
	}
	if (n === "right") {
		var A = {
			x: h + g + C,
			y: l + u / 2,
			horizontalAnchor: T,
			verticalAnchor: "middle"
		};
		return o && E && (A.width = Math.max(E.x + E.width - A.x, 0), A.height = u), A;
	}
	var j = o && E ? {
		width: g,
		height: u
	} : {};
	return n === "insideLeft" ? Ot({
		x: h + C,
		y: l + u / 2,
		horizontalAnchor: T,
		verticalAnchor: "middle"
	}, j) : n === "insideRight" ? Ot({
		x: h + g - C,
		y: l + u / 2,
		horizontalAnchor: w,
		verticalAnchor: "middle"
	}, j) : n === "insideTop" ? Ot({
		x: p + d / 2,
		y: l + y,
		horizontalAnchor: "middle",
		verticalAnchor: x
	}, j) : n === "insideBottom" ? Ot({
		x: m + f / 2,
		y: l + u - y,
		horizontalAnchor: "middle",
		verticalAnchor: b
	}, j) : n === "insideTopLeft" ? Ot({
		x: p + C,
		y: l + y,
		horizontalAnchor: T,
		verticalAnchor: x
	}, j) : n === "insideTopRight" ? Ot({
		x: p + d - C,
		y: l + y,
		horizontalAnchor: w,
		verticalAnchor: x
	}, j) : n === "insideBottomLeft" ? Ot({
		x: m + C,
		y: l + u - y,
		horizontalAnchor: T,
		verticalAnchor: b
	}, j) : n === "insideBottomRight" ? Ot({
		x: m + f - C,
		y: l + u - y,
		horizontalAnchor: w,
		verticalAnchor: b
	}, j) : n && typeof n == "object" && (I(n.x) || gt(n.x)) && (I(n.y) || gt(n.y)) ? Ot({
		x: c + bt(n.x, g),
		y: l + bt(n.y, u),
		horizontalAnchor: "end",
		verticalAnchor: "end"
	}, j) : Ot({
		x: _,
		y: l + u / 2,
		horizontalAnchor: "middle",
		verticalAnchor: "middle"
	}, j);
}, Nt = [
	"top",
	"left",
	"right",
	"bottom"
];
function Pt(e) {
	return e == null ? !1 : typeof e == "object" || Nt.includes(e);
}
//#endregion
//#region node_modules/recharts/es6/context/legendPortalContext.js
var Ft = /*#__PURE__*/ (0, P.createContext)(null), It = () => (0, P.useContext)(Ft);
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/constant.js
function z(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/math.js
var Lt = Math.cos, Rt = Math.sin, zt = Math.sqrt, Bt = Math.PI;
Bt / 2;
var Vt = 2 * Bt, Ht = Math.PI, Ut = 2 * Ht, Wt = 1e-6, Gt = Ut - Wt;
function Kt(e) {
	this._ += e[0];
	for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function qt(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
	if (t > 15) return Kt;
	let n = 10 ** t;
	return function(e) {
		this._ += e[0];
		for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
	};
}
var Jt = class {
	constructor(e) {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? Kt : qt(e);
	}
	moveTo(e, t) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
	}
	closePath() {
		this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
	}
	lineTo(e, t) {
		this._append`L${this._x1 = +e},${this._y1 = +t}`;
	}
	quadraticCurveTo(e, t, n, r) {
		this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +r}`;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this._append`C${+e},${+t},${+n},${+r},${this._x1 = +i},${this._y1 = +a}`;
	}
	arcTo(e, t, n, r, i) {
		if (e = +e, t = +t, n = +n, r = +r, i = +i, i < 0) throw Error(`negative radius: ${i}`);
		let a = this._x1, o = this._y1, s = n - e, c = r - t, l = a - e, u = o - t, d = l * l + u * u;
		if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = t}`;
		else if (d > Wt) {
			if (!(Math.abs(u * s - c * l) > Wt) || !i) this._append`L${this._x1 = e},${this._y1 = t}`;
			else {
				let f = n - a, p = r - o, m = s * s + c * c, h = f * f + p * p, g = Math.sqrt(m), _ = Math.sqrt(d), v = i * Math.tan((Ht - Math.acos((m + d - h) / (2 * g * _))) / 2), y = v / _, b = v / g;
				Math.abs(y - 1) > Wt && this._append`L${e + y * l},${t + y * u}`, this._append`A${i},${i},0,0,${+(u * f > l * p)},${this._x1 = e + b * s},${this._y1 = t + b * c}`;
			}
		}
	}
	arc(e, t, n, r, i, a) {
		if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw Error(`negative radius: ${n}`);
		let o = n * Math.cos(r), s = n * Math.sin(r), c = e + o, l = t + s, u = 1 ^ a, d = a ? r - i : i - r;
		this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > Wt || Math.abs(this._y1 - l) > Wt) && this._append`L${c},${l}`, n && (d < 0 && (d = d % Ut + Ut), d > Gt ? this._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${this._x1 = c},${this._y1 = l}` : d > Wt && this._append`A${n},${n},0,${+(d >= Ht)},${u},${this._x1 = e + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`);
	}
	rect(e, t, n, r) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+r}h${-n}Z`;
	}
	toString() {
		return this._;
	}
};
Jt.prototype;
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/path.js
function Yt(e) {
	let t = 3;
	return e.digits = function(n) {
		if (!arguments.length) return t;
		if (n == null) t = null;
		else {
			let e = Math.floor(n);
			if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
			t = e;
		}
		return e;
	}, () => new Jt(t);
}
Array.prototype.slice;
function Xt(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/linear.js
function Zt(e) {
	this._context = e;
}
Zt.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._context.lineTo(e, t);
		}
	}
};
function Qt(e) {
	return new Zt(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/point.js
function $t(e) {
	return e[0];
}
function en(e) {
	return e[1];
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/line.js
function tn(e, t) {
	var n = z(!0), r = null, i = Qt, a = null, o = Yt(s);
	e = typeof e == "function" ? e : e === void 0 ? $t : z(e), t = typeof t == "function" ? t : t === void 0 ? en : z(t);
	function s(s) {
		var c, l = (s = Xt(s)).length, u, d = !1, f;
		for (r ?? (a = i(f = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (f) return a = null, f + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : z(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : z(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : z(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/area.js
function nn(e, t, n) {
	var r = null, i = z(!0), a = null, o = Qt, s = null, c = Yt(l);
	e = typeof e == "function" ? e : e === void 0 ? $t : z(+e), t = typeof t == "function" ? t : z(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? en : z(+n);
	function l(l) {
		var u, d, f, p = (l = Xt(l)).length, m, h = !1, g, _ = Array(p), v = Array(p);
		for (a ?? (s = o(g = c())), u = 0; u <= p; ++u) {
			if (!(u < p && i(m = l[u], u, l)) === h) {
				if (h = !h) d = u, s.areaStart(), s.lineStart();
				else {
					for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
					s.lineEnd(), s.areaEnd();
				}
			}
			h && (_[u] = +e(m, u, l), v[u] = +t(m, u, l), s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
		}
		if (g) return s = null, g + "" || null;
	}
	function u() {
		return tn().defined(i).curve(o).context(a);
	}
	return l.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : z(+t), r = null, l) : e;
	}, l.x0 = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : z(+t), l) : e;
	}, l.x1 = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : z(+e), l) : r;
	}, l.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : z(+e), n = null, l) : t;
	}, l.y0 = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : z(+e), l) : t;
	}, l.y1 = function(e) {
		return arguments.length ? (n = e == null ? null : typeof e == "function" ? e : z(+e), l) : n;
	}, l.lineX0 = l.lineY0 = function() {
		return u().x(e).y(t);
	}, l.lineY1 = function() {
		return u().x(e).y(n);
	}, l.lineX1 = function() {
		return u().x(r).y(t);
	}, l.defined = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : z(!!e), l) : i;
	}, l.curve = function(e) {
		return arguments.length ? (o = e, a != null && (s = o(a)), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (e == null ? a = s = null : s = o(a = e), l) : a;
	}, l;
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/bump.js
var rn = class {
	constructor(e, t) {
		this._context = e, this._x = t;
	}
	areaStart() {
		this._line = 0;
	}
	areaEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	}
	point(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + e) / 2, this._y0, this._x0, t, e, t) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + t) / 2, e, this._y0, e, t);
		}
		this._x0 = e, this._y0 = t;
	}
};
function an(e) {
	return new rn(e, !0);
}
function on(e) {
	return new rn(e, !1);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/symbol/circle.js
var sn = { draw(e, t) {
	let n = zt(t / Bt);
	e.moveTo(n, 0), e.arc(0, 0, n, 0, Vt);
} }, cn = { draw(e, t) {
	let n = zt(t / 5) / 2;
	e.moveTo(-3 * n, -n), e.lineTo(-n, -n), e.lineTo(-n, -3 * n), e.lineTo(n, -3 * n), e.lineTo(n, -n), e.lineTo(3 * n, -n), e.lineTo(3 * n, n), e.lineTo(n, n), e.lineTo(n, 3 * n), e.lineTo(-n, 3 * n), e.lineTo(-n, n), e.lineTo(-3 * n, n), e.closePath();
} }, ln = zt(1 / 3), un = ln * 2, dn = { draw(e, t) {
	let n = zt(t / un), r = n * ln;
	e.moveTo(0, -n), e.lineTo(r, 0), e.lineTo(0, n), e.lineTo(-r, 0), e.closePath();
} }, fn = { draw(e, t) {
	let n = zt(t), r = -n / 2;
	e.rect(r, r, n, n);
} }, pn = .8908130915292852, mn = Rt(Bt / 10) / Rt(7 * Bt / 10), hn = Rt(Vt / 10) * mn, gn = -Lt(Vt / 10) * mn, _n = { draw(e, t) {
	let n = zt(t * pn), r = hn * n, i = gn * n;
	e.moveTo(0, -n), e.lineTo(r, i);
	for (let t = 1; t < 5; ++t) {
		let a = Vt * t / 5, o = Lt(a), s = Rt(a);
		e.lineTo(s * n, -o * n), e.lineTo(o * r - s * i, s * r + o * i);
	}
	e.closePath();
} }, vn = zt(3), yn = { draw(e, t) {
	let n = -zt(t / (vn * 3));
	e.moveTo(0, n * 2), e.lineTo(-vn * n, -n), e.lineTo(vn * n, -n), e.closePath();
} }, bn = -.5, xn = zt(3) / 2, Sn = 1 / zt(12), Cn = (Sn / 2 + 1) * 3, wn = { draw(e, t) {
	let n = zt(t / Cn), r = n / 2, i = n * Sn, a = r, o = n * Sn + n, s = -a, c = o;
	e.moveTo(r, i), e.lineTo(a, o), e.lineTo(s, c), e.lineTo(bn * r - xn * i, xn * r + bn * i), e.lineTo(bn * a - xn * o, xn * a + bn * o), e.lineTo(bn * s - xn * c, xn * s + bn * c), e.lineTo(bn * r + xn * i, bn * i - xn * r), e.lineTo(bn * a + xn * o, bn * o - xn * a), e.lineTo(bn * s + xn * c, bn * c - xn * s), e.closePath();
} };
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/symbol.js
function Tn(e, t) {
	let n = null, r = Yt(i);
	e = typeof e == "function" ? e : z(e || sn), t = typeof t == "function" ? t : z(t === void 0 ? 64 : +t);
	function i() {
		let i;
		if (n ||= i = r(), e.apply(this, arguments).draw(n, +t.apply(this, arguments)), i) return n = null, i + "" || null;
	}
	return i.type = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : z(t), i) : e;
	}, i.size = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : z(+e), i) : t;
	}, i.context = function(e) {
		return arguments.length ? (n = e ?? null, i) : n;
	}, i;
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/noop.js
function En() {}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/basis.js
function Dn(e, t, n) {
	e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + n) / 6);
}
function On(e) {
	this._context = e;
}
On.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: Dn(this, this._x1, this._y1);
			case 2: this._context.lineTo(this._x1, this._y1);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default: Dn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function kn(e) {
	return new On(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/basisClosed.js
function An(e) {
	this._context = e;
}
An.prototype = {
	areaStart: En,
	areaEnd: En,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
				break;
			case 3: this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
		}
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._x2 = e, this._y2 = t;
				break;
			case 1:
				this._point = 2, this._x3 = e, this._y3 = t;
				break;
			case 2:
				this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
				break;
			default: Dn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function jn(e) {
	return new An(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/basisOpen.js
function Mn(e) {
	this._context = e;
}
Mn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
				this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
				break;
			case 3: this._point = 4;
			default: Dn(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Nn(e) {
	return new Mn(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/linearClosed.js
function Pn(e) {
	this._context = e;
}
Pn.prototype = {
	areaStart: En,
	areaEnd: En,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		this._point && this._context.closePath();
	},
	point: function(e, t) {
		e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
	}
};
function Fn(e) {
	return new Pn(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/monotone.js
function In(e) {
	return e < 0 ? -1 : 1;
}
function Ln(e, t, n) {
	var r = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (r || i < 0 && -0), o = (n - e._y1) / (i || r < 0 && -0), s = (a * i + o * r) / (r + i);
	return (In(a) + In(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(s)) || 0;
}
function Rn(e, t) {
	var n = e._x1 - e._x0;
	return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function zn(e, t, n) {
	var r = e._x0, i = e._y0, a = e._x1, o = e._y1, s = (a - r) / 3;
	e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function Bn(e) {
	this._context = e;
}
Bn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3: zn(this, this._t0, Rn(this, this._t0));
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		var n = NaN;
		if (e = +e, t = +t, e !== this._x1 || t !== this._y1) {
			switch (this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, zn(this, Rn(this, n = Ln(this, e, t)), n);
					break;
				default: zn(this, this._t0, n = Ln(this, e, t));
			}
			this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
		}
	}
};
function Vn(e) {
	this._context = new Hn(e);
}
(Vn.prototype = Object.create(Bn.prototype)).point = function(e, t) {
	Bn.prototype.point.call(this, t, e);
};
function Hn(e) {
	this._context = e;
}
Hn.prototype = {
	moveTo: function(e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function(e, t, n, r, i, a) {
		this._context.bezierCurveTo(t, e, r, n, a, i);
	}
};
function Un(e) {
	return new Bn(e);
}
function Wn(e) {
	return new Vn(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/natural.js
function Gn(e) {
	this._context = e;
}
Gn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [], this._y = [];
	},
	lineEnd: function() {
		var e = this._x, t = this._y, n = e.length;
		if (n) {
			if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2) this._context.lineTo(e[1], t[1]);
			else for (var r = Kn(e), i = Kn(t), a = 0, o = 1; o < n; ++a, ++o) this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
		}
		(this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
	},
	point: function(e, t) {
		this._x.push(+e), this._y.push(+t);
	}
};
function Kn(e) {
	var t, n = e.length - 1, r, i = Array(n), a = Array(n), o = Array(n);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
	for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = i[t] / a[t - 1], a[t] -= r, o[t] -= r * o[t - 1];
	for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function qn(e) {
	return new Gn(e);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/curve/step.js
function Jn(e, t) {
	this._context = e, this._t = t;
}
Jn.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN, this._point = 0;
	},
	lineEnd: function() {
		0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
			else {
				var n = this._x * (1 - this._t) + e * this._t;
				this._context.lineTo(n, this._y), this._context.lineTo(n, t);
			}
		}
		this._x = e, this._y = t;
	}
};
function Yn(e) {
	return new Jn(e, .5);
}
function Xn(e) {
	return new Jn(e, 0);
}
function Zn(e) {
	return new Jn(e, 1);
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/offset/none.js
function Qn(e, t) {
	if ((o = e.length) > 1) for (var n = 1, r, i, a = e[t[0]], o, s = a.length; n < o; ++n) for (i = a, a = e[t[n]], r = 0; r < s; ++r) a[r][1] += a[r][0] = isNaN(i[r][1]) ? i[r][0] : i[r][1];
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/order/none.js
function $n(e) {
	for (var t = e.length, n = Array(t); --t >= 0;) n[t] = t;
	return n;
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/stack.js
function er(e, t) {
	return e[t];
}
function tr(e) {
	let t = [];
	return t.key = e, t;
}
function nr() {
	var e = z([]), t = $n, n = Qn, r = er;
	function i(i) {
		var a = Array.from(e.apply(this, arguments), tr), o, s = a.length, c = -1, l;
		for (let e of i) for (o = 0, ++c; o < s; ++o) (a[o][c] = [0, +r(e, a[o].key, c, i)]).data = e;
		for (o = 0, l = Xt(t(a)); o < s; ++o) a[l[o]].index = o;
		return n(a, l), a;
	}
	return i.keys = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : z(Array.from(t)), i) : e;
	}, i.value = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : z(+e), i) : r;
	}, i.order = function(e) {
		return arguments.length ? (t = e == null ? $n : typeof e == "function" ? e : z(Array.from(e)), i) : t;
	}, i.offset = function(e) {
		return arguments.length ? (n = e ?? Qn, i) : n;
	}, i;
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/offset/expand.js
function rr(e, t) {
	if ((r = e.length) > 0) {
		for (var n, r, i = 0, a = e[0].length, o; i < a; ++i) {
			for (o = n = 0; n < r; ++n) o += e[n][i][1] || 0;
			if (o) for (n = 0; n < r; ++n) e[n][i][1] /= o;
		}
		Qn(e, t);
	}
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/offset/silhouette.js
function ir(e, t) {
	if ((i = e.length) > 0) {
		for (var n = 0, r = e[t[0]], i, a = r.length; n < a; ++n) {
			for (var o = 0, s = 0; o < i; ++o) s += e[o][n][1] || 0;
			r[n][1] += r[n][0] = -s / 2;
		}
		Qn(e, t);
	}
}
//#endregion
//#region node_modules/victory-vendor/node_modules/d3-shape/src/offset/wiggle.js
function ar(e, t) {
	if ((o = e.length) > 0 && (a = (i = e[t[0]]).length) > 0) {
		for (var n = 0, r = 1, i, a, o; r < a; ++r) {
			for (var s = 0, c = 0, l = 0; s < o; ++s) {
				for (var u = e[t[s]], d = u[r][1] || 0, f = (d - (u[r - 1][1] || 0)) / 2, p = 0; p < s; ++p) {
					var m = e[t[p]], h = m[r][1] || 0, g = m[r - 1][1] || 0;
					f += h - g;
				}
				c += d, l += f * d;
			}
			i[r - 1][1] += i[r - 1][0] = n, c && (n -= l / c);
		}
		i[r - 1][1] += i[r - 1][0] = n, Qn(e, t);
	}
}
//#endregion
//#region node_modules/recharts/es6/shape/Symbols.js
var or = [
	"type",
	"size",
	"sizeType"
];
function sr() {
	return sr = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, sr.apply(null, arguments);
}
function cr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function lr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cr(Object(n), !0).forEach(function(t) {
			ur(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ur(e, t, n) {
	return (t = dr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dr(e) {
	var t = fr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function pr(e, t) {
	if (e == null) return {};
	var n, r, i = mr(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function mr(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var hr = {
	symbolCircle: sn,
	symbolCross: cn,
	symbolDiamond: dn,
	symbolSquare: fn,
	symbolStar: _n,
	symbolTriangle: yn,
	symbolWye: wn
}, gr = Math.PI / 180, _r = (e) => hr[`symbol${Ct(e)}`] || sn, vr = (e, t, n) => {
	if (t === "area") return e;
	switch (n) {
		case "cross": return 5 * e * e / 9;
		case "diamond": return .5 * e * e / Math.sqrt(3);
		case "square": return e * e;
		case "star":
			var r = 18 * gr;
			return 1.25 * e * e * (Math.tan(r) - Math.tan(r * 2) * Math.tan(r) ** 2);
		case "triangle": return Math.sqrt(3) * e * e / 4;
		case "wye": return (21 - 10 * Math.sqrt(3)) * e * e / 8;
		default: return Math.PI * e * e / 4;
	}
}, yr = (e, t) => {
	hr[`symbol${Ct(e)}`] = t;
}, br = (e) => {
	var t = e.type, n = t === void 0 ? "circle" : t, r = e.size, i = r === void 0 ? 64 : r, a = e.sizeType, o = a === void 0 ? "area" : a, s = lr(lr({}, pr(e, or)), {}, {
		type: n,
		size: i,
		sizeType: o
	}), c = "circle";
	typeof n == "string" && (c = n);
	var u = () => {
		var e = _r(c), t = Tn().type(e).size(vr(i, o, c))();
		if (t !== null) return t;
	}, d = s.className, f = s.cx, p = s.cy, m = Ue(s);
	return I(f) && I(p) && I(i) ? /*#__PURE__*/ P.createElement("path", sr({}, m, {
		className: l("recharts-symbols", d),
		transform: `translate(${f}, ${p})`,
		d: u()
	})) : null;
};
br.registerSymbol = yr;
//#endregion
//#region node_modules/recharts/es6/util/types.js
var xr = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, Sr = (e, t) => {
	if (!e || typeof e == "function" || typeof e == "boolean") return null;
	var n = e;
	if (/*#__PURE__*/ (0, P.isValidElement)(e) && (n = e.props), typeof n != "object" && typeof n != "function") return null;
	var r = {};
	return Object.keys(n).forEach((e) => {
		Le(e) && typeof n[e] == "function" && (r[e] = t || ((t) => n[e](n, t)));
	}), r;
}, Cr = (e, t, n) => (r) => (e(t, n, r), null), wr = (e, t, n) => {
	if (e === null || typeof e != "object" && typeof e != "function") return null;
	var r = null;
	return Object.keys(e).forEach((i) => {
		var a = e[i];
		Le(i) && typeof a == "function" && (r ||= {}, r[i] = Cr(a, t, n));
	}), r;
};
//#endregion
//#region node_modules/recharts/es6/util/resolveDefaultProps.js
function Tr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Er(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Tr(Object(n), !0).forEach(function(t) {
			Dr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Tr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Dr(e, t, n) {
	return (t = Or(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Or(e) {
	var t = kr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ar(e, t) {
	var n = Er({}, e), r = t;
	return Object.keys(t).reduce((e, t) => (e[t] === void 0 && r[t] !== void 0 && (e[t] = r[t]), e), n);
}
//#endregion
//#region node_modules/recharts/es6/component/DefaultLegendContent.js
function jr() {
	return jr = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jr.apply(null, arguments);
}
function Mr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Nr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Mr(Object(n), !0).forEach(function(t) {
			Pr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Mr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Pr(e, t, n) {
	return (t = Fr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Fr(e) {
	var t = Ir(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ir(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Lr = 32, Rr = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	layout: "horizontal",
	verticalAlign: "middle",
	labelStyle: {}
};
function zr(e) {
	if (typeof e == "object" && e && "strokeDasharray" in e) return String(e.strokeDasharray);
}
function Br(e) {
	var t = e.data, n = e.iconType, r = e.inactiveColor, i = Lr / 2, a = Lr / 6, o = Lr / 3, s = t.inactive ? r : t.color, c = n ?? t.type;
	if (c === "none") return null;
	if (c === "plainline") return /*#__PURE__*/ P.createElement("line", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		strokeDasharray: zr(t.payload),
		x1: 0,
		y1: i,
		x2: Lr,
		y2: i,
		className: "recharts-legend-icon"
	});
	if (c === "line") return /*#__PURE__*/ P.createElement("path", {
		strokeWidth: 4,
		fill: "none",
		stroke: s,
		d: `M0,${i}h${o}
            A${a},${a},0,1,1,${2 * o},${i}
            H${Lr}M${2 * o},${i}
            A${a},${a},0,1,1,${o},${i}`,
		className: "recharts-legend-icon"
	});
	if (c === "rect") return /*#__PURE__*/ P.createElement("path", {
		stroke: "none",
		fill: s,
		d: `M0,${Lr / 8}h${Lr}v${Lr * 3 / 4}h${-Lr}z`,
		className: "recharts-legend-icon"
	});
	if (/*#__PURE__*/ P.isValidElement(t.legendIcon)) {
		var l = Nr({}, t);
		return delete l.legendIcon, /*#__PURE__*/ P.cloneElement(t.legendIcon, l);
	}
	return /*#__PURE__*/ P.createElement(br, {
		fill: s,
		cx: i,
		cy: i,
		size: Lr,
		sizeType: "diameter",
		type: c
	});
}
function Vr(e) {
	var t = e.payload, n = e.iconSize, r = e.layout, i = e.formatter, a = e.inactiveColor, o = e.iconType, s = e.labelStyle, c = {
		x: 0,
		y: 0,
		width: Lr,
		height: Lr
	}, u = {
		display: r === "horizontal" ? "inline-block" : "block",
		marginRight: 10,
		whiteSpace: "nowrap"
	}, d = {
		display: "inline-block",
		verticalAlign: "middle",
		marginRight: 4
	};
	return t.map((t, r) => {
		var f = t.formatter || i, p = l({
			"recharts-legend-item": !0,
			[`legend-item-${r}`]: !0,
			inactive: t.inactive
		});
		if (t.type === "none") return null;
		var m = typeof s == "object" ? Nr({}, s) : {};
		m.color = t.inactive ? a : m.color || t.color, m.whiteSpace ??= "normal", m.overflowWrap ??= "break-word";
		var h = f ? f(t.value, t, r) : t.value;
		return /*#__PURE__*/ P.createElement("li", jr({
			className: p,
			style: u,
			key: `legend-item-${r}`
		}, wr(e, t, r)), /*#__PURE__*/ P.createElement(Ye, {
			width: n,
			height: n,
			viewBox: c,
			style: d,
			"aria-label": t.value == null ? "legend icon" : `${t.value} legend icon`
		}, /*#__PURE__*/ P.createElement(Br, {
			data: t,
			iconType: o,
			inactiveColor: a
		})), /*#__PURE__*/ P.createElement("span", {
			className: "recharts-legend-item-text",
			style: m
		}, h));
	});
}
var Hr = (e) => {
	var t = Ar(e, Rr), n = t.payload, r = t.layout, i = t.align;
	if (!n || !n.length) return null;
	var a = {
		padding: 0,
		margin: 0,
		textAlign: r === "horizontal" ? i : "left"
	};
	return /*#__PURE__*/ P.createElement("ul", {
		className: "recharts-default-legend",
		style: a
	}, /*#__PURE__*/ P.createElement(Vr, jr({}, t, { payload: n })));
};
//#endregion
//#region node_modules/es-toolkit/dist/array/uniqBy.mjs
function Ur(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r = 0; r < e.length; r++) {
		let i = e[r], a = t(i, r, e);
		n.has(a) || n.set(a, i);
	}
	return Array.from(n.values());
}
//#endregion
//#region node_modules/es-toolkit/dist/function/ary.mjs
function Wr(e, t) {
	return function(...n) {
		return e.apply(this, n.slice(0, t));
	};
}
//#endregion
//#region node_modules/es-toolkit/dist/function/identity.mjs
function Gr(e) {
	return e;
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isLength.mjs
function Kr(e) {
	return Number.isSafeInteger(e) && e >= 0;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isArrayLike.mjs
function qr(e) {
	return e != null && typeof e != "function" && Kr(e.length);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/property.mjs
function Jr(e) {
	return function(t) {
		return lt(t, e);
	};
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isPrimitive.mjs
function Yr(e) {
	return e == null || typeof e != "object" && typeof e != "function";
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isTypedArray.mjs
function Xr(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/getSymbols.mjs
function Zr(e) {
	return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/getTag.mjs
function Qr(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/tags.mjs
var $r = "[object RegExp]", ei = "[object String]", ti = "[object Number]", ni = "[object Boolean]", ri = "[object Arguments]", ii = "[object Symbol]", ai = "[object Date]", oi = "[object Map]", si = "[object Set]", ci = "[object Array]", li = "[object Function]", ui = "[object ArrayBuffer]", di = "[object Object]", fi = "[object Error]", pi = "[object DataView]", mi = "[object Uint8Array]", hi = "[object Uint8ClampedArray]", gi = "[object Uint16Array]", _i = "[object Uint32Array]", vi = "[object BigUint64Array]", yi = "[object Int8Array]", bi = "[object Int16Array]", xi = "[object Int32Array]", Si = "[object BigInt64Array]", Ci = "[object Float32Array]", wi = "[object Float64Array]", Ti = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || (function() {
	return this;
})();
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isBuffer.mjs
function Ei(e) {
	return Ti.Buffer !== void 0 && Ti.Buffer.isBuffer(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/object/cloneDeepWith.mjs
function Di(e, t) {
	return Oi(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function Oi(e, t, n, r = /* @__PURE__ */ new Map(), i = void 0) {
	let a = i?.(e, t, n, r);
	if (a !== void 0) return a;
	if (Yr(e)) return e;
	if (r.has(e)) return r.get(e);
	if (Array.isArray(e)) {
		let t = Array(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = Oi(e[a], a, n, r, i);
		return Object.hasOwn(e, "index") && (t.index = e.index), Object.hasOwn(e, "input") && (t.input = e.input), t;
	}
	if (e instanceof Date) return new Date(e.getTime());
	if (e instanceof RegExp) {
		let t = new RegExp(e.source, e.flags);
		return t.lastIndex = e.lastIndex, t;
	}
	if (e instanceof Map) {
		let t = /* @__PURE__ */ new Map();
		r.set(e, t);
		for (let [a, o] of e) t.set(a, Oi(o, a, n, r, i));
		return t;
	}
	if (e instanceof Set) {
		let t = /* @__PURE__ */ new Set();
		r.set(e, t);
		for (let a of e) t.add(Oi(a, void 0, n, r, i));
		return t;
	}
	if (Ei(e)) return e.subarray();
	if (Xr(e)) {
		let t = new (Object.getPrototypeOf(e)).constructor(e.length);
		r.set(e, t);
		for (let a = 0; a < e.length; a++) t[a] = Oi(e[a], a, n, r, i);
		return t;
	}
	if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
	if (e instanceof DataView) {
		let t = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (typeof File < "u" && e instanceof File) {
		let t = new File([e], e.name, { type: e.type });
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (typeof Blob < "u" && e instanceof Blob) {
		let t = new Blob([e], { type: e.type });
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (e instanceof Error) {
		let t = structuredClone(e);
		return r.set(e, t), t.message = e.message, t.name = e.name, t.stack = e.stack, t.cause = e.cause, t.constructor = e.constructor, ki(t, e, n, r, i), t;
	}
	if (e instanceof Boolean) {
		let t = new Boolean(e.valueOf());
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (e instanceof Number) {
		let t = new Number(e.valueOf());
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (e instanceof String) {
		let t = new String(e.valueOf());
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	if (typeof e == "object" && Ai(e)) {
		let t = Object.create(Object.getPrototypeOf(e));
		return r.set(e, t), ki(t, e, n, r, i), t;
	}
	return e;
}
function ki(e, t, n = e, r, i) {
	let a = [...Object.keys(t), ...Zr(t)];
	for (let o = 0; o < a.length; o++) {
		let s = a[o], c = Object.getOwnPropertyDescriptor(e, s);
		(c == null || c.writable) && (e[s] = Oi(t[s], s, n, r, i));
	}
}
function Ai(e) {
	switch (Qr(e)) {
		case ri:
		case ci:
		case ui:
		case pi:
		case ni:
		case ai:
		case Ci:
		case wi:
		case yi:
		case bi:
		case xi:
		case oi:
		case ti:
		case di:
		case $r:
		case si:
		case ei:
		case ii:
		case mi:
		case hi:
		case gi:
		case _i: return !0;
		default: return !1;
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/object/cloneDeep.mjs
function ji(e) {
	return Oi(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/eq.mjs
function Mi(e, t) {
	return e === t || Number.isNaN(e) && Number.isNaN(t);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isObject.mjs
function Ni(e) {
	return e !== null && (typeof e == "object" || typeof e == "function");
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isMatchWith.mjs
function Pi(e, t, n) {
	return typeof n == "function" ? Fi(e, t, function e(t, r, i, a, o, s) {
		let c = n(t, r, i, a, o, s);
		return c === void 0 ? Fi(t, r, e, s, !1) : !!c;
	}, /* @__PURE__ */ new Map(), !0) : Pi(e, t, () => void 0);
}
function Fi(e, t, n, r, i = !1) {
	if (t === e) return !0;
	switch (typeof t) {
		case "object": return Ii(e, t, n, r, i);
		case "function": return Object.keys(t).length > 0 ? Fi(e, { ...t }, n, r, i) : Mi(e, t);
		default: return Ni(e) && i ? typeof t != "string" || t === "" : Mi(e, t);
	}
}
function Ii(e, t, n, r, i = !1) {
	if (t == null) return !0;
	if (Array.isArray(t)) return Ri(e, t, n, r);
	if (t instanceof Map) return Li(e, t, n, r);
	if (t instanceof Set) return zi(e, t, n, r);
	let a = Object.keys(t);
	if (e == null) return i && a.length === 0;
	if (i) Yr(e) && (e = Object(e));
	else {
		let t = Qr(e);
		if (t !== "[object Object]" && t !== "[object Arguments]") return !1;
	}
	if (a.length === 0) return !0;
	if (r?.has(t)) return r.get(t) === e;
	r?.set(t, e);
	try {
		for (let i = 0; i < a.length; i++) {
			let o = a[i];
			if (!(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !n(e[o], t[o], o, e, t, r)) return !1;
		}
		return !0;
	} finally {
		r?.delete(t);
	}
}
function Li(e, t, n, r) {
	if (t.size === 0) return !0;
	if (!(e instanceof Map)) return !1;
	for (let [i, a] of t.entries()) if (n(e.get(i), a, i, e, t, r) === !1) return !1;
	return !0;
}
function Ri(e, t, n, r) {
	if (t.length === 0) return !0;
	if (!Array.isArray(e)) return !1;
	let i = /* @__PURE__ */ new Set();
	for (let a = 0; a < t.length; a++) {
		let o = t[a], s = !1;
		for (let c = 0; c < e.length; c++) {
			if (i.has(c)) continue;
			let l = e[c], u = !1;
			if (n(l, o, a, e, t, r) && (u = !0), u) {
				i.add(c), s = !0;
				break;
			}
		}
		if (!s) return !1;
	}
	return !0;
}
function zi(e, t, n, r) {
	return t.size === 0 || e instanceof Set && Ri([...e], [...t], n, r);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isMatch.mjs
function Bi(e, t) {
	return Pi(e, t, () => void 0);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/matches.mjs
function Vi(e) {
	return e = ji(e), (t) => Bi(t, e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/cloneDeepWith.mjs
function Hi(e, t) {
	return Di(e, (n, r, i, a) => {
		let o = t?.(n, r, i, a);
		if (o !== void 0) return o;
		if (typeof e == "object") {
			if (Qr(e) === "[object Object]" && typeof e.constructor != "function") {
				let t = {};
				return a.set(e, t), ki(t, e, i, a), t;
			}
			switch (Object.prototype.toString.call(e)) {
				case ti:
				case ei:
				case ni: {
					let t = new e.constructor(e?.valueOf());
					return ki(t, e), t;
				}
				case ri: {
					let t = {};
					return ki(t, e), t.length = e.length, t[Symbol.iterator] = e[Symbol.iterator], t;
				}
				default: return;
			}
		}
	});
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/cloneDeep.mjs
function Ui(e) {
	return Hi(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isIndex.mjs
var Wi = /^(?:0|[1-9]\d*)$/;
function Gi(e, t = 2 ** 53 - 1) {
	switch (typeof e) {
		case "number": return Number.isInteger(e) && e >= 0 && e < t;
		case "symbol": return !1;
		case "string": return Wi.test(e);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/isArguments.mjs
function Ki(e) {
	return typeof e == "object" && !!e && Qr(e) === "[object Arguments]";
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/object/has.mjs
function qi(e, t) {
	let n;
	if (n = Array.isArray(t) ? t : typeof t == "string" && rt(t) && !(t in Object(e)) ? ct(t) : [t], n.length === 0) return !1;
	let r = e;
	for (let e = 0; e < n.length; e++) {
		let t = it(n[e]);
		if ((r == null || !Object.hasOwn(r, t)) && !((Array.isArray(r) || Ki(r)) && Gi(t) && Number(t) < r.length)) return !1;
		r = r[t];
	}
	return !0;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/predicate/matchesProperty.mjs
function Ji(e, t) {
	switch (typeof e) {
		case "object":
			Object.is(e?.valueOf(), -0) && (e = "-0");
			break;
		case "number": e = it(e);
	}
	return t = Ui(t), function(n) {
		let r = lt(n, e);
		return r === void 0 ? qi(n, e) : t === void 0 ? r === void 0 : Bi(r, t);
	};
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/iteratee.mjs
function Yi(e) {
	if (e == null) return Gr;
	switch (typeof e) {
		case "function": return e;
		case "object": return Array.isArray(e) && e.length === 2 ? Ji(e[0], e[1]) : Vi(e);
		default: return Jr(e);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/normalizeZero.mjs
function Xi(e) {
	return e === 0 ? 0 : e;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/uniqBy.mjs
function Zi(e, t = Gr) {
	return qr(e) ? Ur(Array.from(e), Wr(Yi(t), 1)).map(Xi) : [];
}
//#endregion
//#region node_modules/recharts/es6/util/payload/getUniqPayload.js
function Qi(e, t, n) {
	return t === !0 ? Zi(e, n) : typeof t == "function" ? Zi(e, t) : e;
}
//#endregion
//#region node_modules/recharts/es6/state/RechartsReduxContext.js
var $i = /*#__PURE__*/ (0, P.createContext)(null), ea = (e) => e, B = () => {
	var e = (0, P.useContext)($i);
	return e ? e.store.dispatch : ea;
}, ta = () => {}, na = () => ta, ra = (e, t) => e === t;
function V(e) {
	var t = (0, P.useContext)($i), n = (0, P.useMemo)(() => t ? (t) => {
		if (t != null) return e(t);
	} : ta, [t, e]);
	return (0, Xe.useSyncExternalStoreWithSelector)(t ? t.subscription.addNestedSub : na, t ? t.store.getState : ta, t ? t.store.getState : ta, n, ra);
}
//#endregion
//#region node_modules/reselect/dist/reselect.mjs
function ia(e, t = `expected a function, instead received ${typeof e}`) {
	if (typeof e != "function") throw TypeError(t);
}
function aa(e, t = "expected all items to be functions, instead received the following types: ") {
	if (!e.every((e) => typeof e == "function")) {
		let n = e.map((e) => typeof e == "function" ? `function ${e.name || "unnamed"}()` : typeof e).join(", ");
		throw TypeError(`${t}[${n}]`);
	}
}
var oa = (e) => Array.isArray(e) ? e : [e];
function sa(e) {
	let t = Array.isArray(e[0]) ? e[0] : e;
	return aa(t, "createSelector expects all input-selectors to be functions, but received the following types: "), t;
}
function ca(e, t) {
	let n = [], { length: r } = e;
	for (let i = 0; i < r; i++) n.push(e[i].apply(null, t));
	return n;
}
var la = class {
	constructor(e) {
		this.value = e;
	}
	deref() {
		return this.value;
	}
}, ua = typeof WeakRef > "u" ? la : WeakRef, da = 0, fa = 1;
function pa() {
	return {
		s: da,
		v: void 0,
		o: null,
		p: null
	};
}
function ma(e) {
	return e instanceof ua ? e.deref() : e;
}
function ha(e, t = {}) {
	let n = pa(), { resultEqualityCheck: r } = t, i, a = 0;
	function o() {
		let t = n, { length: o } = arguments;
		for (let e = 0, n = o; e < n; e++) {
			let n = arguments[e];
			if (typeof n == "function" || typeof n == "object" && n) {
				let e = t.o;
				e === null && (t.o = e = /* @__PURE__ */ new WeakMap());
				let r = e.get(n);
				r === void 0 ? (t = pa(), e.set(n, t)) : t = r;
			} else {
				let e = t.p;
				e === null && (t.p = e = /* @__PURE__ */ new Map());
				let r = e.get(n);
				r === void 0 ? (t = pa(), e.set(n, t)) : t = r;
			}
		}
		let s = t, c;
		if (t.s === fa) c = t.v;
		else if (c = e.apply(null, arguments), a++, r) {
			let e = ma(i);
			e != null && r(e, c) && (c = e, a !== 0 && a--), i = typeof c == "object" && c || typeof c == "function" ? /* @__PURE__ */ new ua(c) : c;
		}
		return s.s = fa, s.v = c, c;
	}
	return o.clearCache = () => {
		n = pa(), o.resetResultsCount();
	}, o.resultsCount = () => a, o.resetResultsCount = () => {
		a = 0;
	}, o;
}
function ga(e, ...t) {
	let n = typeof e == "function" ? {
		memoize: e,
		memoizeOptions: t
	} : e, r = (...e) => {
		let t = 0, r = 0, i, a = {}, o = e.pop();
		typeof o == "object" && (a = o, o = e.pop()), ia(o, `createSelector expects an output function after the inputs, but received: [${typeof o}]`);
		let { memoize: s, memoizeOptions: c = [], argsMemoize: l = ha, argsMemoizeOptions: u = [] } = {
			...n,
			...a
		}, d = oa(c), f = oa(u), p = sa(e), m = s(function() {
			return t++, o.apply(null, arguments);
		}, ...d), h = l(function() {
			r++;
			let e = ca(p, arguments);
			return i = m.apply(null, e), i;
		}, ...f);
		return Object.assign(h, {
			resultFunc: o,
			memoizedResultFunc: m,
			dependencies: p,
			dependencyRecomputations: () => r,
			resetDependencyRecomputations: () => {
				r = 0;
			},
			lastResult: () => i,
			recomputations: () => t,
			resetRecomputations: () => {
				t = 0;
			},
			memoize: s,
			argsMemoize: l
		});
	};
	return Object.assign(r, { withTypes: () => r }), r;
}
var H = /* @__PURE__ */ ga(ha);
//#endregion
//#region node_modules/es-toolkit/dist/array/flatten.mjs
function _a(e, t = 1) {
	let n = [], r = Math.floor(t), i = (e, t) => {
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			Array.isArray(o) && t < r ? i(o, t + 1) : n.push(o);
		}
	};
	return i(e, 0), n;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/isIterateeCall.mjs
function va(e, t, n) {
	return Ni(n) && (typeof t == "number" && qr(n) && Gi(t) && t < n.length || typeof t == "string" && t in n) ? Mi(n[t], e) : !1;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/compareValues.mjs
function ya(e) {
	return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e === e ? 0 : 4;
}
var ba = (e, t, n) => {
	if (e !== t) {
		let r = ya(e), i = ya(t);
		if (r === i && r === 0) {
			if (e < t) return n === "desc" ? 1 : -1;
			if (e > t) return n === "desc" ? -1 : 1;
		}
		return n === "desc" ? i - r : r - i;
	}
	return 0;
}, xa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Sa = /^\w*$/;
function Ca(e, t) {
	return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || at(e) ? !0 : typeof e == "string" && (Sa.test(e) || !xa.test(e)) || t != null && Object.hasOwn(t, e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/orderBy.mjs
function wa(e, t, n, r) {
	if (e == null) return [];
	n = r ? void 0 : n, Array.isArray(e) || (e = qr(e) ? Array.from(e) : Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(n) || (n = n == null ? [] : [n]), n = n.map((e) => String(e));
	let i = (e, t) => {
		let n = e, r = 0;
		for (; r < t.length && n != null; ++r) n = n[t[r]];
		return r > 0 && r === t.length ? n : void 0;
	}, a = (e, t) => {
		if (e == null) return t;
		if (t != null) return typeof e == "object" && "key" in e ? Object.hasOwn(t, e.key) ? t[e.key] : i(t, e.path) : typeof e == "function" ? e(t) : Array.isArray(e) ? i(t, e) : t[e];
	}, o = t.map((e) => (Array.isArray(e) && e.length === 1 && (e = e[0]), e == null || typeof e == "function" || Array.isArray(e) || Ca(e) ? e : {
		key: e,
		path: ct(e)
	}));
	return e.map((e) => ({
		original: e,
		criteria: o.map((t) => a(t, e))
	})).slice().sort((e, t) => {
		for (let r = 0; r < o.length; r++) {
			let i = ba(e.criteria[r], t.criteria[r], n[r]);
			if (i !== 0) return i;
		}
		return 0;
	}).map((e) => e.original);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/sortBy.mjs
function Ta(e, ...t) {
	let n = t.length;
	return n > 1 && va(e, t[0], t[1]) ? t = [] : n > 2 && va(t[0], t[1], t[2]) && (t = [t[0]]), wa(e, _a(t), ["asc"]);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/legendSelectors.js
var Ea = (e) => e.legend.settings, Da = (e) => e.legend.size, Oa = H([(e) => e.legend.payload, Ea], (e, t) => {
	var n = t.itemSorter, r = e.flat(1);
	return n ? Ta(r, n) : r;
});
//#endregion
//#region node_modules/recharts/es6/context/legendPayloadContext.js
function ka() {
	return V(Oa);
}
//#endregion
//#region node_modules/recharts/es6/util/useElementOffset.js
function Aa(e, t) {
	return Fa(e) || Pa(e, t) || Ma(e, t) || ja();
}
function ja() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ma(e, t) {
	if (e) {
		if (typeof e == "string") return Na(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Na(e, t) : void 0;
	}
}
function Na(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Pa(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Fa(e) {
	if (Array.isArray(e)) return e;
}
var Ia = 1;
function La(e, t) {
	return Math.abs(e.height - t.height) > Ia || Math.abs(e.left - t.left) > Ia || Math.abs(e.top - t.top) > Ia || Math.abs(e.width - t.width) > Ia;
}
function Ra(e) {
	var t = e.getBoundingClientRect();
	return {
		height: t.height,
		left: t.left,
		top: t.top,
		width: t.width
	};
}
function za() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = Aa((0, P.useState)({
		height: 0,
		left: 0,
		top: 0,
		width: 0
	}), 2), n = t[0], r = t[1], i = (0, P.useRef)(null), a = (0, P.useRef)(n);
	a.current = n;
	var o = (0, P.useCallback)((e) => {
		if (i.current != null && (i.current.disconnect(), i.current = null), e != null) {
			var t = Ra(e);
			if (La(t, a.current) && r(t), typeof ResizeObserver < "u") {
				var n = new ResizeObserver(() => {
					var t = Ra(e);
					La(t, a.current) && r(t);
				});
				n.observe(e), i.current = n;
			}
		}
	}, [...e]);
	return (0, P.useEffect)(() => () => {
		var e;
		(e = i.current) == null || e.disconnect();
	}, []), [n, o];
}
//#endregion
//#region node_modules/redux/dist/redux.mjs
function Ba(e) {
	return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Va = typeof Symbol == "function" && Symbol.observable || "@@observable", Ha = () => Math.random().toString(36).substring(7).split("").join("."), Ua = {
	INIT: `@@redux/INIT${/* @__PURE__ */ Ha()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Ha()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Ha()}`
};
function Wa(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null;) t = Object.getPrototypeOf(t);
	return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function Ga(e, t, n) {
	if (typeof e != "function") throw Error(Ba(2));
	if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function") throw Error(Ba(0));
	if (typeof t == "function" && n === void 0 && (n = t, t = void 0), n !== void 0) {
		if (typeof n != "function") throw Error(Ba(1));
		return n(Ga)(e, t);
	}
	let r = e, i = t, a = /* @__PURE__ */ new Map(), o = a, s = 0, c = !1;
	function l() {
		o === a && (o = /* @__PURE__ */ new Map(), a.forEach((e, t) => {
			o.set(t, e);
		}));
	}
	function u() {
		if (c) throw Error(Ba(3));
		return i;
	}
	function d(e) {
		if (typeof e != "function") throw Error(Ba(4));
		if (c) throw Error(Ba(5));
		let t = !0;
		l();
		let n = s++;
		return o.set(n, e), function() {
			if (t) {
				if (c) throw Error(Ba(6));
				t = !1, l(), o.delete(n), a = null;
			}
		};
	}
	function f(e) {
		if (!Wa(e)) throw Error(Ba(7));
		if (e.type === void 0) throw Error(Ba(8));
		if (typeof e.type != "string") throw Error(Ba(17));
		if (c) throw Error(Ba(9));
		try {
			c = !0, i = r(i, e);
		} finally {
			c = !1;
		}
		return (a = o).forEach((e) => {
			e();
		}), e;
	}
	function p(e) {
		if (typeof e != "function") throw Error(Ba(10));
		r = e, f({ type: Ua.REPLACE });
	}
	function m() {
		let e = d;
		return {
			subscribe(t) {
				if (typeof t != "object" || !t) throw Error(Ba(11));
				function n() {
					let e = t;
					e.next && e.next(u());
				}
				return n(), { unsubscribe: e(n) };
			},
			[Va]() {
				return this;
			}
		};
	}
	return f({ type: Ua.INIT }), {
		dispatch: f,
		subscribe: d,
		getState: u,
		replaceReducer: p,
		[Va]: m
	};
}
function Ka(e) {
	Object.keys(e).forEach((t) => {
		let n = e[t];
		if (n(void 0, { type: Ua.INIT }) === void 0) throw Error(Ba(12));
		if (n(void 0, { type: Ua.PROBE_UNKNOWN_ACTION() }) === void 0) throw Error(Ba(13));
	});
}
function qa(e) {
	let t = Object.keys(e), n = {};
	for (let r = 0; r < t.length; r++) {
		let i = t[r];
		typeof e[i] == "function" && (n[i] = e[i]);
	}
	let r = Object.keys(n), i;
	try {
		Ka(n);
	} catch (e) {
		i = e;
	}
	return function(e = {}, t) {
		if (i) throw i;
		let a = !1, o = {};
		for (let i = 0; i < r.length; i++) {
			let s = r[i], c = n[s], l = e[s], u = c(l, t);
			if (u === void 0) throw t && t.type, Error(Ba(14));
			o[s] = u, a ||= u !== l;
		}
		return a ||= r.length !== Object.keys(e).length, a ? o : e;
	};
}
function Ja(...e) {
	return e.length === 0 ? (e) => e : e.length === 1 ? e[0] : e.reduce((e, t) => (...n) => e(t(...n)));
}
function Ya(...e) {
	return (t) => (n, r) => {
		let i = t(n, r), a = () => {
			throw Error(Ba(15));
		}, o = {
			getState: i.getState,
			dispatch: (e, ...t) => a(e, ...t)
		};
		return a = Ja(...e.map((e) => e(o)))(i.dispatch), {
			...i,
			dispatch: a
		};
	};
}
function Xa(e) {
	return Wa(e) && "type" in e && typeof e.type == "string";
}
//#endregion
//#region node_modules/immer/dist/immer.mjs
var Za = Symbol.for("immer-nothing"), Qa = Symbol.for("immer-draftable"), $a = Symbol.for("immer-state");
function eo(e, ...t) {
	throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var to = Object, no = to.getPrototypeOf, ro = "constructor", io = "prototype", ao = "configurable", oo = "enumerable", so = "writable", co = "value", lo = (e) => !!e && !!e[$a];
function uo(e) {
	return e ? mo(e) || xo(e) || !!e[Qa] || !!e[ro]?.[Qa] || So(e) || Co(e) : !1;
}
var fo = to[io][ro].toString(), po = /* @__PURE__ */ new WeakMap();
function mo(e) {
	if (!e || !wo(e)) return !1;
	let t = no(e);
	if (t === null || t === to[io]) return !0;
	let n = to.hasOwnProperty.call(t, ro) && t[ro];
	if (n === Object) return !0;
	if (!To(n)) return !1;
	let r = po.get(n);
	return r === void 0 && (r = Function.toString.call(n), po.set(n, r)), r === fo;
}
function ho(e, t, n = !0) {
	go(e) === 0 ? (n ? Reflect.ownKeys(e) : to.keys(e)).forEach((n) => {
		t(n, e[n], e);
	}) : e.forEach((n, r) => t(r, n, e));
}
function go(e) {
	let t = e[$a];
	return t ? t.type_ : xo(e) ? 1 : So(e) ? 2 : Co(e) ? 3 : 0;
}
var _o = (e, t, n = go(e)) => n === 2 ? e.has(t) : to[io].hasOwnProperty.call(e, t), vo = (e, t, n = go(e)) => n === 2 ? e.get(t) : e[t], yo = (e, t, n, r = go(e)) => {
	r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
};
function bo(e, t) {
	return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
var xo = Array.isArray, So = (e) => e instanceof Map, Co = (e) => e instanceof Set, wo = (e) => typeof e == "object", To = (e) => typeof e == "function", Eo = (e) => typeof e == "boolean";
function Do(e) {
	let t = +e;
	return Number.isInteger(t) && String(t) === e;
}
var Oo = (e) => e.copy_ || e.base_, ko = (e) => e.modified_ ? e.copy_ : e.base_;
function Ao(e, t) {
	if (So(e)) return new Map(e);
	if (Co(e)) return new Set(e);
	if (xo(e)) return Array[io].slice.call(e);
	let n = mo(e);
	if (t === !0 || t === "class_only" && !n) {
		let t = to.getOwnPropertyDescriptors(e);
		delete t[$a];
		let n = Reflect.ownKeys(t);
		for (let r = 0; r < n.length; r++) {
			let i = n[r], a = t[i];
			a[so] === !1 && (a[so] = !0, a[ao] = !0), (a.get || a.set) && (t[i] = {
				[ao]: !0,
				[so]: !0,
				[oo]: a[oo],
				[co]: e[i]
			});
		}
		return to.create(no(e), t);
	}
	{
		let t = no(e);
		if (t !== null && n) return { ...e };
		let r = to.create(t);
		return to.assign(r, e);
	}
}
function jo(e, t = !1) {
	return Po(e) || lo(e) || !uo(e) || (go(e) > 1 && to.defineProperties(e, {
		set: No,
		add: No,
		clear: No,
		delete: No
	}), to.freeze(e), t && ho(e, (e, t) => {
		jo(t, !0);
	}, !1)), e;
}
function Mo() {
	eo(2);
}
var No = { [co]: Mo };
function Po(e) {
	return e === null || !wo(e) || to.isFrozen(e);
}
var Fo = "MapSet", Io = "Patches", Lo = "ArrayMethods", Ro = {};
function zo(e) {
	let t = Ro[e];
	return t || eo(0, e), t;
}
var Bo = (e) => !!Ro[e], Vo, Ho = () => Vo, Uo = (e, t) => ({
	drafts_: [],
	parent_: e,
	immer_: t,
	canAutoFreeze_: !0,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: Bo(Fo) ? zo(Fo) : void 0,
	arrayMethodsPlugin_: Bo(Lo) ? zo(Lo) : void 0
});
function Wo(e, t) {
	t && (e.patchPlugin_ = zo(Io), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function Go(e) {
	Ko(e), e.drafts_.forEach(Jo), e.drafts_ = null;
}
function Ko(e) {
	e === Vo && (Vo = e.parent_);
}
var qo = (e) => Vo = Uo(Vo, e);
function Jo(e) {
	let t = e[$a];
	t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Yo(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	let n = t.drafts_[0];
	if (e !== void 0 && e !== n) {
		n[$a].modified_ && (Go(t), eo(4)), uo(e) && (e = Xo(t, e));
		let { patchPlugin_: r } = t;
		r && r.generateReplacementPatches_(n[$a].base_, e, t);
	} else e = Xo(t, n);
	return Zo(t, e, !0), Go(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e === Za ? void 0 : e;
}
function Xo(e, t) {
	if (Po(t)) return t;
	let n = t[$a];
	if (!n) return as(t, e.handledSet_, e);
	if (!$o(n, e)) return t;
	if (!n.modified_) return n.base_;
	if (!n.finalized_) {
		let { callbacks_: t } = n;
		if (t) for (; t.length > 0;) t.pop()(e);
		rs(n, e);
	}
	return n.copy_;
}
function Zo(e, t, n = !1) {
	!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && jo(t, n);
}
function Qo(e) {
	e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var $o = (e, t) => e.scope_ === t, es = [];
function ts(e, t, n, r) {
	let i = Oo(e), a = e.type_;
	if (r !== void 0 && vo(i, r, a) === t) {
		yo(i, r, n, a);
		return;
	}
	if (!e.draftLocations_) {
		let t = e.draftLocations_ = /* @__PURE__ */ new Map();
		ho(i, (e, n) => {
			if (lo(n)) {
				let r = t.get(n) || [];
				r.push(e), t.set(n, r);
			}
		});
	}
	let o = e.draftLocations_.get(t) ?? es;
	for (let e of o) yo(i, e, n, a);
}
function ns(e, t, n) {
	e.callbacks_.push(function(r) {
		let i = t;
		if (!i || !$o(i, r)) return;
		r.mapSetPlugin_?.fixSetContents(i);
		let a = ko(i);
		ts(e, i.draft_ ?? i, a, n), rs(i, r);
	});
}
function rs(e, t) {
	if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
		let { patchPlugin_: n } = t;
		if (n) {
			let r = n.getPath(e);
			r && n.generatePatches_(e, r, t);
		}
		Qo(e);
	}
}
function is(e, t, n) {
	let { scope_: r } = e;
	if (lo(n)) {
		let i = n[$a];
		$o(i, r) && i.callbacks_.push(function() {
			ms(e), ts(e, n, ko(i), t);
		});
	} else uo(n) && e.callbacks_.push(function() {
		let i = Oo(e);
		e.type_ === 3 ? i.has(n) && as(n, r.handledSet_, r) : vo(i, t, e.type_) === n && r.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && as(vo(e.copy_, t, e.type_), r.handledSet_, r);
	});
}
function as(e, t, n) {
	return !n.immer_.autoFreeze_ && n.unfinalizedDrafts_ < 1 || lo(e) || t.has(e) || !uo(e) || Po(e) || (t.add(e), ho(e, (r, i) => {
		if (lo(i)) {
			let t = i[$a];
			$o(t, n) && (yo(e, r, ko(t), e.type_), Qo(t));
		} else uo(i) && as(i, t, n);
	})), e;
}
function os(e, t) {
	let n = xo(e), r = {
		type_: +!!n,
		scope_: t ? t.scope_ : Ho(),
		modified_: !1,
		finalized_: !1,
		assigned_: void 0,
		parent_: t,
		base_: e,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: !1,
		callbacks_: void 0
	}, i = r, a = ss;
	n && (i = [r], a = cs);
	let { revoke: o, proxy: s } = Proxy.revocable(i, a);
	return r.draft_ = s, r.revoke_ = o, [s, r];
}
var ss = {
	get(e, t) {
		if (t === $a) return e;
		let n = e.scope_.arrayMethodsPlugin_, r = e.type_ === 1 && typeof t == "string";
		if (r && n?.isArrayOperationMethod(t)) return n.createMethodInterceptor(e, t);
		let i = Oo(e);
		if (!_o(i, t, e.type_)) return ds(e, i, t);
		let a = i[t];
		if (e.finalized_ || !uo(a) || r && e.operationMethod && n?.isMutatingArrayMethod(e.operationMethod) && Do(t)) return a;
		if (a === ls(e.base_, t) || us(e, t, a)) {
			ms(e);
			let n = e.type_ === 1 ? +t : t, r = gs(e.scope_, a, e, n);
			return e.copy_[n] = r;
		}
		return a;
	},
	has(e, t) {
		return t in Oo(e);
	},
	ownKeys(e) {
		return Reflect.ownKeys(Oo(e));
	},
	set(e, t, n) {
		let r = fs(Oo(e), t);
		if (r?.set) return r.set.call(e.draft_, n), !0;
		if (!e.modified_) {
			let r = ls(Oo(e), t), i = r?.[$a];
			if (i && i.base_ === n) return e.copy_[t] = n, e.assigned_.delete(t), !0;
			if (bo(n, r) && (n !== void 0 || _o(e.base_, t, e.type_))) return !0;
			ms(e), ps(e);
		}
		return e.copy_[t] === n && (n !== void 0 || _o(e.copy_, t, e.type_)) || Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_.set(t, !0), is(e, t, n)), !0;
	},
	deleteProperty(e, t) {
		return ms(e), ls(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), ps(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
	},
	getOwnPropertyDescriptor(e, t) {
		let n = Oo(e), r = Reflect.getOwnPropertyDescriptor(n, t);
		return r && {
			[so]: !0,
			[ao]: e.type_ !== 1 || t !== "length",
			[oo]: r[oo],
			[co]: n[t]
		};
	},
	defineProperty() {
		eo(11);
	},
	getPrototypeOf(e) {
		return no(e.base_);
	},
	setPrototypeOf() {
		eo(12);
	}
}, cs = {};
for (let e in ss) {
	let t = ss[e];
	cs[e] = function() {
		let e = arguments;
		return e[0] = e[0][0], t.apply(this, e);
	};
}
cs.deleteProperty = function(e, t) {
	return cs.set.call(this, e, t, void 0);
}, cs.set = function(e, t, n) {
	return ss.set.call(this, e[0], t, n, e[0]);
};
function ls(e, t) {
	let n = e[$a];
	return (n ? Oo(n) : e)[t];
}
function us(e, t, n) {
	return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !uo(n) || n[$a] ? !1 : e.baseRefs_.has(n);
}
function ds(e, t, n) {
	let r = fs(t, n);
	return r ? co in r ? r[co] : r.get?.call(e.draft_) : void 0;
}
function fs(e, t) {
	if (!(t in e)) return;
	let n = no(e);
	for (; n;) {
		let e = Object.getOwnPropertyDescriptor(n, t);
		if (e) return e;
		n = no(n);
	}
}
function ps(e) {
	e.modified_ || (e.modified_ = !0, e.parent_ && ps(e.parent_));
}
function ms(e) {
	e.copy_ ||= (e.assigned_ = /* @__PURE__ */ new Map(), Ao(e.base_, e.scope_.immer_.useStrictShallowCopy_));
}
var hs = class {
	constructor(e) {
		this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (e, t, n) => {
			if (To(e) && !To(t)) {
				let n = t;
				t = e;
				let r = this;
				return function(e = n, ...i) {
					return r.produce(e, (e) => t.call(this, e, ...i));
				};
			}
			To(t) || eo(6), n !== void 0 && !To(n) && eo(7);
			let r;
			if (uo(e)) {
				let i = qo(this), a = gs(i, e, void 0), o = !0;
				try {
					r = t(a), o = !1;
				} finally {
					o ? Go(i) : Ko(i);
				}
				return Wo(i, n), Yo(r, i);
			}
			if (!e || !wo(e)) {
				if (r = t(e), r === void 0 && (r = e), r === Za && (r = void 0), this.autoFreeze_ && jo(r, !0), n) {
					let t = [], i = [];
					zo(Io).generateReplacementPatches_(e, r, {
						patches_: t,
						inversePatches_: i
					}), n(t, i);
				}
				return r;
			}
			eo(1, e);
		}, this.produceWithPatches = (e, t) => {
			if (To(e)) return (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n));
			let n, r;
			return [
				this.produce(e, t, (e, t) => {
					n = e, r = t;
				}),
				n,
				r
			];
		}, Eo(e?.autoFreeze) && this.setAutoFreeze(e.autoFreeze), Eo(e?.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), Eo(e?.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
	}
	createDraft(e) {
		uo(e) || eo(8), lo(e) && (e = _s(e));
		let t = qo(this), n = gs(t, e, void 0);
		return n[$a].isManual_ = !0, Ko(t), n;
	}
	finishDraft(e, t) {
		let n = e && e[$a];
		(!n || !n.isManual_) && eo(9);
		let { scope_: r } = n;
		return Wo(r, t), Yo(void 0, r);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	setUseStrictIteration(e) {
		this.useStrictIteration_ = e;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(e, t) {
		let n;
		for (n = t.length - 1; n >= 0; n--) {
			let r = t[n];
			if (r.path.length === 0 && r.op === "replace") {
				e = r.value;
				break;
			}
		}
		n > -1 && (t = t.slice(n + 1));
		let r = zo(Io).applyPatches_;
		return lo(e) ? r(e, t) : this.produce(e, (e) => r(e, t));
	}
};
function gs(e, t, n, r) {
	let [i, a] = So(t) ? zo(Fo).proxyMap_(t, n) : Co(t) ? zo(Fo).proxySet_(t, n) : os(t, n);
	return (n?.scope_ ?? Ho()).drafts_.push(i), a.callbacks_ = n?.callbacks_ ?? [], a.key_ = r, n && r !== void 0 ? ns(n, a, r) : a.callbacks_.push(function(e) {
		e.mapSetPlugin_?.fixSetContents(a);
		let { patchPlugin_: t } = e;
		a.modified_ && t && t.generatePatches_(a, [], e);
	}), i;
}
function _s(e) {
	return lo(e) || eo(10, e), vs(e);
}
function vs(e) {
	if (!uo(e) || Po(e)) return e;
	let t = e[$a], n, r = !0;
	if (t) {
		if (!t.modified_) return t.base_;
		t.finalized_ = !0, n = Ao(e, t.scope_.immer_.useStrictShallowCopy_), r = t.scope_.immer_.shouldUseStrictIteration();
	} else n = Ao(e, !0);
	return ho(n, (e, t) => {
		yo(n, e, vs(t));
	}, r), t && (t.finalized_ = !1), n;
}
globalThis.Iterator?.from;
var ys = new hs().produce, U = (e) => e;
//#endregion
//#region node_modules/redux-thunk/dist/redux-thunk.mjs
function bs(e) {
	return ({ dispatch: t, getState: n }) => (r) => (i) => typeof i == "function" ? i(t, n, e) : r(i);
}
var xs = bs(), Ss = bs, Cs = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length !== 0) return typeof arguments[0] == "object" ? Ja : Ja.apply(null, arguments);
};
typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function ws(e, t) {
	function n(...n) {
		if (t) {
			let r = t(...n);
			if (!r) throw Error(Mc(0));
			return {
				type: e,
				payload: r.payload,
				..."meta" in r && { meta: r.meta },
				..."error" in r && { error: r.error }
			};
		}
		return {
			type: e,
			payload: n[0]
		};
	}
	return n.toString = () => `${e}`, n.type = e, n.match = (t) => Xa(t) && t.type === e, n;
}
var Ts = class e extends Array {
	constructor(...t) {
		super(...t), Object.setPrototypeOf(this, e.prototype);
	}
	static get [Symbol.species]() {
		return e;
	}
	concat(...e) {
		return super.concat.apply(this, e);
	}
	prepend(...t) {
		return t.length === 1 && Array.isArray(t[0]) ? new e(...t[0].concat(this)) : new e(...t.concat(this));
	}
};
function Es(e) {
	return uo(e) ? ys(e, () => {}) : e;
}
function Ds(e, t, n) {
	return e.has(t) ? e.get(t) : e.set(t, n(t)).get(t);
}
function Os(e) {
	return typeof e == "boolean";
}
var ks = () => function(e) {
	let { thunk: t = !0, immutableCheck: n = !0, serializableCheck: r = !0, actionCreatorCheck: i = !0 } = e ?? {}, a = new Ts();
	return t && (Os(t) ? a.push(xs) : a.push(Ss(t.extraArgument))), a;
}, As = "RTK_autoBatch", W = () => (e) => ({
	payload: e,
	meta: { [As]: !0 }
}), js = (e) => (t) => {
	setTimeout(t, e);
}, Ms = (e, t) => (n) => {
	let r = !1, i = () => {
		r || (r = !0, cancelAnimationFrame(a), clearTimeout(o), n());
	}, a = e(i), o = setTimeout(i, t);
}, Ns = (e = { type: "raf" }) => (t) => (...n) => {
	let r = t(...n), i = !0, a = !1, o = !1, s = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? typeof window < "u" && window.requestAnimationFrame ? Ms(window.requestAnimationFrame, 100) : js(10) : e.type === "callback" ? e.queueNotification : js(e.timeout), l = () => {
		o = !1, a && (a = !1, s.forEach((e) => e()));
	};
	return Object.assign({}, r, {
		subscribe(e) {
			let t = r.subscribe(() => i && e());
			return s.add(e), () => {
				t(), s.delete(e);
			};
		},
		dispatch(e) {
			try {
				return i = !e?.meta?.[As], a = !i, a && (o || (o = !0, c(l))), r.dispatch(e);
			} finally {
				i = !0;
			}
		}
	});
}, Ps = (e) => function(t) {
	let { autoBatch: n = !0 } = t ?? {}, r = new Ts(e);
	return n && r.push(Ns(typeof n == "object" ? n : void 0)), r;
};
function Fs(e) {
	let t = ks(), { reducer: n = void 0, middleware: r, devTools: i = !0, duplicateMiddlewareCheck: a = !0, preloadedState: o = void 0, enhancers: s = void 0 } = e || {}, c;
	if (typeof n == "function") c = n;
	else if (Wa(n)) c = qa(n);
	else throw Error(Mc(1));
	let l;
	l = typeof r == "function" ? r(t) : t();
	let u = Ja;
	i && (u = Cs({
		trace: !1,
		...typeof i == "object" && i
	}));
	let d = Ps(Ya(...l)), f = typeof s == "function" ? s(d) : d(), p = u(...f);
	return Ga(c, o, p);
}
function Is(e) {
	let t = {}, n = [], r, i = {
		addCase(e, n) {
			let r = typeof e == "string" ? e : e.type;
			if (!r) throw Error(Mc(28));
			if (r in t) throw Error(Mc(29));
			return t[r] = n, i;
		},
		addAsyncThunk(e, r) {
			return r.pending && (t[e.pending.type] = r.pending), r.rejected && (t[e.rejected.type] = r.rejected), r.fulfilled && (t[e.fulfilled.type] = r.fulfilled), r.settled && n.push({
				matcher: e.settled,
				reducer: r.settled
			}), i;
		},
		addMatcher(e, t) {
			return n.push({
				matcher: e,
				reducer: t
			}), i;
		},
		addDefaultCase(e) {
			return r = e, i;
		}
	};
	return e(i), [
		t,
		n,
		r
	];
}
function Ls(e) {
	return typeof e == "function";
}
function Rs(e, t) {
	let [n, r, i] = Is(t), a;
	if (Ls(e)) a = () => Es(e());
	else {
		let t = Es(e);
		a = () => t;
	}
	function o(e = a(), t) {
		let o = [n[t.type], ...r.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e)];
		return o.filter((e) => !!e).length === 0 && (o = [i]), o.reduce((e, n) => {
			if (n) {
				if (lo(e)) {
					let r = n(e, t);
					return r === void 0 ? e : r;
				}
				if (uo(e)) return ys(e, (e) => n(e, t));
				{
					let r = n(e, t);
					if (r === void 0) {
						if (e === null) return e;
						throw Error("A case reducer on a non-draftable value must not return undefined");
					}
					return r;
				}
			}
			return e;
		}, e);
	}
	return o.getInitialState = a, o;
}
var zs = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Bs = (e = 21) => {
	let t = "", n = e;
	for (; n--;) t += zs[Math.random() * 64 | 0];
	return t;
}, Vs = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Hs(e, t) {
	return `${e}/${t}`;
}
function Us({ creators: e } = {}) {
	let t = e?.asyncThunk?.[Vs];
	return function(e) {
		let { name: n, reducerPath: r = n } = e;
		if (!n) throw Error(Mc(11));
		let i = (typeof e.reducers == "function" ? e.reducers(Ks()) : e.reducers) || {}, a = Object.keys(i), o = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		}, s = {
			addCase(e, t) {
				let n = typeof e == "string" ? e : e.type;
				if (!n) throw Error(Mc(12));
				if (n in o.sliceCaseReducersByType) throw Error(Mc(13));
				return o.sliceCaseReducersByType[n] = t, s;
			},
			addMatcher(e, t) {
				return o.sliceMatchers.push({
					matcher: e,
					reducer: t
				}), s;
			},
			exposeAction(e, t) {
				return o.actionCreators[e] = t, s;
			},
			exposeCaseReducer(e, t) {
				return o.sliceCaseReducersByName[e] = t, s;
			}
		};
		a.forEach((r) => {
			let a = i[r], o = {
				reducerName: r,
				type: Hs(n, r),
				createNotation: typeof e.reducers == "function"
			};
			Js(a) ? Xs(o, a, s, t) : qs(o, a, s);
		});
		function c() {
			let [t = {}, n = [], r = void 0] = typeof e.extraReducers == "function" ? Is(e.extraReducers) : [e.extraReducers], i = {
				...t,
				...o.sliceCaseReducersByType
			};
			return Rs(e.initialState, (e) => {
				for (let t in i) e.addCase(t, i[t]);
				for (let t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
				for (let t of n) e.addMatcher(t.matcher, t.reducer);
				r && e.addDefaultCase(r);
			});
		}
		let l = (e) => e, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new WeakMap(), f;
		function p(e, t) {
			return f ||= c(), f(e, t);
		}
		function m() {
			return f ||= c(), f.getInitialState();
		}
		function h(t, n = !1) {
			function r(e) {
				let i = e[t];
				return i === void 0 && n && (i = Ds(d, r, m)), i;
			}
			function i(t = l) {
				return Ds(Ds(u, n, () => /* @__PURE__ */ new WeakMap()), t, () => {
					let r = {};
					for (let [i, a] of Object.entries(e.selectors ?? {})) r[i] = Ws(a, t, () => Ds(d, t, m), n);
					return r;
				});
			}
			return {
				reducerPath: t,
				getSelectors: i,
				get selectors() {
					return i(r);
				},
				selectSlice: r
			};
		}
		let g = {
			name: n,
			reducer: p,
			actions: o.actionCreators,
			caseReducers: o.sliceCaseReducersByName,
			getInitialState: m,
			...h(r),
			injectInto(e, { reducerPath: t, ...n } = {}) {
				let i = t ?? r;
				return e.inject({
					reducerPath: i,
					reducer: p
				}, n), {
					...g,
					...h(i, !0)
				};
			}
		};
		return g;
	};
}
function Ws(e, t, n, r) {
	function i(i, ...a) {
		let o = t(i);
		return o === void 0 && r && (o = n()), e(o, ...a);
	}
	return i.unwrapped = e, i;
}
var Gs = /* @__PURE__ */ Us();
function Ks() {
	function e(e, t) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator: e,
			...t
		};
	}
	return e.withTypes = () => e, {
		reducer(e) {
			return Object.assign({ [e.name](...t) {
				return e(...t);
			} }[e.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(e, t) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare: e,
				reducer: t
			};
		},
		asyncThunk: e
	};
}
function qs({ type: e, reducerName: t, createNotation: n }, r, i) {
	let a, o;
	if ("reducer" in r) {
		if (n && !Ys(r)) throw Error(Mc(17));
		a = r.reducer, o = r.prepare;
	} else a = r;
	i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? ws(e, o) : ws(e));
}
function Js(e) {
	return e._reducerDefinitionType === "asyncThunk";
}
function Ys(e) {
	return e._reducerDefinitionType === "reducerWithPrepare";
}
function Xs({ type: e, reducerName: t }, n, r, i) {
	if (!i) throw Error(Mc(18));
	let { payloadCreator: a, fulfilled: o, pending: s, rejected: c, settled: l, options: u } = n, d = i(e, a, u);
	r.exposeAction(t, d), o && r.addCase(d.fulfilled, o), s && r.addCase(d.pending, s), c && r.addCase(d.rejected, c), l && r.addMatcher(d.settled, l), r.exposeCaseReducer(t, {
		fulfilled: o || Zs,
		pending: s || Zs,
		rejected: c || Zs,
		settled: l || Zs
	});
}
function Zs() {}
var Qs = "task", $s = "listener", ec = "completed", tc = "cancelled", nc = `task-${tc}`, rc = `task-${ec}`, ic = `${$s}-${tc}`, ac = `${$s}-${ec}`, oc = class {
	constructor(e) {
		this.code = e, this.message = `${Qs} ${tc} (reason: ${e})`;
	}
	code;
	name = "TaskAbortError";
	message;
}, sc = (e, t) => {
	if (typeof e != "function") throw TypeError(Mc(32));
}, cc = () => {}, lc = (e, t = cc) => (e.catch(t), e), uc = (e, t) => (e.addEventListener("abort", t, { once: !0 }), () => e.removeEventListener("abort", t)), dc = (e) => {
	if (e.aborted) throw new oc(e.reason);
};
function fc(e, t) {
	let n = cc;
	return new Promise((r, i) => {
		let a = () => i(new oc(e.reason));
		e.aborted ? a() : (n = uc(e, a), t.finally(() => n()).then(r, i));
	}).finally(() => {
		n = cc;
	});
}
var pc = async (e, t) => {
	try {
		return await Promise.resolve(), {
			status: "ok",
			value: await e()
		};
	} catch (e) {
		return {
			status: e instanceof oc ? "cancelled" : "rejected",
			error: e
		};
	} finally {
		t?.();
	}
}, mc = (e) => (t) => lc(fc(e, t).then((t) => (dc(e), t))), hc = (e) => {
	let t = mc(e);
	return (e) => t(new Promise((t) => setTimeout(t, e)));
}, { assign: gc } = Object, _c = {}, vc = "listenerMiddleware", yc = (e, t) => {
	let n = (t) => uc(e, () => t.abort(e.reason));
	return (r, i) => {
		sc(r, "taskExecutor");
		let a = new AbortController();
		n(a);
		let o = pc(async () => {
			dc(e), dc(a.signal);
			let t = await r({
				pause: mc(a.signal),
				delay: hc(a.signal),
				signal: a.signal
			});
			return dc(a.signal), t;
		}, () => a.abort(rc));
		return i?.autoJoin && t.push(o.catch(cc)), {
			result: mc(e)(o),
			cancel() {
				a.abort(nc);
			}
		};
	};
}, bc = (e, t) => {
	let n = async (n, r) => {
		dc(t);
		let i = () => {}, a = [new Promise((t, r) => {
			let a = e({
				predicate: n,
				effect: (e, n) => {
					n.unsubscribe(), t([
						e,
						n.getState(),
						n.getOriginalState()
					]);
				}
			});
			i = () => {
				a(), r();
			};
		})];
		r != null && a.push(new Promise((e) => setTimeout(e, r, null)));
		try {
			let e = await fc(t, Promise.race(a));
			return dc(t), e;
		} finally {
			i();
		}
	};
	return ((e, t) => lc(n(e, t)));
}, xc = (e) => {
	let { type: t, actionCreator: n, matcher: r, predicate: i, effect: a } = e;
	if (t) i = ws(t).match;
	else if (n) t = n.type, i = n.match;
	else if (r) i = r;
	else if (!i) throw Error(Mc(21));
	return sc(a, "options.listener"), {
		predicate: i,
		type: t,
		effect: a
	};
}, Sc = /* @__PURE__ */ gc((e) => {
	let { type: t, predicate: n, effect: r } = xc(e);
	return {
		id: Bs(),
		effect: r,
		type: t,
		predicate: n,
		pending: /* @__PURE__ */ new Set(),
		unsubscribe: () => {
			throw Error(Mc(22));
		}
	};
}, { withTypes: () => Sc }), Cc = (e, t) => {
	let { type: n, effect: r, predicate: i } = xc(t);
	return Array.from(e.values()).find((e) => (typeof n == "string" ? e.type === n : e.predicate === i) && e.effect === r);
}, wc = (e) => {
	e.pending.forEach((e) => {
		e.abort(ic);
	});
}, Tc = (e, t) => () => {
	for (let e of t.keys()) wc(e);
	e.clear();
}, Ec = (e, t, n) => {
	try {
		e(t, n);
	} catch (e) {
		setTimeout(() => {
			throw e;
		}, 0);
	}
}, Dc = /* @__PURE__ */ gc(/* @__PURE__ */ ws(`${vc}/add`), { withTypes: () => Dc }), Oc = /* @__PURE__ */ ws(`${vc}/removeAll`), kc = /* @__PURE__ */ gc(/* @__PURE__ */ ws(`${vc}/remove`), { withTypes: () => kc }), Ac = (...e) => {
	console.error(`${vc}/error`, ...e);
}, jc = (e = {}) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = (e) => {
		let t = n.get(e) ?? 0;
		n.set(e, t + 1);
	}, i = (e) => {
		let t = n.get(e) ?? 1;
		t === 1 ? n.delete(e) : n.set(e, t - 1);
	}, { extra: a, onError: o = Ac } = e;
	sc(o, "onError");
	let s = (e) => (e.unsubscribe = () => t.delete(e.id), t.set(e.id, e), (t) => {
		e.unsubscribe(), t?.cancelActive && wc(e);
	}), c = ((e) => {
		let n = Cc(t, e) ?? Sc(e);
		return s(n);
	});
	gc(c, { withTypes: () => c });
	let l = (e) => {
		let n = Cc(t, e);
		return n && (n.unsubscribe(), e.cancelActive && wc(n)), !!n;
	};
	gc(l, { withTypes: () => l });
	let u = async (e, n, s, l) => {
		let u = new AbortController(), d = bc(c, u.signal), f = [];
		try {
			e.pending.add(u), r(e), await Promise.resolve(e.effect(n, gc({}, s, {
				getOriginalState: l,
				condition: (e, t) => d(e, t).then(Boolean),
				take: d,
				delay: hc(u.signal),
				pause: mc(u.signal),
				extra: a,
				signal: u.signal,
				fork: yc(u.signal, f),
				unsubscribe: e.unsubscribe,
				subscribe: () => {
					t.set(e.id, e);
				},
				cancelActiveListeners: () => {
					e.pending.forEach((e, t, n) => {
						e !== u && (e.abort(ic), n.delete(e));
					});
				},
				cancel: () => {
					u.abort(ic), e.pending.delete(u);
				},
				throwIfCancelled: () => {
					dc(u.signal);
				}
			})));
		} catch (e) {
			e instanceof oc || Ec(o, e, { raisedBy: "effect" });
		} finally {
			await Promise.all(f), u.abort(ac), i(e), e.pending.delete(u);
		}
	}, d = Tc(t, n);
	return {
		middleware: (e) => (n) => (r) => {
			if (!Xa(r)) return n(r);
			if (Dc.match(r)) return c(r.payload);
			if (Oc.match(r)) {
				d();
				return;
			}
			if (kc.match(r)) return l(r.payload);
			let i = e.getState(), a = () => {
				if (i === _c) throw Error(Mc(23));
				return i;
			}, s;
			try {
				if (s = n(r), t.size > 0) {
					let n = e.getState(), s = Array.from(t.values());
					for (let t of s) {
						let s = !1;
						try {
							s = t.predicate(r, n, i);
						} catch (e) {
							s = !1, Ec(o, e, { raisedBy: "predicate" });
						}
						s && u(t, r, e, a);
					}
				}
			} finally {
				i = _c;
			}
			return s;
		},
		startListening: c,
		stopListening: l,
		clearListeners: d
	};
};
function Mc(e) {
	return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
//#region node_modules/recharts/es6/state/layoutSlice.js
var Nc = Gs({
	name: "chartLayout",
	initialState: {
		layoutType: "horizontal",
		width: 0,
		height: 0,
		margin: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
		scale: 1
	},
	reducers: {
		setLayout(e, t) {
			e.layoutType = t.payload;
		},
		setChartSize(e, t) {
			e.width = t.payload.width, e.height = t.payload.height;
		},
		setMargin(e, t) {
			e.margin.top = t.payload.top ?? 0, e.margin.right = t.payload.right ?? 0, e.margin.bottom = t.payload.bottom ?? 0, e.margin.left = t.payload.left ?? 0;
		},
		setScale(e, t) {
			e.scale = t.payload;
		}
	}
}), Pc = Nc.actions, Fc = Pc.setMargin, Ic = Pc.setLayout, Lc = Pc.setChartSize, Rc = Pc.setScale, zc = Nc.reducer;
//#endregion
//#region node_modules/recharts/es6/util/getSliced.js
function Bc(e, t, n) {
	return Array.isArray(e) && e && t + n !== 0 ? e.slice(t, n + 1) : e;
}
//#endregion
//#region node_modules/recharts/es6/util/isWellBehavedNumber.js
function G(e) {
	return Number.isFinite(e);
}
function Vc(e) {
	return typeof e == "number" && e > 0 && Number.isFinite(e);
}
//#endregion
//#region node_modules/recharts/es6/util/ChartUtils.js
function Hc(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Uc(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hc(Object(n), !0).forEach(function(t) {
			Wc(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hc(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wc(e, t, n) {
	return (t = Gc(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Gc(e) {
	var t = Kc(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Kc(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function K(e, t, n) {
	return R(e) || R(t) ? n : _t(t) ? lt(e, t, n) : typeof t == "function" ? t(e) : n;
}
var qc = (e, t, n) => {
	if (t && n) {
		var r = n.width, i = n.height, a = t.align, o = t.verticalAlign, s = t.layout, c = t.position, l = t.offset, u = l === void 0 ? 0 : l;
		if (c != null) {
			if (Pt(c)) {
				if (c === "top" && I(e.top)) return Uc(Uc({}, e), {}, { top: e.top + (i || 0) + u });
				if (c === "bottom" && I(e.bottom)) return Uc(Uc({}, e), {}, { bottom: e.bottom + (i || 0) + u });
				if (c === "left" && I(e.left)) return Uc(Uc({}, e), {}, { left: e.left + (r || 0) + u });
				if (c === "right" && I(e.right)) return Uc(Uc({}, e), {}, { right: e.right + (r || 0) + u });
			}
			return e;
		}
		if ((s === "vertical" || s === "horizontal" && o === "middle") && a !== "center" && I(e[a])) return Uc(Uc({}, e), {}, { [a]: e[a] + (r || 0) });
		if ((s === "horizontal" || s === "vertical" && a === "center") && o !== "middle" && I(e[o])) return Uc(Uc({}, e), {}, { [o]: e[o] + (i || 0) });
	}
	return e;
}, Jc = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", Yc = (e, t, n, r) => {
	if (r) return e.map((e) => e.coordinate);
	var i, a, o = e.map((e) => (e.coordinate === t && (i = !0), e.coordinate === n && (a = !0), e.coordinate));
	return i || o.push(t), a || o.push(n), o;
}, Xc = (e, t, n) => {
	if (!e) return null;
	var r = e.duplicateDomain, i = e.type, a = e.range, o = e.scale, s = e.realScaleType, c = e.isCategorical, l = e.categoricalDomain, u = e.tickCount, d = e.ticks, f = e.niceTicks, p = e.axisType;
	if (!o) return null;
	var m = s === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, h = (t || n) && i === "category" && o.bandwidth ? o.bandwidth() / m : 0;
	return h = p === "angleAxis" && a && a.length >= 2 ? mt(a[0] - a[1]) * 2 * h : h, t && (d || f) ? (d || f || []).map((e, t) => {
		var n = r ? r.indexOf(e) : e, i = o.map(n);
		return G(i) ? {
			coordinate: i + h,
			value: e,
			offset: h,
			index: t
		} : null;
	}).filter(wt) : c && l ? l.map((e, t) => {
		var n = o.map(e);
		return G(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(wt) : o.ticks && !n && u != null ? o.ticks(u).map((e, t) => {
		var n = o.map(e);
		return G(n) ? {
			coordinate: n + h,
			value: e,
			index: t,
			offset: h
		} : null;
	}).filter(wt) : o.domain().map((e, t) => {
		var n = o.map(e);
		return G(n) ? {
			coordinate: n + h,
			value: r ? r[e] : e,
			index: t,
			offset: h
		} : null;
	}).filter(wt);
}, Zc = (e, t) => {
	if (!t || t.length !== 2 || !I(t[0]) || !I(t[1])) return e;
	var n = Math.min(t[0], t[1]), r = Math.max(t[0], t[1]), i = [e[0], e[1]];
	return (!I(e[0]) || e[0] < n) && (i[0] = n), (!I(e[1]) || e[1] > r) && (i[1] = r), i[0] > r && (i[0] = r), i[1] < n && (i[1] = n), i;
}, Qc = {
	sign: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0, o = 0; o < t; ++o) {
				var s = e[o]?.[r];
				if (s != null) {
					var c = s[1], l = s[0], u = ht(c) ? l : c;
					u >= 0 ? (s[0] = i, i += u, s[1] = i) : (s[0] = a, a += u, s[1] = a);
				}
			}
		}
	},
	expand: rr,
	none: Qn,
	silhouette: ir,
	wiggle: ar,
	positive: (e) => {
		var t = e.length;
		if (!(t <= 0)) {
			var n = e[0]?.length;
			if (!(n == null || n <= 0)) for (var r = 0; r < n; ++r) for (var i = 0, a = 0; a < t; ++a) {
				var o = e[a]?.[r];
				if (o != null) {
					var s = ht(o[1]) ? o[0] : o[1];
					s >= 0 ? (o[0] = i, i += s, o[1] = i) : (o[0] = 0, o[1] = 0);
				}
			}
		}
	}
}, $c = (e, t, n) => {
	var r = Qc[n] ?? Qn, i = nr().keys(t).value((e, t) => Number(K(e, t, 0))).order($n).offset(r)(e);
	return i.forEach((n, r) => {
		n.forEach((n, i) => {
			var a = K(e[i], t[r], 0);
			Array.isArray(a) && a.length === 2 && I(a[0]) && I(a[1]) && (n[0] = a[0], n[1] = a[1]);
		});
	}), i;
};
function el(e) {
	return e == null ? void 0 : String(e);
}
function tl(e) {
	var t = e.axis, n = e.ticks, r = e.bandSize, i = e.entry, a = e.index, o = e.dataKey;
	if (t.type === "category") {
		if (!t.allowDuplicatedCategory && t.dataKey && !R(i[t.dataKey])) {
			var s = St(n, "value", i[t.dataKey]);
			if (s) return s.coordinate + r / 2;
		}
		return n != null && n[a] ? n[a].coordinate + r / 2 : null;
	}
	var c = K(i, R(o) ? t.dataKey : o), l = t.scale.map(c);
	return I(l) ? l : null;
}
var nl = (e) => {
	var t = e.axis, n = e.ticks, r = e.offset, i = e.bandSize, a = e.entry, o = e.index;
	if (t.type === "category") return n[o] ? n[o].coordinate + r : null;
	var s = K(a, t.dataKey, t.scale.domain()[o]);
	if (R(s)) return null;
	var c = t.scale.map(s);
	return I(c) ? c - i / 2 + r : null;
}, rl = (e) => {
	var t = e.numericAxis, n = t.scale.domain();
	if (t.type === "number") {
		var r = Math.min(n[0], n[1]), i = Math.max(n[0], n[1]);
		return r <= 0 && i >= 0 ? 0 : i < 0 ? i : r;
	}
	return n[0];
}, il = (e) => {
	var t = e.flat(2).filter(I);
	return [Math.min(...t), Math.max(...t)];
}, al = (e) => [e[0] === Infinity ? 0 : e[0], e[1] === -Infinity ? 0 : e[1]], ol = (e, t, n) => {
	if (e != null && Object.keys(e).length !== 0) return al(Object.keys(e).reduce((r, i) => {
		var a = e[i];
		if (!a) return r;
		var o = a.stackedData.reduce((e, r) => {
			var i = il(Bc(r, t, n));
			return !G(i[0]) || !G(i[1]) ? e : [Math.min(e[0], i[0]), Math.max(e[1], i[1])];
		}, [Infinity, -Infinity]);
		return [Math.min(o[0], r[0]), Math.max(o[1], r[1])];
	}, [Infinity, -Infinity]));
}, sl = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, cl = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, ll = (e, t, n) => {
	if (e && e.scale && e.scale.bandwidth) {
		var r = e.scale.bandwidth();
		if (!n || r > 0) return r;
	}
	if (e && t && t.length >= 2) {
		for (var i = Ta(t, (e) => e.coordinate), a = [], o = 0, s = 1, c = i.length; s < c; s++) {
			var l = (i[s]?.coordinate || 0) - (i[s - 1]?.coordinate || 0);
			a.push(l), o = Math.max(l, o);
		}
		var u = o * 1e-4, d = Infinity;
		for (var f of a) f > u && (d = Math.min(f, d));
		return d === Infinity ? 0 : d;
	}
	return n ? void 0 : 0;
};
function ul(e) {
	var t = e.tooltipEntrySettings, n = e.dataKey, r = e.payload, i = e.value, a = e.name;
	return Uc(Uc({}, t), {}, {
		dataKey: n,
		payload: r,
		value: i,
		name: a
	});
}
function dl(e, t) {
	if (e != null) return String(e);
	if (typeof t == "string") return t;
}
var fl = (e, t) => {
	if (t === "horizontal") return e.relativeX;
	if (t === "vertical") return e.relativeY;
}, pl = (e, t) => t === "centric" ? e.angle : e.radius, ml = (e) => e.layout.width, hl = (e) => e.layout.height, gl = (e) => e.layout.scale, _l = (e) => e.layout.margin, vl = H((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), yl = H((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), bl = "data-recharts-item-index";
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectChartOffsetInternal.js
function xl(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Sl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? xl(Object(n), !0).forEach(function(t) {
			Cl(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xl(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Cl(e, t, n) {
	return (t = wl(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wl(e) {
	var t = Tl(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Tl(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var El = (e) => e.brush.height;
function Dl(e) {
	return yl(e).reduce((e, t) => t.orientation === "left" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function Ol(e) {
	return yl(e).reduce((e, t) => t.orientation === "right" && !t.mirror && !t.hide ? e + (typeof t.width == "number" ? t.width : 60) : e, 0);
}
function kl(e) {
	return vl(e).reduce((e, t) => t.orientation === "top" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
function Al(e) {
	return vl(e).reduce((e, t) => t.orientation === "bottom" && !t.mirror && !t.hide ? e + (typeof t.height == "number" ? t.height : 30) : e, 0);
}
var jl = H([
	ml,
	hl,
	_l,
	El,
	Dl,
	Ol,
	kl,
	Al,
	Ea,
	Da
], (e, t, n, r, i, a, o, s, c, l) => {
	var u = {
		left: (n.left || 0) + i,
		right: (n.right || 0) + a
	}, d = Sl(Sl({}, {
		top: (n.top || 0) + o,
		bottom: (n.bottom || 0) + s
	}), u), f = d.bottom;
	d.bottom += r, d = qc(d, c, l);
	var p = e - d.left - d.right, m = t - d.top - d.bottom;
	return Sl(Sl({ brushBottom: f }, d), {}, {
		width: Math.max(p, 0),
		height: Math.max(m, 0)
	});
}), Ml = H(jl, (e) => ({
	x: e.left,
	y: e.top,
	width: e.width,
	height: e.height
})), Nl = H(ml, hl, (e, t) => ({
	x: 0,
	y: 0,
	width: e,
	height: t
})), Pl = /*#__PURE__*/ (0, P.createContext)(null), Fl = () => (0, P.useContext)(Pl) != null, Il = (e) => e.brush, Ll = H([
	Il,
	jl,
	_l
], (e, t, n) => ({
	height: e.height,
	x: I(e.x) ? e.x : t.left,
	y: I(e.y) ? e.y : t.top + t.height + t.brushBottom - (n?.bottom || 0),
	width: I(e.width) ? e.width : t.width
}));
//#endregion
//#region node_modules/es-toolkit/dist/function/debounce.mjs
function Rl(e, t, { signal: n, edges: r } = {}) {
	let i, a = null, o = r != null && r.includes("leading"), s = r == null || r.includes("trailing"), c = () => {
		a !== null && (e.apply(i, a), i = void 0, a = null);
	}, l = () => {
		s && c(), p();
	}, u = null, d = () => {
		u != null && clearTimeout(u), u = setTimeout(() => {
			u = null, l();
		}, t);
	}, f = () => {
		u !== null && (clearTimeout(u), u = null);
	}, p = () => {
		f(), i = void 0, a = null;
	}, m = () => {
		c();
	}, h = function(...e) {
		if (n?.aborted) return;
		i = this, a = e;
		let t = u == null;
		d(), o && t && c();
	};
	return h.schedule = d, h.cancel = p, h.flush = m, n?.addEventListener("abort", p, { once: !0 }), h;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/function/debounce.mjs
function zl(e, t = 0, n = {}) {
	typeof n != "object" && (n = {});
	let { leading: r = !1, trailing: i = !0, maxWait: a } = n, o = [, ,];
	r && (o[0] = "leading"), i && (o[1] = "trailing");
	let s, c = null, l = Rl(function(...t) {
		s = e.apply(this, t), c = null;
	}, t, { edges: o }), u = function(...t) {
		return a != null && (c === null && (c = Date.now()), Date.now() - c >= a) ? ((r || i) && (s = e.apply(this, t)), c = Date.now(), l.cancel(), l.schedule(), s) : (l.apply(this, t), s);
	};
	return u.cancel = l.cancel, u.flush = () => (l.flush(), s), u;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/function/throttle.mjs
function Bl(e, t = 0, n = {}) {
	let { leading: r = !0, trailing: i = !0 } = n;
	return zl(e, t, {
		leading: r,
		maxWait: t,
		trailing: i
	});
}
//#endregion
//#region node_modules/recharts/es6/util/LogUtils.js
var Vl = function(e, t) {
	var n = [...arguments].slice(2);
	if (typeof console < "u" && console.warn && (t === void 0 && console.warn("LogUtils requires an error message argument"), !e)) {
		if (t === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var r = 0;
			console.warn(t.replace(/%s/g, () => n[r++]));
		}
	}
}, Hl = {
	width: "100%",
	height: "100%",
	debounce: 0,
	minWidth: 0,
	initialDimension: {
		width: -1,
		height: -1
	}
}, Ul = (e, t, n) => {
	var r = n.width, i = r === void 0 ? Hl.width : r, a = n.height, o = a === void 0 ? Hl.height : a, s = n.aspect, c = n.maxHeight, l = gt(i) ? e : Number(i), u = gt(o) ? t : Number(o);
	return s && s > 0 && (l ? u = l / s : u && (l = u * s), c && u != null && u > c && (u = c)), {
		calculatedWidth: l,
		calculatedHeight: u
	};
}, Wl = {
	width: 0,
	height: 0,
	overflow: "visible"
}, Gl = {
	width: 0,
	overflowX: "visible"
}, Kl = {
	height: 0,
	overflowY: "visible"
}, ql = {}, Jl = (e) => {
	var t = e.width, n = e.height, r = gt(t), i = gt(n);
	return r && i ? Wl : r ? Gl : i ? Kl : ql;
};
function Yl(e) {
	var t = e.width, n = e.height, r = e.aspect, i = t, a = n;
	return i === void 0 && a === void 0 ? (i = Hl.width, a = Hl.height) : i === void 0 ? i = r && r > 0 ? void 0 : Hl.width : a === void 0 && (a = r && r > 0 ? void 0 : Hl.height), {
		width: i,
		height: a
	};
}
//#endregion
//#region node_modules/recharts/es6/component/ResponsiveContainer.js
var Xl = [
	"aspect",
	"initialDimension",
	"width",
	"height",
	"minWidth",
	"minHeight",
	"maxHeight",
	"children",
	"debounce",
	"id",
	"className",
	"onResize",
	"style"
];
function Zl() {
	return Zl = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Zl.apply(null, arguments);
}
function Ql(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function $l(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ql(Object(n), !0).forEach(function(t) {
			eu(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ql(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function eu(e, t, n) {
	return (t = tu(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function tu(e) {
	var t = nu(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function nu(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ru(e, t) {
	return cu(e) || su(e, t) || au(e, t) || iu();
}
function iu() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function au(e, t) {
	if (e) {
		if (typeof e == "string") return ou(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ou(e, t) : void 0;
	}
}
function ou(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function su(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function cu(e) {
	if (Array.isArray(e)) return e;
}
function lu(e, t) {
	if (e == null) return {};
	var n, r, i = uu(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function uu(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var du = /*#__PURE__*/ (0, P.createContext)(Hl.initialDimension);
function fu(e) {
	return Vc(e.width) && Vc(e.height);
}
function pu(e) {
	var t = e.children, n = e.width, r = e.height, i = (0, P.useMemo)(() => ({
		width: n,
		height: r
	}), [n, r]);
	return fu(i) ? /*#__PURE__*/ P.createElement(du.Provider, { value: i }, t) : null;
}
var mu = () => (0, P.useContext)(du), hu = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.aspect, r = e.initialDimension, i = r === void 0 ? Hl.initialDimension : r, a = e.width, o = e.height, s = e.minWidth, c = s === void 0 ? Hl.minWidth : s, u = e.minHeight, d = e.maxHeight, f = e.children, p = e.debounce, m = p === void 0 ? Hl.debounce : p, h = e.id, g = e.className, _ = e.onResize, v = e.style, y = v === void 0 ? {} : v, b = lu(e, Xl), x = (0, P.useRef)(null), S = (0, P.useRef)();
	S.current = _, (0, P.useImperativeHandle)(t, () => x.current);
	var C = ru((0, P.useState)({
		containerWidth: i.width,
		containerHeight: i.height
	}), 2), w = C[0], T = C[1], E = (0, P.useCallback)((e, t) => {
		T((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []);
	(0, P.useEffect)(() => {
		if (x.current == null || typeof ResizeObserver > "u") return Tt;
		var e = (e) => {
			var t, n = e[0];
			if (n != null) {
				var r = n.contentRect, i = r.width, a = r.height;
				E(i, a), (t = S.current) == null || t.call(S, i, a);
			}
		};
		m > 0 && (e = Bl(e, m, {
			trailing: !0,
			leading: !1
		}));
		var t = new ResizeObserver(e), n = x.current.getBoundingClientRect(), r = n.width, i = n.height;
		return E(r, i), t.observe(x.current), () => {
			t.disconnect();
		};
	}, [E, m]);
	var D = w.containerWidth, O = w.containerHeight;
	Vl(!n || n > 0, "The aspect(%s) must be greater than zero.", n);
	var k = Ul(D, O, {
		width: a,
		height: o,
		aspect: n,
		maxHeight: d
	}), A = k.calculatedWidth, j = k.calculatedHeight;
	return Vl(D < 0 || O < 0 || A != null && A > 0 || j != null && j > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", A, j, a, o, c, u, n), /*#__PURE__*/ P.createElement("div", Zl({
		id: h ? `${h}` : void 0,
		className: l("recharts-responsive-container", g),
		style: $l($l({}, y), {}, {
			width: a,
			height: o,
			minWidth: c,
			minHeight: u,
			maxHeight: d
		}),
		ref: x
	}, b), /*#__PURE__*/ P.createElement("div", { style: Jl({
		width: a,
		height: o
	}) }, /*#__PURE__*/ P.createElement(pu, {
		width: A,
		height: j
	}, f)));
}), gu = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = mu();
	if (Vc(n.width) && Vc(n.height)) return e.children;
	var r = Yl({
		width: e.width,
		height: e.height,
		aspect: e.aspect
	}), i = r.width, a = r.height, o = Ul(void 0, void 0, {
		width: i,
		height: a,
		aspect: e.aspect,
		maxHeight: e.maxHeight
	}), s = o.calculatedWidth, c = o.calculatedHeight;
	return I(s) && I(c) ? /*#__PURE__*/ P.createElement(pu, {
		width: s,
		height: c
	}, e.children) : /*#__PURE__*/ P.createElement(hu, Zl({}, e, {
		width: i,
		height: a,
		ref: t
	}));
}), _u = () => {
	var e = Fl(), t = V(Ml), n = V(Ll), r = V(Il)?.padding;
	return !e || !n || !r ? t : {
		width: n.width - r.left - r.right,
		height: n.height - r.top - r.bottom,
		x: r.left,
		y: r.top
	};
}, vu = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	brushBottom: 0
}, yu = () => V(jl) ?? vu, bu = () => V(ml), xu = () => V(hl), Su = () => V((e) => e.layout.margin), q = (e) => e.layout.layoutType, Cu = () => V(q), wu = () => {
	var e = Cu();
	if (e === "horizontal" || e === "vertical") return e;
}, Tu = (e) => {
	var t = e.layout.layoutType;
	if (t === "centric" || t === "radial") return t;
}, Eu = () => V(Tu), Du = () => Cu() !== void 0, Ou = (e) => {
	var t = B(), n = Fl(), r = e.width, i = e.height, a = mu(), o = r, s = i;
	return a && (o = a.width > 0 ? a.width : r, s = a.height > 0 ? a.height : i), (0, P.useEffect)(() => {
		!n && Vc(o) && Vc(s) && t(Lc({
			width: o,
			height: s
		}));
	}, [
		t,
		n,
		o,
		s
	]), null;
}, ku = Gs({
	name: "legend",
	initialState: {
		settings: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "bottom",
			itemSorter: "value",
			position: void 0,
			offset: 0
		},
		size: {
			width: 0,
			height: 0
		},
		payload: []
	},
	reducers: {
		setLegendSize(e, t) {
			e.size.width = t.payload.width, e.size.height = t.payload.height;
		},
		setLegendSettings(e, t) {
			e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter, e.settings.position = t.payload.position, e.settings.offset = t.payload.offset;
		},
		addLegendPayload: {
			reducer(e, t) {
				e.payload.push(U(t.payload));
			},
			prepare: W()
		},
		replaceLegendPayload: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).payload.indexOf(U(r));
				a > -1 && (e.payload[a] = U(i));
			},
			prepare: W()
		},
		removeLegendPayload: {
			reducer(e, t) {
				var n = _s(e).payload.indexOf(U(t.payload));
				n > -1 && e.payload.splice(n, 1);
			},
			prepare: W()
		}
	}
}), Au = ku.actions, ju = Au.setLegendSize, Mu = Au.setLegendSettings, Nu = Au.addLegendPayload, Pu = Au.replaceLegendPayload, Fu = Au.removeLegendPayload, Iu = ku.reducer, Lu = /* @__PURE__ */ n(((e) => {
	var t = x();
	t.useSyncExternalStore, t.useRef, t.useEffect, t.useMemo, t.useDebugValue;
}));
(/* @__PURE__ */ n(((e, t) => {
	t.exports = Lu();
})))();
function Ru(e) {
	e();
}
function zu() {
	let e = null, t = null;
	return {
		clear() {
			e = null, t = null;
		},
		notify() {
			Ru(() => {
				let t = e;
				for (; t;) t.callback(), t = t.next;
			});
		},
		get() {
			let t = [], n = e;
			for (; n;) t.push(n), n = n.next;
			return t;
		},
		subscribe(n) {
			let r = !0, i = t = {
				callback: n,
				next: null,
				prev: t
			};
			return i.prev ? i.prev.next = i : e = i, function() {
				r && e !== null && (r = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
			};
		}
	};
}
var Bu = {
	notify() {},
	get: () => []
};
function Vu(e, t) {
	let n, r = Bu, i = 0, a = !1;
	function o(e) {
		u();
		let t = r.subscribe(e), n = !1;
		return () => {
			n || (n = !0, t(), d());
		};
	}
	function s() {
		r.notify();
	}
	function c() {
		m.onStateChange && m.onStateChange();
	}
	function l() {
		return a;
	}
	function u() {
		i++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = zu());
	}
	function d() {
		i--, n && i === 0 && (n(), n = void 0, r.clear(), r = Bu);
	}
	function f() {
		a || (a = !0, u());
	}
	function p() {
		a && (a = !1, d());
	}
	let m = {
		addNestedSub: o,
		notifyNestedSubs: s,
		handleChangeWrapper: c,
		isSubscribed: l,
		trySubscribe: f,
		tryUnsubscribe: p,
		getListeners: () => r
	};
	return m;
}
var Hu = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Uu = typeof navigator < "u" && navigator.product === "ReactNative", Wu = Hu || Uu ? P.useLayoutEffect : P.useEffect;
function Gu(e, t) {
	return e === t ? e !== 0 || t !== 0 || 1 / e == 1 / t : e !== e && t !== t;
}
function Ku(e, t) {
	if (Gu(e, t)) return !0;
	if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
	let n = Object.keys(e), r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (let r = 0; r < n.length; r++) if (!Object.prototype.hasOwnProperty.call(t, n[r]) || !Gu(e[n[r]], t[n[r]])) return !1;
	return !0;
}
var qu = /* @__PURE__ */ Symbol.for("react-redux-context"), Ju = typeof globalThis < "u" ? globalThis : {};
function Yu() {
	if (!P.createContext) return {};
	let e = Ju[qu] ??= /* @__PURE__ */ new Map(), t = e.get(P.createContext);
	return t || (t = P.createContext(null), e.set(P.createContext, t)), t;
}
var Xu = /* @__PURE__ */ Yu();
function Zu(e) {
	let { children: t, context: n, serverState: r, store: i } = e, a = P.useMemo(() => {
		let e = Vu(i);
		return {
			store: i,
			subscription: e,
			getServerState: r ? () => r : void 0
		};
	}, [i, r]), o = P.useMemo(() => i.getState(), [i]);
	Wu(() => {
		let { subscription: e } = a;
		return e.onStateChange = e.notifyNestedSubs, e.trySubscribe(), o !== i.getState() && e.notifyNestedSubs(), () => {
			e.tryUnsubscribe(), e.onStateChange = void 0;
		};
	}, [a, o]);
	let s = n || Xu;
	return /* @__PURE__ */ P.createElement(s.Provider, { value: a }, t);
}
var Qu = Zu, $u = /* @__PURE__ */ new Set([
	"axisLine",
	"tickLine",
	"activeBar",
	"activeDot",
	"activeLabel",
	"activeShape",
	"allowEscapeViewBox",
	"background",
	"cursor",
	"dot",
	"label",
	"line",
	"margin",
	"padding",
	"position",
	"shape",
	"style",
	"tick",
	"wrapperStyle",
	"radius",
	"throttledEvents"
]);
function ed(e, t) {
	return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function td(e, t) {
	for (var n of /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)])) if ($u.has(n)) {
		if (e[n] == null && t[n] == null) continue;
		if (!Ku(e[n], t[n])) return !1;
	} else if (!ed(e[n], t[n])) return !1;
	return !0;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectLegendArea.js
var nd = H([
	ml,
	hl,
	_l
], (e, t, n) => ({
	x: n.left || 0,
	y: n.top || 0,
	width: Math.max(e - (n.left || 0) - (n.right || 0), 0),
	height: Math.max(t - (n.top || 0) - (n.bottom || 0), 0)
}));
//#endregion
//#region node_modules/recharts/es6/cartesian/cartesianPositionToCSSTranslate.js
function rd(e, t) {
	return e === "start" && t === "start" ? "" : `translate(${e === "inherit" ? "0" : {
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[e]}, ${{
		start: "0",
		middle: "-50%",
		end: "-100%"
	}[t] ?? "0"})`;
}
//#endregion
//#region node_modules/recharts/es6/component/Legend.js
var id = ["contextPayload"];
function ad() {
	return ad = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ad.apply(null, arguments);
}
function od(e, t) {
	return dd(e) || ud(e, t) || cd(e, t) || sd();
}
function sd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function cd(e, t) {
	if (e) {
		if (typeof e == "string") return ld(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ld(e, t) : void 0;
	}
}
function ld(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ud(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function dd(e) {
	if (Array.isArray(e)) return e;
}
function fd(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fd(Object(n), !0).forEach(function(t) {
			md(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fd(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function md(e, t, n) {
	return (t = hd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function hd(e) {
	var t = gd(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gd(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _d(e, t) {
	if (e == null) return {};
	var n, r, i = vd(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function vd(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function yd(e) {
	return e.value;
}
function bd(e) {
	var t = e.contextPayload, n = _d(e, id), r = Qi(t, e.payloadUniqBy, yd), i = pd(pd({}, n), {}, { payload: r });
	return /*#__PURE__*/ P.isValidElement(e.content) ? /*#__PURE__*/ P.cloneElement(e.content, i) : typeof e.content == "function" ? /*#__PURE__*/ P.createElement(e.content, i) : /*#__PURE__*/ P.createElement(Hr, i);
}
function xd(e) {
	return e === "left" || e === "right" || e === "insideLeft" || e === "insideRight" ? "vertical" : "horizontal";
}
function Sd(e, t) {
	return t == null ? null : Pt(t) ? nd(e) : Ml(e);
}
function Cd(e, t, n) {
	return e === "top" ? { top: n.height + t } : e === "bottom" ? { top: -n.height - t } : e === "left" ? { left: n.width + t } : e === "right" ? { left: -n.width - t } : {};
}
function wd(e, t, n, r, i, a) {
	var o = t.layout, s = t.align, c = t.verticalAlign, l, u;
	return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (l = s === "center" && o === "vertical" ? { left: ((r || 0) - a.width) / 2 } : s === "right" ? { right: n && n.right || 0 } : { left: n && n.left || 0 }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (u = c === "middle" ? { top: ((i || 0) - a.height) / 2 } : c === "bottom" ? { bottom: n && n.bottom || 0 } : { top: n && n.top || 0 }), pd(pd({}, l), u);
}
function Td(e) {
	var t = e.align, n = e.layout, r = e.verticalAlign, i = e.itemSorter, a = e.position, o = e.offset, s = B();
	return (0, P.useLayoutEffect)(() => {
		s(Mu({
			align: t,
			layout: n,
			verticalAlign: r,
			itemSorter: i,
			position: a,
			offset: o
		}));
	}, [
		s,
		t,
		n,
		r,
		i,
		a,
		o
	]), null;
}
function Ed(e) {
	var t = e.width, n = e.height, r = B();
	return (0, P.useLayoutEffect)(() => {
		r(ju({
			width: t,
			height: n
		}));
	}, [
		r,
		t,
		n
	]), (0, P.useLayoutEffect)(() => () => {
		r(ju({
			width: 0,
			height: 0
		}));
	}, [r]), null;
}
function Dd(e, t, n, r) {
	return e === "vertical" && t != null ? { height: t } : e === "horizontal" ? { width: n || r } : null;
}
var Od = {
	align: "center",
	iconSize: 14,
	inactiveColor: "#ccc",
	itemSorter: "value",
	labelStyle: {},
	layout: "auto",
	verticalAlign: "bottom",
	offset: 0
};
function kd(e) {
	var t = Ar(e, Od), n = e.layout && e.layout !== "auto" ? e.layout : xd(t.position), r = ka(), i = It(), a = Su(), o = V((e) => Sd(e, t.position)), s = t.width, c = t.height, l = t.wrapperStyle, u = t.portal, d = u == null && (t.position == null || Pt(t.position)), f = od(za([r]), 2), p = f[0], m = f[1], h = bu(), g = xu();
	if (h == null || g == null || t.position != null && o == null) return null;
	var _ = Dd(n, c, s, h - (a?.left || 0) - (a?.right || 0)), v = t.position == null ? null : Mt({
		viewBox: o ?? {
			x: 0,
			y: 0,
			width: h,
			height: g
		},
		position: t.position,
		offset: t.offset ?? 0
	}), y = Cd(t.position, t.offset ?? 0, p), b = n === "vertical" ? (o?.width ?? 0) / 2 : o?.width ?? 0, x = n === "horizontal" ? (o?.height ?? 0) / 2 : o?.height ?? 0, S = v ? {
		width: "max-content",
		height: "max-content",
		maxWidth: b,
		maxHeight: x,
		overflowY: "auto",
		top: v.y + (y.top ?? 0),
		left: v.x + (y.left ?? 0),
		transform: rd(v.horizontalAnchor, v.verticalAnchor)
	} : wd(l, t, a, h, g, p), C = u ? l : pd(pd({
		position: "absolute",
		width: _?.width || s || "auto",
		height: _?.height || c || "auto"
	}, S), l), w = u ?? i;
	if (w == null || r == null) return null;
	var T = /*#__PURE__*/ P.createElement("div", {
		className: "recharts-legend-wrapper",
		style: C,
		ref: m
	}, /*#__PURE__*/ P.createElement(Td, {
		layout: n,
		align: t.align,
		verticalAlign: t.verticalAlign,
		itemSorter: t.itemSorter,
		position: t.position,
		offset: t.offset
	}), d && /*#__PURE__*/ P.createElement(Ed, p), /*#__PURE__*/ P.createElement(bd, ad({}, t, { layout: n }, _, {
		margin: a,
		chartWidth: h,
		chartHeight: g,
		contextPayload: r
	})));
	return /*#__PURE__*/ (0, Fe.createPortal)(T, w);
}
var Ad = /*#__PURE__*/ P.memo(kd, td);
Ad.displayName = "Legend";
//#endregion
//#region node_modules/recharts/es6/component/DefaultTooltipContent.js
function jd() {
	return jd = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jd.apply(null, arguments);
}
function Md(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Nd(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Md(Object(n), !0).forEach(function(t) {
			Pd(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Md(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Pd(e, t, n) {
	return (t = Fd(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Fd(e) {
	var t = Id(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Id(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ld(e, t) {
	return Hd(e) || Vd(e, t) || zd(e, t) || Rd();
}
function Rd() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function zd(e, t) {
	if (e) {
		if (typeof e == "string") return Bd(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Bd(e, t) : void 0;
	}
}
function Bd(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Vd(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Hd(e) {
	if (Array.isArray(e)) return e;
}
function Ud(e) {
	return Array.isArray(e) && _t(e[0]) && _t(e[1]) ? e.join(" ~ ") : e;
}
var Wd = {
	separator: " : ",
	contentStyle: {
		margin: 0,
		padding: 10,
		backgroundColor: "#fff",
		border: "1px solid #ccc",
		whiteSpace: "nowrap"
	},
	itemStyle: {
		display: "block",
		paddingTop: 4,
		paddingBottom: 4,
		color: "#000"
	},
	labelStyle: {},
	accessibilityLayer: !1
};
function Gd(e, t) {
	return t == null ? e : Ta(e, t);
}
var Kd = (e) => {
	var t = e.separator, n = t === void 0 ? Wd.separator : t, r = e.contentStyle, i = e.itemStyle, a = e.labelStyle, o = a === void 0 ? Wd.labelStyle : a, s = e.payload, c = e.formatter, u = e.itemSorter, d = e.wrapperClassName, f = e.labelClassName, p = e.label, m = e.labelFormatter, h = e.accessibilityLayer, g = h === void 0 ? Wd.accessibilityLayer : h, _ = () => {
		if (s && s.length) {
			var e = {
				padding: 0,
				margin: 0
			}, t = Gd(s, u).map((e, t) => {
				if (!e || e.type === "none") return null;
				var r = e.formatter || c || Ud, a = e.value, o = e.name, l = a, u = o;
				if (r) {
					var d = r(a, o, e, t, s);
					if (Array.isArray(d)) {
						var f = Ld(d, 2);
						l = f[0], u = f[1];
					} else if (d != null) l = d;
					else return null;
				}
				var p = Nd(Nd({}, Wd.itemStyle), {}, { color: e.color || Wd.itemStyle.color }, i);
				return /*#__PURE__*/ P.createElement("li", {
					className: "recharts-tooltip-item",
					key: `tooltip-item-${t}`,
					style: p
				}, _t(u) ? /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-name" }, u) : null, _t(u) ? /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-separator" }, n) : null, /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-value" }, l), /*#__PURE__*/ P.createElement("span", { className: "recharts-tooltip-item-unit" }, e.unit || ""));
			});
			return /*#__PURE__*/ P.createElement("ul", {
				className: "recharts-tooltip-item-list",
				style: e
			}, t);
		}
		return null;
	}, v = Nd(Nd({}, Wd.contentStyle), r), y = Nd({ margin: 0 }, o), b = !R(p), x = b ? p : "", S = l("recharts-default-tooltip", d), C = l("recharts-tooltip-label", f);
	b && m && s != null && (x = m(p, s));
	var w = g ? {
		role: "status",
		"aria-live": "assertive"
	} : {};
	return /*#__PURE__*/ P.createElement("div", jd({
		className: S,
		style: v
	}, w), /*#__PURE__*/ P.createElement("p", {
		className: C,
		style: y
	}, /*#__PURE__*/ P.isValidElement(x) ? x : `${x}`), _());
}, qd = "recharts-tooltip-wrapper", Jd = { visibility: "hidden" };
function Yd(e) {
	var t = e.coordinate, n = e.translateX, r = e.translateY;
	return l(qd, {
		[`${qd}-right`]: I(n) && t && I(t.x) && n >= t.x,
		[`${qd}-left`]: I(n) && t && I(t.x) && n < t.x,
		[`${qd}-bottom`]: I(r) && t && I(t.y) && r >= t.y,
		[`${qd}-top`]: I(r) && t && I(t.y) && r < t.y
	});
}
function Xd(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.key, i = e.offset, a = e.position, o = e.reverseDirection, s = e.tooltipDimension, c = e.viewBox, l = e.viewBoxDimension;
	if (a && I(a[r])) return a[r];
	var u = n[r] - s - (i > 0 ? i : 0), d = n[r] + i;
	if (t[r]) return o[r] ? u : d;
	var f = c[r];
	return f == null ? 0 : o[r] ? Math.max(u < f ? d : u, f) : l == null ? 0 : d + s > f + l ? Math.max(u, f) : Math.max(d, f);
}
function Zd(e) {
	var t = e.translateX, n = e.translateY;
	return { transform: e.useTranslate3d ? `translate3d(${t}px, ${n}px, 0)` : `translate(${t}px, ${n}px)` };
}
function Qd(e) {
	var t = e.allowEscapeViewBox, n = e.coordinate, r = e.offsetTop, i = e.offsetLeft, a = e.position, o = e.reverseDirection, s = e.tooltipBox, c = e.useTranslate3d, l = e.viewBox, u, d, f;
	return s && s.height > 0 && s.width > 0 && n ? (d = Xd({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "x",
		offset: i,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.width,
		viewBox: l,
		viewBoxDimension: l.width
	}), f = Xd({
		allowEscapeViewBox: t,
		coordinate: n,
		key: "y",
		offset: r,
		position: a,
		reverseDirection: o,
		tooltipDimension: s.height,
		viewBox: l,
		viewBoxDimension: l.height
	}), u = Zd({
		translateX: d,
		translateY: f,
		useTranslate3d: c
	})) : u = Jd, {
		cssProperties: u,
		cssClasses: Yd({
			translateX: d,
			translateY: f,
			coordinate: n
		})
	};
}
var $d = {
	devToolsEnabled: !0,
	isSsr: !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout)
};
//#endregion
//#region node_modules/recharts/es6/util/usePrefersReducedMotion.js
function ef(e, t) {
	return of(e) || af(e, t) || nf(e, t) || tf();
}
function tf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function nf(e, t) {
	if (e) {
		if (typeof e == "string") return rf(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? rf(e, t) : void 0;
	}
}
function rf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function af(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function of(e) {
	if (Array.isArray(e)) return e;
}
function sf() {
	var e = ef((0, P.useState)(() => $d.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches), 2), t = e[0], n = e[1];
	return (0, P.useEffect)(() => {
		if (window.matchMedia) {
			var e = window.matchMedia("(prefers-reduced-motion: reduce)"), t = () => {
				n(e.matches);
			};
			return e.addEventListener("change", t), () => {
				e.removeEventListener("change", t);
			};
		}
	}, []), t;
}
//#endregion
//#region node_modules/recharts/es6/component/TooltipBoundingBox.js
function cf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function lf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cf(Object(n), !0).forEach(function(t) {
			uf(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function uf(e, t, n) {
	return (t = df(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function df(e) {
	var t = ff(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ff(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function pf(e, t) {
	return vf(e) || _f(e, t) || hf(e, t) || mf();
}
function mf() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function hf(e, t) {
	if (e) {
		if (typeof e == "string") return gf(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? gf(e, t) : void 0;
	}
}
function gf(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function _f(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function vf(e) {
	if (Array.isArray(e)) return e;
}
function yf(e) {
	if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active) {
		var t = typeof e.animationEasing == "string" ? e.animationEasing : "ease";
		return `transform ${e.animationDuration}ms ${t}`;
	}
}
function bf(e) {
	var t = sf(), n = pf(P.useState(() => ({
		dismissed: !1,
		dismissedAtCoordinate: {
			x: 0,
			y: 0
		}
	})), 2), r = n[0], i = n[1];
	P.useEffect(() => {
		var t = (t) => {
			t.key === "Escape" && i({
				dismissed: !0,
				dismissedAtCoordinate: {
					x: e.coordinate?.x ?? 0,
					y: e.coordinate?.y ?? 0
				}
			});
		};
		return document.addEventListener("keydown", t), () => {
			document.removeEventListener("keydown", t);
		};
	}, [e.coordinate?.x, e.coordinate?.y]), r.dismissed && ((e.coordinate?.x ?? 0) !== r.dismissedAtCoordinate.x || (e.coordinate?.y ?? 0) !== r.dismissedAtCoordinate.y) && i(lf(lf({}, r), {}, { dismissed: !1 }));
	var a = Qd({
		allowEscapeViewBox: e.allowEscapeViewBox,
		coordinate: e.coordinate,
		offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
		offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
		position: e.position,
		reverseDirection: e.reverseDirection,
		tooltipBox: e.lastBoundingBox,
		useTranslate3d: e.useTranslate3d,
		viewBox: e.viewBox
	}), o = a.cssClasses, s = a.cssProperties, c = lf(lf({}, e.hasPortalFromProps ? {} : lf(lf({ transition: yf({
		prefersReducedMotion: t,
		isAnimationActive: e.isAnimationActive,
		active: e.active,
		animationDuration: e.animationDuration,
		animationEasing: e.animationEasing
	}) }, s), {}, {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		left: 0
	})), {}, { visibility: !r.dismissed && e.active && e.hasPayload ? "visible" : "hidden" }, e.wrapperStyle);
	return /*#__PURE__*/ P.createElement("div", {
		xmlns: "http://www.w3.org/1999/xhtml",
		tabIndex: -1,
		className: o,
		style: c,
		ref: e.innerRef
	}, e.children);
}
var xf = /*#__PURE__*/ P.memo(bf), Sf = () => V((e) => e.rootProps.accessibilityLayer) ?? !0;
//#endregion
//#region node_modules/recharts/es6/shape/Curve.js
function Cf() {
	return Cf = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Cf.apply(null, arguments);
}
function wf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Tf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? wf(Object(n), !0).forEach(function(t) {
			Ef(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ef(e, t, n) {
	return (t = Df(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Df(e) {
	var t = Of(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Of(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var kf = {
	curveBasisClosed: jn,
	curveBasisOpen: Nn,
	curveBasis: kn,
	curveBumpX: an,
	curveBumpY: on,
	curveLinearClosed: Fn,
	curveLinear: Qt,
	curveMonotoneX: Un,
	curveMonotoneY: Wn,
	curveNatural: qn,
	curveStep: Yn,
	curveStepAfter: Zn,
	curveStepBefore: Xn
}, Af = (e) => G(e.x) && G(e.y), jf = (e) => e.base != null && Af(e.base) && Af(e), Mf = (e) => e.x, Nf = (e) => e.y, Pf = (e, t) => {
	if (typeof e == "function") return e;
	var n = `curve${Ct(e)}`;
	if ((n === "curveMonotone" || n === "curveBump") && t) {
		var r = kf[`${n}${t === "vertical" ? "Y" : "X"}`];
		if (r) return r;
	}
	return kf[n] || Qt;
}, Ff = {
	connectNulls: !1,
	type: "linear"
}, If = (e) => {
	var t = e.type, n = t === void 0 ? Ff.type : t, r = e.points, i = r === void 0 ? [] : r, a = e.baseLine, o = e.layout, s = e.connectNulls, c = s === void 0 ? Ff.connectNulls : s, l = Pf(n, o), u = c ? i.filter(Af) : i;
	if (Array.isArray(a)) {
		var d, f = i.map((e, t) => Tf(Tf({}, e), {}, { base: a[t] }));
		return d = o === "vertical" ? nn().y(Nf).x1(Mf).x0((e) => e.base.x) : nn().x(Mf).y1(Nf).y0((e) => e.base.y), d.defined(jf).curve(l)(c ? f.filter(jf) : f);
	}
	return (o === "vertical" && I(a) ? nn().y(Nf).x1(Mf).x0(a) : I(a) ? nn().x(Mf).y1(Nf).y0(a) : tn().x(Mf).y(Nf)).defined(Af).curve(l)(u);
}, Lf = (e) => {
	var t = e.className, n = e.points, r = e.path, i = e.pathRef, a = Cu();
	if ((!n || !n.length) && !r) return null;
	var o = {
		type: e.type,
		points: e.points,
		baseLine: e.baseLine,
		layout: e.layout || a,
		connectNulls: e.connectNulls
	}, s = n && n.length ? If(o) : r;
	return /*#__PURE__*/ P.createElement("path", Cf({}, Ve(e), Sr(e), {
		className: l("recharts-curve", t),
		d: s === null ? void 0 : s,
		ref: i
	}));
}, Rf = [
	"x",
	"y",
	"top",
	"left",
	"width",
	"height",
	"className"
];
function zf() {
	return zf = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, zf.apply(null, arguments);
}
function Bf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Vf(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Bf(Object(n), !0).forEach(function(t) {
			Hf(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Bf(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Hf(e, t, n) {
	return (t = Uf(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Uf(e) {
	var t = Wf(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Wf(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Gf(e, t) {
	if (e == null) return {};
	var n, r, i = Kf(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Kf(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var qf = (e, t, n, r, i, a) => `M${e},${i}v${r}M${a},${t}h${n}`, Jf = (e) => {
	var t = e.x, n = t === void 0 ? 0 : t, r = e.y, i = r === void 0 ? 0 : r, a = e.top, o = a === void 0 ? 0 : a, s = e.left, c = s === void 0 ? 0 : s, u = e.width, d = u === void 0 ? 0 : u, f = e.height, p = f === void 0 ? 0 : f, m = e.className, h = Gf(e, Rf), g = Vf({
		x: n,
		y: i,
		top: o,
		left: c,
		width: d,
		height: p
	}, h);
	return !I(n) || !I(i) || !I(d) || !I(p) || !I(o) || !I(c) ? null : /*#__PURE__*/ P.createElement("path", zf({}, Ue(g), {
		className: l("recharts-cross", m),
		d: qf(n, i, d, p, o, c)
	}));
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorRectangle.js
function Yf(e, t, n, r) {
	var i = r / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: e === "horizontal" ? t.x - i : n.left + .5,
		y: e === "horizontal" ? n.top + .5 : t.y - i,
		width: e === "horizontal" ? r : n.width - 1,
		height: e === "horizontal" ? n.height - 1 : r
	};
}
var Xf = (e, t) => [
	0,
	3 * e,
	3 * t - 6 * e,
	3 * e - 3 * t + 1
], Zf = (e, t) => e.map((e, n) => e * t ** n).reduce((e, t) => e + t), Qf = (e, t) => (n) => Zf(Xf(e, t), n), $f = (e, t) => (n) => Zf([...Xf(e, t).map((e, t) => e * t).slice(1), 0], n), ep = (e) => {
	var t, n = e.split("(");
	if (n.length !== 2 || n[0] !== "cubic-bezier") return null;
	var r = (t = n[1]) == null || (t = t.split(")")[0]) == null ? void 0 : t.split(",");
	if (r == null || r.length !== 4) return null;
	var i = r.map((e) => parseFloat(e));
	return [
		i[0],
		i[1],
		i[2],
		i[3]
	];
}, tp = function() {
	var e = [...arguments];
	if (e.length === 1) switch (e[0]) {
		case "linear": return [
			0,
			0,
			1,
			1
		];
		case "ease": return [
			.25,
			.1,
			.25,
			1
		];
		case "ease-in": return [
			.42,
			0,
			1,
			1
		];
		case "ease-out": return [
			.42,
			0,
			.58,
			1
		];
		case "ease-in-out": return [
			0,
			0,
			.58,
			1
		];
		default:
			var t = ep(e[0]);
			if (t) return t;
	}
	return e.length === 4 ? e : [
		0,
		0,
		1,
		1
	];
}, np = (e, t, n, r) => {
	var i = Qf(e, n), a = Qf(t, r), o = $f(e, n), s = (e) => e > 1 ? 1 : e < 0 ? 0 : e, c = (e) => {
		for (var t = e > 1 ? 1 : e, n = t, r = 0; r < 8; ++r) {
			var c = i(n) - t, l = o(n);
			if (Math.abs(c - t) < 1e-4 || l < 1e-4) return a(n);
			n = s(n - c / l);
		}
		return a(n);
	};
	return c.isStepper = !1, c;
}, rp = function() {
	return np(...tp(...arguments));
}, ip = function() {
	for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = e.stiff, n = t === void 0 ? 100 : t, r = e.damping, i = r === void 0 ? 8 : r, a = e.dt, o = a === void 0 ? 16.67 : a, s = 1, c = [0], l = 0, u = 0, d = 1e4, f = 0; f < d;) {
		var p = -(l - s) * n, m = u * i;
		if (u += (p - m) * o / 1e3, l += u * o / 1e3, c.push(l), Math.abs(l - s) < 1e-4 && Math.abs(u) < 1e-4) break;
		f++;
	}
	c[c.length - 1] = s;
	var h = c.length - 1;
	return (e) => {
		if (e <= 0) return 0;
		if (e >= 1) return s;
		var t = e * h, n = Math.floor(t), r = t - n;
		return (c[n] ?? 0) + ((c[n + 1] ?? 0) - (c[n] ?? 0)) * r;
	};
}, ap = (e) => {
	if (typeof e == "string") switch (e) {
		case "ease":
		case "ease-in-out":
		case "ease-out":
		case "ease-in":
		case "linear": return rp(e);
		case "spring": return ip();
		default: if (e.split("(")[0] === "cubic-bezier") return rp(e);
	}
	return typeof e == "function" ? e : null;
}, op = /*#__PURE__*/ (0, P.createContext)((e, t, n) => {
	var r, i = (a) => {
		var o = t.tick(a);
		if (t.getState() === "active") {
			if (n(t.getInterpolated()), t.getProgress() === 1) {
				t.complete(), r = void 0;
				return;
			}
			r = e.setTimeout(i, o);
		} else r = e.setTimeout(i, o);
	};
	return r = e.setTimeout(i, 0), () => r?.();
});
op.Provider;
function sp(e) {
	var t = (0, P.useContext)(op);
	return (0, P.useMemo)(() => e ?? t, [e, t]);
}
//#endregion
//#region node_modules/recharts/es6/animation/AnimationHandle.js
function cp(e, t, n) {
	return (t = lp(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lp(e) {
	var t = up(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function up(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var dp = "init", fp = "pending", pp = "active", mp = "completed";
function hp(e) {
	return Math.max(0, e);
}
var gp = class {
	getAnimationStartedTime() {
		return this.animationStartedTime;
	}
	getBeginStartedTime() {
		return this.beginStartedTime;
	}
	constructor(e) {
		var t;
		cp(this, "state", dp), this.animationId = e.animationId, this.onAnimationEnd = e.onAnimationEnd, this.animationDuration = hp(e.animationDuration), this.animationBegin = hp(e.animationBegin), this.progress = 0, this.from = e.from, this.to = e.to, this.easing = e.easing, (t = e.onAnimationStart) == null || t.call(e);
	}
	getState() {
		return this.state;
	}
	getEasing() {
		return this.easing;
	}
	getAnimationDuration() {
		return this.animationDuration;
	}
	tick(e) {
		if (this.getState() === dp) return this.state = fp, this.beginStartedTime = e, this.animationBegin;
		if (this.getState() === fp) {
			if (this.beginStartedTime == null) throw Error();
			var t = e - this.beginStartedTime;
			return t >= this.animationBegin ? (this.state = pp, this.animationStartedTime = e, this.nextAnimationUpdate(0)) : hp(this.animationBegin - t);
		}
		if (this.getState() === pp) {
			if (this.animationStartedTime == null) throw Error();
			var n = e - this.animationStartedTime;
			return this.setProgress(n / this.animationDuration), this.nextAnimationUpdate(n);
		}
		return 0;
	}
	setProgress(e) {
		this.progress = Math.min(1, Math.max(0, e));
	}
	getProgress() {
		return this.progress;
	}
	complete() {
		if (this.progress = 1, this.state === "active") {
			var e;
			(e = this.onAnimationEnd) == null || e.call(this);
		}
		this.state = mp;
	}
	getFrom() {
		return this.from;
	}
	getTo() {
		return this.to;
	}
	getAnimationId() {
		return this.animationId;
	}
	getAnimationBegin() {
		return this.animationBegin;
	}
}, _p = class extends gp {
	nextAnimationUpdate() {
		return 0;
	}
	getInterpolated() {
		return this.easing(L(this.getFrom(), this.getTo(), this.getProgress()));
	}
}, vp = class {
	setTimeout(e) {
		var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), r = null, i = (a) => {
			a - n >= t ? e(a) : r = requestAnimationFrame(i);
		};
		return r = requestAnimationFrame(i), () => {
			r != null && cancelAnimationFrame(r);
		};
	}
};
//#endregion
//#region node_modules/recharts/es6/animation/JavascriptAnimate.js
function yp(e, t) {
	return wp(e) || Cp(e, t) || xp(e, t) || bp();
}
function bp() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function xp(e, t) {
	if (e) {
		if (typeof e == "string") return Sp(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Sp(e, t) : void 0;
	}
}
function Sp(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Cp(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function wp(e) {
	if (Array.isArray(e)) return e;
}
var Tp = {
	begin: 0,
	duration: 1e3,
	easing: "ease",
	isActive: !0,
	canBegin: !0,
	onAnimationEnd: () => {},
	onAnimationStart: () => {}
}, Ep = 0, Dp = 1;
function Op(e) {
	var t = Ar(e, Tp), n = t.animationId, r = t.isActive, i = t.canBegin, a = t.duration, o = t.easing, s = t.begin, c = t.onAnimationEnd, l = t.onAnimationStart, u = t.children, d = sf(), f = r === "auto" ? !$d.isSsr && !d : r, p = sp(t.animationController), m = yp((0, P.useState)(f ? Ep : Dp), 2), h = m[0], g = m[1];
	return (0, P.useEffect)(() => {
		f || g(Dp);
	}, [f]), (0, P.useEffect)(() => {
		var e = ap(o);
		return !f || !i || e == null ? Tt : p(new vp(), new _p({
			animationId: n,
			easing: e,
			animationDuration: a,
			animationBegin: s,
			onAnimationStart: l,
			onAnimationEnd: c,
			from: Ep,
			to: Dp
		}), g);
	}, [
		p,
		n,
		f,
		i,
		a,
		o,
		s,
		l,
		c
	]), u(Number(h));
}
//#endregion
//#region node_modules/recharts/es6/util/useAnimationId.js
function kp(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", n = (0, P.useRef)(yt(t)), r = (0, P.useRef)(e);
	return r.current !== e && (n.current = yt(t), r.current = e), n.current;
}
//#endregion
//#region node_modules/recharts/es6/animation/util.js
var Ap = (e) => e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`), jp = (e, t, n) => e.map((e) => `${Ap(e)} ${t}ms ${n}`).join(","), Mp = ["radius"], Np = ["radius"], Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up;
function Wp(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Gp(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Wp(Object(n), !0).forEach(function(t) {
			Kp(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Wp(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Kp(e, t, n) {
	return (t = qp(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function qp(e) {
	var t = Jp(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Jp(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Yp() {
	return Yp = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Yp.apply(null, arguments);
}
function Xp(e, t) {
	if (e == null) return {};
	var n, r, i = Zp(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Zp(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Qp(e, t) {
	return rm(e) || nm(e, t) || em(e, t) || $p();
}
function $p() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function em(e, t) {
	if (e) {
		if (typeof e == "string") return tm(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? tm(e, t) : void 0;
	}
}
function tm(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function nm(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function rm(e) {
	if (Array.isArray(e)) return e;
}
function im(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var am = (e, t, n, r, i) => {
	var a = ft(n), o = ft(r), s = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), c = o >= 0 ? 1 : -1, l = a >= 0 ? 1 : -1, u = +(o >= 0 && a >= 0 || o < 0 && a < 0), d;
	if (s > 0 && Array.isArray(i)) {
		for (var f = [
			0,
			0,
			0,
			0
		], p = 0, m = 4; p < m; p++) {
			var h = i[p] ?? 0;
			f[p] = h > s ? s : h;
		}
		d = pt(Pp ||= im([
			"M",
			",",
			""
		]), e, t + c * f[0]), f[0] > 0 && (d += pt(Fp ||= im([
			"A ",
			",",
			",0,0,",
			",",
			",",
			""
		]), f[0], f[0], u, e + l * f[0], t)), d += pt(Ip ||= im([
			"L ",
			",",
			""
		]), e + n - l * f[1], t), f[1] > 0 && (d += pt(Lp ||= im([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[1], f[1], u, e + n, t + c * f[1])), d += pt(Rp ||= im([
			"L ",
			",",
			""
		]), e + n, t + r - c * f[2]), f[2] > 0 && (d += pt(zp ||= im([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[2], f[2], u, e + n - l * f[2], t + r)), d += pt(Bp ||= im([
			"L ",
			",",
			""
		]), e + l * f[3], t + r), f[3] > 0 && (d += pt(Vp ||= im([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		]), f[3], f[3], u, e, t + r - c * f[3])), d += "Z";
	} else if (s > 0 && i === +i && i > 0) {
		var g = Math.min(s, i);
		d = pt(Hp ||= im(/* @__PURE__ */ "M .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,.\n            L .,.\n            A .,.,0,0,.,.,. Z".split(".")), e, t + c * g, g, g, u, e + l * g, t, e + n - l * g, t, g, g, u, e + n, t + c * g, e + n, t + r - c * g, g, g, u, e + n - l * g, t + r, e + l * g, t + r, g, g, u, e, t + r - c * g);
	} else d = pt(Up ||= im([
		"M ",
		",",
		" h ",
		" v ",
		" h ",
		" Z"
	]), e, t, n, r, -n);
	return d;
}, om = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	radius: 0,
	isAnimationActive: !1,
	isUpdateAnimationActive: !1,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
}, sm = (e) => {
	var t = Ar(e, om), n = (0, P.useRef)(null), r = Qp((0, P.useState)(-1), 2), i = r[0], a = r[1];
	(0, P.useEffect)(() => {
		if (n.current && n.current.getTotalLength) try {
			var e = n.current.getTotalLength();
			e && a(e);
		} catch {}
	}, []);
	var o = t.x, s = t.y, c = t.width, u = t.height, d = t.radius, f = t.className, p = t.animationEasing, m = t.animationDuration, h = t.animationBegin, g = t.isAnimationActive, _ = t.isUpdateAnimationActive, v = (0, P.useRef)(c), y = (0, P.useRef)(u), b = (0, P.useRef)(o), x = (0, P.useRef)(s), S = kp((0, P.useMemo)(() => ({
		x: o,
		y: s,
		width: c,
		height: u,
		radius: d
	}), [
		o,
		s,
		c,
		u,
		d
	]), "rectangle-");
	if (o !== +o || s !== +s || c !== +c || u !== +u || c === 0 || u === 0) return null;
	var C = l("recharts-rectangle", f);
	if (!_) {
		var w = Ue(t);
		w.radius;
		var T = Xp(w, Mp);
		return /*#__PURE__*/ P.createElement("path", Yp({}, T, {
			x: ft(o),
			y: ft(s),
			width: ft(c),
			height: ft(u),
			radius: typeof d == "number" ? d : void 0,
			className: C,
			d: am(o, s, c, u, d)
		}));
	}
	var E = v.current, D = y.current, O = b.current, k = x.current, A = `0px ${i === -1 ? 1 : i}px`, j = `${i}px ${i}px`, M = jp(["strokeDasharray"], m, typeof p == "string" ? p : om.animationEasing);
	return /*#__PURE__*/ P.createElement(Op, {
		animationId: S,
		key: S,
		canBegin: i > 0,
		duration: m,
		easing: p,
		isActive: _,
		begin: h
	}, (e) => {
		var r = L(E, c, e), i = L(D, u, e), a = L(O, o, e), l = L(k, s, e);
		n.current && (v.current = r, y.current = i, b.current = a, x.current = l);
		var f = g ? e > 0 ? {
			transition: M,
			strokeDasharray: j
		} : { strokeDasharray: A } : { strokeDasharray: j }, p = Ue(t);
		p.radius;
		var m = Xp(p, Np);
		return /*#__PURE__*/ P.createElement("path", Yp({}, m, {
			radius: typeof d == "number" ? d : void 0,
			className: C,
			d: am(a, l, r, i, d),
			ref: n,
			style: Gp(Gp({}, f), t.style)
		}));
	});
};
//#endregion
//#region node_modules/recharts/es6/util/PolarUtils.js
function cm(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function lm(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? cm(Object(n), !0).forEach(function(t) {
			um(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : cm(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function um(e, t, n) {
	return (t = dm(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function dm(e) {
	var t = fm(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fm(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var pm = Math.PI / 180, mm = (e) => e * Math.PI / 180, hm = (e) => e * 180 / Math.PI, gm = (e, t, n, r) => ({
	x: e + Math.cos(-pm * r) * n,
	y: t + Math.sin(-pm * r) * n
}), _m = function(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		brushBottom: 0
	};
	return Math.min(Math.abs(e - (n.left || 0) - (n.right || 0)), Math.abs(t - (n.top || 0) - (n.bottom || 0))) / 2;
}, vm = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return Math.sqrt((n - i) ** 2 + (r - a) ** 2);
}, ym = (e, t) => {
	var n = e.x, r = e.y, i = t.cx, a = t.cy, o = vm({
		x: n,
		y: r
	}, {
		x: i,
		y: a
	});
	if (o <= 0) return {
		radius: o,
		angle: 0
	};
	var s = (n - i) / o, c = Math.acos(s);
	return r > a && (c = 2 * Math.PI - c), {
		radius: o,
		angle: hm(c),
		angleInRadian: c
	};
}, bm = (e) => {
	var t = e.startAngle, n = e.endAngle, r = Math.floor(t / 360), i = Math.floor(n / 360), a = Math.min(r, i);
	return {
		startAngle: t - a * 360,
		endAngle: n - a * 360
	};
}, xm = (e, t) => {
	var n = t.startAngle, r = t.endAngle, i = Math.floor(n / 360), a = Math.floor(r / 360);
	return e + Math.min(i, a) * 360;
}, Sm = (e, t) => {
	var n = e.relativeX, r = e.relativeY, i = ym({
		x: n,
		y: r
	}, t), a = i.radius, o = i.angle, s = t.innerRadius, c = t.outerRadius;
	if (a < s || a > c || a === 0) return null;
	var l = bm(t), u = l.startAngle, d = l.endAngle, f = o, p;
	if (u <= d) {
		for (; f > d;) f -= 360;
		for (; f < u;) f += 360;
		p = f >= u && f <= d;
	} else {
		for (; f > u;) f -= 360;
		for (; f < d;) f += 360;
		p = f >= d && f <= u;
	}
	return p ? lm(lm({}, t), {}, {
		radius: a,
		angle: xm(f, t)
	}) : null;
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js
function Cm(e) {
	var t = e.cx, n = e.cy, r = e.radius, i = e.startAngle, a = e.endAngle;
	return {
		points: [gm(t, n, r, i), gm(t, n, r, a)],
		cx: t,
		cy: n,
		radius: r,
		startAngle: i,
		endAngle: a
	};
}
//#endregion
//#region node_modules/recharts/es6/shape/Sector.js
var wm, Tm, Em, Dm, Om, km, Am;
function jm() {
	return jm = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jm.apply(null, arguments);
}
function Mm(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Nm = (e, t) => mt(t - e) * Math.min(Math.abs(t - e), 359.999), Pm = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = e.angle, a = e.sign, o = e.isExternal, s = e.cornerRadius, c = e.cornerIsExternal, l = s * (o ? 1 : -1) + r, u = Math.asin(s / l) / pm, d = c ? i : i + a * u, f = gm(t, n, l, d), p = gm(t, n, r, d), m = c ? i - a * u : i;
	return {
		center: f,
		circleTangency: p,
		lineTangency: gm(t, n, l * Math.cos(u * pm), m),
		theta: u
	};
}, Fm = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = Nm(a, o), c = a + s, l = gm(t, n, i, a), u = gm(t, n, i, c), d = pt(wm ||= Mm([
		"M ",
		",",
		"\n    A ",
		",",
		",0,\n    ",
		",",
		",\n    ",
		",",
		"\n  "
	]), l.x, l.y, i, i, +(Math.abs(s) > 180), +(a > c), u.x, u.y);
	if (r > 0) {
		var f = gm(t, n, r, a), p = gm(t, n, r, c);
		d += pt(Tm ||= Mm([
			"L ",
			",",
			"\n            A ",
			",",
			",0,\n            ",
			",",
			",\n            ",
			",",
			" Z"
		]), p.x, p.y, r, r, +(Math.abs(s) > 180), +(a <= c), f.x, f.y);
	} else d += pt(Em ||= Mm([
		"L ",
		",",
		" Z"
	]), t, n);
	return d;
}, Im = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.cornerRadius, o = e.forceCornerRadius, s = e.cornerIsExternal, c = e.startAngle, l = e.endAngle, u = mt(l - c), d = Pm({
		cx: t,
		cy: n,
		radius: i,
		angle: c,
		sign: u,
		cornerRadius: a,
		cornerIsExternal: s
	}), f = d.circleTangency, p = d.lineTangency, m = d.theta, h = Pm({
		cx: t,
		cy: n,
		radius: i,
		angle: l,
		sign: -u,
		cornerRadius: a,
		cornerIsExternal: s
	}), g = h.circleTangency, _ = h.lineTangency, v = h.theta, y = s ? Math.abs(c - l) : Math.abs(c - l) - m - v;
	if (y < 0) return o ? pt(Dm ||= Mm([
		"M ",
		",",
		"\n        a",
		",",
		",0,0,1,",
		",0\n        a",
		",",
		",0,0,1,",
		",0\n      "
	]), p.x, p.y, a, a, a * 2, a, a, -a * 2) : Fm({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: c,
		endAngle: l
	});
	var b = pt(Om ||= Mm([
		"M ",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n    A",
		",",
		",0,",
		",",
		",",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n  "
	]), p.x, p.y, a, a, +(u < 0), f.x, f.y, i, i, +(y > 180), +(u < 0), g.x, g.y, a, a, +(u < 0), _.x, _.y);
	if (r > 0) {
		var x = Pm({
			cx: t,
			cy: n,
			radius: r,
			angle: c,
			sign: u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), S = x.circleTangency, C = x.lineTangency, w = x.theta, T = Pm({
			cx: t,
			cy: n,
			radius: r,
			angle: l,
			sign: -u,
			isExternal: !0,
			cornerRadius: a,
			cornerIsExternal: s
		}), E = T.circleTangency, D = T.lineTangency, O = T.theta, k = s ? Math.abs(c - l) : Math.abs(c - l) - w - O;
		if (k < 0 && a === 0) return `${b}L${t},${n}Z`;
		b += pt(km ||= Mm([
			"L",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"\n      A",
			",",
			",0,",
			",",
			",",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"Z"
		]), D.x, D.y, a, a, +(u < 0), E.x, E.y, r, r, +(k > 180), +(u > 0), S.x, S.y, a, a, +(u < 0), C.x, C.y);
	} else b += pt(Am ||= Mm([
		"L",
		",",
		"Z"
	]), t, n);
	return b;
}, Lm = {
	cx: 0,
	cy: 0,
	innerRadius: 0,
	outerRadius: 0,
	startAngle: 0,
	endAngle: 0,
	cornerRadius: 0,
	forceCornerRadius: !1,
	cornerIsExternal: !1
}, Rm = (e) => {
	var t = Ar(e, Lm), n = t.cx, r = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, s = t.forceCornerRadius, c = t.cornerIsExternal, u = t.startAngle, d = t.endAngle, f = t.className;
	if (a < i || u === d) return null;
	var p = l("recharts-sector", f), m = a - i, h = bt(o, m, 0, !0), g = h > 0 && Math.abs(u - d) < 360 ? Im({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		cornerRadius: Math.min(h, m / 2),
		forceCornerRadius: s,
		cornerIsExternal: c,
		startAngle: u,
		endAngle: d
	}) : Fm({
		cx: n,
		cy: r,
		innerRadius: i,
		outerRadius: a,
		startAngle: u,
		endAngle: d
	});
	return /*#__PURE__*/ P.createElement("path", jm({}, Ue(t), {
		className: p,
		d: g
	}));
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorPoints.js
function zm(e, t, n) {
	if (e === "horizontal") return [{
		x: t.x,
		y: n.top
	}, {
		x: t.x,
		y: n.top + n.height
	}];
	if (e === "vertical") return [{
		x: n.left,
		y: t.y
	}, {
		x: n.left + n.width,
		y: t.y
	}];
	if (xr(t)) {
		if (e === "centric") {
			var r = t.cx, i = t.cy, a = t.innerRadius, o = t.outerRadius, s = t.angle, c = gm(r, i, a, s), l = gm(r, i, o, s);
			return [{
				x: c.x,
				y: c.y
			}, {
				x: l.x,
				y: l.y
			}];
		}
		return Cm(t);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toNumber.mjs
function Bm(e) {
	return at(e) ? NaN : Number(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/util/toFinite.mjs
function Vm(e) {
	return e ? (e = Bm(e), e === Infinity || e === -Infinity ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/math/range.mjs
function Hm(e, t, n) {
	n && typeof n != "number" && va(e, t, n) && (t = n = void 0), e = Vm(e), t === void 0 ? (t = e, e = 0) : t = Vm(t), n = n === void 0 ? e < t ? 1 : -1 : Vm(n);
	let r = Math.max(Math.ceil((t - e) / (n || 1)), 0), i = Array(r);
	for (let t = 0; t < r; t++) i[t] = e, e += n;
	return i;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/dataSelectors.js
var Um = (e) => e.chartData, Wm = H([Um], (e) => {
	var t = e.chartData == null ? 0 : e.chartData.length - 1;
	return {
		chartData: e.chartData,
		computedData: e.computedData,
		dataEndIndex: t,
		dataStartIndex: 0
	};
}), Gm = (e, t, n, r) => r ? Wm(e) : Um(e), Km = (e, t, n) => n ? Wm(e) : Um(e), qm = H([Gm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
}), Jm = H([Wm], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
}), Ym = H([Um], (e) => {
	var t = e.chartData, n = e.dataStartIndex, r = e.dataEndIndex;
	return t == null ? [] : t.slice(n, r + 1);
});
//#endregion
//#region node_modules/recharts/es6/util/isDomainSpecifiedByUser.js
function Xm(e, t) {
	return th(e) || eh(e, t) || Qm(e, t) || Zm();
}
function Zm() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Qm(e, t) {
	if (e) {
		if (typeof e == "string") return $m(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $m(e, t) : void 0;
	}
}
function $m(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function eh(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function th(e) {
	if (Array.isArray(e)) return e;
}
function nh(e) {
	if (Array.isArray(e) && e.length === 2) {
		var t = Xm(e, 2), n = t[0], r = t[1];
		if (G(n) && G(r)) return !0;
	}
	return !1;
}
function rh(e, t, n) {
	return n ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function ih(e, t) {
	if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
		var n = Xm(e, 2), r = n[0], i = n[1], a, o;
		if (G(r)) a = r;
		else if (typeof r == "function") return;
		if (G(i)) o = i;
		else if (typeof i == "function") return;
		var s = [a, o];
		if (nh(s)) return s;
	}
}
function ah(e, t, n) {
	if (n || t != null) {
		if (typeof e == "function" && t != null) try {
			var r = e(t, n);
			if (nh(r)) return rh(r, t, n);
		} catch {}
		if (Array.isArray(e) && e.length === 2) {
			var i = Xm(e, 2), a = i[0], o = i[1], s, c;
			if (a === "auto") t != null && (s = Math.min(...t));
			else if (I(a)) s = a;
			else if (typeof a == "function") try {
				t != null && (s = a(t?.[0]));
			} catch {}
			else if (typeof a == "string" && sl.test(a)) {
				var l = sl.exec(a);
				if (l == null || l[1] == null || t == null) s = void 0;
				else {
					var u = +l[1];
					s = t[0] - u;
				}
			} else s = t?.[0];
			if (o === "auto") t != null && (c = Math.max(...t));
			else if (I(o)) c = o;
			else if (typeof o == "function") try {
				t != null && (c = o(t?.[1]));
			} catch {}
			else if (typeof o == "string" && cl.test(o)) {
				var d = cl.exec(o);
				if (d == null || d[1] == null || t == null) c = void 0;
				else {
					var f = +d[1];
					c = t[1] + f;
				}
			} else c = t?.[1];
			var p = [s, c];
			if (nh(p)) return t == null ? p : rh(p, t, n);
		}
	}
}
//#endregion
//#region node_modules/recharts/es6/util/scale/util/arithmetic.js
var J = /* @__PURE__ */ i((/* @__PURE__ */ n(((e, t) => {
	(function(e) {
		var n = 1e9, r = {
			precision: 20,
			rounding: 4,
			toExpNeg: -7,
			toExpPos: 21,
			LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
		}, i = !0, a = "[DecimalError] ", o = a + "Invalid argument: ", s = a + "Exponent out of range: ", c = Math.floor, l = Math.pow, u = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, d, f = 1e7, p = 7, m = 9007199254740991, h = c(m / p), g = {};
		g.absoluteValue = g.abs = function() {
			var e = new this.constructor(this);
			return e.s &&= 1, e;
		}, g.comparedTo = g.cmp = function(e) {
			var t, n, r, i, a = this;
			if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
			if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
			for (r = a.d.length, i = e.d.length, t = 0, n = r < i ? r : i; t < n; ++t) if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
			return r === i ? 0 : r > i ^ a.s < 0 ? 1 : -1;
		}, g.decimalPlaces = g.dp = function() {
			var e = this, t = e.d.length - 1, n = (t - e.e) * p;
			if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) n--;
			return n < 0 ? 0 : n;
		}, g.dividedBy = g.div = function(e) {
			return b(this, new this.constructor(e));
		}, g.dividedToIntegerBy = g.idiv = function(e) {
			var t = this, n = t.constructor;
			return D(b(t, new n(e), 0, 1), n.precision);
		}, g.equals = g.eq = function(e) {
			return !this.cmp(e);
		}, g.exponent = function() {
			return S(this);
		}, g.greaterThan = g.gt = function(e) {
			return this.cmp(e) > 0;
		}, g.greaterThanOrEqualTo = g.gte = function(e) {
			return this.cmp(e) >= 0;
		}, g.isInteger = g.isint = function() {
			return this.e > this.d.length - 2;
		}, g.isNegative = g.isneg = function() {
			return this.s < 0;
		}, g.isPositive = g.ispos = function() {
			return this.s > 0;
		}, g.isZero = function() {
			return this.s === 0;
		}, g.lessThan = g.lt = function(e) {
			return this.cmp(e) < 0;
		}, g.lessThanOrEqualTo = g.lte = function(e) {
			return this.cmp(e) < 1;
		}, g.logarithm = g.log = function(e) {
			var t, n = this, r = n.constructor, o = r.precision, s = o + 5;
			if (e === void 0) e = new r(10);
			else if (e = new r(e), e.s < 1 || e.eq(d)) throw Error(a + "NaN");
			if (n.s < 1) throw Error(a + (n.s ? "NaN" : "-Infinity"));
			return n.eq(d) ? new r(0) : (i = !1, t = b(T(n, s), T(e, s), s), i = !0, D(t, o));
		}, g.minus = g.sub = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? O(t, e) : _(t, (e.s = -e.s, e));
		}, g.modulo = g.mod = function(e) {
			var t, n = this, r = n.constructor, o = r.precision;
			if (e = new r(e), !e.s) throw Error(a + "NaN");
			return n.s ? (i = !1, t = b(n, e, 0, 1).times(e), i = !0, n.minus(t)) : D(new r(n), o);
		}, g.naturalExponential = g.exp = function() {
			return x(this);
		}, g.naturalLogarithm = g.ln = function() {
			return T(this);
		}, g.negated = g.neg = function() {
			var e = new this.constructor(this);
			return e.s = -e.s || 0, e;
		}, g.plus = g.add = function(e) {
			var t = this;
			return e = new t.constructor(e), t.s == e.s ? _(t, e) : O(t, (e.s = -e.s, e));
		}, g.precision = g.sd = function(e) {
			var t, n, r, i = this;
			if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(o + e);
			if (t = S(i) + 1, r = i.d.length - 1, n = r * p + 1, r = i.d[r], r) {
				for (; r % 10 == 0; r /= 10) n--;
				for (r = i.d[0]; r >= 10; r /= 10) n++;
			}
			return e && t > n ? t : n;
		}, g.squareRoot = g.sqrt = function() {
			var e, t, n, r, o, s, l, u = this, d = u.constructor;
			if (u.s < 1) {
				if (!u.s) return new d(0);
				throw Error(a + "NaN");
			}
			for (e = S(u), i = !1, o = Math.sqrt(+u), o == 0 || o == 1 / 0 ? (t = y(u.d), (t.length + e) % 2 == 0 && (t += "0"), o = Math.sqrt(t), e = c((e + 1) / 2) - (e < 0 || e % 2), o == 1 / 0 ? t = "5e" + e : (t = o.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), r = new d(t)) : r = new d(o.toString()), n = d.precision, o = l = n + 3;;) if (s = r, r = s.plus(b(u, s, l + 2)).times(.5), y(s.d).slice(0, l) === (t = y(r.d)).slice(0, l)) {
				if (t = t.slice(l - 3, l + 1), o == l && t == "4999") {
					if (D(s, n + 1, 0), s.times(s).eq(u)) {
						r = s;
						break;
					}
				} else if (t != "9999") break;
				l += 4;
			}
			return i = !0, D(r, n);
		}, g.times = g.mul = function(e) {
			var t, n, r, a, o, s, c, l, u, d = this, p = d.constructor, m = d.d, h = (e = new p(e)).d;
			if (!d.s || !e.s) return new p(0);
			for (e.s *= d.s, n = d.e + e.e, l = m.length, u = h.length, l < u && (o = m, m = h, h = o, s = l, l = u, u = s), o = [], s = l + u, r = s; r--;) o.push(0);
			for (r = u; --r >= 0;) {
				for (t = 0, a = l + r; a > r;) c = o[a] + h[r] * m[a - r - 1] + t, o[a--] = c % f | 0, t = c / f | 0;
				o[a] = (o[a] + t) % f | 0;
			}
			for (; !o[--s];) o.pop();
			return t ? ++n : o.shift(), e.d = o, e.e = n, i ? D(e, p.precision) : e;
		}, g.toDecimalPlaces = g.todp = function(e, t) {
			var r = this, i = r.constructor;
			return r = new i(r), e === void 0 ? r : (v(e, 0, n), t === void 0 ? t = i.rounding : v(t, 0, 8), D(r, e + S(r) + 1, t));
		}, g.toExponential = function(e, t) {
			var r, i = this, a = i.constructor;
			return e === void 0 ? r = k(i, !0) : (v(e, 0, n), t === void 0 ? t = a.rounding : v(t, 0, 8), i = D(new a(i), e + 1, t), r = k(i, !0, e + 1)), r;
		}, g.toFixed = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? k(a) : (v(e, 0, n), t === void 0 ? t = o.rounding : v(t, 0, 8), i = D(new o(a), e + S(a) + 1, t), r = k(i.abs(), !1, e + S(i) + 1), a.isneg() && !a.isZero() ? "-" + r : r);
		}, g.toInteger = g.toint = function() {
			var e = this, t = e.constructor;
			return D(new t(e), S(e) + 1, t.rounding);
		}, g.toNumber = function() {
			return +this;
		}, g.toPower = g.pow = function(e) {
			var t, n, r, o, s, l, u = this, f = u.constructor, h = 12, g = +(e = new f(e));
			if (!e.s) return new f(d);
			if (u = new f(u), !u.s) {
				if (e.s < 1) throw Error(a + "Infinity");
				return u;
			}
			if (u.eq(d)) return u;
			if (r = f.precision, e.eq(d)) return D(u, r);
			if (t = e.e, n = e.d.length - 1, l = t >= n, s = u.s, !l) {
				if (s < 0) throw Error(a + "NaN");
			} else if ((n = g < 0 ? -g : g) <= m) {
				for (o = new f(d), t = Math.ceil(r / p + 4), i = !1; n % 2 && (o = o.times(u), A(o.d, t)), n = c(n / 2), n !== 0;) u = u.times(u), A(u.d, t);
				return i = !0, e.s < 0 ? new f(d).div(o) : D(o, r);
			}
			return s = s < 0 && e.d[Math.max(t, n)] & 1 ? -1 : 1, u.s = 1, i = !1, o = e.times(T(u, r + h)), i = !0, o = x(o), o.s = s, o;
		}, g.toPrecision = function(e, t) {
			var r, i, a = this, o = a.constructor;
			return e === void 0 ? (r = S(a), i = k(a, r <= o.toExpNeg || r >= o.toExpPos)) : (v(e, 1, n), t === void 0 ? t = o.rounding : v(t, 0, 8), a = D(new o(a), e, t), r = S(a), i = k(a, e <= r || r <= o.toExpNeg, e)), i;
		}, g.toSignificantDigits = g.tosd = function(e, t) {
			var r = this, i = r.constructor;
			return e === void 0 ? (e = i.precision, t = i.rounding) : (v(e, 1, n), t === void 0 ? t = i.rounding : v(t, 0, 8)), D(new i(r), e, t);
		}, g.toString = g.valueOf = g.val = g.toJSON = function() {
			var e = this, t = S(e), n = e.constructor;
			return k(e, t <= n.toExpNeg || t >= n.toExpPos);
		};
		function _(e, t) {
			var n, r, a, o, s, c, l, u, d = e.constructor, m = d.precision;
			if (!e.s || !t.s) return t.s || (t = new d(e)), i ? D(t, m) : t;
			if (l = e.d, u = t.d, s = e.e, a = t.e, l = l.slice(), o = s - a, o) {
				for (o < 0 ? (r = l, o = -o, c = u.length) : (r = u, a = s, c = l.length), s = Math.ceil(m / p), c = s > c ? s + 1 : c + 1, o > c && (o = c, r.length = 1), r.reverse(); o--;) r.push(0);
				r.reverse();
			}
			for (c = l.length, o = u.length, c - o < 0 && (o = c, r = u, u = l, l = r), n = 0; o;) n = (l[--o] = l[o] + u[o] + n) / f | 0, l[o] %= f;
			for (n && (l.unshift(n), ++a), c = l.length; l[--c] == 0;) l.pop();
			return t.d = l, t.e = a, i ? D(t, m) : t;
		}
		function v(e, t, n) {
			if (e !== ~~e || e < t || e > n) throw Error(o + e);
		}
		function y(e) {
			var t, n, r, i = e.length - 1, a = "", o = e[0];
			if (i > 0) {
				for (a += o, t = 1; t < i; t++) r = e[t] + "", n = p - r.length, n && (a += w(n)), a += r;
				o = e[t], r = o + "", n = p - r.length, n && (a += w(n));
			} else if (o === 0) return "0";
			for (; o % 10 == 0;) o /= 10;
			return a + o;
		}
		var b = (function() {
			function e(e, t) {
				var n, r = 0, i = e.length;
				for (e = e.slice(); i--;) n = e[i] * t + r, e[i] = n % f | 0, r = n / f | 0;
				return r && e.unshift(r), e;
			}
			function t(e, t, n, r) {
				var i, a;
				if (n != r) a = n > r ? 1 : -1;
				else for (i = a = 0; i < n; i++) if (e[i] != t[i]) {
					a = e[i] > t[i] ? 1 : -1;
					break;
				}
				return a;
			}
			function n(e, t, n) {
				for (var r = 0; n--;) e[n] -= r, r = +(e[n] < t[n]), e[n] = r * f + e[n] - t[n];
				for (; !e[0] && e.length > 1;) e.shift();
			}
			return function(r, i, o, s) {
				var c, l, u, d, m, h, g, _, v, y, b, x, C, w, T, E, O, k, A = r.constructor, j = r.s == i.s ? 1 : -1, M = r.d, N = i.d;
				if (!r.s) return new A(r);
				if (!i.s) throw Error(a + "Division by zero");
				for (l = r.e - i.e, O = N.length, T = M.length, g = new A(j), _ = g.d = [], u = 0; N[u] == (M[u] || 0);) ++u;
				if (N[u] > (M[u] || 0) && --l, x = o == null ? o = A.precision : s ? o + (S(r) - S(i)) + 1 : o, x < 0) return new A(0);
				if (x = x / p + 2 | 0, u = 0, O == 1) for (d = 0, N = N[0], x++; (u < T || d) && x--; u++) C = d * f + (M[u] || 0), _[u] = C / N | 0, d = C % N | 0;
				else {
					for (d = f / (N[0] + 1) | 0, d > 1 && (N = e(N, d), M = e(M, d), O = N.length, T = M.length), w = O, v = M.slice(0, O), y = v.length; y < O;) v[y++] = 0;
					k = N.slice(), k.unshift(0), E = N[0], N[1] >= f / 2 && ++E;
					do
						d = 0, c = t(N, v, O, y), c < 0 ? (b = v[0], O != y && (b = b * f + (v[1] || 0)), d = b / E | 0, d > 1 ? (d >= f && (d = f - 1), m = e(N, d), h = m.length, y = v.length, c = t(m, v, h, y), c == 1 && (d--, n(m, O < h ? k : N, h))) : (d == 0 && (c = d = 1), m = N.slice()), h = m.length, h < y && m.unshift(0), n(v, m, y), c == -1 && (y = v.length, c = t(N, v, O, y), c < 1 && (d++, n(v, O < y ? k : N, y))), y = v.length) : c === 0 && (d++, v = [0]), _[u++] = d, c && v[0] ? v[y++] = M[w] || 0 : (v = [M[w]], y = 1);
					while ((w++ < T || v[0] !== void 0) && x--);
				}
				return _[0] || _.shift(), g.e = l, D(g, s ? o + S(g) + 1 : o);
			};
		})();
		function x(e, t) {
			var n, r, a, o, c, u, f = 0, p = 0, m = e.constructor, h = m.precision;
			if (S(e) > 16) throw Error(s + S(e));
			if (!e.s) return new m(d);
			for (t == null ? (i = !1, u = h) : u = t, c = new m(.03125); e.abs().gte(.1);) e = e.times(c), p += 5;
			for (r = Math.log(l(2, p)) / Math.LN10 * 2 + 5 | 0, u += r, n = a = o = new m(d), m.precision = u;;) {
				if (a = D(a.times(e), u), n = n.times(++f), c = o.plus(b(a, n, u)), y(c.d).slice(0, u) === y(o.d).slice(0, u)) {
					for (; p--;) o = D(o.times(o), u);
					return m.precision = h, t == null ? (i = !0, D(o, h)) : o;
				}
				o = c;
			}
		}
		function S(e) {
			for (var t = e.e * p, n = e.d[0]; n >= 10; n /= 10) t++;
			return t;
		}
		function C(e, t, n) {
			if (t > e.LN10.sd()) throw i = !0, n && (e.precision = n), Error(a + "LN10 precision limit exceeded");
			return D(new e(e.LN10), t);
		}
		function w(e) {
			for (var t = ""; e--;) t += "0";
			return t;
		}
		function T(e, t) {
			var n, r, o, s, c, l, u, f, p, m = 1, h = 10, g = e, _ = g.d, v = g.constructor, x = v.precision;
			if (g.s < 1) throw Error(a + (g.s ? "NaN" : "-Infinity"));
			if (g.eq(d)) return new v(0);
			if (t == null ? (i = !1, f = x) : f = t, g.eq(10)) return t ?? (i = !0), C(v, f);
			if (f += h, v.precision = f, n = y(_), r = n.charAt(0), s = S(g), Math.abs(s) < 0x5543df729c000) {
				for (; r < 7 && r != 1 || r == 1 && n.charAt(1) > 3;) g = g.times(e), n = y(g.d), r = n.charAt(0), m++;
				s = S(g), r > 1 ? (g = new v("0." + n), s++) : g = new v(r + "." + n.slice(1));
			} else return u = C(v, f + 2, x).times(s + ""), g = T(new v(r + "." + n.slice(1)), f - h).plus(u), v.precision = x, t == null ? (i = !0, D(g, x)) : g;
			for (l = c = g = b(g.minus(d), g.plus(d), f), p = D(g.times(g), f), o = 3;;) {
				if (c = D(c.times(p), f), u = l.plus(b(c, new v(o), f)), y(u.d).slice(0, f) === y(l.d).slice(0, f)) return l = l.times(2), s !== 0 && (l = l.plus(C(v, f + 2, x).times(s + ""))), l = b(l, new v(m), f), v.precision = x, t == null ? (i = !0, D(l, x)) : l;
				l = u, o += 2;
			}
		}
		function E(e, t) {
			var n, r, a;
			for ((n = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (r = t.search(/e/i)) > 0 ? (n < 0 && (n = r), n += +t.slice(r + 1), t = t.substring(0, r)) : n < 0 && (n = t.length), r = 0; t.charCodeAt(r) === 48;) ++r;
			for (a = t.length; t.charCodeAt(a - 1) === 48;) --a;
			if (t = t.slice(r, a), t) {
				if (a -= r, n = n - r - 1, e.e = c(n / p), e.d = [], r = (n + 1) % p, n < 0 && (r += p), r < a) {
					for (r && e.d.push(+t.slice(0, r)), a -= p; r < a;) e.d.push(+t.slice(r, r += p));
					t = t.slice(r), r = p - t.length;
				} else r -= a;
				for (; r--;) t += "0";
				if (e.d.push(+t), i && (e.e > h || e.e < -h)) throw Error(s + n);
			} else e.s = 0, e.e = 0, e.d = [0];
			return e;
		}
		function D(e, t, n) {
			var r, a, o, u, d, m, g, _, v = e.d;
			for (u = 1, o = v[0]; o >= 10; o /= 10) u++;
			if (r = t - u, r < 0) r += p, a = t, g = v[_ = 0];
			else {
				if (_ = Math.ceil((r + 1) / p), o = v.length, _ >= o) return e;
				for (g = o = v[_], u = 1; o >= 10; o /= 10) u++;
				r %= p, a = r - p + u;
			}
			if (n !== void 0 && (o = l(10, u - a - 1), d = g / o % 10 | 0, m = t < 0 || v[_ + 1] !== void 0 || g % o, m = n < 4 ? (d || m) && (n == 0 || n == (e.s < 0 ? 3 : 2)) : d > 5 || d == 5 && (n == 4 || m || n == 6 && (r > 0 ? a > 0 ? g / l(10, u - a) : 0 : v[_ - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7))), t < 1 || !v[0]) return m ? (o = S(e), v.length = 1, t = t - o - 1, v[0] = l(10, (p - t % p) % p), e.e = c(-t / p) || 0) : (v.length = 1, v[0] = e.e = e.s = 0), e;
			if (r == 0 ? (v.length = _, o = 1, _--) : (v.length = _ + 1, o = l(10, p - r), v[_] = a > 0 ? (g / l(10, u - a) % l(10, a) | 0) * o : 0), m) for (;;) if (_ == 0) {
				(v[0] += o) == f && (v[0] = 1, ++e.e);
				break;
			} else {
				if (v[_] += o, v[_] != f) break;
				v[_--] = 0, o = 1;
			}
			for (r = v.length; v[--r] === 0;) v.pop();
			if (i && (e.e > h || e.e < -h)) throw Error(s + S(e));
			return e;
		}
		function O(e, t) {
			var n, r, a, o, s, c, l, u, d, m, h = e.constructor, g = h.precision;
			if (!e.s || !t.s) return t.s ? t.s = -t.s : t = new h(e), i ? D(t, g) : t;
			if (l = e.d, m = t.d, r = t.e, u = e.e, l = l.slice(), s = u - r, s) {
				for (d = s < 0, d ? (n = l, s = -s, c = m.length) : (n = m, r = u, c = l.length), a = Math.max(Math.ceil(g / p), c) + 2, s > a && (s = a, n.length = 1), n.reverse(), a = s; a--;) n.push(0);
				n.reverse();
			} else {
				for (a = l.length, c = m.length, d = a < c, d && (c = a), a = 0; a < c; a++) if (l[a] != m[a]) {
					d = l[a] < m[a];
					break;
				}
				s = 0;
			}
			for (d && (n = l, l = m, m = n, t.s = -t.s), c = l.length, a = m.length - c; a > 0; --a) l[c++] = 0;
			for (a = m.length; a > s;) {
				if (l[--a] < m[a]) {
					for (o = a; o && l[--o] === 0;) l[o] = f - 1;
					--l[o], l[a] += f;
				}
				l[a] -= m[a];
			}
			for (; l[--c] === 0;) l.pop();
			for (; l[0] === 0; l.shift()) --r;
			return l[0] ? (t.d = l, t.e = r, i ? D(t, g) : t) : new h(0);
		}
		function k(e, t, n) {
			var r, i = S(e), a = y(e.d), o = a.length;
			return t ? (n && (r = n - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + w(r) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + w(-i - 1) + a, n && (r = n - o) > 0 && (a += w(r))) : i >= o ? (a += w(i + 1 - o), n && (r = n - i - 1) > 0 && (a = a + "." + w(r))) : ((r = i + 1) < o && (a = a.slice(0, r) + "." + a.slice(r)), n && (r = n - o) > 0 && (i + 1 === o && (a += "."), a += w(r))), e.s < 0 ? "-" + a : a;
		}
		function A(e, t) {
			if (e.length > t) return e.length = t, !0;
		}
		function j(e) {
			var t, n, r;
			function i(e) {
				var t = this;
				if (!(t instanceof i)) return new i(e);
				if (t.constructor = i, e instanceof i) t.s = e.s, t.e = e.e, t.d = (e = e.d) ? e.slice() : e;
				else {
					if (typeof e == "number") {
						if (e * 0 != 0) throw Error(o + e);
						if (e > 0) t.s = 1;
						else if (e < 0) e = -e, t.s = -1;
						else {
							t.s = 0, t.e = 0, t.d = [0];
							return;
						}
						if (e === ~~e && e < 1e7) {
							t.e = 0, t.d = [e];
							return;
						}
						return E(t, e.toString());
					}
					if (typeof e != "string") throw Error(o + e);
					if (e.charCodeAt(0) === 45 ? (e = e.slice(1), t.s = -1) : t.s = 1, u.test(e)) E(t, e);
					else throw Error(o + e);
				}
			}
			if (i.prototype = g, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = j, i.config = i.set = M, e === void 0 && (e = {}), e) for (r = [
				"precision",
				"rounding",
				"toExpNeg",
				"toExpPos",
				"LN10"
			], t = 0; t < r.length;) e.hasOwnProperty(n = r[t++]) || (e[n] = this[n]);
			return i.config(e), i;
		}
		function M(e) {
			if (!e || typeof e != "object") throw Error(a + "Object expected");
			var t, r, i, s = [
				"precision",
				1,
				n,
				"rounding",
				0,
				8,
				"toExpNeg",
				-1 / 0,
				0,
				"toExpPos",
				0,
				1 / 0
			];
			for (t = 0; t < s.length; t += 3) if ((i = e[r = s[t]]) !== void 0) {
				if (c(i) === i && i >= s[t + 1] && i <= s[t + 2]) this[r] = i;
				else throw Error(o + r + ": " + i);
			}
			if ((i = e[r = "LN10"]) !== void 0) {
				if (i == Math.LN10) this[r] = new this(i);
				else throw Error(o + r + ": " + i);
			}
			return this;
		}
		r = j(r), r.default = r.Decimal = r, d = new r(1), typeof define == "function" && define.amd ? define(function() {
			return r;
		}) : t !== void 0 && t.exports ? t.exports = r : (e ||= typeof self < "u" && self && self.self == self ? self : Function("return this")(), e.Decimal = r);
	})(e);
})))());
function oh(e) {
	return e === 0 ? 1 : Math.floor(new J.default(e).abs().log(10).toNumber()) + 1;
}
function sh(e, t, n) {
	for (var r = new J.default(e), i = 0, a = []; r.lt(t) && i < 1e5;) a.push(r.toNumber()), r = r.add(n), i++;
	return a;
}
//#endregion
//#region node_modules/recharts/es6/util/scale/getNiceTickValues.js
function ch(e, t) {
	return ph(e) || fh(e, t) || uh(e, t) || lh();
}
function lh() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function uh(e, t) {
	if (e) {
		if (typeof e == "string") return dh(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? dh(e, t) : void 0;
	}
}
function dh(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function fh(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function ph(e) {
	if (Array.isArray(e)) return e;
}
var mh = (e) => {
	var t = ch(e, 2), n = t[0], r = t[1], i = n, a = r;
	return n > r && (i = r, a = n), [i, a];
}, hh = (e, t, n) => {
	if (e.lte(0)) return new J.default(0);
	var r = oh(e.toNumber()), i = new J.default(10).pow(r), a = e.div(i), o = r === 1 ? .1 : .05, s = new J.default(Math.ceil(a.div(o).toNumber())).add(n).mul(o).mul(i);
	return t ? new J.default(s.toNumber()) : new J.default(Math.ceil(s.toNumber()));
}, gh = (e, t, n) => {
	if (e.lte(0)) return new J.default(0);
	var r = [
		1,
		2,
		2.5,
		5
	], i = e.toNumber(), a = Math.floor(new J.default(i).abs().log(10).toNumber()), o = new J.default(10).pow(a), s = e.div(o).toNumber(), c = r.findIndex((e) => e >= s - 1e-10);
	if (c === -1 && (o = o.mul(10), c = 0), c += n, c >= r.length) {
		var l = Math.floor(c / r.length);
		c %= r.length, o = o.mul(new J.default(10).pow(l));
	}
	var u = r[c] ?? 1, d = new J.default(u).mul(o);
	return t ? d : new J.default(Math.ceil(d.toNumber()));
}, _h = (e, t, n) => {
	var r = new J.default(1), i = new J.default(e);
	if (!i.isint() && n) {
		var a = Math.abs(e);
		a < 1 ? (r = new J.default(10).pow(oh(e) - 1), i = new J.default(Math.floor(i.div(r).toNumber())).mul(r)) : a > 1 && (i = new J.default(Math.floor(e)));
	} else e === 0 ? i = new J.default(Math.floor((t - 1) / 2)) : n || (i = new J.default(Math.floor(e)));
	for (var o = Math.floor((t - 1) / 2), s = [], c = 0; c < t; c++) s.push(i.add(new J.default(c - o).mul(r)).toNumber());
	return s;
}, vh = function(e, t, n, r) {
	var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : hh;
	if (!Number.isFinite((t - e) / (n - 1))) return {
		step: new J.default(0),
		tickMin: new J.default(0),
		tickMax: new J.default(0)
	};
	var o = a(new J.default(t).sub(e).div(n - 1), r, i), s;
	e <= 0 && t >= 0 ? s = new J.default(0) : (s = new J.default(e).add(t).div(2), s = s.sub(new J.default(s).mod(o)));
	var c = Math.ceil(s.sub(e).div(o).toNumber()), l = Math.ceil(new J.default(t).sub(s).div(o).toNumber()), u = c + l + 1;
	return u > n ? vh(e, t, n, r, i + 1, a) : (u < n && (l = t > 0 ? l + (n - u) : l, c = t > 0 ? c : c + (n - u)), {
		step: o,
		tickMin: s.sub(new J.default(c).mul(o)),
		tickMax: s.add(new J.default(l).mul(o))
	});
}, yh = function(e) {
	var t = ch(e, 2), n = t[0], r = t[1], i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = Math.max(i, 2), c = ch(mh([n, r]), 2), l = c[0], u = c[1];
	if (l === -Infinity || u === Infinity) {
		var d = u === Infinity ? [l, ...Array(i - 1).fill(Infinity)] : [...Array(i - 1).fill(-Infinity), u];
		return n > r ? d.reverse() : d;
	}
	if (l === u) return _h(l, i, a);
	var f = vh(l, u, s, a, 0, o === "snap125" ? gh : hh), p = f.step, m = f.tickMin, h = f.tickMax, g = sh(m, h.add(new J.default(.1).mul(p)), p);
	return n > r ? g.reverse() : g;
}, bh = function(e, t) {
	var n = ch(e, 2), r = n[0], i = n[1], a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = ch(mh([r, i]), 2), c = s[0], l = s[1];
	if (c === -Infinity || l === Infinity) return [r, i];
	if (c === l) return [c];
	var u = o === "snap125" ? gh : hh, d = Math.max(t, 2), f = u(new J.default(l).sub(c).div(d - 1), a, 0), p = [...sh(new J.default(c), new J.default(l), f), l];
	if (a === !1) {
		p = p.map((e) => Math.round(e));
		var m = p.length - 1;
		m > 0 && p[m] === p[m - 1] && (p = p.slice(0, m));
	}
	return r > i ? p.reverse() : p;
}, xh = (e) => e.rootProps.maxBarSize, Sh = (e) => e.rootProps.barGap, Ch = (e) => e.rootProps.barCategoryGap, wh = (e) => e.rootProps.barSize, Th = (e) => e.rootProps.stackOffset, Eh = (e) => e.rootProps.reverseStackOrder, Dh = (e) => e.options.chartName, Oh = (e) => e.rootProps.syncId, kh = (e) => e.rootProps.syncMethod, Ah = (e) => e.options.eventEmitter, jh = (e) => e.rootProps.baseValue, Y = {
	grid: -100,
	barBackground: -50,
	area: 100,
	cursorRectangle: 200,
	bar: 300,
	line: 400,
	axis: 500,
	scatter: 600,
	activeBar: 1e3,
	cursorLine: 1100,
	activeDot: 1200,
	label: 2e3
}, Mh = {
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	allowDataOverflow: !1,
	angle: 0,
	angleAxisId: 0,
	axisLine: !0,
	axisLineType: "polygon",
	cx: 0,
	cy: 0,
	hide: !1,
	includeHidden: !1,
	label: !1,
	niceTicks: "auto",
	orientation: "outer",
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickLine: !0,
	tickSize: 8,
	type: "auto",
	zIndex: Y.axis
}, Nh = {
	allowDataOverflow: !1,
	allowDecimals: !1,
	allowDuplicatedCategory: !0,
	angle: 0,
	axisLine: !0,
	includeHidden: !1,
	hide: !1,
	niceTicks: "auto",
	label: !1,
	orientation: "right",
	radiusAxisId: 0,
	reversed: !1,
	scale: "auto",
	stroke: "#ccc",
	tick: !0,
	tickCount: 5,
	tickLine: !0,
	type: "auto",
	zIndex: Y.axis
}, Ph = (e, t) => {
	if (e && t) return e != null && e.reversed ? [t[1], t[0]] : t;
};
//#endregion
//#region node_modules/recharts/es6/util/getAxisTypeBasedOnLayout.js
function Fh(e, t, n) {
	if (n !== "auto") return n;
	if (e != null) return Jc(e, t) ? "category" : "number";
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/polarAxisSelectors.js
function Ih(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Lh(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ih(Object(n), !0).forEach(function(t) {
			Rh(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ih(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Rh(e, t, n) {
	return (t = zh(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function zh(e) {
	var t = Bh(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Bh(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Vh = {
	allowDataOverflow: Mh.allowDataOverflow,
	allowDecimals: Mh.allowDecimals,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	domain: void 0,
	id: Mh.angleAxisId,
	includeHidden: !1,
	name: void 0,
	reversed: Mh.reversed,
	scale: Mh.scale,
	tick: Mh.tick,
	tickCount: void 0,
	ticks: void 0,
	type: Mh.type,
	unit: void 0,
	niceTicks: "auto"
}, Hh = {
	allowDataOverflow: Nh.allowDataOverflow,
	allowDecimals: Nh.allowDecimals,
	allowDuplicatedCategory: Nh.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: Nh.radiusAxisId,
	includeHidden: Nh.includeHidden,
	name: void 0,
	reversed: Nh.reversed,
	scale: Nh.scale,
	tick: Nh.tick,
	tickCount: Nh.tickCount,
	ticks: void 0,
	type: Nh.type,
	unit: void 0,
	niceTicks: "auto"
}, Uh = H([(e, t) => {
	if (t != null) return e.polarAxis.angleAxis[t];
}, Tu], (e, t) => {
	if (e != null) return e;
	var n = Fh(t, "angleAxis", Vh.type) ?? "category";
	return Lh(Lh({}, Vh), {}, { type: n });
}), Wh = H([(e, t) => e.polarAxis.radiusAxis[t], Tu], (e, t) => {
	if (e != null) return e;
	var n = Fh(t, "radiusAxis", Hh.type) ?? "category";
	return Lh(Lh({}, Hh), {}, { type: n });
}), Gh = (e) => e.polarOptions, Kh = H([
	ml,
	hl,
	jl
], _m), qh = H([Gh, Kh], (e, t) => {
	if (e != null) return bt(e.innerRadius, t, 0);
}), Jh = H([Gh, Kh], (e, t) => {
	if (e != null) return bt(e.outerRadius, t, t * .8);
}), Yh = H([Gh], (e) => e == null ? [0, 0] : [e.startAngle, e.endAngle]), Xh = H([Uh, Yh], Ph), Zh = H([
	Kh,
	qh,
	Jh
], (e, t, n) => {
	if (e != null && t != null && n != null) return [t, n];
}), Qh = H([Wh, Zh], Ph), $h = H([
	q,
	Gh,
	qh,
	Jh,
	ml,
	hl
], (e, t, n, r, i, a) => {
	if (!(e !== "centric" && e !== "radial" || t == null || n == null || r == null)) {
		var o = t.cx, s = t.cy, c = t.startAngle, l = t.endAngle;
		return {
			cx: bt(o, i, i / 2),
			cy: bt(s, a, a / 2),
			innerRadius: n,
			outerRadius: r,
			startAngle: c,
			endAngle: l,
			clockWise: !1
		};
	}
}), X = (e, t) => t, eg = (e, t, n) => n;
//#endregion
//#region node_modules/recharts/es6/util/stacks/getStackSeriesIdentifier.js
function tg(e) {
	return e?.id;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineDisplayedStackedData.js
function ng(e, t, n) {
	var r = t.chartData, i = r === void 0 ? [] : r, a = n.allowDuplicatedCategory, o = n.dataKey, s = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		var t = e.data ?? i;
		if (t != null && t.length !== 0) {
			var n = tg(e);
			t.forEach((t, r) => {
				var i = o == null || a ? r : String(K(t, o, null)), c = K(t, e.dataKey, 0), l = s.has(i) ? s.get(i) : {};
				Object.assign(l, { [n]: c }), s.set(i, l);
			});
		}
	}), Array.from(s.values());
}
//#endregion
//#region node_modules/recharts/es6/state/types/StackedGraphicalItem.js
function rg(e) {
	return "stackId" in e && e.stackId != null && e.dataKey != null;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/numberDomainEqualityCheck.js
var ig = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
//#endregion
//#region node_modules/recharts/es6/state/selectors/arrayEqualityCheck.js
function ag(e, t) {
	return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function og(e, t) {
	if (e.length === t.length) {
		for (var n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipAxisType.js
var sg = (e) => {
	var t = q(e);
	return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, cg = (e) => e.tooltip.settings.axisId;
//#endregion
//#region node_modules/recharts/es6/util/scale/RechartsScale.js
function lg(e) {
	if (e != null) {
		var t = e.ticks, n = e.bandwidth, r = e.range(), i = [Math.min(...r), Math.max(...r)];
		return {
			domain: () => e.domain(),
			range: function(e) {
				function t() {
					return e.apply(this, arguments);
				}
				return t.toString = function() {
					return e.toString();
				}, t;
			}(() => i),
			rangeMin: () => i[0],
			rangeMax: () => i[1],
			isInRange(e) {
				var t = i[0], n = i[1];
				return t <= n ? e >= t && e <= n : e >= n && e <= t;
			},
			bandwidth: n ? () => n.call(e) : void 0,
			ticks: t ? (n) => t.call(e, n) : void 0,
			map: (t, n) => {
				var r = e(t);
				if (r != null) {
					if (e.bandwidth && n != null && n.position) {
						var i = e.bandwidth();
						switch (n.position) {
							case "middle":
								r += i / 2;
								break;
							case "end": r += i;
						}
					}
					return r;
				}
			}
		};
	}
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineCheckedDomain.js
var ug = (e, t) => {
	if (t != null) switch (e) {
		case "linear":
			if (!nh(t)) {
				for (var n, r, i = 0; i < t.length; i++) {
					var a = t[i];
					G(a) && ((n === void 0 || a < n) && (n = a), (r === void 0 || a > r) && (r = a));
				}
				return n !== void 0 && r !== void 0 ? [n, r] : void 0;
			}
			return t;
		default: return t;
	}
};
//#endregion
//#region node_modules/d3-scale/src/init.js
function dg(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default: this.range(t).domain(e);
	}
	return this;
}
function fg(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			typeof e == "function" ? this.interpolator(e) : this.range(e);
			break;
		default: this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
	}
	return this;
}
//#endregion
//#region node_modules/d3-scale/src/ordinal.js
var pg = Symbol("implicit");
function mg() {
	var e = new ye(), t = [], n = [], r = pg;
	function i(i) {
		let a = e.get(i);
		if (a === void 0) {
			if (r !== pg) return r;
			e.set(i, a = t.push(i) - 1);
		}
		return n[a % n.length];
	}
	return i.domain = function(n) {
		if (!arguments.length) return t.slice();
		t = [], e = new ye();
		for (let r of n) e.has(r) || e.set(r, t.push(r) - 1);
		return i;
	}, i.range = function(e) {
		return arguments.length ? (n = Array.from(e), i) : n.slice();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return mg(t, n).unknown(r);
	}, dg.apply(i, arguments), i;
}
//#endregion
//#region node_modules/d3-scale/src/band.js
function hg() {
	var e = mg().unknown(void 0), t = e.domain, n = e.range, r = 0, i = 1, a, o, s = !1, c = 0, l = 0, u = .5;
	delete e.unknown;
	function d() {
		var e = t().length, d = i < r, f = d ? i : r, p = d ? r : i;
		a = (p - f) / Math.max(1, e - c + l * 2), s && (a = Math.floor(a)), f += (p - f - a * (e - c)) * u, o = a * (1 - c), s && (f = Math.round(f), o = Math.round(o));
		var m = Pe(e).map(function(e) {
			return f + a * e;
		});
		return n(d ? m.reverse() : m);
	}
	return e.domain = function(e) {
		return arguments.length ? (t(e), d()) : t();
	}, e.range = function(e) {
		return arguments.length ? ([r, i] = e, r = +r, i = +i, d()) : [r, i];
	}, e.rangeRound = function(e) {
		return [r, i] = e, r = +r, i = +i, s = !0, d();
	}, e.bandwidth = function() {
		return o;
	}, e.step = function() {
		return a;
	}, e.round = function(e) {
		return arguments.length ? (s = !!e, d()) : s;
	}, e.padding = function(e) {
		return arguments.length ? (c = Math.min(1, l = +e), d()) : c;
	}, e.paddingInner = function(e) {
		return arguments.length ? (c = Math.min(1, e), d()) : c;
	}, e.paddingOuter = function(e) {
		return arguments.length ? (l = +e, d()) : l;
	}, e.align = function(e) {
		return arguments.length ? (u = Math.max(0, Math.min(1, e)), d()) : u;
	}, e.copy = function() {
		return hg(t(), [r, i]).round(s).paddingInner(c).paddingOuter(l).align(u);
	}, dg.apply(d(), arguments);
}
function gg(e) {
	var t = e.copy;
	return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
		return gg(t());
	}, e;
}
function _g() {
	return gg(hg.apply(null, arguments).paddingInner(1));
}
//#endregion
//#region node_modules/d3-color/src/define.js
function vg(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function yg(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
//#endregion
//#region node_modules/d3-color/src/color.js
function bg() {}
var xg = .7, Sg = 1 / xg, Cg = "\\s*([+-]?\\d+)\\s*", wg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Tg = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Eg = /^#([0-9a-f]{3,8})$/, Dg = RegExp(`^rgb\\(${Cg},${Cg},${Cg}\\)$`), Og = RegExp(`^rgb\\(${Tg},${Tg},${Tg}\\)$`), kg = RegExp(`^rgba\\(${Cg},${Cg},${Cg},${wg}\\)$`), Ag = RegExp(`^rgba\\(${Tg},${Tg},${Tg},${wg}\\)$`), jg = RegExp(`^hsl\\(${wg},${Tg},${Tg}\\)$`), Mg = RegExp(`^hsla\\(${wg},${Tg},${Tg},${wg}\\)$`), Ng = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
vg(bg, Rg, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Pg,
	formatHex: Pg,
	formatHex8: Fg,
	formatHsl: Ig,
	formatRgb: Lg,
	toString: Lg
});
function Pg() {
	return this.rgb().formatHex();
}
function Fg() {
	return this.rgb().formatHex8();
}
function Ig() {
	return Zg(this).formatHsl();
}
function Lg() {
	return this.rgb().formatRgb();
}
function Rg(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Eg.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? zg(t) : n === 3 ? new Ug(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Bg(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Bg(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Dg.exec(e)) ? new Ug(t[1], t[2], t[3], 1) : (t = Og.exec(e)) ? new Ug(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = kg.exec(e)) ? Bg(t[1], t[2], t[3], t[4]) : (t = Ag.exec(e)) ? Bg(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = jg.exec(e)) ? Xg(t[1], t[2] / 100, t[3] / 100, 1) : (t = Mg.exec(e)) ? Xg(t[1], t[2] / 100, t[3] / 100, t[4]) : Ng.hasOwnProperty(e) ? zg(Ng[e]) : e === "transparent" ? new Ug(NaN, NaN, NaN, 0) : null;
}
function zg(e) {
	return new Ug(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Bg(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new Ug(e, t, n, r);
}
function Vg(e) {
	return e instanceof bg || (e = Rg(e)), e ? (e = e.rgb(), new Ug(e.r, e.g, e.b, e.opacity)) : new Ug();
}
function Hg(e, t, n, r) {
	return arguments.length === 1 ? Vg(e) : new Ug(e, t, n, r ?? 1);
}
function Ug(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
vg(Ug, Hg, yg(bg, {
	brighter(e) {
		return e = e == null ? Sg : Sg ** +e, new Ug(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? xg : xg ** +e, new Ug(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Ug(Jg(this.r), Jg(this.g), Jg(this.b), qg(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: Wg,
	formatHex: Wg,
	formatHex8: Gg,
	formatRgb: Kg,
	toString: Kg
}));
function Wg() {
	return `#${Yg(this.r)}${Yg(this.g)}${Yg(this.b)}`;
}
function Gg() {
	return `#${Yg(this.r)}${Yg(this.g)}${Yg(this.b)}${Yg((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Kg() {
	let e = qg(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${Jg(this.r)}, ${Jg(this.g)}, ${Jg(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function qg(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Jg(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Yg(e) {
	return e = Jg(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Xg(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new $g(e, t, n, r);
}
function Zg(e) {
	if (e instanceof $g) return new $g(e.h, e.s, e.l, e.opacity);
	if (e instanceof bg || (e = Rg(e)), !e) return new $g();
	if (e instanceof $g) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new $g(o, s, c, e.opacity);
}
function Qg(e, t, n, r) {
	return arguments.length === 1 ? Zg(e) : new $g(e, t, n, r ?? 1);
}
function $g(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
vg($g, Qg, yg(bg, {
	brighter(e) {
		return e = e == null ? Sg : Sg ** +e, new $g(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? xg : xg ** +e, new $g(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new Ug(n_(e >= 240 ? e - 240 : e + 120, i, r), n_(e, i, r), n_(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new $g(e_(this.h), t_(this.s), t_(this.l), qg(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = qg(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${e_(this.h)}, ${t_(this.s) * 100}%, ${t_(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function e_(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function t_(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function n_(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
//#endregion
//#region node_modules/d3-interpolate/src/constant.js
var r_ = (e) => () => e;
//#endregion
//#region node_modules/d3-interpolate/src/color.js
function i_(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function a_(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function o_(e) {
	return (e = +e) == 1 ? s_ : function(t, n) {
		return n - t ? a_(t, n, e) : r_(isNaN(t) ? n : t);
	};
}
function s_(e, t) {
	var n = t - e;
	return n ? i_(e, n) : r_(isNaN(e) ? t : e);
}
//#endregion
//#region node_modules/d3-interpolate/src/rgb.js
var c_ = (function e(t) {
	var n = o_(t);
	function r(e, t) {
		var r = n((e = Hg(e)).r, (t = Hg(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = s_(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
//#endregion
//#region node_modules/d3-interpolate/src/numberArray.js
function l_(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function u_(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
//#endregion
//#region node_modules/d3-interpolate/src/array.js
function d_(e, t) {
	for (var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o = 0; o < r; ++o) i[o] = b_(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/date.js
function f_(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/number.js
function p_(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/object.js
function m_(e, t) {
	var n = {}, r = {}, i;
	for (i in (typeof e != "object" || !e) && (e = {}), (typeof t != "object" || !t) && (t = {}), t) i in e ? n[i] = b_(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/string.js
var h_ = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, g_ = new RegExp(h_.source, "g");
function __(e) {
	return function() {
		return e;
	};
}
function v_(e) {
	return function(t) {
		return e(t) + "";
	};
}
function y_(e, t) {
	var n = h_.lastIndex = g_.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = h_.exec(e)) && (i = g_.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: p_(r, i)
	})), n = g_.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? v_(c[0].x) : __(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
//#endregion
//#region node_modules/d3-interpolate/src/value.js
function b_(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? r_(t) : (n === "number" ? p_ : n === "string" ? (r = Rg(t)) ? (t = r, c_) : y_ : t instanceof Rg ? c_ : t instanceof Date ? f_ : u_(t) ? l_ : Array.isArray(t) ? d_ : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? m_ : p_)(e, t);
}
//#endregion
//#region node_modules/d3-interpolate/src/round.js
function x_(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
//#endregion
//#region node_modules/d3-interpolate/src/piecewise.js
function S_(e, t) {
	t === void 0 && (t = e, e = b_);
	for (var n = 0, r = t.length - 1, i = t[0], a = Array(r < 0 ? 0 : r); n < r;) a[n] = e(i, i = t[++n]);
	return function(e) {
		var t = Math.max(0, Math.min(r - 1, Math.floor(e *= r)));
		return a[t](e - t);
	};
}
//#endregion
//#region node_modules/d3-scale/src/constant.js
function C_(e) {
	return function() {
		return e;
	};
}
//#endregion
//#region node_modules/d3-scale/src/number.js
function w_(e) {
	return +e;
}
//#endregion
//#region node_modules/d3-scale/src/continuous.js
var T_ = [0, 1];
function E_(e) {
	return e;
}
function D_(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : C_(isNaN(t) ? NaN : .5);
}
function O_(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function k_(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = D_(i, r), a = n(o, a)) : (r = D_(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function A_(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = D_(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = ve(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function j_(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function M_() {
	var e = T_, t = T_, n = b_, r, i, a, o = E_, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== E_ && (o = O_(e[0], e[n - 1])), s = n > 2 ? A_ : k_, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), p_))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, w_), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = x_, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : E_, u()) : o !== E_;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function N_() {
	return M_()(E_, E_);
}
//#endregion
//#region node_modules/d3-format/src/formatDecimal.js
function P_(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function F_(e, t) {
	if (!isFinite(e) || e === 0) return null;
	var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
//#endregion
//#region node_modules/d3-format/src/exponent.js
function I_(e) {
	return e = F_(Math.abs(e)), e ? e[1] : NaN;
}
//#endregion
//#region node_modules/d3-format/src/formatGroup.js
function L_(e, t) {
	return function(n, r) {
		for (var i = n.length, a = [], o = 0, s = e[0], c = 0; i > 0 && s > 0 && (c + s + 1 > r && (s = Math.max(1, r - c)), a.push(n.substring(i -= s, i + s)), !((c += s + 1) > r));) s = e[o = (o + 1) % e.length];
		return a.reverse().join(t);
	};
}
//#endregion
//#region node_modules/d3-format/src/formatNumerals.js
function R_(e) {
	return function(t) {
		return t.replace(/[0-9]/g, function(t) {
			return e[+t];
		});
	};
}
//#endregion
//#region node_modules/d3-format/src/formatSpecifier.js
var z_ = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function B_(e) {
	if (!(t = z_.exec(e))) throw Error("invalid format: " + e);
	var t;
	return new V_({
		fill: t[1],
		align: t[2],
		sign: t[3],
		symbol: t[4],
		zero: t[5],
		width: t[6],
		comma: t[7],
		precision: t[8] && t[8].slice(1),
		trim: t[9],
		type: t[10]
	});
}
B_.prototype = V_.prototype;
function V_(e) {
	this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
V_.prototype.toString = function() {
	return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
//#endregion
//#region node_modules/d3-format/src/formatTrim.js
function H_(e) {
	out: for (var t = e.length, n = 1, r = -1, i; n < t; ++n) switch (e[n]) {
		case ".":
			r = i = n;
			break;
		case "0":
			r === 0 && (r = n), i = n;
			break;
		default:
			if (!+e[n]) break out;
			r > 0 && (r = 0);
	}
	return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
//#endregion
//#region node_modules/d3-format/src/formatPrefixAuto.js
var U_;
function W_(e, t) {
	var n = F_(e, t);
	if (!n) return U_ = void 0, e.toPrecision(t);
	var r = n[0], i = n[1], a = i - (U_ = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + F_(e, Math.max(0, t + a - 1))[0];
}
//#endregion
//#region node_modules/d3-format/src/formatRounded.js
function G_(e, t) {
	var n = F_(e, t);
	if (!n) return e + "";
	var r = n[0], i = n[1];
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
//#endregion
//#region node_modules/d3-format/src/formatTypes.js
var K_ = {
	"%": (e, t) => (e * 100).toFixed(t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: P_,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => e.toFixed(t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => G_(e * 100, t),
	r: G_,
	s: W_,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
};
//#endregion
//#region node_modules/d3-format/src/identity.js
function q_(e) {
	return e;
}
//#endregion
//#region node_modules/d3-format/src/locale.js
var J_ = Array.prototype.map, Y_ = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
];
function X_(e) {
	var t = e.grouping === void 0 || e.thousands === void 0 ? q_ : L_(J_.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? q_ : R_(J_.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", s = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
	function l(e, l) {
		e = B_(e);
		var u = e.fill, d = e.align, f = e.sign, p = e.symbol, m = e.zero, h = e.width, g = e.comma, _ = e.precision, v = e.trim, y = e.type;
		y === "n" ? (g = !0, y = "g") : K_[y] || (_ === void 0 && (_ = 12), v = !0, y = "g"), (m || u === "0" && d === "=") && (m = !0, u = "0", d = "=");
		var b = (l && l.prefix !== void 0 ? l.prefix : "") + (p === "$" ? n : p === "#" && /[boxX]/.test(y) ? "0" + y.toLowerCase() : ""), x = (p === "$" ? r : /[%p]/.test(y) ? o : "") + (l && l.suffix !== void 0 ? l.suffix : ""), S = K_[y], C = /[defgprs%]/.test(y);
		_ = _ === void 0 ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, _)) : Math.max(0, Math.min(20, _));
		function w(e) {
			var n = b, r = x, o, l, p;
			if (y === "c") r = S(e) + r, e = "";
			else {
				e = +e;
				var w = e < 0 || 1 / e < 0;
				if (e = isNaN(e) ? c : S(Math.abs(e), _), v && (e = H_(e)), w && +e == 0 && f !== "+" && (w = !1), n = (w ? f === "(" ? f : s : f === "-" || f === "(" ? "" : f) + n, r = (y === "s" && !isNaN(e) && U_ !== void 0 ? Y_[8 + U_ / 3] : "") + r + (w && f === "(" ? ")" : ""), C) {
					for (o = -1, l = e.length; ++o < l;) if (p = e.charCodeAt(o), 48 > p || p > 57) {
						r = (p === 46 ? i + e.slice(o + 1) : e.slice(o)) + r, e = e.slice(0, o);
						break;
					}
				}
			}
			g && !m && (e = t(e, Infinity));
			var T = n.length + e.length + r.length, E = T < h ? Array(h - T + 1).join(u) : "";
			switch (g && m && (e = t(E + e, E.length ? h - r.length : Infinity), E = ""), d) {
				case "<":
					e = n + e + r + E;
					break;
				case "=":
					e = n + E + e + r;
					break;
				case "^":
					e = E.slice(0, T = E.length >> 1) + n + e + r + E.slice(T);
					break;
				default: e = E + n + e + r;
			}
			return a(e);
		}
		return w.toString = function() {
			return e + "";
		}, w;
	}
	function u(e, t) {
		var n = Math.max(-8, Math.min(8, Math.floor(I_(t) / 3))) * 3, r = 10 ** -n, i = l((e = B_(e), e.type = "f", e), { suffix: Y_[8 + n / 3] });
		return function(e) {
			return i(r * e);
		};
	}
	return {
		format: l,
		formatPrefix: u
	};
}
//#endregion
//#region node_modules/d3-format/src/defaultLocale.js
var Z_, Q_, $_;
ev({
	thousands: ",",
	grouping: [3],
	currency: ["$", ""]
});
function ev(e) {
	return Z_ = X_(e), Q_ = Z_.format, $_ = Z_.formatPrefix, Z_;
}
//#endregion
//#region node_modules/d3-format/src/precisionFixed.js
function tv(e) {
	return Math.max(0, -I_(Math.abs(e)));
}
//#endregion
//#region node_modules/d3-format/src/precisionPrefix.js
function nv(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(I_(t) / 3))) * 3 - I_(Math.abs(e)));
}
//#endregion
//#region node_modules/d3-format/src/precisionRound.js
function rv(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, I_(t) - I_(e)) + 1;
}
//#endregion
//#region node_modules/d3-scale/src/tickFormat.js
function iv(e, t, n, r) {
	var i = ke(e, t, n), a;
	switch (r = B_(r ?? ",f"), r.type) {
		case "s":
			var o = Math.max(Math.abs(e), Math.abs(t));
			return r.precision == null && !isNaN(a = nv(i, o)) && (r.precision = a), $_(r, o);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			r.precision == null && !isNaN(a = rv(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
			break;
		case "f":
		case "%": r.precision == null && !isNaN(a = tv(i)) && (r.precision = a - (r.type === "%") * 2);
	}
	return Q_(r);
}
//#endregion
//#region node_modules/d3-scale/src/linear.js
function av(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return De(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return iv(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = Oe(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function ov() {
	var e = N_();
	return e.copy = function() {
		return j_(e, ov());
	}, dg.apply(e, arguments), av(e);
}
//#endregion
//#region node_modules/d3-scale/src/identity.js
function sv(e) {
	var t;
	function n(e) {
		return e == null || isNaN(e = +e) ? t : e;
	}
	return n.invert = n, n.domain = n.range = function(t) {
		return arguments.length ? (e = Array.from(t, w_), n) : e.slice();
	}, n.unknown = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.copy = function() {
		return sv(e).unknown(t);
	}, e = arguments.length ? Array.from(e, w_) : [0, 1], av(n);
}
//#endregion
//#region node_modules/d3-scale/src/nice.js
function cv(e, t) {
	e = e.slice();
	var n = 0, r = e.length - 1, i = e[n], a = e[r], o;
	return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), e[n] = t.floor(i), e[r] = t.ceil(a), e;
}
//#endregion
//#region node_modules/d3-scale/src/log.js
function lv(e) {
	return Math.log(e);
}
function uv(e) {
	return Math.exp(e);
}
function dv(e) {
	return -Math.log(-e);
}
function fv(e) {
	return -Math.exp(-e);
}
function pv(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function mv(e) {
	return e === 10 ? pv : e === Math.E ? Math.exp : (t) => e ** +t;
}
function hv(e) {
	return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function gv(e) {
	return (t, n) => -e(-t, n);
}
function _v(e) {
	let t = e(lv, uv), n = t.domain, r = 10, i, a;
	function o() {
		return i = hv(r), a = mv(r), n()[0] < 0 ? (i = gv(i), a = gv(a), e(dv, fv)) : e(lv, uv), t;
	}
	return t.base = function(e) {
		return arguments.length ? (r = +e, o()) : r;
	}, t.domain = function(e) {
		return arguments.length ? (n(e), o()) : n();
	}, t.ticks = (e) => {
		let t = n(), o = t[0], s = t[t.length - 1], c = s < o;
		c && ([o, s] = [s, o]);
		let l = i(o), u = i(s), d, f, p = e == null ? 10 : +e, m = [];
		if (!(r % 1) && u - l < p) {
			if (l = Math.floor(l), u = Math.ceil(u), o > 0) {
				for (; l <= u; ++l) for (d = 1; d < r; ++d) if (f = l < 0 ? d / a(-l) : d * a(l), !(f < o)) {
					if (f > s) break;
					m.push(f);
				}
			} else for (; l <= u; ++l) for (d = r - 1; d >= 1; --d) if (f = l > 0 ? d / a(-l) : d * a(l), !(f < o)) {
				if (f > s) break;
				m.push(f);
			}
			m.length * 2 < p && (m = De(o, s, p));
		} else m = De(l, u, Math.min(u - l, p)).map(a);
		return c ? m.reverse() : m;
	}, t.tickFormat = (e, n) => {
		if (e ??= 10, n ??= r === 10 ? "s" : ",", typeof n != "function" && (!(r % 1) && (n = B_(n)).precision == null && (n.trim = !0), n = Q_(n)), e === Infinity) return n;
		let o = Math.max(1, r * e / t.ticks().length);
		return (e) => {
			let t = e / a(Math.round(i(e)));
			return t * r < r - .5 && (t *= r), t <= o ? n(e) : "";
		};
	}, t.nice = () => n(cv(n(), {
		floor: (e) => a(Math.floor(i(e))),
		ceil: (e) => a(Math.ceil(i(e)))
	})), t;
}
function vv() {
	let e = _v(M_()).domain([1, 10]);
	return e.copy = () => j_(e, vv()).base(e.base()), dg.apply(e, arguments), e;
}
//#endregion
//#region node_modules/d3-scale/src/symlog.js
function yv(e) {
	return function(t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function bv(e) {
	return function(t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function xv(e) {
	var t = 1, n = e(yv(t), bv(t));
	return n.constant = function(n) {
		return arguments.length ? e(yv(t = +n), bv(t)) : t;
	}, av(n);
}
function Sv() {
	var e = xv(M_());
	return e.copy = function() {
		return j_(e, Sv()).constant(e.constant());
	}, dg.apply(e, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/pow.js
function Cv(e) {
	return function(t) {
		return t < 0 ? -((-t) ** +e) : t ** +e;
	};
}
function wv(e) {
	return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function Tv(e) {
	return e < 0 ? -e * e : e * e;
}
function Ev(e) {
	var t = e(E_, E_), n = 1;
	function r() {
		return n === 1 ? e(E_, E_) : n === .5 ? e(wv, Tv) : e(Cv(n), Cv(1 / n));
	}
	return t.exponent = function(e) {
		return arguments.length ? (n = +e, r()) : n;
	}, av(t);
}
function Dv() {
	var e = Ev(M_());
	return e.copy = function() {
		return j_(e, Dv()).exponent(e.exponent());
	}, dg.apply(e, arguments), e;
}
function Ov() {
	return Dv.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/d3-scale/src/radial.js
function kv(e) {
	return Math.sign(e) * e * e;
}
function Av(e) {
	return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function jv() {
	var e = N_(), t = [0, 1], n = !1, r;
	function i(t) {
		var i = Av(e(t));
		return isNaN(i) ? r : n ? Math.round(i) : i;
	}
	return i.invert = function(t) {
		return e.invert(kv(t));
	}, i.domain = function(t) {
		return arguments.length ? (e.domain(t), i) : e.domain();
	}, i.range = function(n) {
		return arguments.length ? (e.range((t = Array.from(n, w_)).map(kv)), i) : t.slice();
	}, i.rangeRound = function(e) {
		return i.range(e).round(!0);
	}, i.round = function(e) {
		return arguments.length ? (n = !!e, i) : n;
	}, i.clamp = function(t) {
		return arguments.length ? (e.clamp(t), i) : e.clamp();
	}, i.unknown = function(e) {
		return arguments.length ? (r = e, i) : r;
	}, i.copy = function() {
		return jv(e.domain(), t).round(n).clamp(e.clamp()).unknown(r);
	}, dg.apply(i, arguments), av(i);
}
//#endregion
//#region node_modules/d3-scale/src/quantile.js
function Mv() {
	var e = [], t = [], n = [], r;
	function i() {
		var r = 0, i = Math.max(1, t.length);
		for (n = Array(i - 1); ++r < i;) n[r - 1] = Ne(e, r / i);
		return a;
	}
	function a(e) {
		return e == null || isNaN(e = +e) ? r : t[ve(n, e)];
	}
	return a.invertExtent = function(r) {
		var i = t.indexOf(r);
		return i < 0 ? [NaN, NaN] : [i > 0 ? n[i - 1] : e[0], i < n.length ? n[i] : e[e.length - 1]];
	}, a.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(fe), i();
	}, a.range = function(e) {
		return arguments.length ? (t = Array.from(e), i()) : t.slice();
	}, a.unknown = function(e) {
		return arguments.length ? (r = e, a) : r;
	}, a.quantiles = function() {
		return n.slice();
	}, a.copy = function() {
		return Mv().domain(e).range(t).unknown(r);
	}, dg.apply(a, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/quantize.js
function Nv() {
	var e = 0, t = 1, n = 1, r = [.5], i = [0, 1], a;
	function o(e) {
		return e != null && e <= e ? i[ve(r, e, 0, n)] : a;
	}
	function s() {
		var i = -1;
		for (r = Array(n); ++i < n;) r[i] = ((i + 1) * t - (i - n) * e) / (n + 1);
		return o;
	}
	return o.domain = function(n) {
		return arguments.length ? ([e, t] = n, e = +e, t = +t, s()) : [e, t];
	}, o.range = function(e) {
		return arguments.length ? (n = (i = Array.from(e)).length - 1, s()) : i.slice();
	}, o.invertExtent = function(a) {
		var o = i.indexOf(a);
		return o < 0 ? [NaN, NaN] : o < 1 ? [e, r[0]] : o >= n ? [r[n - 1], t] : [r[o - 1], r[o]];
	}, o.unknown = function(e) {
		return arguments.length && (a = e), o;
	}, o.thresholds = function() {
		return r.slice();
	}, o.copy = function() {
		return Nv().domain([e, t]).range(i).unknown(a);
	}, dg.apply(av(o), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/threshold.js
function Pv() {
	var e = [.5], t = [0, 1], n, r = 1;
	function i(i) {
		return i != null && i <= i ? t[ve(e, i, 0, r)] : n;
	}
	return i.domain = function(n) {
		return arguments.length ? (e = Array.from(n), r = Math.min(e.length, t.length - 1), i) : e.slice();
	}, i.range = function(n) {
		return arguments.length ? (t = Array.from(n), r = Math.min(e.length, t.length - 1), i) : t.slice();
	}, i.invertExtent = function(n) {
		var r = t.indexOf(n);
		return [e[r - 1], e[r]];
	}, i.unknown = function(e) {
		return arguments.length ? (n = e, i) : n;
	}, i.copy = function() {
		return Pv().domain(e).range(t).unknown(n);
	}, dg.apply(i, arguments);
}
//#endregion
//#region node_modules/d3-time/src/interval.js
var Fv = /* @__PURE__ */ new Date(), Iv = /* @__PURE__ */ new Date();
function Lv(e, t, n, r) {
	function i(t) {
		return e(t = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+t)), t;
	}
	return i.floor = (t) => (e(t = /* @__PURE__ */ new Date(+t)), t), i.ceil = (n) => (e(n = /* @__PURE__ */ new Date(n - 1)), t(n, 1), e(n), n), i.round = (e) => {
		let t = i(e), n = i.ceil(e);
		return e - t < n - e ? t : n;
	}, i.offset = (e, n) => (t(e = /* @__PURE__ */ new Date(+e), n == null ? 1 : Math.floor(n)), e), i.range = (n, r, a) => {
		let o = [];
		if (n = i.ceil(n), a = a == null ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
		let s;
		do
			o.push(s = /* @__PURE__ */ new Date(+n)), t(n, a), e(n);
		while (s < n && n < r);
		return o;
	}, i.filter = (n) => Lv((t) => {
		if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
	}, (e, r) => {
		if (e >= e) {
			if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
			else for (; --r >= 0;) for (; t(e, 1), !n(e););
		}
	}), n && (i.count = (t, r) => (Fv.setTime(+t), Iv.setTime(+r), e(Fv), e(Iv), Math.floor(n(Fv, Iv))), i.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0) : i)), i;
}
//#endregion
//#region node_modules/d3-time/src/millisecond.js
var Rv = Lv(() => {}, (e, t) => {
	e.setTime(+e + t);
}, (e, t) => t - e);
Rv.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Lv((t) => {
	t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
	t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : Rv), Rv.range;
//#endregion
//#region node_modules/d3-time/src/duration.js
var zv = 1e3, Bv = zv * 60, Vv = Bv * 60, Hv = Vv * 24, Uv = Hv * 7, Wv = Hv * 30, Gv = Hv * 365, Kv = Lv((e) => {
	e.setTime(e - e.getMilliseconds());
}, (e, t) => {
	e.setTime(+e + t * zv);
}, (e, t) => (t - e) / zv, (e) => e.getUTCSeconds());
Kv.range;
//#endregion
//#region node_modules/d3-time/src/minute.js
var qv = Lv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * zv);
}, (e, t) => {
	e.setTime(+e + t * Bv);
}, (e, t) => (t - e) / Bv, (e) => e.getMinutes());
qv.range;
var Jv = Lv((e) => {
	e.setUTCSeconds(0, 0);
}, (e, t) => {
	e.setTime(+e + t * Bv);
}, (e, t) => (t - e) / Bv, (e) => e.getUTCMinutes());
Jv.range;
//#endregion
//#region node_modules/d3-time/src/hour.js
var Yv = Lv((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * zv - e.getMinutes() * Bv);
}, (e, t) => {
	e.setTime(+e + t * Vv);
}, (e, t) => (t - e) / Vv, (e) => e.getHours());
Yv.range;
var Xv = Lv((e) => {
	e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
	e.setTime(+e + t * Vv);
}, (e, t) => (t - e) / Vv, (e) => e.getUTCHours());
Xv.range;
//#endregion
//#region node_modules/d3-time/src/day.js
var Zv = Lv((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Bv) / Hv, (e) => e.getDate() - 1);
Zv.range;
var Qv = Lv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Hv, (e) => e.getUTCDate() - 1);
Qv.range;
var $v = Lv((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Hv, (e) => Math.floor(e / Hv));
$v.range;
//#endregion
//#region node_modules/d3-time/src/week.js
function ey(e) {
	return Lv((t) => {
		t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setDate(e.getDate() + t * 7);
	}, (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Bv) / Uv);
}
var ty = ey(0), ny = ey(1), ry = ey(2), iy = ey(3), ay = ey(4), oy = ey(5), sy = ey(6);
ty.range, ny.range, ry.range, iy.range, ay.range, oy.range, sy.range;
function cy(e) {
	return Lv((t) => {
		t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setUTCDate(e.getUTCDate() + t * 7);
	}, (e, t) => (t - e) / Uv);
}
var ly = cy(0), uy = cy(1), dy = cy(2), fy = cy(3), py = cy(4), my = cy(5), hy = cy(6);
ly.range, uy.range, dy.range, fy.range, py.range, my.range, hy.range;
//#endregion
//#region node_modules/d3-time/src/month.js
var gy = Lv((e) => {
	e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
gy.range;
var _y = Lv((e) => {
	e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
_y.range;
//#endregion
//#region node_modules/d3-time/src/year.js
var vy = Lv((e) => {
	e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
vy.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Lv((t) => {
	t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
	t.setFullYear(t.getFullYear() + n * e);
}), vy.range;
var yy = Lv((e) => {
	e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
yy.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Lv((t) => {
	t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
	t.setUTCFullYear(t.getUTCFullYear() + n * e);
}), yy.range;
//#endregion
//#region node_modules/d3-time/src/ticks.js
function by(e, t, n, r, i, a) {
	let o = [
		[
			Kv,
			1,
			zv
		],
		[
			Kv,
			5,
			5 * zv
		],
		[
			Kv,
			15,
			15 * zv
		],
		[
			Kv,
			30,
			30 * zv
		],
		[
			a,
			1,
			Bv
		],
		[
			a,
			5,
			5 * Bv
		],
		[
			a,
			15,
			15 * Bv
		],
		[
			a,
			30,
			30 * Bv
		],
		[
			i,
			1,
			Vv
		],
		[
			i,
			3,
			3 * Vv
		],
		[
			i,
			6,
			6 * Vv
		],
		[
			i,
			12,
			12 * Vv
		],
		[
			r,
			1,
			Hv
		],
		[
			r,
			2,
			2 * Hv
		],
		[
			n,
			1,
			Uv
		],
		[
			t,
			1,
			Wv
		],
		[
			t,
			3,
			3 * Wv
		],
		[
			e,
			1,
			Gv
		]
	];
	function s(e, t, n) {
		let r = t < e;
		r && ([e, t] = [t, e]);
		let i = n && typeof n.range == "function" ? n : c(e, t, n), a = i ? i.range(e, +t + 1) : [];
		return r ? a.reverse() : a;
	}
	function c(t, n, r) {
		let i = Math.abs(n - t) / r, a = pe(([, , e]) => e).right(o, i);
		if (a === o.length) return e.every(ke(t / Gv, n / Gv, r));
		if (a === 0) return Rv.every(Math.max(ke(t, n, r), 1));
		let [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
		return s.every(c);
	}
	return [s, c];
}
var [xy, Sy] = by(yy, _y, ly, $v, Xv, Jv), [Cy, wy] = by(vy, gy, ty, Zv, Yv, qv);
//#endregion
//#region node_modules/d3-time-format/src/locale.js
function Ty(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Ey(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function Dy(e, t, n) {
	return {
		y: e,
		m: t,
		d: n,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function Oy(e) {
	var t = e.dateTime, n = e.date, r = e.time, i = e.periods, a = e.days, o = e.shortDays, s = e.months, c = e.shortMonths, l = Py(i), u = Fy(i), d = Py(a), f = Fy(a), p = Py(o), m = Fy(o), h = Py(s), g = Fy(s), _ = Py(c), v = Fy(c), y = {
		a: N,
		A: ee,
		b: te,
		B: ne,
		c: null,
		d: nb,
		e: nb,
		f: sb,
		g: vb,
		G: bb,
		H: rb,
		I: ib,
		j: ab,
		L: ob,
		m: cb,
		M: lb,
		p: P,
		q: re,
		Q: Ub,
		s: Wb,
		S: ub,
		u: db,
		U: fb,
		V: mb,
		w: hb,
		W: gb,
		x: null,
		X: null,
		y: _b,
		Y: yb,
		Z: xb,
		"%": Hb
	}, b = {
		a: ie,
		A: ae,
		b: oe,
		B: se,
		c: null,
		d: Sb,
		e: Sb,
		f: Db,
		g: Rb,
		G: Bb,
		H: Cb,
		I: wb,
		j: Tb,
		L: Eb,
		m: Ob,
		M: kb,
		p: ce,
		q: le,
		Q: Ub,
		s: Wb,
		S: Ab,
		u: jb,
		U: Mb,
		V: Pb,
		w: Fb,
		W: Ib,
		x: null,
		X: null,
		y: Lb,
		Y: zb,
		Z: Vb,
		"%": Hb
	}, x = {
		a: E,
		A: D,
		b: O,
		B: k,
		c: A,
		d: Ky,
		e: Ky,
		f: Qy,
		g: Hy,
		G: Vy,
		H: Jy,
		I: Jy,
		j: qy,
		L: Zy,
		m: Gy,
		M: Yy,
		p: T,
		q: Wy,
		Q: eb,
		s: tb,
		S: Xy,
		u: Ly,
		U: Ry,
		V: zy,
		w: Iy,
		W: By,
		x: j,
		X: M,
		y: Hy,
		Y: Vy,
		Z: Uy,
		"%": $y
	};
	y.x = S(n, y), y.X = S(r, y), y.c = S(t, y), b.x = S(n, b), b.X = S(r, b), b.c = S(t, b);
	function S(e, t) {
		return function(n) {
			var r = [], i = -1, a = 0, o = e.length, s, c, l;
			for (n instanceof Date || (n = /* @__PURE__ */ new Date(+n)); ++i < o;) e.charCodeAt(i) === 37 && (r.push(e.slice(a, i)), (c = ky[s = e.charAt(++i)]) == null ? c = s === "e" ? " " : "0" : s = e.charAt(++i), (l = t[s]) && (s = l(n, c)), r.push(s), a = i + 1);
			return r.push(e.slice(a, i)), r.join("");
		};
	}
	function C(e, t) {
		return function(n) {
			var r = Dy(1900, void 0, 1), i = w(r, e, n += "", 0), a, o;
			if (i != n.length) return null;
			if ("Q" in r) return new Date(r.Q);
			if ("s" in r) return new Date(r.s * 1e3 + ("L" in r ? r.L : 0));
			if (t && !("Z" in r) && (r.Z = 0), "p" in r && (r.H = r.H % 12 + r.p * 12), r.m === void 0 && (r.m = "q" in r ? r.q : 0), "V" in r) {
				if (r.V < 1 || r.V > 53) return null;
				"w" in r || (r.w = 1), "Z" in r ? (a = Ey(Dy(r.y, 0, 1)), o = a.getUTCDay(), a = o > 4 || o === 0 ? uy.ceil(a) : uy(a), a = Qv.offset(a, (r.V - 1) * 7), r.y = a.getUTCFullYear(), r.m = a.getUTCMonth(), r.d = a.getUTCDate() + (r.w + 6) % 7) : (a = Ty(Dy(r.y, 0, 1)), o = a.getDay(), a = o > 4 || o === 0 ? ny.ceil(a) : ny(a), a = Zv.offset(a, (r.V - 1) * 7), r.y = a.getFullYear(), r.m = a.getMonth(), r.d = a.getDate() + (r.w + 6) % 7);
			} else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : +("W" in r)), o = "Z" in r ? Ey(Dy(r.y, 0, 1)).getUTCDay() : Ty(Dy(r.y, 0, 1)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + r.W * 7 - (o + 5) % 7 : r.w + r.U * 7 - (o + 6) % 7);
			return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, Ey(r)) : Ty(r);
		};
	}
	function w(e, t, n, r) {
		for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
			if (r >= o) return -1;
			if (s = t.charCodeAt(i++), s === 37) {
				if (s = t.charAt(i++), c = x[s in ky ? t.charAt(i++) : s], !c || (r = c(e, n, r)) < 0) return -1;
			} else if (s != n.charCodeAt(r++)) return -1;
		}
		return r;
	}
	function T(e, t, n) {
		var r = l.exec(t.slice(n));
		return r ? (e.p = u.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function E(e, t, n) {
		var r = p.exec(t.slice(n));
		return r ? (e.w = m.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function D(e, t, n) {
		var r = d.exec(t.slice(n));
		return r ? (e.w = f.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function O(e, t, n) {
		var r = _.exec(t.slice(n));
		return r ? (e.m = v.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function k(e, t, n) {
		var r = h.exec(t.slice(n));
		return r ? (e.m = g.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function A(e, n, r) {
		return w(e, t, n, r);
	}
	function j(e, t, r) {
		return w(e, n, t, r);
	}
	function M(e, t, n) {
		return w(e, r, t, n);
	}
	function N(e) {
		return o[e.getDay()];
	}
	function ee(e) {
		return a[e.getDay()];
	}
	function te(e) {
		return c[e.getMonth()];
	}
	function ne(e) {
		return s[e.getMonth()];
	}
	function P(e) {
		return i[+(e.getHours() >= 12)];
	}
	function re(e) {
		return 1 + ~~(e.getMonth() / 3);
	}
	function ie(e) {
		return o[e.getUTCDay()];
	}
	function ae(e) {
		return a[e.getUTCDay()];
	}
	function oe(e) {
		return c[e.getUTCMonth()];
	}
	function se(e) {
		return s[e.getUTCMonth()];
	}
	function ce(e) {
		return i[+(e.getUTCHours() >= 12)];
	}
	function le(e) {
		return 1 + ~~(e.getUTCMonth() / 3);
	}
	return {
		format: function(e) {
			var t = S(e += "", y);
			return t.toString = function() {
				return e;
			}, t;
		},
		parse: function(e) {
			var t = C(e += "", !1);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcFormat: function(e) {
			var t = S(e += "", b);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcParse: function(e) {
			var t = C(e += "", !0);
			return t.toString = function() {
				return e;
			}, t;
		}
	};
}
var ky = {
	"-": "",
	_: " ",
	0: "0"
}, Ay = /^\s*\d+/, jy = /^%/, My = /[\\^$*+?|[\]().{}]/g;
function Z(e, t, n) {
	var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", a = i.length;
	return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function Ny(e) {
	return e.replace(My, "\\$&");
}
function Py(e) {
	return RegExp("^(?:" + e.map(Ny).join("|") + ")", "i");
}
function Fy(e) {
	return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function Iy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 1));
	return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function Ly(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 1));
	return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function Ry(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function zy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function By(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function Vy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 4));
	return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function Hy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Uy(e, t, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
	return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Wy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 1));
	return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Gy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function Ky(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function qy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 3));
	return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function Jy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function Yy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function Xy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 2));
	return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function Zy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 3));
	return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function Qy(e, t, n) {
	var r = Ay.exec(t.slice(n, n + 6));
	return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function $y(e, t, n) {
	var r = jy.exec(t.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function eb(e, t, n) {
	var r = Ay.exec(t.slice(n));
	return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function tb(e, t, n) {
	var r = Ay.exec(t.slice(n));
	return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function nb(e, t) {
	return Z(e.getDate(), t, 2);
}
function rb(e, t) {
	return Z(e.getHours(), t, 2);
}
function ib(e, t) {
	return Z(e.getHours() % 12 || 12, t, 2);
}
function ab(e, t) {
	return Z(1 + Zv.count(vy(e), e), t, 3);
}
function ob(e, t) {
	return Z(e.getMilliseconds(), t, 3);
}
function sb(e, t) {
	return ob(e, t) + "000";
}
function cb(e, t) {
	return Z(e.getMonth() + 1, t, 2);
}
function lb(e, t) {
	return Z(e.getMinutes(), t, 2);
}
function ub(e, t) {
	return Z(e.getSeconds(), t, 2);
}
function db(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function fb(e, t) {
	return Z(ty.count(vy(e) - 1, e), t, 2);
}
function pb(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? ay(e) : ay.ceil(e);
}
function mb(e, t) {
	return e = pb(e), Z(ay.count(vy(e), e) + (vy(e).getDay() === 4), t, 2);
}
function hb(e) {
	return e.getDay();
}
function gb(e, t) {
	return Z(ny.count(vy(e) - 1, e), t, 2);
}
function _b(e, t) {
	return Z(e.getFullYear() % 100, t, 2);
}
function vb(e, t) {
	return e = pb(e), Z(e.getFullYear() % 100, t, 2);
}
function yb(e, t) {
	return Z(e.getFullYear() % 1e4, t, 4);
}
function bb(e, t) {
	var n = e.getDay();
	return e = n >= 4 || n === 0 ? ay(e) : ay.ceil(e), Z(e.getFullYear() % 1e4, t, 4);
}
function xb(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : (t *= -1, "+")) + Z(t / 60 | 0, "0", 2) + Z(t % 60, "0", 2);
}
function Sb(e, t) {
	return Z(e.getUTCDate(), t, 2);
}
function Cb(e, t) {
	return Z(e.getUTCHours(), t, 2);
}
function wb(e, t) {
	return Z(e.getUTCHours() % 12 || 12, t, 2);
}
function Tb(e, t) {
	return Z(1 + Qv.count(yy(e), e), t, 3);
}
function Eb(e, t) {
	return Z(e.getUTCMilliseconds(), t, 3);
}
function Db(e, t) {
	return Eb(e, t) + "000";
}
function Ob(e, t) {
	return Z(e.getUTCMonth() + 1, t, 2);
}
function kb(e, t) {
	return Z(e.getUTCMinutes(), t, 2);
}
function Ab(e, t) {
	return Z(e.getUTCSeconds(), t, 2);
}
function jb(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function Mb(e, t) {
	return Z(ly.count(yy(e) - 1, e), t, 2);
}
function Nb(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? py(e) : py.ceil(e);
}
function Pb(e, t) {
	return e = Nb(e), Z(py.count(yy(e), e) + (yy(e).getUTCDay() === 4), t, 2);
}
function Fb(e) {
	return e.getUTCDay();
}
function Ib(e, t) {
	return Z(uy.count(yy(e) - 1, e), t, 2);
}
function Lb(e, t) {
	return Z(e.getUTCFullYear() % 100, t, 2);
}
function Rb(e, t) {
	return e = Nb(e), Z(e.getUTCFullYear() % 100, t, 2);
}
function zb(e, t) {
	return Z(e.getUTCFullYear() % 1e4, t, 4);
}
function Bb(e, t) {
	var n = e.getUTCDay();
	return e = n >= 4 || n === 0 ? py(e) : py.ceil(e), Z(e.getUTCFullYear() % 1e4, t, 4);
}
function Vb() {
	return "+0000";
}
function Hb() {
	return "%";
}
function Ub(e) {
	return +e;
}
function Wb(e) {
	return Math.floor(e / 1e3);
}
//#endregion
//#region node_modules/d3-time-format/src/defaultLocale.js
var Gb, Kb, qb;
Jb({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function Jb(e) {
	return Gb = Oy(e), Kb = Gb.format, Gb.parse, qb = Gb.utcFormat, Gb.utcParse, Gb;
}
//#endregion
//#region node_modules/d3-scale/src/time.js
function Yb(e) {
	return new Date(e);
}
function Xb(e) {
	return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Zb(e, t, n, r, i, a, o, s, c, l) {
	var u = N_(), d = u.invert, f = u.domain, p = l(".%L"), m = l(":%S"), h = l("%I:%M"), g = l("%I %p"), _ = l("%a %d"), v = l("%b %d"), y = l("%B"), b = l("%Y");
	function x(e) {
		return (c(e) < e ? p : s(e) < e ? m : o(e) < e ? h : a(e) < e ? g : r(e) < e ? i(e) < e ? _ : v : n(e) < e ? y : b)(e);
	}
	return u.invert = function(e) {
		return new Date(d(e));
	}, u.domain = function(e) {
		return arguments.length ? f(Array.from(e, Xb)) : f().map(Yb);
	}, u.ticks = function(t) {
		var n = f();
		return e(n[0], n[n.length - 1], t ?? 10);
	}, u.tickFormat = function(e, t) {
		return t == null ? x : l(t);
	}, u.nice = function(e) {
		var n = f();
		return (!e || typeof e.range != "function") && (e = t(n[0], n[n.length - 1], e ?? 10)), e ? f(cv(n, e)) : u;
	}, u.copy = function() {
		return j_(u, Zb(e, t, n, r, i, a, o, s, c, l));
	}, u;
}
function Qb() {
	return dg.apply(Zb(Cy, wy, vy, gy, ty, Zv, Yv, qv, Kv, Kb).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/utcTime.js
function $b() {
	return dg.apply(Zb(xy, Sy, yy, _y, ly, Qv, Xv, Jv, Kv, qb).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
//#endregion
//#region node_modules/d3-scale/src/sequential.js
function ex() {
	var e = 0, t = 1, n, r, i, a, o = E_, s = !1, c;
	function l(e) {
		return e == null || isNaN(e = +e) ? c : o(i === 0 ? .5 : (e = (a(e) - n) * i, s ? Math.max(0, Math.min(1, e)) : e));
	}
	l.domain = function(o) {
		return arguments.length ? ([e, t] = o, n = a(e = +e), r = a(t = +t), i = n === r ? 0 : 1 / (r - n), l) : [e, t];
	}, l.clamp = function(e) {
		return arguments.length ? (s = !!e, l) : s;
	}, l.interpolator = function(e) {
		return arguments.length ? (o = e, l) : o;
	};
	function u(e) {
		return function(t) {
			var n, r;
			return arguments.length ? ([n, r] = t, o = e(n, r), l) : [o(0), o(1)];
		};
	}
	return l.range = u(b_), l.rangeRound = u(x_), l.unknown = function(e) {
		return arguments.length ? (c = e, l) : c;
	}, function(o) {
		return a = o, n = o(e), r = o(t), i = n === r ? 0 : 1 / (r - n), l;
	};
}
function tx(e, t) {
	return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function nx() {
	var e = av(ex()(E_));
	return e.copy = function() {
		return tx(e, nx());
	}, fg.apply(e, arguments);
}
function rx() {
	var e = _v(ex()).domain([1, 10]);
	return e.copy = function() {
		return tx(e, rx()).base(e.base());
	}, fg.apply(e, arguments);
}
function ix() {
	var e = xv(ex());
	return e.copy = function() {
		return tx(e, ix()).constant(e.constant());
	}, fg.apply(e, arguments);
}
function ax() {
	var e = Ev(ex());
	return e.copy = function() {
		return tx(e, ax()).exponent(e.exponent());
	}, fg.apply(e, arguments);
}
function ox() {
	return ax.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/d3-scale/src/sequentialQuantile.js
function sx() {
	var e = [], t = E_;
	function n(n) {
		if (n != null && !isNaN(n = +n)) return t((ve(e, n, 1) - 1) / (e.length - 1));
	}
	return n.domain = function(t) {
		if (!arguments.length) return e.slice();
		e = [];
		for (let n of t) n != null && !isNaN(n = +n) && e.push(n);
		return e.sort(fe), n;
	}, n.interpolator = function(e) {
		return arguments.length ? (t = e, n) : t;
	}, n.range = function() {
		return e.map((n, r) => t(r / (e.length - 1)));
	}, n.quantiles = function(t) {
		return Array.from({ length: t + 1 }, (n, r) => Me(e, r / t));
	}, n.copy = function() {
		return sx(t).domain(e);
	}, fg.apply(n, arguments);
}
//#endregion
//#region node_modules/d3-scale/src/diverging.js
function cx() {
	var e = 0, t = .5, n = 1, r = 1, i, a, o, s, c, l = E_, u, d = !1, f;
	function p(e) {
		return isNaN(e = +e) ? f : (e = .5 + ((e = +u(e)) - a) * (r * e < r * a ? s : c), l(d ? Math.max(0, Math.min(1, e)) : e));
	}
	p.domain = function(l) {
		return arguments.length ? ([e, t, n] = l, i = u(e = +e), a = u(t = +t), o = u(n = +n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p) : [
			e,
			t,
			n
		];
	}, p.clamp = function(e) {
		return arguments.length ? (d = !!e, p) : d;
	}, p.interpolator = function(e) {
		return arguments.length ? (l = e, p) : l;
	};
	function m(e) {
		return function(t) {
			var n, r, i;
			return arguments.length ? ([n, r, i] = t, l = S_(e, [
				n,
				r,
				i
			]), p) : [
				l(0),
				l(.5),
				l(1)
			];
		};
	}
	return p.range = m(b_), p.rangeRound = m(x_), p.unknown = function(e) {
		return arguments.length ? (f = e, p) : f;
	}, function(l) {
		return u = l, i = l(e), a = l(t), o = l(n), s = i === a ? 0 : .5 / (a - i), c = a === o ? 0 : .5 / (o - a), r = a < i ? -1 : 1, p;
	};
}
function lx() {
	var e = av(cx()(E_));
	return e.copy = function() {
		return tx(e, lx());
	}, fg.apply(e, arguments);
}
function ux() {
	var e = _v(cx()).domain([
		.1,
		1,
		10
	]);
	return e.copy = function() {
		return tx(e, ux()).base(e.base());
	}, fg.apply(e, arguments);
}
function dx() {
	var e = xv(cx());
	return e.copy = function() {
		return tx(e, dx()).constant(e.constant());
	}, fg.apply(e, arguments);
}
function fx() {
	var e = Ev(cx());
	return e.copy = function() {
		return tx(e, fx()).exponent(e.exponent());
	}, fg.apply(e, arguments);
}
function px() {
	return fx.apply(null, arguments).exponent(.5);
}
//#endregion
//#region node_modules/victory-vendor/es/d3-scale.js
var mx = /* @__PURE__ */ r({
	scaleBand: () => hg,
	scaleDiverging: () => lx,
	scaleDivergingLog: () => ux,
	scaleDivergingPow: () => fx,
	scaleDivergingSqrt: () => px,
	scaleDivergingSymlog: () => dx,
	scaleIdentity: () => sv,
	scaleImplicit: () => pg,
	scaleLinear: () => ov,
	scaleLog: () => vv,
	scaleOrdinal: () => mg,
	scalePoint: () => _g,
	scalePow: () => Dv,
	scaleQuantile: () => Mv,
	scaleQuantize: () => Nv,
	scaleRadial: () => jv,
	scaleSequential: () => nx,
	scaleSequentialLog: () => rx,
	scaleSequentialPow: () => ax,
	scaleSequentialQuantile: () => sx,
	scaleSequentialSqrt: () => ox,
	scaleSequentialSymlog: () => ix,
	scaleSqrt: () => Ov,
	scaleSymlog: () => Sv,
	scaleThreshold: () => Pv,
	scaleTime: () => Qb,
	scaleUtc: () => $b,
	tickFormat: () => iv
});
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineConfiguredScale.js
function hx(e) {
	var t = mx;
	if (e in t && typeof t[e] == "function") return t[e]();
	var n = `scale${Ct(e)}`;
	if (n in t && typeof t[n] == "function") return t[n]();
}
function gx(e, t, n) {
	if (typeof e == "function") return e.copy().domain(t).range(n);
	if (e != null) {
		var r = hx(e);
		if (r != null) return r.domain(t).range(n), r;
	}
}
function _x(e, t, n, r) {
	if (n != null && r != null) return typeof e.scale == "function" ? gx(e.scale, n, r) : gx(t, n, r);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineRealScaleType.js
function vx(e) {
	return `scale${Ct(e)}`;
}
function yx(e) {
	return vx(e) in mx;
}
var bx = (e, t, n) => {
	if (e != null) {
		var r = e.scale, i = e.type;
		if (r === "auto") return i === "category" && n && (n.indexOf("LineChart") >= 0 || n.indexOf("AreaChart") >= 0 || n.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
		if (typeof r == "string") return yx(r) ? r : "point";
	}
};
//#endregion
//#region node_modules/recharts/es6/util/scale/createCategoricalInverse.js
function xx(e, t) {
	for (var n = 0, r = e.length, i = e[0] < e[e.length - 1]; n < r;) {
		var a = Math.floor((n + r) / 2);
		(i ? e[a] < t : e[a] > t) ? n = a + 1 : r = a;
	}
	return n;
}
function Sx(e, t) {
	if (e) {
		var n = t ?? e.domain(), r = n.map((t) => e(t) ?? 0), i = e.range();
		if (!(n.length === 0 || i.length < 2)) return (e) => {
			var t = xx(r, e);
			if (t <= 0) return n[0];
			if (t >= n.length) return n[n.length - 1];
			var i = r[t - 1] ?? 0, a = r[t] ?? 0;
			return Math.abs(e - i) <= Math.abs(e - a) ? n[t - 1] : n[t];
		};
	}
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineInverseScaleFunction.js
function Cx(e) {
	if (e != null) return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : Sx(e, void 0);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/axisSelectors.js
function wx(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Tx(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? wx(Object(n), !0).forEach(function(t) {
			Ex(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wx(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ex(e, t, n) {
	return (t = Dx(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Dx(e) {
	var t = Ox(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ox(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function kx(e, t) {
	return Px(e) || Nx(e, t) || jx(e, t) || Ax();
}
function Ax() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function jx(e, t) {
	if (e) {
		if (typeof e == "string") return Mx(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Mx(e, t) : void 0;
	}
}
function Mx(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Nx(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Px(e) {
	if (Array.isArray(e)) return e;
}
var Fx = [0, "auto"], Ix = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: void 0,
	height: 30,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "bottom",
	padding: {
		left: 0,
		right: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "category",
	unit: void 0,
	niceTicks: "auto"
}, Lx = (e, t) => e.cartesianAxis.xAxis[t], Rx = (e, t) => Lx(e, t) ?? Ix, zx = {
	allowDataOverflow: !1,
	allowDecimals: !0,
	allowDuplicatedCategory: !0,
	angle: 0,
	dataKey: void 0,
	domain: Fx,
	hide: !0,
	id: 0,
	includeHidden: !1,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: !1,
	name: void 0,
	orientation: "left",
	padding: {
		top: 0,
		bottom: 0
	},
	reversed: !1,
	scale: "auto",
	tick: !0,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0,
	niceTicks: "auto",
	width: 60
}, Bx = (e, t) => e.cartesianAxis.yAxis[t], Vx = (e, t) => Bx(e, t) ?? zx, Hx = {
	domain: [0, "auto"],
	includeHidden: !1,
	reversed: !1,
	allowDataOverflow: !1,
	allowDuplicatedCategory: !1,
	dataKey: void 0,
	id: 0,
	name: "",
	range: [64, 64],
	scale: "auto",
	type: "number",
	unit: ""
}, Ux = (e, t) => e.cartesianAxis.zAxis[t] ?? Hx, Q = (e, t, n) => {
	switch (t) {
		case "xAxis": return Rx(e, n);
		case "yAxis": return Vx(e, n);
		case "zAxis": return Ux(e, n);
		case "angleAxis": return Uh(e, n);
		case "radiusAxis": return Wh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Wx = (e, t, n) => {
	switch (t) {
		case "xAxis": return Rx(e, n);
		case "yAxis": return Vx(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Gx = (e, t, n) => {
	switch (t) {
		case "xAxis": return Rx(e, n);
		case "yAxis": return Vx(e, n);
		case "angleAxis": return Uh(e, n);
		case "radiusAxis": return Wh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Kx = (e) => e.graphicalItems.cartesianItems.some((e) => e.type === "bar") || e.graphicalItems.polarItems.some((e) => e.type === "radialBar");
function qx(e, t) {
	return (n) => {
		switch (e) {
			case "xAxis": return "xAxisId" in n && n.xAxisId === t;
			case "yAxis": return "yAxisId" in n && n.yAxisId === t;
			case "zAxis": return "zAxisId" in n && n.zAxisId === t;
			case "angleAxis": return "angleAxisId" in n && n.angleAxisId === t;
			case "radiusAxis": return "radiusAxisId" in n && n.radiusAxisId === t;
			default: return !1;
		}
	};
}
var Jx = (e) => e.graphicalItems.cartesianItems, Yx = H([X, eg], qx), Xx = (e, t, n) => e.filter(n).filter((e) => t?.includeHidden === !0 || !e.hide), Zx = H([
	Jx,
	Q,
	Yx
], Xx, { memoizeOptions: { resultEqualityCheck: ag } }), Qx = H([Zx], (e) => e.filter((e) => e.type === "area" || e.type === "bar").filter(rg)), $x = (e) => e.filter((e) => !("stackId" in e) || e.stackId === void 0), eS = H([Zx], $x), tS = (e) => e.map((e) => e.data).filter(Boolean).flat(1), nS = H([Zx], (e) => e.some((e) => !e.data)), rS = H([Zx], tS, { memoizeOptions: { resultEqualityCheck: ag } }), iS = (e, t) => {
	var n = t.chartData, r = n === void 0 ? [] : n, i = t.dataStartIndex, a = t.dataEndIndex;
	return e.length > 0 ? e : r.slice(i, a + 1);
}, aS = H([rS, Gm], iS), oS = (e, t, n) => t?.dataKey == null ? n.length > 0 ? n.map((e) => e.dataKey).flatMap((t) => e.map((e) => ({ value: K(e, t) }))) : e.map((e) => ({ value: e })) : e.map((e) => ({ value: K(e, t.dataKey) })), sS = (e, t, n, r, i, a) => {
	var o = r.chartData, s = o === void 0 ? [] : o, c = r.dataStartIndex, l = r.dataEndIndex, u = oS(e, t, n);
	return i && t?.dataKey != null && a.length > 0 ? [...s.slice(c, l + 1).map((e) => ({ value: K(e, t.dataKey) })).filter((e) => e.value != null), ...u] : u;
}, cS = H([
	aS,
	Q,
	Zx,
	Gm,
	nS,
	rS
], sS);
function lS(e) {
	if (_t(e) || e instanceof Date) {
		var t = Number(e);
		if (G(t)) return t;
	}
}
function uS(e) {
	if (Array.isArray(e)) {
		var t = [lS(e[0]), lS(e[1])];
		return nh(t) ? t : void 0;
	}
	var n = lS(e);
	if (n != null) return [n, n];
}
function dS(e) {
	return e.map(lS).filter(wt);
}
function fS(e, t) {
	var n = lS(e), r = lS(t);
	return n == null && r == null ? 0 : n == null ? -1 : r == null ? 1 : n - r;
}
var pS = H([cS], (e) => e?.map((e) => e.value).sort(fS));
function mS(e, t) {
	switch (e) {
		case "xAxis": return t.direction === "x";
		case "yAxis": return t.direction === "y";
		default: return !1;
	}
}
function hS(e, t, n) {
	if (!n || !n.length) return [];
	var r;
	if (typeof t == "number" && !ht(t)) r = t;
	else if (Array.isArray(t)) {
		var i = dS(t);
		i.length > 0 && (r = Math.max(...i));
	}
	return r == null ? [] : dS(n.flatMap((t) => {
		var n = K(e, t.dataKey), i, a;
		if (Array.isArray(n)) {
			var o = kx(n, 2);
			i = o[0], a = o[1];
		} else i = a = n;
		if (G(i) && G(a)) return [r - i, r + a];
	}));
}
var gS = (e) => Gx(e, sg(e), cg(e)), _S = H([gS], (e) => e?.dataKey), vS = H([
	Qx,
	Gm,
	gS
], ng), yS = (e, t, n, r) => {
	var i = t.reduce((e, t) => {
		if (t.stackId == null) return e;
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, {});
	return Object.fromEntries(Object.entries(i).map((t) => {
		var i = kx(t, 2), a = i[0], o = i[1], s = r ? [...o].reverse() : o;
		return [a, {
			stackedData: $c(e, s.map(tg), n),
			graphicalItems: s
		}];
	}));
}, bS = H([
	vS,
	Qx,
	Th,
	Eh
], yS), xS = (e, t, n, r) => {
	var i = t.dataStartIndex, a = t.dataEndIndex;
	if (r == null && n !== "zAxis") return ol(e, i, a);
}, SS = H([Q], (e) => e.allowDataOverflow), CS = (e) => {
	if (e == null || !("domain" in e)) return Fx;
	if (e.domain != null) return e.domain;
	if ("ticks" in e && e.ticks != null) {
		if (e.type === "number") {
			var t = dS(e.ticks);
			return [Math.min(...t), Math.max(...t)];
		}
		if (e.type === "category") return e.ticks.map(String);
	}
	return e?.domain ?? Fx;
}, wS = H([Q], CS), TS = H([wS, SS], ih), ES = H([
	bS,
	Um,
	X,
	TS
], xS, { memoizeOptions: { resultEqualityCheck: ig } }), DS = (e) => e.errorBars, OS = (e, t, n) => e.flatMap((e) => t[e.id]).filter(Boolean).filter((e) => mS(n, e)), kS = function() {
	var e = [...arguments].filter(Boolean);
	if (e.length !== 0) {
		var t = e.flat();
		return [Math.min(...t), Math.max(...t)];
	}
}, AS = function(e, t, n, r, i) {
	var a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], o, s;
	if (n.length > 0 && n.forEach((e) => {
		var n = e.data == null ? a : [...e.data], c = r[e.id]?.filter((e) => mS(i, e));
		n.forEach((n) => {
			var r = K(n, t.dataKey ?? e.dataKey), i = hS(n, r, c);
			if (i.length >= 2) {
				var a = Math.min(...i), l = Math.max(...i);
				(o == null || a < o) && (o = a), (s == null || l > s) && (s = l);
			}
			var u = uS(r);
			u != null && (o = o == null ? u[0] : Math.min(o, u[0]), s = s == null ? u[1] : Math.max(s, u[1]));
		});
	}), t?.dataKey != null && n.length === 0 && e.forEach((e) => {
		var n = uS(K(e, t.dataKey));
		n != null && (o = o == null ? n[0] : Math.min(o, n[0]), s = s == null ? n[1] : Math.max(s, n[1]));
	}), G(o) && G(s)) return [o, s];
}, jS = H([
	aS,
	Q,
	eS,
	DS,
	X,
	qm
], AS, { memoizeOptions: { resultEqualityCheck: ig } });
function MS(e) {
	var t = e.value;
	if (_t(t) || t instanceof Date) return t;
}
var NS = (e, t, n) => {
	var r = e.map(MS).filter((e) => e != null);
	return n && (t.dataKey == null || t.allowDuplicatedCategory && xt(r)) ? Hm(0, e.length) : t.allowDuplicatedCategory ? r : Array.from(new Set(r));
}, PS = (e) => e.referenceElements.dots, FS = (e, t, n) => e.filter((e) => e.ifOverflow === "extendDomain").filter((e) => t === "xAxis" ? e.xAxisId === n : e.yAxisId === n), IS = H([
	PS,
	X,
	eg
], FS), LS = (e) => e.referenceElements.areas, RS = H([
	LS,
	X,
	eg
], FS), zS = (e) => e.referenceElements.lines, BS = H([
	zS,
	X,
	eg
], FS), VS = (e, t) => {
	if (e != null) {
		var n = dS(e.map((e) => t === "xAxis" ? e.x : e.y));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, HS = H(IS, X, VS), US = (e, t) => {
	if (e != null) {
		var n = dS(e.flatMap((e) => [t === "xAxis" ? e.x1 : e.y1, t === "xAxis" ? e.x2 : e.y2]));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, WS = H([RS, X], US);
function GS(e) {
	if (e.x != null) return dS([e.x]);
	var t = e.segment?.map((e) => e.x);
	return t == null || t.length === 0 ? [] : dS(t);
}
function KS(e) {
	if (e.y != null) return dS([e.y]);
	var t = e.segment?.map((e) => e.y);
	return t == null || t.length === 0 ? [] : dS(t);
}
var qS = (e, t) => {
	if (e != null) {
		var n = e.flatMap((e) => t === "xAxis" ? GS(e) : KS(e));
		if (n.length !== 0) return [Math.min(...n), Math.max(...n)];
	}
}, JS = H(HS, H([BS, X], qS), WS, (e, t, n) => kS(e, n, t)), YS = (e, t, n, r, i, a, o, s, c) => {
	if (n != null) return n;
	var l = o === "vertical" && s === "xAxis" || o === "horizontal" && s === "yAxis" ? kS(r, a, i) : kS(a, i), u = ah(t, l, e.allowDataOverflow);
	return u == null && e.allowDataOverflow && l == null && c != null ? c : u;
}, XS = H([
	Q,
	wS,
	TS,
	ES,
	jS,
	JS,
	q,
	X,
	H([Q], (e) => {
		if (e != null && e.type === "number" && "ticks" in e && e.ticks != null) {
			var t = dS(e.ticks);
			if (t.length !== 0) return [Math.min(...t), Math.max(...t)];
		}
	}, { memoizeOptions: { resultEqualityCheck: ig } })
], YS, { memoizeOptions: { resultEqualityCheck: ig } }), ZS = [0, 1], QS = (e, t, n, r, i, a, o) => {
	if (e != null && n != null && n.length !== 0 || o !== void 0) {
		var s = e.dataKey, c = e.type, l = Jc(t, a);
		return l && s == null ? Hm(0, n?.length ?? 0) : c === "category" ? NS(r, e, l) : i === "expand" && !l ? ZS : o;
	}
}, $S = H([
	Q,
	q,
	aS,
	cS,
	Th,
	X,
	XS
], QS), eC = H([
	Q,
	Kx,
	Dh
], bx), tC = (e, t, n) => {
	var r = t.niceTicks;
	if (r !== "none") {
		var i = CS(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
		if ((r === "snap125" || r === "adaptive") && t != null && t.tickCount && nh(e)) {
			if (a) return yh(e, t.tickCount, t.allowDecimals, r);
			if (t.type === "number") return bh(e, t.tickCount, t.allowDecimals, r);
		}
		if (r === "auto" && n === "linear" && t != null && t.tickCount) {
			if (a && nh(e)) return yh(e, t.tickCount, t.allowDecimals, "adaptive");
			if (t.type === "number" && nh(e)) return bh(e, t.tickCount, t.allowDecimals, "adaptive");
		}
	}
}, nC = H([
	$S,
	Gx,
	eC
], tC), rC = (e, t, n, r) => {
	if (r !== "angleAxis" && e?.type === "number" && nh(t) && Array.isArray(n) && n.length > 0) {
		var i = t[0], a = n[0] ?? 0, o = t[1], s = n[n.length - 1] ?? 0;
		return [Math.min(i, a), Math.max(o, s)];
	}
	return t;
}, iC = H([
	Q,
	$S,
	nC,
	X
], rC), aC = H(H(cS, Q, (e, t) => {
	if (t && t.type === "number") {
		var n = Infinity, r = Array.from(dS(e.map((e) => e.value))).sort((e, t) => e - t), i = r[0], a = r[r.length - 1];
		if (i == null || a == null) return Infinity;
		var o = a - i;
		if (o === 0) return Infinity;
		for (var s = 0; s < r.length - 1; s++) {
			var c = r[s], l = r[s + 1];
			if (c != null && l != null) {
				var u = l - c;
				n = Math.min(n, u);
			}
		}
		return n / o;
	}
}), q, Ch, jl, (e, t, n, r, i) => i, (e, t, n, r, i) => {
	if (!G(e)) return 0;
	var a = t === "vertical" ? r.height : r.width;
	if (i === "gap") return e * a / 2;
	if (i === "no-gap") {
		var o = bt(n, e * a), s = e * a / 2;
		return s - o - (s - o) / a * o;
	}
	return 0;
}), oC = (e, t, n) => {
	var r = Rx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : aC(e, "xAxis", t, n, r.padding);
}, sC = (e, t, n) => {
	var r = Vx(e, t);
	return r == null || typeof r.padding != "string" ? 0 : aC(e, "yAxis", t, n, r.padding);
}, cC = H(Rx, oC, (e, t) => {
	if (e == null) return {
		left: 0,
		right: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		left: t,
		right: t
	} : {
		left: (n.left ?? 0) + t,
		right: (n.right ?? 0) + t
	};
}), lC = H(Vx, sC, (e, t) => {
	if (e == null) return {
		top: 0,
		bottom: 0
	};
	var n = e.padding;
	return typeof n == "string" ? {
		top: t,
		bottom: t
	} : {
		top: (n.top ?? 0) + t,
		bottom: (n.bottom ?? 0) + t
	};
}), uC = H([
	jl,
	cC,
	Ll,
	Il,
	(e, t, n) => n
], (e, t, n, r, i) => {
	var a = r.padding;
	return i ? [a.left, n.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), dC = H([
	jl,
	q,
	lC,
	Ll,
	Il,
	(e, t, n) => n
], (e, t, n, r, i, a) => {
	var o = i.padding;
	return a ? [r.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - n.bottom, e.top + n.top] : [e.top + n.top, e.top + e.height - n.bottom];
}), fC = (e, t, n, r) => {
	switch (t) {
		case "xAxis": return uC(e, n, r);
		case "yAxis": return dC(e, n, r);
		case "zAxis": return Ux(e, n)?.range;
		case "angleAxis": return Yh(e);
		case "radiusAxis": return Zh(e, n);
		default: return;
	}
}, pC = H([Q, fC], Ph), mC = H([
	Q,
	eC,
	H([eC, iC], ug),
	pC
], _x), hC = (e, t, n, r) => {
	if (n != null && n.dataKey != null) {
		var i = n.type, a = n.scale;
		if (Jc(e, r) && (i === "number" || a !== "auto")) return t.map((e) => e.value);
	}
}, gC = H([
	q,
	cS,
	Gx,
	X
], hC), _C = H([mC], lg);
H([mC], Cx), H([mC, pS], Sx), H([
	Zx,
	DS,
	X
], OS);
function vC(e, t) {
	return e.id < t.id ? -1 : +(e.id > t.id);
}
var yC = (e, t) => t, bC = (e, t, n) => n, xC = H(vl, yC, bC, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(vC)), SC = H(yl, yC, bC, (e, t, n) => e.filter((e) => e.orientation === t).filter((e) => e.mirror === n).sort(vC)), CC = (e, t) => {
	var n = typeof t.height == "number" ? t.height : 30;
	return {
		width: e.width,
		height: n
	};
}, wC = (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
}), TC = H(jl, Rx, CC), EC = (e, t, n) => {
	switch (t) {
		case "top": return e.top;
		case "bottom": return n - e.bottom;
		default: return 0;
	}
}, DC = (e, t, n) => {
	switch (t) {
		case "left": return e.left;
		case "right": return n - e.right;
		default: return 0;
	}
}, OC = H(hl, jl, xC, yC, bC, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = CC(t, n);
		o ??= EC(t, r, e);
		var c = r === "top" && !i || r === "bottom" && i;
		a[n.id] = o - Number(c) * s.height, o += (c ? -1 : 1) * s.height;
	}), a;
}), kC = H(ml, jl, SC, yC, bC, (e, t, n, r, i) => {
	var a = {}, o;
	return n.forEach((n) => {
		var s = wC(t, n);
		o ??= DC(t, r, e);
		var c = r === "left" && !i || r === "right" && i;
		a[n.id] = o - Number(c) * s.width, o += (c ? -1 : 1) * s.width;
	}), a;
}), AC = H([
	jl,
	Rx,
	(e, t) => {
		var n = Rx(e, t);
		if (n != null) return OC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: e.left,
			y: 0
		} : {
			x: e.left,
			y: i
		};
	}
}), jC = H([
	jl,
	Vx,
	(e, t) => {
		var n = Vx(e, t);
		if (n != null) return kC(e, n.orientation, n.mirror);
	},
	(e, t) => t
], (e, t, n, r) => {
	if (t != null) {
		var i = n?.[r];
		return i == null ? {
			x: 0,
			y: e.top
		} : {
			x: i,
			y: e.top
		};
	}
}), MC = H(jl, Vx, (e, t) => ({
	width: typeof t.width == "number" ? t.width : 60,
	height: e.height
})), NC = (e, t, n) => {
	switch (t) {
		case "xAxis": return TC(e, n).width;
		case "yAxis": return MC(e, n).height;
		default: return;
	}
}, PC = (e, t, n, r) => {
	if (n != null) {
		var i = n.allowDuplicatedCategory, a = n.type, o = n.dataKey, s = Jc(e, r), c = t.map((e) => e.value), l = c.filter((e) => e != null);
		if (o && s && a === "category" && i && xt(l)) return c;
	}
}, FC = H([
	q,
	cS,
	Q,
	X
], PC), IC = H([
	q,
	Wx,
	eC,
	_C,
	FC,
	gC,
	fC,
	nC,
	X
], (e, t, n, r, i, a, o, s, c) => {
	if (t != null) {
		var l = Jc(e, c);
		return {
			angle: t.angle,
			interval: t.interval,
			minTickGap: t.minTickGap,
			orientation: t.orientation,
			tick: t.tick,
			tickCount: t.tickCount,
			tickFormatter: t.tickFormatter,
			ticks: t.ticks,
			type: t.type,
			unit: t.unit,
			axisType: c,
			categoricalDomain: a,
			duplicateDomain: i,
			isCategorical: l,
			niceTicks: s,
			range: o,
			realScaleType: n,
			scale: r
		};
	}
}), LC = (e, t, n, r, i, a, o, s, c) => {
	if (t != null && r != null) {
		var l = Jc(e, c), u = t.type, d = t.ticks, f = t.tickCount, p = n === "scaleBand" && typeof r.bandwidth == "function" ? r.bandwidth() / 2 : 2, m = u === "category" && r.bandwidth ? r.bandwidth() / p : 0;
		m = c === "angleAxis" && a != null && a.length >= 2 ? mt(a[0] - a[1]) * 2 * m : m;
		var h = d || i;
		return h ? h.map((e, t) => {
			var n = o ? o.indexOf(e) : e, i = r.map(n);
			return G(i) ? {
				index: t,
				coordinate: i + m,
				value: e,
				offset: m
			} : null;
		}).filter(wt) : l && s ? s.map((e, t) => {
			var n = r.map(e);
			return G(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(wt) : r.ticks ? r.ticks(f).map((e, t) => {
			var n = r.map(e);
			return G(n) ? {
				coordinate: n + m,
				value: e,
				index: t,
				offset: m
			} : null;
		}).filter(wt) : r.domain().map((e, t) => {
			var n = r.map(e);
			return G(n) ? {
				coordinate: n + m,
				value: o ? o[e] : e,
				index: t,
				offset: m
			} : null;
		}).filter(wt);
	}
}, RC = H([
	q,
	Gx,
	eC,
	_C,
	nC,
	fC,
	FC,
	gC,
	X
], LC), zC = (e, t, n, r, i, a, o) => {
	if (t != null && n != null && r != null && r[0] !== r[1]) {
		var s = Jc(e, o), c = t.tickCount, l = 0;
		return l = o === "angleAxis" && r?.length >= 2 ? mt(r[0] - r[1]) * 2 * l : l, s && a ? a.map((e, t) => {
			var r = n.map(e);
			return G(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(wt) : n.ticks ? n.ticks(c).map((e, t) => {
			var r = n.map(e);
			return G(r) ? {
				coordinate: r + l,
				value: e,
				index: t,
				offset: l
			} : null;
		}).filter(wt) : n.domain().map((e, t) => {
			var r = n.map(e);
			return G(r) ? {
				coordinate: r + l,
				value: i ? i[e] : e,
				index: t,
				offset: l
			} : null;
		}).filter(wt);
	}
}, BC = H([
	q,
	Gx,
	_C,
	fC,
	FC,
	gC,
	X
], zC), VC = H(Q, _C, (e, t) => {
	if (e != null && t != null) return Tx(Tx({}, e), {}, { scale: t });
});
H((e, t, n) => Ux(e, n), H([H([
	Q,
	eC,
	$S,
	pC
], _x)], lg), (e, t) => {
	if (e != null && t != null) return Tx(Tx({}, e), {}, { scale: t });
});
var HC = H([
	q,
	vl,
	yl
], (e, t, n) => {
	switch (e) {
		case "horizontal": return t.some((e) => e.reversed) ? "right-to-left" : "left-to-right";
		case "vertical": return n.some((e) => e.reversed) ? "bottom-to-top" : "top-to-bottom";
		case "centric":
		case "radial": return "left-to-right";
		default: return;
	}
});
H([(e, t, n) => e.renderedTicks[t]?.[n]], (e) => {
	if (e && e.length !== 0) return (t) => {
		var n = Infinity, r = e[0];
		for (var i of e) {
			var a = Math.abs(i.coordinate - t);
			a < n && (n = a, r = i);
		}
		return r?.value;
	};
});
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipEventType.js
var UC = (e) => e.options.defaultTooltipEventType, WC = (e) => e.options.validateTooltipEventTypes;
function GC(e, t, n) {
	if (e == null) return t;
	var r = e ? "axis" : "item";
	return n == null ? t : n.includes(r) ? r : t;
}
function KC(e, t) {
	return GC(t, UC(e), WC(e));
}
function qC(e) {
	return V((t) => KC(t, e));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineActiveLabel.js
var JC = (e, t) => {
	var n, r = Number(t);
	if (!(ht(r) || t == null)) return r >= 0 ? e == null || (n = e[r]) == null ? void 0 : n.value : void 0;
}, YC = (e) => e.tooltip.settings, XC = {
	active: !1,
	index: null,
	dataKey: void 0,
	graphicalItemId: void 0,
	coordinate: void 0
}, ZC = Gs({
	name: "tooltip",
	initialState: {
		itemInteraction: {
			click: XC,
			hover: XC
		},
		axisInteraction: {
			click: XC,
			hover: XC
		},
		keyboardInteraction: XC,
		syncInteraction: {
			active: !1,
			index: null,
			dataKey: void 0,
			label: void 0,
			coordinate: void 0,
			sourceViewBox: void 0,
			graphicalItemId: void 0
		},
		tooltipItemPayloads: [],
		settings: {
			shared: void 0,
			trigger: "hover",
			axisId: 0,
			active: !1,
			defaultIndex: void 0
		}
	},
	reducers: {
		addTooltipEntrySettings: {
			reducer(e, t) {
				e.tooltipItemPayloads.push(U(t.payload));
			},
			prepare: W()
		},
		replaceTooltipEntrySettings: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).tooltipItemPayloads.indexOf(U(r));
				a > -1 && (e.tooltipItemPayloads[a] = U(i));
			},
			prepare: W()
		},
		removeTooltipEntrySettings: {
			reducer(e, t) {
				var n = _s(e).tooltipItemPayloads.indexOf(U(t.payload));
				n > -1 && e.tooltipItemPayloads.splice(n, 1);
			},
			prepare: W()
		},
		setTooltipSettingsState(e, t) {
			e.settings = t.payload;
		},
		setActiveMouseOverItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		mouseLeaveChart(e) {
			e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
		},
		mouseLeaveItem(e) {
			e.itemInteraction.hover.active = !1;
		},
		setActiveClickItemIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setMouseOverAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
		},
		setMouseClickAxisIndex(e, t) {
			e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
		},
		setSyncInteraction(e, t) {
			e.syncInteraction = t.payload;
		},
		setKeyboardInteraction(e, t) {
			e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
		}
	}
}), QC = ZC.actions, $C = QC.addTooltipEntrySettings, ew = QC.replaceTooltipEntrySettings, tw = QC.removeTooltipEntrySettings, nw = QC.setTooltipSettingsState, rw = QC.setActiveMouseOverItemIndex, iw = QC.mouseLeaveItem, aw = QC.mouseLeaveChart, ow = QC.setActiveClickItemIndex, sw = QC.setMouseOverAxisIndex, cw = QC.setMouseClickAxisIndex, lw = QC.setSyncInteraction, uw = QC.setKeyboardInteraction, dw = ZC.reducer;
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipInteractionState.js
function fw(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fw(Object(n), !0).forEach(function(t) {
			mw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fw(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function mw(e, t, n) {
	return (t = hw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function hw(e) {
	var t = gw(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gw(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _w(e, t, n) {
	return t === "axis" ? n === "click" ? e.axisInteraction.click : e.axisInteraction.hover : n === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function vw(e) {
	return e.index != null;
}
var yw = (e, t, n, r) => {
	if (t == null) return XC;
	var i = _w(e, t, n);
	if (i == null) return XC;
	if (i.active) return i;
	if (e.keyboardInteraction.active) return e.keyboardInteraction;
	if (e.syncInteraction.active && e.syncInteraction.index != null) return e.syncInteraction;
	var a = e.settings.active === !0;
	if (vw(i)) {
		if (a) return pw(pw({}, i), {}, { active: !0 });
	} else if (r != null) return {
		active: !0,
		coordinate: void 0,
		dataKey: void 0,
		index: r,
		graphicalItemId: void 0
	};
	return pw(pw({}, XC), {}, { coordinate: i.coordinate });
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineActiveTooltipIndex.js
function bw(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
	if (e instanceof Date) {
		var t = e.valueOf();
		return Number.isFinite(t) ? t : void 0;
	}
	var n = Number(e);
	return Number.isFinite(n) ? n : void 0;
}
function xw(e, t) {
	var n = bw(e), r = t[0], i = t[1];
	return n !== void 0 && n >= Math.min(r, i) && n <= Math.max(r, i);
}
function Sw(e, t, n) {
	if (n == null || t == null) return !0;
	var r = K(e, t);
	return r == null || !nh(n) || xw(r, n);
}
var Cw = (e, t, n, r) => {
	var i = e?.index;
	if (i == null) return null;
	var a = Number(i);
	if (!G(a)) return i;
	var o = 0, s = Infinity;
	t.length > 0 && (s = t.length - 1);
	var c = Math.max(o, Math.min(a, s)), l = t[c];
	return l == null || Sw(l, n, r) ? String(c) : null;
}, ww = (e, t, n, r, i, a, o) => {
	if (a != null) {
		var s = o[0]?.getPosition(a);
		if (s != null) return s;
		var c = i?.[Number(a)];
		if (c) switch (n) {
			case "horizontal": return {
				x: c.coordinate,
				y: (r.top + t) / 2
			};
			default: return {
				x: (r.left + e) / 2,
				y: c.coordinate
			};
		}
	}
}, Tw = (e, t, n, r) => {
	if (t === "axis") return e.tooltipItemPayloads;
	if (e.tooltipItemPayloads.length === 0) return [];
	var i = n === "hover" ? e.itemInteraction.hover.graphicalItemId : e.itemInteraction.click.graphicalItemId;
	if (e.syncInteraction.active && i == null) return e.tooltipItemPayloads;
	if (i == null && (r != null || e.keyboardInteraction.active)) {
		var a = e.tooltipItemPayloads[0];
		return a == null ? [] : [a];
	}
	return e.tooltipItemPayloads.filter((e) => e.settings?.graphicalItemId === i);
}, Ew = (e) => e.options.tooltipPayloadSearcher, Dw = (e) => e.tooltip;
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipPayload.js
function Ow(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function kw(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ow(Object(n), !0).forEach(function(t) {
			Aw(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ow(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Aw(e, t, n) {
	return (t = jw(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function jw(e) {
	var t = Mw(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Mw(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Nw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
}
function Pw(e) {
	if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
}
function Fw(e) {
	if (typeof e == "string" || typeof e == "number") return e;
	if (typeof e == "function") return (t) => e(t);
}
function Iw(e) {
	if (typeof e == "string") return e;
}
function Lw(e) {
	if (typeof e == "object" && e) return {
		name: "name" in e ? Nw(e.name) : void 0,
		unit: "unit" in e ? Pw(e.unit) : void 0,
		dataKey: "dataKey" in e ? Fw(e.dataKey) : void 0,
		payload: "payload" in e ? e.payload : void 0,
		color: "color" in e ? Iw(e.color) : void 0,
		fill: "fill" in e ? Iw(e.fill) : void 0
	};
}
function Rw(e, t) {
	return e ?? t;
}
var zw = (e, t, n, r, i, a, o) => {
	if (t != null && a != null) {
		var s = n.chartData, c = n.computedData, l = n.dataStartIndex, u = n.dataEndIndex;
		return e.reduce((e, n) => {
			var d = n.dataDefinedOnItem, f = n.settings, p = Rw(d, s), m = Array.isArray(p) ? Bc(p, l, u) : p, h = f?.dataKey ?? r, g = f?.nameKey, _;
			return r && Array.isArray(m) && !Array.isArray(m[0]) && o === "axis" ? (_ = St(m, r, i), _ ??= a(m, t, c, g)) : _ = a(m, t, c, g), Array.isArray(_) ? _.forEach((t) => {
				var n = Lw(t), r = n?.name, i = n?.dataKey, a = n?.payload, o = kw(kw({}, f), {}, {
					name: r,
					unit: n?.unit,
					color: n?.color ?? f?.color,
					fill: n?.fill ?? f?.fill
				});
				e.push(ul({
					tooltipEntrySettings: o,
					dataKey: i,
					payload: a,
					value: K(a, i),
					name: r == null ? void 0 : String(r)
				}));
			}) : e.push(ul({
				tooltipEntrySettings: f,
				dataKey: h,
				payload: _,
				value: K(_, h),
				name: K(_, g) ?? f?.name
			})), e;
		}, []);
	}
}, Bw = H([
	gS,
	Kx,
	Dh
], bx), Vw = H([
	H([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]),
	gS,
	H([sg, cg], qx)
], Xx, { memoizeOptions: { resultEqualityCheck: ag } }), Hw = H([Vw], (e) => e.filter(rg)), Uw = H([Vw], tS, { memoizeOptions: { resultEqualityCheck: ag } }), Ww = H([Vw], (e) => e.some((e) => !e.data)), Gw = H([Uw, Um], iS), Kw = H([
	Hw,
	Um,
	gS
], ng), qw = H([
	Gw,
	gS,
	Vw,
	Um,
	Ww,
	Uw
], sS), Jw = H([gS], CS), Yw = H([Jw, H([gS], (e) => e.allowDataOverflow)], ih), Xw = H([
	H([
		Kw,
		H([Vw], (e) => e.filter(rg)),
		Th,
		Eh
	], yS),
	Um,
	sg,
	Yw
], xS), Zw = H([
	Gw,
	gS,
	H([Vw], $x),
	DS,
	sg,
	Ym
], AS, { memoizeOptions: { resultEqualityCheck: ig } }), Qw = H([H([
	PS,
	sg,
	cg
], FS), sg], VS), $w = H([H([
	LS,
	sg,
	cg
], FS), sg], US), eT = H([
	gS,
	q,
	Gw,
	qw,
	Th,
	sg,
	H([
		gS,
		Jw,
		Yw,
		Xw,
		Zw,
		H([
			Qw,
			H([H([
				zS,
				sg,
				cg
			], FS), sg], qS),
			$w
		], kS),
		q,
		sg
	], YS)
], QS), tT = H([
	gS,
	eT,
	H([
		eT,
		gS,
		Bw
	], tC),
	sg
], rC), nT = (e) => fC(e, sg(e), cg(e), !1), rT = H([gS, nT], Ph), iT = H([H([
	gS,
	Bw,
	tT,
	rT
], _x)], lg), aT = H([
	q,
	gS,
	Bw,
	iT,
	nT,
	H([
		q,
		qw,
		gS,
		sg
	], PC),
	H([
		q,
		qw,
		gS,
		sg
	], hC),
	sg
], (e, t, n, r, i, a, o, s) => {
	if (t) {
		var c = t.type, l = Jc(e, s);
		if (r) {
			var u = n === "scaleBand" && r.bandwidth ? r.bandwidth() / 2 : 2, d = c === "category" && r.bandwidth ? r.bandwidth() / u : 0;
			return d = s === "angleAxis" && i != null && i?.length >= 2 ? mt(i[0] - i[1]) * 2 * d : d, l && o ? o.map((e, t) => {
				var n = r.map(e);
				return G(n) ? {
					coordinate: n + d,
					value: e,
					index: t,
					offset: d
				} : null;
			}).filter(wt) : r.domain().map((e, t) => {
				var n = r.map(e);
				return G(n) ? {
					coordinate: n + d,
					value: a ? a[e] : e,
					index: t,
					offset: d
				} : null;
			}).filter(wt);
		}
	}
}), oT = H([
	UC,
	WC,
	YC
], (e, t, n) => GC(n.shared, e, t)), sT = (e) => e.tooltip.settings.trigger, cT = (e) => e.tooltip.settings.defaultIndex, lT = H([
	Dw,
	oT,
	sT,
	cT
], yw), uT = H([
	lT,
	Gw,
	_S,
	eT
], Cw), dT = H([aT, uT], JC), fT = H([lT], (e) => {
	if (e) return e.dataKey;
}), pT = H([lT], (e) => {
	if (e) return e.graphicalItemId;
}), mT = H([
	Dw,
	oT,
	sT,
	cT
], Tw), hT = H([lT, H([
	ml,
	hl,
	q,
	jl,
	aT,
	cT,
	mT
], ww)], (e, t) => e != null && e.coordinate ? e.coordinate : t), gT = H([lT], (e) => e?.active ?? !1), _T = H([H([
	mT,
	uT,
	Um,
	_S,
	dT,
	Ew,
	oT
], zw)], (e) => {
	if (e != null) {
		var t = e.map((e) => e.payload).filter((e) => e != null);
		return Array.from(new Set(t));
	}
});
//#endregion
//#region node_modules/recharts/es6/context/useTooltipAxis.js
function vT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function yT(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? vT(Object(n), !0).forEach(function(t) {
			bT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function bT(e, t, n) {
	return (t = xT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function xT(e) {
	var t = ST(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ST(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var CT = () => V(gS), wT = () => {
	var e = CT(), t = V(aT), n = V(iT);
	return ll(!e || !n ? void 0 : yT(yT({}, e), {}, { scale: n }), t);
};
//#endregion
//#region node_modules/recharts/es6/util/getActiveCoordinate.js
function TT(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function ET(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? TT(Object(n), !0).forEach(function(t) {
			DT(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : TT(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function DT(e, t, n) {
	return (t = OT(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function OT(e) {
	var t = kT(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kT(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var AT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "horizontal") return {
			x: i.coordinate,
			y: r.relativeY
		};
		if (e === "vertical") return {
			x: r.relativeX,
			y: i.coordinate
		};
	}
	return {
		x: 0,
		y: 0
	};
}, jT = (e, t, n, r) => {
	var i = t.find((e) => e && e.index === n);
	if (i) {
		if (e === "centric") {
			var a = i.coordinate, o = r.radius;
			return ET(ET(ET({}, r), gm(r.cx, r.cy, o, a)), {}, {
				angle: a,
				radius: o
			});
		}
		var s = i.coordinate, c = r.angle;
		return ET(ET(ET({}, r), gm(r.cx, r.cy, s, c)), {}, {
			angle: c,
			radius: s
		});
	}
	return {
		angle: 0,
		clockWise: !1,
		cx: 0,
		cy: 0,
		endAngle: 0,
		innerRadius: 0,
		outerRadius: 0,
		radius: 0,
		startAngle: 0,
		x: 0,
		y: 0
	};
};
function MT(e, t) {
	var n = e.relativeX, r = e.relativeY;
	return n >= t.left && n <= t.left + t.width && r >= t.top && r <= t.top + t.height;
}
var NT = (e, t, n, r, i) => {
	var a = t?.length ?? 0;
	if (a <= 1 || e == null) return 0;
	if (r === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6) for (var o = i[1] - i[0], s = (t, n, r) => [
		e,
		e + o,
		e - o
	].some((e) => (r ? e >= t : e > t) && e <= n), c = 0; c < a; c++) {
		var l = c > 0 ? n[c - 1]?.coordinate : n[a - 1]?.coordinate, u = n[c]?.coordinate, d = c >= a - 1 ? n[0]?.coordinate : n[c + 1]?.coordinate, f = void 0;
		if (l != null && u != null && d != null) {
			if (mt(u - l) !== mt(d - u)) {
				var p = [];
				if (mt(d - u) === mt(i[1] - i[0])) {
					f = d;
					var m = u + i[1] - i[0];
					p[0] = Math.min(m, (m + l) / 2), p[1] = Math.max(m, (m + l) / 2);
				} else {
					f = l;
					var h = d + i[1] - i[0];
					p[0] = Math.min(u, (h + u) / 2), p[1] = Math.max(u, (h + u) / 2);
				}
				var g = [Math.min(u, (f + u) / 2), Math.max(u, (f + u) / 2)];
				if (s(g[0], g[1], !1) || s(p[0], p[1], !0)) return n[c]?.index;
			} else {
				var _ = Math.min(l, d), v = Math.max(l, d);
				if (s((_ + u) / 2, (v + u) / 2, !1)) return n[c]?.index;
			}
		}
	}
	else if (t) for (var y = 0; y < a; y++) {
		var b = t[y];
		if (b != null) {
			var x = t[y + 1], S = t[y - 1];
			if (y === 0 && x != null && e <= (b.coordinate + x.coordinate) / 2 || y === a - 1 && S != null && e > (b.coordinate + S.coordinate) / 2 || y > 0 && y < a - 1 && S != null && x != null && e > (b.coordinate + S.coordinate) / 2 && e <= (b.coordinate + x.coordinate) / 2) return b.index;
		}
	}
	return -1;
}, PT = () => V(Dh), FT = (e, t) => t, IT = (e, t, n) => n, LT = (e, t, n, r) => r, RT = H(aT, (e) => Ta(e, (e) => e.coordinate)), zT = H([
	Dw,
	FT,
	IT,
	LT
], yw), BT = H([
	zT,
	Gw,
	_S,
	eT
], Cw), VT = (e, t, n) => {
	if (t != null) {
		var r = Dw(e);
		return t === "axis" ? n === "hover" ? r.axisInteraction.hover.dataKey : r.axisInteraction.click.dataKey : n === "hover" ? r.itemInteraction.hover.dataKey : r.itemInteraction.click.dataKey;
	}
}, HT = H([
	Dw,
	FT,
	IT,
	LT
], Tw), UT = H([
	ml,
	hl,
	q,
	jl,
	aT,
	LT,
	HT
], ww), WT = H([zT, UT], (e, t) => e.coordinate ?? t), GT = H([aT, BT], JC), KT = H([
	HT,
	BT,
	Um,
	_S,
	GT,
	Ew,
	FT
], zw), qT = H([zT, BT], (e, t) => ({
	isActive: e.active && t != null,
	activeIndex: t
})), JT = (e, t, n, r, i, a, o) => {
	if (e && n && r && i && MT(e, o)) {
		var s = NT(fl(e, t), a, i, n, r), c = AT(t, i, s, e);
		return {
			activeIndex: String(s),
			activeCoordinate: c
		};
	}
}, YT = (e, t, n, r, i, a, o) => {
	if (e && r && i && a && n) {
		var s = Sm(e, n);
		if (s) {
			var c = NT(pl(s, t), o, a, r, i), l = jT(t, a, c, s);
			return {
				activeIndex: String(c),
				activeCoordinate: l
			};
		}
	}
}, XT = (e, t, n, r, i, a, o, s) => {
	if (e && t && r && i && a) return t === "horizontal" || t === "vertical" ? JT(e, t, r, i, a, o, s) : YT(e, t, n, r, i, a, o);
}, ZT = H((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, n) => n, (e, t, n) => {
	if (t != null) {
		var r = e[t];
		if (r != null) return n ? r.panoramaElement : r.element;
	}
}), QT = H((e) => e.zIndex.zIndexMap, (e) => {
	var t = Object.keys(e).map((e) => parseInt(e, 10)).concat(Object.values(Y));
	return Array.from(new Set(t)).sort((e, t) => e - t);
}, { memoizeOptions: { resultEqualityCheck: og } });
//#endregion
//#region node_modules/recharts/es6/state/zIndexSlice.js
function $T(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function eE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? $T(Object(n), !0).forEach(function(t) {
			tE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $T(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function tE(e, t, n) {
	return (t = nE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function nE(e) {
	var t = rE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function rE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var iE = { zIndexMap: Object.values(Y).reduce((e, t) => eE(eE({}, e), {}, { [t]: {
	element: void 0,
	panoramaElement: void 0,
	consumers: 0
} }), {}) }, aE = new Set(Object.values(Y));
function oE(e) {
	return aE.has(e);
}
var sE = Gs({
	name: "zIndex",
	initialState: iE,
	reducers: {
		registerZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] ? e.zIndexMap[n].consumers += 1 : e.zIndexMap[n] = {
					consumers: 1,
					element: void 0,
					panoramaElement: void 0
				};
			},
			prepare: W()
		},
		unregisterZIndexPortal: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (--e.zIndexMap[n].consumers, e.zIndexMap[n].consumers <= 0 && !oE(n) && delete e.zIndexMap[n]);
			},
			prepare: W()
		},
		registerZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload, r = n.zIndex, i = n.element, a = n.isPanorama;
				e.zIndexMap[r] ? a ? e.zIndexMap[r].panoramaElement = U(i) : e.zIndexMap[r].element = U(i) : e.zIndexMap[r] = {
					consumers: 0,
					element: a ? void 0 : U(i),
					panoramaElement: a ? U(i) : void 0
				};
			},
			prepare: W()
		},
		unregisterZIndexPortalElement: {
			reducer: (e, t) => {
				var n = t.payload.zIndex;
				e.zIndexMap[n] && (t.payload.isPanorama ? e.zIndexMap[n].panoramaElement = void 0 : e.zIndexMap[n].element = void 0);
			},
			prepare: W()
		}
	}
}), cE = sE.actions, lE = cE.registerZIndexPortal, uE = cE.unregisterZIndexPortal, dE = cE.registerZIndexPortalElement, fE = cE.unregisterZIndexPortalElement, pE = sE.reducer;
//#endregion
//#region node_modules/recharts/es6/zIndex/ZIndexLayer.js
function mE(e) {
	var t = e.zIndex, n = e.children, r = Du() && t !== void 0 && t !== 0, i = Fl(), a = (0, P.useRef)(void 0), o = (0, P.useRef)(/* @__PURE__ */ new Set()), s = B(), c = V((e) => ZT(e, t, i));
	if ((0, P.useLayoutEffect)(() => {
		if (!r) {
			var e = o.current;
			e.forEach((e) => {
				s(uE({ zIndex: e }));
			}), e.clear(), a.current = void 0;
		} else if (o.current.has(t) || (s(lE({ zIndex: t })), o.current.add(t)), c) {
			a.current = c;
			var n = o.current;
			n.forEach((e) => {
				e !== t && (s(uE({ zIndex: e })), n.delete(e));
			});
		}
	}, [
		s,
		t,
		r,
		c
	]), (0, P.useLayoutEffect)(() => {
		var e = o.current;
		return () => {
			e.forEach((e) => {
				s(uE({ zIndex: e }));
			}), e.clear();
		};
	}, [s]), !r) return n;
	var l = c ?? a.current;
	return l ? /*#__PURE__*/ (0, Fe.createPortal)(n, l) : null;
}
//#endregion
//#region node_modules/recharts/es6/component/Cursor.js
function hE() {
	return hE = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, hE.apply(null, arguments);
}
function gE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function _E(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? gE(Object(n), !0).forEach(function(t) {
			vE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function vE(e, t, n) {
	return (t = yE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function yE(e) {
	var t = bE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function bE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function xE(e) {
	var t = e.cursor, n = e.cursorComp, r = e.cursorProps;
	return /*#__PURE__*/ (0, P.isValidElement)(t) ? /*#__PURE__*/ (0, P.cloneElement)(t, r) : /*#__PURE__*/ (0, P.createElement)(n, r);
}
function SE(e) {
	var t = e.coordinate, n = e.payload, r = e.index, i = e.offset, a = e.tooltipAxisBandSize, o = e.layout, s = e.cursor, c = e.tooltipEventType, u = e.chartName, d = t, f = n, p = r;
	if (!s || !d || u !== "ScatterChart" && c !== "axis") return null;
	var m, h, g;
	if (u === "ScatterChart") m = d, h = Jf, g = Y.cursorLine;
	else if (u === "BarChart") m = Yf(o, d, i, a), h = sm, g = Y.cursorRectangle;
	else if (o === "radial" && xr(d)) {
		var _ = Cm(d), v = _.cx, y = _.cy, b = _.radius;
		m = {
			cx: v,
			cy: y,
			startAngle: _.startAngle,
			endAngle: _.endAngle,
			innerRadius: b,
			outerRadius: b
		}, h = Rm, g = Y.cursorLine;
	} else m = { points: zm(o, d, i) }, h = Lf, g = Y.cursorLine;
	var x = typeof s == "object" && "className" in s ? s.className : void 0, S = _E(_E(_E(_E({
		stroke: "#ccc",
		pointerEvents: "none"
	}, i), m), He(s)), {}, {
		payload: f,
		payloadIndex: p,
		className: l("recharts-tooltip-cursor", x)
	});
	return /*#__PURE__*/ P.createElement(mE, { zIndex: e.zIndex ?? g }, /*#__PURE__*/ P.createElement(xE, {
		cursor: s,
		cursorComp: h,
		cursorProps: S
	}));
}
function CE(e) {
	var t = wT(), n = yu(), r = Cu(), i = PT();
	return t == null || n == null || r == null || i == null ? null : /*#__PURE__*/ P.createElement(SE, hE({}, e, {
		offset: n,
		layout: r,
		tooltipAxisBandSize: t,
		chartName: i
	}));
}
//#endregion
//#region node_modules/recharts/es6/context/tooltipPortalContext.js
var wE = /*#__PURE__*/ (0, P.createContext)(null), TE = () => (0, P.useContext)(wE), EE = (/* @__PURE__ */ i((/* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = "~";
	function i() {}
	Object.create && (i.prototype = Object.create(null), new i().__proto__ || (r = !1));
	function a(e, t, n) {
		this.fn = e, this.context = t, this.once = n || !1;
	}
	function o(e, t, n, i, o) {
		if (typeof n != "function") throw TypeError("The listener must be a function");
		var s = new a(n, i || e, o), c = r ? r + t : t;
		return e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], s] : e._events[c].push(s) : (e._events[c] = s, e._eventsCount++), e;
	}
	function s(e, t) {
		--e._eventsCount === 0 ? e._events = new i() : delete e._events[t];
	}
	function c() {
		this._events = new i(), this._eventsCount = 0;
	}
	c.prototype.eventNames = function() {
		var e = [], t, i;
		if (this._eventsCount === 0) return e;
		for (i in t = this._events) n.call(t, i) && e.push(r ? i.slice(1) : i);
		return Object.getOwnPropertySymbols ? e.concat(Object.getOwnPropertySymbols(t)) : e;
	}, c.prototype.listeners = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		if (!n) return [];
		if (n.fn) return [n.fn];
		for (var i = 0, a = n.length, o = Array(a); i < a; i++) o[i] = n[i].fn;
		return o;
	}, c.prototype.listenerCount = function(e) {
		var t = r ? r + e : e, n = this._events[t];
		return n ? n.fn ? 1 : n.length : 0;
	}, c.prototype.emit = function(e, t, n, i, a, o) {
		var s = r ? r + e : e;
		if (!this._events[s]) return !1;
		var c = this._events[s], l = arguments.length, u, d;
		if (c.fn) {
			switch (c.once && this.removeListener(e, c.fn, void 0, !0), l) {
				case 1: return c.fn.call(c.context), !0;
				case 2: return c.fn.call(c.context, t), !0;
				case 3: return c.fn.call(c.context, t, n), !0;
				case 4: return c.fn.call(c.context, t, n, i), !0;
				case 5: return c.fn.call(c.context, t, n, i, a), !0;
				case 6: return c.fn.call(c.context, t, n, i, a, o), !0;
			}
			for (d = 1, u = Array(l - 1); d < l; d++) u[d - 1] = arguments[d];
			c.fn.apply(c.context, u);
		} else {
			var f = c.length, p;
			for (d = 0; d < f; d++) switch (c[d].once && this.removeListener(e, c[d].fn, void 0, !0), l) {
				case 1:
					c[d].fn.call(c[d].context);
					break;
				case 2:
					c[d].fn.call(c[d].context, t);
					break;
				case 3:
					c[d].fn.call(c[d].context, t, n);
					break;
				case 4:
					c[d].fn.call(c[d].context, t, n, i);
					break;
				default:
					if (!u) for (p = 1, u = Array(l - 1); p < l; p++) u[p - 1] = arguments[p];
					c[d].fn.apply(c[d].context, u);
			}
		}
		return !0;
	}, c.prototype.on = function(e, t, n) {
		return o(this, e, t, n, !1);
	}, c.prototype.once = function(e, t, n) {
		return o(this, e, t, n, !0);
	}, c.prototype.removeListener = function(e, t, n, i) {
		var a = r ? r + e : e;
		if (!this._events[a]) return this;
		if (!t) return s(this, a), this;
		var o = this._events[a];
		if (o.fn) o.fn === t && (!i || o.once) && (!n || o.context === n) && s(this, a);
		else {
			for (var c = 0, l = [], u = o.length; c < u; c++) (o[c].fn !== t || i && !o[c].once || n && o[c].context !== n) && l.push(o[c]);
			l.length ? this._events[a] = l.length === 1 ? l[0] : l : s(this, a);
		}
		return this;
	}, c.prototype.removeAllListeners = function(e) {
		var t;
		return e ? (t = r ? r + e : e, this._events[t] && s(this, t)) : (this._events = new i(), this._eventsCount = 0), this;
	}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = r, c.EventEmitter = c, t !== void 0 && (t.exports = c);
})))(), 1)).default, DE = new EE(), OE = "recharts.syncEvent.tooltip", kE = "recharts.syncEvent.brush", AE = (e, t) => {
	if (t && Array.isArray(e)) {
		var n = Number.parseInt(t, 10);
		if (!ht(n)) return e[n];
	}
}, jE = Gs({
	name: "options",
	initialState: {
		chartName: "",
		tooltipPayloadSearcher: () => void 0,
		eventEmitter: void 0,
		defaultTooltipEventType: "axis"
	},
	reducers: { createEventEmitter: (e) => {
		e.eventEmitter ??= Symbol("rechartsEventEmitter");
	} }
}), ME = jE.reducer, NE = jE.actions.createEventEmitter;
//#endregion
//#region node_modules/recharts/es6/synchronisation/syncSelectors.js
function PE(e) {
	return e.tooltip.syncInteraction;
}
var FE = Gs({
	name: "chartData",
	initialState: {
		chartData: void 0,
		computedData: void 0,
		dataStartIndex: 0,
		dataEndIndex: 0
	},
	reducers: {
		setChartData(e, t) {
			e.chartData = U(t.payload), t.payload == null ? (e.dataStartIndex = 0, e.dataEndIndex = 0) : t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
		},
		setComputedData(e, t) {
			e.computedData = t.payload;
		},
		setDataStartEndIndexes(e, t) {
			var n = t.payload, r = n.startIndex, i = n.endIndex;
			r != null && (e.dataStartIndex = r), i != null && (e.dataEndIndex = i);
		}
	}
}), IE = FE.actions, LE = IE.setChartData, RE = IE.setDataStartEndIndexes;
IE.setComputedData;
var zE = FE.reducer, BE = ["x", "y"];
function VE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function HE(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? VE(Object(n), !0).forEach(function(t) {
			UE(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : VE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function UE(e, t, n) {
	return (t = WE(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function WE(e) {
	var t = GE(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function GE(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function KE(e, t) {
	if (e == null) return {};
	var n, r, i = qE(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qE(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function JE() {
	var e = V(Oh), t = V(Ah), n = B(), r = V(kh), i = V(aT), a = Cu(), o = _u(), s = V((e) => e.rootProps.className);
	(0, P.useEffect)(() => {
		if (e == null) return Tt;
		var s = (s, c, l) => {
			if (t !== l && e === s) {
				if (c.payload.active === !1) n(lw({
					active: !1,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: void 0,
					graphicalItemId: void 0
				}));
				else if (r === "index") {
					var u;
					if (o && c != null && (u = c.payload) != null && u.coordinate && c.payload.sourceViewBox) {
						var d = c.payload.coordinate, f = d.x, p = d.y, m = KE(d, BE), h = c.payload.sourceViewBox, g = h.x, _ = h.y, v = h.width, y = h.height, b = HE(HE({}, m), {}, {
							x: o.x + (v ? (f - g) / v : 0) * o.width,
							y: o.y + (y ? (p - _) / y : 0) * o.height
						});
						n(HE(HE({}, c), {}, { payload: HE(HE({}, c.payload), {}, { coordinate: b }) }));
					} else n(c);
				} else if (i != null) {
					var x;
					typeof r == "function" ? x = i[r(i, {
						activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						isTooltipActive: c.payload.active,
						activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
						activeLabel: c.payload.label,
						activeDataKey: c.payload.dataKey,
						activeCoordinate: c.payload.coordinate
					})] : r === "value" && (x = i.find((e) => String(e.value) === c.payload.label));
					var S = c.payload.coordinate;
					if (S == null || o == null) n(lw({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: void 0,
						graphicalItemId: void 0
					}));
					else if (x == null) n(lw({
						active: !1,
						coordinate: void 0,
						dataKey: void 0,
						index: null,
						label: void 0,
						sourceViewBox: c.payload.sourceViewBox,
						graphicalItemId: void 0
					}));
					else {
						var C = S.x, w = S.y, T = Math.min(C, o.x + o.width), E = Math.min(w, o.y + o.height), D = {
							x: a === "horizontal" ? x.coordinate : T,
							y: a === "horizontal" ? E : x.coordinate
						};
						n(lw({
							active: c.payload.active,
							coordinate: D,
							dataKey: c.payload.dataKey,
							index: String(x.index),
							label: c.payload.label,
							sourceViewBox: c.payload.sourceViewBox,
							graphicalItemId: c.payload.graphicalItemId
						}));
					}
				}
			}
		};
		return DE.on(OE, s), () => {
			DE.off(OE, s);
		};
	}, [
		s,
		n,
		t,
		e,
		r,
		i,
		a,
		o
	]);
}
function YE() {
	var e = V(Oh), t = V(Ah), n = B();
	(0, P.useEffect)(() => {
		if (e == null) return Tt;
		var r = (r, i, a) => {
			t !== a && e === r && n(RE(i));
		};
		return DE.on(kE, r), () => {
			DE.off(kE, r);
		};
	}, [
		n,
		t,
		e
	]);
}
function XE() {
	var e = B();
	(0, P.useEffect)(() => {
		e(NE());
	}, [e]), JE(), YE();
}
function ZE(e, t, n, r, i, a) {
	var o = V((n) => VT(n, e, t)), s = V(pT), c = V(Ah), l = V(Oh), u = V(kh), d = V(PE)?.sourceViewBox != null, f = _u();
	(0, P.useEffect)(() => {
		if (!d && l != null && c != null) {
			var e = lw({
				active: a,
				coordinate: n,
				dataKey: o,
				index: i,
				label: typeof r == "number" ? String(r) : r,
				sourceViewBox: f,
				graphicalItemId: s
			});
			DE.emit(OE, l, e, c);
		}
	}, [
		d,
		n,
		o,
		s,
		i,
		r,
		c,
		l,
		u,
		a,
		f
	]);
}
//#endregion
//#region node_modules/recharts/es6/component/Tooltip.js
function QE(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function $E(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? QE(Object(n), !0).forEach(function(t) {
			eD(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : QE(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function eD(e, t, n) {
	return (t = tD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function tD(e) {
	var t = nD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function nD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function rD(e, t) {
	return cD(e) || sD(e, t) || aD(e, t) || iD();
}
function iD() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function aD(e, t) {
	if (e) {
		if (typeof e == "string") return oD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? oD(e, t) : void 0;
	}
}
function oD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function sD(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function cD(e) {
	if (Array.isArray(e)) return e;
}
function lD(e) {
	return e.dataKey;
}
function uD(e, t) {
	return /*#__PURE__*/ P.isValidElement(e) ? /*#__PURE__*/ P.cloneElement(e, t) : typeof e == "function" ? /*#__PURE__*/ P.createElement(e, t) : /*#__PURE__*/ P.createElement(Kd, t);
}
var dD = [], fD = {
	allowEscapeViewBox: {
		x: !1,
		y: !1
	},
	animationDuration: 400,
	animationEasing: "ease",
	axisId: 0,
	contentStyle: {},
	cursor: !0,
	filterNull: !0,
	includeHidden: !1,
	isAnimationActive: "auto",
	itemSorter: "name",
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: {
		x: !1,
		y: !1
	},
	separator: " : ",
	trigger: "hover",
	useTranslate3d: !1,
	wrapperStyle: {}
};
function pD(e) {
	var t = Ar(e, fD), n = t.active, r = t.allowEscapeViewBox, i = t.animationDuration, a = t.animationEasing, o = t.content, s = t.filterNull, c = t.isAnimationActive, l = t.offset, u = t.payloadUniqBy, d = t.position, f = t.reverseDirection, p = t.useTranslate3d, m = t.wrapperStyle, h = t.cursor, g = t.shared, _ = t.trigger, v = t.defaultIndex, y = t.portal, b = t.axisId, x = B(), S = typeof v == "number" ? String(v) : v;
	(0, P.useEffect)(() => {
		x(nw({
			shared: g,
			trigger: _,
			axisId: b,
			active: n,
			defaultIndex: S
		}));
	}, [
		x,
		g,
		_,
		b,
		n,
		S
	]);
	var C = _u(), w = Sf(), T = qC(g), E = V((e) => qT(e, T, _, S)) ?? {}, D = E.activeIndex, O = E.isActive, k = V((e) => KT(e, T, _, S)), A = V((e) => GT(e, T, _, S)), j = V((e) => WT(e, T, _, S)), M = k, N = TE(), ee = n ?? O ?? !1, te = rD(za([M, ee]), 2), ne = te[0], re = te[1], ie = T === "axis" ? A : void 0;
	ZE(T, _, j, ie, D, ee);
	var ae = y ?? N;
	if (ae == null || C == null || T == null) return null;
	var oe = M ?? dD;
	ee || (oe = dD), s && oe.length && (oe = Qi(oe.filter((e) => e.value != null && (e.hide !== !0 || t.includeHidden)), u, lD));
	var se = oe.length > 0, ce = $E($E({}, t), {}, {
		payload: oe,
		label: ie,
		active: ee,
		activeIndex: D,
		coordinate: j,
		accessibilityLayer: w
	}), le = /*#__PURE__*/ P.createElement(xf, {
		allowEscapeViewBox: r,
		animationDuration: i,
		animationEasing: a,
		isAnimationActive: c,
		active: ee,
		coordinate: j,
		hasPayload: se,
		offset: l,
		position: d,
		reverseDirection: f,
		useTranslate3d: p,
		viewBox: C,
		wrapperStyle: m,
		lastBoundingBox: ne,
		innerRef: re,
		hasPortalFromProps: !!y
	}, uD(o, ce));
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ (0, Fe.createPortal)(le, ae), ee && /*#__PURE__*/ P.createElement(CE, {
		cursor: h,
		tooltipEventType: T,
		coordinate: j,
		payload: oe,
		index: D
	}));
}
//#endregion
//#region node_modules/recharts/es6/component/Cell.js
var mD = (e) => null;
mD.displayName = "Cell";
//#endregion
//#region node_modules/recharts/es6/util/LRUCache.js
function hD(e, t, n) {
	return (t = gD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gD(e) {
	var t = _D(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _D(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var vD = class {
	constructor(e) {
		hD(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = e;
	}
	get(e) {
		var t = this.cache.get(e);
		return t !== void 0 && (this.cache.delete(e), this.cache.set(e, t)), t;
	}
	set(e, t) {
		if (this.cache.has(e)) this.cache.delete(e);
		else if (this.cache.size >= this.maxSize) {
			var n = this.cache.keys().next().value;
			n != null && this.cache.delete(n);
		}
		this.cache.set(e, t);
	}
	clear() {
		this.cache.clear();
	}
	size() {
		return this.cache.size;
	}
};
//#endregion
//#region node_modules/recharts/es6/util/DOMUtils.js
function yD(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function bD(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? yD(Object(n), !0).forEach(function(t) {
			xD(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : yD(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function xD(e, t, n) {
	return (t = SD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function SD(e) {
	var t = CD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function CD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var wD = bD({}, {
	cacheSize: 2e3,
	enableCache: !0
}), TD = new vD(wD.cacheSize), ED = {
	position: "absolute",
	top: "-20000px",
	left: 0,
	padding: 0,
	margin: 0,
	border: "none",
	whiteSpace: "pre"
}, DD = "recharts_measurement_span";
function OD(e, t) {
	return `${e}|${t.fontSize || ""}|${t.fontFamily || ""}|${t.fontWeight || ""}|${t.fontStyle || ""}|${t.letterSpacing || ""}|${t.textTransform || ""}`;
}
var kD = (e, t) => {
	try {
		var n = document.getElementById(DD);
		n || (n = document.createElement("span"), n.setAttribute("id", DD), n.setAttribute("aria-hidden", "true"), document.body.appendChild(n)), Object.assign(n.style, ED, t), n.textContent = `${e}`;
		var r = n.getBoundingClientRect();
		return {
			width: r.width,
			height: r.height
		};
	} catch {
		return {
			width: 0,
			height: 0
		};
	}
}, AD = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	if (e == null || $d.isSsr) return {
		width: 0,
		height: 0
	};
	if (!wD.enableCache) return kD(e, t);
	var n = OD(e, t), r = TD.get(n);
	if (r) return r;
	var i = kD(e, t);
	return TD.set(n, i), i;
}, jD;
function MD(e, t) {
	return LD(e) || ID(e, t) || PD(e, t) || ND();
}
function ND() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function PD(e, t) {
	if (e) {
		if (typeof e == "string") return FD(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? FD(e, t) : void 0;
	}
}
function FD(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function ID(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function LD(e) {
	if (Array.isArray(e)) return e;
}
function RD(e, t, n) {
	return (t = zD(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function zD(e) {
	var t = BD(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function BD(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var VD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, HD = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, UD = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, WD = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, GD = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	pt: 96 / 72,
	pc: 16,
	in: 96,
	Q: 96 / 101.6,
	px: 1
}, KD = [
	"cm",
	"mm",
	"pt",
	"pc",
	"in",
	"Q",
	"px"
];
function qD(e) {
	return KD.includes(e);
}
var JD = "NaN";
function YD(e, t) {
	return e * GD[t];
}
var XD = class e {
	static parse(t) {
		var n = MD(WD.exec(t) ?? [], 3), r = n[1], i = n[2];
		return r == null ? e.NaN : new e(parseFloat(r), i ?? "");
	}
	constructor(e, t) {
		this.num = e, this.unit = t, this.num = e, this.unit = t, ht(e) && (this.unit = ""), t !== "" && !UD.test(t) && (this.num = NaN, this.unit = ""), qD(t) && (this.num = YD(e, t), this.unit = "px");
	}
	add(t) {
		return this.unit === t.unit ? new e(this.num + t.num, this.unit) : new e(NaN, "");
	}
	subtract(t) {
		return this.unit === t.unit ? new e(this.num - t.num, this.unit) : new e(NaN, "");
	}
	multiply(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num * t.num, this.unit || t.unit);
	}
	divide(t) {
		return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new e(NaN, "") : new e(this.num / t.num, this.unit || t.unit);
	}
	toString() {
		return `${this.num}${this.unit}`;
	}
	isNaN() {
		return ht(this.num);
	}
};
jD = XD, RD(XD, "NaN", new jD(NaN, ""));
function ZD(e) {
	if (e == null || e.includes(JD)) return JD;
	for (var t = e; t.includes("*") || t.includes("/");) {
		var n = MD(VD.exec(t) ?? [], 4), r = n[1], i = n[2], a = n[3], o = XD.parse(r ?? ""), s = XD.parse(a ?? ""), c = i === "*" ? o.multiply(s) : o.divide(s);
		if (c.isNaN()) return JD;
		t = t.replace(VD, c.toString());
	}
	for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t);) {
		var l = MD(HD.exec(t) ?? [], 4), u = l[1], d = l[2], f = l[3], p = XD.parse(u ?? ""), m = XD.parse(f ?? ""), h = d === "+" ? p.add(m) : p.subtract(m);
		if (h.isNaN()) return JD;
		t = t.replace(HD, h.toString());
	}
	return t;
}
var QD = /\(([^()]*)\)/;
function $D(e) {
	for (var t = e, n; (n = QD.exec(t)) != null;) {
		var r = MD(n, 2)[1];
		t = t.replace(QD, ZD(r));
	}
	return t;
}
function eO(e) {
	var t = e.replace(/\s+/g, "");
	return t = $D(t), t = ZD(t), t;
}
function tO(e) {
	try {
		return eO(e);
	} catch {
		return JD;
	}
}
function nO(e) {
	var t = tO(e.slice(5, -1));
	return t === JD ? "" : t;
}
//#endregion
//#region node_modules/recharts/es6/component/Text.js
var rO = [
	"x",
	"y",
	"lineHeight",
	"capHeight",
	"fill",
	"scaleToFit",
	"textAnchor",
	"verticalAnchor"
], iO = [
	"dx",
	"dy",
	"angle",
	"className",
	"breakAll"
];
function aO() {
	return aO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, aO.apply(null, arguments);
}
function oO(e, t) {
	if (e == null) return {};
	var n, r, i = sO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function sO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function cO(e, t) {
	return pO(e) || fO(e, t) || uO(e, t) || lO();
}
function lO() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function uO(e, t) {
	if (e) {
		if (typeof e == "string") return dO(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? dO(e, t) : void 0;
	}
}
function dO(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function fO(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function pO(e) {
	if (Array.isArray(e)) return e;
}
var mO = /[ \f\n\r\t\v\u2028\u2029]+/, hO = (e) => {
	var t = e.children, n = e.breakAll, r = e.style;
	try {
		var i = [];
		return R(t) || (i = n ? t.toString().split("") : t.toString().split(mO)), {
			wordsWithComputedWidth: i.map((e) => ({
				word: e,
				width: AD(e, r).width
			})),
			spaceWidth: n ? 0 : AD("\xA0", r).width
		};
	} catch {
		return null;
	}
};
function gO(e) {
	return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function _O(e) {
	return R(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var vO = (e, t, n, r) => e.reduce((e, i) => {
	var a = i.word, o = i.width, s = e[e.length - 1];
	if (s && o != null && (t == null || r || s.width + o + n < Number(t))) s.words.push(a), s.width += o + n;
	else {
		var c = {
			words: [a],
			width: o
		};
		e.push(c);
	}
	return e;
}, []), yO = (e) => e.reduce((e, t) => e.width > t.width ? e : t), bO = "…", xO = (e, t, n, r, i, a, o, s) => {
	var c = hO({
		breakAll: n,
		style: r,
		children: e.slice(0, t) + bO
	});
	if (!c) return [!1, []];
	var l = vO(c.wordsWithComputedWidth, a, o, s);
	return [l.length > i || yO(l).width > Number(a), l];
}, SO = (e, t, n, r, i) => {
	var a = e.maxLines, o = e.children, s = e.style, c = e.breakAll, l = I(a), u = String(o), d = vO(t, r, n, i);
	if (!l || i || !(d.length > a || yO(d).width > Number(r))) return d;
	for (var f = 0, p = u.length - 1, m = 0, h; f <= p && m <= u.length - 1;) {
		var g = Math.floor((f + p) / 2), _ = cO(xO(u, g - 1, c, s, a, r, n, i), 2), v = _[0], y = _[1], b = cO(xO(u, g, c, s, a, r, n, i), 1)[0];
		if (!v && !b && (f = g + 1), v && b && (p = g - 1), !v && b) {
			h = y;
			break;
		}
		m++;
	}
	return h || d;
}, CO = (e) => [{
	words: R(e) ? [] : e.toString().split(mO),
	width: void 0
}], wO = (e) => {
	var t = e.width, n = e.scaleToFit, r = e.children, i = e.style, a = e.breakAll, o = e.maxLines;
	if ((t || n) && !$d.isSsr) {
		var s, c, l = hO({
			breakAll: a,
			children: r,
			style: i
		});
		if (l) {
			var u = l.wordsWithComputedWidth, d = l.spaceWidth;
			s = u, c = d;
		} else return CO(r);
		return SO({
			breakAll: a,
			children: r,
			maxLines: o,
			style: i
		}, s, c, t, !!n);
	}
	return CO(r);
}, TO = "#808080", EO = {
	angle: 0,
	breakAll: !1,
	capHeight: "0.71em",
	fill: TO,
	lineHeight: "1em",
	scaleToFit: !1,
	textAnchor: "start",
	verticalAnchor: "end",
	x: 0,
	y: 0
}, DO = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = Ar(e, EO), r = n.x, i = n.y, a = n.lineHeight, o = n.capHeight, s = n.fill, c = n.scaleToFit, u = n.textAnchor, d = n.verticalAnchor, f = oO(n, rO), p = (0, P.useMemo)(() => wO({
		breakAll: f.breakAll,
		children: f.children,
		maxLines: f.maxLines,
		scaleToFit: c,
		style: f.style,
		width: f.width
	}), [
		f.breakAll,
		f.children,
		f.maxLines,
		c,
		f.style,
		f.width
	]), m = f.dx, h = f.dy, g = f.angle, _ = f.className, v = f.breakAll, y = oO(f, iO);
	if (!_t(r) || !_t(i) || p.length === 0) return null;
	var b = Number(r) + (I(m) ? m : 0), x = Number(i) + (I(h) ? h : 0);
	if (!G(b) || !G(x)) return null;
	var S;
	switch (d) {
		case "start":
			S = nO(`calc(${o})`);
			break;
		case "middle":
			S = nO(`calc(${(p.length - 1) / 2} * -${a} + (${o} / 2))`);
			break;
		default: S = nO(`calc(${p.length - 1} * -${a})`);
	}
	var C = [], w = p[0];
	if (c && w != null) {
		var T = w.width, E = f.width;
		C.push(`scale(${I(E) && I(T) ? E / T : 1})`);
	}
	return g && C.push(`rotate(${g}, ${b}, ${x})`), C.length && (y.transform = C.join(" ")), /*#__PURE__*/ P.createElement("text", aO({}, Ue(y), {
		ref: t,
		x: b,
		y: x,
		className: l("recharts-text", _),
		textAnchor: u,
		fill: s.includes("url") ? TO : s
	}), p.map((e, t) => {
		var n = e.words.join(v ? "" : " ");
		return /*#__PURE__*/ P.createElement("tspan", {
			x: b,
			dy: t === 0 ? S : a,
			key: `${n}-${t}`
		}, n);
	}));
});
DO.displayName = "Text";
//#endregion
//#region node_modules/recharts/es6/component/Label.js
var OO = ["labelRef"], kO = ["content"];
function AO(e, t) {
	if (e == null) return {};
	var n, r, i = jO(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function jO(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function MO(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function NO(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? MO(Object(n), !0).forEach(function(t) {
			PO(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : MO(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function PO(e, t, n) {
	return (t = FO(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function FO(e) {
	var t = IO(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function IO(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function LO() {
	return LO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, LO.apply(null, arguments);
}
var RO = /*#__PURE__*/ (0, P.createContext)(null), zO = (e) => {
	var t = e.x, n = e.y, r = e.upperWidth, i = e.lowerWidth, a = e.width, o = e.height, s = e.children, c = (0, P.useMemo)(() => ({
		x: t,
		y: n,
		upperWidth: r,
		lowerWidth: i,
		width: a,
		height: o
	}), [
		t,
		n,
		r,
		i,
		a,
		o
	]);
	return /*#__PURE__*/ P.createElement(RO.Provider, { value: c }, s);
}, BO = () => {
	var e = (0, P.useContext)(RO), t = _u();
	return e || (t ? Et(t) : void 0);
}, VO = /*#__PURE__*/ (0, P.createContext)(null), HO = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, s = e.clockWise, c = e.children, l = (0, P.useMemo)(() => ({
		cx: t,
		cy: n,
		innerRadius: r,
		outerRadius: i,
		startAngle: a,
		endAngle: o,
		clockWise: s
	}), [
		t,
		n,
		r,
		i,
		a,
		o,
		s
	]);
	return /*#__PURE__*/ P.createElement(VO.Provider, { value: l }, c);
}, UO = () => {
	var e = (0, P.useContext)(VO), t = V($h);
	return e || t;
}, WO = (e) => {
	var t = e.value, n = e.formatter, r = R(e.children) ? t : e.children;
	return typeof n == "function" ? n(r) : r;
}, GO = (e) => e != null && typeof e == "function", KO = (e, t) => mt(t - e) * Math.min(Math.abs(t - e), 360), qO = (e, t, n, r, i) => {
	var a = e.offset, o = e.className, s = i.cx, c = i.cy, u = i.innerRadius, d = i.outerRadius, f = i.startAngle, p = i.endAngle, m = i.clockWise, h = (u + d) / 2, g = KO(f, p), _ = g >= 0 ? 1 : -1, v, y;
	switch (t) {
		case "insideStart":
			v = f + _ * a, y = m;
			break;
		case "insideEnd":
			v = p - _ * a, y = !m;
			break;
		case "end":
			v = p + _ * a, y = m;
			break;
		default: throw Error(`Unsupported position ${t}`);
	}
	y = g <= 0 ? y : !y;
	var b = gm(s, c, h, v), x = gm(s, c, h, v + (y ? 1 : -1) * 359), S = `M${b.x},${b.y}
    A${h},${h},0,1,${+!y},
    ${x.x},${x.y}`, C = R(e.id) ? yt("recharts-radial-line-") : e.id;
	return /*#__PURE__*/ P.createElement("text", LO({}, r, {
		dominantBaseline: "central",
		className: l("recharts-radial-bar-label", o)
	}), /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("path", {
		id: C,
		d: S
	})), /*#__PURE__*/ P.createElement("textPath", { xlinkHref: `#${C}` }, n));
}, JO = (e, t, n) => {
	var r = e.cx, i = e.cy, a = e.innerRadius, o = e.outerRadius, s = (e.startAngle + e.endAngle) / 2;
	if (n === "outside") {
		var c = gm(r, i, o + t, s), l = c.x;
		return {
			x: l,
			y: c.y,
			textAnchor: l >= r ? "start" : "end",
			verticalAnchor: "middle"
		};
	}
	if (n === "center") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
	if (n === "centerTop") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "start"
	};
	if (n === "centerBottom") return {
		x: r,
		y: i,
		textAnchor: "middle",
		verticalAnchor: "end"
	};
	var u = gm(r, i, (a + o) / 2, s);
	return {
		x: u.x,
		y: u.y,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
}, YO = (e) => e != null && "cx" in e && I(e.cx), XO = {
	angle: 0,
	offset: 5,
	zIndex: Y.label,
	position: "middle",
	textBreakAll: !1
};
function ZO(e) {
	if (!YO(e)) return e;
	var t = e.cx, n = e.cy, r = e.outerRadius, i = r * 2;
	return {
		x: t - r,
		y: n - r,
		width: i,
		upperWidth: i,
		lowerWidth: i,
		height: i
	};
}
function QO(e) {
	var t = Ar(e, XO), n = t.viewBox, r = t.parentViewBox, i = t.position, a = t.value, o = t.children, s = t.content, c = t.className, u = c === void 0 ? "" : c, d = t.textBreakAll, f = t.labelRef, p = UO(), m = BO(), h = n == null ? i === "center" ? m : p ?? m : YO(n) ? n : Et(n), g, _, v = ZO(h);
	if (!h || R(a) && R(o) && !/*#__PURE__*/ (0, P.isValidElement)(s) && typeof s != "function") return null;
	var y = YO(h) && (i === "insideStart" || i === "insideEnd" || i === "end");
	if (YO(h)) y || (_ = JO(h, t.offset, t.position));
	else if (v) {
		var b = Mt({
			viewBox: v,
			position: i,
			offset: t.offset,
			parentViewBox: YO(r) ? void 0 : r,
			clamp: !0
		});
		_ = NO(NO({
			x: b.x,
			y: b.y,
			textAnchor: b.horizontalAnchor,
			verticalAnchor: b.verticalAnchor
		}, b.width === void 0 ? {} : { width: b.width }), b.height === void 0 ? {} : { height: b.height });
	}
	var x = NO(NO(NO(NO({}, _?.x === void 0 ? {} : { x: _.x }), _?.y === void 0 ? {} : { y: _.y }), t), {}, { viewBox: h });
	if (/*#__PURE__*/ (0, P.isValidElement)(s)) {
		x.labelRef;
		var S = AO(x, OO);
		return /*#__PURE__*/ (0, P.cloneElement)(s, S);
	}
	if (typeof s == "function") {
		x.content;
		var C = AO(x, kO);
		if (g = /*#__PURE__*/ (0, P.createElement)(s, C), /*#__PURE__*/ (0, P.isValidElement)(g)) return g;
	} else g = WO(t);
	var w = Ue(t);
	return y && YO(h) ? qO(t, i, g, w, h) : _ == null ? null : /*#__PURE__*/ P.createElement(mE, { zIndex: t.zIndex }, /*#__PURE__*/ P.createElement(DO, LO({
		ref: f,
		className: l("recharts-label", u)
	}, w, _, {
		textAnchor: gO(w.textAnchor) ? w.textAnchor : _.textAnchor,
		breakAll: d
	}), g));
}
QO.displayName = "Label";
var $O = (e, t, n) => {
	if (!e) return null;
	var r = {
		viewBox: t,
		labelRef: n
	};
	return e === !0 ? /*#__PURE__*/ P.createElement(QO, LO({ key: "label-implicit" }, r)) : _t(e) ? /*#__PURE__*/ P.createElement(QO, LO({
		key: "label-implicit",
		value: e
	}, r)) : /*#__PURE__*/ (0, P.isValidElement)(e) ? e.type === QO ? /*#__PURE__*/ (0, P.cloneElement)(e, NO({ key: "label-implicit" }, r)) : /*#__PURE__*/ P.createElement(QO, LO({
		key: "label-implicit",
		content: e
	}, r)) : GO(e) ? /*#__PURE__*/ P.createElement(QO, LO({
		key: "label-implicit",
		content: e
	}, r)) : e && typeof e == "object" ? /*#__PURE__*/ P.createElement(QO, LO({}, e, { key: "label-implicit" }, r)) : null;
};
function ek(e) {
	var t = e.label, n = e.labelRef;
	return $O(t, BO(), n) || null;
}
function tk(e) {
	var t = e.label;
	return $O(t, UO()) || null;
}
//#endregion
//#region node_modules/recharts/es6/component/LabelList.js
var nk = ["valueAccessor"], rk = [
	"dataKey",
	"clockWise",
	"id",
	"textBreakAll",
	"zIndex"
];
function ik() {
	return ik = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ik.apply(null, arguments);
}
function ak(e, t) {
	if (e == null) return {};
	var n, r, i = ok(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ok(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var sk = (e) => {
	var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
	if (_O(t)) return t;
}, ck = /*#__PURE__*/ (0, P.createContext)(void 0), lk = ck.Provider, uk = /*#__PURE__*/ (0, P.createContext)(void 0), dk = uk.Provider;
function fk() {
	return (0, P.useContext)(ck);
}
function pk() {
	return (0, P.useContext)(uk);
}
function mk(e) {
	var t = e.valueAccessor, n = t === void 0 ? sk : t, r = ak(e, nk), i = r.dataKey;
	r.clockWise;
	var a = r.id, o = r.textBreakAll, s = r.zIndex, c = ak(r, rk), l = fk(), u = pk(), d = l || u;
	return !d || !d.length ? null : /*#__PURE__*/ P.createElement(mE, { zIndex: s ?? Y.label }, /*#__PURE__*/ P.createElement(F, { className: "recharts-label-list" }, d.map((e, t) => {
		var s = R(i) ? n(e, t) : K(e.payload, i), l = R(a) ? {} : { id: `${a}-${t}` };
		return /*#__PURE__*/ P.createElement(QO, ik({ key: `label-${t}` }, Ue(e), c, l, {
			fill: r.fill ?? e.fill,
			parentViewBox: e.parentViewBox,
			value: s,
			textBreakAll: o,
			viewBox: e.viewBox,
			index: t,
			zIndex: 0
		}));
	})));
}
mk.displayName = "LabelList";
function hk(e) {
	var t = e.label;
	return t ? t === !0 ? /*#__PURE__*/ P.createElement(mk, { key: "labelList-implicit" }) : /*#__PURE__*/ P.isValidElement(t) || GO(t) ? /*#__PURE__*/ P.createElement(mk, {
		key: "labelList-implicit",
		content: t
	}) : typeof t == "object" ? /*#__PURE__*/ P.createElement(mk, ik({ key: "labelList-implicit" }, t, { type: String(t.type) })) : null : null;
}
//#endregion
//#region node_modules/recharts/es6/shape/Polygon.js
var gk = [
	"points",
	"className",
	"baseLinePoints",
	"connectNulls"
], _k;
function vk() {
	return vk = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, vk.apply(null, arguments);
}
function yk(e, t) {
	if (e == null) return {};
	var n, r, i = bk(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function bk(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function xk(e, t) {
	return t ||= e.slice(0), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Sk = (e) => e != null && e.x === +e.x && e.y === +e.y, Ck = function() {
	var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = [[]];
	e.forEach((e) => {
		var n = t[t.length - 1];
		Sk(e) ? n && n.push(e) : n && n.length > 0 && t.push([]);
	});
	var n = e[0], r = t[t.length - 1];
	Sk(n) && r && r.push(n);
	var i = t[t.length - 1];
	return i && i.length <= 0 && (t = t.slice(0, -1)), t;
}, wk = (e, t) => {
	var n = Ck(e);
	t && (n = [n.reduce((e, t) => [...e, ...t], [])]);
	var r = n.map((e) => e.reduce((e, t, n) => pt(_k ||= xk([
		"",
		"",
		"",
		",",
		""
	]), e, n === 0 ? "M" : "L", t.x, t.y), "")).join("");
	return n.length === 1 ? `${r}Z` : r;
}, Tk = (e, t, n) => {
	var r = wk(e, n);
	return `${r.slice(-1) === "Z" ? r.slice(0, -1) : r}L${wk(Array.from(t).reverse(), n).slice(1)}`;
}, Ek = (e) => {
	var t = e.points, n = e.className, r = e.baseLinePoints, i = e.connectNulls, a = yk(e, gk);
	if (!t || !t.length) return null;
	var o = l("recharts-polygon", n);
	if (r && r.length) {
		var s = a.stroke && a.stroke !== "none", c = Tk(t, r, i);
		return /*#__PURE__*/ P.createElement("g", { className: o }, /*#__PURE__*/ P.createElement("path", vk({}, Ue(a), {
			fill: c.slice(-1) === "Z" ? a.fill : "none",
			stroke: "none",
			d: c
		})), s ? /*#__PURE__*/ P.createElement("path", vk({}, Ue(a), {
			fill: "none",
			d: wk(t, i)
		})) : null, s ? /*#__PURE__*/ P.createElement("path", vk({}, Ue(a), {
			fill: "none",
			d: wk(r, i)
		})) : null);
	}
	var u = wk(t, i);
	return /*#__PURE__*/ P.createElement("path", vk({}, Ue(a), {
		fill: u.slice(-1) === "Z" ? a.fill : "none",
		className: o,
		d: u
	}));
};
//#endregion
//#region node_modules/recharts/es6/shape/Dot.js
function Dk() {
	return Dk = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Dk.apply(null, arguments);
}
var Ok = (e) => {
	var t = e.cx, n = e.cy, r = e.r, i = e.className, a = l("recharts-dot", i);
	return I(t) && I(n) && I(r) ? /*#__PURE__*/ P.createElement("circle", Dk({}, Ve(e), Sr(e), {
		className: a,
		cx: t,
		cy: n,
		r
	})) : null;
}, kk = (e) => e.graphicalItems.polarItems, Ak = H([
	kk,
	Q,
	H([X, eg], qx)
], Xx), jk = H([H([Ak], tS), Wm], iS), Mk = H([
	jk,
	Q,
	Ak
], oS);
H([
	jk,
	Q,
	Ak
], (e, t, n) => n.length > 0 ? e.flatMap((e) => n.flatMap((n) => ({
	value: K(e, t.dataKey ?? n.dataKey),
	errorDomain: []
}))).filter(Boolean) : t?.dataKey == null ? e.map((e) => ({
	value: e,
	errorDomain: []
})) : e.map((e) => ({
	value: K(e, t.dataKey),
	errorDomain: []
})));
var Nk = () => void 0, Pk = H([
	Q,
	q,
	jk,
	Mk,
	Th,
	X,
	H([
		Q,
		wS,
		TS,
		Nk,
		H([
			jk,
			Q,
			Ak,
			DS,
			X,
			Jm
		], AS),
		Nk,
		q,
		X
	], YS)
], QS), Fk = H([
	Pk,
	Gx,
	eC
], tC), Ik = H([eC, H([
	Q,
	Pk,
	Fk,
	X
], rC)], ug), Lk = (e, t, n) => {
	switch (t) {
		case "angleAxis": return Uh(e, n);
		case "radiusAxis": return Wh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, Rk = (e, t, n) => {
	switch (t) {
		case "angleAxis": return Xh(e, n);
		case "radiusAxis": return Qh(e, n);
		default: throw Error(`Unexpected axis type: ${t}`);
	}
}, zk = H([H([
	Lk,
	eC,
	Ik,
	Rk
], _x)], lg), Bk = H([
	q,
	Mk,
	Gx,
	X
], hC), Vk = H([
	q,
	Lk,
	eC,
	zk,
	Fk,
	Rk,
	FC,
	Bk,
	X
], LC), Hk = H([Vk], (e) => {
	if (e) {
		var t = /* @__PURE__ */ new Map();
		return e.forEach((e) => {
			var n = (e.coordinate + 360) % 360;
			t.has(n) || t.set(n, e);
		}), Array.from(t.values());
	}
}), Uk = H([
	q,
	Lk,
	zk,
	Rk,
	FC,
	Bk,
	X
], zC), Wk = Gs({
	name: "polarAxis",
	initialState: {
		radiusAxis: {},
		angleAxis: {}
	},
	reducers: {
		addRadiusAxis(e, t) {
			e.radiusAxis[t.payload.id] = U(t.payload);
		},
		removeRadiusAxis(e, t) {
			delete e.radiusAxis[t.payload.id];
		},
		addAngleAxis(e, t) {
			e.angleAxis[t.payload.id] = U(t.payload);
		},
		removeAngleAxis(e, t) {
			delete e.angleAxis[t.payload.id];
		}
	}
}), Gk = Wk.actions, Kk = Gk.addRadiusAxis, qk = Gk.removeRadiusAxis, Jk = Gk.addAngleAxis, Yk = Gk.removeAngleAxis, Xk = Wk.reducer;
//#endregion
//#region node_modules/recharts/es6/util/getClassNameFromUnknown.js
function Zk(e) {
	return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
//#endregion
//#region node_modules/recharts/es6/polar/PolarAngleAxis.js
var Qk = ["children", "type"], $k = ["ref"];
function eA() {
	return eA = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, eA.apply(null, arguments);
}
function tA(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function nA(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? tA(Object(n), !0).forEach(function(t) {
			rA(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tA(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function rA(e, t, n) {
	return (t = iA(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function iA(e) {
	var t = aA(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function aA(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oA(e, t) {
	if (e == null) return {};
	var n, r, i = sA(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function sA(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var cA = 1e-5, lA = Math.cos(mm(45)), uA = "angleAxis";
function dA(e) {
	var t = B(), n = Eu(), r = (0, P.useMemo)(() => {
		e.children;
		var t = e.type, r = oA(e, Qk), i = Fh(n, "angleAxis", t);
		if (i != null) return nA(nA({}, r), {}, { type: i });
	}, [e, n]), i = r === V((e) => Uh(e, r?.id));
	return (0, P.useEffect)(() => r == null ? Tt : (t(Jk(r)), () => {
		t(Yk(r));
	}), [t, r]), i ? e.children : null;
}
var fA = (e, t) => {
	var n = t.cx, r = t.cy, i = t.radius, a = t.orientation, o = t.tickSize || 8, s = gm(n, r, i, e.coordinate), c = gm(n, r, i + (a === "inner" ? -1 : 1) * o, e.coordinate);
	return {
		x1: s.x,
		y1: s.y,
		x2: c.x,
		y2: c.y
	};
}, pA = (e, t) => {
	var n = Math.cos(mm(-e.coordinate));
	return n > cA ? t === "outer" ? "start" : "end" : n < -cA ? t === "outer" ? "end" : "start" : "middle";
}, mA = (e) => {
	var t = Math.cos(mm(-e.coordinate)), n = Math.sin(mm(-e.coordinate));
	return Math.abs(t) <= lA ? n > 0 ? "start" : "end" : "middle";
}, hA = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = e.axisLineType, a = e.axisLine, o = e.ticks;
	if (!a) return null;
	var s = nA(nA({}, Ve(e)), {}, { fill: "none" }, Ve(a));
	if (i === "circle") return /*#__PURE__*/ P.createElement(Ok, eA({ className: "recharts-polar-angle-axis-line" }, s, {
		cx: t,
		cy: n,
		r
	}));
	var c = o.map((e) => gm(t, n, r, e.coordinate));
	return /*#__PURE__*/ P.createElement(Ek, eA({ className: "recharts-polar-angle-axis-line" }, s, { points: c }));
}, gA = (e) => {
	var t = e.tick, n = e.tickProps, r = e.value;
	return t ? /*#__PURE__*/ P.isValidElement(t) ? /*#__PURE__*/ P.cloneElement(t, n) : typeof t == "function" ? t(n) : /*#__PURE__*/ P.createElement(DO, eA({}, n, { className: "recharts-polar-angle-axis-tick-value" }), r) : null;
}, _A = (e) => {
	var t = e.tick, n = e.tickLine, r = e.tickFormatter, i = e.stroke, a = e.ticks, o = Ve(e);
	o.ref;
	var s = oA(o, $k), c = He(t), u = nA(nA({}, s), {}, { fill: "none" }, Ve(n)), d = a.map((a, o) => {
		var d = fA(a, e), f = pA(a, e.orientation), p = mA(a), m = nA(nA(nA({}, s), {}, {
			textAnchor: f,
			verticalAnchor: p,
			stroke: "none",
			fill: i
		}, c), {}, {
			index: o,
			payload: a,
			x: d.x2,
			y: d.y2
		});
		return /*#__PURE__*/ P.createElement(F, eA({
			className: l("recharts-polar-angle-axis-tick", Zk(t)),
			key: `tick-${a.coordinate}`
		}, wr(e, a, o)), n && /*#__PURE__*/ P.createElement("line", eA({ className: "recharts-polar-angle-axis-tick-line" }, u, d)), /*#__PURE__*/ P.createElement(gA, {
			tick: t,
			tickProps: m,
			value: r ? r(a.value, o) : a.value
		}));
	});
	return /*#__PURE__*/ P.createElement(F, { className: "recharts-polar-angle-axis-ticks" }, d);
}, vA = (e) => {
	var t = e.angleAxisId, n = V($h), r = V((e) => zk(e, "angleAxis", t)), i = Fl(), a = V((e) => Hk(e, "angleAxis", t, i));
	if (n == null || !a || !a.length || r == null) return null;
	var o = nA(nA(nA({}, e), {}, { scale: r }, n), {}, {
		radius: n.outerRadius,
		ticks: a
	});
	return /*#__PURE__*/ P.createElement(mE, { zIndex: o.zIndex }, /*#__PURE__*/ P.createElement(F, { className: l("recharts-polar-angle-axis", uA, o.className) }, /*#__PURE__*/ P.createElement(hA, o), /*#__PURE__*/ P.createElement(_A, o)));
};
function yA(e) {
	var t = Ar(e, Mh);
	return /*#__PURE__*/ P.createElement(dA, {
		id: t.angleAxisId,
		scale: t.scale,
		type: t.type,
		dataKey: t.dataKey,
		unit: void 0,
		name: t.name,
		allowDuplicatedCategory: !1,
		allowDataOverflow: !1,
		reversed: t.reversed,
		includeHidden: !1,
		allowDecimals: t.allowDecimals,
		tickCount: t.tickCount,
		niceTicks: t.niceTicks ?? "auto",
		ticks: t.ticks,
		tick: t.tick,
		domain: t.domain
	}, /*#__PURE__*/ P.createElement(vA, t));
}
yA.displayName = "PolarAngleAxis";
//#endregion
//#region node_modules/react-is/cjs/react-is.production.js
var bA = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.view_transition");
	function m(e) {
		if (typeof e == "object" && e) {
			var m = e.$$typeof;
			switch (m) {
				case t: switch (e = e.type, e) {
					case r:
					case a:
					case i:
					case l:
					case u:
					case p: return e;
					default: switch (e &&= e.$$typeof, e) {
						case s:
						case c:
						case f:
						case d: return e;
						case o: return e;
						default: return m;
					}
				}
				case n: return m;
			}
		}
	}
	e.isFragment = function(e) {
		return m(e) === r;
	};
})), xA = (/* @__PURE__ */ n(((e, t) => {
	t.exports = bA();
})))(), SA = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", CA = null, wA = null, TA = (e) => {
	if (e === CA && Array.isArray(wA)) return wA;
	var t = [];
	return P.Children.forEach(e, (e) => {
		R(e) || ((0, xA.isFragment)(e) ? t = t.concat(TA(e.props.children)) : t.push(e));
	}), wA = t, CA = e, t;
};
function EA(e, t) {
	var n = [], r = [];
	return r = Array.isArray(t) ? t.map((e) => SA(e)) : [SA(t)], TA(e).forEach((e) => {
		var t = lt(e, "type.displayName") || lt(e, "type.name");
		t && r.indexOf(t) !== -1 && n.push(e);
	}), n;
}
var DA = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
//#endregion
//#region node_modules/recharts/es6/util/ActiveShapeUtils.js
function OA(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function kA(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? OA(Object(n), !0).forEach(function(t) {
			AA(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : OA(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function AA(e, t, n) {
	return (t = jA(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function jA(e) {
	var t = MA(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function MA(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function NA(e, t) {
	return kA(kA({}, t), e);
}
function PA(e) {
	return /*#__PURE__*/ (0, P.isValidElement)(e) ? e.props : e;
}
function FA(e, t) {
	return /*#__PURE__*/ (0, P.cloneElement)(e, NA(PA(e), t));
}
function IA(e) {
	if ("index" in e) {
		var t = e.index;
		return typeof t == "number" || typeof t == "string" ? t : void 0;
	}
}
function LA(e) {
	return "isActive" in e && e.isActive === !0;
}
function RA(e) {
	var t = e.option, n = e.DefaultShape, r = e.shapeProps, i = e.activeClassName, a = i === void 0 ? "recharts-active-shape" : i, o = e.inActiveClassName, s = o === void 0 ? "recharts-shape" : o, c = IA(r), l = /*#__PURE__*/ (0, P.isValidElement)(t) ? FA(t, r) : t === n ? /*#__PURE__*/ P.createElement(n, r) : typeof t == "function" ? t(r, c) : typeof t == "object" ? /*#__PURE__*/ P.createElement(n, NA(t, r)) : /*#__PURE__*/ P.createElement(n, r);
	return LA(r) ? /*#__PURE__*/ P.createElement(F, { className: a }, l) : /*#__PURE__*/ P.createElement(F, { className: s }, l);
}
//#endregion
//#region node_modules/recharts/es6/context/tooltipContext.js
var zA = (e, t, n) => {
	var r = B();
	return (i, a) => (o) => {
		e?.(i, a, o), r(rw({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
}, BA = (e) => {
	var t = B();
	return (n, r) => (i) => {
		e?.(n, r, i), t(iw());
	};
}, VA = (e, t, n) => {
	var r = B();
	return (i, a) => (o) => {
		e?.(i, a, o), r(ow({
			activeIndex: String(a),
			activeDataKey: t,
			activeCoordinate: i.tooltipPosition,
			activeGraphicalItemId: n
		}));
	};
};
//#endregion
//#region node_modules/recharts/es6/state/SetTooltipEntrySettings.js
function HA(e) {
	var t = e.tooltipEntrySettings, n = B(), r = Fl(), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		r || (i.current === null ? n($C(t)) : i.current !== t && n(ew({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		t,
		n,
		r
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(tw(i.current)), null);
	}, [n]), null;
}
//#endregion
//#region node_modules/recharts/es6/state/SetLegendPayload.js
function UA(e) {
	var t = e.legendPayload, n = B(), r = Fl(), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		r || (i.current === null ? n(Nu(t)) : i.current !== t && n(Pu({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(Fu(i.current)), null);
	}, [n]), null;
}
function WA(e) {
	var t = e.legendPayload, n = B(), r = V(q), i = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		(r === "centric" || r === "radial") && (i.current === null ? n(Nu(t)) : i.current !== t && n(Pu({
			prev: i.current,
			next: t
		})), i.current = t);
	}, [
		n,
		r,
		t
	]), (0, P.useLayoutEffect)(() => () => {
		i.current &&= (n(Fu(i.current)), null);
	}, [n]), null;
}
//#endregion
//#region node_modules/recharts/es6/animation/matchBy.js
function GA(e, t) {
	return XA(e) || YA(e, t) || qA(e, t) || KA();
}
function KA() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function qA(e, t) {
	if (e) {
		if (typeof e == "string") return JA(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? JA(e, t) : void 0;
	}
}
function JA(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function YA(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function XA(e) {
	if (Array.isArray(e)) return e;
}
var ZA = "index", QA = "append";
function $A(e, t) {
	var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], r = [];
	for (var i of n) r.push({
		status: "removed",
		prev: i
	});
	for (var a = 0; a < t.length; a++) {
		var o = e[a], s = t[a];
		o == null ? r.push({
			status: "added",
			next: s
		}) : r.push({
			status: "matched",
			prev: o,
			next: s
		});
	}
	return r;
}
function ej(e, t) {
	var n = e.length / t.length;
	return $A(t.map((t, r) => e[Math.floor(r * n)]), t);
}
function tj(e, t) {
	return $A(t.map((t, n) => e[n]), t);
}
function nj(e, t) {
	for (var n = /* @__PURE__ */ new Map(), r = 0; r < e.length; r++) {
		var i = e[r];
		if (i != null) {
			var a = t(i, r);
			a != null && !n.has(a) && n.set(a, i);
		}
	}
	return n;
}
function rj(e, t, n) {
	var r = nj(e, n), i = /* @__PURE__ */ new Set(), a = t.map((e, t) => {
		var a = n(e, t);
		if (a != null) {
			var o = r.get(a);
			if (o !== void 0) return i.add(a), o;
		}
	}), o = [];
	for (var s of r) {
		var c = GA(s, 2), l = c[0], u = c[1];
		i.has(l) || o.push(u);
	}
	return $A(a, t, o);
}
function ij(e, t, n) {
	return t == null ? null : e == null ? t.map((e) => ({
		status: "added",
		next: e
	})) : n === "index" ? ej(e, t) : n === "append" ? tj(e, t) : rj(e, t, n);
}
//#endregion
//#region node_modules/recharts/es6/animation/useAnimationStartSnapshot.js
function aj(e, t) {
	var n = (0, P.useRef)(e), r = (0, P.useRef)(t.current), i = (0, P.useRef)(!0);
	n.current !== e && (n.current = e, r.current = t.current, i.current = !1);
	var a = (0, P.useCallback)(function(e, n) {
		var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
		n === 0 ? i.current = !0 : (n === 1 && (r.current = e), n > 0 && i.current && a && (t.current = e));
	}, [t]);
	return {
		startValue: r.current,
		syncStepValue: a
	};
}
//#endregion
//#region node_modules/recharts/es6/animation/AnimatedItems.js
function oj(e, t) {
	return dj(e) || uj(e, t) || cj(e, t) || sj();
}
function sj() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function cj(e, t) {
	if (e) {
		if (typeof e == "string") return lj(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? lj(e, t) : void 0;
	}
}
function lj(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function uj(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function dj(e) {
	if (Array.isArray(e)) return e;
}
function fj(e, t) {
	var n = oj((0, P.useState)(!1), 2), r = n[0], i = n[1];
	return {
		isAnimating: r,
		handleAnimationStart: (0, P.useCallback)(() => {
			typeof e == "function" && e(), i(!0);
		}, [e]),
		handleAnimationEnd: (0, P.useCallback)(() => {
			typeof t == "function" && t(), i(!1);
		}, [t])
	};
}
function pj(e) {
	var t = e.animationInput, n = e.animationIdPrefix, r = e.items, i = e.previousItemsRef, a = e.isAnimationActive, o = e.animationBegin, s = e.animationDuration, c = e.animationEasing, l = e.onAnimationStart, u = e.onAnimationEnd, d = e.animationInterpolateFn, f = e.animationMatchBy, p = e.shouldUpdatePreviousRef, m = e.children, h = e.layout, g = kp(t, n), _ = aj(g, i), v = _.startValue ?? null, y = ij(v, r, f ?? ZA);
	return /*#__PURE__*/ P.createElement(Op, {
		animationId: g,
		begin: o,
		duration: s,
		isActive: a,
		easing: c,
		onAnimationEnd: u,
		onAnimationStart: l,
		key: g
	}, (e) => {
		var t = v == null, n = r == null ? r : d(y, e, h), i = p ? p(e) : e > 0;
		return _.syncStepValue(n, e, i), n == null ? null : m(n, e, t);
	});
}
function mj(e, t) {
	return yj(e) || vj(e, t) || gj(e, t) || hj();
}
function hj() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function gj(e, t) {
	if (e) {
		if (typeof e == "string") return _j(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _j(e, t) : void 0;
	}
}
function _j(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function vj(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function yj(e) {
	if (Array.isArray(e)) return e;
}
var bj = P.useId ?? (() => mj(P.useState(() => yt("uid-")), 1)[0]);
//#endregion
//#region node_modules/recharts/es6/util/useUniqueId.js
function xj(e, t) {
	var n = bj();
	return t || (e ? `${e}-${n}` : n);
}
//#endregion
//#region node_modules/recharts/es6/context/RegisterGraphicalItemId.js
var Sj = /*#__PURE__*/ (0, P.createContext)(void 0), Cj = (e) => {
	var t = e.id, n = e.type, r = e.children, i = xj(`recharts-${n}`, t);
	return /*#__PURE__*/ P.createElement(Sj.Provider, { value: i }, r(i));
}, wj = Gs({
	name: "graphicalItems",
	initialState: {
		cartesianItems: [],
		polarItems: []
	},
	reducers: {
		addCartesianGraphicalItem: {
			reducer(e, t) {
				e.cartesianItems.push(U(t.payload));
			},
			prepare: W()
		},
		replaceCartesianGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).cartesianItems.indexOf(U(r));
				a > -1 && (e.cartesianItems[a] = U(i));
			},
			prepare: W()
		},
		removeCartesianGraphicalItem: {
			reducer(e, t) {
				var n = _s(e).cartesianItems.indexOf(U(t.payload));
				n > -1 && e.cartesianItems.splice(n, 1);
			},
			prepare: W()
		},
		addPolarGraphicalItem: {
			reducer(e, t) {
				e.polarItems.push(U(t.payload));
			},
			prepare: W()
		},
		removePolarGraphicalItem: {
			reducer(e, t) {
				var n = _s(e).polarItems.indexOf(U(t.payload));
				n > -1 && e.polarItems.splice(n, 1);
			},
			prepare: W()
		},
		replacePolarGraphicalItem: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next, a = _s(e).polarItems.indexOf(U(r));
				a > -1 && (e.polarItems[a] = U(i));
			},
			prepare: W()
		}
	}
}), Tj = wj.actions, Ej = Tj.addCartesianGraphicalItem, Dj = Tj.replaceCartesianGraphicalItem, Oj = Tj.removeCartesianGraphicalItem, kj = Tj.addPolarGraphicalItem, Aj = Tj.removePolarGraphicalItem, jj = Tj.replacePolarGraphicalItem, Mj = wj.reducer, Nj = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = B(), n = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		n.current === null ? t(Ej(e)) : n.current !== e && t(Dj({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(Oj(n.current)), null);
	}, [t]), null;
}), Pj = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = B(), n = (0, P.useRef)(null);
	return (0, P.useLayoutEffect)(() => {
		n.current === null ? t(kj(e)) : n.current !== e && t(jj({
			prev: n.current,
			next: e
		})), n.current = e;
	}, [t, e]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(Aj(n.current)), null);
	}, [t]), null;
}), Fj = ["points"];
function Ij(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Lj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Ij(Object(n), !0).forEach(function(t) {
			Rj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ij(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Rj(e, t, n) {
	return (t = zj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function zj(e) {
	var t = Bj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Bj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Vj() {
	return Vj = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Vj.apply(null, arguments);
}
function Hj(e, t) {
	if (e == null) return {};
	var n, r, i = Uj(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Uj(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Wj(e) {
	var t = e.option, n = e.dotProps, r = e.className;
	if (/*#__PURE__*/ (0, P.isValidElement)(t)) return /*#__PURE__*/ (0, P.cloneElement)(t, n);
	if (typeof t == "function") return t(n);
	var i = l(r, typeof t == "boolean" ? "" : t.className), a = n ?? {};
	a.points;
	var o = Hj(a, Fj);
	return /*#__PURE__*/ P.createElement(Ok, Vj({}, o, { className: i }));
}
function Gj(e, t) {
	return e == null ? !1 : t ? !0 : e.length === 1;
}
function Kj(e) {
	var t = e.points, n = e.dot, r = e.className, i = e.dotClassName, a = e.dataKey, o = e.baseProps, s = e.needClip, c = e.clipPathId, l = e.zIndex, u = l === void 0 ? Y.scatter : l;
	if (!Gj(t, n)) return null;
	var d = DA(n), f = We(n), p = t.map((e, r) => {
		var s = Lj(Lj(Lj({ r: 3 }, o), f), {}, {
			index: r,
			cx: e.x ?? void 0,
			cy: e.y ?? void 0,
			dataKey: a,
			value: e.value,
			payload: e.payload,
			points: t
		});
		return /*#__PURE__*/ P.createElement(Wj, {
			key: `dot-${r}`,
			option: n,
			dotProps: s,
			className: i
		});
	}), m = {};
	return s && c != null && (m.clipPath = `url(#clipPath-${d ? "" : "dots-"}${c})`), /*#__PURE__*/ P.createElement(mE, { zIndex: u }, /*#__PURE__*/ P.createElement(F, Vj({ className: r }, m), p));
}
//#endregion
//#region node_modules/recharts/es6/state/cartesianAxisSlice.js
function qj(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Jj(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? qj(Object(n), !0).forEach(function(t) {
			Yj(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : qj(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Yj(e, t, n) {
	return (t = Xj(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Xj(e) {
	var t = Zj(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Zj(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Qj = Gs({
	name: "cartesianAxis",
	initialState: {
		xAxis: {},
		yAxis: {},
		zAxis: {}
	},
	reducers: {
		addXAxis: {
			reducer(e, t) {
				e.xAxis[t.payload.id] = U(t.payload);
			},
			prepare: W()
		},
		replaceXAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.xAxis[r.id] !== void 0 && (r.id !== i.id && delete e.xAxis[r.id], e.xAxis[i.id] = U(i));
			},
			prepare: W()
		},
		removeXAxis: {
			reducer(e, t) {
				delete e.xAxis[t.payload.id];
			},
			prepare: W()
		},
		addYAxis: {
			reducer(e, t) {
				e.yAxis[t.payload.id] = U(t.payload);
			},
			prepare: W()
		},
		replaceYAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.yAxis[r.id] !== void 0 && (r.id !== i.id && delete e.yAxis[r.id], e.yAxis[i.id] = U(i));
			},
			prepare: W()
		},
		removeYAxis: {
			reducer(e, t) {
				delete e.yAxis[t.payload.id];
			},
			prepare: W()
		},
		addZAxis: {
			reducer(e, t) {
				e.zAxis[t.payload.id] = U(t.payload);
			},
			prepare: W()
		},
		replaceZAxis: {
			reducer(e, t) {
				var n = t.payload, r = n.prev, i = n.next;
				e.zAxis[r.id] !== void 0 && (r.id !== i.id && delete e.zAxis[r.id], e.zAxis[i.id] = U(i));
			},
			prepare: W()
		},
		removeZAxis: {
			reducer(e, t) {
				delete e.zAxis[t.payload.id];
			},
			prepare: W()
		},
		updateYAxisWidth(e, t) {
			var n = t.payload, r = n.id, i = n.width, a = e.yAxis[r];
			if (a) {
				var o = a.widthHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.width && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.yAxis[r] = Jj(Jj({}, a), {}, {
					width: i,
					widthHistory: s
				});
			}
		},
		updateXAxisHeight(e, t) {
			var n = t.payload, r = n.id, i = n.height, a = e.xAxis[r];
			if (a) {
				var o = a.heightHistory || [];
				if (o.length === 3 && o[0] === o[2] && i === o[1] && i !== a.height && Math.abs(i - (o[0] ?? 0)) <= 1) return;
				var s = [...o, i].slice(-3);
				e.xAxis[r] = Jj(Jj({}, a), {}, {
					height: i,
					heightHistory: s
				});
			}
		}
	}
}), $j = Qj.actions, eM = $j.addXAxis, tM = $j.replaceXAxis, nM = $j.removeXAxis, rM = $j.addYAxis, iM = $j.replaceYAxis, aM = $j.removeYAxis;
$j.addZAxis, $j.replaceZAxis, $j.removeZAxis;
var oM = $j.updateYAxisWidth, sM = $j.updateXAxisHeight, cM = Qj.reducer, lM = H([
	H([jl], (e) => ({
		top: e.top,
		bottom: e.bottom,
		left: e.left,
		right: e.right
	})),
	ml,
	hl
], (e, t, n) => {
	if (e && t != null && n != null) return {
		x: e.left,
		y: e.top,
		width: Math.max(0, t - e.left - e.right),
		height: Math.max(0, n - e.top - e.bottom)
	};
}), uM = () => V(lM), dM = () => V(_T);
//#endregion
//#region node_modules/recharts/es6/component/ActivePoints.js
function fM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fM(Object(n), !0).forEach(function(t) {
			mM(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function mM(e, t, n) {
	return (t = hM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function hM(e) {
	var t = gM(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gM(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var _M = (e) => {
	var t = e.point, n = e.childIndex, r = e.mainColor, i = e.activeDot, a = e.dataKey, o = e.clipPath;
	if (i === !1 || t.x == null || t.y == null) return null;
	var s = pM(pM(pM({}, {
		index: n,
		dataKey: a,
		cx: t.x,
		cy: t.y,
		r: 4,
		fill: r ?? "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: t.payload,
		value: t.value
	}), He(i)), Sr(i)), c = /*#__PURE__*/ (0, P.isValidElement)(i) ? /*#__PURE__*/ (0, P.cloneElement)(i, s) : typeof i == "function" ? i(s) : /*#__PURE__*/ P.createElement(Ok, s);
	return /*#__PURE__*/ P.createElement(F, {
		className: "recharts-active-dot",
		clipPath: o
	}, c);
};
function vM(e) {
	var t = e.points, n = e.mainColor, r = e.activeDot, i = e.itemDataKey, a = e.clipPath, o = e.zIndex, s = o === void 0 ? Y.activeDot : o, c = V(uT), l = dM();
	if (t == null || l == null) return null;
	var u = t.find((e) => l.includes(e.payload));
	return R(u) ? null : /*#__PURE__*/ P.createElement(mE, { zIndex: s }, /*#__PURE__*/ P.createElement(_M, {
		point: u,
		childIndex: Number(c),
		mainColor: n,
		dataKey: i,
		activeDot: r,
		clipPath: a
	}));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineBarSizeList.js
function yM(e, t) {
	return wM(e) || CM(e, t) || xM(e, t) || bM();
}
function bM() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function xM(e, t) {
	if (e) {
		if (typeof e == "string") return SM(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? SM(e, t) : void 0;
	}
}
function SM(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function CM(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function wM(e) {
	if (Array.isArray(e)) return e;
}
var TM = (e, t, n) => {
	var r = n ?? e;
	if (!R(r)) return bt(r, t, 0);
}, EM = (e, t, n) => {
	var r = {}, i = e.filter(rg), a = e.filter((e) => e.stackId == null), o = i.reduce((e, t) => {
		var n = e[t.stackId];
		return n ??= [], n.push(t), e[t.stackId] = n, e;
	}, r), s = Object.entries(o).map((e) => {
		var r = yM(e, 2), i = r[0], a = r[1];
		return {
			stackId: i,
			dataKeys: a.map((e) => e.dataKey),
			barSize: TM(t, n, a[0]?.barSize)
		};
	}), c = a.map((e) => ({
		stackId: void 0,
		dataKeys: [e.dataKey].filter((e) => e != null),
		barSize: TM(t, n, e.barSize)
	}));
	return [...s, ...c];
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineAllBarPositions.js
function DM(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function OM(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? DM(Object(n), !0).forEach(function(t) {
			kM(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : DM(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kM(e, t, n) {
	return (t = AM(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function AM(e) {
	var t = jM(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jM(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function MM(e, t, n, r, i) {
	var a = r.length;
	if (!(a < 1)) {
		var o = bt(e, n, 0, !0), s, c = [];
		if (G(r[0]?.barSize)) {
			var l = !1, u = n / a, d = r.reduce((e, t) => e + (t.barSize || 0), 0);
			d += (a - 1) * o, d >= n && (d -= (a - 1) * o, o = 0), d >= n && u > 0 && (l = !0, u *= .9, d = a * u);
			var f = {
				offset: Math.round((n - d) / 2) - o,
				size: 0
			};
			s = r.reduce((e, t) => {
				var n = {
					stackId: t.stackId,
					dataKeys: t.dataKeys,
					position: {
						offset: f.offset + f.size + o,
						size: l ? u : t.barSize ?? 0
					}
				}, r = [...e, n];
				return f = n.position, r;
			}, c);
		} else {
			var p = bt(t, n, 0, !0);
			n - 2 * p - (a - 1) * o <= 0 && (o = 0);
			var m = (n - 2 * p - (a - 1) * o) / a;
			m > 1 && (m = Math.round(m));
			var h = G(i) ? Math.min(m, i) : m;
			s = r.reduce((e, t, n) => [...e, {
				stackId: t.stackId,
				dataKeys: t.dataKeys,
				position: {
					offset: p + a * (m - h) / 2 + (h + o) * n,
					size: h
				}
			}], c);
		}
		return s;
	}
}
var NM = (e, t, n, r, i, a, o) => {
	var s = R(o) ? t : o, c = MM(n, r, i === a ? a : i, e, s);
	return i !== a && c != null && (c = c.map((e) => OM(OM({}, e), {}, { position: OM(OM({}, e.position), {}, { offset: e.position.offset - i / 2 }) }))), c;
}, PM = (e, t) => {
	var n = tg(t);
	if (e && n != null && t != null) {
		var r = t.stackId;
		if (r != null) {
			var i = e[r];
			if (i) {
				var a = i.stackedData;
				if (a) return a.find((e) => e.key === n);
			}
		}
	}
}, FM = (e, t) => {
	if (e != null && t != null) {
		var n = e.find((e) => e.stackId === t.stackId && t.dataKey != null && e.dataKeys.includes(t.dataKey));
		if (n != null) return n.position;
	}
};
//#endregion
//#region node_modules/recharts/es6/zIndex/getZIndexFromUnknown.js
function IM(e, t) {
	return e && typeof e == "object" && "zIndex" in e && typeof e.zIndex == "number" && G(e.zIndex) ? e.zIndex : t;
}
//#endregion
//#region node_modules/recharts/es6/context/chartDataContext.js
var LM = (e) => {
	var t = e.chartData, n = B(), r = Fl();
	return (0, P.useEffect)(() => r ? () => {} : (n(LE(t)), () => {
		n(LE(void 0));
	}), [
		t,
		n,
		r
	]), null;
}, RM = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
}, zM = Gs({
	name: "brush",
	initialState: RM,
	reducers: { setBrushSettings(e, t) {
		return t.payload == null ? RM : t.payload;
	} }
});
zM.actions.setBrushSettings;
var BM = zM.reducer, VM = (e, t) => {
	var n = e.x, r = e.y, i = t.x, a = t.y;
	return {
		x: Math.min(n, i),
		y: Math.min(r, a),
		width: Math.abs(i - n),
		height: Math.abs(a - r)
	};
}, HM = (e) => {
	var t = e.x1, n = e.y1, r = e.x2, i = e.y2;
	return VM({
		x: t,
		y: n
	}, {
		x: r,
		y: i
	});
};
function UM(e) {
	return (e % 180 + 180) % 180;
}
var WM = function(e) {
	var t = e.width, n = e.height, r = UM(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180, i = Math.atan(n / t), a = r > i && r < Math.PI - i ? n / Math.sin(r) : t / Math.cos(r);
	return Math.abs(a);
}, GM = Gs({
	name: "referenceElements",
	initialState: {
		dots: [],
		areas: [],
		lines: []
	},
	reducers: {
		addDot: (e, t) => {
			e.dots.push(t.payload);
		},
		removeDot: (e, t) => {
			var n = _s(e).dots.findIndex((e) => e === t.payload);
			n !== -1 && e.dots.splice(n, 1);
		},
		addArea: (e, t) => {
			e.areas.push(t.payload);
		},
		removeArea: (e, t) => {
			var n = _s(e).areas.findIndex((e) => e === t.payload);
			n !== -1 && e.areas.splice(n, 1);
		},
		addLine: (e, t) => {
			e.lines.push(U(t.payload));
		},
		removeLine: (e, t) => {
			var n = _s(e).lines.findIndex((e) => e === t.payload);
			n !== -1 && e.lines.splice(n, 1);
		}
	}
}), KM = GM.actions;
KM.addDot, KM.removeDot, KM.addArea, KM.removeArea;
var qM = KM.addLine, JM = KM.removeLine, YM = GM.reducer;
//#endregion
//#region node_modules/recharts/es6/container/ClipPathProvider.js
function XM(e, t) {
	return tN(e) || eN(e, t) || QM(e, t) || ZM();
}
function ZM() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function QM(e, t) {
	if (e) {
		if (typeof e == "string") return $M(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $M(e, t) : void 0;
	}
}
function $M(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function eN(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function tN(e) {
	if (Array.isArray(e)) return e;
}
var nN = /*#__PURE__*/ (0, P.createContext)(void 0), rN = (e) => {
	var t = e.children, n = XM((0, P.useState)(`${yt("recharts")}-clip`), 1)[0], r = uM();
	if (r == null) return null;
	var i = r.x, a = r.y, o = r.width, s = r.height;
	return /*#__PURE__*/ P.createElement(nN.Provider, { value: n }, /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("clipPath", { id: n }, /*#__PURE__*/ P.createElement("rect", {
		x: i,
		y: a,
		height: s,
		width: o
	}))), t);
}, iN = () => (0, P.useContext)(nN), aN = class {
	constructor(e) {
		var t = e.x, n = e.y;
		this.xAxisScale = t, this.yAxisScale = n;
	}
	map(e, t) {
		var n = t.position;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? 0,
			y: this.yAxisScale.map(e.y, { position: n }) ?? 0
		};
	}
	mapWithFallback(e, t) {
		var n = t.position, r = t.fallback, i = r === "rangeMin" ? this.yAxisScale.rangeMin() : r === "rangeMax" ? this.yAxisScale.rangeMax() : 0, a = r === "rangeMin" ? this.xAxisScale.rangeMin() : r === "rangeMax" ? this.xAxisScale.rangeMax() : 0;
		return {
			x: this.xAxisScale.map(e.x, { position: n }) ?? a,
			y: this.yAxisScale.map(e.y, { position: n }) ?? i
		};
	}
	isInRange(e) {
		var t = e.x, n = e.y, r = t == null || this.xAxisScale.isInRange(t), i = n == null || this.yAxisScale.isInRange(n);
		return r && i;
	}
};
//#endregion
//#region node_modules/recharts/es6/cartesian/ReferenceLine.js
function oN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function sN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? oN(Object(n), !0).forEach(function(t) {
			cN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function cN(e, t, n) {
	return (t = lN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lN(e) {
	var t = uN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function uN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function dN() {
	return dN = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, dN.apply(null, arguments);
}
var fN = (e, t) => {
	var n;
	if (/*#__PURE__*/ P.isValidElement(e)) n = /*#__PURE__*/ P.cloneElement(e, t);
	else if (typeof e == "function") n = e(t);
	else {
		if (!G(t.x1) || !G(t.y1) || !G(t.x2) || !G(t.y2)) return null;
		n = /*#__PURE__*/ P.createElement("line", dN({}, t, { className: "recharts-reference-line-line" }));
	}
	return n;
}, pN = (e, t, n, r, i, a) => {
	var o = a.x, s = a.width, c = i.map(e, { position: n });
	if (!G(c) || t === "discard" && !i.isInRange(c)) return null;
	var l = [{
		x: o + s,
		y: c
	}, {
		x: o,
		y: c
	}];
	return r === "left" ? l.reverse() : l;
}, mN = (e, t, n, r, i, a) => {
	var o = a.y, s = a.height, c = i.map(e, { position: n });
	if (!G(c) || t === "discard" && !i.isInRange(c)) return null;
	var l = [{
		x: c,
		y: o + s
	}, {
		x: c,
		y: o
	}];
	return r === "top" ? l.reverse() : l;
}, hN = (e, t, n, r) => {
	var i = [r.mapWithFallback(e[0], {
		position: n,
		fallback: "rangeMin"
	}), r.mapWithFallback(e[1], {
		position: n,
		fallback: "rangeMax"
	})];
	return t === "discard" && i.some((e) => !r.isInRange(e)) ? null : i;
}, gN = (e, t, n, r, i, a, o) => {
	var s = o.x, c = o.y, l = o.segment, u = o.ifOverflow, d = _t(s);
	return _t(c) ? pN(c, u, r, a, t, n) : d ? mN(s, u, r, i, e, n) : l != null && l.length === 2 ? hN(l, u, r, new aN({
		x: e,
		y: t
	})) : null;
};
function _N(e) {
	var t = B();
	return (0, P.useEffect)(() => (t(qM(e)), () => {
		t(JM(e));
	})), null;
}
function vN(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.shape, i = e.className, a = e.ifOverflow, o = Fl(), s = iN(), c = V((e) => Rx(e, t)), u = V((e) => Vx(e, n)), d = V((e) => _C(e, "xAxis", t, o)), f = V((e) => _C(e, "yAxis", n, o)), p = _u();
	if (!s || !p || c == null || u == null || d == null || f == null) return null;
	var m = gN(d, f, p, e.position, c.orientation, u.orientation, e);
	if (!m) return null;
	var h = m[0], g = m[1];
	if (h == null || g == null) return null;
	var _ = h.x, v = h.y, y = g.x, b = g.y, x = sN(sN({ clipPath: a === "hidden" ? `url(#${s})` : void 0 }, Ue(e)), {}, {
		x1: _,
		y1: v,
		x2: y,
		y2: b
	}), S = HM({
		x1: _,
		y1: v,
		x2: y,
		y2: b
	});
	return /*#__PURE__*/ P.createElement(mE, { zIndex: e.zIndex }, /*#__PURE__*/ P.createElement(F, { className: l("recharts-reference-line", i) }, fN(r, x), /*#__PURE__*/ P.createElement(zO, dN({}, S, {
		lowerWidth: S.width,
		upperWidth: S.width
	}), /*#__PURE__*/ P.createElement(ek, { label: e.label }), e.children)));
}
var yN = {
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	fill: "none",
	label: !1,
	stroke: "#ccc",
	fillOpacity: 1,
	strokeWidth: 1,
	position: "middle",
	zIndex: Y.line
};
function bN(e) {
	var t = Ar(e, yN);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(_N, {
		yAxisId: t.yAxisId,
		xAxisId: t.xAxisId,
		ifOverflow: t.ifOverflow,
		x: t.x,
		y: t.y,
		segment: t.segment
	}), /*#__PURE__*/ P.createElement(vN, t));
}
bN.displayName = "ReferenceLine";
//#endregion
//#region node_modules/es-toolkit/dist/function/noop.mjs
function xN() {}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isPlainObject.mjs
function SN(e) {
	if (!e || typeof e != "object") return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null ? !1 : Object.prototype.toString.call(e) === "[object Object]";
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isEqualWith.mjs
function CN(e, t, n) {
	return wN(e, t, void 0, void 0, void 0, void 0, n);
}
function wN(e, t, n, r, i, a, o) {
	let s = o(e, t, n, r, i, a);
	if (s !== void 0) return s;
	if (typeof e == typeof t) switch (typeof e) {
		case "bigint":
		case "string":
		case "boolean":
		case "symbol":
		case "undefined": return e === t;
		case "number": return e === t || Object.is(e, t);
		case "function": return e === t;
		case "object": return TN(e, t, a, o);
	}
	return TN(e, t, a, o);
}
function TN(e, t, n, r) {
	if (Object.is(e, t)) return !0;
	let i = Qr(e), a = Qr(t);
	if (i === "[object Arguments]" && (i = di), a === "[object Arguments]" && (a = di), i !== a) return !1;
	switch (i) {
		case ei: return e.toString() === t.toString();
		case ti: return Mi(e.valueOf(), t.valueOf());
		case ni:
		case ai:
		case ii: return Object.is(e.valueOf(), t.valueOf());
		case $r: return e.source === t.source && e.flags === t.flags;
		case li: return e === t;
	}
	n ??= /* @__PURE__ */ new Map();
	let o = n.get(e), s = n.get(t);
	if (o != null && s != null) return o === t;
	n.set(e, t), n.set(t, e);
	try {
		switch (i) {
			case oi:
				if (e.size !== t.size) return !1;
				for (let [i, a] of e.entries()) if (!t.has(i) || !wN(a, t.get(i), i, e, t, n, r)) return !1;
				return !0;
			case si: {
				if (e.size !== t.size) return !1;
				let i = Array.from(e.values()), a = Array.from(t.values());
				for (let o = 0; o < i.length; o++) {
					let s = i[o], c = a.findIndex((i) => wN(s, i, void 0, e, t, n, r));
					if (c === -1) return !1;
					a.splice(c, 1);
				}
				return !0;
			}
			case ci:
			case mi:
			case hi:
			case gi:
			case _i:
			case vi:
			case yi:
			case bi:
			case xi:
			case Si:
			case Ci:
			case wi:
				if (Ei(e) !== Ei(t) || e.length !== t.length) return !1;
				for (let i = 0; i < e.length; i++) if (!wN(e[i], t[i], i, e, t, n, r)) return !1;
				return !0;
			case ui: return e.byteLength === t.byteLength && TN(new Uint8Array(e), new Uint8Array(t), n, r);
			case pi: return e.byteLength !== t.byteLength || e.byteOffset !== t.byteOffset ? !1 : TN(new Uint8Array(e), new Uint8Array(t), n, r);
			case fi: return e.name === t.name && e.message === t.message;
			case di: {
				if (!(TN(e.constructor, t.constructor, n, r) || SN(e) && SN(t))) return !1;
				let i = [...Object.keys(e), ...Zr(e)], a = [...Object.keys(t), ...Zr(t)];
				if (i.length !== a.length) return !1;
				for (let a = 0; a < i.length; a++) {
					let o = i[a], s = e[o];
					if (!Object.hasOwn(t, o)) return !1;
					let c = t[o];
					if (!wN(s, c, o, e, t, n, r)) return !1;
				}
				return !0;
			}
			default: return !1;
		}
	} finally {
		n.delete(e), n.delete(t);
	}
}
//#endregion
//#region node_modules/es-toolkit/dist/predicate/isEqual.mjs
function EN(e, t) {
	return CN(e, t, xN);
}
//#endregion
//#region node_modules/recharts/es6/util/getEveryNth.js
function DN(e, t) {
	if (t < 1) return [];
	if (t === 1) return e;
	for (var n = [], r = 0; r < e.length; r += t) {
		var i = e[r];
		i !== void 0 && n.push(i);
	}
	return n;
}
//#endregion
//#region node_modules/recharts/es6/util/TickUtils.js
function ON(e, t, n) {
	return WM({
		width: e.width + t.width,
		height: e.height + t.height
	}, n);
}
function kN(e, t, n) {
	var r = n === "width", i = e.x, a = e.y, o = e.width, s = e.height;
	return t === 1 ? {
		start: r ? i : a,
		end: r ? i + o : a + s
	} : {
		start: r ? i + o : a + s,
		end: r ? i : a
	};
}
function AN(e, t, n, r, i) {
	if (e * t < e * r || e * t > e * i) return !1;
	var a = n();
	return e * (t - e * a / 2 - r) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function jN(e, t) {
	return DN(e, t + 1);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function MN(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = t.start, s = t.end, c = 0, l = 1, u = o, d = function() {
		var t = r?.[c];
		if (t === void 0) return { v: DN(r, l) };
		var a = c, d, f = () => (d === void 0 && (d = n(t, a)), d), p = t.coordinate, m = c === 0 || AN(e, p, f, u, s);
		m || (c = 0, u = o, l += 1), m && (u = p + e * (f() / 2 + i), c += l);
	}, f; l <= a.length;) if (f = d(), f) return f.v;
	return [];
}
function NN(e, t, n, r, i) {
	var a = (r || []).slice().length;
	if (a === 0) return [];
	for (var o = t.start, s = t.end, c = 1; c <= a; c++) {
		for (var l = (a - 1) % c, u = o, d = !0, f = function() {
			var t = r[m];
			if (t == null) return 0;
			var a = m, o, c = () => (o === void 0 && (o = n(t, a)), o), f = t.coordinate, p = m === l || AN(e, f, c, u, s);
			if (!p) return d = !1, 1;
			p && (u = f + e * (c() / 2 + i));
		}, p, m = l; m < a && (p = f(), p === 0 || p !== 1); m += c);
		if (d) {
			for (var h = [], g = l; g < a; g += c) {
				var _ = r[g];
				_ != null && h.push(_);
			}
			return h;
		}
	}
	return [];
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getTicks.js
function PN(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function FN(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? PN(Object(n), !0).forEach(function(t) {
			IN(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : PN(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function IN(e, t, n) {
	return (t = LN(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function LN(e) {
	var t = RN(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function RN(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function zN(e, t, n, r, i) {
	for (var a = (r || []).slice(), o = a.length, s = t.start, c = t.end, l = function(t) {
		var r = a[t];
		if (r == null) return 1;
		var l = r, u, d = () => (u === void 0 && (u = n(r, t)), u);
		if (t === o - 1) {
			var f = e * (l.coordinate + e * d() / 2 - c);
			a[t] = l = FN(FN({}, l), {}, { tickCoord: f > 0 ? l.coordinate - f * e : l.coordinate });
		} else a[t] = l = FN(FN({}, l), {}, { tickCoord: l.coordinate });
		l.tickCoord != null && AN(e, l.tickCoord, d, s, c) && (c = l.tickCoord - e * (d() / 2 + i), a[t] = FN(FN({}, l), {}, { isShow: !0 }));
	}, u = o - 1; u >= 0; u--) if (l(u)) continue;
	return a;
}
function BN(e, t, n, r, i, a) {
	var o = (r || []).slice(), s = o.length, c = t.start, l = t.end;
	if (a) {
		var u = r[s - 1];
		if (u != null) {
			var d = n(u, s - 1), f = e * (u.coordinate + e * d / 2 - l);
			o[s - 1] = u = FN(FN({}, u), {}, { tickCoord: f > 0 ? u.coordinate - f * e : u.coordinate }), u.tickCoord != null && AN(e, u.tickCoord, () => d, c, l) && (l = u.tickCoord - e * (d / 2 + i), o[s - 1] = FN(FN({}, u), {}, { isShow: !0 }));
		}
	}
	for (var p = a ? s - 1 : s, m = function(t) {
		var r = o[t];
		if (r == null) return 1;
		var a = r, s, u = () => (s === void 0 && (s = n(r, t)), s);
		if (t === 0) {
			var d = e * (a.coordinate - e * u() / 2 - c);
			o[t] = a = FN(FN({}, a), {}, { tickCoord: d < 0 ? a.coordinate - d * e : a.coordinate });
		} else o[t] = a = FN(FN({}, a), {}, { tickCoord: a.coordinate });
		a.tickCoord != null && AN(e, a.tickCoord, u, c, l) && (c = a.tickCoord + e * (u() / 2 + i), o[t] = FN(FN({}, a), {}, { isShow: !0 }));
	}, h = 0; h < p; h++) if (m(h)) continue;
	return o;
}
function VN(e, t, n) {
	var r = e.tick, i = e.ticks, a = e.viewBox, o = e.minTickGap, s = e.orientation, c = e.interval, l = e.tickFormatter, u = e.unit, d = e.angle;
	if (!i || !i.length || !r) return [];
	if (I(c) || $d.isSsr) return jN(i, I(c) ? c : 0) ?? [];
	var f = [], p = s === "top" || s === "bottom" ? "width" : "height", m = u && p === "width" ? AD(u, {
		fontSize: t,
		letterSpacing: n
	}) : {
		width: 0,
		height: 0
	}, h = (e, r) => {
		var i = typeof l == "function" ? l(e.value, r) : e.value;
		return p === "width" ? ON(AD(i, {
			fontSize: t,
			letterSpacing: n
		}), m, d) : AD(i, {
			fontSize: t,
			letterSpacing: n
		})[p];
	}, g = i[0], _ = i[1], v = i.length >= 2 && g != null && _ != null ? mt(_.coordinate - g.coordinate) : 1, y = kN(a, v, p);
	return c === "equidistantPreserveStart" ? MN(v, y, h, i, o) : c === "equidistantPreserveEnd" ? NN(v, y, h, i, o) : (f = c === "preserveStart" || c === "preserveStartEnd" ? BN(v, y, h, i, o, c === "preserveStartEnd") : zN(v, y, h, i, o), f.filter((e) => e.isShow));
}
//#endregion
//#region node_modules/recharts/es6/util/YAxisUtils.js
var HN = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.width > l && (l = t.width);
			}
		});
		var u = n ? n.getBoundingClientRect().width : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, UN = (e) => {
	var t = e.ticks, n = e.label, r = e.labelGapWithTick, i = r === void 0 ? 5 : r, a = e.tickSize, o = a === void 0 ? 0 : a, s = e.tickMargin, c = s === void 0 ? 0 : s, l = 0;
	if (t) {
		Array.from(t).forEach((e) => {
			if (e) {
				var t = e.getBoundingClientRect();
				t.height > l && (l = t.height);
			}
		});
		var u = n ? n.getBoundingClientRect().height : 0, d = o + c, f = l + d + u + (n ? i : 0);
		return Math.round(f);
	}
	return 0;
}, WN = Gs({
	name: "renderedTicks",
	initialState: {
		xAxis: {},
		yAxis: {}
	},
	reducers: {
		setRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId, a = n.ticks;
			e[r][i] = U(a);
		},
		removeRenderedTicks: (e, t) => {
			var n = t.payload, r = n.axisType, i = n.axisId;
			delete e[r][i];
		}
	}
}), GN = WN.actions, KN = GN.setRenderedTicks, qN = GN.removeRenderedTicks, JN = WN.reducer, YN = [
	"axisLine",
	"width",
	"height",
	"className",
	"hide",
	"ticks",
	"axisType",
	"axisId"
];
function XN(e, t) {
	return tP(e) || eP(e, t) || QN(e, t) || ZN();
}
function ZN() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function QN(e, t) {
	if (e) {
		if (typeof e == "string") return $N(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $N(e, t) : void 0;
	}
}
function $N(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function eP(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function tP(e) {
	if (Array.isArray(e)) return e;
}
function nP(e, t) {
	if (e == null) return {};
	var n, r, i = rP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function rP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function iP() {
	return iP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, iP.apply(null, arguments);
}
function aP(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function oP(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? aP(Object(n), !0).forEach(function(t) {
			sP(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : aP(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function sP(e, t, n) {
	return (t = cP(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function cP(e) {
	var t = lP(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function lP(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var uP = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: !0,
	axisLine: !0,
	tick: !0,
	mirror: !1,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
	zIndex: Y.axis
};
function dP(e) {
	var t = e.x, n = e.y, r = e.width, i = e.height, a = e.orientation, o = e.mirror, s = e.axisLine, c = e.otherSvgProps;
	if (!s) return null;
	var u = oP(oP(oP({}, c), Ve(s)), {}, { fill: "none" });
	if (a === "top" || a === "bottom") {
		var d = +(a === "top" && !o || a === "bottom" && o);
		u = oP(oP({}, u), {}, {
			x1: t,
			y1: n + d * i,
			x2: t + r,
			y2: n + d * i
		});
	} else {
		var f = +(a === "left" && !o || a === "right" && o);
		u = oP(oP({}, u), {}, {
			x1: t + f * r,
			y1: n,
			x2: t + f * r,
			y2: n + i
		});
	}
	return /*#__PURE__*/ P.createElement("line", iP({}, u, { className: l("recharts-cartesian-axis-line", lt(s, "className")) }));
}
function fP(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h = s ? -1 : 1, g = e.tickSize || o, _ = I(e.tickCoord) ? e.tickCoord : e.coordinate;
	switch (a) {
		case "top":
			l = u = e.coordinate, f = n + +!s * i, d = f - h * g, m = d - h * c, p = _;
			break;
		case "left":
			d = f = e.coordinate, u = t + +!s * r, l = u - h * g, p = l - h * c, m = _;
			break;
		case "right":
			d = f = e.coordinate, u = t + +s * r, l = u + h * g, p = l + h * c, m = _;
			break;
		default: l = u = e.coordinate, f = n + +s * i, d = f + h * g, m = d + h * c, p = _;
	}
	return {
		line: {
			x1: l,
			y1: d,
			x2: u,
			y2: f
		},
		tick: {
			x: p,
			y: m
		}
	};
}
function pP(e, t) {
	switch (e) {
		case "left": return t ? "start" : "end";
		case "right": return t ? "end" : "start";
		default: return "middle";
	}
}
function mP(e, t) {
	switch (e) {
		case "left":
		case "right": return "middle";
		case "top": return t ? "start" : "end";
		default: return t ? "end" : "start";
	}
}
function hP(e) {
	var t = e.option, n = e.tickProps, r = e.value, i, a = l(n.className, "recharts-cartesian-axis-tick-value");
	if (/*#__PURE__*/ P.isValidElement(t)) i = /*#__PURE__*/ P.cloneElement(t, oP(oP({}, n), {}, { className: a }));
	else if (typeof t == "function") i = t(oP(oP({}, n), {}, { className: a }));
	else {
		var o = "recharts-cartesian-axis-tick-value";
		typeof t != "boolean" && (o = l(o, Zk(t))), i = /*#__PURE__*/ P.createElement(DO, iP({}, n, { className: o }), r);
	}
	return i;
}
function gP(e) {
	var t = e.ticks, n = e.axisType, r = e.axisId, i = B(), a = (0, P.useRef)(null);
	return (0, P.useEffect)(() => {
		if (r != null && n != null) {
			var e = t.map((e) => ({
				value: e.value,
				coordinate: e.coordinate,
				offset: e.offset,
				index: e.index
			})), o = a.current;
			o != null && o.axisId === r && o.axisType === n && EN(o.ticks, e) || (a.current = {
				ticks: e,
				axisId: r,
				axisType: n
			}, i(KN({
				ticks: e,
				axisId: r,
				axisType: n
			})));
		}
	}, [
		i,
		t,
		r,
		n
	]), (0, P.useEffect)(() => r == null || n == null ? Tt : () => {
		i(qN({
			axisId: r,
			axisType: n
		}));
	}, [
		i,
		r,
		n
	]), null;
}
var _P = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.ticks, r = n === void 0 ? [] : n, i = e.tick, a = e.tickLine, o = e.stroke, s = e.tickFormatter, c = e.unit, u = e.padding, d = e.tickTextProps, f = e.orientation, p = e.mirror, m = e.x, h = e.y, g = e.width, _ = e.height, v = e.tickSize, y = e.tickMargin, b = e.fontSize, x = e.letterSpacing, S = e.getTicksConfig, C = e.events, w = e.axisType, T = e.axisId, E = VN(oP(oP({}, S), {}, { ticks: r }), b, x), D = Ve(S), O = He(i), k = gO(D.textAnchor) ? D.textAnchor : pP(f, p), A = mP(f, p), j = {};
	typeof a == "object" && (j = a);
	var M = oP(oP({}, D), {}, { fill: "none" }, j), N = E.map((e) => oP({ entry: e }, fP(e, m, h, g, _, f, v, p, y))), ee = N.map((e) => {
		var t = e.entry, n = e.line;
		return /*#__PURE__*/ P.createElement(F, {
			className: "recharts-cartesian-axis-tick",
			key: `tick-${t.value}-${t.coordinate}-${t.tickCoord}`
		}, a && /*#__PURE__*/ P.createElement("line", iP({}, M, n, { className: l("recharts-cartesian-axis-tick-line", lt(a, "className")) })));
	}), te = N.map((e, t) => {
		var n = e.entry, r = e.tick, a = oP(oP({}, oP(oP(oP(oP({ verticalAnchor: A }, D), {}, {
			textAnchor: k,
			stroke: "none",
			fill: o
		}, r), {}, {
			index: t,
			payload: n,
			visibleTicksCount: E.length,
			tickFormatter: s,
			padding: u
		}, d), {}, { angle: d?.angle ?? D.angle ?? 0 })), O);
		return /*#__PURE__*/ P.createElement(F, iP({
			className: "recharts-cartesian-axis-tick-label",
			key: `tick-label-${n.value}-${n.coordinate}-${n.tickCoord}`
		}, wr(C, n, t)), i && /*#__PURE__*/ P.createElement(hP, {
			option: i,
			tickProps: a,
			value: `${typeof s == "function" ? s(n.value, t) : n.value}${c || ""}`
		}));
	});
	return /*#__PURE__*/ P.createElement("g", { className: `recharts-cartesian-axis-ticks recharts-${w}-ticks` }, /*#__PURE__*/ P.createElement(gP, {
		ticks: E,
		axisId: T,
		axisType: w
	}), te.length > 0 && /*#__PURE__*/ P.createElement(mE, { zIndex: Y.label }, /*#__PURE__*/ P.createElement("g", {
		className: `recharts-cartesian-axis-tick-labels recharts-${w}-tick-labels`,
		ref: t
	}, te)), ee.length > 0 && /*#__PURE__*/ P.createElement("g", { className: `recharts-cartesian-axis-tick-lines recharts-${w}-tick-lines` }, ee));
}), vP = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.axisLine, r = e.width, i = e.height, a = e.className, o = e.hide, s = e.ticks, c = e.axisType, u = e.axisId, d = nP(e, YN), f = XN((0, P.useState)(""), 2), p = f[0], m = f[1], h = XN((0, P.useState)(""), 2), g = h[0], _ = h[1], v = (0, P.useRef)(null);
	(0, P.useImperativeHandle)(t, () => ({
		getCalculatedWidth: () => HN({
			ticks: v.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		}),
		getCalculatedHeight: () => UN({
			ticks: v.current,
			label: e.labelRef?.current,
			labelGapWithTick: 5,
			tickSize: e.tickSize,
			tickMargin: e.tickMargin
		})
	}));
	var y = (0, P.useCallback)((e) => {
		if (e) {
			var t = e.getElementsByClassName("recharts-cartesian-axis-tick-value");
			v.current = t;
			var n = t[0];
			if (n) {
				var r = window.getComputedStyle(n), i = r.fontSize, a = r.letterSpacing;
				(i !== p || a !== g) && (m(i), _(a));
			}
		}
	}, [p, g]);
	return o || r != null && r <= 0 || i != null && i <= 0 ? null : /*#__PURE__*/ P.createElement(mE, { zIndex: e.zIndex }, /*#__PURE__*/ P.createElement(F, { className: l("recharts-cartesian-axis", a) }, /*#__PURE__*/ P.createElement(dP, {
		x: e.x,
		y: e.y,
		width: r,
		height: i,
		orientation: e.orientation,
		mirror: e.mirror,
		axisLine: n,
		otherSvgProps: Ve(e)
	}), /*#__PURE__*/ P.createElement(_P, {
		ref: y,
		axisType: c,
		events: d,
		fontSize: p,
		getTicksConfig: e,
		height: e.height,
		letterSpacing: g,
		mirror: e.mirror,
		orientation: e.orientation,
		padding: e.padding,
		stroke: e.stroke,
		tick: e.tick,
		tickFormatter: e.tickFormatter,
		tickLine: e.tickLine,
		tickMargin: e.tickMargin,
		tickSize: e.tickSize,
		tickTextProps: e.tickTextProps,
		ticks: s,
		unit: e.unit,
		width: e.width,
		x: e.x,
		y: e.y,
		axisId: u
	}), /*#__PURE__*/ P.createElement(zO, {
		x: e.x,
		y: e.y,
		width: e.width,
		height: e.height,
		lowerWidth: e.width,
		upperWidth: e.width
	}, /*#__PURE__*/ P.createElement(ek, {
		label: e.label,
		labelRef: e.labelRef
	}), e.children)));
}), yP = /*#__PURE__*/ P.forwardRef((e, t) => {
	var n = Ar(e, uP);
	return /*#__PURE__*/ P.createElement(vP, iP({}, n, { ref: t }));
});
yP.displayName = "CartesianAxis";
//#endregion
//#region node_modules/recharts/es6/theme/RechartsThemeContext.js
var bP = /*#__PURE__*/ (0, P.createContext)({ grid: {
	stroke: "#ccc",
	fill: "none"
} });
bP.Provider;
var xP = () => (0, P.useContext)(bP), SP = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], CP = ["offset"], wP = ["xAxisId", "yAxisId"], TP = ["xAxisId", "yAxisId"];
function EP(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function DP(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? EP(Object(n), !0).forEach(function(t) {
			OP(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : EP(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function OP(e, t, n) {
	return (t = kP(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function kP(e) {
	var t = AP(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function AP(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function jP() {
	return jP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, jP.apply(null, arguments);
}
function MP(e, t) {
	if (e == null) return {};
	var n, r, i = NP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function NP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var PP = (e) => {
	var t = e.fill;
	if (!t || t === "none") return null;
	var n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.ry;
	return /*#__PURE__*/ P.createElement("rect", {
		x: r,
		y: i,
		ry: s,
		width: a,
		height: o,
		stroke: "none",
		fill: t,
		fillOpacity: n,
		className: "recharts-cartesian-grid-bg"
	});
};
function FP(e) {
	var t = e.option, n = e.lineItemProps, r;
	if (/*#__PURE__*/ P.isValidElement(t)) r = /*#__PURE__*/ P.cloneElement(t, n);
	else if (typeof t == "function") r = t(n);
	else {
		var i = n.x1, a = n.y1, o = n.x2, s = n.y2, c = n.key, l = Ve(MP(n, SP)) ?? {};
		l.offset;
		var u = MP(l, CP), d = Array.isArray(u.strokeDasharray) ? u.strokeDasharray.join(",") : u.strokeDasharray;
		r = /*#__PURE__*/ P.createElement("line", jP({}, u, {
			strokeDasharray: d,
			x1: i,
			y1: a,
			x2: o,
			y2: s,
			fill: "none",
			key: c
		}));
	}
	return r;
}
function IP(e) {
	var t = e.x, n = e.width, r = e.horizontal, i = r === void 0 || r, a = e.horizontalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = MP(e, wP), s = a.map((e, r) => {
		var a = DP(DP({}, o), {}, {
			x1: t,
			y1: e,
			x2: t + n,
			y2: e,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ P.createElement(FP, {
			key: `line-${r}`,
			option: i,
			lineItemProps: a
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, s);
}
function LP(e) {
	var t = e.y, n = e.height, r = e.vertical, i = r === void 0 || r, a = e.verticalPoints;
	if (!i || !a || !a.length) return null;
	e.xAxisId, e.yAxisId;
	var o = MP(e, TP), s = a.map((e, r) => {
		var a = DP(DP({}, o), {}, {
			x1: e,
			y1: t,
			x2: e,
			y2: t + n,
			key: `line-${r}`,
			index: r
		});
		return /*#__PURE__*/ P.createElement(FP, {
			option: i,
			lineItemProps: a,
			key: `line-${r}`
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid-vertical" }, s);
}
function RP(e) {
	var t = e.horizontalFill, n = e.fillOpacity, r = e.x, i = e.y, a = e.width, o = e.height, s = e.horizontalPoints, c = e.horizontal;
	if (!(c === void 0 || c) || !t || !t.length || s == null) return null;
	var l = s.map((e) => Math.round(e + i - i)).sort((e, t) => e - t);
	i !== l[0] && l.unshift(0);
	var u = l.map((e, s) => {
		var c = l[s + 1], u = c == null ? i + o - e : c - e;
		if (u <= 0) return null;
		var d = s % t.length;
		return /*#__PURE__*/ P.createElement("rect", {
			key: `react-${s}`,
			y: e,
			x: r,
			height: u,
			width: a,
			stroke: "none",
			fill: t[d],
			fillOpacity: n,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, u);
}
function zP(e) {
	var t = e.vertical, n = t === void 0 || t, r = e.verticalFill, i = e.fillOpacity, a = e.x, o = e.y, s = e.width, c = e.height, l = e.verticalPoints;
	if (!n || !r || !r.length) return null;
	var u = l.map((e) => Math.round(e + a - a)).sort((e, t) => e - t);
	a !== u[0] && u.unshift(0);
	var d = u.map((e, t) => {
		var n = u[t + 1], l = n == null ? a + s - e : n - e;
		if (l <= 0) return null;
		var d = t % r.length;
		return /*#__PURE__*/ P.createElement("rect", {
			key: `react-${t}`,
			x: e,
			y: o,
			width: l,
			height: c,
			stroke: "none",
			fill: r[d],
			fillOpacity: i,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, d);
}
var BP = (e, t) => {
	var n = e.xAxis, r = e.width, i = e.height, a = e.offset;
	return Yc(VN(DP(DP(DP({}, uP), n), {}, {
		ticks: Xc(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.left, a.left + a.width, t);
}, VP = (e, t) => {
	var n = e.yAxis, r = e.width, i = e.height, a = e.offset;
	return Yc(VN(DP(DP(DP({}, uP), n), {}, {
		ticks: Xc(n, !0),
		viewBox: {
			x: 0,
			y: 0,
			width: r,
			height: i
		}
	})), a.top, a.top + a.height, t);
}, HP = {
	horizontal: !0,
	vertical: !0,
	horizontalPoints: [],
	verticalPoints: [],
	verticalFill: [],
	horizontalFill: [],
	xAxisId: 0,
	yAxisId: 0,
	syncWithTicks: !1,
	zIndex: Y.grid
};
function UP(e) {
	var t = bu(), n = xu(), r = yu(), i = DP(DP({}, Ar(e, HP)), {}, {
		x: I(e.x) ? e.x : r.left,
		y: I(e.y) ? e.y : r.top,
		width: I(e.width) ? e.width : r.width,
		height: I(e.height) ? e.height : r.height
	}), a = i.xAxisId, o = i.yAxisId, s = i.x, c = i.y, l = i.width, u = i.height, d = i.syncWithTicks, f = i.horizontalValues, p = i.verticalValues, m = Fl(), h = V((e) => IC(e, "xAxis", a, m)), g = V((e) => IC(e, "yAxis", o, m)), _ = xP(), v = {
		stroke: i.stroke ?? _.grid.stroke,
		strokeWidth: i.strokeWidth ?? _.grid.strokeWidth,
		strokeOpacity: i.strokeOpacity ?? _.grid.strokeOpacity,
		strokeDasharray: i.strokeDasharray ?? _.grid.strokeDasharray
	};
	if (!Vc(l) || !Vc(u) || !I(s) || !I(c)) return null;
	var y = i.verticalCoordinatesGenerator || BP, b = i.horizontalCoordinatesGenerator || VP, x = i.horizontalPoints, S = i.verticalPoints;
	if ((!x || !x.length) && typeof b == "function") {
		var C = f && f.length, w = b({
			yAxis: g ? DP(DP({}, g), {}, { ticks: C ? f : g.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, C ? !0 : d);
		Vl(Array.isArray(w), `horizontalCoordinatesGenerator should return Array but instead it returned [${typeof w}]`), Array.isArray(w) && (x = w);
	}
	if ((!S || !S.length) && typeof y == "function") {
		var T = p && p.length, E = y({
			xAxis: h ? DP(DP({}, h), {}, { ticks: T ? p : h.ticks }) : void 0,
			width: t ?? l,
			height: n ?? u,
			offset: r
		}, T ? !0 : d);
		Vl(Array.isArray(E), `verticalCoordinatesGenerator should return Array but instead it returned [${typeof E}]`), Array.isArray(E) && (S = E);
	}
	return /*#__PURE__*/ P.createElement(mE, { zIndex: i.zIndex }, /*#__PURE__*/ P.createElement("g", { className: "recharts-cartesian-grid" }, /*#__PURE__*/ P.createElement(PP, {
		fill: i.fill ?? _.grid.fill,
		fillOpacity: i.fillOpacity ?? _.grid.fillOpacity,
		x: i.x,
		y: i.y,
		width: i.width,
		height: i.height,
		ry: i.ry
	}), /*#__PURE__*/ P.createElement(RP, jP({}, i, { horizontalPoints: x })), /*#__PURE__*/ P.createElement(zP, jP({}, i, { verticalPoints: S })), /*#__PURE__*/ P.createElement(IP, jP({}, i, v, {
		offset: r,
		horizontalPoints: x,
		xAxis: h,
		yAxis: g
	})), /*#__PURE__*/ P.createElement(LP, jP({}, i, v, {
		offset: r,
		verticalPoints: S,
		xAxis: h,
		yAxis: g
	}))));
}
UP.displayName = "CartesianGrid";
//#endregion
//#region node_modules/recharts/es6/cartesian/LineDrawShape.js
var WP = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"visibleLength",
	"strokeDasharray",
	"connectNulls"
];
function GP() {
	return GP = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, GP.apply(null, arguments);
}
function KP(e, t) {
	if (e == null) return {};
	var n, r, i = qP(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qP(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function JP(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function YP(e, t) {
	return `${t}px ${e}px`;
}
function XP(e) {
	return e.length % 2 == 0 ? e : [...e, ...e];
}
function ZP(e, t) {
	for (var n = [], r = 0; r < t; ++r) n.push(...e);
	return n;
}
function QP(e, t, n) {
	var r = XP(n), i = r.reduce((e, t) => e + t, 0);
	if (!i) return YP(t, e);
	for (var a = Math.floor(e / i), o = e % i, s = [], c = 0, l = 0; c < r.length; l += (u = r[c]) ?? 0, ++c) {
		var u, d = r[c];
		if (d != null && l + d > o) {
			s = [...r.slice(0, c), o - l];
			break;
		}
	}
	var f = s.length % 2 == 0 ? [0, t] : [t];
	return [
		...ZP(r, a),
		...s,
		...f
	].map((e) => `${e}px`).join(", ");
}
function $P(e, t, n) {
	return e ? QP(n, t, `${e}`.split(/[,\s]+/gim).map((e) => parseFloat(e))) : YP(t, n);
}
function eF(e) {
	e.animationElapsedTime, e.isAnimating, e.isEntrance;
	var t = e.visibleLength, n = e.strokeDasharray, r = e.connectNulls, i = KP(e, WP), a = r ?? !1, o;
	if (t != null) {
		var s = i.pathRef;
		o = $P(n, JP(s?.current ?? null), t);
	} else n != null && (o = String(n));
	return /*#__PURE__*/ P.createElement(Lf, GP({}, i, {
		connectNulls: a,
		strokeDasharray: o
	}));
}
//#endregion
//#region node_modules/recharts/es6/cartesian/useAnimatedLineLength.js
function tF(e) {
	var t = (0, P.useRef)(0), n = (0, P.useRef)(0), r = (0, P.useRef)(!1), i = (0, P.useRef)(e);
	return i.current !== e && (t.current = n.current, i.current = e), (0, P.useCallback)((e, i) => {
		if (r.current) return null;
		var a = Math.min(ft(t.current + e * i), i);
		return e > 0 && i > 0 && (n.current = Math.max(n.current, a), a >= i) ? (r.current = !0, null) : a;
	}, []);
}
//#endregion
//#region node_modules/recharts/es6/state/errorBarSlice.js
var nF = Gs({
	name: "errorBars",
	initialState: {},
	reducers: {
		addErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] || (e[r] = []), e[r].push(i);
		},
		replaceErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.prev, a = n.next;
			e[r] && (e[r] = e[r].map((e) => e.dataKey === i.dataKey && e.direction === i.direction ? a : e));
		},
		removeErrorBar: (e, t) => {
			var n = t.payload, r = n.itemId, i = n.errorBar;
			e[r] && (e[r] = e[r].filter((e) => e.dataKey !== i.dataKey || e.direction !== i.direction));
		}
	}
}), rF = nF.actions;
rF.addErrorBar, rF.replaceErrorBar, rF.removeErrorBar;
var iF = nF.reducer, aF = ["children"];
function oF(e, t) {
	if (e == null) return {};
	var n, r, i = sF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function sF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var cF = /*#__PURE__*/ (0, P.createContext)({
	data: [],
	xAxisId: "xAxis-0",
	yAxisId: "yAxis-0",
	dataPointFormatter: () => ({
		x: 0,
		y: 0,
		value: 0
	}),
	errorBarOffset: 0
});
function lF(e) {
	var t = e.children, n = oF(e, aF);
	return /*#__PURE__*/ P.createElement(cF.Provider, { value: n }, t);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/GraphicalItemClipPath.js
function uF(e, t) {
	var n = V((t) => Rx(t, e)), r = V((e) => Vx(e, t)), i = n?.allowDataOverflow ?? Ix.allowDataOverflow, a = r?.allowDataOverflow ?? zx.allowDataOverflow;
	return {
		needClip: i || a,
		needClipX: i,
		needClipY: a
	};
}
function dF(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.clipPathId, i = uM(), a = uF(t, n), o = a.needClipX, s = a.needClipY, c = a.needClip, l = V((e) => uC(e, t, !1)), u = V((e) => dC(e, n, !1));
	if (!c || !i) return null;
	var d = i.x, f = i.y, p = i.width, m = i.height, h = o && l ? Math.min(l[0], l[1]) : d - p / 2, g = s && u ? Math.min(u[0], u[1]) : f - m / 2, _ = o && l ? Math.abs(l[1] - l[0]) : p * 2, v = s && u ? Math.abs(u[1] - u[0]) : m * 2;
	return /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-${r}` }, /*#__PURE__*/ P.createElement("rect", {
		x: h,
		y: g,
		width: _,
		height: v
	}));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/lineSelectors.js
var fF = (e, t, n, r) => VC(e, "xAxis", t, r), pF = (e, t, n, r) => BC(e, "xAxis", t, r), mF = (e, t, n, r) => VC(e, "yAxis", n, r), hF = (e, t, n, r) => BC(e, "yAxis", n, r), gF = H([
	q,
	fF,
	mF,
	pF,
	hF
], (e, t, n, r, i) => Jc(e, "xAxis") ? ll(t, r, !1) : ll(n, i, !1)), _F = (e, t, n, r, i) => i;
function vF(e) {
	return e.type === "line";
}
var yF = H([
	q,
	fF,
	mF,
	pF,
	hF,
	H([Jx, _F], (e, t) => e.filter(vF).find((e) => e.id === t)),
	gF,
	Gm
], (e, t, n, r, i, a, o, s) => {
	var c = s.chartData, l = s.dataStartIndex, u = s.dataEndIndex;
	if (!(a == null || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || o == null || e !== "horizontal" && e !== "vertical")) {
		var d = a.dataKey, f = a.data, p = f != null && f.length > 0 ? f : c?.slice(l, u + 1);
		if (p != null) return GF({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataKey: d,
			bandSize: o,
			displayedData: p
		});
	}
});
//#endregion
//#region node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js
function bF(e) {
	var t = He(e), n = 3, r = 2;
	if (t != null) {
		var i = t.r, a = t.strokeWidth, o = Number(i), s = Number(a);
		return (Number.isNaN(o) || o < 0) && (o = n), (Number.isNaN(s) || s < 0) && (s = r), {
			r: o,
			strokeWidth: s
		};
	}
	return {
		r: n,
		strokeWidth: r
	};
}
//#endregion
//#region node_modules/recharts/es6/cartesian/Line.js
var xF = ["id"], SF = [
	"type",
	"layout",
	"connectNulls",
	"needClip",
	"shape",
	"strokeDasharray"
], CF = [
	"activeDot",
	"animateNewValues",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"hide",
	"isAnimationActive",
	"label",
	"legendType",
	"xAxisId",
	"yAxisId",
	"id"
];
function wF() {
	return wF = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wF.apply(null, arguments);
}
function TF(e, t) {
	if (e == null) return {};
	var n, r, i = EF(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function EF(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function DF(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function OF(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? DF(Object(n), !0).forEach(function(t) {
			kF(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : DF(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function kF(e, t, n) {
	return (t = AF(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function AF(e) {
	var t = jF(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function jF(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function MF(e) {
	try {
		return e && e.getTotalLength && e.getTotalLength() || 0;
	} catch {
		return 0;
	}
}
function NF(e) {
	var t = 0, n = 0;
	for (var r of e) r.status === "matched" && r.prev.x != null && r.next.x != null && (t += r.next.x - r.prev.x, n++);
	return n > 0 ? t / n : 0;
}
var PF = {
	activeDot: !0,
	animateNewValues: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: (e, t) => {
		if (e == null) return [];
		if (t === 1) return e.flatMap((e) => e.status === "removed" ? [] : [e.next]);
		var n = NF(e), r = [];
		for (var i of e) if (i.status === "matched") r.push(OF(OF({}, i.next), {}, {
			x: L(i.prev.x, i.next.x, t),
			y: L(i.prev.y, i.next.y, t)
		}));
		else if (i.status === "added") {
			if (i.next.x != null) {
				var a = i.next.x - n;
				r.push(OF(OF({}, i.next), {}, {
					x: L(a, i.next.x, t),
					y: i.next.y
				}));
			} else r.push(i.next);
		} else if (i.status === "removed" && i.prev.x != null) {
			var o = i.prev.x + n;
			r.push(OF(OF({}, i.prev), {}, {
				x: L(i.prev.x, o, t),
				y: i.prev.y
			}));
		}
		return r;
	},
	animationMatchBy: ZA,
	connectNulls: !1,
	dot: !0,
	fill: "#fff",
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "line",
	shape: eF,
	stroke: "#3182bd",
	strokeWidth: 1,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: Y.line,
	type: "linear"
}, FF = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: dl(n, t),
		payload: e
	}];
}, IF = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: Tt,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: dl(o, t),
			hide: s,
			type: u,
			color: r,
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ P.createElement(HA, { tooltipEntrySettings: f });
});
function LF(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.dot, a = r.dataKey, o = r.needClip;
	r.id;
	var s = Ve(TF(r, xF));
	return /*#__PURE__*/ P.createElement(Kj, {
		points: n,
		dot: i,
		className: "recharts-line-dots",
		dotClassName: "recharts-line-dot",
		dataKey: a,
		baseProps: s,
		needClip: o,
		clipPathId: t
	});
}
function RF(e) {
	var t = e.showLabels, n = e.children, r = e.points, i = (0, P.useMemo)(() => r?.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return OF(OF({}, t), {}, {
			value: e.value,
			payload: e.payload,
			viewBox: t,
			parentViewBox: void 0,
			fill: void 0
		});
	}), [r]);
	return /*#__PURE__*/ P.createElement(lk, { value: t ? i : void 0 }, n);
}
function zF(e) {
	var t = e.clipPathId, n = e.pathRef, r = e.points, i = e.props, a = e.animationElapsedTime, o = e.isAnimating, s = e.isEntrance, c = e.visibleLength, l = i.type, u = i.layout, d = i.connectNulls, f = i.needClip, p = i.shape, m = i.strokeDasharray, h = OF(OF({}, Ue(TF(i, SF))), {}, {
		fill: "none",
		className: "recharts-line-curve",
		clipPath: f ? `url(#clipPath-${t})` : void 0,
		points: r,
		type: l,
		layout: u,
		connectNulls: d,
		strokeDasharray: m ?? i.strokeDasharray,
		pathRef: n,
		animationElapsedTime: a,
		isAnimating: o,
		isEntrance: i.animateNewValues ? s : !1,
		visibleLength: c
	});
	return /*#__PURE__*/ P.createElement(P.Fragment, null, r?.length > 1 && /*#__PURE__*/ P.createElement(RA, {
		option: p,
		DefaultShape: PF.shape,
		shapeProps: h
	}), /*#__PURE__*/ P.createElement(LF, {
		points: r,
		clipPathId: t,
		props: i
	}));
}
function BF(e) {
	var t = e.clipPathId, n = e.props, r = e.pathRef, i = e.previousPointsRef, a = n.points, o = n.isAnimationActive, s = n.animationBegin, c = n.animationDuration, l = n.animationEasing, u = n.animationMatchBy, d = n.animationInterpolateFn, f = n.layout, p = MF(r.current), m = fj(n.onAnimationStart, n.onAnimationEnd), h = m.isAnimating, g = m.handleAnimationStart, _ = m.handleAnimationEnd, v = !h, y = tF(a), b = (0, P.useCallback)((e) => e > 0 && p > 0, [p]);
	return /*#__PURE__*/ P.createElement(RF, {
		points: a,
		showLabels: v
	}, n.children, /*#__PURE__*/ P.createElement(pj, {
		animationInput: a,
		animationIdPrefix: "recharts-line-",
		items: a,
		previousItemsRef: i,
		isAnimationActive: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		onAnimationStart: g,
		onAnimationEnd: _,
		animationInterpolateFn: d,
		animationMatchBy: u,
		shouldUpdatePreviousRef: b,
		layout: f
	}, (e, i, a) => {
		var o = h || i < 1, s = o ? y(i, p) : null;
		return /*#__PURE__*/ P.createElement(zF, {
			props: n,
			points: e,
			clipPathId: t,
			pathRef: r,
			animationElapsedTime: i,
			isAnimating: o,
			isEntrance: a,
			visibleLength: s
		});
	}), /*#__PURE__*/ P.createElement(hk, { label: n.label }));
}
function VF(e) {
	var t = e.clipPathId, n = e.props, r = (0, P.useRef)(null), i = (0, P.useRef)(null);
	return /*#__PURE__*/ P.createElement(BF, {
		props: n,
		clipPathId: t,
		previousPointsRef: r,
		pathRef: i
	});
}
var HF = (e, t) => ({
	x: e.x ?? void 0,
	y: e.y ?? void 0,
	value: e.value,
	errorVal: K(e.payload, t)
}), UF = class extends P.Component {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.top, c = e.left, u = e.width, d = e.height, f = e.id, p = e.needClip, m = e.zIndex;
		if (t) return null;
		var h = l("recharts-line", i), g = f, _ = bF(n), v = _.r, y = _.strokeWidth, b = DA(n), x = v * 2 + y, S = p ? `url(#clipPath-${b ? "" : "dots-"}${g})` : void 0;
		return /*#__PURE__*/ P.createElement(mE, { zIndex: m }, /*#__PURE__*/ P.createElement(F, { className: h }, p && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(dF, {
			clipPathId: g,
			xAxisId: a,
			yAxisId: o
		}), !b && /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-dots-${g}` }, /*#__PURE__*/ P.createElement("rect", {
			x: c - x / 2,
			y: s - x / 2,
			width: u + x,
			height: d + x
		}))), /*#__PURE__*/ P.createElement(lF, {
			xAxisId: a,
			yAxisId: o,
			data: r,
			dataPointFormatter: HF,
			errorBarOffset: 0
		}, /*#__PURE__*/ P.createElement(VF, {
			props: this.props,
			clipPathId: g
		}))), /*#__PURE__*/ P.createElement(vM, {
			activeDot: this.props.activeDot,
			points: r,
			mainColor: this.props.stroke,
			itemDataKey: this.props.dataKey,
			clipPath: S
		}));
	}
};
function WF(e) {
	var t = Ar(e, PF), n = t.activeDot, r = t.animateNewValues, i = t.animationBegin, a = t.animationDuration, o = t.animationEasing, s = t.connectNulls, c = t.dot, l = t.hide, u = t.isAnimationActive, d = t.label, f = t.legendType, p = t.xAxisId, m = t.yAxisId, h = t.id, g = TF(t, CF), _ = uF(p, m).needClip, v = uM(), y = Cu(), b = Fl(), x = V((e) => yF(e, p, m, b, h));
	if (y !== "horizontal" && y !== "vertical" || x == null || v == null) return null;
	var S = v.height, C = v.width, w = v.x, T = v.y;
	return /*#__PURE__*/ P.createElement(UF, wF({}, g, {
		id: h,
		connectNulls: s,
		dot: c,
		activeDot: n,
		animateNewValues: r,
		animationBegin: i,
		animationDuration: a,
		animationEasing: o,
		isAnimationActive: u,
		hide: l,
		label: d,
		legendType: f,
		xAxisId: p,
		yAxisId: m,
		points: x,
		layout: y,
		height: S,
		width: C,
		left: w,
		top: T,
		needClip: _
	}));
}
function GF(e) {
	var t = e.layout, n = e.xAxis, r = e.yAxis, i = e.xAxisTicks, a = e.yAxisTicks, o = e.dataKey, s = e.bandSize;
	return e.displayedData.map((e, c) => {
		var l = K(e, o);
		if (t === "horizontal") return {
			x: tl({
				axis: n,
				ticks: i,
				bandSize: s,
				entry: e,
				index: c
			}),
			y: (R(l) ? null : r.scale.map(l)) ?? null,
			value: l,
			payload: e
		};
		var u = R(l) ? null : n.scale.map(l), d = tl({
			axis: r,
			ticks: a,
			bandSize: s,
			entry: e,
			index: c
		});
		return u == null || d == null ? null : {
			x: u,
			y: d,
			value: l,
			payload: e
		};
	}).filter(Boolean);
}
function KF(e) {
	var t = Ar(e, PF), n = Fl();
	return /*#__PURE__*/ P.createElement(Cj, {
		id: t.id,
		type: "line"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(UA, { legendPayload: FF(t) }), /*#__PURE__*/ P.createElement(IF, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(Nj, {
		type: "line",
		id: e,
		data: t.data,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		hide: t.hide,
		isPanorama: n
	}), /*#__PURE__*/ P.createElement(WF, wF({}, t, { id: e }))));
}
var qF = /*#__PURE__*/ P.memo(KF, td);
qF.displayName = "Line";
//#endregion
//#region node_modules/recharts/es6/state/selectors/graphicalItemSelectors.js
function JF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.xAxisId ?? 0;
}
function YF(e, t) {
	return e.graphicalItems.cartesianItems.find((e) => e.id === t)?.yAxisId ?? 0;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/areaSelectors.js
var XF = (e, t, n) => VC(e, "xAxis", JF(e, t), n), ZF = (e, t, n) => BC(e, "xAxis", JF(e, t), n), QF = (e, t, n) => VC(e, "yAxis", YF(e, t), n), $F = (e, t, n) => BC(e, "yAxis", YF(e, t), n), eI = H([
	q,
	XF,
	QF,
	ZF,
	$F
], (e, t, n, r, i) => Jc(e, "xAxis") ? ll(t, r, !1) : ll(n, i, !1)), tI = H([Jx, (e, t) => t], (e, t) => e.filter((e) => e.type === "area").find((e) => e.id === t)), nI = (e) => Jc(q(e), "xAxis") ? "yAxis" : "xAxis", rI = (e, t) => nI(e) === "yAxis" ? YF(e, t) : JF(e, t), iI = (e, t, n) => bS(e, nI(e), rI(e, t), n), aI = H([
	q,
	XF,
	QF,
	ZF,
	$F,
	H([tI, iI], (e, t) => {
		if (e != null && t != null) {
			var n = e.stackId, r = tg(e);
			if (n != null && r != null) {
				var i = (t[n]?.stackedData)?.find((e) => e.key === r);
				if (i != null) return i.map((e) => [e[0], e[1]]);
			}
		}
	}),
	Km,
	eI,
	tI,
	jh,
	H([tI, iI], (e, t) => {
		if (e != null && e.stackId != null && t != null) {
			var n = t[e.stackId];
			if (n != null) return n.graphicalItems.map((e) => e.dataKey).filter(wt);
		}
	})
], (e, t, n, r, i, a, o, s, c, l, u) => {
	var d = o.chartData, f = o.dataStartIndex, p = o.dataEndIndex;
	if (!(c == null || e !== "horizontal" && e !== "vertical" || t == null || n == null || r == null || i == null || r.length === 0 || i.length === 0 || s == null)) {
		var m = c.data, h = m && m.length > 0 ? m : d?.slice(f, p + 1);
		if (h != null) return RI({
			layout: e,
			xAxis: t,
			yAxis: n,
			xAxisTicks: r,
			yAxisTicks: i,
			dataStartIndex: f,
			areaSettings: c,
			stackedData: a,
			displayedData: h,
			chartBaseValue: l,
			bandSize: s,
			stackDataKeys: u
		});
	}
}), oI = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"layout",
	"isRange",
	"stroke",
	"connectNulls"
], sI = ["id", "baseLine"];
function cI() {
	return cI = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, cI.apply(null, arguments);
}
function lI(e, t) {
	if (e == null) return {};
	var n, r, i = uI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function uI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function dI(e) {
	var t = e.alpha, n = e.baseLine, r = e.points, i = e.strokeWidth, a = r[0]?.x, o = r[r.length - 1]?.x;
	if (!G(a) || !G(o)) return null;
	var s = t * Math.abs(a - o), c = Math.max(...r.map((e) => e.y || 0));
	return I(n) ? c = Math.max(n, c) : n && Array.isArray(n) && n.length && (c = Math.max(...n.map((e) => e.y || 0), c)), I(c) ? /*#__PURE__*/ P.createElement("rect", {
		x: a < o ? a : a - s,
		y: 0,
		width: s,
		height: Math.floor(c + (i ? parseInt(`${i}`, 10) : 1))
	}) : null;
}
function fI(e) {
	var t = e.alpha, n = e.baseLine, r = e.points, i = e.strokeWidth, a = r[0]?.y, o = r[r.length - 1]?.y;
	if (!G(a) || !G(o)) return null;
	var s = t * Math.abs(a - o), c = Math.max(...r.map((e) => e.x || 0));
	return I(n) ? c = Math.max(n, c) : n && Array.isArray(n) && n.length && (c = Math.max(...n.map((e) => e.x || 0), c)), I(c) ? /*#__PURE__*/ P.createElement("rect", {
		x: 0,
		y: a < o ? a : a - s,
		width: c + (i ? parseInt(`${i}`, 10) : 1),
		height: Math.floor(s)
	}) : null;
}
function pI(e) {
	var t = e.alpha, n = e.layout, r = e.points, i = e.baseLine, a = e.strokeWidth;
	return n === "vertical" ? /*#__PURE__*/ P.createElement(fI, {
		alpha: t,
		points: r,
		baseLine: i,
		strokeWidth: a
	}) : /*#__PURE__*/ P.createElement(dI, {
		alpha: t,
		points: r,
		baseLine: i,
		strokeWidth: a
	});
}
function mI(e) {
	var t = e.animationElapsedTime, n = t === void 0 ? 1 : t, r = e.isAnimating, i = r !== void 0 && r, a = e.isEntrance, o = a !== void 0 && a, s = e.layout, c = e.isRange, l = e.stroke, u = e.connectNulls, d = lI(e, oI), f = s === "vertical" ? "vertical" : "horizontal", p = u ?? !1, m = bj(), h = d.id, g = d.baseLine, _ = Ve(lI(d, sI)), v = /*#__PURE__*/ P.createElement(Lf, cI({}, d, {
		id: h,
		baseLine: g,
		connectNulls: p,
		stroke: "none",
		className: "recharts-area-area",
		layout: f
	})), y = l !== "none" && /*#__PURE__*/ P.createElement(Lf, cI({}, _, {
		className: "recharts-area-curve",
		layout: f,
		type: d.type,
		connectNulls: p,
		fill: "none",
		stroke: l,
		points: d.points
	})), b = l !== "none" && c && Array.isArray(g) && /*#__PURE__*/ P.createElement(Lf, cI({}, _, {
		className: "recharts-area-curve",
		layout: f,
		type: d.type,
		connectNulls: p,
		fill: "none",
		stroke: l,
		points: g
	}));
	return o && (i || n < 1) ? /*#__PURE__*/ P.createElement(F, null, /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement("clipPath", { id: m }, /*#__PURE__*/ P.createElement(pI, {
		alpha: n,
		points: d.points ?? [],
		baseLine: g,
		layout: f,
		strokeWidth: d.strokeWidth
	}))), /*#__PURE__*/ P.createElement(F, { clipPath: `url(#${m})` }, v, y, b)) : /*#__PURE__*/ P.createElement(P.Fragment, null, v, y, b);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/Area.js
var hI = ["id"], gI = [
	"activeDot",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"fill",
	"fillOpacity",
	"hide",
	"isAnimationActive",
	"legendType",
	"stroke",
	"xAxisId",
	"yAxisId"
];
function _I() {
	return _I = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, _I.apply(null, arguments);
}
function vI(e, t) {
	if (e == null) return {};
	var n, r, i = yI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function yI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function bI(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xI(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bI(Object(n), !0).forEach(function(t) {
			SI(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bI(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function SI(e, t, n) {
	return (t = CI(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function CI(e) {
	var t = wI(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wI(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var TI = {
	activeDot: !0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: ZA,
	animationInterpolateFn: (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "matched" ? [xI(xI({}, e.next), {}, {
		x: L(e.prev.x, e.next.x, t),
		y: L(e.prev.y, e.next.y, t)
	})] : e.status === "added" ? [e.next] : []),
	connectNulls: !1,
	dot: !1,
	fill: "#3182bd",
	fillOpacity: .6,
	hide: !1,
	isAnimationActive: "auto",
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	type: "linear",
	label: !1,
	shape: mI,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: Y.area
};
function EI(e, t) {
	return e && e !== "none" ? e : t;
}
var DI = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.fill, a = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: a,
		color: EI(r, i),
		value: dl(n, t),
		payload: e
	}];
}, OI = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.data, r = e.stroke, i = e.strokeWidth, a = e.fill, o = e.name, s = e.hide, c = e.unit, l = e.formatter, u = e.tooltipType, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: Tt,
		settings: {
			stroke: r,
			strokeWidth: i,
			fill: a,
			dataKey: t,
			nameKey: void 0,
			name: dl(o, t),
			hide: s,
			type: u,
			color: EI(r, a),
			unit: c,
			formatter: l,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ P.createElement(HA, { tooltipEntrySettings: f });
});
function kI(e) {
	var t = e.clipPathId, n = e.points, r = e.props, i = r.needClip, a = r.dot, o = r.dataKey, s = Ve(r);
	return /*#__PURE__*/ P.createElement(Kj, {
		points: n,
		dot: a,
		className: "recharts-area-dots",
		dotClassName: "recharts-area-dot",
		dataKey: o,
		baseProps: s,
		needClip: i,
		clipPathId: t
	});
}
function AI(e) {
	var t = e.showLabels, n = e.children, r = e.points.map((e) => {
		var t = {
			x: e.x ?? 0,
			y: e.y ?? 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return xI(xI({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: void 0,
			viewBox: t,
			fill: void 0
		});
	});
	return /*#__PURE__*/ P.createElement(lk, { value: t ? r : void 0 }, n);
}
function jI(e) {
	var t = e.points, n = e.baseLine, r = e.needClip, i = e.clipPathId, a = e.props, o = e.animationElapsedTime, s = e.isAnimating, c = e.isEntrance, l = a.layout, u = a.type, d = a.stroke, f = a.connectNulls, p = a.isRange, m = a.shape, h = a.id, g = vI(a, hI), _ = xI(xI({}, Ue(g)), {}, {
		id: h,
		points: t,
		connectNulls: f,
		type: u,
		baseLine: n,
		layout: l,
		stroke: d,
		isRange: p,
		animationElapsedTime: o,
		isAnimating: s,
		isEntrance: c
	});
	return /*#__PURE__*/ P.createElement(P.Fragment, null, t?.length > 1 && /*#__PURE__*/ P.createElement(F, { clipPath: r ? `url(#clipPath-${i})` : void 0 }, /*#__PURE__*/ P.createElement(RA, {
		option: m,
		DefaultShape: TI.shape,
		shapeProps: _
	})), /*#__PURE__*/ P.createElement(kI, {
		points: t,
		props: g,
		clipPathId: i
	}));
}
function MI(e, t, n) {
	return I(e) ? L(I(t) ? t : void 0, e, n) : R(e) || ht(e) ? L(I(t) ? t : void 0, 0, n) : e;
}
function NI(e) {
	var t = e.needClip, n = e.clipPathId, r = e.props, i = e.previousPointsRef, a = e.previousBaselineRef, o = r.points, s = r.baseLine, c = r.isAnimationActive, l = r.animationBegin, u = r.animationDuration, d = r.animationEasing, f = r.animationMatchBy, p = r.animationInterpolateFn, m = (0, P.useMemo)(() => ({
		points: o,
		baseLine: s
	}), [o, s]), h = aj(m, a), g = wu(), _ = fj(r.onAnimationStart, r.onAnimationEnd), v = _.isAnimating, y = _.handleAnimationStart, b = _.handleAnimationEnd, x = h.startValue;
	if (g == null) return null;
	var S = Array.isArray(s) && Array.isArray(x) ? ij(x, s, f) : Array.isArray(s) ? ij(null, s, f) : null;
	return /*#__PURE__*/ P.createElement(pj, {
		animationInput: m,
		animationIdPrefix: "recharts-area-",
		items: o,
		previousItemsRef: i,
		isAnimationActive: c,
		animationBegin: l,
		animationDuration: u,
		animationEasing: d,
		onAnimationStart: y,
		onAnimationEnd: b,
		animationInterpolateFn: p,
		animationMatchBy: f,
		layout: g
	}, (e, i, a) => {
		var c = i === 1 ? s : Array.isArray(s) ? p(S, i, g) : a ? s : MI(s, x, i);
		return h.syncStepValue(c, i), /*#__PURE__*/ P.createElement(AI, {
			showLabels: !v,
			points: o
		}, r.children, /*#__PURE__*/ P.createElement(jI, {
			points: e,
			baseLine: c,
			needClip: t,
			clipPathId: n,
			props: r,
			animationElapsedTime: i,
			isAnimating: v || i < 1,
			isEntrance: a
		}), /*#__PURE__*/ P.createElement(hk, { label: r.label }));
	});
}
function PI(e) {
	var t = e.needClip, n = e.clipPathId, r = e.props, i = (0, P.useRef)(null), a = (0, P.useRef)();
	return /*#__PURE__*/ P.createElement(NI, {
		needClip: t,
		clipPathId: n,
		props: r,
		previousPointsRef: i,
		previousBaselineRef: a
	});
}
var FI = class extends P.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.dot, r = e.points, i = e.className, a = e.top, o = e.left, s = e.needClip, c = e.xAxisId, u = e.yAxisId, d = e.width, f = e.height, p = e.id, m = e.baseLine, h = e.zIndex;
		if (t) return null;
		var g = l("recharts-area", i), _ = p, v = bF(n), y = v.r, b = v.strokeWidth, x = DA(n), S = y * 2 + b, C = s ? `url(#clipPath-${x ? "" : "dots-"}${_})` : void 0;
		return /*#__PURE__*/ P.createElement(mE, { zIndex: h }, /*#__PURE__*/ P.createElement(F, { className: g }, s && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(dF, {
			clipPathId: _,
			xAxisId: c,
			yAxisId: u
		}), !x && /*#__PURE__*/ P.createElement("clipPath", { id: `clipPath-dots-${_}` }, /*#__PURE__*/ P.createElement("rect", {
			x: o - S / 2,
			y: a - S / 2,
			width: d + S,
			height: f + S
		}))), /*#__PURE__*/ P.createElement(PI, {
			needClip: s,
			clipPathId: _,
			props: this.props
		})), /*#__PURE__*/ P.createElement(vM, {
			points: r,
			mainColor: EI(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: C
		}), this.props.isRange && Array.isArray(m) && /*#__PURE__*/ P.createElement(vM, {
			points: m,
			mainColor: EI(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: C
		}));
	}
};
function II(e) {
	var t = e.activeDot, n = e.animationBegin, r = e.animationDuration, i = e.animationEasing, a = e.connectNulls, o = e.dot, s = e.fill, c = e.fillOpacity, l = e.hide, u = e.isAnimationActive, d = e.legendType, f = e.stroke, p = e.xAxisId, m = e.yAxisId, h = vI(e, gI), g = Cu(), _ = PT(), v = uF(p, m).needClip, y = Fl(), b = V((t) => aI(t, e.id, y)) ?? {}, x = b.points, S = b.isRange, C = b.baseLine, w = uM();
	if (g !== "horizontal" && g !== "vertical" || w == null || _ !== "AreaChart" && _ !== "ComposedChart") return null;
	var T = w.height, E = w.width, D = w.x, O = w.y;
	return !x || !x.length ? null : /*#__PURE__*/ P.createElement(FI, _I({}, h, {
		activeDot: t,
		animationBegin: n,
		animationDuration: r,
		animationEasing: i,
		baseLine: C,
		connectNulls: a,
		dot: o,
		fill: s,
		fillOpacity: c,
		height: T,
		hide: l,
		layout: g,
		isAnimationActive: u,
		isRange: S,
		legendType: d,
		needClip: v,
		points: x,
		stroke: f,
		width: E,
		left: D,
		top: O,
		xAxisId: p,
		yAxisId: m
	}));
}
var LI = (e, t, n, r, i) => {
	var a = n ?? t;
	if (I(a)) return a;
	var o = e === "horizontal" ? i : r, s = o.scale.domain();
	if (o.type === "number") {
		var c = Math.max(s[0], s[1]), l = Math.min(s[0], s[1]);
		return a === "dataMin" ? l : a === "dataMax" || c < 0 ? c : Math.max(Math.min(s[0], s[1]), 0);
	}
	return a === "dataMin" ? s[0] : a === "dataMax" ? s[1] : s[0];
};
function RI(e) {
	var t = e.areaSettings, n = t.connectNulls, r = t.baseValue, i = t.dataKey, a = e.stackedData, o = e.layout, s = e.chartBaseValue, c = e.xAxis, l = e.yAxis, u = e.displayedData, d = e.dataStartIndex, f = e.xAxisTicks, p = e.yAxisTicks, m = e.bandSize, h = e.stackDataKeys, g = a && a.length, _ = LI(o, s, r, c, l), v = o === "horizontal", y = !1, b = u.map((e, t) => {
		var r;
		if (g) r = a[d + t];
		else {
			var o = K(e, i);
			Array.isArray(o) ? (r = o, y = !0) : r = [_, o];
		}
		var s = r?.[1] ?? null, u = K(e, i), b = g && u == null && h != null && h.length > 0 && h.every((t) => K(e, t) == null), x = s == null || g && !n && u == null || b;
		return v ? {
			x: tl({
				axis: c,
				ticks: f,
				bandSize: m,
				entry: e,
				index: t
			}),
			y: x ? null : l.scale.map(s) ?? null,
			value: r,
			payload: e
		} : {
			x: x ? null : c.scale.map(s) ?? null,
			y: tl({
				axis: l,
				ticks: p,
				bandSize: m,
				entry: e,
				index: t
			}),
			value: r,
			payload: e
		};
	});
	return {
		points: b,
		baseLine: (g || y ? b.map((e) => {
			var t = Array.isArray(e.value) ? e.value[0] : null;
			return v ? {
				x: e.x,
				y: t != null && e.y != null ? l.scale.map(t) ?? null : null,
				payload: e.payload
			} : {
				x: t == null ? null : c.scale.map(t) ?? null,
				y: e.y,
				payload: e.payload
			};
		}) : v ? l.scale.map(_) : c.scale.map(_)) ?? 0,
		isRange: y
	};
}
function zI(e) {
	var t = Ar(e, TI), n = Fl();
	return /*#__PURE__*/ P.createElement(Cj, {
		id: t.id,
		type: "area"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(UA, { legendPayload: DI(t) }), /*#__PURE__*/ P.createElement(OI, {
		dataKey: t.dataKey,
		data: t.data,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(Nj, {
		type: "area",
		id: e,
		data: t.data,
		dataKey: t.dataKey,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		stackId: el(t.stackId),
		hide: t.hide,
		barSize: void 0,
		baseValue: t.baseValue,
		isPanorama: n,
		connectNulls: t.connectNulls
	}), /*#__PURE__*/ P.createElement(II, _I({}, t, { id: e }))));
}
var BI = /*#__PURE__*/ P.memo(zI, td);
BI.displayName = "Area";
//#endregion
//#region node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var VI = "Invariant failed";
function HI(e, t) {
	if (!e) throw Error(VI);
}
//#endregion
//#region node_modules/recharts/es6/util/BarUtils.js
var UI = ["option"];
function WI(e, t) {
	if (e == null) return {};
	var n, r, i = GI(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function GI(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var KI = sm;
function qI(e) {
	var t = e.option, n = WI(e, UI);
	return /*#__PURE__*/ P.createElement(RA, {
		option: t,
		DefaultShape: KI,
		shapeProps: n,
		activeClassName: "recharts-active-bar",
		inActiveClassName: "recharts-inactive-bar"
	});
}
var JI = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return (n, r) => {
		if (I(e)) return e;
		var i = I(n) || R(n);
		return i ? e(n, r) : (!i && HI(!1, `minPointSize callback function received a value with type of ${typeof n}. Currently only numbers or null/undefined are supported.`), t);
	};
}, YI = (e, t, n) => n, XI = H([Jx, (e, t) => t], (e, t) => e.filter((e) => e.type === "bar").find((e) => e.id === t)), ZI = H([XI], (e) => e?.maxBarSize), QI = (e, t, n, r) => r, $I = H([
	q,
	Jx,
	JF,
	YF,
	YI
], (e, t, n, r, i) => t.filter((t) => e === "horizontal" ? t.xAxisId === n : t.yAxisId === r).filter((e) => e.isPanorama === i).filter((e) => e.hide === !1).filter((e) => e.type === "bar")), eL = (e, t, n) => {
	var r = q(e), i = JF(e, t), a = YF(e, t);
	if (i != null && a != null) return r === "horizontal" ? bS(e, "yAxis", a, n) : bS(e, "xAxis", i, n);
}, tL = H([
	$I,
	wh,
	(e, t) => {
		var n = q(e), r = JF(e, t), i = YF(e, t);
		if (r != null && i != null) return n === "horizontal" ? NC(e, "xAxis", r) : NC(e, "yAxis", i);
	}
], EM), nL = (e, t, n) => {
	var r = XI(e, t);
	if (r == null) return 0;
	var i = JF(e, t), a = YF(e, t);
	if (i == null || a == null) return 0;
	var o = q(e), s = xh(e), c = r.maxBarSize, l = R(c) ? s : c, u, d;
	return o === "horizontal" ? (u = VC(e, "xAxis", i, n), d = BC(e, "xAxis", i, n)) : (u = VC(e, "yAxis", a, n), d = BC(e, "yAxis", a, n)), ll(u, d, !0) ?? l ?? 0;
}, rL = (e, t, n) => {
	var r = q(e), i = JF(e, t), a = YF(e, t);
	if (i != null && a != null) {
		var o, s;
		return r === "horizontal" ? (o = VC(e, "xAxis", i, n), s = BC(e, "xAxis", i, n)) : (o = VC(e, "yAxis", a, n), s = BC(e, "yAxis", a, n)), ll(o, s);
	}
}, iL = H([
	jl,
	Nl,
	(e, t, n) => {
		var r = JF(e, t);
		if (r != null) return VC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = YF(e, t);
		if (r != null) return VC(e, "yAxis", r, n);
	},
	(e, t, n) => {
		var r = JF(e, t);
		if (r != null) return BC(e, "xAxis", r, n);
	},
	(e, t, n) => {
		var r = YF(e, t);
		if (r != null) return BC(e, "yAxis", r, n);
	},
	H([H([
		tL,
		xh,
		Sh,
		Ch,
		nL,
		rL,
		ZI
	], NM), XI], FM),
	q,
	Km,
	rL,
	H([eL, XI], PM),
	XI,
	QI
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = c.chartData, m = c.dataStartIndex, h = c.dataEndIndex;
	if (!(d == null || o == null || t == null || s !== "horizontal" && s !== "vertical" || n == null || r == null || i == null || a == null || l == null)) {
		var g = d.data, _ = g != null && g.length > 0 ? g : p?.slice(m, h + 1);
		if (_ != null) return qL({
			layout: s,
			barSettings: d,
			pos: o,
			parentViewBox: t,
			bandSize: l,
			xAxis: n,
			yAxis: r,
			xAxisTicks: i,
			yAxisTicks: a,
			stackedData: u,
			displayedData: _,
			offset: e,
			cells: f,
			dataStartIndex: m
		});
	}
}), aL = ["index"];
function oL() {
	return oL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, oL.apply(null, arguments);
}
function sL(e, t) {
	if (e == null) return {};
	var n, r, i = cL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function cL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var lL = /*#__PURE__*/ (0, P.createContext)(void 0), uL = (e) => {
	var t = (0, P.useContext)(lL);
	if (t != null) return t.stackId;
	if (e != null) return el(e);
}, dL = (e, t) => `recharts-bar-stack-clip-path-${e}-${t}`, fL = (e) => {
	var t = (0, P.useContext)(lL);
	if (t != null) {
		var n = t.stackId;
		return `url(#${dL(n, e)})`;
	}
}, pL = (e) => {
	var t = e.index, n = sL(e, aL), r = fL(t);
	return /*#__PURE__*/ P.createElement(F, oL({
		className: "recharts-bar-stack-layer",
		clipPath: r
	}, n));
}, mL = [
	"onMouseEnter",
	"onMouseLeave",
	"onClick"
], hL = [
	"value",
	"background",
	"tooltipPosition"
], gL = ["id"], _L = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
function vL(e, t) {
	return CL(e) || SL(e, t) || bL(e, t) || yL();
}
function yL() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function bL(e, t) {
	if (e) {
		if (typeof e == "string") return xL(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xL(e, t) : void 0;
	}
}
function xL(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function SL(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function CL(e) {
	if (Array.isArray(e)) return e;
}
function wL() {
	return wL = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, wL.apply(null, arguments);
}
function TL(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function EL(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? TL(Object(n), !0).forEach(function(t) {
			DL(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : TL(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function DL(e, t, n) {
	return (t = OL(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function OL(e) {
	var t = kL(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function kL(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function AL(e, t) {
	if (e == null) return {};
	var n, r, i = jL(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function jL(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var ML = (e) => {
	var t = e.dataKey, n = e.name, r = e.fill, i = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: i,
		color: r,
		value: dl(n, t),
		payload: e
	}];
}, NL = /*#__PURE__*/ P.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.unit, c = e.formatter, l = e.tooltipType, u = e.id, d = {
		dataDefinedOnItem: void 0,
		getPosition: Tt,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			dataKey: t,
			nameKey: void 0,
			name: dl(a, t),
			hide: o,
			type: l,
			color: i,
			unit: s,
			formatter: c,
			graphicalItemId: u
		}
	};
	return /*#__PURE__*/ P.createElement(HA, { tooltipEntrySettings: d });
});
function PL(e) {
	var t = V(uT), n = e.data, r = e.dataKey, i = e.background, a = e.allOtherBarProps, o = a.onMouseEnter, s = a.onMouseLeave, c = a.onClick, l = AL(a, mL), u = zA(o, r, a.id), d = BA(s), f = VA(c, r, a.id);
	if (!i || n == null) return null;
	var p = He(i);
	return /*#__PURE__*/ P.createElement(mE, { zIndex: IM(i, Y.barBackground) }, n.map((e, n) => {
		e.value;
		var a = e.background;
		e.tooltipPosition;
		var o = AL(e, hL);
		if (!a) return null;
		var s = u(e, e.originalDataIndex), c = d(e, e.originalDataIndex), m = f(e, e.originalDataIndex), h = EL(EL(EL(EL(EL({
			option: i,
			isActive: String(e.originalDataIndex) === t
		}, o), {}, { fill: "#eee" }, a), p), wr(l, e, n)), {}, {
			onMouseEnter: s,
			onMouseLeave: c,
			onClick: m,
			dataKey: r,
			index: n,
			className: "recharts-bar-background-rectangle"
		});
		return /*#__PURE__*/ P.createElement(qI, wL({ key: `background-bar-${n}` }, h));
	}));
}
function FL(e) {
	var t = e.showLabels, n = e.children, r = e.rects?.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: e.width,
			lowerWidth: e.width,
			upperWidth: e.width,
			height: e.height
		};
		return EL(EL({}, t), {}, {
			value: e.value,
			payload: e.payload,
			parentViewBox: e.parentViewBox,
			viewBox: t,
			fill: e.fill
		});
	});
	return /*#__PURE__*/ P.createElement(lk, { value: t ? r : void 0 }, n);
}
function IL(e) {
	var t = e.shape, n = e.activeBar, r = e.baseProps, i = e.entry, a = e.index, o = e.dataKey, s = V(uT), c = V(fT), l = n && String(i.originalDataIndex) === s && (c == null || o === c), u = s != null && (String(i.originalDataIndex) !== s || c != null && o !== c), d = vL((0, P.useState)(!1), 2), f = d[0], p = d[1], m = vL((0, P.useState)(!1), 2), h = m[0], g = m[1];
	(0, P.useEffect)(() => {
		var e;
		return l ? (p(!0), e = requestAnimationFrame(() => {
			g(!0);
		})) : (g(!1), u && p(!1)), () => {
			cancelAnimationFrame(e);
		};
	}, [l, u]);
	var _ = (0, P.useCallback)(() => {
		l || p(!1);
	}, [l]), v = l && h, y = l || f, b = l ? n === !0 ? t : n : t, x = /*#__PURE__*/ P.createElement(qI, wL({}, r, { name: String(r.name) }, i, {
		isActive: v,
		option: b,
		index: a,
		dataKey: o,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance,
		onTransitionEnd: _
	}));
	return y ? /*#__PURE__*/ P.createElement(mE, { zIndex: Y.activeBar }, /*#__PURE__*/ P.createElement(pL, { index: i.originalDataIndex }, x)) : x;
}
function LL(e) {
	var t = e.shape, n = e.baseProps, r = e.entry, i = e.index, a = e.dataKey;
	return /*#__PURE__*/ P.createElement(qI, wL({}, n, { name: String(n.name) }, r, {
		isActive: !1,
		option: t,
		index: i,
		dataKey: a,
		animationElapsedTime: e.animationElapsedTime,
		isAnimating: e.isAnimating,
		isEntrance: e.isEntrance
	}));
}
function RL(e) {
	var t = e.data, n = e.props, r = e.animationElapsedTime, i = e.isAnimating, a = e.isEntrance, o = Ve(n) ?? {}, s = o.id, c = AL(o, gL), l = n.shape, u = n.dataKey, d = n.activeBar, f = n.onMouseEnter, p = n.onClick, m = n.onMouseLeave, h = AL(n, _L), g = zA(f, u, s), _ = BA(m), v = VA(p, u, s);
	return t ? /*#__PURE__*/ P.createElement(P.Fragment, null, t.map((e, t) => /*#__PURE__*/ P.createElement(pL, wL({
		index: e.originalDataIndex,
		key: `rectangle-${e?.x}-${e?.y}-${e?.value}-${t}`,
		className: "recharts-bar-rectangle"
	}, wr(h, e, t), {
		onMouseEnter: g(e, e.originalDataIndex),
		onMouseLeave: _(e, e.originalDataIndex),
		onClick: v(e, e.originalDataIndex)
	}), d ? /*#__PURE__*/ P.createElement(IL, {
		shape: l,
		activeBar: d,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	}) : /*#__PURE__*/ P.createElement(LL, {
		shape: l,
		baseProps: c,
		entry: e,
		index: t,
		dataKey: u,
		animationElapsedTime: r,
		isAnimating: i,
		isEntrance: a
	})))) : null;
}
var zL = (e, t, n) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => {
	if (e.status === "removed") return n === "horizontal" ? [EL(EL({}, e.prev), {}, {
		height: L(e.prev.height, 0, t),
		y: L(e.prev.y, e.prev.y + e.prev.height, t)
	})] : [EL(EL({}, e.prev), {}, { width: L(e.prev.width, 0, t) })];
	if (e.status === "matched") return [EL(EL({}, e.next), {}, {
		x: L(e.prev.x, e.next.x, t),
		y: L(e.prev.y, e.next.y, t),
		width: L(e.prev.width, e.next.width, t),
		height: L(e.prev.height, e.next.height, t)
	})];
	var r = e.next;
	return n === "horizontal" ? [EL(EL({}, r), {}, {
		height: L(0, r.height, t),
		y: L(r.stackedBarStart, r.y, t)
	})] : [EL(EL({}, r), {}, {
		width: L(0, r.width, t),
		x: L(r.stackedBarStart, r.x, t)
	})];
});
function BL(e) {
	var t = e.props, n = e.previousRectanglesRef, r = t.data, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, s = t.animationEasing, c = t.animationInterpolateFn, l = t.layout, u = fj(t.onAnimationStart, t.onAnimationEnd), d = u.isAnimating, f = u.handleAnimationStart, p = u.handleAnimationEnd;
	return /*#__PURE__*/ P.createElement(FL, {
		showLabels: !d,
		rects: r
	}, /*#__PURE__*/ P.createElement(pj, {
		animationInput: r,
		animationIdPrefix: "recharts-bar-",
		items: r,
		previousItemsRef: n,
		isAnimationActive: i,
		animationBegin: a,
		animationDuration: o,
		animationEasing: s,
		onAnimationStart: f,
		onAnimationEnd: p,
		animationInterpolateFn: c,
		animationMatchBy: t.animationMatchBy,
		layout: l
	}, (e, n, r) => /*#__PURE__*/ P.createElement(F, null, /*#__PURE__*/ P.createElement(RL, {
		props: t,
		data: e,
		animationElapsedTime: n,
		isAnimating: d || n < 1,
		isEntrance: r
	}))), /*#__PURE__*/ P.createElement(hk, { label: t.label }), t.children);
}
function VL(e) {
	var t = (0, P.useRef)(null);
	return /*#__PURE__*/ P.createElement(BL, {
		previousRectanglesRef: t,
		props: e
	});
}
var HL = 0, UL = (e, t) => {
	var n = Array.isArray(e.value) ? e.value[1] : e.value;
	return {
		x: e.x,
		y: e.y,
		value: n,
		errorVal: K(e, t)
	};
}, WL = class extends P.PureComponent {
	render() {
		var e = this.props, t = e.hide, n = e.data, r = e.dataKey, i = e.className, a = e.xAxisId, o = e.yAxisId, s = e.needClip, c = e.background, u = e.id;
		if (t || n == null) return null;
		var d = l("recharts-bar", i), f = u;
		return /*#__PURE__*/ P.createElement(F, {
			className: d,
			id: u
		}, s && /*#__PURE__*/ P.createElement("defs", null, /*#__PURE__*/ P.createElement(dF, {
			clipPathId: f,
			xAxisId: a,
			yAxisId: o
		})), /*#__PURE__*/ P.createElement(F, {
			className: "recharts-bar-rectangles",
			clipPath: s ? `url(#clipPath-${f})` : void 0
		}, /*#__PURE__*/ P.createElement(PL, {
			data: n,
			dataKey: r,
			background: c,
			allOtherBarProps: this.props
		}), /*#__PURE__*/ P.createElement(VL, this.props)));
	}
}, GL = {
	activeBar: !1,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
	animationInterpolateFn: zL,
	animationMatchBy: QA,
	background: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: HL,
	shape: KI,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: Y.bar
};
function KL(e) {
	var t = e.xAxisId, n = e.yAxisId, r = e.hide, i = e.legendType, a = e.minPointSize, o = e.activeBar, s = e.animationBegin, c = e.animationDuration, l = e.animationEasing, u = e.isAnimationActive, d = uF(t, n).needClip, f = Cu(), p = Fl(), m = EA(e.children, mD), h = V((t) => iL(t, e.id, p, m));
	if (f !== "vertical" && f !== "horizontal") return null;
	var g, _ = h?.[0];
	return g = _ == null || _.height == null || _.width == null ? 0 : f === "vertical" ? _.height / 2 : _.width / 2, /*#__PURE__*/ P.createElement(lF, {
		xAxisId: t,
		yAxisId: n,
		data: h,
		dataPointFormatter: UL,
		errorBarOffset: g
	}, /*#__PURE__*/ P.createElement(WL, wL({}, e, {
		layout: f,
		needClip: d,
		data: h,
		xAxisId: t,
		yAxisId: n,
		hide: r,
		legendType: i,
		minPointSize: a,
		activeBar: o,
		animationBegin: s,
		animationDuration: c,
		animationEasing: l,
		isAnimationActive: u
	})));
}
function qL(e) {
	var t = e.layout, n = e.barSettings, r = n.dataKey, i = n.minPointSize, a = n.hasCustomShape, o = e.pos, s = e.bandSize, c = e.xAxis, l = e.yAxis, u = e.xAxisTicks, d = e.yAxisTicks, f = e.stackedData, p = e.displayedData, m = e.offset, h = e.cells, g = e.parentViewBox, _ = e.dataStartIndex, v = t === "horizontal" ? l : c, y = f ? v.scale.domain() : null, b = rl({ numericAxis: v }), x = v.scale.map(b);
	return p.map((e, n) => {
		var p, v, S, C, w, T;
		if (f) {
			var E = f[n + _];
			if (E == null) return null;
			p = Zc(E, y);
		} else p = K(e, r), Array.isArray(p) || (p = [b, p]);
		var D = JI(i, HL)(p[1], n);
		if (t === "horizontal") {
			var O = l.scale.map(p[0]), k = l.scale.map(p[1]);
			if (O == null || k == null) return null;
			v = nl({
				axis: c,
				ticks: u,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), S = k ?? O ?? void 0, C = o.size;
			var A = O - k;
			if (w = ht(A) ? 0 : A, T = {
				x: v,
				y: m.top,
				width: C,
				height: m.height
			}, Math.abs(D) > 0 && Math.abs(w) < Math.abs(D)) {
				var j = mt(w || D) * (Math.abs(D) - Math.abs(w));
				S -= j, w += j;
			}
		} else {
			var M = c.scale.map(p[0]), N = c.scale.map(p[1]);
			if (M == null || N == null) return null;
			if (v = M, S = nl({
				axis: l,
				ticks: d,
				bandSize: s,
				offset: o.offset,
				entry: e,
				index: n
			}), C = N - M, w = o.size, T = {
				x: m.left,
				y: S,
				width: m.width,
				height: w
			}, Math.abs(D) > 0 && Math.abs(C) < Math.abs(D)) {
				var ee = mt(C || D) * (Math.abs(D) - Math.abs(C));
				C += ee;
			}
		}
		return v == null || S == null || C == null || w == null || !a && (C === 0 || w === 0) ? null : EL(EL({}, e), {}, {
			stackedBarStart: x,
			x: v,
			y: S,
			width: C,
			height: w,
			value: f ? p : p[1],
			payload: e,
			background: T,
			tooltipPosition: {
				x: v + C / 2,
				y: S + w / 2
			},
			parentViewBox: g,
			originalDataIndex: n
		}, h && h[n] && h[n].props);
	}).filter(Boolean);
}
function JL(e) {
	var t = Ar(e, GL), n = uL(t.stackId), r = Fl();
	return /*#__PURE__*/ P.createElement(Cj, {
		id: t.id,
		type: "bar"
	}, (e) => /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(UA, { legendPayload: ML(t) }), /*#__PURE__*/ P.createElement(NL, {
		dataKey: t.dataKey,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		unit: t.unit,
		formatter: t.formatter,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ P.createElement(Nj, {
		type: "bar",
		id: e,
		data: void 0,
		xAxisId: t.xAxisId,
		yAxisId: t.yAxisId,
		zAxisId: 0,
		dataKey: t.dataKey,
		stackId: n,
		hide: t.hide,
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize,
		isPanorama: r,
		hasCustomShape: t.shape != null && t.shape !== KI
	}), /*#__PURE__*/ P.createElement(mE, { zIndex: t.zIndex }, /*#__PURE__*/ P.createElement(KL, wL({}, t, { id: e })))));
}
var YL = /*#__PURE__*/ P.memo(JL, td);
YL.displayName = "Bar";
//#endregion
//#region node_modules/recharts/es6/util/axisPropsAreEqual.js
var XL = ["domain", "range"], ZL = ["domain", "range"];
function QL(e, t) {
	if (e == null) return {};
	var n, r, i = $L(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function $L(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function eR(e, t) {
	return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function tR(e, t) {
	if (e === t) return !0;
	var n = e.domain, r = e.range, i = QL(e, XL), a = t.domain, o = t.range, s = QL(t, ZL);
	return !eR(n, a) || !eR(r, o) ? !1 : td(i, s);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/XAxis.js
var nR = ["type"], rR = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], iR = ["id", "scale"];
function aR() {
	return aR = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, aR.apply(null, arguments);
}
function oR(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function sR(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? oR(Object(n), !0).forEach(function(t) {
			cR(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : oR(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function cR(e, t, n) {
	return (t = lR(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lR(e) {
	var t = uR(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function uR(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function dR(e, t) {
	if (e == null) return {};
	var n, r, i = fR(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function fR(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function pR(e) {
	var t = B(), n = (0, P.useRef)(null), r = wu(), i = e.type, a = dR(e, nR), o = Fh(r, "xAxis", i), s = (0, P.useMemo)(() => {
		if (o != null) return sR(sR({}, a), {}, { type: o });
	}, [a, o]);
	return (0, P.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(eM(s)) : n.current !== s && t(tM({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(nM(n.current)), null);
	}, [t]), null;
}
var mR = (e) => {
	var t = e.xAxisId, n = e.className, r = e.height, i = e.label, a = (0, P.useRef)(null), o = (0, P.useRef)(null), s = V(Nl), c = Fl(), u = B(), d = "xAxis", f = V((e) => RC(e, d, t, c)), p = V((e) => TC(e, t)), m = V((e) => AC(e, t)), h = V((e) => Lx(e, t));
	if ((0, P.useLayoutEffect)(() => {
		if (!(r !== "auto" || !p || GO(i) || /*#__PURE__*/ (0, P.isValidElement)(i) || h == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedHeight();
				Math.round(p.height) !== Math.round(n) && u(sM({
					id: t,
					height: n
				}));
			}
		}
	}, [
		f,
		p,
		u,
		i,
		t,
		r,
		h
	]), p == null || m == null || h == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var g = dR(e, rR);
	h.id, h.scale;
	var _ = dR(h, iR);
	return /*#__PURE__*/ P.createElement(yP, aR({}, g, _, {
		ref: a,
		labelRef: o,
		x: m.x,
		y: m.y,
		width: p.width,
		height: p.height,
		className: l(`recharts-${d} ${d}`, n),
		viewBox: s,
		ticks: f,
		axisType: d,
		axisId: t
	}));
}, hR = {
	allowDataOverflow: Ix.allowDataOverflow,
	allowDecimals: Ix.allowDecimals,
	allowDuplicatedCategory: Ix.allowDuplicatedCategory,
	angle: Ix.angle,
	axisLine: uP.axisLine,
	height: Ix.height,
	hide: !1,
	includeHidden: Ix.includeHidden,
	interval: Ix.interval,
	label: !1,
	minTickGap: Ix.minTickGap,
	mirror: Ix.mirror,
	orientation: Ix.orientation,
	padding: Ix.padding,
	reversed: Ix.reversed,
	scale: Ix.scale,
	tick: Ix.tick,
	tickCount: Ix.tickCount,
	tickLine: uP.tickLine,
	tickSize: uP.tickSize,
	type: Ix.type,
	niceTicks: Ix.niceTicks,
	xAxisId: 0
}, gR = /*#__PURE__*/ P.memo((e) => {
	var t = Ar(e, hR);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(pR, {
		allowDataOverflow: t.allowDataOverflow,
		allowDecimals: t.allowDecimals,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		angle: t.angle,
		dataKey: t.dataKey,
		domain: t.domain,
		height: t.height,
		hide: t.hide,
		id: t.xAxisId,
		includeHidden: t.includeHidden,
		interval: t.interval,
		minTickGap: t.minTickGap,
		mirror: t.mirror,
		name: t.name,
		orientation: t.orientation,
		padding: t.padding,
		reversed: t.reversed,
		scale: t.scale,
		tick: t.tick,
		tickCount: t.tickCount,
		tickFormatter: t.tickFormatter,
		ticks: t.ticks,
		type: t.type,
		unit: t.unit,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ P.createElement(mR, t));
}, tR);
gR.displayName = "XAxis";
//#endregion
//#region node_modules/recharts/es6/cartesian/YAxis.js
var _R = ["type"], vR = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], yR = ["id", "scale"];
function bR() {
	return bR = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, bR.apply(null, arguments);
}
function xR(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function SR(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? xR(Object(n), !0).forEach(function(t) {
			CR(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xR(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function CR(e, t, n) {
	return (t = wR(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wR(e) {
	var t = TR(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function TR(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ER(e, t) {
	if (e == null) return {};
	var n, r, i = DR(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function DR(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function OR(e) {
	var t = B(), n = (0, P.useRef)(null), r = wu(), i = e.type, a = ER(e, _R), o = Fh(r, "yAxis", i), s = (0, P.useMemo)(() => {
		if (o != null) return SR(SR({}, a), {}, { type: o });
	}, [o, a]);
	return (0, P.useLayoutEffect)(() => {
		s != null && (n.current === null ? t(rM(s)) : n.current !== s && t(iM({
			prev: n.current,
			next: s
		})), n.current = s);
	}, [s, t]), (0, P.useLayoutEffect)(() => () => {
		n.current &&= (t(aM(n.current)), null);
	}, [t]), null;
}
function kR(e) {
	var t = e.yAxisId, n = e.className, r = e.width, i = e.label, a = (0, P.useRef)(null), o = (0, P.useRef)(null), s = V(Nl), c = Fl(), u = B(), d = "yAxis", f = V((e) => MC(e, t)), p = V((e) => jC(e, t)), m = V((e) => RC(e, d, t, c)), h = V((e) => Bx(e, t));
	if ((0, P.useLayoutEffect)(() => {
		if (!(r !== "auto" || !f || GO(i) || /*#__PURE__*/ (0, P.isValidElement)(i) || h == null)) {
			var e = a.current;
			if (e) {
				var n = e.getCalculatedWidth();
				Math.round(f.width) !== Math.round(n) && u(oM({
					id: t,
					width: n
				}));
			}
		}
	}, [
		m,
		f,
		u,
		i,
		t,
		r,
		h
	]), f == null || p == null || h == null) return null;
	e.dangerouslySetInnerHTML, e.ticks, e.scale;
	var g = ER(e, vR);
	h.id, h.scale;
	var _ = ER(h, yR);
	return /*#__PURE__*/ P.createElement(yP, bR({}, g, _, {
		ref: a,
		labelRef: o,
		x: p.x,
		y: p.y,
		tickTextProps: r === "auto" ? { width: void 0 } : { width: r },
		width: f.width,
		height: f.height,
		className: l(`recharts-${d} ${d}`, n),
		viewBox: s,
		ticks: m,
		axisType: d,
		axisId: t
	}));
}
var AR = {
	allowDataOverflow: zx.allowDataOverflow,
	allowDecimals: zx.allowDecimals,
	allowDuplicatedCategory: zx.allowDuplicatedCategory,
	angle: zx.angle,
	axisLine: uP.axisLine,
	hide: !1,
	includeHidden: zx.includeHidden,
	interval: zx.interval,
	label: !1,
	minTickGap: zx.minTickGap,
	mirror: zx.mirror,
	orientation: zx.orientation,
	padding: zx.padding,
	reversed: zx.reversed,
	scale: zx.scale,
	tick: zx.tick,
	tickCount: zx.tickCount,
	tickLine: uP.tickLine,
	tickSize: uP.tickSize,
	type: zx.type,
	niceTicks: zx.niceTicks,
	width: zx.width,
	yAxisId: 0
}, jR = /*#__PURE__*/ P.memo((e) => {
	var t = Ar(e, AR);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(OR, {
		interval: t.interval,
		id: t.yAxisId,
		scale: t.scale,
		type: t.type,
		domain: t.domain,
		allowDataOverflow: t.allowDataOverflow,
		dataKey: t.dataKey,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		allowDecimals: t.allowDecimals,
		tickCount: t.tickCount,
		padding: t.padding,
		includeHidden: t.includeHidden,
		reversed: t.reversed,
		ticks: t.ticks,
		width: t.width,
		orientation: t.orientation,
		mirror: t.mirror,
		hide: t.hide,
		unit: t.unit,
		name: t.name,
		angle: t.angle,
		minTickGap: t.minTickGap,
		tick: t.tick,
		tickFormatter: t.tickFormatter,
		niceTicks: t.niceTicks
	}), /*#__PURE__*/ P.createElement(kR, t));
}, tR);
jR.displayName = "YAxis";
var MR = H([
	(e, t) => t,
	q,
	$h,
	sg,
	rT,
	aT,
	RT,
	jl
], XT);
//#endregion
//#region node_modules/recharts/es6/util/getRelativeCoordinate.js
function NR(e) {
	return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function PR(e) {
	var t = e.currentTarget.getBoundingClientRect(), n, r;
	if (NR(e)) {
		var i = e.currentTarget.getBBox();
		n = i.width > 0 ? t.width / i.width : 1, r = i.height > 0 ? t.height / i.height : 1;
	} else {
		var a = e.currentTarget;
		n = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, r = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
	}
	var o = (e, i) => ({
		relativeX: Math.round((e - t.left) / n),
		relativeY: Math.round((i - t.top) / r)
	});
	return "touches" in e ? Array.from(e.touches).map((e) => o(e.clientX, e.clientY)) : o(e.clientX, e.clientY);
}
//#endregion
//#region node_modules/recharts/es6/state/mouseEventsMiddleware.js
var FR = ws("mouseClick"), IR = jc();
IR.startListening({
	actionCreator: FR,
	effect: (e, t) => {
		var n = e.payload, r = MR(t.getState(), PR(n));
		r?.activeIndex != null && t.dispatch(cw({
			activeIndex: r.activeIndex,
			activeDataKey: void 0,
			activeCoordinate: r.activeCoordinate
		}));
	}
});
var LR = ws("mouseMove"), RR = jc(), zR = null, BR = null, VR = null;
RR.startListening({
	actionCreator: LR,
	effect: (e, t) => {
		var n = e.payload, r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a?.includes("mousemove");
		zR !== null && (cancelAnimationFrame(zR), zR = null), BR !== null && (typeof i != "number" || !o) && (clearTimeout(BR), BR = null), VR = PR(n);
		var s = () => {
			var e = t.getState(), n = KC(e, e.tooltip.settings.shared);
			if (!VR) zR = null, BR = null;
			else {
				if (n === "axis") {
					var r = MR(e, VR);
					r?.activeIndex == null ? t.dispatch(aw()) : t.dispatch(sw({
						activeIndex: r.activeIndex,
						activeDataKey: void 0,
						activeCoordinate: r.activeCoordinate
					}));
				}
				zR = null, BR = null;
			}
		};
		o ? i === "raf" ? zR = requestAnimationFrame(s) : typeof i == "number" && BR === null && (BR = setTimeout(s, i)) : s();
	}
});
//#endregion
//#region node_modules/recharts/es6/state/reduxDevtoolsJsonStringifyReplacer.js
function HR(e, t) {
	return t instanceof HTMLElement ? `HTMLElement <${t.tagName} class="${t.className}">` : t === window ? "global.window" : e === "children" && typeof t == "object" && t ? "<<CHILDREN>>" : t;
}
//#endregion
//#region node_modules/recharts/es6/state/rootPropsSlice.js
var UR = {
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	barSize: void 0,
	className: void 0,
	maxBarSize: void 0,
	stackOffset: "none",
	syncId: void 0,
	syncMethod: "index",
	baseValue: void 0,
	reverseStackOrder: !1
}, WR = Gs({
	name: "rootProps",
	initialState: UR,
	reducers: { updateOptions: (e, t) => {
		e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = t.payload.barGap ?? UR.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
	} }
}), GR = WR.reducer, KR = WR.actions.updateOptions, qR = Gs({
	name: "polarOptions",
	initialState: null,
	reducers: { updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e) }
}), JR = qR.actions.updatePolarOptions, YR = qR.reducer, XR = ws("keyDown"), ZR = ws("focus"), QR = ws("blur"), $R = jc(), ez = null, tz = null, nz = null;
$R.startListening({
	actionCreator: XR,
	effect: (e, t) => {
		nz = e.payload, ez !== null && (cancelAnimationFrame(ez), ez = null);
		var n = t.getState().eventSettings, r = n.throttleDelay, i = n.throttledEvents, a = i === "all" || i.includes("keydown");
		tz !== null && (typeof r != "number" || !a) && (clearTimeout(tz), tz = null);
		var o = () => {
			try {
				var e = t.getState();
				if (e.rootProps.accessibilityLayer === !1) return;
				var n = e.tooltip.keyboardInteraction, r = nz;
				if (r !== "ArrowRight" && r !== "ArrowLeft" && r !== "Enter") return;
				var i = Cw(n, Gw(e), _S(e), eT(e)), a = i == null ? -1 : Number(i), o = !Number.isFinite(a) || a < 0, s = aT(e), c = Gw(e), l = KC(e, e.tooltip.settings.shared);
				if (r === "Enter") {
					if (o) return;
					var u = UT(e, l, "hover", String(n.index));
					t.dispatch(uw({
						active: !n.active,
						activeIndex: n.index,
						activeCoordinate: u
					}));
					return;
				}
				var d = HC(e) === "left-to-right" ? 1 : -1, f = r === "ArrowRight" ? 1 : -1, p;
				if (o) {
					var m = _S(e), h = eT(e), g = f * d, _ = (e) => ({
						active: !1,
						index: String(e),
						dataKey: void 0,
						graphicalItemId: void 0,
						coordinate: void 0
					});
					if (p = -1, g > 0) {
						for (var v = 0; v < c.length; v++) if (Cw(_(v), c, m, h) != null) {
							p = v;
							break;
						}
					} else for (var y = c.length - 1; y >= 0; y--) if (Cw(_(y), c, m, h) != null) {
						p = y;
						break;
					}
					if (p < 0) return;
				} else {
					p = a + f * d;
					var b = s?.length || c.length;
					if (b === 0 || p >= b || p < 0) return;
				}
				var x = UT(e, l, "hover", String(p));
				t.dispatch(uw({
					active: !0,
					activeIndex: p.toString(),
					activeCoordinate: x
				}));
			} finally {
				ez = null, tz = null;
			}
		};
		a ? r === "raf" ? ez = requestAnimationFrame(o) : typeof r == "number" && tz === null && (o(), nz = null, tz = setTimeout(() => {
			nz ? o() : (tz = null, ez = null);
		}, r)) : o();
	}
}), $R.startListening({
	actionCreator: ZR,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			if (!r.active && r.index == null) {
				var i = "0", a = UT(n, KC(n, n.tooltip.settings.shared), "hover", String(i));
				t.dispatch(uw({
					active: !0,
					activeIndex: i,
					activeCoordinate: a
				}));
			}
		}
	}
}), $R.startListening({
	actionCreator: QR,
	effect: (e, t) => {
		var n = t.getState();
		if (n.rootProps.accessibilityLayer !== !1) {
			var r = n.tooltip.keyboardInteraction;
			r.active && t.dispatch(uw({
				active: !1,
				activeIndex: r.index,
				activeCoordinate: r.coordinate
			}));
		}
	}
});
//#endregion
//#region node_modules/recharts/es6/util/createEventProxy.js
function rz(e) {
	e.persist();
	var t = e.currentTarget;
	return new Proxy(e, { get: (e, n) => {
		if (n === "currentTarget") return t;
		var r = Reflect.get(e, n);
		return typeof r == "function" ? r.bind(e) : r;
	} });
}
//#endregion
//#region node_modules/recharts/es6/state/externalEventsMiddleware.js
var iz = ws("externalEvent"), az = jc(), oz = /* @__PURE__ */ new Map(), sz = /* @__PURE__ */ new Map(), cz = /* @__PURE__ */ new Map();
az.startListening({
	actionCreator: iz,
	effect: (e, t) => {
		var n = e.payload, r = n.handler, i = n.reactEvent;
		if (r != null) {
			var a = i.type, o = rz(i);
			cz.set(a, {
				handler: r,
				reactEvent: o
			});
			var s = oz.get(a);
			s !== void 0 && (cancelAnimationFrame(s), oz.delete(a));
			var c = t.getState().eventSettings, l = c.throttleDelay, u = c.throttledEvents, d = u === "all" || u?.includes(a), f = sz.get(a);
			f !== void 0 && (typeof l != "number" || !d) && (clearTimeout(f), sz.delete(a));
			var p = () => {
				var e = cz.get(a);
				try {
					if (!e) return;
					var n = e.handler, r = e.reactEvent, i = t.getState(), o = {
						activeCoordinate: hT(i),
						activeDataKey: fT(i),
						activeIndex: uT(i),
						activeLabel: dT(i),
						activeTooltipIndex: uT(i),
						isTooltipActive: gT(i)
					};
					n && n(o, r);
				} finally {
					oz.delete(a), sz.delete(a), cz.delete(a);
				}
			};
			if (!d) p();
			else if (l === "raf") {
				var m = requestAnimationFrame(p);
				oz.set(a, m);
			} else if (typeof l == "number") {
				if (!sz.has(a)) {
					p();
					var h = setTimeout(p, l);
					sz.set(a, h);
				}
			} else p();
		}
	}
});
var lz = H([
	H([Dw], (e) => e.tooltipItemPayloads),
	(e, t) => t,
	(e, t, n) => n
], (e, t, n) => {
	if (t != null) {
		var r = e.find((e) => e.settings.graphicalItemId === n);
		if (r != null) {
			var i = r.getPosition;
			if (i != null) return i(t);
		}
	}
}), uz = ws("touchMove"), dz = jc(), fz = null, pz = null, mz = null, hz = null;
dz.startListening({
	actionCreator: uz,
	effect: (e, t) => {
		var n = e.payload;
		if (n.touches != null && n.touches.length !== 0) {
			hz = rz(n);
			var r = t.getState().eventSettings, i = r.throttleDelay, a = r.throttledEvents, o = a === "all" || a.includes("touchmove");
			fz !== null && (cancelAnimationFrame(fz), fz = null), pz !== null && (typeof i != "number" || !o) && (clearTimeout(pz), pz = null), mz = Array.from(n.touches).map((e) => PR({
				clientX: e.clientX,
				clientY: e.clientY,
				currentTarget: n.currentTarget
			}));
			var s = () => {
				if (hz != null) {
					var e = t.getState(), n = KC(e, e.tooltip.settings.shared);
					if (n === "axis") {
						var r = mz?.[0];
						if (r == null) {
							fz = null, pz = null;
							return;
						}
						var i = MR(e, r);
						i?.activeIndex != null && t.dispatch(sw({
							activeIndex: i.activeIndex,
							activeDataKey: void 0,
							activeCoordinate: i.activeCoordinate
						}));
					} else if (n === "item") {
						var a = hz.touches[0];
						if (document.elementFromPoint == null || a == null) return;
						var o = document.elementFromPoint(a.clientX, a.clientY);
						if (!o || !o.getAttribute) return;
						var s = o.getAttribute(bl), c = o.getAttribute("data-recharts-item-id") ?? void 0, l = Vw(e).find((e) => e.id === c);
						if (s == null || l == null || c == null) return;
						var u = l.dataKey, d = lz(e, s, c);
						t.dispatch(rw({
							activeDataKey: u,
							activeIndex: s,
							activeCoordinate: d,
							activeGraphicalItemId: c
						}));
					}
					fz = null, pz = null;
				}
			};
			o ? i === "raf" ? fz = requestAnimationFrame(s) : typeof i == "number" && pz === null && (s(), hz = null, pz = setTimeout(() => {
				hz ? s() : (pz = null, fz = null);
			}, i)) : s();
		}
	}
});
//#endregion
//#region node_modules/recharts/es6/state/eventSettingsSlice.js
var gz = {
	throttleDelay: "raf",
	throttledEvents: [
		"mousemove",
		"touchmove",
		"pointermove",
		"scroll",
		"wheel"
	]
}, _z = Gs({
	name: "eventSettings",
	initialState: gz,
	reducers: { setEventSettings: (e, t) => {
		t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = U(t.payload.throttledEvents));
	} }
}), vz = _z.actions.setEventSettings, yz = _z.reducer, bz = qa({
	brush: BM,
	cartesianAxis: cM,
	chartData: zE,
	errorBars: iF,
	eventSettings: yz,
	graphicalItems: Mj,
	layout: zc,
	legend: Iu,
	options: ME,
	polarAxis: Xk,
	polarOptions: YR,
	referenceElements: YM,
	renderedTicks: JN,
	rootProps: GR,
	tooltip: dw,
	zIndex: pE
}), xz = function(e) {
	var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
	return Fs({
		reducer: bz,
		preloadedState: e,
		middleware: (e) => e({
			serializableCheck: !1,
			immutableCheck: ![
				"commonjs",
				"es6",
				"production"
			].includes("es6")
		}).concat([
			IR.middleware,
			RR.middleware,
			$R.middleware,
			az.middleware,
			dz.middleware
		]),
		enhancers: (e) => {
			var t = e;
			return typeof e == "function" && (t = e()), t.concat(Ns({ type: "raf" }));
		},
		devTools: $d.devToolsEnabled && {
			serialize: { replacer: HR },
			name: `recharts-${t}`
		}
	});
};
//#endregion
//#region node_modules/recharts/es6/state/RechartsStoreProvider.js
function Sz(e) {
	var t = e.preloadedState, n = e.children, r = e.reduxStoreName, i = Fl(), a = (0, P.useRef)(null);
	if (i) return n;
	a.current ??= xz(t, r);
	var o = $i;
	return /*#__PURE__*/ P.createElement(Qu, {
		context: o,
		store: a.current
	}, n);
}
//#endregion
//#region node_modules/recharts/es6/state/ReportMainChartProps.js
function Cz(e) {
	var t = e.layout, n = e.margin, r = B(), i = Fl();
	return (0, P.useEffect)(() => {
		i || (r(Ic(t)), r(Fc(n)));
	}, [
		r,
		i,
		t,
		n
	]), null;
}
var wz = /*#__PURE__*/ (0, P.memo)(Cz, td);
//#endregion
//#region node_modules/recharts/es6/state/ReportChartProps.js
function Tz(e) {
	var t = B();
	return (0, P.useEffect)(() => {
		t(KR(e));
	}, [t, e]), null;
}
var Ez = /*#__PURE__*/ (0, P.memo)((e) => {
	var t = B();
	return (0, P.useEffect)(() => {
		t(vz(e));
	}, [t, e]), null;
}, td);
//#endregion
//#region node_modules/recharts/es6/zIndex/ZIndexPortal.js
function Dz(e) {
	var t = e.zIndex, n = e.isPanorama, r = (0, P.useRef)(null), i = B();
	return (0, P.useLayoutEffect)(() => (r.current && i(dE({
		zIndex: t,
		element: r.current,
		isPanorama: n
	})), () => {
		i(fE({
			zIndex: t,
			isPanorama: n
		}));
	}), [
		i,
		t,
		n
	]), /*#__PURE__*/ P.createElement("g", {
		tabIndex: -1,
		ref: r,
		className: `recharts-zIndex-layer_${t}`
	});
}
function Oz(e) {
	var t = e.children, n = e.isPanorama, r = V(QT);
	if (!r || r.length === 0) return t;
	var i = r.filter((e) => e < 0), a = r.filter((e) => e > 0);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, i.map((e) => /*#__PURE__*/ P.createElement(Dz, {
		key: e,
		zIndex: e,
		isPanorama: n
	})), t, a.map((e) => /*#__PURE__*/ P.createElement(Dz, {
		key: e,
		zIndex: e,
		isPanorama: n
	})));
}
//#endregion
//#region node_modules/recharts/es6/container/RootSurface.js
var kz = ["children"];
function Az(e, t) {
	if (e == null) return {};
	var n, r, i = jz(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function jz(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Mz() {
	return Mz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Mz.apply(null, arguments);
}
var Nz = {
	width: "100%",
	height: "100%",
	display: "block"
}, Pz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = bu(), r = xu(), i = Sf();
	if (!Vc(n) || !Vc(r)) return null;
	var a = e.children, o = e.otherAttributes, s = e.title, c = e.desc, l, u;
	return o != null && (l = typeof o.tabIndex == "number" ? o.tabIndex : i ? 0 : void 0, u = typeof o.role == "string" ? o.role : i ? "application" : void 0), /*#__PURE__*/ P.createElement(Ye, Mz({}, o, {
		title: s,
		desc: c,
		role: u,
		tabIndex: l,
		width: n,
		height: r,
		style: Nz,
		ref: t
	}), a);
}), Fz = (e) => {
	var t = e.children, n = V(Ll);
	if (!n) return null;
	var r = n.width, i = n.height, a = n.y, o = n.x;
	return /*#__PURE__*/ P.createElement(Ye, {
		width: r,
		height: i,
		x: o,
		y: a
	}, t);
}, Iz = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = Az(e, kz);
	return Fl() ? /*#__PURE__*/ P.createElement(Fz, null, /*#__PURE__*/ P.createElement(Oz, { isPanorama: !0 }, n)) : /*#__PURE__*/ P.createElement(Pz, Mz({ ref: t }, r), /*#__PURE__*/ P.createElement(Oz, { isPanorama: !1 }, n));
});
//#endregion
//#region node_modules/recharts/es6/util/useReportScale.js
function Lz(e, t) {
	return Hz(e) || Vz(e, t) || zz(e, t) || Rz();
}
function Rz() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function zz(e, t) {
	if (e) {
		if (typeof e == "string") return Bz(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Bz(e, t) : void 0;
	}
}
function Bz(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function Vz(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function Hz(e) {
	if (Array.isArray(e)) return e;
}
function Uz() {
	var e = B(), t = Lz((0, P.useState)(null), 2), n = t[0], r = t[1], i = V(gl);
	return (0, P.useEffect)(() => {
		if (n != null) {
			var t = n.getBoundingClientRect().width / n.offsetWidth;
			G(t) && t !== i && e(Rc(t));
		}
	}, [
		n,
		e,
		i
	]), r;
}
//#endregion
//#region node_modules/recharts/es6/chart/RechartsWrapper.js
function Wz(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Gz(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Wz(Object(n), !0).forEach(function(t) {
			Kz(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Wz(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Kz(e, t, n) {
	return (t = qz(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function qz(e) {
	var t = Jz(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Jz(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Yz() {
	return Yz = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Yz.apply(null, arguments);
}
function Xz(e, t) {
	return tB(e) || eB(e, t) || Qz(e, t) || Zz();
}
function Zz() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Qz(e, t) {
	if (e) {
		if (typeof e == "string") return $z(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? $z(e, t) : void 0;
	}
}
function $z(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function eB(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function tB(e) {
	if (Array.isArray(e)) return e;
}
var nB = () => (XE(), null);
function rB(e) {
	if (typeof e == "number") return e;
	if (typeof e == "string") {
		var t = parseFloat(e);
		if (!Number.isNaN(t)) return t;
	}
	return 0;
}
var iB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = (0, P.useRef)(null), r = Xz((0, P.useState)({
		containerWidth: rB(e.style?.width),
		containerHeight: rB(e.style?.height)
	}), 2), i = r[0], a = r[1], o = (0, P.useCallback)((e, t) => {
		a((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), s = (0, P.useCallback)((e) => {
		if (typeof t == "function" && t(e), n.current != null && (n.current.disconnect(), n.current = null), e != null && typeof ResizeObserver < "u") {
			var r = e.getBoundingClientRect(), i = r.width, a = r.height;
			o(i, a);
			var s = new ResizeObserver((e) => {
				var t = e[0];
				if (t != null) {
					var n = t.contentRect, r = n.width, i = n.height;
					o(r, i);
				}
			});
			s.observe(e), n.current = s;
		}
	}, [t, o]);
	return (0, P.useEffect)(() => () => {
		n.current?.disconnect();
	}, [o]), /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(Ou, {
		width: i.containerWidth,
		height: i.containerHeight
	}), /*#__PURE__*/ P.createElement("div", Yz({ ref: s }, e)));
}), aB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = Xz((0, P.useState)({
		containerWidth: rB(n),
		containerHeight: rB(r)
	}), 2), a = i[0], o = i[1], s = (0, P.useCallback)((e, t) => {
		o((n) => {
			var r = Math.round(e), i = Math.round(t);
			return n.containerWidth === r && n.containerHeight === i ? n : {
				containerWidth: r,
				containerHeight: i
			};
		});
	}, []), c = (0, P.useCallback)((e) => {
		if (typeof t == "function" && t(e), e != null) {
			var n = e.getBoundingClientRect(), r = n.width, i = n.height;
			s(r, i);
		}
	}, [t, s]);
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(Ou, {
		width: a.containerWidth,
		height: a.containerHeight
	}), /*#__PURE__*/ P.createElement("div", Yz({ ref: c }, e)));
}), oB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(Ou, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement("div", Yz({ ref: t }, e)));
}), sB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height;
	return typeof n == "string" || typeof r == "string" ? /*#__PURE__*/ P.createElement(aB, Yz({}, e, { ref: t })) : typeof n == "number" && typeof r == "number" ? /*#__PURE__*/ P.createElement(oB, Yz({}, e, {
		width: n,
		height: r,
		ref: t
	})) : /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(Ou, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement("div", Yz({ ref: t }, e)));
});
function cB(e) {
	return e ? iB : sB;
}
var lB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.children, r = e.className, i = e.height, a = e.onClick, o = e.onContextMenu, s = e.onDoubleClick, c = e.onMouseDown, u = e.onMouseEnter, d = e.onMouseLeave, f = e.onMouseMove, p = e.onMouseUp, m = e.onTouchEnd, h = e.onTouchMove, g = e.onTouchStart, _ = e.style, v = e.width, y = e.responsive, b = e.dispatchTouchEvents, x = b === void 0 || b, S = (0, P.useRef)(null), C = B(), w = Xz((0, P.useState)(null), 2), T = w[0], E = w[1], D = Xz((0, P.useState)(null), 2), O = D[0], k = D[1], A = Uz(), j = mu(), M = j?.width > 0 ? j.width : v, N = j?.height > 0 ? j.height : i, ee = (0, P.useCallback)((e) => {
		A(e), typeof t == "function" && t(e), E(e), k(e), e != null && (S.current = e);
	}, [
		A,
		t,
		E,
		k
	]), te = (0, P.useCallback)((e) => {
		C(FR(e)), C(iz({
			handler: a,
			reactEvent: e
		}));
	}, [C, a]), ne = (0, P.useCallback)((e) => {
		C(LR(e)), C(iz({
			handler: u,
			reactEvent: e
		}));
	}, [C, u]), re = (0, P.useCallback)((e) => {
		C(aw()), C(iz({
			handler: d,
			reactEvent: e
		}));
	}, [C, d]), ie = (0, P.useCallback)((e) => {
		C(LR(e)), C(iz({
			handler: f,
			reactEvent: e
		}));
	}, [C, f]), ae = (0, P.useCallback)(() => {
		C(ZR());
	}, [C]), oe = (0, P.useCallback)(() => {
		C(QR());
	}, [C]), se = (0, P.useCallback)((e) => {
		C(XR(e.key));
	}, [C]), ce = (0, P.useCallback)((e) => {
		C(iz({
			handler: o,
			reactEvent: e
		}));
	}, [C, o]), le = (0, P.useCallback)((e) => {
		C(iz({
			handler: s,
			reactEvent: e
		}));
	}, [C, s]), ue = (0, P.useCallback)((e) => {
		C(iz({
			handler: c,
			reactEvent: e
		}));
	}, [C, c]), de = (0, P.useCallback)((e) => {
		C(iz({
			handler: p,
			reactEvent: e
		}));
	}, [C, p]), fe = (0, P.useCallback)((e) => {
		C(iz({
			handler: g,
			reactEvent: e
		}));
	}, [C, g]), pe = (0, P.useCallback)((e) => {
		x && C(uz(e)), C(iz({
			handler: h,
			reactEvent: e
		}));
	}, [
		C,
		x,
		h
	]), me = (0, P.useCallback)((e) => {
		C(iz({
			handler: m,
			reactEvent: e
		}));
	}, [C, m]), he = cB(y);
	return /*#__PURE__*/ P.createElement(wE.Provider, { value: T }, /*#__PURE__*/ P.createElement(Ft.Provider, { value: O }, /*#__PURE__*/ P.createElement(he, {
		width: M ?? _?.width,
		height: N ?? _?.height,
		className: l("recharts-wrapper", r),
		style: Gz({
			position: "relative",
			cursor: "default",
			width: M,
			height: N
		}, _),
		onClick: te,
		onContextMenu: ce,
		onDoubleClick: le,
		onFocus: ae,
		onBlur: oe,
		onKeyDown: se,
		onMouseDown: ue,
		onMouseEnter: ne,
		onMouseLeave: re,
		onMouseMove: ie,
		onMouseUp: de,
		onTouchEnd: me,
		onTouchMove: pe,
		onTouchStart: fe,
		ref: ee
	}, /*#__PURE__*/ P.createElement(nB, null), n)));
}), uB = [
	"width",
	"height",
	"responsive",
	"children",
	"className",
	"style",
	"compact",
	"title",
	"desc"
];
function dB(e, t) {
	if (e == null) return {};
	var n, r, i = fB(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function fB(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var pB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => {
	var n = e.width, r = e.height, i = e.responsive, a = e.children, o = e.className, s = e.style, c = e.compact, l = e.title, u = e.desc, d = Ve(dB(e, uB));
	return c ? /*#__PURE__*/ P.createElement(P.Fragment, null, /*#__PURE__*/ P.createElement(Ou, {
		width: n,
		height: r
	}), /*#__PURE__*/ P.createElement(Iz, {
		otherAttributes: d,
		title: l,
		desc: u
	}, a)) : /*#__PURE__*/ P.createElement(lB, {
		className: o,
		style: s,
		width: n,
		height: r,
		responsive: i ?? !1,
		onClick: e.onClick,
		onMouseLeave: e.onMouseLeave,
		onMouseEnter: e.onMouseEnter,
		onMouseMove: e.onMouseMove,
		onMouseDown: e.onMouseDown,
		onMouseUp: e.onMouseUp,
		onContextMenu: e.onContextMenu,
		onDoubleClick: e.onDoubleClick,
		onTouchStart: e.onTouchStart,
		onTouchMove: e.onTouchMove,
		onTouchEnd: e.onTouchEnd
	}, /*#__PURE__*/ P.createElement(Iz, {
		otherAttributes: d,
		title: l,
		desc: u,
		ref: t
	}, /*#__PURE__*/ P.createElement(rN, null, a)));
});
//#endregion
//#region node_modules/recharts/es6/chart/CartesianChart.js
function mB() {
	return mB = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, mB.apply(null, arguments);
}
function hB(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function gB(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? hB(Object(n), !0).forEach(function(t) {
			_B(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hB(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function _B(e, t, n) {
	return (t = vB(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function vB(e) {
	var t = yB(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function yB(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var bB = gB({
	accessibilityLayer: !0,
	barCategoryGap: "10%",
	barGap: 4,
	layout: "horizontal",
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	responsive: !1,
	reverseStackOrder: !1,
	stackOffset: "none",
	syncMethod: "index"
}, gz), xB = /*#__PURE__*/ (0, P.forwardRef)(function(e, t) {
	var n = Ar(e.categoricalChartProps, bB), r = e.chartName, i = e.defaultTooltipEventType, a = e.validateTooltipEventTypes, o = e.tooltipPayloadSearcher, s = e.categoricalChartProps, c = {
		chartName: r,
		defaultTooltipEventType: i,
		validateTooltipEventTypes: a,
		tooltipPayloadSearcher: o,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ P.createElement(Sz, {
		preloadedState: { options: c },
		reduxStoreName: s.id ?? r
	}, /*#__PURE__*/ P.createElement(LM, { chartData: s.data }), /*#__PURE__*/ P.createElement(wz, {
		layout: n.layout,
		margin: n.margin
	}), /*#__PURE__*/ P.createElement(Ez, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ P.createElement(Tz, {
		baseValue: n.baseValue,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ P.createElement(pB, mB({}, n, { ref: t })));
}), SB = ["axis"], CB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(xB, {
	chartName: "LineChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: SB,
	tooltipPayloadSearcher: AE,
	categoricalChartProps: e,
	ref: t
})), wB = ["axis", "item"], TB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(xB, {
	chartName: "BarChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: wB,
	tooltipPayloadSearcher: AE,
	categoricalChartProps: e,
	ref: t
}));
//#endregion
//#region node_modules/recharts/es6/state/ReportPolarOptions.js
function EB(e) {
	var t = B();
	return (0, P.useEffect)(() => {
		t(JR(e));
	}, [t, e]), null;
}
//#endregion
//#region node_modules/recharts/es6/chart/PolarChart.js
var DB = ["layout"];
function OB() {
	return OB = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, OB.apply(null, arguments);
}
function kB(e, t) {
	if (e == null) return {};
	var n, r, i = AB(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function AB(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function jB(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function MB(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? jB(Object(n), !0).forEach(function(t) {
			NB(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : jB(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function NB(e, t, n) {
	return (t = PB(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function PB(e) {
	var t = FB(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function FB(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var IB = MB({
	accessibilityLayer: !0,
	stackOffset: "none",
	barCategoryGap: "10%",
	barGap: 4,
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	reverseStackOrder: !1,
	syncMethod: "index",
	layout: "radial",
	responsive: !1,
	cx: "50%",
	cy: "50%",
	innerRadius: 0,
	outerRadius: "80%"
}, gz), LB = /*#__PURE__*/ (0, P.forwardRef)(function(e, t) {
	var n = Ar(e.categoricalChartProps, IB), r = n.layout, i = kB(n, DB), a = e.chartName, o = {
		chartName: a,
		defaultTooltipEventType: e.defaultTooltipEventType,
		validateTooltipEventTypes: e.validateTooltipEventTypes,
		tooltipPayloadSearcher: e.tooltipPayloadSearcher,
		eventEmitter: void 0
	};
	return /*#__PURE__*/ P.createElement(Sz, {
		preloadedState: { options: o },
		reduxStoreName: n.id ?? a
	}, /*#__PURE__*/ P.createElement(LM, { chartData: n.data }), /*#__PURE__*/ P.createElement(wz, {
		layout: r,
		margin: n.margin
	}), /*#__PURE__*/ P.createElement(Ez, {
		throttleDelay: n.throttleDelay,
		throttledEvents: n.throttledEvents
	}), /*#__PURE__*/ P.createElement(Tz, {
		baseValue: void 0,
		accessibilityLayer: n.accessibilityLayer,
		barCategoryGap: n.barCategoryGap,
		maxBarSize: n.maxBarSize,
		stackOffset: n.stackOffset,
		barGap: n.barGap,
		barSize: n.barSize,
		syncId: n.syncId,
		syncMethod: n.syncMethod,
		className: n.className,
		reverseStackOrder: n.reverseStackOrder
	}), /*#__PURE__*/ P.createElement(EB, {
		cx: n.cx,
		cy: n.cy,
		startAngle: n.startAngle,
		endAngle: n.endAngle,
		innerRadius: n.innerRadius,
		outerRadius: n.outerRadius
	}), /*#__PURE__*/ P.createElement(pB, OB({}, i, { ref: t })));
}), RB = ["axis"], zB = /*#__PURE__*/ (0, P.forwardRef)((e, t) => /*#__PURE__*/ P.createElement(xB, {
	chartName: "AreaChart",
	defaultTooltipEventType: "axis",
	validateTooltipEventTypes: RB,
	tooltipPayloadSearcher: AE,
	categoricalChartProps: e,
	ref: t
}));
//#endregion
//#region src/react/charts/cn.ts
function BB(...e) {
	return d(l(e));
}
//#endregion
//#region src/react/evilcharts/registry/ui/recharts-chart.tsx
var $ = b(), VB = {
	light: "",
	dark: ".dark"
}, HB = Object.keys(VB);
function UB(e) {
	for (let [t, n] of Object.entries(e)) if (n.colors && !HB.some((e) => n.colors?.[e] !== void 0)) throw Error(`[EvilCharts] Invalid chart config for "${t}": colors object must have at least one theme key (${HB.join(", ")}). Received empty object or invalid keys.`);
}
var WB = P.createContext(null);
function GB() {
	let e = P.useContext(WB);
	if (!e) throw Error("useChart must be used within a <ChartContainer />");
	return e;
}
function KB({ id: e, config: t, initialDimension: n = {
	width: 320,
	height: 200
}, className: r, children: i, footer: a, ...o }) {
	let s = P.useId(), c = `chart-${e ?? s.replace(/:/g, "")}`;
	return UB(t), /* @__PURE__ */ (0, $.jsx)(WB.Provider, {
		value: { config: t },
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			"data-slot": "chart",
			"data-chart": c,
			className: BB("min-h-0 w-full flex-1", "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border relative flex flex-col justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", !a && "aspect-video", r),
			...o,
			children: [
				/* @__PURE__ */ (0, $.jsx)(YB, {
					id: c,
					config: t
				}),
				/* @__PURE__ */ (0, $.jsx)(gu, {
					className: "min-h-0 w-full flex-1",
					initialDimension: n,
					children: i
				}),
				a
			]
		})
	});
}
function qB({ isLoading: e }) {
	return e ? /* @__PURE__ */ (0, $.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
		children: /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "text-primary bg-background flex items-center justify-center gap-2 rounded-md border px-2 py-0.5 text-sm",
			children: [/* @__PURE__ */ (0, $.jsx)("div", { className: "border-border border-t-primary h-3 w-3 animate-spin rounded-full border" }), /* @__PURE__ */ (0, $.jsx)("span", { children: "Loading" })]
		})
	}) : null;
}
function JB(e, t) {
	let n = e.length;
	if (n >= t) return e.slice(0, t);
	let r = [], i = Math.floor(t / n), a = t % n;
	for (let t = 0; t < n; t++) {
		let o = i + +(t >= n - a);
		for (let n = 0; n < o; n++) r.push(e[t]);
	}
	return r;
}
var YB = ({ id: e, config: t }) => {
	let n = Object.entries(t).filter(([, e]) => e.colors);
	if (!n.length) return null;
	let r = (e) => n.flatMap(([t, n]) => {
		let r = n.colors?.[e];
		return !r || !Array.isArray(r) || r.length === 0 ? [] : JB(r, ZB(n)).map((e, n) => `  --color-${t}-${n}: ${e};`);
	}).filter(Boolean).join("\n"), i = Object.entries(VB).map(([t, n]) => `${n} [data-chart=${e}] {\n${r(t)}\n}`).join("\n");
	return /* @__PURE__ */ (0, $.jsx)("style", { dangerouslySetInnerHTML: { __html: i } });
};
function XB(e, t, n) {
	if (typeof t != "object" || !t) return;
	let r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0, i = n;
	return n in t && typeof t[n] == "string" ? i = t[n] : r && n in r && typeof r[n] == "string" && (i = r[n]), i in e ? e[i] : e[n];
}
function ZB(e) {
	if (!e.colors) return 1;
	let t = HB.map((t) => e.colors?.[t]?.length ?? 0);
	return Math.max(...t, 1);
}
var QB = (e = 10, t = 0, n = 70) => {
	let r = n - t;
	return Array.from({ length: e }, () => ({ loading: Math.floor(Math.random() * r) + t }));
}, $B = {
	sm: "rounded-sm",
	md: "rounded-md",
	lg: "rounded-lg",
	xl: "rounded-xl"
}, eV = {
	default: "bg-background",
	"frosted-glass": "bg-background/70 backdrop-blur-sm"
};
function tV({ active: e, payload: t, className: n, indicator: r = "dot", hideLabel: i = !1, hideIndicator: a = !1, label: o, labelFormatter: s, labelClassName: c, formatter: l, nameKey: u, labelKey: d, selected: f, roundness: p = "lg", variant: m = "default" }) {
	let { config: h } = GB(), g = P.useMemo(() => {
		if (i || !t?.length) return null;
		let [e] = t, n = `${d ?? e?.dataKey ?? e?.name ?? "value"}`, r = XB(h, e, n), a = !d && typeof o == "string" ? h[o]?.label ?? o : r?.label;
		return s ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: BB("font-medium", c),
			children: s(a, t)
		}) : a ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: BB("font-medium", c),
			children: a
		}) : null;
	}, [
		o,
		s,
		t,
		i,
		c,
		h,
		d
	]);
	if (!e || !t?.length) return /* @__PURE__ */ (0, $.jsx)("span", { className: "p-4" });
	let _ = t.length === 1 && r !== "dot";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: BB("border-border/50 grid min-w-32 items-start gap-1.5 border px-2.5 py-1.5 text-xs shadow-xl", $B[p], eV[m], n),
		children: [_ ? null : g, /* @__PURE__ */ (0, $.jsx)("div", {
			className: "grid gap-1.5",
			children: t.filter((e) => e.type !== "none").map((e, t) => {
				let n = `${(u && e.payload ? e.payload[u] : void 0) ?? e.name ?? e.dataKey ?? "value"}`, i = XB(h, e, n), o = i ? ZB(i) : 1;
				return /* @__PURE__ */ (0, $.jsx)("div", {
					className: BB("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5", r === "dot" && "items-center", f != null && f !== e.dataKey && "opacity-30"),
					children: l && e?.value !== void 0 && e.name ? l(e.value, e.name, e, t, e.payload) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [i?.icon ? /* @__PURE__ */ (0, $.jsx)(i.icon, {}) : !a && /* @__PURE__ */ (0, $.jsx)("div", {
						className: BB("shrink-0 rounded-[2px]", {
							"h-2.5 w-2.5": r === "dot",
							"w-1": r === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent!": r === "dashed",
							"my-0.5": _ && r === "dashed"
						}),
						style: nV(n, o)
					}), /* @__PURE__ */ (0, $.jsxs)("div", {
						className: BB("flex flex-1 justify-between gap-4 leading-none", _ ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, $.jsxs)("div", {
							className: "grid gap-1.5",
							children: [_ ? g : null, /* @__PURE__ */ (0, $.jsx)("span", {
								className: "text-muted-foreground",
								children: i?.label ?? e.name
							})]
						}), e.value != null && /* @__PURE__ */ (0, $.jsx)("span", {
							className: "text-foreground font-mono font-medium tabular-nums",
							children: typeof e.value == "number" ? e.value.toLocaleString() : String(e.value)
						})]
					})] })
				}, t);
			})
		})]
	});
}
function nV(e, t) {
	return t <= 1 ? { background: `var(--color-${e}-0)` } : { background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})` };
}
var rV = ({ animationDuration: e = 200, ...t }) => /* @__PURE__ */ (0, $.jsx)(pD, {
	animationDuration: e,
	...t
});
//#endregion
//#region src/react/evilcharts/registry/ui/recharts-legend.tsx
function iV({ className: e, hideIcon: t = !1, nameKey: n, payload: r, verticalAlign: i, align: a = "right", selected: o, onSelectChange: s, isClickable: c, variant: l = "rounded-square" }) {
	let { config: u } = GB();
	return r?.length ? /* @__PURE__ */ (0, $.jsx)("div", {
		className: BB("flex items-center gap-4 select-none", a === "left" && "justify-start", a === "center" && "justify-center", a === "right" && "justify-end", i === "top" ? "pb-4" : "pt-4", e),
		children: r.filter((e) => e.type !== "none").map((e) => {
			let r = `${(n && e.payload ? e.payload[n] : void 0) ?? e.value ?? e.dataKey ?? "value"}`, i = XB(u, e, r), a = o === null || o === r, d = i ? ZB(i) : 1;
			return /* @__PURE__ */ (0, $.jsxs)("div", {
				className: BB("[&>svg]:text-muted-foreground flex items-center gap-1.5 transition-opacity [&>svg]:h-3 [&>svg]:w-3", !a && "opacity-30", c && "cursor-pointer"),
				onClick: () => {
					c && s?.(o === r ? null : r);
				},
				children: [i?.icon && !t ? /* @__PURE__ */ (0, $.jsx)(i.icon, {}) : /* @__PURE__ */ (0, $.jsx)(aV, {
					variant: l,
					dataKey: r,
					colorsCount: d
				}), i?.label]
			}, r);
		})
	}) : null;
}
function aV({ variant: e, dataKey: t, colorsCount: n }) {
	let r = oV(t, n), i = sV(t, n);
	switch (e) {
		case "square": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0",
			style: r
		});
		case "circle": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0 rounded-full",
			style: r
		});
		case "circle-outline": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2.5 w-2.5 shrink-0 rounded-full p-[1.5px]",
			style: i
		});
		case "vertical-bar": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-3 w-1 shrink-0 rounded-[2px]",
			style: r
		});
		case "horizontal-bar": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-1 w-3 shrink-0 rounded-[2px]",
			style: r
		});
		case "rounded-square-outline": return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2.5 w-2.5 shrink-0 rounded-[3px] p-[1.5px]",
			style: i
		});
		default: return /* @__PURE__ */ (0, $.jsx)("div", {
			className: "h-2 w-2 shrink-0 rounded-[2px]",
			style: r
		});
	}
}
function oV(e, t) {
	return t <= 1 ? { backgroundColor: `var(--color-${e}-0)` } : { background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})` };
}
function sV(e, t) {
	let n = {
		WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		WebkitMaskComposite: "xor",
		mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
		maskComposite: "exclude"
	};
	return t <= 1 ? {
		backgroundColor: `var(--color-${e}-0)`,
		...n
	} : {
		background: `linear-gradient(to right, ${Array.from({ length: t }, (n, r) => `var(--color-${e}-${r}) ${r / (t - 1) * 100}%`).join(", ")})`,
		...n
	};
}
var cV = Ad, lV = () => null, uV = {
	stiffness: 300,
	damping: 35,
	mass: .8
};
function dV({ range: e, totalPoints: t, containerRef: n, commit: r }) {
	let i = P.useRef(null), [a, o] = P.useState(!1), s = (0, P.useCallback)((e) => !n.current || t <= 1 ? 0 : Math.round(e / n.current.getBoundingClientRect().width * (t - 1)), [t, n]), c = (0, P.useCallback)((t, n) => {
		t.preventDefault(), t.target.setPointerCapture(t.pointerId), i.current = {
			type: n,
			originX: t.clientX,
			originRange: { ...e }
		}, o(!0);
	}, [e]), l = (0, P.useCallback)((e) => {
		let n = i.current;
		if (!n) return;
		let a = s(e.clientX - n.originX), { type: o, originRange: c } = n;
		if (o === "left") r({
			startIndex: c.startIndex + a,
			endIndex: c.endIndex
		}, "left");
		else if (o === "right") r({
			startIndex: c.startIndex,
			endIndex: c.endIndex + a
		}, "right");
		else {
			let e = c.endIndex - c.startIndex, n = c.startIndex + a, i = n + e;
			n < 0 && (n = 0, i = e), i > t - 1 && (i = t - 1, n = Math.max(0, i - e)), r({
				startIndex: n,
				endIndex: i
			}, "middle");
		}
	}, [
		s,
		t,
		r
	]), u = (0, P.useCallback)((e) => {
		e.target.releasePointerCapture(e.pointerId), i.current = null, o(!1);
	}, []);
	return {
		isDragging: a,
		bind: (0, P.useCallback)((e) => ({
			onPointerDown: (t) => c(t, e),
			onPointerMove: l,
			onPointerUp: u
		}), [
			c,
			l,
			u
		])
	};
}
function fV({ data: e, chartConfig: t, dataKeys: n, xDataKey: r, variant: i = "area", height: a = 56, className: o, stacked: s = !1, strokeVariant: c = "solid", connectNulls: l = !1, barRadius: u, startIndex: d, endIndex: f, defaultStartIndex: p = 0, defaultEndIndex: m, onChange: h, formatLabel: g, curveType: _ = "monotone", minSpan: y = 2, showLabels: b = !0, skipStyle: x = !1 }) {
	let S = P.useRef(null), C = P.useMemo(() => n ?? Object.keys(t), [n, t]), w = e.length, T = P.useId().replace(/:/g, ""), E = d !== void 0 && f !== void 0, [D, O] = P.useState(() => ({
		startIndex: Math.max(0, Math.min(p, w - 1)),
		endIndex: Math.max(0, Math.min(m ?? w - 1, w - 1))
	})), k = P.useRef(D);
	(0, P.useEffect)(() => {
		E || O((e) => {
			let t = {
				startIndex: Math.min(e.startIndex, Math.max(0, w - 1)),
				endIndex: Math.min(e.endIndex, Math.max(0, w - 1))
			};
			return k.current = t, t;
		});
	}, [w, E]);
	let A = (0, P.useCallback)((e, t) => {
		let { startIndex: n, endIndex: r } = e, i = Math.max(0, w - 1);
		if (n = Math.max(0, Math.min(n, i)), r = Math.max(0, Math.min(r, i)), t === "left") {
			let e = Math.max(0, r - y);
			return n = Math.min(n, e), {
				startIndex: n,
				endIndex: r
			};
		}
		if (t === "right") {
			let e = Math.min(i, n + y);
			return r = Math.max(r, e), {
				startIndex: n,
				endIndex: r
			};
		}
		return r - n < y && (r = Math.min(n + y, i), r - n < y && (n = Math.max(0, r - y))), {
			startIndex: n,
			endIndex: r
		};
	}, [w, y]), { isDragging: j, bind: M } = dV({
		range: D,
		totalPoints: w,
		containerRef: S,
		commit: (0, P.useCallback)((e, t) => {
			let n = A(e, t), r = k.current;
			(r.startIndex !== n.startIndex || r.endIndex !== n.endIndex) && (k.current = n, O(n), P.startTransition(() => {
				h?.(n);
			}));
		}, [A, h])
	}), N = D;
	(0, P.useEffect)(() => {
		if (E && !j) {
			let e = {
				startIndex: d,
				endIndex: f
			};
			O(e), k.current = e;
		}
	}, [
		E,
		d,
		f,
		j
	]);
	let ee = w > 1 ? N.startIndex / (w - 1) * 100 : 0, te = w > 1 ? N.endIndex / (w - 1) * 100 : 100, ne = ie(ee), ae = ie(te);
	ne.get() !== ee && ne.set(ee), ae.get() !== te && ae.set(te);
	let oe = de(ne, uV), ce = de(ae, uV), le = se(oe, (e) => `${e}%`), ue = se(ce, (e) => `${e}%`), fe = se(oe, (e) => `${e}%`), pe = se(ce, (e) => `${Math.max(0, 100 - e)}%`), me = ie(`${Math.max(0, te - ee)}%`), he = (0, P.useCallback)(() => {
		me.set(`${Math.max(0, ce.get() - oe.get())}%`);
	}, [
		oe,
		ce,
		me
	]);
	re(oe, "change", he), re(ce, "change", he);
	let ge = (0, P.useCallback)((t) => {
		if (!r) return String(t);
		let n = e[t]?.[r];
		return g ? g(n, t) : String(n ?? t);
	}, [
		e,
		r,
		g
	]);
	return w === 0 ? null : /* @__PURE__ */ (0, $.jsxs)("div", {
		ref: S,
		"data-chart": x ? void 0 : T,
		className: BB("group relative select-none", o),
		style: { height: a },
		children: [
			!x && /* @__PURE__ */ (0, $.jsx)(YB, {
				id: T,
				config: t
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "absolute inset-0 overflow-hidden rounded-md",
				children: /* @__PURE__ */ (0, $.jsx)(mV, {
					data: e,
					keys: C,
					chartConfig: t,
					variant: i,
					curveType: _,
					chartId: T,
					stacked: s,
					strokeVariant: c === "animated-dashed" ? "dashed" : c,
					connectNulls: l,
					barRadius: u
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(v.div, {
				className: "bg-background/70 pointer-events-none absolute inset-y-0 left-0 rounded-l-md backdrop-blur-[2px]",
				style: { width: fe }
			}),
			/* @__PURE__ */ (0, $.jsx)(v.div, {
				className: "bg-background/70 pointer-events-none absolute inset-y-0 right-0 rounded-r-md backdrop-blur-[2px]",
				style: { width: pe }
			}),
			/* @__PURE__ */ (0, $.jsx)(v.div, {
				className: "absolute inset-y-0 cursor-grab touch-none rounded-sm border active:cursor-grabbing",
				style: {
					left: le,
					width: me
				},
				...M("middle")
			}),
			/* @__PURE__ */ (0, $.jsx)(pV, {
				side: "left",
				position: le,
				label: b ? ge(N.startIndex) : void 0,
				bind: M("left")
			}),
			/* @__PURE__ */ (0, $.jsx)(pV, {
				side: "right",
				position: ue,
				label: b ? ge(N.endIndex) : void 0,
				bind: M("right")
			})
		]
	});
}
function pV({ side: e, position: t, label: n, bind: r }) {
	let i = e === "left";
	return /* @__PURE__ */ (0, $.jsxs)(v.div, {
		className: "absolute inset-y-0 z-10",
		style: { left: t },
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			className: BB("group absolute inset-y-0 flex w-3 cursor-ew-resize touch-none items-center justify-center after:absolute after:inset-y-0 after:-left-4 after:w-11 after:content-['']", i ? "" : "-translate-x-full"),
			...r,
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				className: BB("bg-muted-foreground group-hover:bg-foreground relative flex h-4 w-1.5 items-center justify-center rounded-md transition-colors", i ? "-left-[5.5px]" : "-right-[5.5px]"),
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-[2px]",
					children: [
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" }),
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" }),
						/* @__PURE__ */ (0, $.jsx)("div", { className: "bg-background/70 h-[2px] w-[2px] rounded-full" })
					]
				})
			})
		}), n && /* @__PURE__ */ (0, $.jsx)("div", {
			className: BB("bg-foreground text-background pointer-events-none absolute -bottom-3 -translate-y-1/2 rounded-[3px] px-1 py-px text-[8px] leading-tight font-medium whitespace-nowrap opacity-0 group-hover:opacity-100", i ? "left-1.5" : "right-1.5"),
			children: n
		})]
	});
}
function mV({ data: e, keys: t, chartConfig: n, variant: r, curveType: i, chartId: a, stacked: o, strokeVariant: s = "solid", connectNulls: c = !1, barRadius: l }) {
	let u = P.useMemo(() => Object.entries(n).filter(([e]) => t.includes(e)).map(([e, t]) => ({
		dataKey: e,
		colorsCount: ZB(t)
	})), [n, t]), d = s === "dashed" || s === "animated-dashed" ? "4 4" : void 0, f = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [r === "area" && /* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${a}-zm-vertical-fade`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: "white",
			stopOpacity: .15
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: "white",
			stopOpacity: 0
		})]
	}), u.map(({ dataKey: e, colorsCount: t }) => {
		let n = t === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${e}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${e}-0)`
		})] }) : Array.from({ length: t }, (n, r) => /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: `${r / (t - 1) * 100}%`,
			stopColor: `var(--color-${e}-${r}, var(--color-${e}-0))`
		}, r));
		return /* @__PURE__ */ (0, $.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${a}-zm-${e}`,
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: n
		}), r === "area" && /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${a}-zm-fill-mask-${e}`,
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${a}-zm-vertical-fade)`
			})
		}), /* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${a}-zm-fill-${e}`,
			patternUnits: "userSpaceOnUse",
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${a}-zm-${e})`,
				mask: `url(#${a}-zm-fill-mask-${e})`
			})
		})] })] }, e);
	})] });
	if (r === "line") return /* @__PURE__ */ (0, $.jsx)(gu, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsxs)(CB, {
			data: e,
			margin: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(qF, {
				type: i,
				dataKey: e,
				stroke: `url(#${a}-zm-${e})`,
				strokeWidth: 1,
				strokeOpacity: .5,
				strokeDasharray: d,
				connectNulls: c,
				dot: !1,
				activeDot: !1,
				isAnimationActive: !1
			}, e))]
		})
	});
	if (r === "bar") {
		let n = l ?? 3;
		return /* @__PURE__ */ (0, $.jsx)(gu, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, $.jsxs)(TB, {
				data: e,
				margin: {
					top: 2,
					right: 0,
					bottom: 0,
					left: 0
				},
				barGap: 2,
				barSize: 14,
				children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(YL, {
					dataKey: e,
					fill: `url(#${a}-zm-${e})`,
					fillOpacity: .35,
					stackId: o ? "zm-stack" : void 0,
					isAnimationActive: !1,
					radius: [
						n,
						n,
						n,
						n
					]
				}, e))]
			})
		});
	}
	return /* @__PURE__ */ (0, $.jsx)(gu, {
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsxs)(zB, {
			data: e,
			margin: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			children: [/* @__PURE__ */ (0, $.jsx)("defs", { children: f }), t.map((e) => /* @__PURE__ */ (0, $.jsx)(BI, {
				type: i,
				dataKey: e,
				stroke: `url(#${a}-zm-${e})`,
				fill: `url(#${a}-zm-fill-${e})`,
				strokeWidth: 1,
				strokeOpacity: .5,
				strokeDasharray: d,
				connectNulls: c,
				fillOpacity: 1,
				stackId: o ? "zm-stack" : void 0,
				dot: !1,
				activeDot: !1,
				isAnimationActive: !1
			}, e))]
		})
	});
}
function hV({ data: e, defaultStartIndex: t = 0, defaultEndIndex: n }) {
	let [r, i] = P.useState({
		startIndex: t,
		endIndex: n ?? Math.max(0, e.length - 1)
	}), a = P.useDeferredValue(r);
	return (0, P.useEffect)(() => {
		i({
			startIndex: 0,
			endIndex: Math.max(0, e.length - 1)
		});
	}, [e.length]), {
		range: r,
		visibleData: P.useMemo(() => e.slice(a.startIndex, a.endIndex + 1), [
			e,
			a.startIndex,
			a.endIndex
		]),
		brushProps: {
			startIndex: r.startIndex,
			endIndex: r.endIndex,
			onChange: i
		}
	};
}
var gV = {
	dots: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("circle", {
			className: "text-border dark:text-border",
			cx: "2",
			cy: "2",
			r: "1",
			fill: "currentColor"
		})
	}),
	grid: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M 20 0 L 0 0 0 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	plus: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "16",
		height: "16",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M 8 4 L 8 12 M 4 8 L 12 8",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5",
			strokeLinecap: "round"
		})
	}),
	bubbles: ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "100",
		height: "100",
		patternUnits: "userSpaceOnUse",
		patternTransform: "scale(0.6667)",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z",
			fill: "currentColor",
			fillOpacity: "0.4",
			fillRule: "evenodd"
		})
	}),
	"cross-hatch": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "20",
		height: "20",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border/60 dark:text-border/50",
			d: "M 0 0 L 20 20 M 20 0 L 0 20",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	"diagonal-lines": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "6",
		height: "6",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(45)",
		children: /* @__PURE__ */ (0, $.jsx)("line", {
			className: "text-border dark:text-border",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "6",
			stroke: "currentColor",
			strokeWidth: "0.5"
		})
	}),
	"falling-triangles": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "18",
		height: "36",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z",
			transform: "scale(0.5)",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"4-pointed-star": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "16",
		height: "16",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("polygon", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			points: "5 3 8 4 5 5 4 8 3 5 0 4 3 3 4 0 5 3",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"tiny-checkers": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "8",
		height: "8",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			d: "M0 0h4v4H0V0zm4 4h4v4H4V4z",
			fill: "currentColor",
			fillOpacity: "0.2"
		})
	}),
	"overlapping-circles": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "40",
		height: "40",
		patternUnits: "userSpaceOnUse",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			fillRule: "evenodd",
			d: "M25 25c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5c0 2.762-2.238 5-5 5s-5-2.238-5-5 2.238-5 5-5zM5 5c0-2.762 2.238-5 5-5s5 2.238 5 5-2.238 5-5 5c0 2.762-2.238 5-5 5S0 12.762 0 10s2.238-5 5-5zm5 4c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm20 20c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	}),
	"wiggle-lines": ({ id: e }) => /* @__PURE__ */ (0, $.jsx)("pattern", {
		id: e,
		x: "0",
		y: "0",
		width: "52",
		height: "26",
		patternUnits: "userSpaceOnUse",
		patternTransform: "scale(0.6)",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			className: "text-border dark:text-border",
			d: "M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z",
			fill: "currentColor",
			fillOpacity: "0.4"
		})
	})
};
function _V({ variant: e }) {
	let t = (0, P.useId)().replace(/:/g, ""), n = `${t}-bg-${e}`, r = `${t}-bg-edge-fade`, i = `${t}-bg-blur`, a = gV[e];
	return /* @__PURE__ */ (0, $.jsxs)(mE, {
		zIndex: -1,
		children: [/* @__PURE__ */ (0, $.jsxs)("defs", { children: [
			/* @__PURE__ */ (0, $.jsx)(a, { id: n }),
			/* @__PURE__ */ (0, $.jsx)("filter", {
				id: i,
				children: /* @__PURE__ */ (0, $.jsx)("feGaussianBlur", { stdDeviation: "25" })
			}),
			/* @__PURE__ */ (0, $.jsx)("mask", {
				id: r,
				maskUnits: "userSpaceOnUse",
				children: /* @__PURE__ */ (0, $.jsx)("rect", {
					x: "8%",
					y: "20%",
					width: "85%",
					height: "60%",
					fill: "white",
					filter: `url(#${i})`
				})
			})
		] }), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${n})`,
			mask: `url(#${r})`
		})]
	});
}
//#endregion
//#region src/react/evilcharts/registry/charts/recharts-bar-chart.tsx
var vV = 2, yV = "loading", bV = 2e3, xV = "evil-stacked", SV = .5, CV = .05, wV = [
	0,
	.7,
	.5,
	1
], TV = (0, P.createContext)(null);
function EV() {
	let e = (0, P.use)(TV);
	if (!e) throw Error("Bar chart parts (<Bar />, <XAxis />, …) must be used within <EvilBarChart />");
	return e;
}
function DV({ config: e, data: t, children: n, className: r, chartProps: i, stackType: a = "default", layout: o = "vertical", barRadius: s = vV, animationType: c = "left-to-right", barGap: l, barCategoryGap: u, backgroundVariant: d, defaultSelectedDataKey: f = null, onSelectionChange: p, isLoading: m = !1, loadingBars: h, xDataKey: g }) {
	let _ = (0, P.useId)().replace(/:/g, ""), [v] = (0, P.useState)(() => Date.now()), [y, b] = (0, P.useState)(f), [x, S] = (0, P.useState)(!1), { loadingData: C, onShimmerExit: w } = qV(m, h), { visibleData: T, brushProps: E } = hV({ data: t }), D = (0, P.useMemo)(() => {
		let e = P.Children.toArray(n), t = e.find((e) => (0, P.isValidElement)(e) && e.type === lV), r = (0, P.isValidElement)(t) ? t.props : {};
		return {
			slot: {
				present: (0, P.isValidElement)(t),
				height: r.height,
				formatLabel: r.formatLabel,
				onChange: r.onChange
			},
			chartChildren: e.filter((e) => !((0, P.isValidElement)(e) && e.type === lV))
		};
	}, [n]), O = D.slot.present, k = a === "stacked" || a === "percent", A = o === "horizontal", j = O && !m ? T : t, M = (0, P.useCallback)((e) => {
		b(e), p?.(e);
	}, [p]), N = (0, P.useMemo)(() => ({
		config: e,
		isStacked: k,
		isHorizontal: A,
		isLoading: m,
		barRadius: s,
		animationType: c,
		introStartedAt: v,
		dataLength: j.length,
		selectedDataKey: y,
		selectDataKey: M,
		isMouseInChart: x
	}), [
		e,
		k,
		A,
		m,
		s,
		c,
		v,
		j.length,
		y,
		M,
		x
	]);
	return /* @__PURE__ */ (0, $.jsx)(TV, {
		value: N,
		children: /* @__PURE__ */ (0, $.jsxs)(KB, {
			className: r,
			config: e,
			footer: O && !m && /* @__PURE__ */ (0, $.jsx)(fV, {
				data: t,
				chartConfig: e,
				xDataKey: g,
				variant: "bar",
				barRadius: s,
				height: D.slot.height,
				formatLabel: D.slot.formatLabel,
				stacked: k,
				skipStyle: !0,
				className: "mt-1",
				...E,
				onChange: (e) => {
					E.onChange(e), D.slot.onChange?.(e);
				}
			}),
			children: [/* @__PURE__ */ (0, $.jsx)(qB, { isLoading: m }), /* @__PURE__ */ (0, $.jsxs)(TB, {
				id: _,
				accessibilityLayer: !0,
				layout: A ? "vertical" : "horizontal",
				data: m ? C : j,
				barGap: l,
				barCategoryGap: u,
				stackOffset: a === "percent" ? "expand" : void 0,
				onMouseEnter: () => S(!0),
				onMouseLeave: () => S(!1),
				...i,
				children: [
					d && /* @__PURE__ */ (0, $.jsx)(_V, { variant: d }),
					/* @__PURE__ */ (0, $.jsx)(bN, { color: "white" }),
					D.chartChildren,
					m && /* @__PURE__ */ (0, $.jsx)(JV, {
						chartId: _,
						onShimmerExit: w
					})
				]
			})]
		})
	});
}
function OV({ dataKey: e, variant: t = "default", radius: n, animationType: r, isClickable: i = !1, enableHoverHighlight: a = !1, glowing: o = !1, bufferBar: s = !1, barProps: c }) {
	let { config: l, isStacked: u, isHorizontal: d, isLoading: f, barRadius: p, animationType: m, introStartedAt: h, dataLength: g, selectedDataKey: _, selectDataKey: v, isMouseInChart: y } = EV(), b = (0, P.useId)().replace(/:/g, ""), x = k();
	if (f) return null;
	let S = n ?? p, C = _ === e, w = x ? "none" : r ?? m, T = {
		id: b,
		dataKey: e,
		variant: t,
		barRadius: S,
		glowing: o,
		bufferBar: s,
		isClickable: i,
		enableHoverHighlight: a,
		isMouseInChart: y,
		isHorizontal: d,
		introStartedAt: h,
		selectedDataKey: _,
		dataLength: g,
		onClick: () => {
			i && v(C ? null : e);
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(YL, {
		dataKey: e,
		stackId: u ? xV : void 0,
		fill: `url(#${b}-colors-${e})`,
		radius: S,
		isAnimationActive: !1,
		style: i || a ? { cursor: "pointer" } : void 0,
		shape: (e) => /* @__PURE__ */ (0, $.jsx)(PV, {
			...e,
			...T,
			animationType: w
		}),
		activeBar: (e) => /* @__PURE__ */ (0, $.jsx)(PV, {
			...e,
			...T,
			animationType: "none"
		}),
		...c
	}), /* @__PURE__ */ (0, $.jsxs)("defs", { children: [
		/* @__PURE__ */ (0, $.jsx)(RV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "hatched" && /* @__PURE__ */ (0, $.jsx)(zV, {
			id: b,
			dataKey: e
		}),
		t === "duotone" && /* @__PURE__ */ (0, $.jsx)(VV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "duotone-reverse" && /* @__PURE__ */ (0, $.jsx)(HV, {
			id: b,
			dataKey: e,
			config: l
		}),
		t === "gradient" && /* @__PURE__ */ (0, $.jsx)(UV, {
			id: b,
			dataKey: e
		}),
		t === "stripped" && /* @__PURE__ */ (0, $.jsx)(WV, {
			id: b,
			dataKey: e
		}),
		s && /* @__PURE__ */ (0, $.jsx)(BV, {
			id: b,
			dataKey: e
		}),
		o && /* @__PURE__ */ (0, $.jsx)(GV, {
			id: b,
			dataKey: e
		})
	] })] });
}
function kV({ tickLine: e = !1, axisLine: t = !1, tickMargin: n = 8, minTickGap: r = 8, type: i, ...a }) {
	let { isLoading: o, isHorizontal: s } = EV();
	return o ? null : /* @__PURE__ */ (0, $.jsx)(gR, {
		tickLine: e,
		axisLine: t,
		tickMargin: n,
		minTickGap: r,
		type: i ?? (s ? "number" : "category"),
		...a
	});
}
function AV({ tickLine: e = !1, axisLine: t = !1, tickMargin: n = 8, minTickGap: r = 8, width: i = "auto", type: a, ...o }) {
	let { isLoading: s, isHorizontal: c } = EV();
	return s ? null : /* @__PURE__ */ (0, $.jsx)(jR, {
		tickLine: e,
		axisLine: t,
		tickMargin: n,
		minTickGap: r,
		width: i,
		type: a ?? (c ? "category" : "number"),
		...o
	});
}
function jV({ strokeDasharray: e = "3 3", vertical: t, horizontal: n, ...r }) {
	let { isHorizontal: i } = EV();
	return /* @__PURE__ */ (0, $.jsx)(UP, {
		strokeDasharray: e,
		vertical: t ?? i,
		horizontal: n ?? !i,
		...r
	});
}
function MV({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, selectedDataKey: i } = EV();
	return r ? null : /* @__PURE__ */ (0, $.jsx)(rV, {
		cursor: !1,
		defaultIndex: n,
		content: /* @__PURE__ */ (0, $.jsx)(tV, {
			selected: i,
			roundness: t,
			variant: e
		})
	});
}
function NV({ variant: e, align: t = "right", verticalAlign: n = "top", isClickable: r = !1 }) {
	let { selectedDataKey: i, selectDataKey: a } = EV();
	return /* @__PURE__ */ (0, $.jsx)(cV, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, $.jsx)(iV, {
			selected: i,
			onSelectChange: a,
			isClickable: r,
			variant: e
		})
	});
}
var PV = (e) => {
	let { x: t = 0, y: n = 0, width: r = 0, height: i = 0, id: a, dataKey: o, variant: s, barRadius: c, glowing: l, bufferBar: u, isClickable: d, enableHoverHighlight: f, isMouseInChart: p, isHorizontal: m = !1, animationType: h = "none", introStartedAt: g = 0, selectedDataKey: _, isActive: y, dataLength: b = 0, onClick: x } = e, S = typeof e.index == "number" ? e.index : -1, C = u && b > 0 && S === b - 1, w = s === "stripped", T = FV(h, S, b, m, g), E = C ? `url(#${a}-buffer-hatched-${o})` : IV(s, a, o), D = l ? `url(#${a}-bar-glow-${o})` : void 0, O = LV({
		isClickable: d,
		selectedDataKey: _,
		dataKey: o,
		enableHoverHighlight: f,
		isMouseInChart: p,
		isActive: y
	}), k = d || f ? { cursor: "pointer" } : void 0, A = w ? [
		c,
		c,
		0,
		0
	] : c, j = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(sm, {
		x: t,
		y: n,
		width: r,
		opacity: O,
		height: Math.max(0, i - 3),
		radius: A,
		fill: E,
		filter: D,
		stroke: C ? `url(#${a}-colors-${o})` : void 0,
		strokeWidth: C ? 1 : void 0
	}), w && /* @__PURE__ */ (0, $.jsx)(sm, {
		x: t,
		y: n - 4,
		width: r,
		height: 2,
		radius: 1,
		fill: `url(#${a}-colors-${o})`
	})] });
	return /* @__PURE__ */ (0, $.jsxs)("g", {
		style: k,
		onClick: x,
		children: [/* @__PURE__ */ (0, $.jsx)(sm, {
			...e,
			fill: "transparent"
		}), T ? /* @__PURE__ */ (0, $.jsx)(v.g, {
			initial: T.initial,
			animate: T.animate,
			transition: T.transition,
			style: T.style,
			children: j
		}) : j]
	});
}, FV = (e, t, n, r, i) => {
	if (e === "none" || t < 0 || n <= 0) return null;
	let a = n - 1, o = a / 2, s;
	switch (e) {
		case "right-to-left":
			s = a - t;
			break;
		case "center-out":
			s = Math.abs(t - o);
			break;
		case "edges-in":
			s = o - Math.abs(t - o);
			break;
		default: s = t;
	}
	let c = s * CV * 1e3, l = SV * 1e3, u = c + l, d = Date.now() - i;
	if (d >= u) return null;
	let f = d <= c ? 0 : (d - c) / l, p = {
		duration: (u - Math.max(d, c)) / 1e3,
		ease: wV,
		delay: Math.max(0, c - d) / 1e3
	};
	return r ? {
		initial: { scaleX: f },
		animate: { scaleX: 1 },
		transition: p,
		style: { originX: 0 }
	} : {
		initial: { scaleY: f },
		animate: { scaleY: 1 },
		transition: p,
		style: { originY: 1 }
	};
}, IV = (e, t, n) => {
	switch (e) {
		case "hatched": return `url(#${t}-hatched-${n})`;
		case "duotone": return `url(#${t}-duotone-${n})`;
		case "duotone-reverse": return `url(#${t}-duotone-reverse-${n})`;
		case "gradient": return `url(#${t}-gradient-${n})`;
		case "stripped": return `url(#${t}-stripped-${n})`;
		default: return `url(#${t}-colors-${n})`;
	}
}, LV = ({ isClickable: e, selectedDataKey: t, dataKey: n, enableHoverHighlight: r, isMouseInChart: i, isActive: a }) => {
	let o = e && t !== null ? t === null || t === n ? 1 : .15 : 1;
	return r && i ? a ? o : o * .3 : o;
}, RV = ({ id: e, dataKey: t, config: n }) => {
	let r = ZB(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${t}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${t}-0)`
		})] }) : Array.from({ length: r }, (e, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
			}, i);
		})
	});
}, zV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("pattern", {
		id: `${e}-hatched-mask-pattern`,
		x: "0",
		y: "0",
		width: "5",
		height: "5",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(-45)",
		children: [/* @__PURE__ */ (0, $.jsx)("rect", {
			width: "5",
			height: "5",
			fill: "white",
			fillOpacity: .3
		}), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "1.5",
			height: "5",
			fill: "white",
			fillOpacity: 1
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-hatched-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-hatched-mask-pattern)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-hatched-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-hatched-mask-${t})`
		})
	})
] }), BV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("pattern", {
		id: `${e}-buffer-hatched-mask-pattern`,
		x: "0",
		y: "0",
		width: "5",
		height: "5",
		patternUnits: "userSpaceOnUse",
		patternTransform: "rotate(-45)",
		children: [/* @__PURE__ */ (0, $.jsx)("rect", {
			width: "5",
			height: "5",
			fill: "black",
			fillOpacity: 0
		}), /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "1",
			height: "5",
			fill: "white",
			fillOpacity: 1
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-buffer-hatched-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-buffer-hatched-mask-pattern)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-buffer-hatched-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-buffer-hatched-mask-${t})`
		})
	})
] }), VV = ({ id: e, dataKey: t, config: n }) => {
	let r = ZB(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
			id: `${e}-duotone-mask-gradient-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: .4
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: 1
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-duotone-colors-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "0%",
				stopColor: `var(--color-${t}-0)`
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "100%",
				stopColor: `var(--color-${t}-0)`
			})] }) : Array.from({ length: r }, (e, n) => {
				let i = `${n / (r - 1) * 100}%`;
				return /* @__PURE__ */ (0, $.jsx)("stop", {
					offset: i,
					stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
				}, i);
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-duotone-mask-${t}`,
			maskContentUnits: "objectBoundingBox",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-mask-gradient-${t})`
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-duotone-${t}`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			width: "1",
			height: "1",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-colors-${t})`,
				mask: `url(#${e}-duotone-mask-${t})`
			})
		})
	] });
}, HV = ({ id: e, dataKey: t, config: n }) => {
	let r = ZB(n[t] ?? {});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
			id: `${e}-duotone-reverse-mask-gradient-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: 1
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "50%",
				stopColor: "white",
				stopOpacity: .4
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-duotone-reverse-colors-${t}`,
			gradientUnits: "objectBoundingBox",
			x1: "0",
			y1: "0",
			x2: "0",
			y2: "1",
			children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "0%",
				stopColor: `var(--color-${t}-0)`
			}), /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: "100%",
				stopColor: `var(--color-${t}-0)`
			})] }) : Array.from({ length: r }, (e, n) => {
				let i = `${n / (r - 1) * 100}%`;
				return /* @__PURE__ */ (0, $.jsx)("stop", {
					offset: i,
					stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
				}, i);
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-duotone-reverse-mask-${t}`,
			maskContentUnits: "objectBoundingBox",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-reverse-mask-gradient-${t})`
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-duotone-reverse-${t}`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			width: "1",
			height: "1",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				x: "0",
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-duotone-reverse-colors-${t})`,
				mask: `url(#${e}-duotone-reverse-mask-${t})`
			})
		})
	] });
}, UV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${e}-gradient-mask-gradient`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "20%",
			stopColor: "white",
			stopOpacity: 1
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "90%",
			stopColor: "white",
			stopOpacity: 0
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-gradient-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-gradient-mask-gradient)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-gradient-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-gradient-mask-${t})`
		})
	})
] }), WV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
	/* @__PURE__ */ (0, $.jsxs)("linearGradient", {
		id: `${e}-stripped-mask-gradient`,
		x1: "0",
		y1: "0",
		x2: "0",
		y2: "1",
		children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: "white",
			stopOpacity: .2
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: "white",
			stopOpacity: .2
		})]
	}),
	/* @__PURE__ */ (0, $.jsx)("mask", {
		id: `${e}-stripped-mask-${t}`,
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-stripped-mask-gradient)`
		})
	}),
	/* @__PURE__ */ (0, $.jsx)("pattern", {
		id: `${e}-stripped-${t}`,
		patternUnits: "userSpaceOnUse",
		width: "100%",
		height: "100%",
		children: /* @__PURE__ */ (0, $.jsx)("rect", {
			width: "100%",
			height: "100%",
			fill: `url(#${e}-colors-${t})`,
			mask: `url(#${e}-stripped-mask-${t})`
		})
	})
] }), GV = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, $.jsxs)("filter", {
	id: `${e}-bar-glow-${t}`,
	x: "-100%",
	y: "-100%",
	width: "300%",
	height: "300%",
	children: [
		/* @__PURE__ */ (0, $.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "8",
			result: "blur"
		}),
		/* @__PURE__ */ (0, $.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0\n                0 1 0 0 0\n                0 0 1 0 0\n                0 0 0 0.5 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, $.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}), KV = (e = 17, t = .05, n = .9) => Array.from({ length: e }, (r, i) => {
	let a = i / (e - 1), o = t + Math.sin(a * Math.PI) ** 2 * (n - t);
	return {
		offset: `${(a * 100).toFixed(0)}%`,
		opacity: Number(o.toFixed(3))
	};
});
function qV(e, t = 12) {
	let [n, r] = (0, P.useState)(!1), i = (0, P.useCallback)(() => {
		e && r((e) => !e);
	}, [e]);
	return {
		loadingData: (0, P.useMemo)(() => QB(t, 20, 80), [t, n]),
		onShimmerExit: i
	};
}
var JV = ({ chartId: e, onShimmerExit: t }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(YL, {
	dataKey: yV,
	fill: "currentColor",
	fillOpacity: .15,
	radius: vV,
	isAnimationActive: !1,
	legendType: "none",
	style: { mask: `url(#${e}-loading-mask)` }
}), /* @__PURE__ */ (0, $.jsx)("defs", { children: /* @__PURE__ */ (0, $.jsx)(YV, {
	chartId: e,
	onShimmerExit: t
}) })] }), YV = ({ chartId: e, onShimmerExit: t }) => {
	let n = KV(), r = (0, P.useRef)(-1);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)("linearGradient", {
			id: `${e}-loading-mask-gradient`,
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "0",
			children: n.map(({ offset: e, opacity: t }) => /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: e,
				stopColor: "white",
				stopOpacity: t
			}, e))
		}),
		/* @__PURE__ */ (0, $.jsx)("pattern", {
			id: `${e}-loading-mask-pattern`,
			patternUnits: "objectBoundingBox",
			patternContentUnits: "objectBoundingBox",
			patternTransform: "rotate(25)",
			width: 3,
			height: "1",
			x: "0",
			y: "0",
			children: /* @__PURE__ */ (0, $.jsx)(v.rect, {
				y: "0",
				width: "1",
				height: "1",
				fill: `url(#${e}-loading-mask-gradient)`,
				initial: { x: -1 },
				animate: { x: 2 },
				transition: {
					duration: bV / 1e3,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop"
				},
				onUpdate: (e) => {
					let n = typeof e.x == "number" ? e.x : -1, i = r.current;
					n >= 1 && i < 1 && t(), r.current = n;
				}
			})
		}),
		/* @__PURE__ */ (0, $.jsx)("mask", {
			id: `${e}-loading-mask`,
			maskUnits: "userSpaceOnUse",
			children: /* @__PURE__ */ (0, $.jsx)("rect", {
				width: "100%",
				height: "100%",
				fill: `url(#${e}-loading-mask-pattern)`
			})
		})
	] });
};
DV.Bar = OV, DV.XAxis = kV, DV.YAxis = AV, DV.Grid = jV, DV.Tooltip = MV, DV.Legend = NV, DV.Brush = lV;
//#endregion
//#region src/react/charts/chart-card.tsx
var XV = `${c({ radius: "chart" })} flex flex-col gap-4 max-sm:p-4`;
function ZV({ title: e, children: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: XV,
		"aria-label": e,
		children: [/* @__PURE__ */ (0, $.jsx)("h3", {
			className: "text-title-2-medium text-text-primary",
			children: e
		}), /* @__PURE__ */ (0, $.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: t
		})]
	});
}
var QV = (e) => (e.codePointAt(0) ?? 0) > 11903 ? 13 : 7, $V = (e) => [...new Intl.Segmenter(void 0, { granularity: "grapheme" }).segment(e)].map((e) => e.segment), eH;
function tH(e) {
	if (eH === void 0) try {
		eH = document.createElement("canvas").getContext("2d"), eH && (eH.font = `12px ${getComputedStyle(document.body).fontFamily || "sans-serif"}`);
	} catch {
		eH = null;
	}
	return eH ? eH.measureText(e).width : null;
}
var nH = (e) => tH(e) ?? $V(e).reduce((e, t) => e + QV(t), 0);
function rH(e, t) {
	if (nH(e) <= t) return e;
	let n = $V(e), r = 0;
	for (; r < n.length && nH(`${n.slice(0, r + 1).join("")}…`) <= t;) r += 1;
	return `${n.slice(0, r).join("")}…`;
}
var iH = (e, t = 104) => Math.min(t, Math.max(24, ...e.map(nH)) + 12);
function aH(e) {
	let { along: t, payload: n, width: r = 0, visibleTicksCount: i = 1, ...a } = e, o = String(n?.value ?? ""), s = t === "x" ? r / Math.max(1, i) - 2 : r - 8;
	return /* @__PURE__ */ (0, $.jsxs)("g", { children: [/* @__PURE__ */ (0, $.jsx)("title", { children: o }), /* @__PURE__ */ (0, $.jsx)(DO, {
		...a,
		children: rH(o, s)
	})] });
}
function oH({ title: e, figure: t, note: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("header", {
		className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
		children: [/* @__PURE__ */ (0, $.jsxs)("span", {
			className: "flex min-w-0 flex-col gap-1",
			children: [/* @__PURE__ */ (0, $.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: e
			}), /* @__PURE__ */ (0, $.jsx)("b", {
				className: "text-display-4-medium tabular-nums text-text-primary",
				children: t
			})]
		}), /* @__PURE__ */ (0, $.jsx)("small", {
			className: "min-w-0 text-caption-1-regular break-words text-text-secondary",
			children: n
		})]
	});
}
var sH = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)",
	"var(--color-chart-6)"
], cH = (e) => ({ light: [e] }), lH = (e) => `s${e}`;
function uH(e) {
	return Object.fromEntries(e.map((e, t) => [lH(t), {
		label: e,
		colors: cH(sH[t % sH.length])
	}]));
}
//#endregion
//#region src/react/charts/chart-tip.tsx
var dH = "flex min-w-32 flex-col gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl";
function fH({ swatch: e, name: t, value: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex w-full items-center gap-2",
		children: [e, /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex flex-1 items-center justify-between gap-4 leading-none",
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-muted-foreground",
				children: t
			}), /* @__PURE__ */ (0, $.jsx)("span", {
				className: "font-mono font-medium tabular-nums text-foreground",
				children: n.toLocaleString()
			})]
		})]
	});
}
var pH = "size-2.5 shrink-0 rounded-xs";
function mH({ active: e, payload: t, label: n, nameKey: r, valueKey: i, hideLabel: a }) {
	let { config: o } = GB(), s = (t ?? []).filter((e) => e.type !== "none");
	if (!e || !s.length) return /* @__PURE__ */ (0, $.jsx)("span", { className: "p-4" });
	let c = a || typeof n != "string" ? null : o[n]?.label ?? n;
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: dH,
		children: [c ? /* @__PURE__ */ (0, $.jsx)("div", {
			className: "font-medium text-foreground",
			children: c
		}) : null, s.map((e, t) => {
			let n = e.payload ?? {}, a = `${(r ? n[r] : void 0) ?? e.name ?? e.dataKey ?? "value"}`, s = XB(o, e, a), c = i ? n[i] : e.value;
			return /* @__PURE__ */ (0, $.jsx)(fH, {
				name: s?.label ?? e.name,
				value: Number(c ?? 0),
				swatch: /* @__PURE__ */ (0, $.jsx)("i", {
					className: pH,
					style: { background: `var(--color-${a}-0)` }
				})
			}, a + t);
		})]
	});
}
function hH({ nameKey: e, valueKey: t, hideLabel: n }) {
	return /* @__PURE__ */ (0, $.jsx)(rV, {
		cursor: !1,
		content: /* @__PURE__ */ (0, $.jsx)(mH, {
			nameKey: e,
			valueKey: t,
			hideLabel: n
		})
	});
}
//#endregion
//#region src/react/charts/bar-card.tsx
var gH = [0, (e) => e * 1.2];
function _H(e) {
	let t = Math.abs(e), n = (t, n) => {
		let r = e / t;
		return `${r.toLocaleString(void 0, { maximumFractionDigits: +(Math.abs(r) < 100) })}${n}`;
	};
	return t >= 1e8 ? n(1e8, "亿") : t >= 1e5 ? n(1e4, "万") : e.toLocaleString();
}
var vH = (e) => ({
	position: e,
	className: "fill-text-secondary",
	formatter: (e) => _H(Number(e))
});
function yH({ title: e, unit: t, series: n, rows: r, color: i, empty: a, layout: o = "vertical" }) {
	let s = r.filter((e) => Number.isFinite(e.value) && e.value >= 0).map((e) => ({
		name: e.name,
		value: e.value
	})), c = s.reduce((e, t) => e + t.value, 0);
	if (!c) return /* @__PURE__ */ (0, $.jsx)(ZV, {
		title: e,
		children: a
	});
	let l = o === "horizontal";
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: XV,
		"aria-label": e,
		children: [/* @__PURE__ */ (0, $.jsx)(oH, {
			title: e,
			figure: c.toLocaleString(),
			note: t
		}), /* @__PURE__ */ (0, $.jsxs)(DV, {
			data: s,
			config: { value: {
				label: n,
				colors: cH(i)
			} },
			layout: o,
			barRadius: 4,
			chartProps: l ? { margin: {
				top: 5,
				right: 56,
				bottom: 5,
				left: 5
			} } : void 0,
			className: l ? "aspect-auto h-64 flex-none text-text-secondary" : "aspect-auto h-56 flex-none text-text-secondary",
			children: [
				/* @__PURE__ */ (0, $.jsx)(DV.Grid, {}),
				l ? /* @__PURE__ */ (0, $.jsx)(DV.YAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, $.jsx)(aH, { along: "y" }),
					width: iH(s.map((e) => e.name))
				}) : /* @__PURE__ */ (0, $.jsx)(DV.XAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, $.jsx)(aH, { along: "x" })
				}),
				l ? /* @__PURE__ */ (0, $.jsx)(DV.XAxis, {
					hide: !0,
					domain: gH
				}) : /* @__PURE__ */ (0, $.jsx)(DV.YAxis, {
					hide: !0,
					domain: gH
				}),
				/* @__PURE__ */ (0, $.jsx)(DV.Bar, {
					dataKey: "value",
					enableHoverHighlight: !0,
					barProps: {
						dataKey: "value",
						label: vH(l ? "right" : "top")
					}
				}),
				/* @__PURE__ */ (0, $.jsx)(hH, {})
			]
		})]
	});
}
//#endregion
//#region src/react/charts/heat.ts
var bH = [
	"周一",
	"周二",
	"周三",
	"周四",
	"周五",
	"周六",
	"周日"
], xH = (e, t) => e ? Math.max(.12, e / t) : 0;
function SH(e) {
	let t = Array.from({ length: 7 }, () => Array(24).fill(0));
	for (let n of e?.hours || []) {
		let { weekday: e, hour: r, count: i } = n;
		!Number.isInteger(e) || e < 0 || e > 6 || !Number.isInteger(r) || r < 0 || r > 23 || !Number.isFinite(i) || i < 0 || (t[e][r] = (t[e][r] || 0) + i);
	}
	let n = t.flat(), r = Math.max(1, ...n);
	return {
		cells: t.flatMap((e, t) => e.map((e, n) => ({
			key: `${t}-${n}`,
			label: `${bH[t]} ${n}:00`,
			count: e,
			share: xH(e, r)
		}))),
		total: n.reduce((e, t) => e + t, 0)
	};
}
function CH(e) {
	let t = (e?.days || []).filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date) && Number.isFinite(e.count) && e.count >= 0).slice().sort((e, t) => e.date.localeCompare(t.date)), n = {
		cells: [],
		total: 0,
		start: "",
		end: ""
	};
	if (!t.length) return n;
	let r = /* @__PURE__ */ new Date(`${t.at(-1).date}T00:00:00Z`), i = new Date(r);
	i.setUTCDate(i.getUTCDate() - 90);
	let a = new Map(t.map((e) => [e.date, e.count])), o = Math.max(1, ...t.map((e) => e.count)), s = Array.from({ length: 91 }, (e, t) => {
		let n = new Date(i);
		n.setUTCDate(i.getUTCDate() + t);
		let r = n.toISOString().slice(0, 10), s = a.get(r) || 0;
		return {
			key: r,
			label: r,
			count: s,
			share: xH(s, o)
		};
	});
	return {
		cells: s,
		total: s.reduce((e, t) => e + t.count, 0),
		start: i.toISOString().slice(0, 10),
		end: t.at(-1).date
	};
}
//#endregion
//#region src/react/charts/heat-card.tsx
var wH = 14, TH = 17, EH = {
	4: {
		fill: "fill-chart-4",
		dot: "bg-chart-4"
	},
	5: {
		fill: "fill-chart-5",
		dot: "bg-chart-5"
	}
}, DH = {
	start: "translate-x-0",
	center: "-translate-x-1/2",
	end: "-translate-x-full"
};
function OH({ cell: e, series: t, tone: n, left: r, top: i, anchor: a }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-hidden": !0,
		style: {
			left: `${r}%`,
			top: `${i}%`
		},
		className: `pointer-events-none absolute z-10 -mt-2 -translate-y-full ${dH} ${DH[a]}`,
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			className: "font-medium text-foreground",
			children: e.label
		}), /* @__PURE__ */ (0, $.jsx)(fH, {
			name: t,
			value: e.count,
			swatch: /* @__PURE__ */ (0, $.jsx)("i", { className: `${pH} ${EH[n].dot}` })
		})]
	});
}
function kH({ title: e, words: t, cells: n, total: r, columns: i, rows: a, axis: o, footer: s, tone: c }) {
	let [l, u] = (0, P.useState)(-1), d = o ? 30 : 0, f = o ? 18 : 0, p = d + i * TH, m = f + a * TH, h = (e) => ({
		x: d + e % i * TH,
		y: f + Math.floor(e / i) * TH
	}), g = n[l], _ = g ? h(l) : null, v = _ ? (_.x + wH / 2) / p : 0, y = v < .1 ? "start" : v > .9 ? "end" : "center", b = _ ? {
		start: _.x,
		center: _.x + wH / 2,
		end: _.x + wH
	}[y] : 0;
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: XV,
		children: [
			/* @__PURE__ */ (0, $.jsx)(oH, {
				title: e,
				figure: (g ? g.count : r).toLocaleString(),
				note: g ? g.label : t.unit
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, $.jsx)("div", {
					className: "min-w-0 overflow-x-auto",
					children: /* @__PURE__ */ (0, $.jsxs)("svg", {
						role: "img",
						"aria-label": e,
						onPointerLeave: () => u(-1),
						viewBox: `0 0 ${p} ${m}`,
						className: o ? "block h-auto min-w-80 w-full" : "block h-auto w-full",
						children: [o, n.map((e, n) => {
							let { x: r, y: i } = h(n);
							return /* @__PURE__ */ (0, $.jsx)("rect", {
								tabIndex: 0,
								role: "img",
								"aria-label": `${e.label}，${e.count} ${t.cellUnit}`,
								x: r,
								y: i,
								width: wH,
								height: wH,
								rx: 3,
								fillOpacity: e.share || 1,
								opacity: l >= 0 && l !== n ? .4 : 1,
								className: e.share ? `outline-none transition-opacity duration-200 focus-visible:stroke-border-focus-ring ${EH[c].fill}` : "fill-chart-track outline-none transition-opacity duration-200 focus-visible:stroke-border-focus-ring",
								onPointerEnter: () => u(n),
								onFocus: () => u(n),
								onBlur: () => u(-1)
							}, e.key);
						})]
					})
				}), g && _ ? /* @__PURE__ */ (0, $.jsx)(OH, {
					cell: g,
					series: t.series,
					tone: c,
					anchor: y,
					left: b / p * 100,
					top: _.y / m * 100
				}) : null]
			}),
			/* @__PURE__ */ (0, $.jsx)("footer", {
				className: "flex flex-wrap justify-between gap-3 text-caption-1-regular text-text-secondary",
				children: s
			})
		]
	});
}
var AH = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [bH.map((e, t) => /* @__PURE__ */ (0, $.jsx)("text", {
	x: 0,
	y: 18 + t * TH + 7,
	dominantBaseline: "middle",
	className: "fill-text-secondary text-caption-1-regular",
	children: e
}, e)), Array.from({ length: 24 }, (e, t) => t % 2 ? null : /* @__PURE__ */ (0, $.jsx)("text", {
	x: 30 + t * TH,
	y: 8,
	dominantBaseline: "middle",
	className: "fill-text-secondary text-caption-1-regular",
	children: t
}, t))] });
function jH({ activity: e, title: t, dailyTitle: n, words: r, tone: i, empty: a }) {
	let o = SH(e), s = CH(e);
	return s.cells.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "inline-grid w-full items-start gap-5 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, $.jsx)(kH, {
			title: t,
			words: r,
			tone: i,
			cells: o.cells,
			total: o.total,
			columns: 24,
			rows: 7,
			axis: AH,
			footer: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("span", { children: "星期 × 小时" }), /* @__PURE__ */ (0, $.jsx)("span", { children: e?.timezone || "UTC+08:00" })] })
		}), /* @__PURE__ */ (0, $.jsx)(kH, {
			title: n,
			words: r,
			tone: i,
			cells: s.cells,
			total: s.total,
			columns: 13,
			rows: 7,
			footer: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("span", { children: s.start }), /* @__PURE__ */ (0, $.jsx)("span", { children: s.end })] })
		})]
	}) : /* @__PURE__ */ (0, $.jsx)(ZV, {
		title: t,
		children: a
	});
}
//#endregion
//#region src/react/components/expandable-ranking.tsx
function MH({ children: e, className: t = "", previewCount: n = 10 }) {
	let r = (0, P.useId)(), i = (0, P.useRef)(null), [a, o] = (0, P.useState)(!1), [s, c] = (0, P.useState)(!1), l = P.Children.toArray(e), u = l.length > n;
	(0, P.useLayoutEffect)(() => {
		let e = i.current;
		if (!e || !u) return;
		let t = () => {
			let t = e.children[Math.min(n, e.children.length) - 1];
			t && e.offsetWidth && (e.style.setProperty("--ranking-collapsed-height", `${t.offsetTop - e.offsetTop + t.offsetHeight}px`), e.style.setProperty("--ranking-expanded-height", `${e.scrollHeight}px`));
		};
		t();
		let r = new ResizeObserver(t);
		return r.observe(e), () => r.disconnect();
	}, [
		u,
		n,
		l.length
	]);
	let d = l.map((e, t) => !(0, P.isValidElement)(e) || t < n ? e : (0, P.cloneElement)(e, { inert: !a || void 0 }));
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-expandable-ranking": !0,
		"data-expandable": u || void 0,
		"data-expanded": a || void 0,
		"data-animating": s || void 0,
		children: [/* @__PURE__ */ (0, $.jsx)("ol", {
			id: r,
			ref: i,
			"data-expandable-ranking-list": !0,
			className: t,
			onTransitionEnd: (e) => {
				e.target === i.current && e.propertyName === "max-height" && c(!1);
			},
			children: d
		}), u ? /* @__PURE__ */ (0, $.jsx)("button", {
			type: "button",
			"data-ranking-toggle": !0,
			"aria-controls": r,
			"aria-expanded": a,
			"aria-label": a ? "收起排名" : "展开更多排名",
			onClick: () => {
				c(!0), o((e) => !e);
			},
			children: /* @__PURE__ */ (0, $.jsx)(f, { "aria-hidden": !0 })
		}) : null]
	});
}
//#endregion
export { vM as ActivePoints, jH as ActivityHeat, pj as AnimatedItems, gH as BAR_DOMAIN, yH as BarCard, XV as CHART_CARD, sH as CHART_COLORS, lk as CartesianLabelListContextProvider, aH as CategoryTick, mD as Cell, _V as ChartBackground, KB as ChartContainer, ZV as ChartEmpty, oH as ChartHead, cV as ChartLegend, iV as ChartLegendContent, hH as ChartTip, rV as ChartTooltip, tV as ChartTooltipContent, Y as DefaultZIndexes, Kj as Dots, DV as EvilBarChart, MH as ExpandableRanking, hk as LabelListFromLabelProp, F as Layer, qB as LoadingIndicator, yA as PolarAngleAxis, LB as PolarChart, HO as PolarLabelContextProvider, tk as PolarLabelFromLabelProp, dk as PolarLabelListContextProvider, Ek as Polygon, Cj as RegisterGraphicalItemId, Rm as Sector, Pj as SetPolarGraphicalItem, WA as SetPolarLegendPayload, HA as SetTooltipEntrySettings, RA as Shape, DO as Text, mE as ZIndexLayer, wr as adaptEventsOfChild, Kk as addRadiusAxis, AE as arrayTooltipSearcher, vH as barLabel, iH as categoryAxisWidth, BB as cn, NM as combineAllBarPositions, FM as combineBarPosition, EM as combineBarSizeList, ng as combineDisplayedStackedData, yS as combineStackGroups, PM as combineStackedData, H as createSelector, IB as defaultPolarChartProps, Nh as defaultPolarRadiusAxisProps, EA as findAllByType, rH as fitLabel, Fh as getAxisTypeBasedOnLayout, ll as getBandSizeOfAxis, rl as getBaseValueOfBar, nl as getCateCoordinateOfBar, Zk as getClassNameFromUnknown, ZB as getColorsCount, el as getNormalizedStackId, dl as getTooltipNameProp, K as getValueByDataKey, IM as getZIndexFromUnknown, Gr as identity, L as interpolate, qr as isArrayLike, Jc as isCategoricalAxis, R as isNullish, rg as isStacked, Yi as iteratee, ij as matchAnimationItems, QA as matchAppend, ZA as matchByIndex, mt as mathSign, Tt as noop, gm as polarToCartesian, qk as removeRadiusAxis, Ar as resolveDefaultProps, uT as selectActiveTooltipIndex, Uh as selectAngleAxis, Ch as selectBarCategoryGap, Sh as selectBarGap, Wm as selectChartDataAndAlwaysIgnoreIndexes, Um as selectChartDataWithIndexes, q as selectChartLayout, zk as selectPolarAxisScale, Vk as selectPolarAxisTicks, Uk as selectPolarGraphicalItemAxisTicks, Ak as selectPolarItemsSettings, $h as selectPolarViewBox, Wh as selectRadiusAxis, Eh as selectReverseStackOrder, wh as selectRootBarSize, xh as selectRootMaxBarSize, Th as selectStackOffsetType, gS as selectTooltipAxis, kk as selectUnfilteredPolarItems, uH as sliceConfig, lH as sliceKey, Ue as svgPropertiesAndEvents, Ve as svgPropertiesNoEvents, He as svgPropertiesNoEventsFromUnknown, cH as tone, Zc as truncateByDomain, fj as useAnimationCallbacks, aj as useAnimationStartSnapshot, B as useAppDispatch, V as useAppSelector, Fl as useIsPanorama, VA as useMouseClickItemDispatch, zA as useMouseEnterItemDispatch, BA as useMouseLeaveItemDispatch, Eu as usePolarChartLayout };

//# debugId=1d145860-18b0-4d5f-a44a-69dd60a675da