export default function Task({ title, cover }) {
  return (
    <div className="task">
      <div className="image">
        <img src={"http://localhost:4000/" + cover} alt="xd" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p>SLIDER</p>
      </div>
    </div>
  );
}
