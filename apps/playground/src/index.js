import { Movo } from "movo-web";
import "movo-web/css";

Movo.create({ repeat: true });

/**
 * Queries elements based on the specified attribute and initializes counters for them.
 *
 * @param {string} [attribute='data-counter-target'] - The attribute used to identify the counters.
 * @return {void} This function does not return a value.
 */
export function initializeItemCounters(attribute = 'data-counter-target') {
    const counters = document.querySelectorAll(`[${attribute}]`);

    counters.forEach(counter => {
        const selectors = counter.getAttribute(attribute)
            .split(',')
            .map(selector => selector.trim());

        applyCountersToTargets(counter, selectors);
    });
}

/**
 * Applies counter styles to target items within a counter element.
 *
 * @param {Element} counterElement - The element containing the target items.
 * @param {Array<string>} selectors - An array of CSS selectors for targeting items.
 * @return {void} This function does not return a value.
 */
export function applyCountersToTargets(counterElement, selectors) {
    selectors.forEach(selector => {
        const targetItems = counterElement.querySelectorAll(selector);
        const itemCount = targetItems.length;

        targetItems.forEach((item, index) => {
            item.style.setProperty('--item-count', index + 1);
            item.style.setProperty('--item-count-reverse', itemCount - index);
        });
    });
}

initializeItemCounters();
