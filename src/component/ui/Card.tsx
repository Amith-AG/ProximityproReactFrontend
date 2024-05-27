import "./Card.css";

type TCardProps = {
  name: string;
  description: string;
  role: string[];
  contact: string;
  img_url: string;
};
export default function Card({
  name,
  description,
  role,
  contact,
  img_url,
}: TCardProps) {
  return (
    <div className="app__card">
      <img src={img_url} alt={`${name} picture`} />
      <div className="app__card-body">
        <h1>{name}</h1>
        <p className="app__card-desc">{`${description} `}</p>
        <p className="app__card-contact">
          Contact : <span>{contact}</span>
        </p>
        <div className="app__card-role">
          {role.map((data, idx) => (
            <p key={`${data}-${idx}`}>{data}</p>
          ))}
        </div>
        <button>Book</button>
      </div>
    </div>
  );
}
