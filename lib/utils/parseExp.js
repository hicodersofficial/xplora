/**
 * @fileoverview operator parser >= > <= < =.
 * @author Priyanshu raj
 */

"use strict";

/**
 * Split expression from string.
 * e.g: `">=100 | <=200"`, `"<=100"`
 * @param {String} exps
 * @returns {Boolean}
 */
function expParser(exps, value, isDate = false) {
  const twoExpSplit = exps.split("|");
  const isTwoExp = twoExpSplit.length === 2;
  if (isTwoExp) {
    const exp1 = getExp(twoExpSplit[0]);
    const exp2 = getExp(twoExpSplit[1]);

    if (isDate) {
      // eslint-disable-next-line no-unused-vars
      const val = new Date(value);
      // eslint-disable-next-line no-unused-vars
      const expVal1 = new Date(exp1.value);
      // eslint-disable-next-line no-unused-vars
      const expVal2 = new Date(exp2.value);

      const expString = `val${exp1.operator}expVal1 && val${exp2.operator}expVal2`;
      return eval(expString);
    }
    const expString =
      value +
      exp1.operator +
      exp1.value +
      "&&" +
      value +
      exp2.operator +
      exp2.value;
    return eval(expString);
  }
  const exp = getExp(exps);
  if (isDate) {
    // eslint-disable-next-line no-unused-vars
    const val = new Date(value);
    // eslint-disable-next-line no-unused-vars
    const expVal = new Date(exp.value);
    const expString = `val${exp.operator}expVal`;
    return eval(expString);
  }
  const expString = value + exp.operator + exp.value;
  return eval(expString);
}

/**
 * Parse logical operator from expression
 * of type string. e.g: `">=100"`, `"<=100"`,  `"==100"`
 * @param {String} exp
 * @returns {Object}
 */
function getExp(exp) {
  let gt = ">",
    gte = ">=",
    lt = "<",
    lte = "<=",
    eq = "==";

  const gtes = exp.split(gte);
  const gts = exp.split(gt);
  const ltes = exp.split(lte);
  const lts = exp.split(lt);
  const eqs = exp.split(eq);

  const finalExp = {
    operator: null,
    value: null,
  };

  if (gtes.length === 2) {
    finalExp.operator = gte;
    finalExp.value = exp.replaceAll(gte, "");
  } else if (gts.length === 2) {
    finalExp.operator = gt;
    finalExp.value = exp.replaceAll(gt, "");
  } else if (ltes.length === 2) {
    finalExp.operator = lte;
    finalExp.value = exp.replaceAll(lte, "");
  } else if (lts.length === 2) {
    finalExp.operator = lt;
    finalExp.value = exp.replaceAll(lt, "");
  } else if (eqs.length === 2) {
    finalExp.operator = eq;
    finalExp.value = exp.replaceAll(eq, "");
  } else {
    finalExp.operator = ">=";
    finalExp.value = exp;
  }

  return finalExp;
}

module.exports = expParser;
