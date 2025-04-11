export const StyledModal = (maxWidth: string) => ({
  overlay: {
    backgroundColor: 'rgba(182, 182, 182, 0.3)',
    zIndex: 1000,
    backdropFilter: 'blur(2px)',
  },
  content: {
    maxWidth,
    width: 'fit-content',
    margin: 'auto',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '4px',
    padding: '24px',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});
