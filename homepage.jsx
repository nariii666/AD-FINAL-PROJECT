import React, { useState } from "react";

const categories = [
  "All items",
  "Decorations",
  "Furnitures",
  "Kitchen",
  "Cleaning Tools",
  "Gardening Tools",
  "Books",
  "Clothing",
  "Electronics",
  "Music Instruments",
];

export default function SwaporaHome() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All items");

  const filteredListings = listings.filter((item) => {
    const matchesCategory =
      selectedCategory === "All items" || item.category === selectedCategory;
    const matchesSearch = `${item.name} ${item.category} ${item.location}`
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      <header>
        <a href="/" aria-label="Swapora home">
          <strong>Swapora</strong>
        </a>

        <nav aria-label="Main navigation">
          <a href="#browse">Browse items</a>
          <a href="#how-it-works">How it works</a>
          <a href="#sign-in">Sign in</a>
          <a href="#join">Join Swapora</a>
        </nav>
      </header>

      <section aria-labelledby="welcome-heading">
        <p>Small swaps, big impact!</p>
        <h1 id="welcome-heading"> Welcome to Swapora! Join us in reducing waste, reusing resources, and making the world a greener place, one exchange at a time.</h1>
        <p>Swap More. Waste Less. Live Sustainably.
        </p>

        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            document.getElementById("browse")?.scrollIntoView();
          }}
        >
          <label htmlFor="item-search">What are you looking for?</label>
          <br />
          <input
            id="item-search"
            type="search"
            placeholder="Try books, a bike, or plant pots"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search items</button>
        </form>

        <p>
          <a href="#browse">Explore items</a>{" "}
          <a href="#list-item">Share an item</a>
        </p>
      </section>

      <section id="browse" aria-labelledby="browse-heading">
        <h2 id="browse-heading">Find something useful</h2>
        <p>Browse items shared by people in your community.</p>

        <label htmlFor="category-filter">Filter by category</label>{" "}
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {filteredListings.length > 0 ? (
          <ul>
            {filteredListings.map((item) => (
              <li key={item.id}>
                <article>
                  <p aria-hidden="true">{item.emoji}</p>
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <p>{item.condition}</p>
                  <p>
                    Shared by {item.owner} · {item.location}
                  </p>
                  <button type="button" onClick={() => alert(`You selected ${item.name}`)}>
                    View item
                  </button>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items match your search. Try another search or category.</p>
        )}
      </section>

      <section id="how-it-works" aria-labelledby="how-heading">
        <h2 id="how-heading">How Swapora works</h2>
        <ol>
          <li>Find an item you can use.</li>
          <li>Contact its owner and agree on an exchange.</li>
          <li>Pass along something useful of your own, or arrange another swap.</li>
        </ol>
      </section>

      <section id="list-item" aria-labelledby="share-heading">
        <h2 id="share-heading">Have something to share?</h2>
        <p>Give a useful item another life in your community.</p>
        <button type="button">List an item</button>
      </section>

      <footer>
        <p>Swapora — share more, waste less.</p>
      </footer>
    </main>
  );
}
