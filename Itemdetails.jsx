import React from "react";

const item = {
  name: "Knife Sets",
  category: "Home & garden",
  condition: "Good condition",
  location: "Melgar St., Estancia, Kalibo, Aklan",
  owner: "Hancy Tolentino",
  posted: "Posted 2 days ago",
  description:
    "A complete knife set featuring durable, high-quality knives designed for everyday kitchen use. Perfect for food preparation, cutting, and slicing, making cooking easier and more convenient.",
  images: ["🪴", "🏺", "🌱"],
  wantedInExchange: ["Books", "Kitchen items", "Open to offers"],
};

export default function ItemDetails() {
  return (
    <main>
      <header>
        <a href="/" aria-label="Swapora home">
          <strong>Swapora</strong>
        </a>

        <nav aria-label="Main navigation">
          <a href="/browse">Browse Items</a>
          <a href="/my-items">My Items</a>
          <a href="/profile">My Profile</a>
        </nav>
      </header>

      <nav aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/browse">Browse items</a> /{" "}
        <span>{item.name}</span>
      </nav>

      <article>
        <section aria-label="Item photos">
          <p aria-label="Main item photo" role="img">
            {item.images[0]}
          </p>
          <ul aria-label="More item photos">
            {item.images.slice(1).map((image, index) => (
              <li key={index}>
                <span role="img" aria-label={`Item photo ${index + 2}`}>
                  {image}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p>{item.category}</p>
          <h1>{item.name}</h1>
          <p>{item.condition}</p>
          <p>
            Shared by <a href="/profile">{item.owner}</a> · {item.location}
          </p>
          <p>{item.posted}</p>

          <h2>About this item</h2>
          <p>{item.description}</p>

          <h2>What the owner is looking for</h2>
          <ul>
            {item.wantedInExchange.map((offer) => (
              <li key={offer}>{offer}</li>
            ))}
          </ul>

          <button type="button">Request an exchange</button>
          <button type="button">Save item</button>
        </section>
      </article>

      <section aria-labelledby="owner-heading">
        <h2 id="owner-heading">About the owner</h2>
        <p>{item.owner} is sharing items with the Swapora community.</p>
        <a href="/profile">View profile</a>
      </section>

      <section aria-labelledby="safety-heading">
        <h2 id="safety-heading">Exchange thoughtfully</h2>
        <p>
          Agree on the item and a public meetup place with the owner before
          arranging your exchange.
        </p>
      </section>

      <footer>
        <p>Swapora — share more, waste less.</p>
      </footer>
    </main>
  );
}

      
