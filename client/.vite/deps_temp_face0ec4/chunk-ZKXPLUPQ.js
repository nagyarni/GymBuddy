import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_esm,
  init_identifier,
  useTheme_default
} from "./chunk-TJB7JSKC.js";
import {
  __toESM,
  require_react
} from "./chunk-W4VDMLRG.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_esm();
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-ZKXPLUPQ.js.map
