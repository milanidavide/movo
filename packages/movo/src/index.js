const instances = new Set();

export const Movo = {
    create,
    refresh: () => instances.forEach(instance => instance.refresh()),
    reset: () => instances.forEach(instance => instance.reset()),
    destroy: () => instances.forEach(instance => instance.destroy()),
};

/**
 * Create a Movo instance.
 *
 * @param {Object} [options={}] - The options to use.
 * @param {string} [options.offset="top, bottom"] - The offset for the trigger point.
 * @param {boolean} [options.repeat=true] - Whether the animation should repeat.
 * @return {Object} - The Movo instance.
 */
function create(options = {}) {
    options = Object.assign({
        selector: '[data-movo]',
        offset: "top, bottom - 120px",
        repeat: false,
    }, options);

    let elements = [];

    const initElements = () => {
        elements = prepareElements(options);
    }

    const handleElementsVisibility = () => updateElementsVisibility(elements);

    const refresh = () => {
        elements.forEach(element => {
            element.triggerPoint = calculateTriggerPoint(element.target, element.offset)
        });
        handleElementsVisibility();
    };

    const reset = () => {
        initElements();
        refresh();
    };

    const destroy = () => {
        window.removeEventListener('scroll', handleElementsVisibility);
        window.removeEventListener('resize', refresh);
        instances.delete(instance);
    };

    initElements();
    window.addEventListener('scroll', handleElementsVisibility);
    window.addEventListener('resize', refresh);
    requestAnimationFrame(handleElementsVisibility);

    const instance = {
        refresh,
        reset,
        destroy,
    };

    instances.add(instance);

    return instance;
};


/**
 * Prepare the list of elements based on the provided options and data attributes.
 *
 * @param {Object} options - The options to use.
 * @return {Array<Object>} The prepared list of elements with their respective data.
 */
function prepareElements(options) {
    return Array
        .from(document.querySelectorAll(options.selector))
        .map(element => {
            const offset = element.getAttribute('data-movo-offset')
                ? element.getAttribute('data-movo-offset')
                : options.offset;

            const repeat = element.hasAttribute('data-movo-repeat')
                ? element.getAttribute('data-movo-repeat') === 'true'
                : options.repeat;

            return {
                target: element,
                offset: offset,
                triggerPoint: calculateTriggerPoint(element, offset),
                repeat,
            };
        });
}

/**
 * Updates the visibility of elements based on the scroll position.
 *
 * @param {Array<Object>} elements - Array of elements to update.
 * @return {void} This function does not return a value.
 */
function updateElementsVisibility(elements) {
    elements.forEach(element => {
        if (window.scrollY >= element.triggerPoint) {
            element.target.classList.add('movo-animate');
        } else if (element.repeat) {
            element.target.classList.remove('movo-animate');
        }
    });
}

/**
 * Calculate the trigger point for an element.
 *
 * @param {HTMLElement} element - The element for which to calculate the trigger point.
 * @param {string} offset - The offset values for the target and viewport as a comma-separated string.
 * @return {number} The trigger point.
 */
function calculateTriggerPoint(element, offset) {
    offset = offset.split(',').map(item => item.trim());
    return getOffsetTop(element)
        + parseOffset(element.offsetHeight, offset[0])
        - parseOffset(window.innerHeight, offset[1]);
}

/**
 * Get an element's offsetTop from the top of the page, excluding CSS transforms.
 *
 * @param {Element} element - The element to calculate the offsetTop for.
 * @return {number} The offsetTop of the element from the top of the page.
 */
function getOffsetTop(element) {
    let offsetTop = 0;
    for (let current = element; current; current = current.offsetParent) {
        offsetTop += current.offsetTop;
    }
    return offsetTop;
}

/**
 * Parse an offset value and return its equivalent in pixels.
 *
 * @param {number} size - The base size in pixels.
 * @param {string} offsetValue - The offset value to parse (e.g., "10px", "20%", "30% + 10px").
 * @return {number|null} The parsed offset value in pixels, or null if the format is unsupported.
 */
export function parseOffset(size, offsetValue) {
    offsetValue = offsetValue
        .replace('top', '0%')
        .replace('center', '50%')
        .replace('bottom', '100%');

    const pxPattern = /^(\d+)px$/;
    const percentPattern = /^(\d+)%$/;
    const complexPattern = /^(\d+)%\s*([+-])\s*(\d+)px$/;

    const pxMatch = offsetValue.match(pxPattern);
    if (pxMatch) return parseInt(pxMatch[1]);

    const percentMatch = offsetValue.match(percentPattern);
    if (percentMatch) return Math.round(size * (parseInt(percentMatch[1]) / 100));

    const complexMatch = offsetValue.match(complexPattern);
    if (complexMatch) {
        const percentage = parseInt(complexMatch[1]);
        const sign = complexMatch[2];
        const offset = parseInt(complexMatch[3]);
        const percentageResult = Math.round(size * (percentage / 100));
        return sign === '+' ? percentageResult + offset : percentageResult - offset;
    }

    return null;
}
