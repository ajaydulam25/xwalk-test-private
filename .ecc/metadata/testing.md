# Testing

## Available automated checks

`npm run lint` runs ESLint for JS/MJS/JSON (Airbnb, JSON, and xwalk recommended rules) followed by Stylelint for block and global styles. `npm run lint:fix` can modify source; review its changes. The GitHub push workflow installs with `npm ci` on Node.js 24 and runs lint.

No test directory, browser test configuration, unit test framework, or npm `test` script was found. References to `test/*`, coverage, or Karma in ignore rules are not evidence of active tests. No automated checks were run for this documentation-only task.

## Known coverage boundary

Normal CSS lint omits `button/button.css`. Changes there need an explicit Stylelint check using the same configuration. JSON lint and aggregation validate authoring structure but do not prove the emitted CMS DOM matches a block decorator.

## Manual validation for code changes

1. Run lint and, if authoring partials changed, regenerate/review the three root JSON aggregates.
2. Open representative authored content in local preview; use AEM-structured drafts only when real content is unavailable.
3. Exercise missing optional fields, empty content, long titles, multiple CTAs, and varied images.
4. Check narrow/mobile, tablet, and desktop layouts; confirm no overflow or unexpected image/layout shift.
5. Test keyboard order, visible focus, native control activation, accessible names, image alternatives, heading hierarchy, and screen-reader behavior against WCAG 2.2 AA.
6. Confirm Universal Editor updates preserve instrumentation and redecorate correctly.
7. Verify header/footer/fragments, hash navigation, loading states, and browser console/network failures where relevant.
8. Measure PageSpeed on the feature preview; aim for 100 without claiming an unmeasured score.

Record checks actually performed and distinguish observed results from untested expectations. Do not report lint as functional, accessibility, or performance test coverage.
