import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

function getCharacterImage(character) {
	if (!character) return null;
	if (character.name === 'Darius') return 'https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png';
	return character.avatar || character.imageUrl;
}

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			characters: [],
			loading: true,
			error: ""
		};
	}

	componentDidMount() {
		this.loadCharacters();
	}

	loadCharacters() {
		const baseUrl = import.meta.env.VITE_SERVER_URL || "";
		this.setState({ loading: true, error: "" });

		axios
			.get(`${baseUrl}/characters`)
			.then((response) => {
				const list = Array.isArray(response.data) ? response.data : [];
				this.setState({ characters: list, loading: false, error: "" });
			})
			.catch((error) => {
				this.setState({
					characters: [],
					loading: false,
					error: error?.message || "Could not load characters."
				});
			});
	}

	render() {
		const { characters, loading, error } = this.state;

		if (loading) {
			return <div className="loading">Loading characters…</div>;
		}

		if (error) {
			return <div className="error">Error: {error}</div>;
		}

		return (
			<div className="page">
				<h1 className="heading">2xko — Characters</h1>
				<div className="grid">
					{characters && characters.length ? (
						characters.map((character) => {
							const imgSrc = getCharacterImage(character);
							return (
								<Link key={character.id} to={`/characters/${character.id}`} className="card">
									<div className="avatar">
										{imgSrc ? (
											<img src={imgSrc} alt={character.name} style={{ maxHeight: 64 }} />
										) : (
											<div>{character.name?.[0] || "C"}</div>
										)}
									</div>
									<div className="name">{character.name}</div>
								</Link>
							);
						})
					) : (
						<div>No characters found</div>
					)}
				</div>
			</div>
		);
	}
}

export default HomePage;
