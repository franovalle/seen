

# Revert Index.tsx Navigation Logic

Restore the conditional initialization so returning users with a cached screening result go directly to the glasses/camera screen.

## Change

**`src/pages/Index.tsx`** — line 9: change `useState<Screen>('screening')` back to:

```ts
const [screen, setScreen] = useState<Screen>(
  loadScreeningResult() ? 'glasses' : 'screening'
);
```

No other files touched.

