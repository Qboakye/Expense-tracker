import img1 from "../assets/loading/giphy.webp";
const styles = {
  position: "fixed",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
};

function Loading() {
  return (
    <div style={styles}>
      <img src={img1} alt="" />
    </div>
  );
}

export default Loading;
