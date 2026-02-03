export const CATEGORIES = {
  REACT: 'React Core',
  CSS: 'CSS Architecture',
  HOOKS: 'Hooks & API',
  PERF: 'Performance',
  SECURITY: 'Security & A11y'
};

export const MISTAKES = [
  // --- REACT CORE ---
  {
    id: 'react-missing-key',
    category: CATEGORIES.REACT,
    title: 'Missing Key Prop',
    description: 'React uses keys to identify which items have changed, been added, or removed.',
    why: 'Without keys, React re-renders the entire list instead of just updating changed items, causing performance drops and lost focus/input state.',
    howToFix: 'Add a unique index or ID to each element in the list.',
    externalUrl: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key',
    brokenCode: `items.map(item => <li>{item.label}</li>)`,
    fixedCode: `items.map(item => <li key={item.id}>{item.label}</li>)`,
    type: 'react'
  },
  {
    id: 'react-object-state',
    category: CATEGORIES.REACT,
    title: 'Direct State Mutation',
    description: 'Updating state by modifying the existing object instead of creating a new copy.',
    why: 'React compares object references. If you mutate the same object, the reference doesnt change, and React wont trigger a re-render.',
    howToFix: 'Always use the spread operator (...) to create a new object copy.',
    externalUrl: 'https://react.dev/learn/updating-objects-in-state',
    brokenCode: `setUser(user => { user.age = 26; return user; })`,
    fixedCode: `setUser(user => ({ ...user, age: 26 }))`,
    type: 'react'
  },
  {
    id: 'react-props-mirroring',
    category: CATEGORIES.REACT,
    title: 'Props Mirroring',
    description: 'Initializing state with a prop value without handling updates.',
    why: 'The state only initializes once. If the parent prop changes, the child state stays stuck at the old value.',
    howToFix: 'Use the prop directly or sync with useEffect (though usually unnecessary).',
    externalUrl: 'https://react.dev/learn/choosing-the-state-structure#mirroring-props-in-state',
    brokenCode: `const [val, setVal] = useState(props.initial);`,
    fixedCode: `// Use props.initial directly in your UI`,
    type: 'react'
  },
  {
    id: 'react-unnecessary-div',
    category: CATEGORIES.REACT,
    title: 'Div Soup (No Fragments)',
    description: 'Wrapping everything in unnecessary <div> tags.',
    why: 'Extra divs bloat the DOM, break CSS flex/grid layouts, and make accessibility harder.',
    howToFix: 'Use React Fragments <>...</> or <React.Fragment>.',
    externalUrl: 'https://react.dev/reference/react/Fragment',
    brokenCode: `return (<div><h1>Title</h1></div>);`,
    fixedCode: `return (<><h1>Title</h1></>);`,
    type: 'react'
  },

  // --- HOOKS & API ---
  {
    id: 'hooks-stale-closure',
    category: CATEGORIES.HOOKS,
    title: 'Stale Closures',
    description: 'Using old state values inside a setInterval or heavy async function.',
    why: 'The function captures the state value at the time it was created. It never sees the updated state.',
    howToFix: 'Use the functional update pattern: setState(prev => prev + 1).',
    externalUrl: 'https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state',
    brokenCode: `useEffect(() => { setInterval(() => setCount(count + 1), 1000) }, [])`,
    fixedCode: `useEffect(() => { const id = setInterval(() => setCount(c => c + 1), 1000); return () => clearInterval(id); }, [])`,
    type: 'react'
  },
  {
    id: 'hooks-missing-cleanup',
    category: CATEGORIES.HOOKS,
    title: 'Effect Memory Leak',
    description: 'Adding event listeners without removing them.',
    why: 'Listeners persist after a component unmounts, leading to memory leaks and multiple calls.',
    howToFix: 'Return a cleanup function from useEffect.',
    externalUrl: 'https://react.dev/reference/react/useEffect#connecting-to-an-external-system',
    brokenCode: `useEffect(() => { window.addEventListener('scroll', fn) }, [])`,
    fixedCode: `useEffect(() => { window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, [])`,
    type: 'react'
  },

  // --- CSS ARCHITECTURE ---
  {
    id: 'css-box-sizing',
    category: CATEGORIES.CSS,
    title: 'Box Model Overflow',
    description: 'Padding and borders making a 100% width element overflow.',
    why: 'Default box-sizing is content-box, which adds padding to the total width.',
    howToFix: 'Apply box-sizing: border-box; to all elements.',
    externalUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing',
    brokenCode: `.box { width: 100%; padding: 20px; }`,
    fixedCode: `.box { box-sizing: border-box; width: 100%; padding: 20px; }`,
    type: 'css'
  },
  {
    id: 'css-z-index-stacking',
    category: CATEGORIES.CSS,
    title: 'Z-Index Isolation',
    description: 'Parent element isolation breaking child z-index.',
    why: 'Parents with opacity < 1 or transform create new stacking contexts child z-indices cannot escape.',
    howToFix: 'Check parent stacking contexts or move the child to global level.',
    externalUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context',
    brokenCode: `.parent { opacity: 0.9; } .child { z-index: 999; }`,
    fixedCode: `.parent { opacity: 1; }`,
    type: 'css'
  },
  {
    id: 'css-aspect-ratio',
    category: CATEGORIES.CSS,
    title: 'Image Squashing',
    description: 'Images losing their ratio inside flexible containers.',
    why: 'Flex/Grid often stretch images to fill space, ignoring original dimensions.',
    howToFix: 'Use object-fit: cover or aspect-ratio: 16/9.',
    externalUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit',
    brokenCode: `img { width: 100%; height: 100%; }`,
    fixedCode: `img { width: 100%; height: 100%; object-fit: cover; }`,
    type: 'css'
  },

  // --- PERFORMANCE ---
  {
    id: 'perf-memo-leak',
    category: CATEGORIES.PERF,
    title: 'Memo Invalidation',
    description: 'Passing inline objects or functions to a memoized component.',
    why: 'Objects/Functions are new on every render, breaking the memo comparison.',
    howToFix: 'Use useMemo and useCallback to stabilize references.',
    externalUrl: 'https://react.dev/reference/react/useCallback',
    brokenCode: `<Child data={{ id: 1 }} onAction={() => {}} />`,
    fixedCode: `const data = useMemo(() => ({ id: 1 }), []); <Child data={data} />`,
    type: 'react'
  },
  {
    id: 'perf-heavy-filtering',
    category: CATEGORIES.PERF,
    title: 'Expensive Computation',
    description: 'Filtering large arrays directly in the render body.',
    why: 'The filtering logic runs on every keystroke/render, wasting CPU cycles.',
    howToFix: 'Wrap the filtering logic in useMemo.',
    externalUrl: 'https://react.dev/reference/react/useMemo',
    brokenCode: `const visible = items.filter(i => i.active);`,
    fixedCode: `const visible = useMemo(() => items.filter(i => i.active), [items]);`,
    type: 'react'
  },

  // --- SECURITY & A11Y ---
  {
    id: 'security-danger-html',
    category: CATEGORIES.SECURITY,
    title: 'Unsafe HTML Injection',
    description: 'Using dangerouslySetInnerHTML with unvalidated content.',
    why: 'Standard XSS vulnerability. Malicious input can execute JS in users browsers.',
    howToFix: 'Sanitize HTML with DOMPurify first.',
    externalUrl: 'https://react.dev/reference/react/dom/components/common#dangerouslysetinnerhtml',
    brokenCode: `<div dangerouslySetInnerHTML={{ __html: noisyInput }} />`,
    fixedCode: `<div dangerouslySetInnerHTML={{ __html: sanitize(noisyInput) }} />`,
    type: 'react'
  },
  {
    id: 'a11y-missing-alt',
    category: CATEGORIES.SECURITY,
    title: 'Accessibility Gap',
    description: 'Images without alt attributes.',
    why: 'Screen readers literally skip these or announce "Image", making content unusable for the visually impaired.',
    howToFix: 'Always include meaningful alt text.',
    externalUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#accessibility_concerns',
    brokenCode: `<img src="logo.png" />`,
    fixedCode: `<img src="logo.png" alt="Company Logo" />`,
    type: 'react'
  }
];
