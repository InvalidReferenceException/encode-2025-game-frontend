import Craft from "./Craft"

type CraftModalProps = {
    open: boolean
    onClose: () => void
    onCraft: (description: string) => void
  }
  
  export default function CraftModal({ open, onClose, onCraft }: CraftModalProps) {
    if (!open) return null
  
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <Craft onCraft={(desc) => { onCraft(desc); onClose() }} />
          <button onClick={onClose} style={styles.close}>✖</button>
        </div>
      </div>
    )
  }
  
  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      position: 'relative' as const,
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '10px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    },
    close: {
      position: 'absolute' as const,
      top: 8,
      right: 8,
      fontSize: '16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
  }