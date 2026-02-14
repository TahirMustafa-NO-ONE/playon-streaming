# Mobile Hero Section - Testing Guide

## 🧪 How to Test

### 1. Browser DevTools (Chrome/Edge)
```
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select a mobile device:
   - iPhone 12 Pro (390x844)
   - iPhone SE (375x667)
   - Samsung Galaxy S20 (360x800)
4. Refresh page and test
```

### 2. Touch Gesture Testing

#### Swipe Left (Next Slide)
- Touch and drag from right to left (>50px)
- Slide should transition to next
- Auto-play should pause during touch

#### Swipe Right (Previous Slide)
- Touch and drag from left to right (>50px)
- Slide should transition to previous

#### Tap Navigation Dots
- Tap any dot to jump to that slide
- Active dot should be larger and pink

### 3. Visual Checks

#### Mobile Layout (<768px)
✅ **Content positioned at bottom 30%**
- Status badge at top of content
- Title below badge
- Metadata row below title
- Synopsis below metadata
- Buttons stacked vertically
- Navigation dots centered at bottom

✅ **Spacing**
- Container: 20px horizontal padding
- Bottom: 60px from screen bottom
- Button gap: 12px
- All text properly spaced

✅ **Typography**
- Title: 28px (24px on <375px)
- Synopsis: 14px (13px on <375px)
- Metadata: 13px
- Proper text shadows on title

#### Desktop Layout (768px+)
✅ **Traditional hero layout**
- Buttons horizontal
- Dots positioned bottom-right
- Larger text sizes

### 4. Color Scheme Verification

```
Status Badge:    #ff006e (90% opacity)
Primary Button:  #ff006e
Button Hover:    #d10058
Star Rating:     #ffd700 (gold)
Text Primary:    #ffffff
Text Secondary:  #cccccc, #e0e0e0
Background:      #0a0a0a
```

### 5. Animation Checks

✅ **On Slide Change**
- Fade transition (1s)
- Content slides in from left (0.8s)
- No flickering or jank

✅ **Button Animations**
- Primary button: appears after 0.2s delay
- Secondary button: appears after 0.4s delay
- Both fade in from bottom

✅ **Badge Pulse**
- HD badge should pulse (2s cycle)
- Subtle scale and opacity change

✅ **Touch Feedback**
- Buttons scale down on press (0.95)
- Smooth spring animation

### 6. Performance Checks

#### Chrome DevTools Performance
```
1. Open Performance tab
2. Start recording
3. Swipe between slides 3-4 times
4. Stop recording
5. Check:
   - FPS stays above 55fps
   - No long tasks (>50ms)
   - Smooth animations
```

#### Lighthouse Mobile Audit
```
1. Open Lighthouse tab
2. Select "Mobile" device
3. Check "Performance" category
4. Run audit
5. Target scores:
   - Performance: >85
   - Accessibility: >95
   - Best Practices: >90
```

### 7. Touch Target Testing

All interactive elements should be:
- **Minimum 44x44px** (WCAG 2.1 Level AAA)
- Current implementation: **48px height buttons** ✅

Test by:
1. Trying to tap buttons with thumb
2. Ensuring no accidental taps
3. Comfortable spacing between elements

### 8. Safe Area Testing (Notched Phones)

Test on devices with notches:
- iPhone X/11/12/13/14 series
- Most Android flagships

Check:
✅ Content not cut off by notch
✅ Bottom buttons not obscured by home indicator
✅ Proper padding applied

### 9. Responsive Breakpoint Testing

#### Small Mobile (<375px)
- Test on iPhone SE (375x667)
- Verify smaller text sizes
- Check tighter padding

#### Standard Mobile (375-767px)
- Test on iPhone 12 (390x844)
- Verify standard mobile layout
- All features functional

#### Tablet (768-1023px)
- Should show desktop layout
- Horizontal buttons
- Proper spacing

### 10. Real Device Testing

If possible, test on actual devices:
- iOS Safari (iPhone)
- Chrome Android (Samsung/Pixel)
- Different screen sizes

### 11. Accessibility Testing

#### Screen Reader
```
1. Enable VoiceOver (iOS) or TalkBack (Android)
2. Navigate through hero section
3. Verify all elements are announced
4. Button labels should be clear
```

#### Keyboard Navigation
```
1. Tab through interactive elements
2. All buttons should be reachable
3. Visual focus indicator present
4. Enter/Space activates buttons
```

### 12. Edge Cases

✅ **Very long titles**
- Should truncate to 2 lines
- Ellipsis (...) at end

✅ **Very long descriptions**
- Should truncate to 3 lines
- Fade effect at bottom

✅ **Missing data**
- No runtime: metadata row adjusts
- No year: metadata row adjusts
- Low rating (<8): no TRENDING badge

✅ **Single slide**
- Navigation dots still show
- No errors in console

✅ **Rapid swipes**
- Should not break navigation
- Smooth transitions maintained

### 13. Network Conditions

Test with throttling:
```
Chrome DevTools → Network → Throttling
- Slow 3G
- Fast 3G
- Offline
```

Check:
✅ Images lazy load properly
✅ First slide loads immediately
✅ Smooth experience even on slow network

### 14. Battery Impact

On mobile device:
1. Monitor battery usage
2. Check for excessive CPU
3. Verify animations don't drain battery

## 🐛 Common Issues & Fixes

### Issue: Swipe not working
**Fix**: Ensure you're swiping >50px and in horizontal direction

### Issue: Buttons too small
**Fix**: Should be 48px height - check CSS

### Issue: Text hard to read
**Fix**: Verify text-shadow and brightness filter applied

### Issue: Content cut off on notched phone
**Fix**: Check safe-area-inset CSS applied

### Issue: Jerky animations
**Fix**: Verify GPU acceleration (transform: translateZ(0))

## ✅ Checklist Before Production

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on small screen (<375px)
- [ ] Test all swipe gestures
- [ ] Verify auto-play works
- [ ] Check touch target sizes
- [ ] Run Lighthouse audit
- [ ] Test with slow network
- [ ] Verify accessibility
- [ ] Check safe areas on notched phones
- [ ] Test with reduced motion preference
- [ ] Verify all colors match design
- [ ] Check animations are smooth
- [ ] Test rapid interactions
- [ ] Verify no console errors

## 📸 Screenshots to Capture

1. Hero section on mobile (portrait)
2. Buttons in active state
3. Swipe gesture in action
4. Navigation dots
5. Different slide content
6. Small screen version (<375px)
7. Accessibility inspector view
8. Performance metrics

---

**Testing Duration**: ~30 minutes for complete test  
**Devices Required**: 2-3 different mobile devices  
**Tools Needed**: Chrome DevTools, real devices (optional)
