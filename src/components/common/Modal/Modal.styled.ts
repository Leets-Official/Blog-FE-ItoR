export const StyledModal = (maxWidth: string) => ({
  overlay: {
    backgroundColor: 'rgba(182, 182, 182, 0.3)',
    zIndex: 1000,
    backdropFilter: 'blur(2px)',
  },
  content: {
    maxWidth,
    width: '100%',
    margin: 'auto',
    inset: '40% auto auto 50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '9px',
    padding: '24px',
    backgroundColor: 'transparent',
  },
});
