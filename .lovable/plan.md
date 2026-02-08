

## Make Floating Particles More Visible

The FloatingParticles component is correctly implemented and rendering, but the particles are nearly invisible because:
- Particle dots are only 2-6px in size
- Opacity ranges from 0.15 to 0.4 (very faint)
- Gradient orbs are at 0.03 opacity (essentially invisible)

### Changes to `src/components/FloatingParticles.tsx`

1. **Increase particle sizes** from 2-6px to 4-10px range
2. **Boost particle opacity** from 0.15-0.4 to 0.25-0.6
3. **Increase gradient orb opacity** from 0.03 to 0.08-0.1
4. **Make gradient orbs larger** (400px and 350px) for a more noticeable ambient glow
5. **Add slight blur** to more particles for a softer, glowing feel

These adjustments will make the floating effect clearly visible while still keeping it subtle and non-distracting as a background decoration.

