import { useEffect } from "react";
import { useGameContext } from "./context/useGame";
import CraftModal from "./CraftModal";

export default function Hud() {
  const {
    player,
    setSelectedTile,
    setIsCraftModalOpen,
    isCraftModalOpen,
    selectedTile,
    isAudioEnabled,
    setIsAudioEnabled,
  } = useGameContext();

  useEffect(() => {
    if (isCraftModalOpen && selectedTile) {
      console.log("Modal is now open and tile is selected:", selectedTile);
    }
  }, [isCraftModalOpen, selectedTile]);

  const handleCraft = (description: string) => {
    console.log("Crafted tile:", description);
  };

  const handleEnableAudio = () => {
    const AudioContext = window.AudioContext;
    const context = new AudioContext();

    if (context.state === "suspended") {
      context.resume().then(() => {
        setIsAudioEnabled(true);
        console.log("🎧 Audio enabled");
      });
    } else {
      setIsAudioEnabled(!isAudioEnabled);
      console.log("🎧 Audio toggled");
    }
  };

  return (
    <>
      {/* Top-right Audio Toggle */}
      <div style={styles.audioToggle}>
        <button onClick={handleEnableAudio} style={styles.button}>
          {isAudioEnabled ? "🔊 Audio On" : "🔇 Enable Audio"}
        </button>
      </div>

      {/* Bottom-right Tile + Bank Info */}
      <div style={styles.bottomRight}>
        <button onClick={() => {}} style={styles.button}>
          🧱 Tiles: {player.tilesOwned.length}
        </button>
        <button onClick={() => {}} style={styles.button}>
          🏦 Bank: {player.balance}
        </button>
      </div>

      {/* Craft Modal */}
      <CraftModal
        open={isCraftModalOpen}
        onClose={() => {
          setIsCraftModalOpen(false);
          setSelectedTile(null);
        }}
        onCraft={handleCraft}
      />
    </>
  );
}

const styles = {
  audioToggle: {
    position: "absolute" as const,
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  bottomRight: {
    position: "absolute" as const,
    bottom: 20,
    right: 20,
    display: "flex",
    gap: "12px",
    zIndex: 1000,
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: "bold" as const,
    cursor: "pointer",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.9)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    border: "1px solid #ddd",
  },
};