export default function ({ name, email }) {
    return (
        <li>
            <div>
                <h3>{name}</h3>
                <p>{email}</p>
            </div>
        </li>
    );
}