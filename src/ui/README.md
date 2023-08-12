# Why another UI component library ???

## Because you need custom-branded UI-components with custom functionality

If you just import and use plain old MUI or AntD components, your app will be very generic, not custom.

You can import open-source components into your own codebase and add your own branding. This works especially well with the new "headless" libraries. Pre-set some props and options to make them more reusable and customized to your data and logic. And voila! Easy to manage custom-branded components!

## That's exactly what this library does

This library is a starter kit to be your own branded set of components. It's not meant to be a standalone 3rd party library that you import from NPM. It's meant to live in your codebase, as part of your monorepo.

If you don't like that one of the components here uses MUI or Radix, just rewrite that one component.

It's geared towards more technical data-heavy apps with a lot of complexity (like Mui, Ant, Blueprint), that want to maintain a minimal, clean, user-friendly UI (like Chakra, Radix, Headless). This attempts to be the best of both.

## What components do we need? For each, which behavior library has the best implementation?

Assuming each component library is no problem to custom brand, which one has the best functionality?
| `MUI` | `Mantine` | `Radix` | `Headless` | `AriaKit`
Of course it's MUI, but it is more difficult to style. Mantine is a copy of MUI that makes customization for non-material-design easier, with cleaner borders and padding. It's an ambitious project, but unfortunately is a bit glitchy with dark-mode.
(There's also `Chakra` | `AntD` | `Blueprint` | `React-Bootstrap`, but each has their own set of issues.)

So, since MUI is more difficult to style, lets try to use the new "headless" options whenever possible, and keep MUI on hand for more difficult things like auto-sizing textareas.

### Form

- input
  - any, but should be consistent
- textarea
  `mui`
- tags
  `react-select`
- select
  - any, but should be consistent
- input with select
  `react-select`
- textarea with select
  - IDK - it does not exist!
- tags with select
  `react-select`
- radio
  `mui`
- checkbox
  - any
- switch (checkbox styled differently)
  - any
- slider (input number styled differently)
  - any
- range slider
  - any
- button
  - any, but `MUI` has the nice ripple effect!
- toggle button
  - any, but `MUI` has more grouping options
- [dropdown menu button](https://mui.com/material-ui/react-menu/#customization)
  `mui`
- split button
  any
- date picker
  `mantine`
- [file upload button preferably with dropzone](https://mantine.dev/others/dropzone/)
  `mantine`

### Data

### Layout

- block (Box, Container, whatever you want to call it)
- inline (Text, Typography, whatever you want to call it)
- flex
- grid
- card (Paper)
- accordion
- tabs / selected content panel
  `mui`
- stepper (wizard, like tabs but more interactive)
  `mui`
- header height
- page width
- site/app bar
- footer
- popout side drawer
- slideout side panel
- overlay (should be a wrapper component to show children such as a Loading graphic)
- table of contents or non-interactive menu of links
  `mantine`

### Content

- [carousel](https://mantine.dev/others/carousel/)
  `mantine`

### Navigation

- breadcrumbs
- pagination
- tabs menu (selected is a title, others are nav menu items)
- app bar
- link (anchor tag, includes logic to handle internal, email, phone, and typo links)
- speed dial (floating bottom right button - expands menu items on hover)
  `mui`

### Feedback

- badge (top right blip showing a number, dot, or preferably even an icon)
- tooltip
- alert
- [modal](https://mui.com/material-ui/react-modal/)
  `mui`
- popover
- dialog
- snackbar
- progress bar
- skeleton
- spinner
- toast
- toast with action
- toast with progress bar

### Other
