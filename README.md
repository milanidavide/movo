# Movo

A tiny (1kB) JavaScript library for effortless scroll-based CSS animations. Modular, extendable, and easy to use.

## Table of Contents

-   [Get Started](#get-started)
-   [API](#api)
-   [Options](#options)
-   [License](#license)

## Get Started

Install Movo:

```bash
npm install movo
```

Set up Movo in your project:

```javascript
import { Movo } from "movo";
import "movo/css";

const movoInstance = Movo.create();
```

In your HTML, add `data-movo` attributes to your elements to define animations:

```html
<div data-movo="fade-in"></div>
```

### API

#### Movo.create

Creates a new Movo instance with the provided options.

-   Parameters:
    -   `options` (Object, optional): Configuration settings for the instance.
        -   `selector` (string): The CSS selector for targeting elements. Default is `[data-movo]`.
        -   `offset` (string): Defines when animations should trigger relative to the element and viewport. Default is `top, bottom - 120px`.
        -   `repeat` (boolean): Determines if the animations should repeat. Default is `false`.
-   Offset Examples:
    -   `start, center`: The animation triggers when the top edge of the element reaches the center of the viewport. Same as `0%, 50%`.
    -   `start + 20%, bottom - 100px`: The animation triggers when the top edge of the element plus 20% reaches 100px from the bottom of the viewport.

#### Instance Methods

**`movoInstance.refresh()`**

Refreshes the Movo instance, recalculating offsets. Useful if the content or layout changes dynamically.

**`movoInstance.reset()`**

Resets the Movo instance by re-querying the DOM elements.

**`movoInstance.destroy()`**

Destroys the Movo instance, removing any associated event listeners and data.

#### Global Methods

**`Movo.refresh()`**

Refreshes all Movo instances, recalculating all offsets.

**`Movo.reset()`**

Resets all Movo instances by re-querying the DOM elements and resetting their states.

**`Movo.destroy()`**

Destroys all Movo instances, removing any associated event listeners and data.

### Options

You can customize Movo's behavior using HTML data attributes, which will override the default JavaScript configuration:

-   `data-movo-offset`: Set a custom offset for when the animation should trigger (e.g., `"start + 10%, bottom - 50px"`).
-   `data-movo-repeat`: Enable or disable animation repetition by setting to `"true"` or `"false"`.

### CSS Customization

Movo provides a set of default CSS animations which you can extend or customize to fit your needs.

#### Default Animations

Movo includes predefined animations for common effects:

-   `data-movo="fade-in"`
-   `data-movo="fade-in-down"`
-   `data-movo="fade-in-right"`
-   `data-movo="fade-in-up"`
-   `data-movo="fade-in-left"`
-   `data-movo="image-reveal-down"`
-   `data-movo="image-reveal-right"`
-   `data-movo="image-reveal-up"`
-   `data-movo="image-reveal-left"`

#### Customizing Animations

You can adjust the default animations by overriding the following CSS variables:

```css
--movo-timing-function: cubic-bezier(0.5, 1, 0.89, 1);
--movo-transition-duration: 400ms;
--movo-transition-delay: 0ms;
--movo-translate-offset: 20%;
```

#### Extending with Custom Animations

You can also extend Movo with your own custom animations. Here's an example of how to add a "slide-in" animation:

```css
[data-movo="slide-in-up"] {
    transform: translateY(20%);
    transition-property: transform;
}

[data-movo="slide-in-up"].movo-animate {
    transform: none;
}
```

### License

Movo is licensed under the [3-Clause BSD License](LICENSE).
