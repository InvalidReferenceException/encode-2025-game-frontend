type HudProps = {
    onOpenCraft: () => void
    onOpenInventory: () => void
    onOpenBank: () => void
    tileCount: number
    bankBalance: number
  }
  
  export default function Hud({
    onOpenCraft,
    onOpenInventory,
    onOpenBank,
    tileCount,
    bankBalance,
  }: HudProps) {
    return (
      <div style={styles.wrapper}>
        <button onClick={onOpenCraft} style={styles.button}>
          ✨ Craft
        </button>
  
        <button onClick={onOpenInventory} style={styles.widget}>
          🧱 Tiles: {tileCount}
        </button>
  
        <button onClick={onOpenBank} style={styles.widget}>
          🏦 Bank: {bankBalance}
        </button>
      </div>
    )
  }
  
  const styles = {
    wrapper: {
      position: 'absolute' as const,
      top: 20,
      left: 20,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
      background: 'rgba(255,255,255,0.9)',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      zIndex: 1000,
    },
    button: {
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: 'bold' as const,
      cursor: 'pointer',
    },
    widget: {
      padding: '6px 10px',
      fontSize: '13px',
      textAlign: 'left' as const,
      background: '#eee',
      border: '1px solid #ccc',
      borderRadius: '6px',
      cursor: 'pointer',
    },
  }