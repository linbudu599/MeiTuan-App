"use strict";
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  plugins: ["stylelint-order"],
  rules: {
    "at-rule-no-unknown": null,
    "no-empty-source": null,
    "no-descending-specificity": null
    // "no-descending-specificity": null,
    // "plugin/declaration-block-no-ignored-properties": true
  }
};
