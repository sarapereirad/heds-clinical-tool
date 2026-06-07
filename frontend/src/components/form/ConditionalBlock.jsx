function ConditionalBlock({ visible, children }) {
  if (!visible) return null;

  return <div style={styles.container}>{children}</div>;
}

const styles = {
  container: {
    borderLeft: "3px solid #4a90d9",
    backgroundColor: "#f0f6ff",
    borderRadius: "0 8px 8px 0",
    padding: "16px",
    marginBottom: "24px",
    marginTop: "-16px",
  },
};

export default ConditionalBlock;
