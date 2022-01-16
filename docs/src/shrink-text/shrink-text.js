"use strict";

/*
要素にテキスト幅を合わせる
参考：https://tercel-tech.hatenablog.com/entry/2019/07/13/183259
*/
class ShrinkText {
  constructor(option) {
      
    this.option = Object.assign({ targetClassName: ".shrink-text" }, option);

    const inisializeElement = () => {
      const elements = document.querySelectorAll(this.option.targetClassName);

      elements.forEach((element) => {
        const hostElement   = element;
        const parentElement = element.parentNode;
        const xPadding = getXPadding(parentElement);
        const width = getConstraintWidth(parentElement);
        update(width, xPadding, hostElement);
      });
    };
    document.addEventListener("DOMContentLoaded", inisializeElement);

    const update = (constraintWidth, outerElementXPadding, hostElement) => {
      if (!(0 < constraintWidth)) {
        hostElement.style.display = "none";
        return;
      }
      resetStyles(hostElement);
      const width = getConstraintWidth(hostElement);
      if (width < constraintWidth) {
        return;
      }
      updateStyles(
        hostElement,
        width,
        constraintWidth,
        outerElementXPadding
      );
    };

    const tryParseFloat = (property) => {
      const ret = parseFloat(property);
      return isNaN(ret) ? 0 : ret;
    };

    const getConstraintWidth = (targetElement) => {
      if (!targetElement) {
        return 0;
      }
      const { width, paddingLeft, paddingRight } =
        window.getComputedStyle(targetElement);
      return (
        tryParseFloat(width) -
        (tryParseFloat(paddingLeft) + tryParseFloat(paddingRight))
      );
    };

    const getXPadding = (targetElement) => {
      if (!targetElement) {
        return 0;
      }
      const { marginLeft, marginRight, borderLeft, borderRight } =
        window.getComputedStyle(targetElement);

      return (
        tryParseFloat(marginLeft) +
        tryParseFloat(marginRight) -
        (tryParseFloat(borderLeft) + tryParseFloat(borderRight))
      );
    };

    const resetStyles = (targetElement) => {
      if (!targetElement) {
        return;
      }
      targetElement.style.transform = "";
      targetElement.style.margin = "0";
      targetElement.style.padding = "0";
      targetElement.style.border = "none";
      targetElement.style.whiteSpace = "nowrap";
      targetElement.style.display = "inline-block";
    };

    const updateStyles = (
      targetElement,
      targetWidth,
      constraintWidth,
      outerElementXPadding
    ) => {
      if (!targetElement) {
        return;
      }
      if (!targetWidth) {
        return;
      }
      targetElement.style.transformOrigin = "left";
      targetElement.style.transform = `scaleX(${
        constraintWidth / targetWidth
      })`;
      targetElement.style.marginRight = `${
        constraintWidth - outerElementXPadding - targetWidth
      }px`;
    };
  }
}
