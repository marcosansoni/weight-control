"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsStaticVariantContext = exports.WrapperVariantContext = void 0;

var React = _interopRequireWildcard(require("react"));

/**
 * TODO consider getting rid from wrapper variant
 * @ignore - internal component.
 */
const WrapperVariantContext = /*#__PURE__*/React.createContext(null);
/**
 * @ignore - internal component.
 */

exports.WrapperVariantContext = WrapperVariantContext;
const IsStaticVariantContext = /*#__PURE__*/React.createContext(false);
exports.IsStaticVariantContext = IsStaticVariantContext;